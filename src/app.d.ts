import type { SupportedScope } from '$lib/server/oidc/scopes';

declare global {
  namespace App {
    interface Locals {
      session:
        | {
            token: string;
            account: {
              id: string;
              name: string;
              primaryEmail: string;
              primaryEmailId: string;
            };
          }
        | undefined;
      oAuthSession:
        | {
            token: string;
            applicationId: string;
            accountId: string;
            scopes: SupportedScope[];
          }
        | undefined;
      deviceId: string;
    }
  }
}

export {};
