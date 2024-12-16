import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import env from "vite-plugin-env-compatible";

// https://vite.dev/config/
export default defineConfig({
  plugins: [vue(), env({ prefix: "VITE" })],
});
