import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";

export default () => {
  const baseURL =
    process.env.APP_ENV === "development" ? "/" : "/todo-frontend-vue3/";

  return defineConfig({
    plugins: [vue()],

    server: {
      host: "localhost",
      port: 8081,
    },
    base: baseURL,
  });
};
