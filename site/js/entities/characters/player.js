import { MovingEntity } from '../'

export default class Player extends MovingEntity {
  constructor(x, y, width = 8, height = 8) {
    super(x, y, width, height)
    this.speed    = 0.3
    this.friction = 0.8
    this.color    = '#41f798'
    this.logType  = 'player'
  }
}
