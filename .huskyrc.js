'use strict'

module.exports = {
  hooks: {
    'prepare-commit-msg': 'devmoji -e --lint',
    'pre-commit': 'lint-staged'
  }
}
