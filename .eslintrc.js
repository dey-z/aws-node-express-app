module.exports = {
  "env": {
    "browser": true,
    "es2021": true,
    "node": true
  },
  "extends": "eslint:recommended",
  "overrides": [
  ],
  "parserOptions": {
    "ecmaVersion": "latest",
    "sourceType": "module"
  },
  "rules": {
    "quotes": [ 2, "double" ],
    "indent": ["error", 2],
    "no-unused-vars": "off"
  },
  "ignorePatterns": ["/node_modules/", "/dist/", "/public"]
}
