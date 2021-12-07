const directions = require('./input')

const getPosition = directions => {
  const tracker = {
    horizontalPos: 0,
    depth: 0,
    aim: 0,
  }

  for (let direction of directions) {
    const [instruction, val] = direction.split(' ')
    const num = Number(val)

    if (instruction === 'forward') {
      tracker.horizontalPos += num
      tracker.depth += tracker.aim * num
    } else if (instruction === 'down') {
      tracker.aim += num
    } else if (instruction === 'up') {
      tracker.aim -= num
    }
  }

  const product = tracker.horizontalPos * tracker.depth

  return product
}

console.log(getPosition(directions))