<script setup>
import { reactive, ref } from "vue";

const ingredients = ref([
  "flour",
  "sugar",
  "salt",
  "butter",
  "eggs",
  "vanilla extract",
  "chocolate chips",
  "milk",
  "baking powder",
  "cocoa powder",
]);

const recipe = reactive({
  name: "",
  description: "",
  servings: 0,
  time: 0,
  steps: [
    {
      description: "",
      ingredients: [],
    },
  ],
});

const selectedIngredients = ref([]);

function addStep() {
  recipe.steps.push({
    description: "",
    ingredients: [],
  });
}

function removeStep(index) {
  recipe.steps.splice(index, 1);
}

function submitForm() {
  // Save the recipe to the database
  console.log(recipe);
  console.log(selectedIngredients);
}
</script>

<template>
  <v-container>
    <h1>Add Recipe</h1>
    <v-form @submit.prevent="submitForm">
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
      <v-select
        v-model="selectedIngredients"
        :items="ingredients"
        label="Ingredients"
        multiple
        required
      ></v-select>
      <v-list>
        <v-subheader>Recipe Steps</v-subheader>
        <v-divider></v-divider>
        <v-list-item-group v-model="recipe.steps">
          <v-list-item v-for="(step, index) in recipe.steps" :key="index">
            <v-list-item-content>
              <v-textarea
                v-model="step.description"
                label="Description"
              ></v-textarea>
              <v-select
                v-model="step.ingredients"
                :items="ingredients"
                label="Ingredients"
                multiple
              ></v-select>
            </v-list-item-content>
            <v-list-item-action>
              <v-btn icon @click="removeStep(index)">
                <v-icon>mdi-delete</v-icon>
              </v-btn>
            </v-list-item-action>
          </v-list-item>
        </v-list-item-group>
      </v-list>
      <v-btn color="primary" @click="addStep">Add Step</v-btn>
      <v-btn type="submit" color="primary">Save</v-btn>
    </v-form>
  </v-container>
</template>
