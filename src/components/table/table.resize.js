import { $ } from '@core/dom'

export function resizeHandler($root, event) {
  const $resizer = $(event.target)
  const type = $resizer.data.resize
  const $parent = $resizer.closest('[data-type="resizable"]')
  const coords = $parent.getCoords()
  const lineProp = type === 'col' ? 'bottom' : 'right'
  const colNumber = $parent.data.col
  let value

  $resizer.css({
    opacity: 1,
    [lineProp]: -5000 + 'px',
  })

  document.onmousemove = (e) => {
    if (type === 'col') {
      const delta = e.pageX - coords.right
      value = coords.width + delta
      $resizer.css({
        right: -delta + 'px',
      })
    } else {
      const delta = e.pageY - coords.bottom
      value = coords.height + delta
      $resizer.css({
        bottom: -delta + 'px',
      })
    }
  }

  document.onmouseup = () => {
    document.onmousemove = null
    document.onmouseup = null
    $resizer.css({
      right: 0,
      bottom: 0,
      opacity: 0,
    })
    if (type === 'col') {
      const cells = $root.findAll(`[data-col="${colNumber}"]`)
      $parent.css({ width: value + 'px' })
      cells.forEach((element) => {
        $(element).css({ width: value + 'px' })
      })
    } else {
      $parent.css({ height: value + 'px' })
    }
  }
}
