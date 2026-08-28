<template>
  <div id="app">
    <nav>
      <ul>
        <li>
          <router-link :to="{ name: 'cocktail_list' }">list</router-link>
        </li>
        <li>
          <router-link :to="{ name: 'cocktail_new' }">
            new cocktail
          </router-link>
        </li>
      </ul>
    </nav>
    <router-view />
  </div>
</template>

<script>
export default {
  name: 'App',
};
</script>

<style>
/* Add your global styles here */
</style>
