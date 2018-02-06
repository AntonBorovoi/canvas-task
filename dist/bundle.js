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
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _canvas = __webpack_require__(1);

var _canvas2 = _interopRequireDefault(_canvas);

var _polygon = __webpack_require__(2);

var _polygon2 = _interopRequireDefault(_polygon);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

window.onload = function () {
  var polygons = [];
  polygons.push(new _polygon2.default(3, 30, 50, 50, 'blue'));
  polygons.push(new _polygon2.default(4, 30, 50, 150, 'green'));
  polygons.push(new _polygon2.default(5, 30, 50, 250, 'orange'));
  polygons.push(new _polygon2.default(6, 30, 50, 350, 'gray'));
  polygons.push(new _polygon2.default(7, 30, 50, 450, 'yellow'));
  var canvas = new _canvas2.default(window.innerWidth, window.innerHeight, polygons);
  canvas.init();
  canvas.drawElements();
};

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Canvas = function () {
  function Canvas(width, height, elements) {
    _classCallCheck(this, Canvas);

    this.canvas = document.getElementById('canvas');
    this.canvas.width = width;
    this.canvas.height = height;
    this.elements = elements;
  }

  _createClass(Canvas, [{
    key: 'init',
    value: function init() {
      var rect = this.canvas.getBoundingClientRect();
      this.offsetX = rect.left;
      this.offsetY = rect.top;
      this.canvas.onmousedown = this.onMouseDown.bind(this);
      this.canvas.onmouseup = this.onMouseUp.bind(this);
      this.canvas.onmousemove = this.onMouseMove.bind(this);
    }
  }, {
    key: 'onMouseDown',
    value: function onMouseDown(e) {
      var _this = this;

      e.preventDefault();
      e.stopPropagation();

      var mx = parseInt(e.clientX - this.offsetX);
      var my = parseInt(e.clientY - this.offsetY);

      this.elements.some(function (element, index) {
        if (element.isPointInside(mx, my)) {
          element.changeIsDraggingValue(true);
          _this.elements.splice(0, 0, _this.elements.splice(index, 1)[0]);
          _this.isDragMode = true;
          return element;
        }
      });

      this.startX = mx;
      this.startY = my;
    }
  }, {
    key: 'onMouseUp',
    value: function onMouseUp(e) {
      var _this2 = this;

      e.preventDefault();
      e.stopPropagation();
      this.isDragMode = false;

      this.elements.forEach(function (element, index) {
        element.changeIsDraggingValue(false);
        var hasIntersectionElements = false;

        _this2.elements.find(function (comparingElement, innerIndex) {
          if (index === innerIndex) return;
          if (element.isIntersectWith(comparingElement)) {
            return hasIntersectionElements = true;
          }
        });

        if (hasIntersectionElements) element.changeHasIntersectionsValue(true);else element.changeHasIntersectionsValue(false);
      });

      this.drawElements();
    }
  }, {
    key: 'onMouseMove',
    value: function onMouseMove(e) {
      e.preventDefault();
      e.stopPropagation();

      if (this.isDragMode) {
        var mx = parseInt(e.clientX - this.offsetX);
        var my = parseInt(e.clientY - this.offsetY);

        var dx = mx - this.startX;
        var dy = my - this.startY;

        this.elements.forEach(function (element) {
          if (element.isDragging) {
            element.move(dx, dy);
          }
        });

        this.startX = mx;
        this.startY = my;

        this.drawElements();
      }
    }
  }, {
    key: 'clear',
    value: function clear() {
      this.canvas.getContext('2d').clearRect(0, 0, this.canvas.width, this.canvas.height);
    }
  }, {
    key: 'drawElements',
    value: function drawElements() {
      var _this3 = this;

      this.clear();
      this.elements.forEach(function (element) {
        element.draw(_this3.canvas);
      });
    }
  }]);

  return Canvas;
}();

