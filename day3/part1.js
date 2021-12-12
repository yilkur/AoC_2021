const binaries = require('./input')

const binaryDiagnostic = binaries => {
  const sampleLength = binaries.length
  const positionSum = [...new Array(binaries[0].length)].map(() => 0)
  const gamma = []
  const epsilon = []

  for (let binary of binaries) {
    const numArr = [...binary].map(char => Number(char))
    for (let i in numArr) {
      positionSum[i] += numArr[i]
    }
  }

  for (let sum of positionSum) {
    if (sum > sampleLength / 2) {
      gamma.push(1) 
      epsilon.push(0)
    } else {
      gamma.push(0)
      epsilon.push(1)
    }
  }

  const gammaDecimal = parseInt(gamma.join(''), 2)
  const epsilonDecimal = parseInt(epsilon.join(''), 2)

  const powerConsumption = gammaDecimal * epsilonDecimal

  return powerConsumption
}

console.log(binaryDiagnostic(binaries))
