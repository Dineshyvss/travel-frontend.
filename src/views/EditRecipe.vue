<script setup>
import { onMounted, reactive, ref } from "vue";
import { useRouter, useRoute } from "vue-router";
import IngredientServices from "../services/IngredientServices.js";
import RecipeIngredientServices from "../services/RecipeIngredientServices";
import RecipeStepServices from "../services/RecipeStepServices";
import RecipeServices from "../services/RecipeServices";
import StepComponent from "../components/StepComponent.vue";

const route = useRoute();

const recipe = ref({});
const ingredients = ref([]);
const selectedIngredient = ref({});
const recipeIngredients = ref([]);
const recipeSteps = ref([]);
const isAddIngredient = ref(false);
const isEditIngredient = ref(false);
const isAddStep = ref(false);
const isEditStep = ref(false);
const snackbar = reactive({
  value: false,
  color: "",
  text: "",
});
const newStep = reactive({
  id: undefined,
  stepNumber: undefined,
  instruction: undefined,
  recipeId: undefined,
  recipeIngredient: [],
});
const newIngredient = reactive({
  id: undefined,
  quantity: undefined,
  recipeId: undefined,
  recipeStepId: undefined,
  ingredientId: undefined,
});

onMounted(async () => {
  await getRecipe();
  await getRecipeIngredients();
  await getIngredients();
  await getRecipeSteps();
});

async function getRecipe() {
  await RecipeServices.getRecipe(route.params.id)
    .then((response) => {
      recipe.value = response.data[0];
    })
    .catch((error) => {
      console.log(error);
    });
}

async function updateRecipe() {
  await RecipeServices.updateRecipe(recipe.value)
    .then(() => {
      snackbar.value = true;
      snackbar.color = "green";
      snackbar.text = `${recipe.value.name} updated successfully!`;
    })
    .catch((error) => {
      console.log(error);
      snackbar.value = true;
      snackbar.color = "error";
      snackbar.text = error.response.data.message;
    });
  await getRecipe();
}

async function getIngredients() {
  await IngredientServices.getIngredients()
    .then((response) => {
      ingredients.value = response.data;
    })
    .catch((error) => {
      console.log(error);
      snackbar.value = true;
      snackbar.color = "error";
      snackbar.text = error.response.data.message;
    });
}

async function getRecipeIngredients() {
  await RecipeIngredientServices.getRecipeIngredientsForRecipe(route.params.id)
    .then((response) => {
      recipeIngredients.value = response.data;
    })
    .catch((error) => {
      console.log(error);
    });
}

async function addIngredient() {
  isAddIngredient.value = false;
  newIngredient.recipeId = recipe.value.id;
  newIngredient.ingredientId = selectedIngredient.value.id;
  delete newIngredient.id;
  await RecipeIngredientServices.addRecipeIngredient(newIngredient)
    .then(() => {
      snackbar.value = true;
      snackbar.color = "green";
      snackbar.text = `Ingredient added successfully!`;
    })
    .catch((error) => {
      console.log(error);
      snackbar.value = true;
      snackbar.color = "error";
      snackbar.text = error.response.data.message;
    });
  await getRecipeIngredients();
}

async function updateIngredient() {
  isEditIngredient.value = false;
  newIngredient.recipeId = recipe.value.id;
  newIngredient.ingredientId = selectedIngredient.value.id;

  await RecipeIngredientServices.updateRecipeIngredient(newIngredient)
    .then(() => {
      snackbar.value = true;
      snackbar.color = "green";
      snackbar.text = `${selectedIngredient.value.name} updated successfully!`;
    })
    .catch((error) => {
      console.log(error);
      snackbar.value = true;
      snackbar.color = "error";
      snackbar.text = error.response.data.message;
    });
  await getRecipeIngredients();
}

async function deleteIngredient(ingredient) {
  await RecipeIngredientServices.deleteRecipeIngredient(ingredient)
    .then(() => {
      snackbar.value = true;
      snackbar.color = "green";
      snackbar.text = `${ingredient.ingredient.name} deleted successfully!`;
    })
    .catch((error) => {
      console.log(error);
      snackbar.value = true;
      snackbar.color = "error";
      snackbar.text = error.response.data.message;
    });
  await getRecipeIngredients();
}

async function checkUpdateIngredient() {
  if (newStep.recipeIngredient.length > 0) {
    for (let i = 0; i < newStep.recipeIngredient.length; i++) {
      newIngredient.id = newStep.recipeIngredient[i].id;
      newIngredient.quantity = newStep.recipeIngredient[i].quantity;
      newIngredient.recipeStepId = newStep.id;
      selectedIngredient.value.id = newStep.recipeIngredient[i].ingredientId;
      await updateIngredient();
    }
  }
}

async function getRecipeSteps() {
  await RecipeStepServices.getRecipeStepsForRecipeWithIngredients(
    route.params.id
  )
    .then((response) => {
      recipeSteps.value = response.data;
    })
    .catch((error) => {
      console.log(error);
    });
}

