import { isRedirect, redirect } from '@sveltejs/kit';
import qs from 'query-string';
import { match } from 'ts-pattern';
import { z } from 'zod';
import type { Cookies } from '@sveltejs/kit';
import { supportedScopeSchema } from './server/oidc/scopes';

const redirectTargetSchema = z.discriminatedUnion('kind', [
  z.object({
    kind: z.literal('OAUTH_AUTHORIZE'),
    clientId: z.string(),
    redirectUri: z.url(),
    state: z.string().optional(),
    scope: z.array(supportedScopeSchema),
  }),
]);

type SetRedirectCookieParams = {
  cookies: Cookies;
  target: z.infer<typeof redirectTargetSchema>;
};
export const setRedirectCookie = ({ cookies, target }: SetRedirectCookieParams) => {
  cookies.set('redirect_after_auth', JSON.stringify(target), {
    path: '/',
    httpOnly: true,
    sameSite: 'lax',
  });
};

type RedirectToCookieIfExistsParams = {
  cookies: Cookies;
};
export const redirectToCookieIfExists = ({ cookies }: RedirectToCookieIfExistsParams) => {
  const cookie = cookies.get('redirect_after_auth');

  if (!cookie) {
    return;
  }

  cookies.delete('redirect_after_auth', { path: '/' });

  try {
    const target = redirectTargetSchema.parse(JSON.stringify(cookie));
    redirect(
      303,
      match(target.kind)
        .with('OAUTH_AUTHORIZE', () =>
          qs.stringifyUrl({
            url: '/oauth/authorize',
            query: {
              client_id: target.clientId,
              redirect_uri: target.redirectUri,
              state: target.state,
              scope: target.scope.join(' '),
            },
          }),
        )
        .exhaustive(),
    );
  } catch (err) {
    if (isRedirect(err)) {
      throw err;
    }
  }
};
