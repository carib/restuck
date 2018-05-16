import { NonPlayerCharacter  } from '../'

export default class Enemy extends NonPlayerCharacter {
  constructor(x, y, width, height) {
    super(x, y, width, height)
    this.speed      = 0.3
    this.friction   = 0.9
    this.color      = '#ff6347'
    this.logType    = 'enemy'
  }
}
