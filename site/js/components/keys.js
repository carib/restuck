export default class KeyWatcher {
  constructor() {
    this.entities = new Set()

    // this.watchKeys = this.watchKeys.bind(this)
    // this.handleKeyPress = this.handleKeyPress.bind(this)
  }

  // add(entities) {
  //   entities.forEach(ent => {
  //     ent.keyWatch = this
  //     this.entities.set(ent.id, ent)
  //   })
  // }

  // handleKeyPress(e) {
  //   this.activeKey = e.keyCode
  //   for (let entity of this.entities.entries()) {
  //     entity.keyResponse(e)
  //   }
  // }
  //
  //
  // watchKeys() {
  //   document.addEventListener('keyup', this.handleKeyPress)
  //   document.addEventListener('keydown', this.handleKeyPress)
  // }
}
