<template>
  <v-card :loading="!imageLoaded" class="mx-auto my-12" max-width="840">
    <template v-slot:loader="{ isActive }">
      <v-progress-linear
        :active="isActive"
        color="deep-purple"
        height="4"
        indeterminate
      ></v-progress-linear>
    </template>

    <template v-if="cocktail">
      <v-img
        height=""
        cover
        :alt="cocktail.title"
        :src="createImageUrl(cocktail)"
        @load="imageLoaded = true"
        @error="imageLoaded = true"
      ></v-img>

      <v-card-item>
        <v-card-title>{{ cocktail.title }}</v-card-title>
      </v-card-item>

      <v-card-text>
        <v-row class="align-center">
          <v-rating
            :model-value="rating"
            color="amber"
            density="compact"
            size="small"
            half-increments
            readonly
          ></v-rating>

          <div class="text-grey ms-4">{{ rating }} ({{ votes }})</div>
        </v-row>

        <div class="my-4 text-body-large">€ {{ cocktail.price }}</div>

        <div>{{ cocktail.description }}</div>
      </v-card-text>

      <v-divider class="mx-4 mb-1"></v-divider>

      <v-card-actions>
        <v-btn
          text="Back"
          block
          border
          @click="() => routeToCocktails()"
        ></v-btn>
      </v-card-actions>
    </template>
  </v-card>
</template>

<script>
import { ref, onMounted, watch, computed } from 'vue';
import { useRoute } from 'vue-router';
import { routeToCocktails } from '@/routes';
import { getCocktail } from '@/api/resources/cocktails';

const seededRandom = (seed) => {
  const x = Math.sin(seed) * 10000;
  return x - Math.floor(x);
};

export default {
  name: 'CocktailDetail',
  setup() {
    const route = useRoute();
    const cocktail = ref();
    const imageLoaded = ref(false);

    const fetchCocktail = (id) => {
      cocktail.value = undefined;
      imageLoaded.value = false;
      getCocktail(id).then((result) => (cocktail.value = result));
    };

    watch(
      () => route.params.id,
      (id) => fetchCocktail(id),
    );
    onMounted(() => fetchCocktail(route.params.id));

    const rating = computed(() => {
      if (!cocktail.value) return 0;
      const value = 3.5 + seededRandom(cocktail.value.id) * 1.5;
      return Math.round(value * 2) / 2;
    });
    const votes = computed(() => {
      if (!cocktail.value) return 0;
      return Math.floor(50 + seededRandom(cocktail.value.id + 1) * 450);
    });
    return {
      cocktail,
      imageLoaded,
      rating,
      votes,
      routeToCocktails,
    };
  },
  methods: {
    createImageUrl: (cocktail) => {
      const query = new URLSearchParams({
        width: 640,
        height: 480,
        model: 'flux',
      });
      const prompt = encodeURIComponent(
        ['a', cocktail.title, 'cocktail'].join(' '),
      );
      return `https://image.pollinations.ai/prompt/${prompt}?${query}`;
    },
  },
};
</script>

<style scoped>
div > span {
  font-weight: bold;
}
div#image-placeholder {
  width: 840px;
  height: 480px;
  display: grid;
  place-items: center;
  border: 1px solid gray;
}
</style>
