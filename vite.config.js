import { defineConfig } from "vite";

export default defineConfig({
  build: {
    rollupOptions: {
      input: {
        home: "index.html",
        game: "game.html",
      },
    },
  },
  server: {
    port: 3006,
  },
});
