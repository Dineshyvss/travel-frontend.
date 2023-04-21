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
      path: "/addRecipe",
      name: "addRecipe",
      component: () => import("./views/AddRecipe.vue"),
    },
    {
      path: "/recipe/:id",
      name: "viewRecipe",
      props: true,
      component: () => import("./views/ViewRecipe.vue"),
    },
  ],
});

export default router;
