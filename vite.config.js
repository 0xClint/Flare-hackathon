import { defineConfig } from "vite";

export default defineConfig({
  build: {
    rollupOptions: {
      input: {
        home: "index.html",
        game: "game.html",
        difficulty: "difficulty.html",
      },
    },
  },
  server: {
    port: 3006,
  },
});
