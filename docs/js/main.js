/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ({

/***/ "./js/components/canvas.js":
/*!*********************************!*\
  !*** ./js/components/canvas.js ***!
  \*********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Canvas = function () {
  function Canvas() {
    _classCallCheck(this, Canvas);

    this.canvas = document.getElementById('canvas');
    this.ctx = canvas.getContext('2d');
    window.addEventListener('resize', this.resize);
    this.resize = this.resize.bind(this);
  }

  _createClass(Canvas, [{
    key: 'resize',
    value: function resize() {
      var width = document.documentElement.clientWidth;
      var height = document.documentElement.clientHeight;
      this.canvas.width = width;
      this.canvas.height = height;
    }
  }]);

  return Canvas;
}();

exports.default = Canvas;

/***/ }),

/***/ "./js/components/engine.js":
/*!*********************************!*\
  !*** ./js/components/engine.js ***!
  \*********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Engine = function () {
  function Engine(timeStep, render, update) {
    _classCallCheck(this, Engine);

    this.elapsedTime = 0;
    this.animFrameReq = undefined;
    this.time = undefined;
    this.step = timeStep;
    this.render = render;
    this.update = update;

    this.run = this.run.bind(this);
    this.runEngine = this.runEngine.bind(this);
    this.play = this.play.bind(this);
    this.pause = this.pause.bind(this);
  }

  _createClass(Engine, [{
    key: "run",
    value: function run(timeStamp) {
      this.elapsedTime += timeStamp - this.time;
      this.time = timeStamp;

      if (this.elapsedTime >= this.step * 3) {
        this.elapsedTime = this.step;
      }

      while (this.elapsedTime >= this.step) {
        this.elapsedTime -= this.step;
        this.update(timeStamp);
        this.updated = true;
      }

      if (this.updated) {
        this.updated = false;
        this.render(timeStamp);
      }

      this.animFrameReq = window.requestAnimationFrame(this.runEngine);
    }
  }, {
    key: "runEngine",
    value: function runEngine(step) {
      this.run(step);
    }
  }, {
    key: "play",
    value: function play() {
      this.elapsedTime = this.step;
      this.time = window.performance.now();
      this.animFrameReq = window.requestAnimationFrame(this.runEngine);
    }
  }, {
    key: "pause",
    value: function pause() {
      window.cancelAnimationFrame(this.animFrameReq);
    }
  }]);

  return Engine;
}();

exports.default = Engine;

/***/ }),

/***/ "./js/components/game.js":
/*!*******************************!*\
  !*** ./js/components/game.js ***!
  \*******************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _index = __webpack_require__(/*! ./index */ "./js/components/index.js");

var _keys = __webpack_require__(/*! ./keys */ "./js/components/keys.js");

var _keys2 = _interopRequireDefault(_keys);

var _ui = __webpack_require__(/*! ./ui */ "./js/components/ui.js");

var UI = _interopRequireWildcard(_ui);

var _options = __webpack_require__(/*! ./options */ "./js/components/options.js");

var Opt = _interopRequireWildcard(_options);

var _entities = __webpack_require__(/*! ../entities */ "./js/entities/index.js");

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var seed = void 0;

var Game = function () {
  function Game() {
    _classCallCheck(this, Game);

    this.characters = [];
    this.gameLog = {};
  }

  _createClass(Game, [{
    key: 'init',
    value: function init() {
      // this.keys   = new KeyWatcher()
      this.scene = new _index.Scene(0, 0);
      this.engine = new _index.Engine(1000 / 30, this.scene.render, this.scene.update);

      this.populateScene();

      this.scene.resize();

      this.engine.play();
    }
  }, {
    key: 'resetScene',
    value: function resetScene() {
      this.scene.resetScene();
      delete this.scene;
      this.characters = [];
      this.gameLog = {};
      this.scene = new _index.Scene(0, 0);
      this.engine.update = this.scene.update;
      this.engine.render = this.scene.render;
      this.populateScene();
    }
  }, {
    key: 'populateScene',
    value: function populateScene() {
      Opt.stage.cellSize = Opt.cellSize;
      this.stage = new _entities.Stage(Opt.stage);
      this.scene.add([this.stage]);
      // debugger
      this.stage.init(seed);
      this.addCharacters();
    }
  }, {
    key: 'addCharacters',
    value: function addCharacters() {
      this.createPlayer();
      this.createNPCs();

      // this.keys.add(this.characters)
      this.scene.add(this.characters);
    }
  }, {
    key: 'createPlayer',
    value: function createPlayer() {
      var cell = this.stage.parseYX(this.stage.getRandomCell());
      Opt.player.x = cell.x;
      Opt.player.y = cell.y;
      Opt.player.width = Opt.cellSize > 2 ? Opt.cellSize - 2 : Opt.cellSize - 1;
      Opt.player.height = Opt.cellSize > 2 ? Opt.cellSize - 2 : Opt.cellSize - 1;
      this.player = new _entities.Player(Opt.player);
      this.player.id = this.logEntity(this.player.logType);
      this.player.watchKeys();
      this.characters.push(this.player);
    }
  }, {
    key: 'createNPCs',
    value: function createNPCs() {
      this.createEnemies(Opt.numEnemies);
    }
  }, {
    key: 'createEnemies',
    value: function createEnemies(numEnemies) {
      var cell = void 0;
      var enemy = void 0;
      for (var i = 0; i < numEnemies; i++) {
        cell = this.stage.parseYX(this.stage.getRandomCell());
        Opt.enemy.x = cell.x;
        Opt.enemy.y = cell.y;
        Opt.enemy.width = Opt.cellSize > 2 ? Opt.cellSize - 2 : Opt.cellSize - 1;
        Opt.enemy.height = Opt.cellSize > 2 ? Opt.cellSize - 2 : Opt.cellSize - 1;
        enemy = new _entities.Enemy(Opt.enemy);
        enemy.id = this.logEntity(enemy.logType);
        enemy.target = this.player;
        enemy.watchKeys();
        this.characters.push(enemy);
      }
    }
  }, {
    key: 'logEntity',
    value: function logEntity(entityType) {
      if (!this.gameLog[entityType]) {
        this.gameLog[entityType] = 0;
      }
      this.gameLog[entityType]++;
      return entityType + '-' + this.gameLog[entityType];
    }
  }]);

  return Game;
}();

exports.default = Game;


