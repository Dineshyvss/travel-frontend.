import { createRouter, createWebHistory } from "vue-router";

import StudentList from "./views/StudentList.vue";
import AddStudent from "./views/AddStudent.vue";
import EditStudent from "./views/EditStudent.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "list",
      component: StudentList,
    },
    {
      path: "/add",
      name: "addStudent",
      component: AddStudent,
    },
    {
      path: "/edit/:id",
      name: "editStudent",
      component: EditStudent,
      props: true,
    },
  ],
});

export default router;
