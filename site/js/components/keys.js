export default class KeyWatcher {
  constructor() {
    this.entities = new Map()
    this.keyRelay = new Map()

    this.watchKeys = this.watchKeys.bind(this)
    this.handleKeyPress = this.handleKeyPress.bind(this)
  }

  add(entities) {
    entities.forEach(ent => {
      this.entities.set(ent.id, ent)
    })
  }

  watchKeys() {
    document.addEventListener('keyup', this.handleKeyPress)
    document.addEventListener('keydown', this.handleKeyPress)
  }

  handleKeyPress(e) {
    for (let entity of this.entities.values()) {
      entity.keyResponse(e)
    }
  }
}