seed = "0,0..0,10..0,20..0,30..0,40..0,50..0,60..0,70..0,80..0,90..0,100..0,110..0,120..0,130..0,140..0,150..0,160..0,170..0,180..0,190..0,200..0,210..0,220..0,230..0,240..0,250..0,260..0,270..0,280..0,290..0,300..0,310..0,320..0,330..0,340..0,350..0,360..0,370..0,380..0,390..0,400..0,410..0,420..0,430..0,440..0,450..0,460..0,470..0,480..0,490..0,500..0,510..0,520..0,530..0,540..0,550..0,560..0,570..0,580..0,590..0,600..0,610..0,620..0,630..0,640..0,650..0,660..0,670..0,680..0,690..0,700..0,710..10,0..10,710..20,0..20,710..30,0..30,710..40,0..40,710..50,0..50,710..60,0..60,710..70,0..70,710..80,0..80,710..90,0..90,710..100,0..100,710..110,0..110,710..120,0..120,710..130,0..130,710..140,0..140,710..150,0..150,710..160,0..160,710..170,0..170,710..180,0..180,710..190,0..190,710..200,0..200,710..210,0..210,710..220,0..220,710..230,0..230,710..240,0..240,710..250,0..250,710..260,0..260,710..270,0..270,710..280,0..280,710..290,0..290,710..300,0..300,710..310,0..310,710..320,0..320,710..330,0..330,710..340,0..340,710..350,0..350,710..360,0..360,710..370,0..370,710..380,0..380,710..390,0..390,710..400,0..400,710..410,0..410,710..420,0..420,710..430,0..430,710..440,0..440,710..450,0..450,710..460,0..460,710..470,0..470,10..470,20..470,30..470,40..470,50..470,60..470,70..470,80..470,90..470,100..470,110..470,120..470,130..470,140..470,150..470,160..470,170..470,180..470,190..470,200..470,210..470,220..470,230..470,240..470,250..470,260..470,270..470,280..470,290..470,300..470,310..470,320..470,330..470,340..470,350..470,360..470,370..470,380..470,390..470,400..470,410..470,420..470,430..470,440..470,450..470,460..470,470..470,480..470,490..470,500..470,510..470,520..470,530..470,540..470,550..470,560..470,570..470,580..470,590..470,600..470,610..470,620..470,630..470,640..470,650..470,660..470,670..470,680..470,690..470,700..470,710..30,610..20,620..30,610..40,600..30,590..20,600..30,590..40,580..30,570..20,580..380,530..370,540..360,550..350,560..340,550..350,560..340,550..350,560..360,570..350,580..270,650..260,660..250,650..240,660..250,670..240,680..250,690..240,700..230,690..240,700..40,610..30,620..40,610..30,600..40,610..30,600..40,590..30,600..20,590..30,580..160,480..170,470..160,480..150,470..140,480..150,490..160,480..170,470..160,480..150,470..440,150..430,140..440,130..450,120..460,130..470,140..460,130..470,120..460,130..450,140..50,430..60,420..50,430..40,440..30,430..20,420..30,410..40,420..50,410..40,400..50,490..40,480..30,470..40,480..50,490..60,480..70,470..80,480..70,470..80,460..150,560..160,570..170,560..180,550..170,540..160,530..150,520..160,530..150,520..140,530..250,220..240,230..250,220..260,230..270,240..280,250..270,260..260,270..270,260..260,270..90,430..100,440..110,430..120,420..110,410..120,400..130,390..120,400..110,410..100,400..140,400..150,390..160,380..170,370..180,360..170,350..160,360..170,370..160,380..170,370..390,330..380,320..370,330..360,340..350,350..360,340..350,330..360,340..370,350..360,360..310,230..300,220..290,210..280,220..290,210..300,200..290,210..280,220..270,210..280,200..310,130..300,140..290,130..280,140..270,130..260,140..250,150..240,140..250,150..260,140..220,540..230,530..240,520..230,510..240,520..230,510..240,500..230,490..240,500..250,510..400,80..390,90..400,100..410,110..400,120..390,110..380,100..390,90..380,100..370,110..430,610..440,620..450,630..460,640..470,630..470,640..460,650..450,660..460,650..470,660..50,170..60,180..50,170..40,160..30,170..20,160..30,150..40,160..30,150..40,140..100,70..90,80..80,90..90,100..80,110..90,120..100,110..90,120..100,110..110,100..340,200..330,190..340,180..330,190..340,180..350,170..340,180..350,190..360,180..370,190..30,550..40,540..30,550..20,560..10,570..310,580..320,590..330,580..320,590..310,600..110,650..120,660..110,670..120,680..110,690..120,680..130,690..140,700..130,710..140,700..220,220..230,210..220,220..230,230..240,220..230,230..220,240..230,230..240,240..250,250..200,300..210,310..220,320..230,330..220,320..210,330..200,320..190,330..180,320..190,330..160,550..170,560..160,550..150,540..140,550..130,560..120,550..130,540..140,530..150,540..230,380..220,370..230,380..220,370..230,360..240,350..250,360..260,350..270,340..260,330..460,570..470,560..460,550..470,540..460,530..450,520..440,510..430,500..440,510..430,500..330,370..320,380..310,390..300,400..290,390..300,400..310,390..300,380..310,390..300,400..220,30..210,20..220,30..210,40..200,30..210,20..200,30..210,20..220,10..230,30..110,170..120,180..110,170..100,180..90,170..80,180..70,170..80,180..70,190..80,180..80,20..90,10..100,280..110,270..100,280..90,270..100,260..90,270..80,280..70,270..120,130..110,140..120,130..130,140..120,130..110,140..100,150..90,140..80,150..90,160..420,700..410,690..400,680..410,670..420,680..430,690..420,700..410,690..400,700..410,690..240,550..230,560..240,550..230,540..220,550..210,540..200,530..210,540..200,530..210,540..450,580..460,570..470,560..470,570..460,580..470,590..460,580..470,590..470,600..460,610..50,80..40,90..30,100..40,90..30,80..40,70..50,80..40,70..50,80..60,90..340,120..330,130..340,120..330,110..340,120..330,110..340,120..350,130..360,120..350,110..260,80..270,70..260,80..250,70..240,80..250,90..260,100..250,110..240,100..250,110..320,680..330,670..340,660..350,650..340,640..330,630..320,640..310,630..320,620..310,610..400,370..410,360..420,370..430,380..420,370..410,380..400,370..410,360..400,370..410,380..270,60..280,70..270,60..260,70..270,80..280,70..290,60..280,70..270,80..260,70..180,630..190,640..180,630..170,620..160,610..170,620..180,630..170,620..160,610..170,620..150,320..140,330..150,340..160,350..170,360..160,370..170,360..160,370..150,380..140,390..30,380..40,370..30,380..40,370..30,380..40,390..30,400..20,390..10,380..380,370..420,70..430,80..440,70..450,80..460,90..450,100..460,110..450,100..460,90..470,80..30,260..20,270..30,260..20,270..30,280..20,270..10,280..240,290..250,280..240,270..430,590..420,600..410,590..400,580..410,590..400,580..390,570..380,560..390,570..400,560..40,350..30,340..40,350..30,340..20,350..10,360..20,370..10,360..20,350..30,340..220,300..210,290..200,280..210,270..200,260..190,250..200,240..210,250..220,260..210,270..420,350..430,340..420,350..430,340..420,330..430,320..420,330..430,320..440,310..430,320..160,330..170,340..160,330..150,340..140,330..150,340..160,350..170,360..180,350..190,340..250,380..260,370..270,360..280,350..290,340..300,330..290,320..300,310..310,320..300,330..90,700..100,690..110,700..100,690..90,680..80,690..70,700..80,710..90,700..80,690..420,80..430,90..420,80..430,90..420,80..430,70..440,60..450,50..460,60..470,50..70,420..80,410..90,420..100,410..110,420..120,410..130,400..140,390..130,380..140,390..100,380..90,390..100,380..90,390..80,380..90,370..80,360..70,350..80,360..90,370..90,260..100,270..90,280..100,290..110,280..120,290..130,280..140,290..150,280..140,270..320,470..310,480..320,470..310,460..300,470..310,480..320,470..310,480..300,490..290,480..390,280..380,290..390,300..400,290..410,300..420,310..430,300..440,310..430,320..420,330..300,590..310,600..320,610..310,620..320,610..310,620..320,630..310,640..300,650..290,660..140,350..130,340..120,330..130,340..120,330..110,340..120,350..130,360..120,370..130,360..200,410..210,400..220,410..210,400..200,390..190,400..200,390..190,380..200,390..190,380..340,160..350,150..360,160..370,170..360,180..350,190..360,200..350,190..340,200..350,210..370,530..380,540..390,550..400,560..390,570..400,580..390,570..400,580..410,570..420,580..180,40..190,50..180,40..170,50..180,60..170,70..160,60..150,70..160,60..170,70..220,700..210,690..200,700..190,710..180,700..190,710..200,710..190,700..180,690..170,700..280,190..270,180..260,170..270,180..260,170..270,180..280,190..270,180..280,190..290,200..280,530..290,540..280,550..290,540..280,550..270,540..280,550..270,560..260,570..270,580..180,110..190,100..180,90..170,80..160,90..150,100..140,90..150,100..160,90..150,80..360,390..350,380..340,370..330,360..340,370..330,360..340,370..350,360..340,370..350,360..80,680..70,670..80,680..70,670..60,660..50,650..60,640..70,630..60,640..50,630..440,530..430,520..420,530..430,540..420,550..410,540..400,530..410,520..420,530..430,540..120,380..130,390..120,400..110,390..100,400..90,390..80,400..90,410..80,400..70,410..370,410..380,400..390,410..380,400..370,390..380,400..390,390..380,380..370,390..380,400..20,170..30,180..20,170..10,180..20,190..30,180..20,170..30,160..40,170..50,160..290,460..300,450..310,440..320,450..330,440..340,430..330,420..340,430..350,440..360,430..190,630..180,640..170,630..180,620..170,630..180,640..170,650..180,660..190,650..200,660..300,60..310,70..300,80..290,90..300,100..310,110..320,120..330,130..320,140..330,150..80,350..90,340..100,350..90,360..100,350..110,360..100,350..110,360..100,350..110,340..130,60..140,50..150,60..160,70..150,60..140,70..150,80..160,70..170,60..180,50..190,480..180,470..190,460..200,470..210,460..220,450..210,460..200,470..190,480..180,490..150,300..160,310..170,320..180,310..170,300..180,290..170,300..160,290..170,280..160,290..330,40..340,50..330,60..320,50..330,60..320,70..310,60..300,50..310,60..320,50..180,300..170,310..180,300..170,310..160,320..150,310..160,300..150,290..160,280..170,290..40,680..50,670..40,660..50,650..40,660..30,670..20,660..30,670..20,680..10,690..210,560..200,570..190,580..180,590..190,600..200,590..210,580..220,570..230,580..240,590..170,270..160,280..170,270..180,280..190,290..180,280..170,270..180,280..190,270..200,280..60,690..70,700..60,710..70,710..80,710..90,700..80,710..90,710..80,700..70,710..250,530..260,520..270,510..260,500..270,510..280,500..290,510..300,500..310,490..300,480..100,510..110,500..120,490..110,500..120,490..110,500..120,490..130,500..120,510..110,520..170,480..160,470..170,480..160,470..170,460..160,470..170,460..180,450..170,460..180,450..190,150..200,160..190,150..200,160..190,170..200,160..210,170..220,160..230,170..220,160..430,160..440,170..450,180..460,170..450,160..460,150..450,160..440,170..430,160..420,150..400,520..390,510..400,500..410,490..420,480..410,470..420,460..410,470..400,480..390,490..150,110..160,120..150,110..140,100..130,90..140,80..130,70..140,60..150,70..160,60..220,70..210,60..220,50..210,60..200,50..210,60..200,70..190,60..180,70..170,80..80,190..90,180..100,170..110,180..120,170..110,160..100,150..90,160..100,150..90,140..170,380..160,370..150,360..140,350..130,340..120,350..110,340..100,350..110,340..120,330..290,160..280,150..270,140..280,150..270,140..280,130..290,140..280,130..270,120..280,130..";

/***/ }),

/***/ "./js/components/index.js":
/*!********************************!*\
  !*** ./js/components/index.js ***!
  \********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _canvas = __webpack_require__(/*! ./canvas */ "./js/components/canvas.js");

Object.defineProperty(exports, 'Canvas', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_canvas).default;
  }
});

var _scene = __webpack_require__(/*! ./scene */ "./js/components/scene.js");

Object.defineProperty(exports, 'Scene', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_scene).default;
  }
});

var _engine = __webpack_require__(/*! ./engine */ "./js/components/engine.js");

Object.defineProperty(exports, 'Engine', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_engine).default;
  }
});

var _game = __webpack_require__(/*! ./game */ "./js/components/game.js");

Object.defineProperty(exports, 'Game', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_game).default;
  }
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/***/ }),

/***/ "./js/components/keys.js":
/*!*******************************!*\
  !*** ./js/components/keys.js ***!
  \*******************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var KeyWatcher = function KeyWatcher() {
  _classCallCheck(this, KeyWatcher);

  this.entities = new Set();

  // this.watchKeys = this.watchKeys.bind(this)
  // this.handleKeyPress = this.handleKeyPress.bind(this)
}

// add(entities) {
//   entities.forEach(ent => {
//     ent.keyWatch = this
//     this.entities.set(ent.id, ent)
//   })
// }

// handleKeyPress(e) {
//   this.activeKey = e.keyCode
//   for (let entity of this.entities.entries()) {
//     entity.keyResponse(e)
//   }
// }
//
//
// watchKeys() {
//   document.addEventListener('keyup', this.handleKeyPress)
//   document.addEventListener('keydown', this.handleKeyPress)
// }
;

exports.default = KeyWatcher;

/***/ }),

