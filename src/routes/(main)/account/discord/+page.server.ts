import { error, redirect } from '@sveltejs/kit';
import { randomId } from '$lib/server/id';
import { env } from '$env/dynamic/private';
import { env as publicEnv } from '$env/dynamic/public';
import { z } from 'zod';
import {
  db,
  ExternalAccounts,
  first,
  firstOrThrow,
} from '$lib/server/db/index.js';
import { and, eq } from 'drizzle-orm';
import { getDiscordMember } from '$lib/server/discord';

const OAUTH_REDIRECT_URI = `${publicEnv.PUBLIC_ORIGIN}/settings/discord`;

const schema = z.object({
  code: z.string(),
  state: z.string(),
});

export const load = async ({ cookies, locals, url }) => {
  if (!locals.session) {
    throw error(401, 'Unauthorized');
  }

  const accountId = locals.session.account.id;
  let discordAccount = await db
    .select({
      externalId: ExternalAccounts.externalId,
      data: ExternalAccounts.data,
    })
    .from(ExternalAccounts)
    .where(and(eq(ExternalAccounts.accountId, accountId), eq(ExternalAccounts.kind, 'DISCORD')))
    .then(first);

  const query = schema.safeParse(Object.fromEntries(url.searchParams));
  if (!discordAccount && query.success) {
    const state = cookies.get('discord_oauth_state');
    cookies.delete('discord_oauth_state', { path: '/' });
    if (state !== query.data.state) {
      throw error(400, 'Invalid state');
    }

    const accessToken = await fetch('https://discord.com/api/oauth2/token', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: new URLSearchParams({
        client_id: env.DISCORD_OAUTH_CLIENT_ID,
        client_secret: env.DISCORD_OAUTH_CLIENT_SECRET,
        code: query.data.code,
        redirect_uri: OAUTH_REDIRECT_URI,
        grant_type: 'authorization_code',
      }),
    })
      .then((response) => response.json() as Promise<{ access_token: string }>)
      .then((data) => data.access_token);

    const discordUser = await fetch('https://discord.com/api/users/@me', {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    }).then(
      (response) =>
        response.json() as Promise<{ id: string; username: string; avatar: string | null }>,
    );

    await db.transaction(async (tx) => {
      discordAccount = await tx
        .insert(ExternalAccounts)
        .values({
          accountId,
          kind: 'DISCORD',
          externalId: discordUser.id,
          data: {
            username: discordUser.username,
            avatarHash: discordUser.avatar,
          },
        })
        .returning({
          externalId: ExternalAccounts.externalId,
          data: ExternalAccounts.data,
        })
        .then(firstOrThrow);
    });

  }

  return {
    discordAccountData: discordAccount
      ? {
          id: discordAccount.externalId,
          username: discordAccount.data?.username ?? '',
          avatarHash: discordAccount.data?.avatarHash ?? null,
        }
      : null,
  };
};

export const actions = {
  authorize: ({ cookies }) => {
    const state = randomId();
    cookies.set('discord_oauth_state', state, {
      httpOnly: true,
      secure: true,
      sameSite: 'lax',
      path: '/',
    });

    redirect(
      303,
      `https://discord.com/oauth2/authorize?client_id=${env.DISCORD_OAUTH_CLIENT_ID}&response_type=code&redirect_uri=${OAUTH_REDIRECT_URI}&scope=identify&state=${state}`,
    );
  },

  setRole: async ({ locals }) => {
    if (!locals.session) {
      throw error(401, 'Unauthorized');
    }

    const discordAccount = await db
      .select({
        externalId: ExternalAccounts.externalId,
      })
      .from(ExternalAccounts)
      .where(
        and(
          eq(ExternalAccounts.accountId, locals.session.account.id),
          eq(ExternalAccounts.kind, 'DISCORD'),
        ),
      )
      .then(firstOrThrow);

    await getDiscordMember(discordAccount.externalId).then((member) =>
      member.roles.add(env.DISCORD_ROLE_ID),
    );
  },

  revoke: async ({ locals }) => {
    if (!locals.session) {
      throw error(401, 'Unauthorized');
    }

    const discordAccount = await db
      .delete(ExternalAccounts)
      .where(
        and(
          eq(ExternalAccounts.accountId, locals.session.account.id),
          eq(ExternalAccounts.kind, 'DISCORD'),
        ),
      )
      .returning({ externalId: ExternalAccounts.externalId })
      .then(firstOrThrow);

    await getDiscordMember(discordAccount.externalId).then((member) =>
      member.roles.remove(env.DISCORD_ROLE_ID),
    );
  }
};
