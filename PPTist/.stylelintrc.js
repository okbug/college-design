// https://stylelint.io/user-guide/rules/list

module.exports = {
  extends: 'stylelint-config-standard',
  rules: {
    'indentation': 2,
    'max-nesting-depth': 5,
    'max-empty-lines': null,
    'no-eol-whitespace': true,
    'no-missing-end-of-source-newline': null,
    'no-descending-specificity': null,
    'at-rule-empty-line-before': null,
    'at-rule-no-unknown': null,
    'rule-empty-line-before': null,
    'number-leading-zero': null,
    'string-no-newline': true,
    'string-quotes': 'single',
    'color-hex-case': 'lower',
    'color-hex-length': 'short',
    'color-no-invalid-hex': true,
    'font-weight-notation': 'numeric',
    'font-family-no-missing-generic-family-keyword': null,
    'function-calc-no-unspaced-operator': true,
    'function-url-quotes': 'never',
    'block-no-empty': true,
    'block-opening-brace-newline-after': 'always',
    'block-opening-brace-space-before': 'always',
    'declaration-block-no-duplicate-properties': [true, {
      ignoreProperties: ['overflow'],
    }],
    'declaration-block-semicolon-newline-after': 'always',
    'declaration-block-trailing-semicolon': 'always',
    'selector-pseudo-element-colon-notation': 'double',
    'selector-pseudo-element-no-unknown': null,
    'selector-list-comma-newline-after': null,
  },
};