/***/ "./js/components/options.js":
/*!**********************************!*\
  !*** ./js/components/options.js ***!
  \**********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getEl = getEl;
function getEl(id) {
  return document.getElementById(id);
}

var cellSize = exports.cellSize = 10;
var numEnemies = exports.numEnemies = 1;

var uiConfig = exports.uiConfig = {
  pathHighlight: true,
  gridOverlay: true
};

var stage = exports.stage = {
  numVoids: 100,
  voidSize: 10,
  height: 480,
  width: 720
};

var wall = exports.wall = {
  coords: null,
  x: 0,
  y: 0,
  color: '#161c20'
  // color: 'rgb(255, 255, 255, 0)'
  // color: '#000'


  // Decrease moving entity cellSize for clearance

};var player = exports.player = {
  coords: null,
  x: 0,
  y: 0,
  speed: 0.3,
  friction: 0.8,
  color: '#41f798',
  logType: 'player'
};

var enemy = exports.enemy = {
  coords: null,
  x: 0,
  y: 0,
  speed: 0.3,
  friction: 0.9,
  color: '#ff6347',
  logType: 'enemy'
};

/***/ }),

/***/ "./js/components/scene.js":
/*!********************************!*\
  !*** ./js/components/scene.js ***!
  \********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _canvas = __webpack_require__(/*! ./canvas */ "./js/components/canvas.js");

var _canvas2 = _interopRequireDefault(_canvas);

var _options = __webpack_require__(/*! ./options */ "./js/components/options.js");

var Opt = _interopRequireWildcard(_options);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Scene = function (_Canvas) {
  _inherits(Scene, _Canvas);

  function Scene(x, y) {
    _classCallCheck(this, Scene);

    var _this = _possibleConstructorReturn(this, (Scene.__proto__ || Object.getPrototypeOf(Scene)).call(this));

    _this.x = x;
    _this.y = y;
    _this.entities = new Set();
    _this.width = Opt.stage.width;
    _this.height = Opt.stage.height;
    _this.initWidth = Opt.stage.width;
    _this.initHeight = Opt.stage.height;

    _this.render = _this.render.bind(_this);
    _this.update = _this.update.bind(_this);
    _this.wrap = _this.wrap.bind(_this);
    _this.add = _this.add.bind(_this);
    _this.remove = _this.remove.bind(_this);
    _this.markTime = _this.markTime.bind(_this);
    return _this;
  }

  _createClass(Scene, [{
    key: 'render',
    value: function render(timeStamp) {
      this.entities.forEach(function (entity) {
        entity.render();
      });
    }
  }, {
    key: 'markTime',
    value: function markTime() {
      return this.timeNow;
    }
  }, {
    key: 'update',
    value: function update(timeStamp) {
      var _this2 = this;

      var startX = Opt.getEl('ui-input-x-start-coord');
      var startY = Opt.getEl('ui-input-y-start-coord');
      var goalX = Opt.getEl('ui-input-x-goal-coord');
      var goalY = Opt.getEl('ui-input-y-goal-coord');
      var pathFound = Opt.getEl('p-path-found');
      var x = this.x,
          y = this.y,
          width = this.width,
          height = this.height,
          ctx = this.ctx,
          canvas = this.canvas,
          entities = this.entities;


      canvas.width = Opt.stage.width;
      canvas.height = Opt.stage.height;

      width = this.initWidth || canvas.width;
      height = this.initHeight || canvas.height;

      ctx.clearRect(x, y, width, height);

      ctx.save();
      ctx.beginPath();
      ctx.rect(x, y, width, height);
      ctx.stroke();
      ctx.clip();

      ctx.translate(x, y);

      entities.forEach(function (entity) {
        if (entity.id !== 'wall' && entity.logType !== 'cell') {
          if (!_this2.stage.entities.has(entity) && entity.id !== 'mark') {
            _this2.stage.entities.add(entity);
          }
          entity.update();
        }
        if (entity.logType === 'enemy') {
          startX.innerText = '' + Math.floor(entity.x);
          startY.innerText = '' + Math.floor(entity.y);
          if (entity.pathFound) {
            var elapsed = entity.pathfinder.log.elapsed;
            pathFound.innerText = elapsed.toFixed(4) + 'ms';
          }
        }
        if (entity.logType === 'player') {
          goalX.innerText = '' + Math.floor(entity.x);
          goalY.innerText = '' + Math.floor(entity.y);
        }
      });

      ctx.closePath();
      ctx.restore();
    }
  }, {
    key: 'wrap',
    value: function wrap(entity) {
      var x = entity.x,
          y = entity.y,
          width = entity.width,
          height = entity.height,
          scene = entity.scene;

      if (x > scene.width) {
        x = -width;
      } else if (x < -width) {
        x = scene.width;
      } else if (y > scene.height) {
        y = -height;
      } else if (y < -height) {
        y = scene.height;
      }
    }
  }, {
    key: 'add',
    value: function add(entity) {
      if (entity instanceof Array) {
        var _iteratorNormalCompletion = true;
        var _didIteratorError = false;
        var _iteratorError = undefined;

        try {
          for (var _iterator = entity[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
            var ent = _step.value;

            if (ent.constructor.name === 'Stage') {
              this.stage = ent;
            }
            ent.scene = this;
            this.entities.add(ent);
          }
        } catch (err) {
          _didIteratorError = true;
          _iteratorError = err;
        } finally {
          try {
            if (!_iteratorNormalCompletion && _iterator.return) {
              _iterator.return();
            }
          } finally {
            if (_didIteratorError) {
              throw _iteratorError;
            }
          }
        }
      } else {
        entity.scene = this;
        this.entities.add(entity);
      }
    }
  }, {
    key: 'remove',
    value: function remove(entity) {
      this.entities.delete(entity);
    }
  }, {
    key: 'resetScene',
    value: function resetScene() {
      this.entities = new Set();
    }
  }]);

  return Scene;
}(_canvas2.default);

exports.default = Scene;

/***/ }),

/***/ "./js/components/ui.js":
/*!*****************************!*\
  !*** ./js/components/ui.js ***!
  \*****************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.init = init;
exports.assignUISelections = assignUISelections;

var _options = __webpack_require__(/*! ./options */ "./js/components/options.js");

var Opt = _interopRequireWildcard(_options);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

var stageDims = Opt.getEl('ui-select-stage-dimensions');
var cellSizes = Opt.getEl('ui-select-cell-size');
var numVoids = Opt.getEl('ui-input-num-voids');
var voidSize = Opt.getEl('ui-input-void-size');
var numEnemies = Opt.getEl('ui-input-num-enemies');
var gridOverlay = Opt.getEl('grid-overlay-checkbox');
var pathHighlight = Opt.getEl('grid-path-highlight-checkbox');

var applyButton = Opt.getEl('submit-stage-options');

function init(game) {
  voidSize.value = Opt.stage.voidSize;
  numVoids.value = Opt.stage.numVoids;
  numEnemies.value = Opt.numEnemies;
  gridOverlay.checked = Opt.uiConfig.gridOverlay;
  pathHighlight.checked = Opt.uiConfig.pathHighlight;

  Array.from(stageDims.options).forEach(function (opt) {
    var idx = Array.from(stageDims).indexOf(opt);
    if (opt.innerText === Opt.stage.width + ' x ' + Opt.stage.height) {
      stageDims.options.selectedIndex = idx;
    }
  });

  Array.from(cellSizes.options).forEach(function (opt) {
    var idx = Array.from(cellSizes).indexOf(opt);
    if (opt.innerText === '' + Opt.cellSize) {
      cellSizes.options.selectedIndex = idx;
    }
  });

  applyButton.addEventListener('click', function (e) {
    return assignUISelections(game);
  });
  assignUISelections(game);
}

function assignUISelections(game) {
  var cellSize = Opt.getEl('ui-select-cell-size').options;
  var stageDims = Opt.getEl('ui-select-stage-dimensions').options;
  stageDims = stageDims[stageDims.selectedIndex].value.split('x');

  Opt.stage.width = parseInt(stageDims[0]);
  Opt.stage.height = parseInt(stageDims[1]);

  Opt.cellSize = parseInt(cellSize[cellSize.selectedIndex].value);

  Opt.stage.numVoids = parseInt(numVoids.value);
  Opt.stage.voidSize = parseInt(voidSize.value);

  Opt.numEnemies = parseInt(numEnemies.value);

  Opt.uiConfig.gridOverlay = gridOverlay.checked;
  Opt.uiConfig.pathHighlight = pathHighlight.checked;
  game.resetScene();
}

/***/ }),

/***/ "./js/entities/characters/enemy.js":
/*!*****************************************!*\
  !*** ./js/entities/characters/enemy.js ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _ = __webpack_require__(/*! ../ */ "./js/entities/index.js");

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Enemy = function (_NonPlayerCharacter) {
  _inherits(Enemy, _NonPlayerCharacter);

  function Enemy(options) {
    _classCallCheck(this, Enemy);

    var _this = _possibleConstructorReturn(this, (Enemy.__proto__ || Object.getPrototypeOf(Enemy)).call(this, options));

    _this.speed = options.speed;
    _this.friction = options.friction;
    _this.color = options.color;
    _this.logType = options.logType;
    return _this;
  }

  return Enemy;
}(_.NonPlayerCharacter);

exports.default = Enemy;

/***/ }),

/***/ "./js/entities/characters/npc.js":
/*!***************************************!*\
  !*** ./js/entities/characters/npc.js ***!
  \***************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _ = __webpack_require__(/*! ../ */ "./js/entities/index.js");

var _options = __webpack_require__(/*! ../../components/options */ "./js/components/options.js");

