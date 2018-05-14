import { NonPlayerCharacter } from './'

export default class Enemy extends NonPlayerCharacter {
  constructor(x, y, width, height) {
    super(x, y, width, height)
    this.color      = '#ff6347'
    this.logType    = 'enemy'
  }
}
