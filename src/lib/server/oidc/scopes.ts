import { z } from 'zod';

export const SUPPORTED_SCOPES = ['openid', 'profile', 'email'] as const;
export const supportedScopeSchema = z.enum(SUPPORTED_SCOPES);
export type SupportedScope = z.infer<typeof supportedScopeSchema>;

export const isOIDCRequest = (scopes: SupportedScope[]): boolean => {
  return scopes.includes('openid');
};

export const validateScopes = (
  requestedScopes: SupportedScope[],
  supportedScopes: SupportedScope[],
): boolean => {
  return requestedScopes.every((scope) => supportedScopes.includes(scope));
};
