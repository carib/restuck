import * as Opt from './options'

export const init = () => {
  const form = document.getElementById('submit-stage-options')
  const cellSizes = Opt.getEl('ui-select-cell-size')
  const numVoids = Opt.getEl('ui-input-num-voids')
  const voidSize = Opt.getEl('ui-input-void-size')
  const numEnemies = Opt.getEl('ui-input-num-enemies')
  const gridOverlay = Opt.getEl('grid-overlay-checkbox')
  const pathHighlight = Opt.getEl('grid-path-highlight-checkbox')

  voidSize.value = Opt.stage.voidSize
  numVoids.value = Opt.stage.numVoids
  numEnemies.value = Opt.numEnemies
  gridOverlay.checked = Opt.uiConfig.gridOverlay
  pathHighlight.checked = Opt.uiConfig.pathHighlight

  Array.from(cellSizes.options).forEach(opt => {
    let idx = Array.from(cellSizes).indexOf(opt)
      if (opt.innerText === `${Opt.cellSize}`) {
        cellSizes.options.selectedIndex = idx
      }
  })


  function handleSubmit() {
    let cellSize = Opt.getEl('ui-select-cell-size').options
    Opt.cellSize = parseInt(cellSize[cellSize.selectedIndex].value)
    Opt.stage.numVoids = parseInt(numVoids.value)
    Opt.stage.voidSize = parseInt(voidSize.value)
    Opt.numEnemies = parseInt(numEnemies.value)
    Opt.uiConfig.gridOverlay = gridOverlay.checked
    Opt.uiConfig.pathHighlight = pathHighlight.checked
    game.resetScene()
  }

  form.addEventListener('click', (e) => handleSubmit())
}
