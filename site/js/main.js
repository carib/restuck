import { Game } from './components'

window.onload = () => {
  const root  = document.getElementById('root');
  const game  = new Game(root)
  game.init()
}
