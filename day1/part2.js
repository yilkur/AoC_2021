const depths = require('./input')

const countDepthIncrease = depths => {
  const sumUp = arr => arr.reduce((acc, val) => acc + val)

  let increaseCount = 0
  let windowSum = sumUp(depths.slice(0, 3))

  for (let i in depths) {
    let tempWindowSum = sumUp(depths.slice(i, +i + 3))
    if (tempWindowSum > windowSum) increaseCount++
    windowSum = tempWindowSum
  }

  return increaseCount
}

console.log(countDepthIncrease(depths))
