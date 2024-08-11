const patterns = require('./patterns.json')

const defaultPatterns = Object.keys(patterns)

function maskSensitiveInfo ({ replaceText = 'xxxx', patternNames = defaultPatterns, customExpressions = [] } = {}) {
  // Filter the patterns based on the provided pattern names
  const selectedPatterns = patternNames.map(patternName => new RegExp(patterns[patternName], 'g'))

  customExpressions.forEach(customExpression => {
    selectedPatterns.push(new RegExp(customExpression, 'g'))
  })

  return {
    filter: (input) => {
      selectedPatterns.forEach(pattern => {
        input = input.replace(pattern, replaceText)
      })

      return input
    }
  }
}

module.exports = maskSensitiveInfo
