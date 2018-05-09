export default class Game {
  constructor(engine, display, controller) {
    this.engn = engine
    this.disp = display
    this.ctrl = controller
  }

  init() {
    this.initEngine()
    this.initDisplay()
    this.setEventListeners()

    setTimeout(() => { console.clear() }, 2000)
  }

  update() {

  }


















  ///////////////////////////////////////////////////////////////////
  ////////////////////////// INITIALIZERS ///////////////////////////
  ///////////////////////////////////////////////////////////////////

  setEventListeners() {
    window.addEventListener('keyup', this.ctrl.handleKeys)
    window.addEventListener('keydown', this.ctrl.handleKeys)
    console.log('*** WATCHING KEYS ***');

    window.addEventListener('resize', this.disp.handleResize)
    console.log('*** WATCHING VIEWPORT ***');

    console.log('*** EVENT LISTENERS SET ***');
  }

  initDisplay() {
    this.disp.resize()
    console.log('*** DISPLAY INITIALIZED ***');
  }

  initEngine() {
    this.engn.start()
    console.log('*** ENGINE INITIALIZED ***');
  }
}
