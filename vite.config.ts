import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

const ReactCompilerConfig = {
  version: '19.0.0-rc.1',
}

// https://vite.dev/config/
export default defineConfig({
  plugins: [react({
     babel: {
          plugins: [
            ["babel-plugin-react-compiler", ReactCompilerConfig],
          ],
        },
  }), tailwindcss()],
});
