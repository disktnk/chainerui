webpackJsonp([0],{

/***/ 117:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Utils = function () {
  function Utils() {
    _classCallCheck(this, Utils);
  }

  _createClass(Utils, null, [{
    key: 'line2key',
    value: function line2key(line) {
      return line.resultId + '_' + line.logKey;
    }
  }, {
    key: 'line2dataKey',
    value: function line2dataKey(line, axisName) {
      return axisName + '_' + Utils.line2key(line);
    }
  }, {
    key: 'truncateForward',
    value: function truncateForward(string, length) {
      var beginning = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : '...';

      var str = string || '';
      if (str.length > length) {
        return beginning + str.substring(str.length - length + beginning.length, str.length);
      }
      return str;
    }
  }]);

  return Utils;
}();

/* harmony default export */ __webpack_exports__["a"] = (Utils);

/***/ }),

/***/ 281:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return CALL_API; });
var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var API_ROOT = '/api/v1/';

var callApi = function callApi(endpoint) {
  var fullUrl = endpoint.indexOf(API_ROOT) === -1 ? API_ROOT + endpoint : endpoint;

  return fetch(fullUrl).then(function (response) {
    return response.json().then(function (json) {
      if (!response.ok) {
        return Promise.reject(json);
      }
      return json;
    });
  });
};

var CALL_API = 'Call API';

/* harmony default export */ __webpack_exports__["b"] = (function (store) {
  return function (next) {
    return function (action) {
      var callAPI = action[CALL_API];
      if (typeof callAPI === 'undefined') {
        return next(action);
      }

      var endpoint = callAPI.endpoint;
      var types = callAPI.types;


      if (typeof endpoint === 'function') {
        endpoint = endpoint(store.getState());
      }

      if (!Array.isArray(types) || types.length !== 3) {
        throw new Error('Expected an array of three action types.');
      }

      var actionWith = function actionWith(data) {
        var finalAction = _extends({}, action, data);
        delete finalAction[CALL_API];
        return finalAction;
      };

      var _types = _slicedToArray(types, 3),
          requestType = _types[0],
          successType = _types[1],
          failureType = _types[2];

      next(actionWith({ type: requestType }));

      return callApi(endpoint).then(function (response) {
        return next(actionWith({
          response: response,
          type: successType
        }));
      }, function (error) {
        return next(actionWith({
          type: failureType,
          error: error.message || 'Something bad happened'
        }));
      });
    };
  };
});

/***/ }),

/***/ 282:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* unused harmony export RESULTS_REQUEST */
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "d", function() { return RESULTS_SUCCESS; });
/* unused harmony export RESULTS_FAILUE */
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "f", function() { return loadResults; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AXIS_CONFIG_LINE_ADD; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return AXIS_CONFIG_LINE_REMOVE; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "c", function() { return AXIS_CONFIG_SCALE_UPDATE; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "e", function() { return addLineToAxis; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "g", function() { return removeLineFromAxis; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "h", function() { return updateAxisScale; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__middleware_api__ = __webpack_require__(281);
function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }



// results API

var RESULTS_REQUEST = 'RESULTS_REQUEST';
var RESULTS_SUCCESS = 'RESULTS_SUCCESS';
var RESULTS_FAILUE = 'RESULTS_FAILUE';

var fetchResults = function fetchResults() {
  return _defineProperty({}, __WEBPACK_IMPORTED_MODULE_0__middleware_api__["a" /* CALL_API */], {
    types: [RESULTS_REQUEST, RESULTS_SUCCESS, RESULTS_FAILUE],
    endpoint: 'results'
  });
};

var loadResults = function loadResults() {
  return function (dispatch) {
    return dispatch(fetchResults());
  };
};

// axis config

var AXIS_CONFIG_LINE_ADD = 'AXIS_CONFIG_LINE_ADD';
var AXIS_CONFIG_LINE_REMOVE = 'AXIS_CONFIG_LINE_REMOVE';
var AXIS_CONFIG_SCALE_UPDATE = 'AXIS_CONFIG_SCALE_UPDATE';

var addLineToAxis = function addLineToAxis(axisName, line) {
  return {
    type: AXIS_CONFIG_LINE_ADD,
    axisName: axisName,
    line: line
  };
};

var removeLineFromAxis = function removeLineFromAxis(axisName, lineKey) {
  return {
    type: AXIS_CONFIG_LINE_REMOVE,
    axisName: axisName,
    lineKey: lineKey
  };
};

var updateAxisScale = function updateAxisScale(axisName, scale) {
  return {
    type: AXIS_CONFIG_SCALE_UPDATE,
    axisName: axisName,
    scale: scale
  };
};

/***/ }),

/***/ 423:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(424);


/***/ }),

/***/ 424:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_react_dom__ = __webpack_require__(24);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_react_dom___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_react_dom__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_react_redux__ = __webpack_require__(163);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_react_hot_loader__ = __webpack_require__(274);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_react_hot_loader___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_react_hot_loader__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__store_configureStore__ = __webpack_require__(544);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__containers_ChainerUIContainer__ = __webpack_require__(554);







var store = Object(__WEBPACK_IMPORTED_MODULE_4__store_configureStore__["a" /* default */])();

var render = function render(Component, appNode) {
  __WEBPACK_IMPORTED_MODULE_1_react_dom___default.a.render(__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
    __WEBPACK_IMPORTED_MODULE_2_react_redux__["Provider"],
    { store: store },
    __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
      __WEBPACK_IMPORTED_MODULE_3_react_hot_loader__["AppContainer"],
      null,
      __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(Component, null)
    )
  ), appNode);
};

if (false) {
  var appNode = document.createElement('div');
  document.body.appendChild(appNode);
  render(ChainerUIContainer, appNode);
  module.hot.accept('./containers/ChainerUIContainer', function () {
    render(ChainerUIContainer, appNode);
  });
} else {
  document.addEventListener('DOMContentLoaded', function () {
    var appNode = document.getElementById('chainer_ui-root');
    if (appNode) {
      render(__WEBPACK_IMPORTED_MODULE_5__containers_ChainerUIContainer__["a" /* default */], appNode);
    }
  });
}

/***/ }),

