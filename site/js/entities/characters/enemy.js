import { NonPlayerCharacter  } from '../'

export default class Enemy extends NonPlayerCharacter {
  constructor(options) {
    super(options)
    this.speed    = options.speed
    this.friction = options.friction
    this.color    = options.color
    this.logType  = options.logType
  }
}
