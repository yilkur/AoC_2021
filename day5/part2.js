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

  if (y1 === y2) {
     // vertical direction
    const max = Math.max(x1, x2)
    const min = Math.min(x1, x2)

    for (let i = min; i <= max; i++) {
      ventMatrix[y1][i]++
    }
  } else if (x1 === x2) {
    // horizontal direction
    const max = Math.max(y1, y2)
    const min = Math.min(y1, y2)

    for (let i = min; i <= max; i++) {
      ventMatrix[i][x1]++
    }
  } else {
    // diagonal
    if (x1 > x2 && y1 < y2) {
      // from top right to down left
      let horizontalPos = x1
      for (let verticalPos = y1; i <= y2; i++) {
        ventMatrix[verticalPos][horizontalPos]++
        horizontalPos--
      }
    } else if (x1 > x2 && y1 > y2) {
      // from down left to up right
      let horizontalPos = x1
      for (let verticalPos = y1; verticalPos >= y2; verticalPos--) {
        ventMatrix[verticalPos][horizontalPos]++
        horizontalPos--
      }
    } else if (x1 < x2 && y1 < y2) {
      // from top left to down right
      let horizontalPos = x1
      for (let verticalPos = y1; verticalPos <= y2; verticalPos++) {
        ventMatrix[verticalPos][horizontalPos]++
        horizontalPos++
      }
    } else if (x1 < x2 && y1 > y2) {
      // from down right to top left
      let horizontalPos = x1
      for (let verticalPos = y1; verticalPos >= y2; verticalPos--) {
        ventMatrix[verticalPos][horizontalPos]++
        horizontalPos++
      }
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

console.log(dangerSpotCount)
