const binaries = require('./input')

const calcLifeSupportRating = input => {
  let o2Bins = [...input]
  let co2Bins = [...input]

  const countBits = (binaries, idx) => {
    let zeroCount = 0
    let oneCount = 0

    for (let binary of binaries) {
      let bit = binary[idx]

      if (+bit === 1) oneCount++
      else zeroCount++
    }

    return {
      zeros: zeroCount,
      ones: oneCount,
    }
  }

  for (let i in input[0]) {
    let binCountsO2 = countBits(o2Bins, i)
    let binCountsCo2 = countBits(co2Bins, i)

    if (o2Bins.length > 1) {
      if (
        binCountsO2.ones > binCountsO2.zeros ||
        binCountsO2.ones === binCountsO2.zeros
      ) {
        o2Bins = o2Bins.filter(binary => binary[i] === '1')
      } else {
        o2Bins = o2Bins.filter(binary => binary[i] === '0')
      }
    }

    if (co2Bins.length > 1) {
      if (binCountsCo2.ones < binCountsCo2.zeros) {
        co2Bins = co2Bins.filter(binary => binary[i] === '1')
      } else {
        co2Bins = co2Bins.filter(binary => binary[i] === '0')
      }
    }
  }

  const oxygenRating = parseInt(o2Bins[0], 2)
  const co2Rating = parseInt(co2Bins[0], 2)
  const lifeSupportRating = oxygenRating * co2Rating

  return lifeSupportRating
}

console.log(calcLifeSupportRating(binaries))
