import router from './router';

export const routeToCocktail = (cocktail) =>
  router.push({ name: 'cocktail_detail', params: { id: cocktail.id } });

export const routeToCocktails = () => router.push({ name: 'cocktail_list' });