/***/ 544:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_redux__ = __webpack_require__(88);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_redux_thunk__ = __webpack_require__(275);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_redux_thunk___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_redux_thunk__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_redux_persist__ = __webpack_require__(166);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_redux_persist___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_redux_persist__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_redux_logger__ = __webpack_require__(280);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_redux_logger___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_redux_logger__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__middleware_api__ = __webpack_require__(281);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__reducers__ = __webpack_require__(550);







var configureStore = function configureStore(preloadedState) {
  var middleware = [__WEBPACK_IMPORTED_MODULE_1_redux_thunk___default.a, __WEBPACK_IMPORTED_MODULE_4__middleware_api__["b" /* default */], Object(__WEBPACK_IMPORTED_MODULE_3_redux_logger__["createLogger"])()];

  var store = Object(__WEBPACK_IMPORTED_MODULE_0_redux__["createStore"])(__WEBPACK_IMPORTED_MODULE_5__reducers__["a" /* default */], preloadedState, __WEBPACK_IMPORTED_MODULE_0_redux__["applyMiddleware"].apply(undefined, middleware));

  Object(__WEBPACK_IMPORTED_MODULE_2_redux_persist__["persistStore"])(store);

  return store;
};

/* harmony default export */ __webpack_exports__["a"] = (configureStore);

/***/ }),

/***/ 550:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_redux__ = __webpack_require__(88);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_redux_persist__ = __webpack_require__(166);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_redux_persist___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_redux_persist__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_redux_persist_es_storage__ = __webpack_require__(551);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_redux_persist_es_storage___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_redux_persist_es_storage__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__actions__ = __webpack_require__(282);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__utils__ = __webpack_require__(117);
var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }







var entities = function entities() {
  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : { results: {} };
  var action = arguments[1];

  switch (action.type) {
    case __WEBPACK_IMPORTED_MODULE_3__actions__["d" /* RESULTS_SUCCESS */]:
      if (action.response && action.response.results) {
        var resultsList = action.response.results;
        var results = {};
        resultsList.forEach(function (result) {
          results[result.id] = result;
        });
        return _extends({}, state, { results: results });
      }
      break;
    default:
      break;
  }
  return state;
};

var axes = function axes() {
  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  var action = arguments[1];
  var line2key = __WEBPACK_IMPORTED_MODULE_4__utils__["a" /* default */].line2key;
  var axisName = action.axisName,
      line = action.line,
      lineKey = action.lineKey,
      scale = action.scale;

  if (axisName == null) {
    return state;
  }
  var axisConfig = state[axisName] || { axisName: axisName };
  var _axisConfig$lines = axisConfig.lines,
      lines = _axisConfig$lines === undefined ? [] : _axisConfig$lines;


  switch (action.type) {
    case __WEBPACK_IMPORTED_MODULE_3__actions__["a" /* AXIS_CONFIG_LINE_ADD */]:
      if (line == null) {
        return state;
      }
      return _extends({}, state, _defineProperty({}, axisName, _extends({}, axisConfig, {
        lines: [].concat(_toConsumableArray(lines), [line])
      })));
    case __WEBPACK_IMPORTED_MODULE_3__actions__["b" /* AXIS_CONFIG_LINE_REMOVE */]:
      if (lineKey == null) {
        return state;
      }
      return _extends({}, state, _defineProperty({}, axisName, _extends({}, axisConfig, {
        lines: [].concat(_toConsumableArray(lines.filter(function (l) {
          return line2key(l) !== lineKey;
        })))
      })));
    case __WEBPACK_IMPORTED_MODULE_3__actions__["c" /* AXIS_CONFIG_SCALE_UPDATE */]:
      return _extends({}, state, _defineProperty({}, axisName, _extends({}, axisConfig, {
        scale: scale
      })));
    default:
      return state;
  }
};

var config = Object(__WEBPACK_IMPORTED_MODULE_0_redux__["combineReducers"])({
  axes: axes
});

var rootReducer = Object(__WEBPACK_IMPORTED_MODULE_0_redux__["combineReducers"])({
  entities: entities,
  config: Object(__WEBPACK_IMPORTED_MODULE_1_redux_persist__["persistReducer"])({ key: 'config', storage: __WEBPACK_IMPORTED_MODULE_2_redux_persist_es_storage___default.a }, config)
});

/* harmony default export */ __webpack_exports__["a"] = (rootReducer);

/***/ }),

/***/ 551:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createWebStorage = __webpack_require__(552);

var _createWebStorage2 = _interopRequireDefault(_createWebStorage);

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
}

exports.default = (0, _createWebStorage2.default)('local');

/***/ }),

/***/ 552:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = createWebStorage;

var _getStorage = __webpack_require__(553);

var _getStorage2 = _interopRequireDefault(_getStorage);

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
}

function createWebStorage(type) {
  var storage = (0, _getStorage2.default)(type);
  return {
    getItem: function getItem(key, cb) {
      return cb(null, storage.getItem(key));
    },
    setItem: function setItem(key, item, cb) {
      try {
        cb(null, storage.setItem(key, item));
      } catch (err) {
        cb(err);
      }
    },
    removeItem: function removeItem(key, cb) {
      return cb(null, storage.removeItem(key));
    },
    getAllKeys: function getAllKeys(cb) {
      return cb(null, Object.keys(storage));
    }
  };
}

/***/ }),

/***/ 553:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _typeof2 = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _typeof = typeof Symbol === "function" && _typeof2(Symbol.iterator) === "symbol" ? function (obj) {
  return typeof obj === "undefined" ? "undefined" : _typeof2(obj);
} : function (obj) {
  return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj === "undefined" ? "undefined" : _typeof2(obj);
};

exports.default = getStorage;

function noop() {}

var noopStorage = {
  getItem: noop,
  setItem: noop,
  removeItem: noop,
  getAllKeys: noop
};

function hasStorage(storageType) {
  if ((typeof window === 'undefined' ? 'undefined' : _typeof(window)) !== 'object' || !(storageType in window)) {
    return false;
  }

  try {
    var storage = window[storageType];
    var testKey = 'redux-persist ' + storageType + ' test';
    storage.setItem(testKey, 'test');
    storage.getItem(testKey);
    storage.removeItem(testKey);
  } catch (e) {
    if (false) console.warn('redux-persist ' + storageType + ' test failed, persistence will be disabled.');
    return false;
  }
  return true;
}

function getStorage(type) {
  var storageType = type + 'Storage';
  if (hasStorage(storageType)) return window[storageType];else {
    if (false) {
      console.error('redux-persist failed to create sync storage. falling back to memory storage.');
    }
    return noopStorage;
  }
}

