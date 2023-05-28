import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import dns from "dns";
dns.setDefaultResultOrder("verbatim");
import vuetify from "vite-plugin-vuetify";

export default defineConfig({
  plugins: [vue(), vuetify({ autoImport: true })],

  server: {
    host: "0.0.0.0", // Set the host to "0.0.0.0" to make the app accessible externally
    port: 8081,
  },
  base: "/", // Update the base URL to "/"
});
