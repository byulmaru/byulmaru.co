import { articles } from '../data';
import { error } from '@sveltejs/kit';

export const load = ({ params }) => {
  const article = articles.find(a => a.slug === params.slug);
  
  if (!article) {
    throw error(404);
  }

  return {
    article
  };
};
