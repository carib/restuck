import { Game } from './components'

import * as UI from './components/ui'


window.onload = () => {
  const root  = document.getElementById('root');
  const game  = new Game(root)

  window.game = game

  UI.init()
  game.init()
}
