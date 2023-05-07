import apiClient from "./services";

export default {
  getRecipeIngredients() {
    return apiClient.get("recipeIngredients");
  },
  getRecipeIngredientsForRecipe(recipeId) {
    return apiClient.get("recipes/" + recipeId + "/recipeIngredients");
  },
  getRecipeIngredientsForRecipeStep(recipeId, recipeStepId) {
    return apiClient.get(
      "recipes/" +
        recipeId +
        "/recipeSteps/" +
        recipeStepId +
        "/recipeIngredientsWithIngredients"
    );
  },
  getRecipeIngredient(recipeIngredient) {
    return apiClient.get(
      "recipes/" +
        recipeIngredient.recipeId +
        "/recipeIngredients/" +
        recipeIngredient.id
    );
  },
  addRecipeIngredient(recipeIngredient) {
    return apiClient.post(
      "recipes/" + recipeIngredient.recipeId + "/recipeIngredients",
      recipeIngredient
    );
  },
  updateRecipeIngredient(recipeIngredient) {
    return apiClient.put(
      "recipes/" +
        recipeIngredient.recipeId +
        "/recipeIngredients/" +
        recipeIngredient.id,
      recipeIngredient
    );
  },
  deleteRecipeIngredient(recipeIngredient) {
    return apiClient.delete(
      "recipes/" +
        recipeIngredient.recipeId +
        "/recipeIngredients/" +
        recipeIngredient.id
    );
  },
};