/***/ }),

/***/ 554:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_prop_types__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_prop_types___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_prop_types__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_react_redux__ = __webpack_require__(163);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__actions__ = __webpack_require__(282);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__components_ExperimentsTable__ = __webpack_require__(555);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__components_LogVisualizer__ = __webpack_require__(557);
var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }








var resultsLoadInterval = 5 * 1000;

var ChainerUIContainer = function (_React$Component) {
  _inherits(ChainerUIContainer, _React$Component);

  function ChainerUIContainer() {
    _classCallCheck(this, ChainerUIContainer);

    return _possibleConstructorReturn(this, (ChainerUIContainer.__proto__ || Object.getPrototypeOf(ChainerUIContainer)).apply(this, arguments));
  }

  _createClass(ChainerUIContainer, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      this.resultsLoadTimer = setInterval(this.props.loadResults, resultsLoadInterval);
    }
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      clearInterval(this.resultsLoadTimer);
    }
  }, {
    key: 'handleAxisConfigLineAdd',
    value: function handleAxisConfigLineAdd(axisName, line) {
      this.props.addLineToAxis(axisName, line);
    }
  }, {
    key: 'render',
    value: function render() {
      var _props = this.props,
          results = _props.results,
          config = _props.config,
          stats = _props.stats;


      return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
        'div',
        { className: 'chainer-ui-container' },
        __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_5__components_LogVisualizer__["a" /* default */], {
          results: results,
          stats: stats,
          config: config,
          onAxisConfigLineAdd: this.props.addLineToAxis,
          onAxisConfigLineRemove: this.props.removeLineFromAxis,
          onAxisConfigScaleUpdate: this.props.updateAxisScale
        }),
        __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_4__components_ExperimentsTable__["a" /* default */], {
          results: results,
          stats: stats
        })
      );
    }
  }]);

  return ChainerUIContainer;
}(__WEBPACK_IMPORTED_MODULE_0_react___default.a.Component);

ChainerUIContainer.propTypes = {
  results: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.objectOf(__WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.any).isRequired,
  config: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.shape({
    axes: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.objectOf(__WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.any)
  }).isRequired,
  stats: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.shape({
    axes: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.objectOf(__WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.any),
    argKeys: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.arrayOf(__WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.string)
  }).isRequired,
  loadResults: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.func.isRequired,
  addLineToAxis: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.func.isRequired,
  removeLineFromAxis: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.func.isRequired,
  updateAxisScale: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.func.isRequired
};

var mapEntitiesToStats = function mapEntitiesToStats(entities) {
  var _entities$results = entities.results,
      results = _entities$results === undefined ? {} : _entities$results;

  var argKeySet = {};
  Object.keys(results).forEach(function (resultId) {
    var result = results[resultId];
    result.args.forEach(function (arg) {
      argKeySet[arg.key] = true;
    });
  });
  var argKeys = Object.keys(argKeySet);

  var axes = {
    xAxis: {},
    yLeftAxis: {},
    yRightAxis: {}
  };

  return { axes: axes, argKeys: argKeys };
};

var defaultConfig = {
  axes: {}
};

var mapStateToProps = function mapStateToProps(state) {
  var entities = state.entities,
      _state$config = state.config,
      config = _state$config === undefined ? defaultConfig : _state$config;
  var _entities$results2 = entities.results,
      results = _entities$results2 === undefined ? {} : _entities$results2;

  var stats = mapEntitiesToStats(entities);
  return { results: results, config: config, stats: stats };
};

/* harmony default export */ __webpack_exports__["a"] = (Object(__WEBPACK_IMPORTED_MODULE_2_react_redux__["connect"])(mapStateToProps, {
  loadResults: __WEBPACK_IMPORTED_MODULE_3__actions__["f" /* loadResults */],
  addLineToAxis: __WEBPACK_IMPORTED_MODULE_3__actions__["e" /* addLineToAxis */],
  removeLineFromAxis: __WEBPACK_IMPORTED_MODULE_3__actions__["g" /* removeLineFromAxis */],
  updateAxisScale: __WEBPACK_IMPORTED_MODULE_3__actions__["h" /* updateAxisScale */]
})(ChainerUIContainer));

/***/ }),

/***/ 555:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_prop_types__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_prop_types___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_prop_types__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ResultRow__ = __webpack_require__(556);




var ExperimentsTable = function ExperimentsTable(props) {
  var _props$results = props.results,
      results = _props$results === undefined ? {} : _props$results,
      stats = props.stats;
  var argKeys = stats.argKeys;


  var argHeaderElems = argKeys.map(function (argKey) {
    return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
      'th',
      { key: 'args-' + argKey },
      __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement('span', { className: 'glyphicon glyphicon-cog' }),
      argKey
    );
  });

  var resultRowElems = Object.keys(results).map(function (resultId) {
    var result = results[resultId];
    var key = 'result-row-' + result.id;
    return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_2__ResultRow__["a" /* default */], {
      result: result,
      stats: stats,
      key: key
    });
  });

  return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
    'table',
    { className: 'table table-hover' },
    __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
      'thead',
      null,
      __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
        'tr',
        null,
        __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
          'th',
          null,
          'id'
        ),
        __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
          'th',
          null,
          'path name'
        ),
        __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
          'th',
          null,
          'epoch'
        ),
        __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
          'th',
          null,
          'iteration'
        ),
        __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
          'th',
          null,
          'elapsed_time'
        ),
        argHeaderElems
      )
    ),
    __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
      'tbody',
      null,
      resultRowElems
    )
  );
};

ExperimentsTable.propTypes = {
  results: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.objectOf(__WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.shape({
    id: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.number,
    pathName: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.string,
    args: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.arrayOf(__WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.any),
    logs: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.arrayOf(__WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.any)
  })),
  stats: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.shape({
    argKeys: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.arrayOf(__WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.string)
  })
};
ExperimentsTable.defaultProps = {
  results: {},
  stats: {
    argKeys: []
  }
};

/* harmony default export */ __webpack_exports__["a"] = (ExperimentsTable);

/***/ }),

/***/ 556:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_prop_types__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_prop_types___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_prop_types__);



var emptyStr = '-';

