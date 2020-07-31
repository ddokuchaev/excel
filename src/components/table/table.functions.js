import { range } from '@core/utils'

export function shouldResize(event) {
  return event.target.dataset.resize
}

export function isCell(event) {
  return event.target.dataset.type === 'cell'
}

export function isShiftKey(event) {
  return event.shiftKey
}

export function matrix($current, $target) {
  const current = $current.id(true)
  const target = $target.id(true)
  const cols = range(current.col, target.col)
  const rows = range(current.row, target.row)
  return cols.reduce((acc, col) => {
    rows.forEach((row) => acc.push(`${row}:${col}`))
    return acc
  }, [])
}

export function nextSelected(key, { row, col }) {
  /* eslint indent: ["error", 2, { "SwitchCase": 1 }] */
  switch (key) {
    case 'ArrowRight':
    case 'Tab':
      col++
      break
    case 'ArrowDown':
    case 'Enter':
      row++
      break
    case 'ArrowLeft':
      if (!col < 1) col--
      break
    case 'ArrowUp':
      if (!row < 1) row--
  }

  return `[data-id="${row}:${col}"]`
}