async function addStep() {
  isAddStep.value = false;
  newStep.recipeId = recipe.value.id;
  delete newStep.id;
  await RecipeStepServices.addRecipeStep(newStep)
    .then(() => {
      snackbar.value = true;
      snackbar.color = "green";
      snackbar.text = `Step added successfully!`;
    })
    .catch((error) => {
      console.log(error);
      snackbar.value = true;
      snackbar.color = "error";
      snackbar.text = error.response.data.message;
    });

  await checkUpdateIngredient();

  await getRecipeSteps();
}

async function updateStep() {
  isEditStep.value = false;
  await RecipeStepServices.updateRecipeStep(newStep)
    .then(() => {
      snackbar.value = true;
      snackbar.color = "green";
      snackbar.text = `Step updated successfully!`;
    })
    .catch((error) => {
      console.log(error);
      snackbar.value = true;
      snackbar.color = "error";
      snackbar.text = error.response.data.message;
    });

  await checkUpdateIngredient();

  await getRecipeSteps();
}

async function deleteStep(step) {
  await RecipeStepServices.deleteRecipeStep(step)
    .then(() => {
      snackbar.value = true;
      snackbar.color = "green";
      snackbar.text = `Step deleted successfully!`;
    })
    .catch((error) => {
      console.log(error);
      snackbar.value = true;
      snackbar.color = "error";
      snackbar.text = error.response.data.message;
    });

  await getRecipeSteps();
}

function openAddIngredient() {
  newIngredient.id = undefined;
  newIngredient.quantity = undefined;
  newIngredient.recipeStepId = undefined;
  newIngredient.ingredientId = undefined;
  selectedIngredient.value = undefined;
  isAddIngredient.value = true;
}

function openEditIngredient(ingredient) {
  newIngredient.id = ingredient.id;
  newIngredient.quantity = ingredient.quantity;
  newIngredient.recipeStepId = ingredient.recipeStepId;
  newIngredient.ingredientId = ingredient.ingredientId;
  selectedIngredient.value = ingredient.ingredient;
  isEditIngredient.value = true;
}

function openAddStep() {
  newStep.id = undefined;
  newStep.stepNumber = undefined;
  newStep.instruction = undefined;
  newStep.recipeIngredient = [];
  isAddStep.value = true;
}

function openEditStep(step) {
  newStep.id = step.id;
  newStep.stepNumber = step.stepNumber;
  newStep.instruction = step.instruction;
  newStep.recipeIngredient = step.recipeIngredient;
  isEditStep.value = true;
}

function closeAddIngredient() {
  isAddIngredient.value = false;
}

function closeEditIngredient() {
  isEditIngredient.value = false;
}

function closeAddStep() {
  isAddStep.value = false;
}

function closeEditStep() {
  isEditStep.value = false;
}

function closeSnackBar() {
  snackbar.value = false;
}
</script>

