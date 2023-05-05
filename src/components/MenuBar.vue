<script setup>
import ocLogo from "/oc_logo.png";
import { ref, onMounted } from "vue";

const user = ref(null);
const title = ref("Recipes");
const logoURL = ref("");

onMounted(() => {
  logoURL.value = ocLogo;
});
</script>

<template>
  <div>
    <v-app-bar color="primary" app dark>
      <router-link :to="{ name: 'recipes' }">
        <v-img
          class="mx-2"
          :src="logoURL"
          height="50"
          width="50"
          contain
        ></v-img>
      </router-link>
      <v-toolbar-title class="title">
        {{ title }}
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn class="mx-2" :to="{ name: 'recipes' }"> Recipes </v-btn>
      <v-btn class="mx-2" :to="{ name: 'ingredients' }"> Ingredients </v-btn>
    </v-app-bar>
  </div>
</template>