var Opt = _interopRequireWildcard(_options);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var NonPlayerCharacter = function (_MovingEntity) {
  _inherits(NonPlayerCharacter, _MovingEntity);

  function NonPlayerCharacter(options) {
    _classCallCheck(this, NonPlayerCharacter);

    var _this = _possibleConstructorReturn(this, (NonPlayerCharacter.__proto__ || Object.getPrototypeOf(NonPlayerCharacter)).call(this, options));

    _this.grid = null;
    _this.target = null;
    _this.targetXY = null;
    _this.pathFound = false;
    _this.path = [];
    _this.backTrace = [];
    _this.listenting = false;

    _this.navigatePath = _this.navigatePath.bind(_this);
    _this.findTarget = _this.findTarget.bind(_this);
    _this.keyResponse = _this.keyResponse.bind(_this);
    return _this;
  }

  _createClass(NonPlayerCharacter, [{
    key: 'keyResponse',
    value: function keyResponse(e) {
      var keydown = e.type === 'keydown' ? true : false;
      this.activeKey = e.keyCode;
      if (keydown) {
        this.navigatePath();
      } else {
        this.activeKey = null;
        if (this.activeKey === 37 || this.activeKey === 39) {
          this.veloX -= this.speed / 3;
        }
        if (this.activeKey === 38 || this.activeKey === 40) {
          this.veloY -= this.speed / 3;
        }
      }
    }
  }, {
    key: 'findTarget',
    value: function findTarget(target) {
      var _this2 = this;

      target = target ? target : this.target.getDetails();
      this.grid = this.scene.stage;
      this.pathFound = false;
      this.pathfinder = new _.Pathfinder();
      this.pathfinder.scene = this.scene;
      this.pathfinder.initPathfinder(this.grid, this, target);
      if (!this.pathfinder.path) {
        this.getLost();
      } else {
        this.pathfinder.path.forEach(function (cell) {
          return _this2.path.push(cell);
        });
        if (Opt.uiConfig.pathHighlight) {
          this.highlightPath();
        }
      }
    }
  }, {
    key: 'checkLogs',
    value: function checkLogs() {
      var logs = Object.values(this.pathfinder.log.sorts);
      var activeLogs = [];
      logs.forEach(function (log) {
        Object.keys(log).length ? activeLogs.push(log) : null;
      });
      return activeLogs;
    }
  }, {
    key: 'getLost',
    value: function getLost() {
      var logs = this.checkLogs();
      var randomCoords = void 0;
      var cell = void 0;
      var log = void 0;
      if (!logs.length) {
        this.isStuck = true;
      } else {
        log = Object.keys(logs[Math.floor(Math.random() * logs.length)]);
        randomCoords = log[Math.floor(Math.random() * log.length)];
        if (this.grid.has(randomCoords)) {
          cell = this.grid.get(randomCoords);
          if (cell.isEmpty) {
            this.findTarget(cell);
          }
        } else {
          this.getLost();
        }
      }
    }
  }, {
    key: 'navigatePath',
    value: function navigatePath() {
      if (this.path && this.path.length <= 1) {
        this.pathFound = false;
      }
      if (!this.pathFound) {
        this.findTarget();
        this.pathFound = true;
      }
      if (this.activeKey && this.path.length) {
        this.translatePath();
        this.updatePosition();
        this.backTrace = [];
      }
    }
  }, {
    key: 'resetPosition',
    value: function resetPosition() {
      this.veloX = 0;
      this.veloY = 0;
      this.translatePath(this.backTrace);
      if (this.direction === this.collisionDirection) {
        switch (this.direction) {
          case 'WEST':
            this.x = this.lastX + 0.001;
            break;
          case 'NORTH':
            this.y = this.lastY + 0.001;
            break;
          case 'EAST':
            this.x = this.lastX - 0.001;
            break;
          case 'SOUTH':
            this.y = this.lastY - 0.001;
            break;
        }
      }
    }
  }, {
    key: 'follow',
    value: function follow(path) {
      var dx = this.target.x - this.x,
          dy = this.target.y - this.y,
          lastX = this.x,
          lastY = this.y,
          absDX = Math.abs(dx),
          absDY = Math.abs(dy);
      for (var i = 0; i < path.length / 3; i++) {
        this.backTrace.unshift(path.shift());
        var _backTrace$ = this.backTrace[0],
            x = _backTrace$.x,
            y = _backTrace$.y;

        dx += Math.floor(x - lastX);
        dy += Math.floor(y - lastY);
        lastX = x;
        lastY = y;
      }
      return {
        absDX: absDX, absDY: absDY,
        dx: dx, dy: dy
      };
    }
  }, {
    key: 'retrace',
    value: function retrace(path) {
      path = path.slice(0);
      var targetXY = path.slice(path.length - 1);
      var dx = targetXY.x - this.x,
          dy = targetXY.y - this.y,
          lastX = this.x,
          lastY = this.y,
          absDX = Math.abs(dx),
          absDY = Math.abs(dy);
      this.backTrace = [];
      for (var i = 0; i < path.length / 3; i++) {
        this.backTrace.unshift(path.shift());
        var _backTrace$2 = this.backTrace[0],
            x = _backTrace$2.x,
            y = _backTrace$2.y;

        dx += Math.floor(x - lastX);
        dy += Math.floor(y - lastY);
        lastX = x;
        lastY = y;
      }
      return {
        absDX: absDX, absDY: absDY,
        dx: dx, dy: dy
      };
    }
  }, {
    key: 'translatePath',
    value: function translatePath(path) {
      var pathDeltas = path ? this.retrace(path) : this.follow(this.path),
          absDX = pathDeltas.absDX,
          absDY = pathDeltas.absDY,
          dx = pathDeltas.dx,
          dy = pathDeltas.dy;

      if (absDX > absDY) {
        this.veloX = 0;
        if (dx > 0) {
          this.direction = 'EAST';
          return;
        }
        if (dx < 0) {
          this.direction = 'WEST';
          return;
        }
      }
      if (absDX < absDY) {
        this.veloY = 0;
        if (dy > 0) {
          this.direction = 'SOUTH';
          return;
        }
        if (dy < 0) {
          this.direction = 'NORTH';
          return;
        }
      }
    }
  }, {
    key: 'highlightPath',
    value: function highlightPath() {
      var _this3 = this;

      var path = this.path.pop();
      this.path.forEach(function (cell) {
        var pathOptions = {
          path: cell,
          pathName: 'npcToPlayer',
          color: '#ff6347',
          width: _this3.width,
          height: _this3.height
        };
        var pathMark = new _.PathMarker(pathOptions);
        _this3.scene.add(pathMark);
      });
    }
  }]);

  return NonPlayerCharacter;
}(_.MovingEntity);

exports.default = NonPlayerCharacter;

/***/ }),

/***/ "./js/entities/characters/player.js":
/*!******************************************!*\
  !*** ./js/entities/characters/player.js ***!
  \******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _ = __webpack_require__(/*! ../ */ "./js/entities/index.js");

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Player = function (_MovingEntity) {
  _inherits(Player, _MovingEntity);

  function Player(options) {
    _classCallCheck(this, Player);

    var _this = _possibleConstructorReturn(this, (Player.__proto__ || Object.getPrototypeOf(Player)).call(this, options));

    _this.speed = options.speed;
    _this.friction = options.friction;
    _this.color = options.color;
    _this.logType = options.logType;
    return _this;
  }

  _createClass(Player, [{
    key: 'getDetails',
    value: function getDetails() {
      return this;
    }
  }, {
    key: 'keyResponse',
    value: function keyResponse(e) {
      var keydown = e.type === 'keydown' ? true : false;
      if (keydown) {
        this.activeKey = e.keyCode;
        switch (e.keyCode) {
          case 37:
            this.direction = 'WEST';
            break;
          case 38:
            this.direction = 'NORTH';
            break;
          case 39:
            this.direction = 'EAST';
            break;
          case 40:
            this.direction = 'SOUTH';
            break;
        }
      } else {
        this.activeKey = null;
        if (this.activeKey === 37 || this.activeKey === 39) {
          this.veloX -= this.speed / 3;
        }
        if (this.activeKey === 38 || this.activeKey === 40) {
          this.veloY -= this.speed / 3;
        }
      }
    }
  }]);

  return Player;
}(_.MovingEntity);

exports.default = Player;

/***/ }),

/***/ "./js/entities/entity.js":
/*!*******************************!*\
  !*** ./js/entities/entity.js ***!
  \*******************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Entity = function () {
  function Entity(options) {
    _classCallCheck(this, Entity);

    this.coords = options.y + ',' + options.x;
    this.x = options.x;
    this.y = options.y;
    this.x2 = options.x + options.width;
    this.y2 = options.y + options.height;
    this.lastX = options.x;
    this.lastY = options.y;
    this.width = options.width;
    this.height = options.height;
    this.halfW = options.width / 2;
    this.halfH = options.height / 2;
    this.thirdW = options.width / 3;
    this.thirdH = options.height / 3;
    this.color = '#000';
    this.class = 'entity';
    this.id = 'entity';
    this.cells = new Set();
    this.occupiedCells = new Set();

    this.update = this.update.bind(this);
    this.render = this.render.bind(this);
  }

  _createClass(Entity, [{
    key: 'positionEntity',
    value: function positionEntity() {}
  }, {
    key: 'update',
    value: function update() {}
  }, {
    key: 'render',
    value: function render() {
      var x = this.x,
          y = this.y,
          width = this.width,
          height = this.height;
      var ctx = this.scene.ctx;

      ctx.fillStyle = this.color;
      ctx.fillRect(x, y, width, height);
    }
  }]);

  return Entity;
}();

exports.default = Entity;

/***/ }),

/***/ "./js/entities/index.js":
/*!******************************!*\
  !*** ./js/entities/index.js ***!
  \******************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _entity = __webpack_require__(/*! ./entity */ "./js/entities/entity.js");

Object.defineProperty(exports, 'Entity', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_entity).default;
  }
});

var _moving_entity = __webpack_require__(/*! ./moving_entity */ "./js/entities/moving_entity.js");

Object.defineProperty(exports, 'MovingEntity', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_moving_entity).default;
  }
});

var _npc = __webpack_require__(/*! ./characters/npc */ "./js/entities/characters/npc.js");

Object.defineProperty(exports, 'NonPlayerCharacter', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_npc).default;
  }
});

