import { json } from '@sveltejs/kit';
import { eq } from 'drizzle-orm';
import { db, firstOrThrow } from '$lib/server/db';
import { Accounts, Emails } from '$lib/server/db/schema';

export const GET = async ({ locals }) => {
  if (!locals.oAuthSession) {
    return json({ error: 'invalid_token' }, { status: 401 });
  }

  const user = await db
    .select({
      id: Accounts.id,
      name: Accounts.name,
      email: Emails.email,
    })
    .from(Accounts)
    .innerJoin(Emails, eq(Accounts.primaryEmailId, Emails.id))
    .where(eq(Accounts.id, locals.oAuthSession.accountId))
    .then(firstOrThrow);

  const scopes = locals.oAuthSession.scopes || [];

  // scope에 따라 응답할 claims 결정
  const userInfo: Record<string, unknown> = {
    sub: user.id,
  };

  if (scopes.includes('profile')) {
    userInfo.name = user.name;
  }

  if (scopes.includes('email')) {
    userInfo.email = user.email;
  }

  return json(userInfo);
};
