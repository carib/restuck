import { Game } from './components'

import * as UI from './components/ui'
import * as Opt from './components/options'


window.onload = () => {
  const game = new Game()
  game.init()

  window.game = game

  let gridRule = document.getElementById('grid-rules')
  let xRule = document.createElement('div')
  let yRule = document.createElement('div')
  xRule.id = 'x-rule'
  yRule.id = 'y-rule'
  for (let i = 0; i < Opt.stage.width; i += Opt.cellSize) {
    let x = document.createElement('div')
    if (i % 100 === 0) {
      x.innerText = `${i}`
    } else {
      x.innerText = `${i % 100}`

    }
    x.classList.add('grid-num')
    xRule.appendChild(x)
  }
  for (let i = 0; i < Opt.stage.height; i += Opt.cellSize) {
    let y = document.createElement('div')
    if (i % 100 === 0) {
      y.innerText = `${i}`
    } else {
      y.innerText = `${i % 100}`

    }
    y.classList.add('grid-num')
    yRule.appendChild(y)
  }
  gridRule.appendChild(xRule)
  gridRule.appendChild(yRule)
  UI.init(game)
}
