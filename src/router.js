import { createRouter, createWebHistory } from "vue-router";

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: "/",
      redirect: "/login",
    },
    {
      path: "/login",
      name: "login",
      component: () => import("./views/Login.vue"),
    },
    {
      path: "/about",
      name: "about",
      component: () => import("./views/AboutView.vue"),
    },
    {
      path: "/subscribe",
      name: "subscribe",
      component: () => import("./views/SubscribersView.vue"),
      meta: {
        requiresAuth: true,
      },
    },
    {
      path: "/tours",
      name: "tours",
      component: () => import("./views/ToursWeoffer.vue"),
    },
    {
      path: "/book",
      name: "book",
      component: () => import("./views/Subscribe.vue"),
    },
    {
      path: "/recipes",
      name: "recipes",
      component: () => import("./views/RecipeList.vue"),
    },
    {
      path: "/home",
      name: "home",
      component: () => import("./views/HomeView.vue"),
    },
    {
      path: "/recipe/:id",
      name: "editRecipe",
      props: true,
      component: () => import("./views/EditRecipe.vue"),
    },
    {
      path: "/ingredients",
      name: "ingredients",
      component: () => import("./views/IngredientList.vue"),
    },
  ],
});

export default router;
