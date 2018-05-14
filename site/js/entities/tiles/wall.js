import { Entity } from '../'

export default class Wall extends Entity {
  constructor(x, y, width, height) {
    super(x, y, width, height)
    this.id = 'wall'
  }
}
