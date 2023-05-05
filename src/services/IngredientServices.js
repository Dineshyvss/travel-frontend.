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
  updateIngredient(ingredientId, ingredient) {
    return apiClient.put("ingredients/" + ingredientId, ingredient);
  },
  deleteIngredient(ingredientId) {
    return apiClient.delete("ingredients/" + ingredientId);
  },
};
