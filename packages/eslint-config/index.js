module.exports = {
  env: {
    node: true,
    browser: true,
    es2020: true,
  },
  settings: {
    react: {
      version: "detect",
    },
    "import/resolver": {
      typescript: {
        alwaysTryTypes: true,
      },
    },
  },
  overrides: [
    {
      files: ["**/*.{js,jsx}"],
    },
    {
      files: ["**/*.{ts,tsx}"],
      parser: "@typescript-eslint/parser",
      extends: [
        "airbnb",
        "airbnb/hooks",
        "plugin:@typescript-eslint/recommended",
        "prettier",
      ],
      plugins: ["@typescript-eslint"],
      parserOptions: {
        sourceType: "module",
        ecmaVersion: 2020,
        ecmaFeatures: { jsx: true },
      },
      rules: {
        "@typescript-eslint/no-non-null-assertion": "off",
        "@typescript-eslint/no-unused-vars": [
          "warn",
          { argsIgnorePattern: "^_" },
        ],
        "@typescript-eslint/no-implied-eval": "off",
        "@typescript-eslint/dot-notation": "off",
        "@typescript-eslint/no-explicit-any": "off",
        "no-plusplus": "off",
        "no-shadow": "off",
        "consistent-return": "off",
        "react-hooks/exhaustive-deps": "warn",
        "react/jsx-filename-extension": [1, { extensions: [".tsx", ".jsx"] }],
        "react/react-in-jsx-scope": "off",
        "react/prop-types": "off",
        "react/require-default-props": "off",
        "react/jsx-props-no-spreading": "off",
        "import/prefer-default-export": "off",
        "import/no-default-export": "off",
        "import/extensions": [
          "error",
          "ignorePackages",
          { ts: "never", tsx: "never", js: "never", jsx: "never" },
        ],
        "no-console": "warn",
        "no-debugger": "error",
        "prefer-const": "error",
        "no-var": "error",
        "no-restricted-syntax": "off",
        "import/no-extraneous-dependencies": [
          "error",
          { devDependencies: true },
        ],
        "import/extensions": "off",
        "import/no-unresolved": "off",
      },
    },
  ],
};
