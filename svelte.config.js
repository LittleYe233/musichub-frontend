import sveltePreprocess from 'svelte-preprocess';
import { sass } from 'svelte-preprocess-sass';

export default {
  // Consult https://github.com/sveltejs/svelte-preprocess
  // for more information about preprocessors
  preprocess: [
    sveltePreprocess({
      postcss: true,
      sass: sass(),
    }),
  ],
  experimental: {
    prebundleSvelteLibraries: true,
  },
};
