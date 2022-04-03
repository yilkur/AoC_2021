const fs = require('fs')

const lines = fs
  .readFileSync('input.txt', { encoding: 'utf-8' })
  .split('\n\n')
  .filter(Boolean)
  .map(x =>
    x
      .replace(/[\n ,]+/g, ' ')
      .trim()
      .split(' ')
      .map(y => parseInt(y))
  )

const numbers = lines[0]
const boards = lines.slice(1).map(board => {
  const newBoard = []

  // make rows of 5 numbers
  while (board.length) {
    const row = board.splice(0, 5)
    newBoard.push(row)
  }

  return newBoard
})
const bingo = board => {
  // check rows
  for (const row of board) {
    if (row.every(el => el === 'X')) return true
  }

  // check columns
  for (const i in board) {
    let column = []
    for (const j in board[i]) {
      column.push(board[j][i])
    }
    if (column.every(el => el === 'X')) return true
  }

  return false
}
const calcUnmarkedSum = board => {
  let sumUnmarked = 0

  for (let row of board) {
    for (const el of row) {
      if (el !== 'X') sumUnmarked += el
    }
  }

  return sumUnmarked
}

const markBoards = boards => {
  for (const num of numbers) {
    for (let boardIdx in boards) {
      for (let baordRowIdx in boards[boardIdx]) {
        const row = boards[boardIdx][baordRowIdx]
        const numIdx = row.indexOf(num)

        if (numIdx > -1) {
          boards[boardIdx][baordRowIdx][numIdx] = 'X'
          const isWinningBoard = bingo(boards[boardIdx])

          // check if the current board has won
          if (isWinningBoard) {
            const unmarkedSum = calcUnmarkedSum(boards[boardIdx])
            return unmarkedSum * num
          }
        }
      }
    }
  }
}

markBoards(boards)
