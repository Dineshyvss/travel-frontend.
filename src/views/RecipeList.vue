<script setup>
import { onMounted } from "vue";
import { ref, reactive } from "vue";
import RecipeCard from "../components/RecipeCardComponent.vue";
import RecipeServices from "../services/RecipeServices.js";

const recipes = ref([]);
const message = ref("");

onMounted(() => {
  getRecipes();
});

function getRecipes() {
  RecipeServices.getRecipes()
    .then((response) => {
      recipes.value = response.data;
      console.log(recipes);
    })
    .catch((error) => {
      console.log(error);
      message.value = error.response.data.message;
    });
}
</script>

<template>
  <v-container>
    <div id="body">
      <h1>Recipes</h1>
      <br />
      <p>{{ message }}</p>

      <RecipeCard
        v-for="recipe in recipes"
        :key="recipe.id"
        :recipe="recipe"
        @deletedList="getLists()"
      />
    </div>
  </v-container>
</template>
