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

const calcFinalScore = (board, num) => {
  let sumUnmarked = 0

  for (let row of board) {
    for (const el of row) {
      if (el !== 'X') sumUnmarked += el
    }
  }

  return sumUnmarked * num
}

let lastWinningBoard
let lastWinningNum

const checkEachBoard = num => {
  let boardIdx = 0

  while (boardIdx < boards.length) {
    for (let boardRowIdx in boards[boardIdx]) {
      const row = boards[boardIdx][boardRowIdx]
      const numIdx = row.indexOf(num)

      if (numIdx > -1) {
        boards[boardIdx][boardRowIdx][numIdx] = 'X'
        const isWinningBoard = bingo(boards[boardIdx])

        // check if the current board has won and remove it if so
        if (isWinningBoard) {
          lastWinningBoard = boards[boardIdx]
          lastWinningNum = num
          boards.splice(boardIdx, 1)
          boardIdx--
          break
        }
      }
    }
    boardIdx++
  }
}

const markBoards = boards => {
  numbers.forEach(num => checkEachBoard(num))
}

markBoards(boards)
calcFinalScore(lastWinningBoard, lastWinningNum)
