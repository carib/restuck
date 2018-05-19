import * as Opt from './options'

const stageDims     = Opt.getEl('ui-select-stage-dimensions')
const cellSizes     = Opt.getEl('ui-select-cell-size')
const numVoids      = Opt.getEl('ui-input-num-voids')
const voidSize      = Opt.getEl('ui-input-void-size')
const numEnemies    = Opt.getEl('ui-input-num-enemies')
const gridOverlay   = Opt.getEl('grid-overlay-checkbox')
const pathHighlight = Opt.getEl('grid-path-highlight-checkbox')

const applyButton   = Opt.getEl('submit-stage-options')

export function init(game) {
  voidSize.value        = Opt.stage.voidSize
  numVoids.value        = Opt.stage.numVoids
  numEnemies.value      = Opt.numEnemies
  gridOverlay.checked   = Opt.uiConfig.gridOverlay
  pathHighlight.checked = Opt.uiConfig.pathHighlight

  Array.from(stageDims.options).forEach(opt => {
    let idx = Array.from(stageDims).indexOf(opt)
    if (opt.innerText === `${Opt.stage.width} x ${Opt.stage.height}`) {
      stageDims.options.selectedIndex = idx
    }
  })

  Array.from(cellSizes.options).forEach(opt => {
    let idx = Array.from(cellSizes).indexOf(opt)
    if (opt.innerText === `${Opt.cellSize}`) {
      cellSizes.options.selectedIndex = idx
    }
  })

  applyButton.addEventListener('click', (e) => assignUISelections(game))
  assignUISelections(game)
}


export function assignUISelections(game) {
  let cellSize  = Opt.getEl('ui-select-cell-size').options
  let stageDims = Opt.getEl('ui-select-stage-dimensions').options
  stageDims = stageDims[stageDims.selectedIndex].value.split('x')

  Opt.stage.width     = parseInt(stageDims[0])
  Opt.stage.height    = parseInt(stageDims[1])

  Opt.cellSize        = parseInt(cellSize[cellSize.selectedIndex].value)

  Opt.stage.numVoids  = parseInt(numVoids.value)
  Opt.stage.voidSize  = parseInt(voidSize.value)

  Opt.numEnemies      = parseInt(numEnemies.value)

  Opt.uiConfig.gridOverlay   = gridOverlay.checked
  Opt.uiConfig.pathHighlight = pathHighlight.checked
  game.resetScene()
}
