<script setup>
import { onMounted, reactive, ref } from "vue";
import { useRouter, useRoute } from "vue-router";
import RecipeServices from "../services/RecipeServices";
import StepComponent from "../components/StepComponent.vue";

const router = useRouter();
const route = useRoute();

const recipe = ref({});

onMounted(() => {
  getRecipe();
});

function getRecipe() {
  RecipeServices.getRecipe(route.params.id)
    .then((response) => {
      recipe.value = response.data[0];
    })
    .catch((error) => {
      console.log(error);
    });
  console.log(recipe);
}
</script>

<template>
  <v-container>
    <h1 class="mb-2">View Recipe</h1>
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

    <v-row>
      <v-col> Step </v-col>
      <v-col> Description </v-col>
    </v-row>

    <StepComponent
      v-for="step in recipe.recipeStep"
      :recipeStep="step"
    ></StepComponent>

    <v-btn color="primary" @click="updateRecipe()">Update Recipe</v-btn>
  </v-container>
</template>
