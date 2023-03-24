import createCache from '@emotion/cache';
import { prefixer} from 'stylis';
import rtlPlugin from 'stylis-plugin-rtl';

function createEmotionCache() {
  return createCache({
    key: 'muirtl',
    prepend: true,
    stylisPlugins: [prefixer, rtlPlugin],
  });
}

export default createEmotionCache;
