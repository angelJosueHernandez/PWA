import cypress from "eslint-plugin-cypress";
import react from "eslint-plugin-react";
import globals from "globals";
import babelParser from "@babel/eslint-parser";

export default [
  {
    ignores: ["node_modules/**", "dist/**"], // Ignora archivos aquí
  },
  {
    files: ["**/*.{js,mjs,cjs,jsx}"],
    languageOptions: {
      parser: babelParser,
      parserOptions: {
        requireConfigFile: false,
        babelOptions: {
          presets: ["@babel/preset-react"],
        },
      },
      ecmaVersion: "latest",
      sourceType: "module",
      globals: {
        ...globals.browser,
        ...globals.node,
      },
    },
    plugins: {
      react,
      cypress,
    },
    settings: {
      react: {
        version: "detect",
      },
    },
    rules: {
      "no-unused-vars": "off", // Desactiva las advertencias de variables no utilizadas
    },
  },
  {
    files: ["cypress/**/*.js", "cypress/**/*.cy.js"],
    languageOptions: {
      globals: {
        ...globals.cypress,
      },
    },
    rules: {
      "no-unused-vars": "off",
    },
  },
];