<template>
  <v-container>
    <v-row align="center">
      <v-col cols="10"
        ><v-card-title class="pl-0 text-h4 font-weight-bold"
          >Edit Recipe
        </v-card-title>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="5">
        <v-card class="rounded-lg elevation-5">
          <v-card-text>
            <v-text-field
              v-model="recipe.name"
              label="Name"
              required
            ></v-text-field>

            <v-textarea
              v-model="recipe.description"
              label="Description"
            ></v-textarea>
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
          </v-card-text>
          <v-card-actions class="pt-0">
            <v-spacer></v-spacer>
            <v-btn variant="flat" color="primary" @click="updateRecipe()"
              >Update Recipe</v-btn
            >
            <v-spacer></v-spacer>
          </v-card-actions>
        </v-card>
      </v-col>
      <v-col>
        <v-card class="rounded-lg elevation-5">
          <v-card-title
            ><v-row align="center">
              <v-col cols="10"
                ><v-card-title class="headline">Ingredients </v-card-title>
              </v-col>
              <v-col class="d-flex justify-end" cols="2">
                <v-btn color="accent" @click="openAddIngredient()">Add</v-btn>
              </v-col>
            </v-row>
          </v-card-title>
          <v-card-text>
            <v-list>
              <v-list-item
                v-for="recipeIngredient in recipeIngredients"
                :key="recipeIngredient.id"
              >
                <b
                  >{{ recipeIngredient.quantity }}
                  {{
                    `${recipeIngredient.ingredient.unit}${
                      recipeIngredient.quantity > 1 ? "s" : ""
                    }`
                  }}</b
                >
                of {{ recipeIngredient.ingredient.name }} (${{
                  recipeIngredient.ingredient.pricePerUnit
                }}/{{ recipeIngredient.ingredient.unit }})
                <template v-slot:append>
                  <v-icon
                    size="x-small"
                    icon="mdi-pencil"
                    @click="openEditIngredient(recipeIngredient)"
                  ></v-icon>
                  <v-icon
                    size="x-small"
                    icon="mdi-trash-can"
                    @click="deleteIngredient(recipeIngredient)"
                  ></v-icon>
                </template>
              </v-list-item>
            </v-list>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
    <v-row>
      <v-col>
        <v-card class="rounded-lg elevation-5">
          <v-card-title
            ><v-row align="center">
              <v-col cols="10"
                ><v-card-title class="headline">Steps </v-card-title>
              </v-col>
              <v-col class="d-flex justify-end" cols="2">
                <v-btn color="accent" @click="openAddStep()">Add</v-btn>
              </v-col>
            </v-row>
          </v-card-title>
          <v-card-text>
            <v-table>
              <tbody>
                <tr v-for="step in recipeSteps" :key="step.id">
                  <td>{{ step.stepNumber }}</td>
                  <td>{{ step.instruction }}</td>
                  <td>
                    <v-chip
                      size="small"
                      v-for="ingredient in step.recipeIngredient"
                      :key="ingredient.id"
                      pill
                      >{{ ingredient.ingredient.name }}</v-chip
                    >
                  </td>
                  <td>
                    <v-icon
                      size="small"
                      icon="mdi-pencil"
                      @click="openEditStep(step)"
                    ></v-icon>
                    <v-icon
                      size="small"
                      icon="mdi-trash-can"
                      @click="deleteStep(step)"
                    >
                    </v-icon>
                  </td>
                </tr>
              </tbody>
            </v-table>
            <!-- <v-list>
              <v-list-item v-for="step in recipeSteps" :key="step.id">
                <b>
                  {{ step.stepNumber }}
                </b>
                {{ step.instruction }}
              </v-list-item>
            </v-list> -->
            <!-- <StepComponent
              v-for="step in recipeSteps"
              :recipeStep="step"
              @updateStep="openEditStep(step)"
              @deleteStep="deleteStep(step)"
            ></StepComponent> -->
          </v-card-text>
        </v-card></v-col
      >
    </v-row>

    <v-dialog
      persistent
      :model-value="isAddIngredient || isEditIngredient"
      width="800"
    >
      <v-card class="rounded-lg elevation-5">
        <v-card-title class="headline mb-2">{{
          isAddIngredient
            ? "Add Ingredient"
            : isEditIngredient
            ? "Edit Ingredient"
            : ""
        }}</v-card-title>
        <v-card-text>
          <v-row>
            <v-col cols="3">
              <v-text-field
                v-model="newIngredient.quantity"
                label="Quantity"
                type="number"
                required
              >
              </v-text-field>
            </v-col>

            <v-col>
              <v-select
                v-model="selectedIngredient"
                :items="ingredients"
                item-title="name"
                item-value="unit"
                label="Ingredients"
                return-object
                required
              >
                <template v-slot:prepend>
                  {{
                    `${
                      selectedIngredient && selectedIngredient.unit
                        ? selectedIngredient.unit
                        : ""
                    }${newIngredient.quantity > 1 ? "s" : ""}`
                  }}
                  of
                </template>
              </v-select>
            </v-col>
          </v-row>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            variant="flat"
            color="secondary"
            @click="
              isAddIngredient
                ? closeAddIngredient()
                : isEditIngredient
                ? closeEditIngredient()
                : false
            "
            >Close</v-btn
          >
          <v-btn
            variant="flat"
            color="primary"
            @click="
              isAddIngredient
                ? addIngredient()
                : isEditIngredient
                ? updateIngredient()
                : false
            "
            >{{
              isAddIngredient
                ? "Add Ingredient"
                : isEditIngredient
                ? "Update Ingredient"
                : ""
            }}</v-btn
          >
        </v-card-actions>
      </v-card>
    </v-dialog>

    <v-dialog persistent :model-value="isAddStep || isEditStep" width="800">
      <v-card class="rounded-lg elevation-5">
        <v-card-title class="headline mb-2">
          {{ isAddStep ? "Add Step" : isEditStep ? "Edit Step" : "" }}
        </v-card-title>
        <v-card-text>
          <v-text-field
            v-model="newStep.stepNumber"
            label="Number"
            type="number"
            required
          ></v-text-field>

          <v-textarea
            v-model="newStep.instruction"
            label="Instruction"
            required
          ></v-textarea>

          <v-select
            v-model="newStep.recipeIngredient"
            :items="recipeIngredients"
            item-title="ingredient.name"
            item-value="id"
            label="Ingredients"
            return-object
            multiple
            chips
            required
          ></v-select>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            variant="flat"
            color="secondary"
            @click="
              isAddStep ? closeAddStep() : isEditStep ? closeEditStep() : false
            "
            >Close</v-btn
          >
          <v-btn
            variant="flat"
            color="primary"
            @click="isAddStep ? addStep() : isEditStep ? updateStep() : false"
            >{{
              isAddStep ? "Add Step" : isEditStep ? "Update Step" : ""
            }}</v-btn
          >
        </v-card-actions>
      </v-card>
    </v-dialog>
    <v-snackbar v-model="snackbar.value" rounded="pill">
      {{ snackbar.text }}

      <template v-slot:actions>
        <v-btn :color="snackbar.color" variant="text" @click="closeSnackBar()">
          Close
        </v-btn>
      </template>
    </v-snackbar>
  </v-container>
</template>
