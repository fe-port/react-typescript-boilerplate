module.exports = {
  '*.{ts,js}': ['npm run lint', 'prettier --parser=typescript --write'],
  '*.{json,yml,yaml,css,scss,tsx,md}': 'prettier --write'
}