exports.default = Canvas;

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Polygon = function () {
  function Polygon(numberOfSides, size, Xcenter, Ycenter, color) {
    _classCallCheck(this, Polygon);

    this.numberOfSides = numberOfSides;
    this.size = size;
    this.Xcenter = Xcenter;
    this.Ycenter = Ycenter;
    this.color = color;
    this.isDragging = false;
    this.hasIntersections = false;
    this._calculatePoints();
  }

  _createClass(Polygon, [{
    key: '_calculatePoints',
    value: function _calculatePoints() {
      this.points = [];
      for (var i = 0; i < this.numberOfSides; i += 1) {
        var point = {
          x: this.Xcenter + this.size * Math.cos(i * 2 * Math.PI / this.numberOfSides),
          y: this.Ycenter + this.size * Math.sin(i * 2 * Math.PI / this.numberOfSides)
        };

        this.points.push(point);
      }
    }
  }, {
    key: 'draw',
    value: function draw(canvas) {
      var context = canvas.getContext('2d');
      context.globalCompositeOperation = 'destination-over';
      context.beginPath();

      this.points.forEach(function (point, index) {
        if (index === 0) context.moveTo(point.x, point.y);else context.lineTo(point.x, point.y);
      });

      context.fillStyle = this.hasIntersections ? 'red' : this.color;
      context.fill();
    }
  }, {
    key: 'changeIsDraggingValue',
    value: function changeIsDraggingValue(value) {
      this.isDragging = value;
    }
  }, {
    key: 'changeHasIntersectionsValue',
    value: function changeHasIntersectionsValue(value) {
      this.hasIntersections = value;
    }
  }, {
    key: 'move',
    value: function move(coordinateX, coordinateY) {
      this.points.forEach(function (point) {
        point.x += coordinateX;
        point.y += coordinateY;
      });
    }
  }, {
    key: 'isIntersectWith',
    value: function isIntersectWith(polygon) {
      var axis = { x: 0, y: 0 };
      var tmp = void 0,
          minA = void 0,
          maxA = void 0,
          minB = void 0,
          maxB = void 0;
      var side = void 0;

      for (side = 0; side < this.numberOfSides; side++) {
        if (side === 0) {
          axis.x = this.points[this.numberOfSides - 1].y - this.points[0].y;
          axis.y = this.points[0].x - this.points[this.numberOfSides - 1].x;
        } else {
          axis.x = this.points[side - 1].y - this.points[side].y;
          axis.y = this.points[side].x - this.points[side - 1].x;
        }

        tmp = Math.sqrt(axis.x * axis.x + axis.y * axis.y);
        axis.x /= tmp;
        axis.y /= tmp;

        minA = maxA = this.points[0].x * axis.x + this.points[0].y * axis.y;
        this.points.forEach(function (point) {
          tmp = point.x * axis.x + point.y * axis.y;
          if (tmp > maxA) maxA = tmp;else if (tmp < minA) minA = tmp;
        });

        minB = maxB = polygon.points[0].x * axis.x + polygon.points[0].y * axis.y;
        polygon.points.forEach(function (point) {
          tmp = point.x * axis.x + point.y * axis.y;
          if (tmp > maxB) maxB = tmp;else if (tmp < minB) minB = tmp;
        });

        if (maxA < minB || minA > maxB) return false;
      }

      for (side = 0; side < polygon.numberOfSides; side++) {
        if (side === 0) {
          axis.x = polygon.points[polygon.numberOfSides - 1].y - polygon.points[0].y;
          axis.y = polygon.points[0].x - polygon.points[polygon.numberOfSides - 1].x;
        } else {
          axis.x = polygon.points[side - 1].y - polygon.points[side].y;
          axis.y = polygon.points[side].x - polygon.points[side - 1].x;
        }

        tmp = Math.sqrt(axis.x * axis.x + axis.y * axis.y);
        axis.x /= tmp;
        axis.y /= tmp;

        minA = maxA = this.points[0].x * axis.x + this.points[0].y * axis.y;

        this.points.forEach(function (point) {
          tmp = point.x * axis.x + point.y * axis.y;
          if (tmp > maxA) maxA = tmp;else if (tmp < minA) minA = tmp;
        });

        minB = maxB = polygon.points[0].x * axis.x + polygon.points[0].y * axis.y;
        polygon.points.forEach(function (point) {
          tmp = point.x * axis.x + point.y * axis.y;
          if (tmp > maxB) maxB = tmp;else if (tmp < minB) minB = tmp;
        });

        if (maxA < minB || minA > maxB) return false;
      }

      return true;
    }
  }, {
    key: 'isPointInside',
    value: function isPointInside(pointX, pointY) {
      var c = false;
      for (var i = -1, l = this.points.length, j = l - 1; ++i < l; j = i) {
        (this.points[i].y <= pointY && pointY < this.points[j].y || this.points[j].y <= pointY && pointY < this.points[i].y) && pointX < (this.points[j].x - this.points[i].x) * (pointY - this.points[i].y) / (this.points[j].y - this.points[i].y) + this.points[i].x && (c = !c);
      }return c;
    }
  }]);

  return Polygon;
}();

exports.default = Polygon;

/***/ })
/******/ ]);