var _enemy = __webpack_require__(/*! ./characters/enemy */ "./js/entities/characters/enemy.js");

Object.defineProperty(exports, 'Enemy', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_enemy).default;
  }
});

var _player = __webpack_require__(/*! ./characters/player */ "./js/entities/characters/player.js");

Object.defineProperty(exports, 'Player', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_player).default;
  }
});

var _stage = __webpack_require__(/*! ./stage */ "./js/entities/stage.js");

Object.defineProperty(exports, 'Stage', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_stage).default;
  }
});

var _wall = __webpack_require__(/*! ./tiles/wall */ "./js/entities/tiles/wall.js");

Object.defineProperty(exports, 'Wall', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_wall).default;
  }
});

var _cell = __webpack_require__(/*! ./map_grid/cell */ "./js/entities/map_grid/cell.js");

Object.defineProperty(exports, 'Cell', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_cell).default;
  }
});

var _grid = __webpack_require__(/*! ./map_grid/grid */ "./js/entities/map_grid/grid.js");

Object.defineProperty(exports, 'Grid', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_grid).default;
  }
});

var _heap = __webpack_require__(/*! ./map_grid/heap */ "./js/entities/map_grid/heap.js");

Object.defineProperty(exports, 'Heap', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_heap).default;
  }
});

var _pathfinder = __webpack_require__(/*! ./map_grid/pathfinder */ "./js/entities/map_grid/pathfinder.js");

Object.defineProperty(exports, 'Pathfinder', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_pathfinder).default;
  }
});

var _path_marker = __webpack_require__(/*! ./map_grid/path_marker */ "./js/entities/map_grid/path_marker.js");

Object.defineProperty(exports, 'PathMarker', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_path_marker).default;
  }
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/***/ }),

/***/ "./js/entities/map_grid/cell.js":
/*!**************************************!*\
  !*** ./js/entities/map_grid/cell.js ***!
  \**************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _options = __webpack_require__(/*! ../../components/options */ "./js/components/options.js");

var Opt = _interopRequireWildcard(_options);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Cell = function () {
  function Cell(coordString) {
    _classCallCheck(this, Cell);

    this.coords = coordString;
    this.isFirst = false;
    this.isLast = false;
    this.links = new Set();
    this.cell = new Set();
    this.mCost = 0;
    this.isWall = false;
    this.y = null;
    this.x = null;
    this.logType = 'cell';

    this.has = this.has.bind(this);
    this.add = this.add.bind(this);
    this.size = this.size.bind(this);
    this.each = this.each.bind(this);
    this.clear = this.clear.bind(this);
    this.remove = this.remove.bind(this);
  }

  _createClass(Cell, [{
    key: 'setMCost',
    value: function setMCost() {
      var _this = this;

      if (this.isWall) {
        this.mCost = 10;
        return;
      }
      this.links.forEach(function (link) {
        var cell = _this.grid.get(link);
        if (cell.mCost > 0) {
          _this.mCost = Math.floor(cell.mCost - 3);
        }
        if (_this.mCost < 0) {
          _this.mCost = 0;
        }
        // debugger
      });
    }
  }, {
    key: 'size',
    value: function size() {
      return this.cell.size;
    }
  }, {
    key: 'isEmpty',
    value: function isEmpty() {
      return !this.size();
    }
  }, {
    key: 'has',
    value: function has(value) {
      if (typeof value === 'string') {
        var result = void 0;
        this.cell.forEach(function (entity) {
          if (!entity) {
            return false;
          }
          result = entity.id === value;
        });
        return result;
      }
      return this.cell.has(value);
    }
  }, {
    key: 'each',
    value: function each(callback) {
      this.cell.forEach(function (entity) {
        callback(entity);
      }, this);
    }
  }, {
    key: 'add',
    value: function add(entity) {
      this.cell.add(entity);
    }
  }, {
    key: 'remove',
    value: function remove(entity) {
      this.cell.delete(entity);
    }
  }, {
    key: 'clear',
    value: function clear() {
      var _this2 = this;

      this.cell.forEach(function (entity) {
        if (entity.id !== 'wall') {
          _this2.cell.delete(entity);
        }
      }, this);
    }
  }, {
    key: 'render',
    value: function render() {
      var x = this.x,
          y = this.y;
      var ctx = this.scene.ctx;


      ctx.strokeStyle = '#dadada';
      ctx.lineWidth = 0.7;
      ctx.strokeRect(x, y, Opt.cellSize, Opt.cellSize);
    }
  }]);

  return Cell;
}();

exports.default = Cell;

/***/ }),

/***/ "./js/entities/map_grid/grid.js":
/*!**************************************!*\
  !*** ./js/entities/map_grid/grid.js ***!
  \**************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _ = __webpack_require__(/*! ../ */ "./js/entities/index.js");

var _options = __webpack_require__(/*! ../../components/options */ "./js/components/options.js");

var Opt = _interopRequireWildcard(_options);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Grid = function () {
  function Grid(options) {
    _classCallCheck(this, Grid);

    this.rows = options.numRows;
    this.cols = options.numCols;
    this.cellSize = options.cellSize;
    this.height = Opt.stage.height;
    this.width = Opt.stage.width;
    this.first = null;
    this.last = null;
    this.cells = new Map();

    this.getCellAt = this.getCellAt.bind(this);
  }

  _createClass(Grid, [{
    key: 'each',
    value: function each(callback) {
      if (callback) {
        this.cells.forEach(function (cell) {
          return callback(cell);
        });
      }
    }
  }, {
    key: 'eachKey',
    value: function eachKey(callback) {
      if (callback) {
        for (var i = 0; i < this.cells.keys().length; i++) {
          this.apply(this.cells.keys()[i], callback);
        }
      } else {
        return this.cells.keys();
      }
    }
  }, {
    key: 'has',
    value: function has(cell) {
      if (typeof cell === 'string') {
        return this.cells.has(cell);
      }

      return this.cells.has(cell.coords);
    }
  }, {
    key: 'add',
    value: function add(cell) {
      var _this = this;

      if (typeof cell === 'string' && !this.has(cell)) {
        this.cells.set(cell.coords, cell);
        return;
      }
      if (cell instanceof Array) {
        cell.forEach(function (el) {
          return _this.add(el);
        });
      } else {
        if (!this.cells[cell.coords]) {
          this.cells.set(cell.coords, cell);
          this.setLinks(cell);
          this.isFirstCell(cell);
          this.isLastCell(cell);
        }
      }
    }
  }, {
    key: 'remove',
    value: function remove(cell) {
      if (typeof cell === 'string' && this.cells.has(cell)) {
        this.cells.delete(cell);
        return;
      }
      this.cells.delete(cell.coords);
    }
  }, {
    key: 'get',
    value: function get(cell) {
      if (typeof cell === 'string') {
        return this.cells.get(cell);
      }
      if (!cell || !cell.coords) {
        debugger;
      }
      return this.cells.get(cell.coords);
    }
  }, {
    key: 'buildCellGrid',
    value: function buildCellGrid() {
      this.numRows = Math.floor(this.height / Opt.cellSize);
      this.numCols = Math.floor(this.width / Opt.cellSize);
      this.numCells = this.numRows * this.numCols;
      var gridOpt = {
        numRows: this.numRows,
        numCols: this.numCols,
        cellSize: Opt.cellSize
      };
      for (var i = 0; i < this.numCells; i++) {
        var col = i % 1000000 % this.numCols * Opt.cellSize;
        var row = Math.floor(i / this.numCols) * Opt.cellSize;
        var coords = row + ',' + col;
        var cell = new _.Cell(coords);
        cell.grid = this;
        this.add(cell);
      }
      return this;
    }
  }, {
    key: 'isFirstCell',
    value: function isFirstCell(cell) {
      if (!this.first || cell.y < this.first.y || cell.y === this.first.y && cell.x < this.last.x) {
        if (this.first) {
          this.first.isFirst = false;
        }
        this.first = cell;
        cell.isFirst = true;
        return true;
      }
      return false;
    }
  }, {
    key: 'isLastCell',
    value: function isLastCell(cell) {
      if (!this.last || cell.y > this.last.y || cell.y === this.last.y && cell.x > this.last.x) {
        if (this.last) {
          this.last.isLast = false;
        }
        this.last = cell;
        cell.isLast = true;
        return true;
      }
      return false;
    }
  }, {
    key: 'parseYX',
    value: function parseYX(coordString) {
      var split = void 0;
      var row = void 0;
      var col = void 0;
      split = coordString.match(/^(\d{0,}),(\d{0,}$)/);
      row = parseInt(split[1]);
      col = parseInt(split[2]);
      return { y: row, x: col };
    }
  }, {
    key: 'getCellAt',
    value: function getCellAt(y, x) {
      if (y < 0 || x < 0 || y > this.rows * this.cellSize || x > this.cols * this.cellSize) {
        return;
      }
      var cellY = Math.floor(y - y % this.cellSize);
      var cellX = Math.floor(x - x % this.cellSize);
      var cell = cellY + ',' + cellX;
      if (this.get(cell)) {
        return cell;
      }
    }
  }, {
    key: 'getRandomCell',
    value: function getRandomCell() {
      var mockEnt = {};
      var randomCell = void 0;
      var col = Math.floor(Math.random() * this.numCols);
      var row = Math.floor(Math.random() * this.numRows);
      col = col > this.numCols ? this.numCols - 2 : col;
      col = col < 0 ? 20 : col;
      row = row > this.numRows ? this.numRows : row;
      row = row < 0 ? 20 : row;
      mockEnt.x = col * Opt.cellSize;
      mockEnt.y = row * Opt.cellSize;
      randomCell = this.getCellAt(mockEnt.y, mockEnt.x);
      if (!randomCell) {
        debugger;
        this.getCellAt(mockEnt.y, mockEnt.x);
      }
      if (this.get(randomCell).size() > 0) {
        return this.getRandomCell();
      }
      return randomCell;
    }
  }, {
    key: 'setLinks',
    value: function setLinks(cell) {
      var intYX = this.parseYX(cell.coords);
      var links = this.getLinks(cell.coords);
      cell.y = intYX.y;
      cell.x = intYX.x;
      if (links.west) {
        cell.w = links.west;
      }
      if (links.north) {
        cell.n = links.north;
      }
      if (links.east) {
        cell.e = links.east;
      }
      if (links.south) {
        cell.s = links.south;
      }
      Object.values(links).forEach(function (link) {
        if (link) {
          cell.links.add(link);
        }
      });
    }
  }, {
    key: 'linkGridCells',
    value: function linkGridCells() {
      var _this2 = this;

      this.cells.forEach(function (cell) {
        return _this2.setLinks(cell);
      });
    }
  }, {
    key: 'getLinks',
    value: function getLinks() {
      for (var _len = arguments.length, arg = Array(_len), _key = 0; _key < _len; _key++) {
        arg[_key] = arguments[_key];
      }

      var delta = this.cellSize;
      var intYX = void 0;
      var y = void 0;
      var x = void 0;
      var lastY = void 0;
      var lastX = void 0;
      var nextY = void 0;
      var nextX = void 0;
      arg = Array.from(arg);
      if (typeof arg[0] === 'number') {
        y = arg[0];
        x = arg[1];
      }
      if (typeof arg[0] === 'string') {
        intYX = this.parseYX(arg[0]);
        y = intYX.y;
        x = intYX.x;
      }
      if (arg[0].constructor.name === 'Cell') {
        return arg[0].links;
      }
      if (_typeof(arg[0]) === 'object') {
        y = arg[0].y;
        x = arg[0].x;
      }
      lastY = y - delta;
      lastX = x - delta;
      nextY = y + delta;
      nextX = x + delta;
      return {
        west: this.getCellAt(y, lastX),
        north: this.getCellAt(lastY, x),
        east: this.getCellAt(y, nextX),
        south: this.getCellAt(nextY, x)
      };
    }
  }]);

  return Grid;
}();

