<template>
  <div v-if="!imageLoaded" id="image-placeholder">
    ⏳Your cocktail is being visualed ...
  </div>

  <div v-if="cocktail">
    <img
      v-show="imageLoaded"
      :alt="cocktail.title"
      :src="createImageUrl(cocktail)"
      @load="imageLoaded = true"
      @error="imageLoaded = true"
    />

    <h1>{{ cocktail.title }}</h1>

    <span>price: {{ cocktail.price }}</span>

    <p>{{ cocktail.description }}</p>
  </div>
</template>

<script>
import { ref, onMounted, watch } from 'vue';
import { useRoute } from 'vue-router';
import { getCocktail } from '@/api/resources/cocktails';

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

    return {
      cocktail,
      imageLoaded,
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
  width: 640px;
  height: 480px;
  display: grid;
  place-items: center;
  border: 1px solid gray;
}
</style>
