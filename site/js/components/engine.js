export default class Engine {
  constructor(timeStep) {
    this.elapsedTime  = 0
    this.animFrameReq = undefined
    this.time         = undefined
    this.step         = timeStep
    this.updated      = false

    this.run       = this.run.bind(this)
    this.stop      = this.stop.bind(this)
    this.start     = this.start.bind(this)
    this.handleRun = this.handleRun.bind(this)
  }

  run(timeStamp) {
    this.elapsedTime += timeStamp - this.time
    this.time = timeStamp

    if (this.elapsedTime >= this.step * 3) {
      this.elapsedTime = this.step
    }

    if (this.updated) {
      this.updated = false
      this.render(timeStamp)
    }

    this.animFrameReq = window.requestAnimationFrame(this.handleRun)
  }

  handleRun(step) {
    this.run(step)
  }

  start() {
    this.elapsedTime = this.step
    this.time = window.performance.now()
    this.animFrameReq = window.requestAnimationFrame(this.handleRun)
  }

  stop() {
    window.cancelAnimationFrame(this.animFrameReq)
  }
}