exports.default = Grid;

/***/ }),

/***/ "./js/entities/map_grid/heap.js":
/*!**************************************!*\
  !*** ./js/entities/map_grid/heap.js ***!
  \**************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Node = function Node(cell) {
  _classCallCheck(this, Node);

  this.cell = cell.coords;
  this.score = cell.g + cell.h;
  this.neighbors = cell.linked;
  this.parent = cell.parent;
};

var Heap = function () {
  function Heap() {
    _classCallCheck(this, Heap);

    this.heap = [null];

    this.nodeAt = this.nodeAt.bind(this);
    this.scoreAt = this.scoreAt.bind(this);
  }

  _createClass(Heap, [{
    key: 'has',
    value: function has(cellNode) {
      for (var i = 1; i < this.size(); i++) {
        if (this.nodeAt(i).coords === cellNode.coords) {
          return true;
        }
      }
      return false;
    }
  }, {
    key: 'clear',
    value: function clear() {
      this.heap = [null];
    }
  }, {
    key: 'addNew',
    value: function addNew(cellNode) {
      var node = new Node(cellNode);
      this.insert(node);
    }
  }, {
    key: 'insert',
    value: function insert(num) {
      var scoreAt = this.scoreAt;
      var nodeAt = this.nodeAt;
      var iFloor = this.iFloor;

      this.heap.push(num);
      if (this.size() > 2) {
        var idx = this.size() - 1;
        while (scoreAt(idx) < scoreAt(iFloor(idx))) {
          if (idx >= 1) {
            this.swap(iFloor(idx), idx);
            if (iFloor(idx) > 1) {
              idx = iFloor(idx);
            } else {
              break;
            }
          }
        }
      }
    }
  }, {
    key: 'remove',
    value: function remove() {
      var scoreAt = this.scoreAt;
      var nodeAt = this.nodeAt;
      var smallest = nodeAt(1);

      if (this.size() > 2) {
        this.heap[1] = nodeAt(this.size() - 1);
        this.heap.splice(this.size() - 1);
        if (this.size() == 3) {
          if (scoreAt(1) > scoreAt(2)) {
            this.swap(1, 2);
          }
          return smallest;
        }
        var i = 1;
        var left = 2 * i;
        var right = 2 * i + 1;
        while (scoreAt(i) >= scoreAt(left) || scoreAt(i) >= scoreAt(right)) {

          if (scoreAt(left) < scoreAt(right)) {
            this.swap(i, left);
            i = 2 * i;
          } else {
            this.swap(i, right);
            i = 2 * i + 1;
          }
          left = 2 * i;
          right = 2 * i + 1;
          if (nodeAt(left) == undefined || nodeAt(right) == undefined) {

            break;
          }
        }
      } else if (this.size() == 2) {
        this.heap.splice(1, 1);
      } else {
        return null;
      }
      return smallest;
    }
  }, {
    key: 'sort',
    value: function sort() {
      var result = [];
      while (this.size() > 1) {
        result.push(this.remove());
      }
      return result;
    }

    ////////////////////////////////////////////////// HELPERS

  }, {
    key: 'iFloor',
    value: function iFloor(index) {
      return Math.floor(index / 2);
    }
  }, {
    key: 'nodeAt',
    value: function nodeAt(idx) {
      if (this.heap[idx]) {
        return this.heap[idx];
      }
    }
  }, {
    key: 'scoreAt',
    value: function scoreAt(idx) {
      if (this.heap[idx]) {
        return this.heap[idx].score;
      }
    }
  }, {
    key: 'swap',
    value: function swap(idx1, idx2) {
      var _ref = [this.heap[idx2], this.heap[idx1]];
      this.heap[idx1] = _ref[0];
      this.heap[idx2] = _ref[1];
    }
  }, {
    key: 'size',
    value: function size() {
      return this.heap.length;
    }

    ////////////////////////////////////////////////// TEST HELPERS

  }, {
    key: 'bulk',
    value: function bulk(arr) {
      for (var i = 0; i < arr.length; i++) {
        var node = new Node(arr[i]);
        this.insert(node);
      }
      return this.heap;
    }
  }, {
    key: 'run',
    value: function run(testInput) {
      var mockCells = [{ cell: 'cell-48', h: 48, g: 1 }, { cell: 'cell-92', h: 92, g: 1 }, { cell: 'cell-2', h: 2, g: 1 }, { cell: 'cell-13', h: 13, g: 1 }, { cell: 'cell-88', h: 88, g: 1 }, { cell: 'cell-4', h: 4, g: 1 }, { cell: 'cell-123', h: 123, g: 1 }, { cell: 'cell-12', h: 12, g: 1 }, { cell: 'cell-98', h: 98, g: 1 }, { cell: 'cell-60', h: 60, g: 1 }, { cell: 'cell-5', h: 5, g: 1 }, { cell: 'cell-1', h: 1, g: 1 }, { cell: 'cell-15', h: 15, g: 1 }, { cell: 'cell-0', h: 0, g: 1 }];
      testInput = testInput ? testInput : mockCells;
      return {
        bulkHeap: this.bulk(testInput).slice(0),
        sortedHeap: this.sort()
      };
    }
  }]);

  return Heap;
}();

exports.default = Heap;

/***/ }),

/***/ "./js/entities/map_grid/path_marker.js":
/*!*********************************************!*\
  !*** ./js/entities/map_grid/path_marker.js ***!
  \*********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var PathMark = function () {
  function PathMark(options) {
    _classCallCheck(this, PathMark);

    this.path = options.path;
    this.pathName = options.pathName;
    this.color = options.color;
    this.width = options.width;
    this.height = options.height;
    this.id = 'mark';
    this.x = options.path.x;
    this.y = options.path.y;
    this.x2 = this.x + this.width;
    this.y2 = this.y + this.height;
    this.cells = new Set();
    this.occupiedCells = new Set();
  }

  _createClass(PathMark, [{
    key: 'update',
    value: function update() {
      var _this = this;

      setTimeout(function () {
        _this.scene.remove(_this);
      }, 5000);
    }
  }, {
    key: 'render',
    value: function render() {
      var _path = this.path,
          x = _path.x,
          y = _path.y;
      var ctx = this.scene.ctx;

      ctx.fillStyle = '#e62c22';
      ctx.fillRect(x, y, this.width, this.height);
    }
  }]);

  return PathMark;
}();

exports.default = PathMark;

/***/ }),

/***/ "./js/entities/map_grid/pathfinder.js":
/*!********************************************!*\
  !*** ./js/entities/map_grid/pathfinder.js ***!
  \********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _heap = __webpack_require__(/*! ./heap */ "./js/entities/map_grid/heap.js");

