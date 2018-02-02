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
/******/ 	__webpack_require__.p = "/dist";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(1);
module.exports = __webpack_require__(3);


/***/ }),
/* 1 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__main_scss__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__main_scss___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__main_scss__);



/***/ }),
/* 2 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Create the game of life
 */
const gameOfLife_1 = __webpack_require__(4);
gameOfLife_1.gameOfLife([
    { x: 20, y: 20 },
    { x: 21, y: 20 },
    { x: 22, y: 20 },
    { x: 23, y: 20 },
    { x: 24, y: 20 },
    { x: 25, y: 20 },
    { x: 26, y: 20 },
    { x: 27, y: 20 },
    { x: 28, y: 20 },
    { x: 29, y: 20 },
]);


/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

/**
 * Create the Game of Life
 */
Object.defineProperty(exports, "__esModule", { value: true });
const canvas_1 = __webpack_require__(5);
const options_1 = __webpack_require__(6);
const cells_1 = __webpack_require__(7);
const controls_1 = __webpack_require__(8);
exports.gameOfLife = (start = [], config = {}) => {
    const options = Object.assign({}, options_1.DEFAULT_OPTIONS, config);
    const canvas = canvas_1.canvasFactory.create({
        container: options.container,
        width: options.cellSize * options.horizontalCells,
        height: options.cellSize * options.verticalCells
    });
    const cellRegistry = cells_1.cellRegistryFactory.create({
        cells: start
    });
    function show(x, y) {
        const count = cellRegistry.neighborCount(x, y);
        if (cellRegistry.exists(x, y)) {
            if (count === 2 || count == 3) {
                return true;
            }
        }
        else if (count === 3) {
            return true;
        }
        return false;
    }
    function draw() {
        canvas.clear();
        canvas.context.fillStyle = options.backgroundColor;
        for (let x = 0; x < options.horizontalCells; x += 1) {
            for (let y = 0; y < options.verticalCells; y += 1) {
                canvas.context.strokeRect(x * options.cellSize, y * options.cellSize, options.cellSize, options.cellSize);
                canvas.context.fillRect(x * options.cellSize, y * options.cellSize, options.cellSize, options.cellSize);
            }
        }
        canvas.context.fillStyle = options.foregroundColor;
        canvas.context.strokeStyle = options.strokeColor;
        for (const id in cellRegistry.get()) {
            const cell = cellRegistry.findById(id);
            canvas.context.strokeRect(cell.x * options.cellSize, cell.y * options.cellSize, options.cellSize, options.cellSize);
            canvas.context.fillRect(cell.x * options.cellSize, cell.y * options.cellSize, options.cellSize, options.cellSize);
        }
    }
    const api = {
        addCell(mouseX, mouseY) {
            const rect = canvas.element.getBoundingClientRect();
            if (mouseX > rect.left && mouseX < rect.right &&
                mouseY > rect.top && mouseY < rect.bottom) {
                const x = Math.floor((mouseX - rect.left) / options.cellSize);
                const y = Math.floor((mouseY - rect.top) / options.cellSize);
                if (cellRegistry.exists(x, y)) {
                    cellRegistry.remove(x, y);
                }
                else {
                    cellRegistry.add(x, y);
                }
                draw();
            }
        },
        redraw() {
            const cells = [];
            for (const id in cellRegistry.get()) {
                const cell = cellRegistry.findById(id);
                const surroundingCells = cellRegistry.surroundingCells(cell.x, cell.y);
                surroundingCells.concat([cell]).forEach((cell) => {
                    if (show(cell.x, cell.y)) {
                        cells.push(cell);
                    }
                });
            }
            cellRegistry.set(cells);
            draw();
        },
        reset() {
            cellRegistry.set([]);
            draw();
        }
    };
    controls_1.controlFactory.create({
        api,
        container: options.container,
        delay: options.delay
    });
    draw();
};


/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.canvasFactory = (() => {
    return {
        create(options) {
            const element = window.document.createElement('canvas');
            const context = element.getContext('2d');
            element.setAttribute('width', String(options.width));
            element.setAttribute('height', String(options.height));
            options.container.appendChild(element);
            return {
                element,
                context,
                clear() {
                    context.clearRect(0, 0, options.width, options.height);
                }
            };
        }
    };
})();


/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.DEFAULT_OPTIONS = {
    backgroundColor: '#6E8898',
    cellSize: 10,
    container: window.document.querySelector('body'),
    delay: 500,
    foregroundColor: '#D3D0CB',
    horizontalCells: 60,
    strokeColor: '#2E5266',
    verticalCells: 60
};


/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

/**
 * Registry for cells
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.cellRegistryFactory = (() => {
    return {
        create(options) {
            let store = {};
            function id(x, y) {
                return `x${x}y${y}`;
            }
            const cellRegistry = {
                add(x, y) {
                    if (this.exists(x, y)) {
                        return;
                    }
                    const cell = {
                        x,
                        y
                    };
                    store[id(x, y)] = cell;
                    return cell;
                },
                remove(x, y) {
                    delete store[id(x, y)];
                },
                find(x, y) {
                    return store[id(x, y)];
                },
                findById(id) {
                    return store[id];
                },
                exists(x, y) {
                    return this.find(x, y) !== undefined;
                },
                get() {
                    return store;
                },
                set(cells) {
                    store = {};
                    cells.forEach((cell) => {
                        this.add(cell.x, cell.y);
                    });
                },
                surroundingCells(x, y) {
                    const top = y - 1;
                    const bottom = y + 1;
                    const right = x + 1;
                    const left = x - 1;
                    return [
                        { x: left, y: top },
                        { x, y: top },
                        { x: right, y: top },
                        { x: right, y },
                        { x: right, y: bottom },
                        { x, y: bottom },
                        { x: left, y: bottom },
                        { x: left, y },
                    ];
                },
                neighborCount(x, y) {
                    const cells = this.surroundingCells(x, y);
                    return cells.reduce((accumulator, neighbor) => {
                        if (this.exists(neighbor.x, neighbor.y)) {
                            return accumulator + 1;
                        }
                        return accumulator;
                    }, 0);
                }
            };
            cellRegistry.set(options.cells);
            return cellRegistry;
        }
    };
})();


/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.controlFactory = (() => {
    return {
        create(options) {
            let interval;
            const wrapper = window.document.createElement('div');
            wrapper.classList.add('py-3');
            options.container.appendChild(wrapper);
            const next = window.document.createElement('button');
            next.innerText = 'next';
            next.classList.add('btn', 'btn-primary', 'mr-2');
            wrapper.appendChild(next);
            next.addEventListener('click', () => {
                window.clearInterval(interval);
                options.api.redraw();
            });
            const auto = window.document.createElement('button');
            auto.innerText = 'auto';
            auto.classList.add('btn', 'btn-success', 'mr-2');
            wrapper.appendChild(auto);
            auto.addEventListener('click', () => {
                window.clearInterval(interval);
                interval = window.setInterval(() => {
                    options.api.redraw();
                }, options.delay);
            });
            options.container.addEventListener('click', (event) => {
                options.api.addCell(event.clientX, event.clientY);
            });
        }
    };
})();


/***/ })
/******/ ]);
//# sourceMappingURL=main.js.map