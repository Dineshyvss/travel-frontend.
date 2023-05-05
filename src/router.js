import { createRouter, createWebHistory } from "vue-router";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "recipes",
      component: () => import("./views/RecipeList.vue"),
    },
    {
      path: "/recipe/:id",
      name: "viewRecipe",
      props: true,
      component: () => import("./views/ViewRecipe.vue"),
    },
    {
      path: "/ingredients",
      name: "ingredients",
      component: () => import("./views/IngredientList.vue"),
    },
  ],
});

export default router;
