import { Game, Engine, Display, Controller } from './components/index'


window.onload = () => {
  console.log('*** DOM CONTENT LOADED ***');
  const canvas      = document.getElementById('canvas')
  const timeStep    = 1000/30
  const engine      = new Engine(timeStep)
  const display     = new Display(canvas)
  const controller  = new Controller()
  const game        = new Game(engine, display, controller)
  
  game.init()
}