var ResultRow = function ResultRow(props) {
  var result = props.result,
      stats = props.stats;
  var args = result.args,
      logs = result.logs;


  var lastLog = logs[logs.length - 1] || {};
  var lastLogDict = {};
  lastLog.logItems.forEach(function (logItem) {
    lastLogDict[logItem.key] = logItem.value;
  });

  var argDict = {};
  args.forEach(function (arg) {
    argDict[arg.key] = arg.value;
  });
  var argElems = stats.argKeys.map(function (argKey) {
    var content = argKey in argDict ? argDict[argKey] : emptyStr;
    return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
      'td',
      { key: 'args-' + argKey },
      content
    );
  });

  return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
    'tr',
    null,
    __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
      'td',
      null,
      result.id
    ),
    __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
      'td',
      null,
      result.pathName
    ),
    __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
      'td',
      null,
      lastLogDict.epoch
    ),
    __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
      'td',
      null,
      lastLogDict.iteration
    ),
    __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
      'td',
      null,
      lastLogDict.elapsed_time
    ),
    argElems
  );
};

ResultRow.propTypes = {
  result: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.shape({
    id: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.number,
    pathName: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.string,
    args: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.arrayOf(__WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.any),
    logs: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.arrayOf(__WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.any)
  }).isRequired,
  stats: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.shape({
    argKeys: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.arrayOf(__WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.string)
  })
};

ResultRow.defaultProps = {
  stats: {
    argKeys: []
  }
};

/* harmony default export */ __webpack_exports__["a"] = (ResultRow);

/***/ }),

/***/ 557:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_prop_types__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_prop_types___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_prop_types__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_recharts__ = __webpack_require__(283);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_rc_slider__ = __webpack_require__(387);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_rc_slider_assets_index_css__ = __webpack_require__(917);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_rc_slider_assets_index_css___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_rc_slider_assets_index_css__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__utils__ = __webpack_require__(117);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__AxisConfigurator__ = __webpack_require__(918);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__LinesConfigurator__ = __webpack_require__(920);
var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }










var sliderSteps = 100.0;
var defaultStats = {
  axes: {
    xAxis: {},
    yLeftAxis: {},
    yRightAxis: {}
  }
};

var defaultRange = [0, 100];
var defaultXAxisConfig = {
  axisName: 'xAxis',
  xAxisKey: 'epoch',
  scale: 'linear',
  range: defaultRange
};
var defaultYAxisConfig = {
  axisName: '',
  scale: 'linear',
  range: defaultRange,
  lines: []
};
var defaultConfig = {
  axes: {
    xAxis: defaultXAxisConfig,
    yLeftAxis: _extends({}, defaultYAxisConfig, { axisName: 'yLeftAxis' }),
    yRightAxis: _extends({}, defaultYAxisConfig, { axisName: 'yRightAxis' })
  }
};

var buildLineElem = function buildLineElem(line, axisName) {
  var _line$config = line.config,
      config = _line$config === undefined ? {} : _line$config;
  var line2key = __WEBPACK_IMPORTED_MODULE_5__utils__["a" /* default */].line2key,
      line2dataKey = __WEBPACK_IMPORTED_MODULE_5__utils__["a" /* default */].line2dataKey;


  return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_2_recharts__["Line"], {
    type: 'linear',
    name: line2key(line),
    dataKey: line2dataKey(line, axisName),
    yAxisId: axisName,
    stroke: config.color,
    connectNulls: true,
    isAnimationActive: false,
    key: line2dataKey(line, axisName)
  });
};

var buildLineElems = function buildLineElems(axisName, config) {
  var axisConfig = config.axes[axisName] || {};
  var _axisConfig$lines = axisConfig.lines,
      lines = _axisConfig$lines === undefined ? [] : _axisConfig$lines;

  return lines.map(function (line) {
    return buildLineElem(line, axisName);
  });
};

