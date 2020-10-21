module.exports = {
  '*.{ts,tsx,js,jsx}': ['npm run lint', 'prettier --parser=typescript --write'],
  '*.{json,yml,yaml,css,scss,tsx,md}': 'prettier --check --write'
  // '*.md|{.github,benchmark,bin,examples,hot,lib,schemas,setup,tooling}/**/*.{md,yml,yaml,js,json}': [
  //   'cspell'
  // ]
}
