import { configure, getConsoleSink } from '@logtape/logtape';
import { and, eq, isNotNull, isNull } from 'drizzle-orm';
import { env as publicEnv } from '$env/dynamic/public';
import { Accounts, db, Emails, first, Sessions } from '$lib/server/db';
import { randomId } from '$lib/server/id';

export const init = async () => {
  await configure({
    sinks: { console: getConsoleSink() },
    loggers: [
      { category: ['drizzle-orm'], sinks: ['console'], lowestLevel: 'debug' },
      { category: ['server'], sinks: ['console'], lowestLevel: 'debug' },
    ],
  });
};

export const handle = async ({ event, resolve }) => {
  let deviceId = event.cookies.get('deviceid');
  if (!deviceId) {
    deviceId = randomId();
    event.cookies.set('deviceid', deviceId, {
      httpOnly: true,
      secure: true,
      sameSite: 'lax',
      domain: publicEnv.PUBLIC_COOKIE_DOMAIN,
      path: '/',
    });
  }

  event.locals.deviceId = deviceId;

  const headerToken =
    event.request.headers.get('Authorization')?.match(/^Bearer\s+(.*)$/)?.[1] ?? null;
  if (headerToken) {
    const session = await db
      .select({
        accountId: Sessions.accountId,
        applicationId: Sessions.applicationId,
        scopes: Sessions.scopes,
      })
      .from(Sessions)
      .where(and(eq(Sessions.token, headerToken), isNotNull(Sessions.applicationId)))
      .then(first);

    if (session) {
      event.locals.oAuthSession = {
        token: headerToken,
        accountId: session.accountId,
        applicationId: session.applicationId!,
        scopes: session.scopes ?? [],
      };
    }
  }

  const cookieToken = event.cookies.get('session');
  if (cookieToken) {
    const account = await db
      .select({
        id: Accounts.id,
        name: Accounts.name,
        primaryEmail: Emails.email,
        primaryEmailId: Accounts.primaryEmailId,
      })
      .from(Accounts)
      .innerJoin(Emails, eq(Accounts.primaryEmailId, Emails.id))
      .innerJoin(Sessions, eq(Sessions.accountId, Accounts.id))
      .where(and(eq(Sessions.token, cookieToken), isNull(Sessions.applicationId)))
      .then(first);

    if (account) {
      event.locals.session = {
        token: cookieToken,
        account: {
          id: account.id,
          name: account.name,
          primaryEmail: account.primaryEmail,
          primaryEmailId: account.primaryEmailId,
        },
      };
    }
  }

  return resolve(event);
};

export const handleError = ({ error }) => {
  console.error(error);
};
