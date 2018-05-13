import Game from './game'

window.onload = () => {
  const root  = document.getElementById('root');
  const game  = new Game(root)
  game.init()
}
