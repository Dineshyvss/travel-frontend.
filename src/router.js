import { createRouter, createWebHistory } from "vue-router";

const router = createRouter({
<<<<<<< HEAD
  history: createWebHistory(),
=======
  history: createWebHistory(import.meta.env.BASE_URL),
>>>>>>> origin/deploy_travel
  routes: [
    {
      path: "/",
      name: "login",
      component: () => import("./views/Login.vue"),
    },
    {
<<<<<<< HEAD
      path: "/about",
      name: "about",
      component: () => import("./views/AboutView.vue"),
    },
    {
      path: "/subscribe",
      name: "subscribe",
      component: () => import("./views/SubscribersView.vue"),
    },
    {
      path: "/tours",
      name: "tours",
      component: () => import("./views/ToursWeoffer.vue"),
    },
    {
      path: "/book",
      name: "book",
      component: () => import("./views/subscribe.vue"),
    },
    {
=======
>>>>>>> origin/deploy_travel
      path: "/recipes",
      name: "recipes",
      component: () => import("./views/RecipeList.vue"),
    },
    {
<<<<<<< HEAD
      path: "/home",
      name: "home",
      component: () => import("./views/HomeView.vue"),
    },
    {
=======
>>>>>>> origin/deploy_travel
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
