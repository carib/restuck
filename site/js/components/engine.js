export default class Engine {
  constructor(timeStep, render, update) {
    this.elapsedTime  = 0
    this.animFrameReq = undefined
    this.time         = undefined
    this.step         = timeStep
    this.render       = render
    this.update       = update

    this.run       = this.run.bind(this)
    this.runEngine = this.runEngine.bind(this)
    this.play      = this.play.bind(this)
    this.pause     = this.pause.bind(this)
  }

  run(timeStamp) {
    this.elapsedTime += timeStamp - this.time
    this.time = timeStamp

    if (this.elapsedTime >= this.step * 3) {
      this.elapsedTime = this.step
    }

    while (this.elapsedTime >= this.step) {
      this.elapsedTime -= this.step
      this.update(timeStamp)
      this.updated = true
    }

    if (this.updated) {
      this.updated = false
      this.render(timeStamp)
    }

    this.animFrameReq = window.requestAnimationFrame(this.runEngine)
  }

  runEngine(step) {
    this.run(step)
  }

  play() {
    this.elapsedTime = this.step
    this.time = window.performance.now()
    this.animFrameReq = window.requestAnimationFrame(this.runEngine)
  }

  pause() {
    window.cancelAnimationFrame(this.animFrameReq)
  }
}
