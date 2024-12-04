import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  base: "/my-spa/", // Replace 'my-spa' with your repository name
  envDir: "./", // Ensure this points to the directory containing `.env`
});
