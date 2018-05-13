import MovingEntity from './moving_entity'

export default class Player extends MovingEntity {
  constructor(x, y, width, height) {
    super(x, y, width, height)
    this.speed = 0.3
    this.friction = 0.92
    this.color = '#41f798'
    this.id    = 'player'
  }


}
