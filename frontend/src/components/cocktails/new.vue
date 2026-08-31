<template>
  <cocktail-form @submit="(created) => routeToCocktail(created)" />
</template>

<script>
import CocktailForm from '@/components/cocktails/form.vue';
import { routeToCocktail } from '@/routes';

export default {
  name: 'CocktailNew',
  components: {
    CocktailForm,
  },
  setup() {
    return {
      routeToCocktail,
    };
  },
};
</script>
