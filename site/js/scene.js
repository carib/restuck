import Canvas from './canvas'

export default class Scene extends Canvas {
  constructor(x = 0, y = 0, root) {
    super(root)
    this.x = x
    this.y = y
    this.initWidth  = root.width
    this.initHeight = root.height
    this.width  = root.width
    this.height = root.height
    this.entities = new Set()

    this.render = this.render.bind(this)
    this.update = this.update.bind(this)
    this.wrap   = this.wrap.bind(this)
    this.add    = this.add.bind(this)
    this.remove = this.remove.bind(this)
  }

  render() {
    this.entities.forEach(entity => {
      entity.render()
    })
  }

  update() {
    let { x, y, width, height, ctx, canvas, entities } = this
    width  = this.initWidth  || canvas.width
    height = this.initHeight || canvas.height

    ctx.clearRect(x, y, width, height)

    ctx.save()
    ctx.beginPath()
    ctx.rect(x, y, width, height)
    ctx.stroke()
    ctx.clip()

    ctx.translate(x, y)
    
    this.stage.entities = this.entities
    entities.forEach(entity => {
      entity.update()
    })

    ctx.closePath()
    ctx.restore()
  }

  wrap(entity) {
    let { x, y, width, height, scene } = entity
    if (x > scene.width) {
      x = -width
    } else if (x < -width) {
      x = scene.width
    } else if (y > scene.height) {
      y = -height
    } else if (y < -height) {
      y = scene.height
    }
  }

  add(entity) {
    if (entity instanceof Array) {
      for (let ent of entity) {
        if (ent.constructor.name === 'Stage') {
          this.stage = ent
        }
        ent.scene = this
        this.entities.add(ent)
      }
    } else {
      entity.scene = this
      this.entities.add(entity)
    }
  }

  remove(entity) {
    this.entities.delete(entity)
  }
}
