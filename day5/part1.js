const fs = require('fs')

const lines = fs
  .readFileSync('input.txt', { encoding: 'utf-8' })
  .split('\n\n')
  .map(entry => entry.split('\n'))[0]
  .map(entry =>
    entry
      .split(' -> ')
      .map(elements => elements.split(',').map(str => Number(str)))
  )

 

const ventMatrix = Array(1000)
  .fill()
  .map(() => Array(1000).fill(0))

for (let coordinates of lines) {
  const start = coordinates[0]
  const end = coordinates[1]
  const [x1, y1] = start
  const [x2, y2] = end

  // detect if horizontal or vertical direction
  if (y1 === y2) {
    const max = Math.max(x1, x2)
    const min = Math.min(x1, x2)

    for (let i = min; i <= max; i++) {
      ventMatrix[y1][i]++
    }
  } else if (x1 === x2) {
    const max = Math.max(y1, y2)
    const min = Math.min(y1, y2)

    for (let i = min; i <= max; i++) {
      console.log(i, x1);
      ventMatrix[i][x1]++
    }
  }
}

let dangerSpotCount = 0

for (let row of ventMatrix) {
  for (let point of row) {
    if (point > 1) {
      dangerSpotCount++
    }
  }
}

console.log(dangerSpotCount);
