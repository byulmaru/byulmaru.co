import type { RouteConfig } from '@react-router/dev/routes';
import { index, route } from '@react-router/dev/routes';

export default [
  index('routes/home.tsx'),
  route('about-us', 'routes/about-us.tsx'),
  route('our-work', 'routes/our-work.tsx'),
] satisfies RouteConfig;
