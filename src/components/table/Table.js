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
    this.onMousemove = this.onMousemove.bind(this)
    this.onMouseup = this.onMouseup.bind(this)
  }

  toHTML() {
    return createTable(30)
  }

  onMousedown(event) {
    if (event.target.dataset.resize) {
      console.log('start resizing', event.target.dataset.resize)
      if (event.target.dataset.resize === 'col') {
        // col
        this.x = event.screenX
        this.currentWidth = event.target.parentElement.clientWidth
      } else {
        // row
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
    if (event.target.children.length) {
      if (event.target.children[0].dataset.resize === 'col') {
        // event.srcElement.style.width = this.currentWidth + this.deltaX + 'px'
        const cellsArray = Array.from(event.target.parentElement.children)
        const idx = cellsArray.indexOf(event.target)
        const rows = this.$root.$el.querySelectorAll('.row')
        // console.log('rows', rows)
        for (let row of rows) {
          const rowData = row.querySelectorAll('.row-data')
          for (let cellNodeList of rowData) {
            const cells = cellNodeList.querySelectorAll('*')
            cells[idx].style.width = this.currentWidth + this.deltaX + 'px'
          }
        }
      } else {
        event.srcElement.style.height = this.currentHeigth + this.deltaY + 'px'
      }
    } else {
      debugger
      console.log('event.target.children.length = false')
    }
  }
  onMouseup() {
    this.$root.off('mousemove', this.onMousemove)
    this.$root.off('mouseup', this.onMouseup)
    this.deltaX = 0
    this.deltaY = 0
  }
}
