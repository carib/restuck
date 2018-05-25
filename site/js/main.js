import { Game } from './components'

import * as UI from './components/ui'

window.onload = () => {
  const game = new Game()
  game.init()

  window.game = game


  UI.init(game)
}
