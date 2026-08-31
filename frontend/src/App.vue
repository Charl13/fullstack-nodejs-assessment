<template>
  <v-app>
    <v-app-bar>
      <template v-slot:prepend>
        <v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>
      </template>

      <v-app-bar-title>🍸 The Nojito Lounge</v-app-bar-title>

      <template v-slot:append>
        <v-btn icon="mdi-dots-vertical"></v-btn>
      </template>
    </v-app-bar>

    <v-navigation-drawer v-model="drawer">
      <v-list :items="items">
        <v-list-item :to="{ name: 'cocktail_list' }" title="Cocktails" />
        <v-list-item :to="{ name: 'cocktail_new' }" title="New Cocktail" />
      </v-list>
    </v-navigation-drawer>

    <v-main class="d-flex align-center justify-center">
      <v-container style="max-width: 1024px">
        <router-view />
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
import { ref } from 'vue';
export default {
  name: 'App',
  setup() {
    const drawer = ref(true);

    return {
      drawer,
    };
  },
};
</script>

<style>
/* Add your global styles here */
</style>
