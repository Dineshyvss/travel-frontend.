import { createRouter, createWebHistory } from "vue-router";

import Login from "./views/Login.vue";
import TodoList from "./views/TodoList.vue";
import AddList from "./views/AddList.vue";
import EditList from "./views/EditList.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "login",
      component: Login,
    },
    {
      path: "/lists",
      name: "lists",
      component: TodoList,
    },
    {
      path: "/add",
      name: "addList",
      component: AddList,
    },
    {
      path: "/edit/:id",
      name: "editList",
      component: EditList,
      props: true,
    },
  ],
});

export default router;
