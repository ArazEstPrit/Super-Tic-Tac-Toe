import { resolve } from "path";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
	plugins: [react()],
  resolve: {
    alias: {
      "!assets": resolve("./src/assets")
    }
  },
  base: "/Super-Tic-Tac-Toe/"
});
