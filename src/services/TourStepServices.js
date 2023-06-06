import apiClient from "./services";

export default {
  getRecipeSteps() {
    return apiClient.get("recipeSteps");
  },
  getRecipeStepsForRecipe(recipeId) {
    return apiClient.get("recipes/" + recipeId + "/recipeSteps");
  },
  getRecipeStepsForRecipeWithIngredients(recipeId) {
    return apiClient.get("recipes/" + recipeId + "/recipeStepsWithIngredients");
  },
  getRecipeStep(recipeStep) {
    return apiClient.get(
      "recipes/" + recipeStep.recipeId + "/recipeSteps/" + recipeStep.id
    );
  },
  addRecipeStep(recipeStep) {
    return apiClient.post(
      "recipes/" + recipeStep.recipeId + "/recipeSteps",
      recipeStep
    );
  },
  updateRecipeStep(recipeStep) {
    return apiClient.put(
      "recipes/" + recipeStep.recipeId + "/recipeSteps/" + recipeStep.id,
      recipeStep
    );
  },
  deleteRecipeStep(recipeStep) {
    return apiClient.delete(
      "recipes/" + recipeStep.recipeId + "/recipeSteps/" + recipeStep.id
    );
  },
};