var LogVisualizer = function (_React$Component) {
  _inherits(LogVisualizer, _React$Component);

  function LogVisualizer(props) {
    _classCallCheck(this, LogVisualizer);

    var _this = _possibleConstructorReturn(this, (LogVisualizer.__proto__ || Object.getPrototypeOf(LogVisualizer)).call(this, props));

    _this.state = {};
    return _this;
  }

  _createClass(LogVisualizer, [{
    key: 'render',
    value: function render() {
      var line2dataKey = __WEBPACK_IMPORTED_MODULE_5__utils__["a" /* default */].line2dataKey;
      var _props = this.props,
          _props$results = _props.results,
          results = _props$results === undefined ? {} : _props$results,
          _props$stats = _props.stats,
          stats = _props$stats === undefined ? defaultStats : _props$stats,
          _props$config = _props.config,
          config = _props$config === undefined ? defaultConfig : _props$config,
          onAxisConfigLineAdd = _props.onAxisConfigLineAdd,
          onAxisConfigLineRemove = _props.onAxisConfigLineRemove,
          onAxisConfigScaleUpdate = _props.onAxisConfigScaleUpdate;
      var _config$axes = config.axes,
          _config$axes$xAxis = _config$axes.xAxis,
          xAxis = _config$axes$xAxis === undefined ? { axisName: 'xAxis' } : _config$axes$xAxis,
          _config$axes$yLeftAxi = _config$axes.yLeftAxis,
          yLeftAxis = _config$axes$yLeftAxi === undefined ? { axisName: 'yLeftAxis' } : _config$axes$yLeftAxi,
          _config$axes$yRightAx = _config$axes.yRightAxis,
          yRightAxis = _config$axes$yRightAx === undefined ? { axisName: 'yRightAxis' } : _config$axes$yRightAx;
      var _xAxis$xAxisKey = xAxis.xAxisKey,
          xAxisKey = _xAxis$xAxisKey === undefined ? 'epoch' : _xAxis$xAxisKey;

      var leftLines = yLeftAxis.lines || [];
      var rightLines = yRightAxis.lines || [];
      var axisLines = {
        yLeftAxis: leftLines,
        yRightAxis: rightLines
      };
      var xRange = xAxis.range || defaultRange;
      var yLeftRange = yLeftAxis.range || defaultRange;
      var yRightRange = yRightAxis.range || defaultRange;
      var xValueRange = stats.axes.xAxis.valueRange || defaultRange;
      var yLeftValueRange = stats.axes.yLeftAxis.valueRange || defaultRange;
      var yRightValueRange = stats.axes.yRightAxis.valueRange || defaultRange;

      var chartWidth = 640;
      var chartHeight = 360;

      var dataDict = {}; // ex. 1: { epoch: 1, 12_main_loss: 0.011, ... }
      Object.keys(axisLines).forEach(function (axisName) {
        var lines = axisLines[axisName];
        lines.forEach(function (line) {
          var resultId = line.resultId,
              logKey = line.logKey;

          var result = results[resultId];
          if (result == null) {
            return;
          }
          var logs = result.logs || [];
          logs.forEach(function (log) {
            var logDict = {};
            log.logItems.forEach(function (logItem) {
              logDict[logItem.key] = logItem.value;
            });
            if (logDict[xAxisKey] == null || logDict[logKey] == null) {
              return;
            }
            if (dataDict[logDict[xAxisKey]] == null) {
              dataDict[logDict[xAxisKey]] = _defineProperty({}, xAxisKey, logDict[xAxisKey]);
            }
            dataDict[logDict[xAxisKey]][line2dataKey(line, axisName)] = logDict[logKey];
          });
        });
      });
      var data = Object.keys(dataDict).map(function (key) {
        return dataDict[key];
      });

      var lineElems = [].concat(_toConsumableArray(buildLineElems('yLeftAxis', config)), _toConsumableArray(buildLineElems('yRightAxis', config)));

      return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
        'div',
        { className: 'log-visualizer-root row' },
        __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
          'div',
          { className: 'col-sm-8' },
          __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
            'table',
            null,
            __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
              'tbody',
              null,
              __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                'tr',
                null,
                __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                  'td',
                  null,
                  __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_3_rc_slider__["Range"], {
                    style: { height: chartHeight + 'px' },
                    vertical: true,
                    min: yLeftValueRange[0],
                    max: yLeftValueRange[1],
                    step: (yLeftRange[1] - yLeftRange[0]) / sliderSteps,
                    value: yLeftRange
                  })
                ),
                __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                  'td',
                  null,
                  __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                    __WEBPACK_IMPORTED_MODULE_2_recharts__["LineChart"],
                    {
                      width: chartWidth,
                      height: chartHeight,
                      data: data,
                      margin: { top: 5, right: 30, left: 20, bottom: 5 }
                    },
                    __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_2_recharts__["XAxis"], {
                      type: 'number',
                      dataKey: xAxisKey,
                      scale: xAxis.scale,
                      domain: ['auto', 'auto'],
                      allowDataOverflow: true
                    }),
                    __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_2_recharts__["YAxis"], {
                      yAxisId: 'yLeftAxis',
                      orientation: 'left',
                      scale: yLeftAxis.scale,
                      domain: ['auto', 'auto'],
                      allowDataOverflow: true
                    }),
                    __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_2_recharts__["YAxis"], {
                      yAxisId: 'yRightAxis',
                      orientation: 'right',
                      scale: yRightAxis.scale,
                      domain: ['auto', 'auto'],
                      allowDataOverflow: true
                    }),
                    __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_2_recharts__["CartesianGrid"], { strokeDasharray: '3 3' }),
                    __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_2_recharts__["Tooltip"], null),
                    __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_2_recharts__["Legend"], null),
                    lineElems
                  )
                ),
                __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                  'td',
                  null,
                  __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_3_rc_slider__["Range"], {
                    style: { height: chartHeight + 'px' },
                    vertical: true,
                    min: yRightValueRange[0],
                    max: yRightValueRange[1],
                    step: (yRightRange[1] - yRightRange[0]) / sliderSteps,
                    value: yRightRange
                  })
                )
              ),
              __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                'tr',
                null,
                __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement('td', null),
                __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                  'td',
                  null,
                  __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_3_rc_slider__["Range"], {
                    style: { width: chartWidth + 'px', margin: 'auto' },
                    min: xValueRange.min,
                    max: xValueRange.max,
                    value: xRange,
                    onChange: this.handleChangeXRange
                  })
                ),
                __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement('td', null)
              )
            )
          )
        ),
        __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
          'div',
          { className: 'col-sm-4' },
          __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
            __WEBPACK_IMPORTED_MODULE_6__AxisConfigurator__["a" /* default */],
            {
              axisConfig: yLeftAxis,
              onChangeScale: onAxisConfigScaleUpdate
            },
            __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_7__LinesConfigurator__["a" /* default */], {
              results: results,
              axisName: 'yLeftAxis',
              lines: yLeftAxis.lines,
              onAxisConfigLineAdd: onAxisConfigLineAdd,
              onAxisConfigLineRemove: onAxisConfigLineRemove
            })
          ),
          __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
            __WEBPACK_IMPORTED_MODULE_6__AxisConfigurator__["a" /* default */],
            {
              axisConfig: yRightAxis,
              onChangeScale: onAxisConfigScaleUpdate
            },
            __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_7__LinesConfigurator__["a" /* default */], {
              results: results,
              axisName: 'yRightAxis',
              lines: yRightAxis.lines,
              onAxisConfigLineAdd: onAxisConfigLineAdd,
              onAxisConfigLineRemove: onAxisConfigLineRemove
            })
          ),
          __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_6__AxisConfigurator__["a" /* default */], {
            axisConfig: xAxis,
            onChangeScale: onAxisConfigScaleUpdate
          })
        )
      );
    }
  }]);

  return LogVisualizer;
}(__WEBPACK_IMPORTED_MODULE_0_react___default.a.Component);

LogVisualizer.propTypes = {
  results: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.objectOf(__WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.any).isRequired,
  stats: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.shape({
    axes: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.shape({
      xAxis: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.shape({ valueRange: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.arrayOf(__WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.number) }),
      yLeftAxis: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.shape({ valueRange: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.arrayOf(__WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.number) }),
      yRightAxis: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.shape({ valueRange: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.arrayOf(__WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.number) })
    })
  }),
  config: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.shape({
    axes: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.shape({
      xAxis: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.any,
      yLeftAxis: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.any,
      yRightAxis: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.any
    })
  }),
  onAxisConfigLineAdd: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.func.isRequired,
  onAxisConfigLineRemove: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.func.isRequired,
  onAxisConfigScaleUpdate: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.func.isRequired
};
LogVisualizer.defaultProps = {
  stats: defaultStats,
  config: defaultConfig
};

/* harmony default export */ __webpack_exports__["a"] = (LogVisualizer);

/***/ }),

/***/ 917:
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),

/***/ 918:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_prop_types__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_prop_types___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_prop_types__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__AxisScaleSelector__ = __webpack_require__(919);
var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }





