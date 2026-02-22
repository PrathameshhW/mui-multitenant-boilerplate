import { existsSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), "");
  const client = (env.VITE_ORG_NAME || "default").trim();
  const clientDir = path.resolve(__dirname, `src/clients/${client}`);

  if (!existsSync(clientDir)) {
    throw new Error(
      `Missing client directory: src/clients/${client}. ` +
        `Set VITE_ORG_NAME to a valid client folder before running dev/build.`
    );
  }

  return {
    plugins: [tailwindcss(), react()],
    resolve: {
      alias: {
        "@client": clientDir,
      },
    },
  };
});
