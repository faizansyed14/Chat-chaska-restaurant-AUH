import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";
import { readFileSync, writeFileSync } from "fs";

/** Writes public/version.js on every dev start & production build. */
function appVersionPlugin() {
  const pkg = JSON.parse(
    readFileSync(path.resolve(__dirname, "package.json"), "utf-8")
  );
  const write = () => {
    const version = `${pkg.version}-${Date.now()}`;
    const out = path.resolve(__dirname, "public/version.js");
    writeFileSync(
      out,
      `// Auto-generated — do not edit. Bumped on every build.\nwindow.__APP_VERSION__="${version}";\n`
    );
  };
  return {
    name: "app-version",
    buildStart: write,
    configureServer: write,
  };
}

export default defineConfig({
  plugins: [react(), appVersionPlugin()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  server: {
    port: 5173,
  },
});
