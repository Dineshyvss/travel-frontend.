import apiClient from "./services";

export default {
  getRecipes() {
    return apiClient.get("recipes");
  },
  getRecipe(id) {
    return apiClient.get("recipes/" + id);
  },
  addRecipe(recipe) {
    return apiClient.post("recipes", recipe);
  },
  updateRecipe(recipeId, recipe) {
    return apiClient.put("recipes/" + recipeId, recipe);
  },
  deleteRecipe(recipeId) {
    return apiClient.delete("recipes/" + recipeId);
  },
};
