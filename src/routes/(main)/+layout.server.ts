import { redirect } from '@sveltejs/kit';

export const load = async ({ locals }) => {
  return {
    account: locals.session?.account,
  };
};