var defaultAxisConfig = {
  axisName: '',
  scale: 'auto',
  range: [0, 100]
};

var AxisConfigurator = function (_React$Component) {
  _inherits(AxisConfigurator, _React$Component);

  function AxisConfigurator(props) {
    _classCallCheck(this, AxisConfigurator);

    var _this = _possibleConstructorReturn(this, (AxisConfigurator.__proto__ || Object.getPrototypeOf(AxisConfigurator)).call(this, props));

    _this.handleChangeScale = _this.handleChangeScale.bind(_this);
    return _this;
  }

  _createClass(AxisConfigurator, [{
    key: 'handleChangeScale',
    value: function handleChangeScale(scale) {
      var axisName = this.props.axisConfig.axisName;

      this.props.onChangeScale(axisName, scale);
    }
  }, {
    key: 'render',
    value: function render() {
      var _props$axisConfig = this.props.axisConfig,
          axisName = _props$axisConfig.axisName,
          scale = _props$axisConfig.scale;


      return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
        'div',
        { className: 'axis-configurator card' },
        __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
          'div',
          { className: 'card-header' },
          axisName
        ),
        __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
          'div',
          { className: 'card-body' },
          __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
            'div',
            { className: 'row' },
            __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
              'div',
              { className: 'col-sm-6' },
              __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_2__AxisScaleSelector__["a" /* default */], {
                scale: scale,
                onChange: this.handleChangeScale
              })
            )
          )
        ),
        this.props.children
      );
    }
  }]);

  return AxisConfigurator;
}(__WEBPACK_IMPORTED_MODULE_0_react___default.a.Component);

AxisConfigurator.propTypes = {
  axisConfig: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.shape({
    axisName: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.string.isRequired,
    scale: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.string,
    range: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.arrayOf(__WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.number)
  }),
  children: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.element,
  onChangeScale: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.func
};
AxisConfigurator.defaultProps = {
  axisConfig: defaultAxisConfig,
  children: null,
  onChangeScale: function onChangeScale() {}
};

/* harmony default export */ __webpack_exports__["a"] = (AxisConfigurator);

/***/ }),

/***/ 919:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_prop_types__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_prop_types___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_prop_types__);



var scaleOptions = ['linear', 'log'];

var AxisScaleSelector = function AxisScaleSelector(props) {
  var scale = props.scale,
      onChange = props.onChange;

  var handleChangeAxisKey = function handleChangeAxisKey(e) {
    onChange(e.target.value);
  };

  var options = scaleOptions.map(function (scaleKey) {
    return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
      'option',
      { value: scaleKey, key: scaleKey },
      scaleKey
    );
  });
  return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
    'select',
    { id: 'axis-scale-selector-select', className: 'form-control', value: scale, onChange: handleChangeAxisKey },
    options
  );
};

AxisScaleSelector.propTypes = {
  scale: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.string,
  onChange: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.func
};

AxisScaleSelector.defaultProps = {
  scale: '',
  onChange: function onChange() {}
};

/* harmony default export */ __webpack_exports__["a"] = (AxisScaleSelector);

/***/ }),

/***/ 920:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_prop_types__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_prop_types___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_prop_types__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_reactstrap__ = __webpack_require__(230);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__utils__ = __webpack_require__(117);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__LinesConfiguratorRow__ = __webpack_require__(925);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__LineConfigurator__ = __webpack_require__(926);
var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }








var defaultLine = {
  config: {
    color: '#ABCDEF'
  }
};

var LinesConfigurator = function (_React$Component) {
  _inherits(LinesConfigurator, _React$Component);

  function LinesConfigurator() {
    _classCallCheck(this, LinesConfigurator);

    var _this = _possibleConstructorReturn(this, (LinesConfigurator.__proto__ || Object.getPrototypeOf(LinesConfigurator)).call(this));

    _this.handleModalToggle = _this.handleModalToggle.bind(_this);
    _this.handleAddingLineChange = _this.handleAddingLineChange.bind(_this);
    _this.handleAxisConfigLineAdd = _this.handleAxisConfigLineAdd.bind(_this);
    _this.handleAxisConfigLineRemove = _this.handleAxisConfigLineRemove.bind(_this);

    _this.state = {
      showModal: false,
      addingLine: defaultLine
    };
    return _this;
  }

  _createClass(LinesConfigurator, [{
    key: 'handleModalToggle',
    value: function handleModalToggle() {
      var newAddingLine = this.state.showModal ? defaultLine : this.state.addingLine;
      this.setState({
        showModal: !this.state.showModal,
        addingLine: newAddingLine,
        showLineConfigError: false
      });
    }
  }, {
    key: 'handleAddingLineChange',
    value: function handleAddingLineChange(newLine) {
      this.setState({
        addingLine: newLine,
        showLineConfigError: false
      });
    }
  }, {
    key: 'handleAxisConfigLineAdd',
    value: function handleAxisConfigLineAdd() {
      var _props = this.props,
          axisName = _props.axisName,
          onAxisConfigLineAdd = _props.onAxisConfigLineAdd,
          lines = _props.lines;
      var addingLine = this.state.addingLine;


      var hasSameLine = lines.some(function (l) {
        return l.resultId === addingLine.resultId && l.logKey === addingLine.logKey;
      });

      if (addingLine.resultId == null || addingLine.logKey == null || hasSameLine) {
        // invalid or hasSameLine
        this.setState({
          showLineConfigError: true
        });
      } else {
        onAxisConfigLineAdd(axisName, addingLine);
        this.handleModalToggle();
      }
    }
  }, {
    key: 'handleAxisConfigLineRemove',
    value: function handleAxisConfigLineRemove(lineKey) {
      var _props2 = this.props,
          axisName = _props2.axisName,
          onAxisConfigLineRemove = _props2.onAxisConfigLineRemove;

      onAxisConfigLineRemove(axisName, lineKey);
    }
  }, {
    key: 'render',
    value: function render() {
      var _this2 = this;

      var line2key = __WEBPACK_IMPORTED_MODULE_3__utils__["a" /* default */].line2key;
      var _props3 = this.props,
          results = _props3.results,
          _props3$lines = _props3.lines,
          lines = _props3$lines === undefined ? [] : _props3$lines;
      var _state = this.state,
          addingLine = _state.addingLine,
          showLineConfigError = _state.showLineConfigError;


      var lineConfiguratorElems = lines.map(function (line) {
        var result = results[line.resultId] || {};

        return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_4__LinesConfiguratorRow__["a" /* default */], {
          line: line,
          result: result,
          onRemove: _this2.handleAxisConfigLineRemove,
          key: line2key(line)
        });
      });

      return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
        'ul',
        { className: 'list-group list-group-flush' },
        lineConfiguratorElems,
        __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
          'li',
          { className: 'list-group-item text-right' },
          __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
            __WEBPACK_IMPORTED_MODULE_2_reactstrap__["Button"],
            { color: 'primary', onClick: this.handleModalToggle },
            'Add'
          ),
          __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
            __WEBPACK_IMPORTED_MODULE_2_reactstrap__["Modal"],
            { isOpen: this.state.showModal, toggle: this.handleModalToggle, className: '' },
            __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
              __WEBPACK_IMPORTED_MODULE_2_reactstrap__["ModalHeader"],
              { toggle: this.handleModalToggle },
              'Modal title'
            ),
            __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
              __WEBPACK_IMPORTED_MODULE_2_reactstrap__["ModalBody"],
              null,
              __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_5__LineConfigurator__["a" /* default */], {
                results: results,
                line: addingLine,
                showError: showLineConfigError,
                onChange: this.handleAddingLineChange
              })
            ),
            __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
              __WEBPACK_IMPORTED_MODULE_2_reactstrap__["ModalFooter"],
              null,
              __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                __WEBPACK_IMPORTED_MODULE_2_reactstrap__["Button"],
                { color: 'secondary', onClick: this.handleModalToggle },
                'Cancel'
              ),
              ' ',
              __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                __WEBPACK_IMPORTED_MODULE_2_reactstrap__["Button"],
                { color: 'primary', onClick: this.handleAxisConfigLineAdd },
                'Add'
              )
            )
          )
        )
      );
    }
  }]);

  return LinesConfigurator;
}(__WEBPACK_IMPORTED_MODULE_0_react___default.a.Component);

