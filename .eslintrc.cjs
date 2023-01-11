/*
 * @Author: dingyuwen ding_yuwen@163.com
 * @Date: 2023-01-11 08:56:08
 * @LastEditTime: 2023-01-11 09:46:23
 * @LastEditors: dingyuwen
 * @Description:
 */
module.exports = {
	env: {
		browser: true,
		es2021: true,
		node: true
	},
	extends: [
		'airbnb',
		'plugin:import/recommended',
		'plugin:import/typescript',
		'plugin:promise/recommended',
		'plugin:react/recommended',
		'plugin:react-hooks/recommended',
		'plugin:jsx-a11y/recommended',
		'plugin:prettier/recommended',
		'plugin:@typescript-eslint/recommended',
		'plugin:@typescript-eslint/recommended-requiring-type-checking'
	],
	overrides: [],
	parser: '@typescript-eslint/parser',
	parserOptions: {
		ecmaVersion: 'latest',
		sourceType: 'module',
		ecmaFeatures: {
			jsx: true
		}
	},
	rules: {
		'prettier/prettier': [
			'error',
			{
				trailingComma: 'none',
				singleQuote: true,
				printWidth: 100,
				endOfLine: 'auto'
			}
		]
	},
	plugins: ['import', 'react', 'react-hooks', 'jsx-a11y', 'prettier', '@typescript-eslint'],
	settings: {
		'import/parsers': {
			'@typescript-eslint/parser': ['.ts', '.tsx']
		},
		'import/resolver': {
			typescript: {}
		}
	}
}
