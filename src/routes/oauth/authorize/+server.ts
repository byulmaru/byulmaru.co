import { error, redirect } from '@sveltejs/kit';
import { and, eq } from 'drizzle-orm';
import { Temporal } from 'temporal-polyfill';
import { z } from 'zod';
import { setRedirectCookie } from '$lib/redirect';
import {
  db,
  firstOrThrow,
  firstOrThrowWith,
  OAuthApplicationRedirectUris,
  OAuthApplications,
  OAuthApplicationTokens,
} from '$lib/server/db';
import { supportedScopeSchema, validateScopes } from '$lib/server/oidc/scopes';
import { uriToRedirectUrl } from '$lib/url';
import { randomId } from '$lib/server/id';

const OAuthAuthorizeSchema = z.object({
  response_type: z.enum(['code']),
  client_id: z.string(),
  redirect_uri: z.url().transform(uriToRedirectUrl),
  scope: z.preprocess(
    (val) => (typeof val === 'string' ? val.split(' ') : val),
    z.array(supportedScopeSchema).default([]),
  ),
  state: z.string().max(4096).optional(),
});

export const GET = async ({ cookies, url, locals }) => {
  const { client_id, redirect_uri, state, scope } = OAuthAuthorizeSchema.parse(
    Object.fromEntries(url.searchParams),
  );

  const application = await db
    .select({
      id: OAuthApplications.id,
      redirectUriId: OAuthApplicationRedirectUris.id,
      scopes: OAuthApplications.scopes,
    })
    .from(OAuthApplications)
    .leftJoin(
      OAuthApplicationRedirectUris,
      and(
        eq(OAuthApplications.id, OAuthApplicationRedirectUris.applicationId),
        eq(OAuthApplicationRedirectUris.redirectUri, redirect_uri.toString()),
      ),
    )
    .where(eq(OAuthApplications.id, client_id))
    .then(firstOrThrowWith(() => error(404, { message: 'app_not_found' })));

  if (!application.redirectUriId) {
    throw error(400, { message: 'invalid_redirect_uri' });
  }

  if (!validateScopes(scope, application.scopes)) {
    throw error(400, { message: 'invalid_scope' });
  }

  if (locals.session) {
    const session = locals.session;
    return redirect(
      303,
      await db.transaction(async (tx) => {
        const token = await tx
          .insert(OAuthApplicationTokens)
          .values({
            accountId: session.account.id,
            applicationId: application.id,
            redirectUriId: application.redirectUriId!,
            token: randomId(),
            scopes: scope,
            expiresAt: Temporal.Now.instant().add({ minutes: 5 }),
          })
          .returning({
            token: OAuthApplicationTokens.token,
          })
          .then(firstOrThrow);

        redirect_uri.searchParams.set('code', token.token);
        if (state) {
          redirect_uri.searchParams.set('state', state);
        }

        return redirect_uri.toString();
      }),
    );
  } else {
    setRedirectCookie({
      cookies,
      target: {
        kind: 'OAUTH_AUTHORIZE',
        clientId: client_id,
        redirectUri: redirect_uri.toString(),
        state,
        scope,
      },
    });

    return redirect(303, '/auth');
  }
};
