<script setup>
import { onMounted } from "vue";
import { ref, reactive } from "vue";
import RecipeCard from "../components/RecipeCardComponent.vue";
import RecipeServices from "../services/RecipeServices.js";

const recipes = ref([]);
const isAdd = ref(false);
const snackbar = reactive({
  value: false,
  color: "",
  text: "",
});
const newRecipe = reactive({
  name: "",
  description: "",
  servings: 0,
  time: "30",
});

onMounted(async () => {
  await getRecipes();
});

async function getRecipes() {
  await RecipeServices.getRecipes()
    .then((response) => {
      recipes.value = response.data;
      console.log(recipes);
    })
    .catch((error) => {
      console.log(error);
      snackbar.value = true;
      snackbar.color = "error";
      snackbar.text = error.response.data.message;
    });
}

async function addRecipe() {
  console.log(newRecipe.name);
  isAdd.value = false;
  await RecipeServices.addRecipe(newRecipe)
    .then(() => {
      snackbar.value = true;
      snackbar.color = "green";
      snackbar.text = `${newRecipe.name} added successfully!`;
    })
    .catch((error) => {
      console.log(error);
      snackbar.value = true;
      snackbar.color = "error";
      snackbar.text = error.response.data.message;
    });
  await getRecipes();
}

function openAdd() {
  isAdd.value = true;
}

function closeAdd() {
  isAdd.value = false;
}

function closeSnackBar() {
  snackbar.value = false;
}
</script>

<template>
  <v-container>
    <div id="body">
      <v-row align="center" class="mb-4">
        <v-col cols="10"
          ><v-card-title class="pl-0 text-h4 font-weight-bold"
            >Recipes
          </v-card-title>
        </v-col>
        <v-col class="d-flex justify-end" cols="2">
          <v-btn color="accent" @click="openAdd()">Add</v-btn>
        </v-col>
      </v-row>

      <RecipeCard
        v-for="recipe in recipes"
        :key="recipe.id"
        :recipe="recipe"
        @deletedList="getLists()"
      />

      <v-dialog persistent v-model="isAdd" width="800">
        <v-card class="rounded-lg elevation-5">
          <v-card-item>
            <v-card-title class="headline mb-2">Add Recipe </v-card-title>
          </v-card-item>
          <v-card-text>
            <v-text-field
              v-model="newRecipe.name"
              label="Name"
              required
            ></v-text-field>

            <v-textarea
              v-model="newRecipe.description"
              label="Description"
            ></v-textarea>
            <v-text-field
              v-model.number="newRecipe.servings"
              label="Number of Servings"
              type="number"
            ></v-text-field>
            <v-text-field
              v-model.number="newRecipe.time"
              label="Time to Make (in minutes)"
              type="number"
            ></v-text-field>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn variant="flat" color="secondary" @click="closeAdd()"
              >Close</v-btn
            >
            <v-btn variant="flat" color="primary" @click="addRecipe()"
              >Add Recipe</v-btn
            >
          </v-card-actions>
        </v-card>
      </v-dialog>
      <v-snackbar v-model="snackbar.value" rounded="pill">
        {{ snackbar.text }}

        <template v-slot:actions>
          <v-btn
            :color="snackbar.color"
            variant="text"
            @click="closeSnackBar()"
          >
            Close
          </v-btn>
        </template>
      </v-snackbar>
    </div>
  </v-container>
</template>
