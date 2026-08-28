<template>
  <div>
    <h1>Cocktails List</h1>
    <div v-if="loading">Loading...</div>
    <div v-else-if="error">{{ error }}</div>
    <div v-else>
      <label for="search">Search by description:</label>
      <input type="text" id="search" />
      <ul>
        <li v-for="item in data" :key="item.id">
          <router-link
            :to="{ name: 'cocktail_detail', params: { id: item.id } }"
          >
            {{ item.title }}
          </router-link>
          <p>price: {{ item.price }}</p>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import { ref, onMounted } from 'vue';
import { getCocktails } from '@/api/resources/cocktails';

export default {
  name: 'CocktailList',
  setup() {
    const data = ref([]);
    const loading = ref(true);
    const error = ref(null);

    onMounted(() =>
      getCocktails()
        .then((result) => (data.value = result))
        .catch((error) => (error.value = error.message))
        .finally(() => (loading.value = false))
    );
    return {
      data,
      loading,
      error,
    };
  },
};
</script>

<style scoped>
li > p,
li > a {
  display: inline;
}
li > p {
  margin-left: 1rem;
}
</style>