var _heap2 = _interopRequireDefault(_heap);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Pathfinder = function () {
  function Pathfinder(timeStamp) {
    _classCallCheck(this, Pathfinder);

    this.timeNow = timeStamp;
    this.open = new _heap2.default();
    this.closed = new Map();
    this.cost = 0;
    this.pathFound = false;
    this.log = {
      elapsed: 0,
      start: null,
      goal: null,
      visits: [],
      sorts: {
        current: {},
        cost: {},
        nixed: {},
        opened: {},
        parented: {}
      },
      path: []
    };
    this.getGScore = this.getGScore.bind(this);
    this.initGrid = this.initGrid.bind(this);
    this.initPathfinder = this.initPathfinder.bind(this);
  }

  _createClass(Pathfinder, [{
    key: 'initGrid',
    value: function initGrid(grid) {
      var _this = this;

      grid = grid ? grid : this.scene.stage;
      var cells = new Map();
      this.grid = grid;
      this.goalXY = this.grid.parseYX(this.target.coords);
      grid.cells.forEach(function (cell) {
        cells.set(cell.coords, _this.newCellNode(cell));
      }, this);
      this.cells = cells;
      this.start = this.openNode(this.entity.coords);
      this.goal = this.cells.get(this.target.coords);
      this.log.start = this.start;
      this.log.goal = this.goal;
      return cells;
    }
  }, {
    key: 'initPathfinder',
    value: function initPathfinder(grid, entity, target) {
      this.open.clear();
      this.target = target;
      this.entity = entity;
      this.cost = 0;

      this.initGrid(grid);
      this.findPath();
    }
  }, {
    key: 'rebuildPath',
    value: function rebuildPath() {
      // debugger
      console.log(this);
      var path = [];
      var cell = this.goal;
      while (cell !== this.start) {
        path.unshift(cell);
        cell = cell.parent;
        if (cell === null) {
          break;
        }
      }
      this.path = path;
      this.pathFound = true;

      this.log.path = path;
      console.log('PATH FOUND IN ' + this.log.elapsed + ' ms LOG: ', this.log);
    }
  }, {
    key: 'findPath',
    value: function findPath() {
      var startTime = performance.now();
      var current = void 0;
      var cost = void 0;
      var i = 0;
      while (!this.pathFound && this.open.size() > 1) {
        this.log.visits.push(['Visiting: ' + i, current]);
        current = this.getNext();
        i++;
        if (current) {
          this.log.sorts.current[current.coords] = current;
          if (current.isGoal) {
            this.log.elapsed = performance.now() - startTime;

            this.rebuildPath();
            return;
          }
          if (!current.g) {
            this.getGScore(current);
          }
          var _iteratorNormalCompletion = true;
          var _didIteratorError = false;
          var _iteratorError = undefined;

          try {
            for (var _iterator = current.linked[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
              var link = _step.value;

              cost = current.g + this.findMCost(current, link);
              this.log.sorts.cost[current.coords] = cost;
              if (link.isOpen && cost < this.getGScore(link)) {
                link.isOpen = false;
                this.log.sorts.nixed[link.coords] = link;
                continue;
              }
              if (link.isClosed && cost > this.getGScore(link)) {
                this.openNode(link.coords);
                link.parent = current;
                this.log.sorts.opened[link.coords] = link;
                continue;
              }
              if (!link.isOpen && !link.isClosed) {
                cost = link.g;
                this.cost += cost;
                link.parent = current;
                this.openNode(link.coords);
                this.log.sorts.parented[link.coords] = link;
              }
            }
          } catch (err) {
            _didIteratorError = true;
            _iteratorError = err;
          } finally {
            try {
              if (!_iteratorNormalCompletion && _iterator.return) {
                _iterator.return();
              }
            } finally {
              if (_didIteratorError) {
                throw _iteratorError;
              }
            }
          }
        }
      }
      if (!this.nullPath) {
        this.checkNullPath();
      }
    }
  }, {
    key: 'openNode',
    value: function openNode(coords) {
      var cell = this.cells.get(coords);
      if (cell.isClosed) {
        this.closed.delete(coords);
        cell.isClosed = false;
      }
      cell.isOpen = true;
      this.open.addNew(cell);
      return cell;
    }
  }, {
    key: 'closeNode',
    value: function closeNode(node) {
      var cell = this.cells.get(node.cell);
      cell.isOpen = false;
      cell.isClosed = true;
      this.closed.set(node.cell, node);
    }
  }, {
    key: 'getNext',
    value: function getNext() {
      var _this2 = this;

      var node = this.open.remove();
      var linkNodes = void 0;
      var linkNode = void 0;
      if (node) {
        var cell = this.cells.get(node.cell);
        linkNodes = [];
        if (!cell.isOpen || cell.isClosed) {
          this.getNext();
        }
        this.closeNode(node);
        cell.visited = true;
        cell.g = this.getGScore(cell);
        cell.f = cell.g + cell.h;
        node.score = cell.f;
        cell.linked.map(function (link) {
          if (typeof link === 'string') {
            linkNode = _this2.cells.get(link);
            if (linkNode && !linkNode.visited && !linkNode.isWall) {
              // debugger
              _this2.getGScore(linkNode);
              linkNodes.push(linkNode);
            }
          }
        }, this);
        if (linkNodes.length > 0) {
          cell.linked = linkNodes;
          return cell;
        }
        if (!this.nullPath) {
          this.checkNullPath();
        }
      }
    }
  }, {
    key: 'getGScore',
    value: function getGScore(cell) {
      if (cell.isStart) {
        return 0;
      }
      if (cell.parent) {
        cell.g += cell.parent.g + cell.m;
      } else {
        cell.g += cell.m;
      }
      return cell.g;
    }
  }, {
    key: 'getHScore',
    value: function getHScore(x, y) {
      var d1 = Math.abs(this.goalXY.x - x);
      var d2 = Math.abs(this.goalXY.y - y);
      return d1 + d2;
    }
  }, {
    key: 'findMCost',
    value: function findMCost(fromCell, toCell) {
      return fromCell.m + toCell.m;
    }
  }, {
    key: 'checkNullPath',
    value: function checkNullPath() {
      if (!this.pathFound) {
        var coords = this.goal.coords;

        if (this.open.has(this.goal) || this.open.size() > 1) {
          this.findPath();
        } else if (this.closed.has(coords) || this.cells.get(coords).visited || this.cells.get(coords).isClosed || this.cells.get(coords).parent) {
          this.rebuildPath();
        } else {
          this.nullPath = true;
          // console.log(`NO PATH EXISTS: ${this.start.coords}->${this.goal.coords}`, this.log);
        }
      }
    }
  }, {
    key: 'newCellNode',
    value: function newCellNode(gridCell) {
      var coords = gridCell.coords,
          links = gridCell.links,
          x = gridCell.x,
          y = gridCell.y,
          mCost = gridCell.mCost;

      var newCellNode = {};

      newCellNode.coords = coords;
      newCellNode.x = x;
      newCellNode.y = y;
      newCellNode.f = 0;
      newCellNode.g = 0;
      newCellNode.h = this.getHScore(x, y);
      newCellNode.m = mCost;
      newCellNode.isOpen = false;
      newCellNode.isClosed = false;
      newCellNode.visited = false;
      newCellNode.isStart = coords === this.entity.coords ? true : false;
      newCellNode.isGoal = coords === this.target.coords ? true : false;
      newCellNode.isWall = gridCell.has('wall');
      newCellNode.parent = null;
      newCellNode.linked = [];

      links.forEach(function (coords) {
        return newCellNode.linked.push(coords);
      });
      return newCellNode;
    }
  }]);

  return Pathfinder;
}();

exports.default = Pathfinder;

/***/ }),

/***/ "./js/entities/moving_entity.js":
/*!**************************************!*\
  !*** ./js/entities/moving_entity.js ***!
  \**************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _entity = __webpack_require__(/*! ./entity */ "./js/entities/entity.js");

var _entity2 = _interopRequireDefault(_entity);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var MovingEntity = function (_Entity) {
  _inherits(MovingEntity, _Entity);

  function MovingEntity(options) {
    _classCallCheck(this, MovingEntity);

    var _this = _possibleConstructorReturn(this, (MovingEntity.__proto__ || Object.getPrototypeOf(MovingEntity)).call(this, options));

    _this.speed = options.speed;
    _this.veloX = 0;
    _this.veloY = 0;
    _this.friction = options.friction;
    _this.isStuck = false;

    _this.update = _this.update.bind(_this);
    _this.updatePosition = _this.updatePosition.bind(_this);
    _this.handleKeyPress = _this.handleKeyPress.bind(_this);
    _this.keyResponse = _this.keyResponse.bind(_this);
    return _this;
  }

  _createClass(MovingEntity, [{
    key: 'handleKeyPress',
    value: function handleKeyPress(e) {
      this.keyResponse(e);
    }
  }, {
    key: 'keyResponse',
    value: function keyResponse(e) {}
  }, {
    key: 'watchKeys',
    value: function watchKeys() {
      document.addEventListener('keyup', this.handleKeyPress);
      document.addEventListener('keydown', this.handleKeyPress);
    }
  }, {
    key: 'update',
    value: function update(timeStamp) {
      this.timeNow = timeStamp;
      this.grid = this.scene.stage;
      if (!this.isStuck) {
        this.updatePosition();
        this.coords = this.grid.getCellAt(Math.floor(this.y), Math.floor(this.x));
      }
    }
  }, {
    key: 'move',
    value: function move() {
      if (this.activeKey) {
        switch (this.direction) {
          case 'WEST':
            this.veloX -= this.speed;
            break;
          case 'NORTH':
            this.veloY -= this.speed;
            break;
          case 'EAST':
            this.veloX += this.speed;
            break;
          case 'SOUTH':
            this.veloY += this.speed;
            break;
        }
      }
    }
  }, {
    key: 'updatePosition',
    value: function updatePosition() {
      if (this.detectCollision()) {
        this.resetPosition();
      }
      this.lastX = this.x;
      this.lastY = this.y;
      this.lastX2 = this.x2;
      this.lastY2 = this.y2;
      this.move();
      this.x += this.veloX;
      this.y += this.veloY;
      this.veloX *= this.friction;
      this.veloY *= this.friction;
      this.x2 = this.x + this.width;
      this.y2 = this.y + this.height;
    }
  }, {
    key: 'resetPosition',
    value: function resetPosition() {
      this.veloX = 0;
      this.veloY = 0;
      if (this.direction === this.collisionDirection) {
        switch (this.direction) {
          case 'WEST':
            this.x = this.lastX + 0.001;
            break;
          case 'NORTH':
            this.y = this.lastY + 0.001;
            break;
          case 'EAST':
            this.x = this.lastX - 0.001;
            break;
          case 'SOUTH':
            this.y = this.lastY - 0.001;
            break;
        }
      }
    }
  }, {
    key: 'detectCollision',
    value: function detectCollision(ent1, ent2) {
      var _this2 = this;

      ent1 = ent1 ? ent1 : this;
      var _ent = ent1,
          x = _ent.x,
          y = _ent.y,
          x2 = _ent.x2,
          y2 = _ent.y2;

      var collision = false;
      if (this.occupiedCells.size > 0) {
        this.occupiedCells.forEach(function (cell) {
          cell.each(function (entity) {
            if (entity !== _this2 && entity.id !== 'mark') {
              if (x2 < entity.x || y2 < entity.y || x > entity.x2 || y > entity.y2) {
                collision = false;
              } else {
                collision = true;
                _this2.collisionDirection = _this2.direction;
              }
            }
          }, _this2);
        }, this);
      }
      return collision;
    }
  }]);

  return MovingEntity;
}(_entity2.default);

