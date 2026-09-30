import { defineConfig } from "vite";
import { resolve } from "path";

export default defineConfig({
    root: "html",

    build: {
        rollupOptions: {
            input: {
                index: resolve(__dirname, "html/index.html"),
                cadastro: resolve(__dirname, "html/cadastro.html"),
                projetos: resolve(__dirname, "html/projetos.html")
            }
        }
    }
});