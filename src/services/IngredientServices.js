import apiClient from "./services";

export default {
  getIngredients() {
    return apiClient.get("ingredients");
  },
  getIngredient(id) {
    return apiClient.get("ingredients/" + id);
  },
  addIngredient(ingredient) {
    return apiClient.post("ingredients", ingredient);
  },
  updateIngredient(ingredient) {
    return apiClient.put("ingredients/" + ingredient.id, ingredient);
  },
  deleteIngredient(ingredientId) {
    return apiClient.delete("ingredients/" + ingredientId);
  },
};
