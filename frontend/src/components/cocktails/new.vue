<template>
  <cocktail-form @submit="() => routeToCocktails()" />
</template>

<script>
import CocktailForm from '@/components/cocktails/form.vue';
import { routeToCocktails } from '@/routes';

export default {
  name: 'CocktailNew',
  components: {
    CocktailForm,
  },
  setup() {
    return {
      routeToCocktails,
    };
  },
};
</script>
