<script setup>
import { reactive, ref } from "vue";
import { useRouter } from "vue-router";
import RecipeServices from "../services/RecipeServices";

const router = useRouter();

const recipe = reactive({
  name: "",
  description: "",
  servings: 0,
  time: "30",
});

function saveRecipe() {
  console.log(recipe);
  RecipeServices.addRecipe(recipe)
    .then(() => {
      console.log("Recipe added");
      router.push({ name: "recipes" });
    })
    .catch((error) => {
      console.log(error);
    });
}
</script>

<template>
  <v-container>
    <h1 class="mb-2">Add Recipe</h1>
    <v-text-field v-model="recipe.name" label="Name" required></v-text-field>

    <v-textarea v-model="recipe.description" label="Description"></v-textarea>
    <v-text-field
      v-model.number="recipe.servings"
      label="Number of Servings"
      type="number"
    ></v-text-field>
    <v-text-field
      v-model.number="recipe.time"
      label="Time to Make (in minutes)"
      type="number"
    ></v-text-field>

    <v-btn color="primary" @click="saveRecipe()">Save Recipe</v-btn>
  </v-container>
</template>
