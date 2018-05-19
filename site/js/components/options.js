
export let cellSize = 4

export let stage = {
  root: document.getElementById('root'),
  numVoids: 3000,
  voidSize: 3,
}

export let wall = {
  coords: null,
  x: 0,
  y: 0,
  color: '#000'
}

// Decrease moving entity cellSize for clearance

export let player = {
  coords: null,
  x: 0,
  y: 0,
  speed: 0.3,
  friction: 0.8,
  color: '#41f798',
  logType: 'player',
}

export let enemy = {
  coords: null,
  x: 0,
  y: 0,
  speed: 0.3,
  friction: 0.9,
  color: '#ff6347',
  logType: 'enemy',
}
