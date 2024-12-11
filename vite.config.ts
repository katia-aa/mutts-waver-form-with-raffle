import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  base: "/mutts-waver-form-with-raffle/", // Replace 'mutts-waver-form-with-raffle' with your repository name
  envDir: "./", // Ensure this points to the directory containing `.env`
});