exports.default = MovingEntity;

/***/ }),

/***/ "./js/entities/stage.js":
/*!******************************!*\
  !*** ./js/entities/stage.js ***!
  \******************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _ = __webpack_require__(/*! ./ */ "./js/entities/index.js");

var _options = __webpack_require__(/*! ../components/options */ "./js/components/options.js");

var Opt = _interopRequireWildcard(_options);

var _grid = __webpack_require__(/*! ./map_grid/grid */ "./js/entities/map_grid/grid.js");

var _grid2 = _interopRequireDefault(_grid);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Stage = function (_Grid) {
  _inherits(Stage, _Grid);

  function Stage(options) {
    _classCallCheck(this, Stage);

    var _this = _possibleConstructorReturn(this, (Stage.__proto__ || Object.getPrototypeOf(Stage)).call(this, options));

    _this.entities = new Set();
    _this.numVoids = options.numVoids;
    _this.voidSize = options.voidSize;
    _this.wallLog = '';

    _this.render = _this.render.bind(_this);
    _this.update = _this.update.bind(_this);
    _this.placeWall = _this.placeWall.bind(_this);
    _this.updateCells = _this.updateCells.bind(_this);
    _this.getRandomCell = _this.getRandomCell.bind(_this);
    _this.generateTerrain = _this.generateTerrain.bind(_this);
    _this.buildStageBorder = _this.buildStageBorder.bind(_this);
    return _this;
  }

  _createClass(Stage, [{
    key: 'update',
    value: function update() {
      this.updateCells();
    }
  }, {
    key: 'render',
    value: function render() {
      var ctx = this.scene.ctx;
      var width = this.width,
          height = this.height;

      ctx.fillStyle = '#fff';
      ctx.fillRect(0, 0, width, height);
    }
  }, {
    key: 'init',
    value: function init(seed) {
      this.generateTerrain(seed);
      if (Opt.uiConfig.gridOverlay) {
        this.toggleGridOverlay();
      }
    }
  }, {
    key: 'buildStageBorder',
    value: function buildStageBorder() {
      var _this2 = this;

      var split = void 0;
      var row = void 0;
      var col = void 0;
      var wall = void 0;
      this.cells.forEach(function (cell) {
        split = _this2.parseYX(cell.coords);
        row = split.y;
        col = split.x;
        if (row === 0 || col === 0 || row === _this2.numRows * Opt.cellSize - Opt.cellSize || col === _this2.numCols * Opt.cellSize - Opt.cellSize) {
          _this2.placeWall(col, row);
        }
      }, this);
    }
  }, {
    key: 'placeWall',
    value: function placeWall(x, y) {
      var sceneW = this.numCols * Opt.cellSize;
      var sceneH = this.numRows * Opt.cellSize;
      x = x >= sceneW ? sceneW - Opt.cellSize : x;
      y = y >= sceneH ? sceneH - Opt.cellSize : y;
      var cell = this.getCellAt(y, x);
      cell = this.parseYX(cell);
      x = cell.x;
      y = cell.y;
      Opt.wall.x = x;
      Opt.wall.y = y;
      Opt.wall.width = Opt.cellSize;
      Opt.wall.height = Opt.cellSize;
      var wall = new _.Wall(Opt.wall);
      var coords = y + ',' + x;
      wall.id = 'wall';
      this.scene.add(wall);
      cell = this.get(coords);
      cell.add(wall);
      cell.isWall = true;
      this.wallLog += coords + '..';
      cell.setMCost();
    }
  }, {
    key: 'generateTerrain',
    value: function generateTerrain(seed) {
      this.buildCellGrid();
      this.linkGridCells();
      if (!seed) {
        this.buildStageBorder();
        var numVoids = this.numVoids;
        var voidSize = this.voidSize;
        for (var i = 0; i < numVoids; i++) {
          this.growVoid(voidSize, voidSize);
        }
      } else {
        seed = seed.split('..');
        seed.pop();
        for (var _i = 0; _i < seed.length; _i++) {
          var coords = this.parseYX(seed[_i]);
          this.placeWall(coords.x, coords.y);
        }
      }
      this.cells.forEach(function (cell) {
        return cell.setMCost();
      });
    }
  }, {
    key: 'growVoid',
    value: function growVoid(length, size, startX, startY) {
      var sceneW = this.width;
      var sceneH = this.height;
      var cSize = Opt.cellSize;
      if (!size) return;
      var randCell = this.getRandomCell();
      var split = this.parseYX(randCell);
      while (!this.get(randCell)) {
        randCell = this.getRandomCell();
      }
      split = this.parseYX(randCell);
      startY = startY ? startY : split.y;
      startX = startX ? startX : split.x;
      startX = startX >= sceneW ? sceneW - Opt.cellSize : startX;
      startX = startX <= 0 ? Opt.cellSize : startX;
      startY = startY >= sceneH ? sceneH - Opt.cellSize : startY;
      startY = startY <= 0 ? Opt.cellSize : startY;
      this.placeWall(startX, startY);
      var path = [[startX + cSize, startX - cSize], [startY + cSize, startY - cSize]];
      var pick = [path[0][Math.floor(Math.random() * path.length)], path[1][Math.floor(Math.random() * path.length)]];
      startX = pick[0];
      startY = pick[1];
      if (length > 4) {
        length = 0;
      }
      this.growVoid(length + 1, size - 1, startX, startY);
    }
  }, {
    key: 'updateCells',
    value: function updateCells() {
      var _this3 = this;

      var entityCells = void 0;
      this.entities.forEach(function (ent) {
        if (ent !== _this3 && ent.id !== 'wall' && ent.logType !== 'cell') {
          entityCells = _this3.getEntityCells(ent);
          ent.cells.forEach(function (cell) {
            _this3.get(cell).remove(ent);
          }, _this3);
          ent.cells.clear();
          Object.values(entityCells).forEach(function (cell) {
            if (!cell) {
              debugger;
            }
            _this3.get(cell).add(ent);
          }, _this3);
          Object.values(entityCells).forEach(function (cell) {
            ent.cells.add(cell);
            if (_this3.get(cell).size() > 1) {
              ent.occupiedCells.clear();
              ent.occupiedCells.add(_this3.get(cell));
            }
          }, _this3);
        }
        ent.grid = _this3.grid;
      }, this);
    }
  }, {
    key: 'getEntityCells',
    value: function getEntityCells(entity) {
      var x = entity.x,
          y = entity.y,
          x2 = entity.x2,
          y2 = entity.y2;

      return {
        topLeft: this.getCellAt(y, x),
        topRight: this.getCellAt(y, x2),
        btmLeft: this.getCellAt(y2, x),
        btmRight: this.getCellAt(y2, x2)
      };
    }
  }, {
    key: 'toggleGridOverlay',
    value: function toggleGridOverlay() {
      var cells = Array.from(this.cells.values());
      if (Opt.uiConfig.gridOverlay) {
        this.scene.add(cells);
      } else {
        for (var i = 0; i < cells.length; i++) {
          this.scene.remove(cells[i]);
        }
      }
    }
  }]);

  return Stage;
}(_grid2.default);

exports.default = Stage;

/***/ }),

/***/ "./js/entities/tiles/wall.js":
/*!***********************************!*\
  !*** ./js/entities/tiles/wall.js ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _ = __webpack_require__(/*! ../ */ "./js/entities/index.js");

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Wall = function (_Entity) {
  _inherits(Wall, _Entity);

  function Wall(options) {
    _classCallCheck(this, Wall);

    var _this = _possibleConstructorReturn(this, (Wall.__proto__ || Object.getPrototypeOf(Wall)).call(this, options));

    _this.id = 'wall';
    _this.width = options.width;
    _this.height = options.height;
    _this.color = options.color;
    return _this;
  }

  _createClass(Wall, [{
    key: 'render',
    value: function render() {
      var x = this.x,
          y = this.y,
          width = this.width,
          height = this.height;
      var ctx = this.scene.ctx;
      // if (Math.floor(Math.random() * 100000 < 2)) {
      //   ctx.shadowColor = 'black'
      //   ctx.shadowBlur = Math.random() * 100
      //
      // }

      ctx.fillStyle = this.color;
      ctx.fillRect(x, y, width, height);
    }
  }]);

  return Wall;
}(_.Entity);

exports.default = Wall;

/***/ }),

/***/ "./js/main.js":
/*!********************!*\
  !*** ./js/main.js ***!
  \********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _components = __webpack_require__(/*! ./components */ "./js/components/index.js");

var _ui = __webpack_require__(/*! ./components/ui */ "./js/components/ui.js");

var UI = _interopRequireWildcard(_ui);

var _options = __webpack_require__(/*! ./components/options */ "./js/components/options.js");

var Opt = _interopRequireWildcard(_options);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

window.onload = function () {
  var game = new _components.Game();
  game.init();

  window.game = game;

  var gridRule = document.getElementById('grid-rules');
  var xRule = document.createElement('div');
  var yRule = document.createElement('div');
  xRule.id = 'x-rule';
  yRule.id = 'y-rule';
  for (var i = 0; i < Opt.stage.width; i += Opt.cellSize) {
    var x = document.createElement('div');
    if (i % 100 === 0) {
      x.innerText = '' + i;
    } else {
      x.innerText = '' + i % 100;
    }
    x.classList.add('grid-num');
    xRule.appendChild(x);
  }
  for (var _i = 0; _i < Opt.stage.height; _i += Opt.cellSize) {
    var y = document.createElement('div');
    if (_i % 100 === 0) {
      y.innerText = '' + _i;
    } else {
      y.innerText = '' + _i % 100;
    }
    y.classList.add('grid-num');
    yRule.appendChild(y);
  }
  gridRule.appendChild(xRule);
  gridRule.appendChild(yRule);
  UI.init(game);
};

/***/ }),

/***/ 0:
/*!**************************!*\
  !*** multi ./js/main.js ***!
  \**************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(/*! ./js/main.js */"./js/main.js");


/***/ })

/******/ });