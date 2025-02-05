// @ts-check
import antfu from '@antfu/eslint-config'
import perfectionist from 'eslint-plugin-perfectionist'

export default antfu({
  ignores: ['scripts/bin', 'scripts/lib'],
  formatters: {
    css: true,
    html: true,
    markdown: true,
  },
  regexp: false,
  react: {
    overrides: {
      'react/no-prop-types': 'error',
      'react/no-unstable-default-props': 'off',
      'react/no-clone-element': 'off',
      'react/prefer-destructuring-assignment': 'off',
      'react/no-missing-key': 'off',
      'react-dom/no-missing-button-type': 'off',
      'react-dom/no-dangerously-set-innerhtml': 'off',
      'react/no-children-for-each': 'off',
      'react-hooks/exhaustive-deps': ['warn', {
        additionalHooks: 'useIsomorphicEffect|useDeepMemo',
      }],
    },
  },
  stylistic: {
    overrides: {
      'style/jsx-curly-spacing': ['error', { when: 'never', children: true }],
      'style/jsx-props-no-multi-spaces': 'error',
      'style/max-statements-per-line': ['error', { max: 4 }],
      'style/no-extra-parens': ['error', 'all', {
        ignoreJSX: 'all',
        conditionalAssign: true,
        returnAssign: false,
        nestedBinaryExpressions: false,
        enforceForArrowConditionals: false,
        enforceForSequenceExpressions: false,
      }],
    },
  },
  rules: {
    'antfu/if-newline': 'off',
    'antfu/curly': 'off',
    'node/prefer-global/process': 'off',
    'import/order': 'off',
    'no-console': 'off',
    'no-else-return': ['error', { allowElseIf: false }],
    'no-restricted-syntax': [
      'error',
      {
        message: 'for..in loops iterate over the entire prototype chain, which is virtually never what you want. Use Object.{keys,values,entries}, and iterate over the resulting array.',
        selector: 'ForInStatement',
      },
      {
        message: 'Labels are a form of GOTO; using them makes code confusing and hard to maintain and understand.',
        selector: 'LabeledStatement',
      },
      {
        message: '`with` is disallowed in strict mode because it makes code impossible to predict and optimize.',
        selector: 'WithStatement',
      },
    ],
    'eslint-comments/no-unlimited-disable': 'off',
  },
}).overrides({
  'antfu/perfectionist/setup': {
    rules: {
      ...perfectionist.configs['recommended-natural'].rules,
      'perfectionist/sort-objects': 'off',
      'perfectionist/sort-interfaces': 'off',
      'perfectionist/sort-classes': 'off',
      'perfectionist/sort-jsx-props': ['off', {
        type: 'natural',
        order: 'asc',
        groups: ['unique', 'style', 'shorthand', 'unknown', 'multiline', 'callback'],
        customGroups: {
          callback: 'on*',
          key: 'key',
          ref: 'ref',
          unique: '{ref,key}',
          style: '{className,style}',
        },
      }],
      'perfectionist/sort-named-imports': ['error', {
        type: 'natural',
        order: 'asc',
        ignoreAlias: false,
        ignoreCase: false,
        specialCharacters: 'keep',
        groupKind: 'types-first',
        partitionByNewLine: false,
        partitionByComment: false,
      }],
      'perfectionist/sort-named-exports': ['error', {
        type: 'natural',
        order: 'asc',
        ignoreCase: false,
        specialCharacters: 'keep',
        groupKind: 'types-first',
        partitionByNewLine: false,
        partitionByComment: false,
      }],
    },
  },
})
