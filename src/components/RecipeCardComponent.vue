<script setup>
import { onMounted, reactive, ref, defineProps } from "vue";
import { useRouter } from "vue-router";

const router = useRouter();

const showDetails = ref(false);
const ingredients = ref([]);

const props = defineProps({
  recipe: {
    required: true,
  },
});

onMounted(() => {
  buildIngredientList();
});

function buildIngredientList() {
  for (let i = 0; i < props.recipe.recipeStep.length; i++) {
    for (
      let j = 0;
      j < props.recipe.recipeStep[i].recipeStepIngredient.length;
      j++
    ) {
      ingredients.value.push(
        props.recipe.recipeStep[i].recipeStepIngredient[j]
      );
    }
  }
}

function navigateToEdit() {
  router.push({ name: "viewRecipe", params: { id: props.recipe.id } });
}
</script>

<template>
  <v-card class="recipe-card mb-8" @click="showDetails = !showDetails">
    <v-card-title class="headline">
      {{ recipe.name }}
      <v-chip class="ma-2" color="primary" label>
        <v-icon start icon="mdi-account-circle-outline"></v-icon>
        {{ recipe.servings }} Servings
      </v-chip>
      <v-chip class="ma-2" color="accent" label>
        <v-icon start icon="mdi-clock-outline"></v-icon>
        {{ recipe.time }} minutes
      </v-chip>
      <v-icon size="small" icon="mdi-pencil" @click="navigateToEdit()"></v-icon>
    </v-card-title>
    <v-card-text class="body-1">
      {{ recipe.description }}
    </v-card-text>
    <v-expand-transition>
      <v-card-text class="pt-0" v-show="showDetails">
        Ingredients
        <v-list>
          <v-divider></v-divider>
          <v-list-item
            v-for="recipeStepIngredient in ingredients"
            :key="recipeStepIngredient.id"
          >
            {{ recipeStepIngredient.quantity }}
            {{ recipeStepIngredient.ingredient.unit }} of
            {{ recipeStepIngredient.ingredient.name }} (${{
              recipeStepIngredient.ingredient.pricePerUnit
            }}/{{ recipeStepIngredient.ingredient.unit }})
          </v-list-item>
        </v-list>
        Recipe Steps
        <v-list>
          <v-divider></v-divider>
          <v-list-item v-for="step in recipe.recipeStep" :key="step.stepNumber">
            <p class="body-1 font-weight-bold">
              {{ step.stepNumber }}. {{ step.description }}
            </p>
          </v-list-item>
        </v-list>
      </v-card-text>
    </v-expand-transition>
  </v-card>
</template>
