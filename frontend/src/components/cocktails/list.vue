<template>
  <div>
    <h1>Cocktails List</h1>
    <div v-if="loading">Loading...</div>
    <div v-else-if="error">{{ error }}</div>
    <div v-else>
      <label for="search">Search by description:</label>
      <input type="text" id="search" v-model="search" />
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
import { ref, onMounted, watch } from 'vue';
import { getCocktails } from '@/api/resources/cocktails';

export default {
  name: 'CocktailList',
  setup() {
    const data = ref([]);
    const loading = ref(true);
    const error = ref(null);
    const search = ref('');

    const fetchData = () =>
      getCocktails(search.value)
        .then((result) => (data.value = result))
        .catch((err) => (error.value = err.message));

    onMounted(() => {
      fetchData().finally(() => (loading.value = false));
    });
    watch(search, fetchData);

    return {
      data,
      loading,
      error,
      search,
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
