module.exports = {
    env: {
        browser: true,
        es2021: true,
    },
    parser: "@typescript-eslint/parser",
    parserOptions: {
        ecmaFeatures: {
            jsx: true,
        },
        ecmaVersion: 12,
        sourceType: "module",
    },
    rules: {
        "no-var": "error",
        "no-extra-semi": "error",
        "camelcase": "error",
        // "no-use-before-define": "error",
        "quotes": ["error", "double"],
        "keyword-spacing": 2,
        "comma-dangle": ["error", {
            "objects": "always",
        }],
        "indent": ["error", 4, {
            "SwitchCase": 1,
            "VariableDeclarator": 2,
            "MemberExpression": 1,
            "ObjectExpression": 1,
        }],
        "comma-style": ["error", "last"],
        "no-mixed-spaces-and-tabs": 2,
        "arrow-spacing": 2,
        "no-duplicate-imports": 2,
        "space-infix-ops": 2,
        "comma-spacing": ["error", {
            "before": false,
            "after": true,
        }],
        "no-useless-constructor": 2,
        "no-multiple-empty-lines": [2, { max: 2, }],
        "object-curly-spacing": [2, "always"],
        "one-var": [2, {
            var: "never",
            let: "never",
            const: "never",
        }],
        "key-spacing": [2, {
            afterColon: true,
        }],
    },
}
