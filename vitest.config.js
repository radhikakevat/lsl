// vitest.config.js
import { defineConfig } from "vitest/config";
 
export default defineConfig({
  test: {
    coverage: {
      provider: "v8",
      reporter: [["text", { file: "coverage.txt" }], "text", "html"],
      reportsDirectory: "./coverage",
      all: true,
      include: ["src/**/*.{js,jsx,ts,tsx}"],
      exclude: [
        "src/**/*.test.{js,jsx,ts,tsx}",
        "src/**/__tests__/**",
        "src/**/*.stories.{js,jsx,ts,tsx}",
        "src/**/*.d.ts",
        "src/main.jsx",
      ],
    },
  },
});