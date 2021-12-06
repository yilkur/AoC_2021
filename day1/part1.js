const depths = require('./input')

const countDepthIncrease = depths => {
  let increaseCount = 0

  for (let i = 0; i < depths.length - 1; i++) {
    let currentDepth = depths[i]
    let nextDepth = depths[i+1]
    if (nextDepth > currentDepth) increaseCount++
  }

  return increaseCount
}

console.log(countDepthIncrease(depths))