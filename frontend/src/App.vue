<template>
  <v-app>
    <v-app-bar>
      <template v-slot:prepend>
        <v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>
      </template>

      <v-app-bar-title>🍸 The Nojito Lounge</v-app-bar-title>

      <template v-slot:append>
        <v-menu>
          <template v-slot:activator="{ props }">
            <v-btn
              icon="mdi-dots-vertical"
              :class="{ 'context-menu-attention': hintApiDocumentation }"
              v-bind="props"
            ></v-btn>
          </template>

          <v-list>
            <v-list-item
              :to="{ name: 'docs' }"
              prepend-icon="mdi-file-document-outline"
              title="API Documentation"
            />
          </v-list>
        </v-menu>
      </template>
    </v-app-bar>

    <v-snackbar
      v-model="hintApiDocumentation"
      location="top end"
      color="grey-darken-4"
      vertical
      :timeout="-1"
    >
      <v-icon icon="mdi-information-outline" class="mr-2"></v-icon>
      Don't forget to check the API documentation!

      <template v-slot:actions>
        <v-btn variant="text" ripple @click="hintApiDocumentation = false">
          Close
        </v-btn>
      </template>
    </v-snackbar>

    <v-navigation-drawer v-model="drawer">
      <v-list :items="items">
        <v-list-item :to="{ name: 'cocktail_list' }" title="Cocktails" />
        <v-list-item :to="{ name: 'cocktail_new' }" title="New Cocktail" />
      </v-list>
    </v-navigation-drawer>

    <v-main class="app-background d-flex align-center justify-center">
      <v-container style="max-width: 1024px">
        <router-view />
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
import { ref, watch } from 'vue';

const HINT_API_DOCUMENTATION = 'hint-api-documentation';

export default {
  name: 'App',
  setup() {
    const drawer = ref(true);
    const hintApiDocumentation = ref(
      !localStorage.getItem(HINT_API_DOCUMENTATION),
    );
    watch(hintApiDocumentation, (value) => {
      if (!value) {
        localStorage.setItem(HINT_API_DOCUMENTATION, 'true');
      }
    });
    return {
      drawer,
      hintApiDocumentation,
    };
  },
};
</script>

<style scoped>
.app-background {
  background-image:
    linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.4)),
    url('@/assets/the-nojito-lounge.jpeg');
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
}

.context-menu-attention {
  animation: context-menu-pulse 1.6s ease-in-out infinite;
}

@keyframes context-menu-pulse {
  0%,
  100% {
    box-shadow: 0 0 0 0 rgba(var(--v-theme-primary), 0.5);
  }
  50% {
    box-shadow: 0 0 0 6px rgba(var(--v-theme-primary), 0);
  }
}

@media (prefers-reduced-motion: reduce) {
  .context-menu {
    animation: none;
  }
}
</style>
