import Canvas from './canvas'
import * as Opt from './options'

export default class Scene extends Canvas {
  constructor(x = 0, y = 0, root) {
    super(root)
    this.x = x
    this.y = y
    this.entities = new Set()

    this.render = this.render.bind(this)
    this.update = this.update.bind(this)
    this.wrap   = this.wrap.bind(this)
    this.add    = this.add.bind(this)
    this.remove = this.remove.bind(this)
    this.markTime = this.markTime.bind(this)
  }

  render(timeStamp) {
    this.entities.forEach(entity => {
      entity.render()
    })
  }

  markTime() {
    return this.timeNow
  }

  update(timeStamp) {
    let startX = Opt.getEl('ui-input-x-start-coord')
    let startY = Opt.getEl('ui-input-y-start-coord')
    let goalX = Opt.getEl('ui-input-x-goal-coord')
    let goalY = Opt.getEl('ui-input-y-goal-coord')
    let pathFound = Opt.getEl('p-path-found')
    let { x, y, width, height, ctx, canvas, entities } = this
    width  = this.initWidth  || this.canvas.width
    height = this.initHeight || this.canvas.height

    ctx.clearRect(x, y, width, height)

    ctx.save()
    ctx.beginPath()
    ctx.rect(x, y, width, height)
    ctx.stroke()
    ctx.clip()

    ctx.translate(x, y)

    this.stage.entities = this.entities
    entities.forEach(entity => {
      if (entity.id !== 'wall' && entity.logType !== 'cell') {
        this.timeNow = timeStamp
        entity.update(timeStamp)
      }
      if (entity.logType === 'enemy') {
        startX.innerText = `${Math.floor(entity.x)}`
        startY.innerText = `${Math.floor(entity.y)}`
        if (entity.pathFound) {
          let elapsed = entity.pathfinder.log.elapsed
          pathFound.innerText = `${elapsed.toFixed(4)}ms`

        }
      }
      if (entity.logType === 'player') {
        goalX.innerText = `${Math.floor(entity.x)}`
        goalY.innerText = `${Math.floor(entity.y)}`
      }
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

  resetScene() {
    this.entities = new Set()
  }
}
