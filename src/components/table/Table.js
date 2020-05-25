import { ExcelComponent } from '@core/ExcelComponent'
import { createTable } from './table.template'

export class Table extends ExcelComponent {
  static className = 'excel__table'

  constructor($root) {
    super($root, {
      listeners: ['mousedown'],
    })
    this.x = 0
    this.y = 0
    this.deltaX = 0
    this.deltaY = 0
    this.currentWidth = 0
    this.currentHeigth = 0
    this.resizeType = ''
    this.resizeObject ={}
    this.onMousemove = this.onMousemove.bind(this)
    this.onMouseup = this.onMouseup.bind(this)
  }

  toHTML() {
    return createTable(30)
  }

  onMousedown(event) {
    if (event.target.dataset.resize) {
      this.resizeObject = event.target;
      this.columns = this.$root.$el.querySelectorAll('.column')
      this.rows = this.$root.$el.querySelectorAll('.row')
      if (event.target.dataset.resize === 'col') {
        // col
        this.resizeType = 'col'
        this.x = event.screenX
        this.currentWidth = event.target.parentElement.clientWidth
      } else {
        // row
        this.resizeType = 'row'
        this.y = event.screenY
        this.currentHeigth = event.target.parentElement.clientHeight
      }
      this.$root.on('mousemove', this.onMousemove)
      this.$root.on('mouseup', this.onMouseup)
    }
  }

  onMousemove(event) {
    this.deltaX = event.screenX - this.x
    this.deltaY = event.screenY - this.y
    let idx
    if (this.resizeType === 'col') {
      const columns = Array.from(this.columns)
      idx = columns.indexOf(this.resizeObject.parentNode)
      let firstRow = true
      for (let row of this.rows) {
        const rowData = row.querySelectorAll('.row-data')
        for (let cellNodeList of rowData) {
          let cells
          if (firstRow) {
            cells = cellNodeList.querySelectorAll('.column')
            firstRow = false
          } else {
            cells = cellNodeList.querySelectorAll('.cell')
          }
          cells[idx].style.width = this.currentWidth + this.deltaX + 'px'
        }
      }
    } else { // row
      const rows = Array.from(this.rows)
      idx = rows.indexOf(this.resizeObject.parentNode.parentNode)
      rows[idx].style.height = this.currentHeigth + this.deltaY + 'px'
    }
  }
  onMouseup() {
    this.$root.off('mousemove', this.onMousemove)
    this.$root.off('mouseup', this.onMouseup)
    this.deltaX = 0
    this.deltaY = 0
    this.resizeObject = {}
  }
}
