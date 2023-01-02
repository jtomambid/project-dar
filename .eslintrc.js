module.exports = {
	root: true,
	extends: ["airbnb", "prettier", "@react-native-community", "eslint-config-prettier"],
	parser: "@typescript-eslint/parser",
	plugins: [
		"@typescript-eslint",
		"react",
		"react-native",
		"jsx-a11y",
		"import",
		"react-hooks",
		"eslint-plugin-prettier",
	],
	overrides: [
		{
			files: ["*.ts", "*.tsx"],
			rules: {
				"@typescript-eslint/no-shadow": ["error"],
				"no-shadow": "off",
				"no-undef": "off",
				"prettier/prettier": [
					1,
					{},
					{
						usePrettierrc: true,
					},
				],
				"arrow-body-style": 0,
				"no-underscore-dangle": 0,
				"no-fallthrough": 0,
				"react/jsx-props-no-spreading": 0,
				"react/jsx-wrap-multilines": 0,
				// False alarm
				"react/jsx-filename-extension": [2, { extensions: [".js", ".tsx"] }],
				"linebreak-style": 0,
				"import/no-unresolved": 0,
				"import/extensions": 0,
				"no-use-before-define": 0,
				"no-plusplus": 0,
				"no-param-reassign": 0,
				"react-hooks/exhaustive-deps": 0,
				"react/prefer-stateless-function": 0,
				"react/require-default-props": 0,
				"react/prop-types": 0,
				"react/jsx-curly-newline": 0,
				"react/function-component-definition": [
					2,
					{
						namedComponents: "arrow-function",
						unnamedComponents: "arrow-function",
					},
				],
				camelcase: 1,
				curly: 1,
				"no-unused-vars": 1,
				quotes: [1, "double"],
				"react/jsx-curly-brace-presence": [1, { children: "always" }],
				"padding-line-between-statements": [
					1,
					{
						blankLine: "always",
						prev: "*",
						next: [
							"multiline-block-like",
							"multiline-const",
							"multiline-let",
							"multiline-expression",
							"multiline-var",
							"return",
							"case",
							"class",
							"export",
						],
					},
				],
			},
		},
	],
	settings: {
		"import/resolver": {
			node: {
				extensions: [".tsx", ".ts", "d.ts", ".jsx", ".js", ".ios.js", ".android.js"],
			},
		},
	},
};