LinesConfigurator.propTypes = {
  results: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.objectOf(__WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.any).isRequired,
  axisName: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.string.isRequired,
  lines: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.arrayOf(__WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.shape({
    resultId: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.number,
    logKey: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.string
  })),
  onAxisConfigLineAdd: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.func.isRequired,
  onAxisConfigLineRemove: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.func.isRequired
};

LinesConfigurator.defaultProps = {
  lines: []
};

/* harmony default export */ __webpack_exports__["a"] = (LinesConfigurator);

/***/ }),

/***/ 925:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_prop_types__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_prop_types___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_prop_types__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__utils__ = __webpack_require__(117);
var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }





var LinesConfiguratorRow = function (_React$Component) {
  _inherits(LinesConfiguratorRow, _React$Component);

  function LinesConfiguratorRow(props) {
    _classCallCheck(this, LinesConfiguratorRow);

    var _this = _possibleConstructorReturn(this, (LinesConfiguratorRow.__proto__ || Object.getPrototypeOf(LinesConfiguratorRow)).call(this, props));

    _this.handleRemoveClick = _this.handleRemoveClick.bind(_this);
    return _this;
  }

  _createClass(LinesConfiguratorRow, [{
    key: 'handleRemoveClick',
    value: function handleRemoveClick() {
      var line2key = __WEBPACK_IMPORTED_MODULE_2__utils__["a" /* default */].line2key;
      var _props = this.props,
          line = _props.line,
          onRemove = _props.onRemove;


      onRemove(line2key(line));
    }
  }, {
    key: 'render',
    value: function render() {
      var line2key = __WEBPACK_IMPORTED_MODULE_2__utils__["a" /* default */].line2key,
          truncateForward = __WEBPACK_IMPORTED_MODULE_2__utils__["a" /* default */].truncateForward;
      var _props2 = this.props,
          line = _props2.line,
          result = _props2.result;
      var _line$config = line.config,
          config = _line$config === undefined ? {} : _line$config;


      var colorBlockStyle = {
        width: '20px',
        height: '15px',
        backgroundColor: config.color
      };

      return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
        'li',
        { className: 'list-group-item', key: line2key(line) },
        __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
          'div',
          { className: 'row' },
          __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement('div', { className: 'col-sm-1', style: colorBlockStyle }),
          __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
            'div',
            { className: 'col-sm-5' },
            truncateForward(result.pathName, 24)
          ),
          __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
            'div',
            { className: 'col-sm-4' },
            line.logKey
          ),
          __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
            'div',
            { className: 'col-sm-1' },
            __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
              'button',
              {
                type: 'button',
                className: 'close',
                'aria-label': 'Close',
                onClick: this.handleRemoveClick
              },
              __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                'span',
                { 'aria-hidden': 'true' },
                '\xD7'
              )
            )
          )
        )
      );
    }
  }]);

  return LinesConfiguratorRow;
}(__WEBPACK_IMPORTED_MODULE_0_react___default.a.Component);

LinesConfiguratorRow.propTypes = {
  line: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.shape({
    resultId: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.number,
    logKey: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.string
  }).isRequired,
  result: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.shape({
    id: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.number,
    pathName: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.string,
    args: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.arrayOf(__WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.any),
    logs: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.arrayOf(__WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.any)
  }).isRequired,
  onRemove: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.func
};

LinesConfiguratorRow.defaultProps = {
  onRemove: function onRemove() {}
};

/* harmony default export */ __webpack_exports__["a"] = (LinesConfiguratorRow);

/***/ }),

/***/ 926:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_prop_types__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_prop_types___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_prop_types__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_reactstrap__ = __webpack_require__(230);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_react_color__ = __webpack_require__(410);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_react_color___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_react_color__);
var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }






var RESULT_NONE = -1;
var LOG_KEY_NONE = '';

var getLogKeys = function getLogKeys() {
  var result = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  var _result$logs = result.logs,
      logs = _result$logs === undefined ? [] : _result$logs;

  var logKeySet = {};
  logs.forEach(function (log) {
    var _log$logItems = log.logItems,
        logItems = _log$logItems === undefined ? [] : _log$logItems;

    logItems.forEach(function (logItem) {
      logKeySet[logItem.key] = true;
    });
  });
  return Object.keys(logKeySet);
};

