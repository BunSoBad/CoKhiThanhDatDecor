import { getCategoryBySlug } from './src/lib/data';
(async () => {
  console.log(await getCategoryBySlug('cong-tu-dong'));
  console.log(await getCategoryBySlug('non-existent'));
})();
