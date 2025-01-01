import globals from 'globals';
import pluginJs from '@eslint/js';
import tseslint from 'typescript-eslint';
import stylistic from '@stylistic/eslint-plugin';

/** @type {import('eslint').Linter.Config[]} */
export default [
    {
        files: ['**/*.{js,mjs,cjs,ts}']
    },
    {
        languageOptions: {
            globals: globals.browser 
        }
    },
    pluginJs.configs.recommended,
    ...tseslint.configs.recommended,
    {
        plugins: {
            '@stylistic': stylistic
        },
        rules: {
            '@stylistic/indent': ['error', 4],
            '@stylistic/comma-dangle': ['error', 'never'],
            '@stylistic/semi': ['error', 'always'],
            '@stylistic/quotes': ['error', 'single'],
            '@stylistic/object-curly-newline': ['error', { 
                'ImportDeclaration': { 'multiline': true, 'minProperties': 5 }, 
                'ExportDeclaration': { 'multiline': true, 'minProperties': 5 } 
            }]
        }
    }
];