var createResultOptionElems = function createResultOptionElems() {
  var results = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
  return [__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
    'option',
    { value: RESULT_NONE, key: RESULT_NONE, disabled: true },
    '-- select result --'
  )].concat(_toConsumableArray(Object.keys(results).map(function (resultId) {
    var result = results[resultId];
    return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
      'option',
      { value: result.id, key: result.id },
      result.id,
      ': ',
      result.pathName
    );
  })));
};

var createLogKeyOptionElems = function createLogKeyOptionElems() {
  var result = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

  var logKeys = getLogKeys(result);
  return [__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
    'option',
    { value: LOG_KEY_NONE, key: LOG_KEY_NONE, disabled: true },
    '-- select log key --'
  )].concat(_toConsumableArray(logKeys.map(function (logKey) {
    return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
      'option',
      { value: logKey, key: logKey },
      logKey
    );
  })));
};

var LineConfigurator = function (_React$Component) {
  _inherits(LineConfigurator, _React$Component);

  function LineConfigurator() {
    _classCallCheck(this, LineConfigurator);

    var _this = _possibleConstructorReturn(this, (LineConfigurator.__proto__ || Object.getPrototypeOf(LineConfigurator)).call(this));

    _this.handleResultChange = _this.handleResultChange.bind(_this);
    _this.handleLogKeyChange = _this.handleLogKeyChange.bind(_this);
    _this.handleLineColorChange = _this.handleLineColorChange.bind(_this);

    _this.state = {
      showError: false
    };
    return _this;
  }

  _createClass(LineConfigurator, [{
    key: 'handleResultChange',
    value: function handleResultChange(e) {
      var _props = this.props,
          line = _props.line,
          onChange = _props.onChange;

      var newResultId = parseInt(e.target.value, 10);
      onChange(_extends({}, line, { resultId: newResultId }));
    }
  }, {
    key: 'handleLogKeyChange',
    value: function handleLogKeyChange(e) {
      var _props2 = this.props,
          line = _props2.line,
          onChange = _props2.onChange;

      var newLogKey = e.target.value;
      onChange(_extends({}, line, { logKey: newLogKey }));
    }
  }, {
    key: 'handleLineColorChange',
    value: function handleLineColorChange(e) {
      var _props3 = this.props,
          line = _props3.line,
          onChange = _props3.onChange;
      var hex = e.hex;

      onChange(_extends({}, line, { config: { color: hex } }));
    }
  }, {
    key: 'render',
    value: function render() {
      var _props4 = this.props,
          results = _props4.results,
          _props4$line = _props4.line,
          line = _props4$line === undefined ? {} : _props4$line,
          _props4$showError = _props4.showError,
          showError = _props4$showError === undefined ? false : _props4$showError;
      var _line$resultId = line.resultId,
          resultId = _line$resultId === undefined ? RESULT_NONE : _line$resultId,
          _line$logKey = line.logKey,
          logKey = _line$logKey === undefined ? LOG_KEY_NONE : _line$logKey,
          _line$config = line.config,
          config = _line$config === undefined ? {} : _line$config;

      var result = results[resultId] || {};
      var color = config.color;

      var colorBlockStyle = {
        backgroundColor: color
      };

      var resultOptionElems = createResultOptionElems(results);
      var logKeyOptionElems = createLogKeyOptionElems(result);

      return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
        'div',
        { className: 'line-configurator' },
        __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
          __WEBPACK_IMPORTED_MODULE_2_reactstrap__["Form"],
          null,
          __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
            __WEBPACK_IMPORTED_MODULE_2_reactstrap__["FormGroup"],
            null,
            __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
              __WEBPACK_IMPORTED_MODULE_2_reactstrap__["Label"],
              null,
              'color'
            ),
            __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
              'div',
              { style: colorBlockStyle },
              color
            ),
            __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_3_react_color__["ChromePicker"], {
              color: color,
              disableAlpha: true,
              onChange: this.handleLineColorChange
            })
          ),
          __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
            __WEBPACK_IMPORTED_MODULE_2_reactstrap__["FormGroup"],
            null,
            __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
              __WEBPACK_IMPORTED_MODULE_2_reactstrap__["Label"],
              { 'for': 'line-configurator-result-select' },
              'result'
            ),
            __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement('br', null),
            __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
              'select',
              {
                className: 'form-control',
                type: 'select',
                name: 'select',
                id: 'line-configurator-result-select',
                value: resultId,
                onChange: this.handleResultChange
              },
              resultOptionElems
            ),
            __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
              __WEBPACK_IMPORTED_MODULE_2_reactstrap__["FormText"],
              { className: 'text-danger', hidden: !showError || resultId !== RESULT_NONE },
              'Select a result!!'
            )
          ),
          __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
            __WEBPACK_IMPORTED_MODULE_2_reactstrap__["FormGroup"],
            null,
            __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
              __WEBPACK_IMPORTED_MODULE_2_reactstrap__["Label"],
              { 'for': 'line-configurator-log-key-select' },
              'log key'
            ),
            __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement('br', null),
            __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
              'select',
              {
                className: 'form-control',
                type: 'select',
                name: 'select',
                id: 'line-configurator-log-key-select',
                value: logKey,
                disabled: resultId === RESULT_NONE,
                onChange: this.handleLogKeyChange
              },
              logKeyOptionElems
            ),
            __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
              __WEBPACK_IMPORTED_MODULE_2_reactstrap__["FormText"],
              { className: 'text-danger', hidden: !showError || logKey !== LOG_KEY_NONE },
              'Select a log key!!'
            ),
            __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
              __WEBPACK_IMPORTED_MODULE_2_reactstrap__["FormText"],
              { className: 'text-danger', hidden: !showError || logKey === LOG_KEY_NONE && resultId === RESULT_NONE },
              'Cannot add this line because it already exists.'
            )
          )
        )
      );
    }
  }]);

  return LineConfigurator;
}(__WEBPACK_IMPORTED_MODULE_0_react___default.a.Component);

LineConfigurator.propTypes = {
  results: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.objectOf(__WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.any).isRequired,
  line: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.shape({
    resultId: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.number,
    logKey: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.string,
    config: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.shape({
      color: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.string
    })
  }),
  showError: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.bool,
  onChange: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.func
};

LineConfigurator.defaultProps = {
  line: {},
  showError: false,
  onChange: function onChange() {}
};

/* harmony default export */ __webpack_exports__["a"] = (LineConfigurator);

/***/ })

},[423]);