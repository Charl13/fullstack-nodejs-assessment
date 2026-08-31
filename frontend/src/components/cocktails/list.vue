<template>
  <div class="d-flex justify-end mb-4">
    <v-dialog v-model="dialog" width="640">
      <template v-slot:activator="{ props: activatorProps }">
        <v-btn
          v-bind="activatorProps"
          text="Add cocktail"
          color="primary"
          prepend-icon="mdi-plus"
        ></v-btn>
      </template>

      <template v-slot:default="{}">
        <cocktail-form
          cancel
          @cancel="dialog = false"
          @submit="loading = true"
        />
      </template>
    </v-dialog>
  </div>

  <v-card>
    <v-text-field
      v-model="search"
      density="compact"
      placeholder="Type 'Nojito'..."
      prepend-inner-icon="mdi-magnify"
      variant="outlined"
      hide-details
    ></v-text-field>

    <div v-if="error">{{ error }}</div>

    <v-data-table
      :headers="headers"
      :items="data"
      :items-per-page="-1"
      :loading="loading"
      :height="800"
      item-value="id"
      fixed-footer
      fixed-header
      @click:row="(event, { item }) => routeToCocktail(item)"
    >
      <template #[`item.price`]="{ value }">
        € {{ value.toLocaleString() }}
      </template>
    </v-data-table>
  </v-card>
</template>

<script>
import { ref, onMounted, watch } from 'vue';
import { getCocktails } from '@/api/resources/cocktails';
import { routeToCocktail } from '@/routes';
import CocktailForm from '@/components/cocktails/form.vue';

export default {
  name: 'CocktailList',
  components: {
    CocktailForm,
  },
  setup() {
    const data = ref([]);
    const loading = ref(false);
    const error = ref(null);
    const search = ref('');
    const dialog = ref(false);
    const headers = [
      { title: 'Name', key: 'title', align: 'start' },
      { title: 'Price (€)', key: 'price', align: 'end' },
    ];
    watch(search, (value) => {
      if (value.length === 0 || value.length >= 4) {
        loading.value = true;
      }
    });
    watch(loading, (isLoading) => {
      if (isLoading) {
        getCocktails(search.value)
          .then((result) => (data.value = result))
          .catch((err) => (error.value = err.message))
          .finally(() => (loading.value = false));
      }
    });
    watch(loading, (loading) => {
      if (!loading) {
        dialog.value = false;
      }
    });
    onMounted(() => (loading.value = true));
    return {
      data,
      loading,
      error,
      search,
      headers,
      routeToCocktail,
      dialog,
    };
  },
};
</script>

<style scoped>
.v-data-table-footer {
  position: sticky;
  background-color: inherit;
  border-top: 1px solid rgba(var(--v-border-color), var(--v-border-opacity));
  bottom: 0;
}
</style>
