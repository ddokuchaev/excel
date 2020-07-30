export class TableSelection {
  static className = 'selected'
  constructor() {
    this.group = []
  }

  select($el) {
    this.clear()
    $el.addClass(TableSelection.className)
    this.group.push($el)
  }

  selectGroup($el) {
    $currentCell = this.group[0]
    $curr.data.id
  }

  clear() {
    this.group.forEach(($el) => $el.removeClass(TableSelection.className))
    this.group = []
  }
}
