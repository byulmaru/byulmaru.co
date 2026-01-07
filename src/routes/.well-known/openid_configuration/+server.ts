import { json } from '@sveltejs/kit';
import { env as publicEnv } from '$env/dynamic/public';

export const GET = async () => {
  return json({
    issuer: publicEnv.PUBLIC_OIDC_ISSUER,
    authorization_endpoint: `${publicEnv.PUBLIC_ORIGIN}/oauth/authorize`,
    token_endpoint: `${publicEnv.PUBLIC_ORIGIN}/oauth/token`,
    userinfo_endpoint: `${publicEnv.PUBLIC_ORIGIN}/api/account`,
    jwks_uri: `${publicEnv.PUBLIC_ORIGIN}/.well-known/jwks.json`,
    scopes_supported: ['openid', 'profile', 'email'],
    response_types_supported: ['code'],
    subject_types_supported: ['public'],
    id_token_signing_alg_values_supported: ['EdDSA'],
    token_endpoint_auth_methods_supported: ['client_secret_post'],
  });
};
