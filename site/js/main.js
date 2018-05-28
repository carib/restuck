import { Game } from './components'

import * as UI from './components/ui'
import * as Opt from './components/options'


window.onload = () => {
  const game = new Game()
  game.init()

  // window.game = game

  UI.init(game)
}
