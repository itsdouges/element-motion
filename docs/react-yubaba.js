(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("react"), require("yubaba-core"));
	else if(typeof define === 'function' && define.amd)
		define(["react", "yubaba"], factory);
	else if(typeof exports === 'object')
		exports["reactYubaba"] = factory(require("react"), require("yubaba-core"));
	else
		root["reactYubaba"] = factory(root["React"], root["yubaba"]);
})(this, function(__WEBPACK_EXTERNAL_MODULE_2__, __WEBPACK_EXTERNAL_MODULE_3__) {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.withAnimation = exports.AnimateContainer = undefined;

	var _AnimateContainer = __webpack_require__(1);

	Object.defineProperty(exports, 'AnimateContainer', {
	  enumerable: true,
	  get: function get() {
	    return _interopRequireDefault(_AnimateContainer).default;
	  }
	});

	var _withAnimation = __webpack_require__(4);

	Object.defineProperty(exports, 'withAnimation', {
	  enumerable: true,
	  get: function get() {
	    return _interopRequireDefault(_withAnimation).default;
	  }
	});

	var _Animate = __webpack_require__(5);

	var _Animate2 = _interopRequireDefault(_Animate);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	exports.default = _Animate2.default;

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _react = __webpack_require__(2);

	var _react2 = _interopRequireDefault(_react);

	var _yubabaCore = __webpack_require__(3);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var AnimateContainer = function (_React$Component) {
	  _inherits(AnimateContainer, _React$Component);

	  function AnimateContainer() {
	    var _ref;

	    var _temp, _this, _ret;

	    _classCallCheck(this, AnimateContainer);

	    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
	      args[_key] = arguments[_key];
	    }

	    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = AnimateContainer.__proto__ || Object.getPrototypeOf(AnimateContainer)).call.apply(_ref, [this].concat(args))), _this), _this.state = {
	      visible: false
	    }, _this.setVisibility = function (visible) {
	      _this.setState({
	        visible: visible
	      });
	    }, _temp), _possibleConstructorReturn(_this, _ret);
	  }

	  _createClass(AnimateContainer, [{
	    key: 'componentWillMount',
	    value: function componentWillMount() {
	      if (document) {
	        this._detatch = (0, _yubabaCore.addListener)(this.props.pair, this.setVisibility);
	      }
	    }
	  }, {
	    key: 'componentWillUnmount',
	    value: function componentWillUnmount() {
	      this._detatch();
	    }
	  }, {
	    key: 'render',
	    value: function render() {
	      var _props = this.props,
	          pair = _props.pair,
	          style = _props.style,
	          props = _objectWithoutProperties(_props, ['pair', 'style']);

	      return _react2.default.createElement(
	        'div',
	        _extends({}, props, { style: _extends({}, style, { opacity: this.state.visible ? 1 : 0 }) }),
	        this.props.children
	      );
	    }
	  }]);

	  return AnimateContainer;
	}(_react2.default.Component);

		exports.default = AnimateContainer;

/***/ }),
/* 2 */
/***/ (function(module, exports) {

	module.exports = __WEBPACK_EXTERNAL_MODULE_2__;

/***/ }),
/* 3 */
/***/ (function(module, exports) {

	module.exports = __WEBPACK_EXTERNAL_MODULE_3__;

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _react = __webpack_require__(2);

	var _react2 = _interopRequireDefault(_react);

	var _Animate = __webpack_require__(5);

	var _Animate2 = _interopRequireDefault(_Animate);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

	var withTransition = function withTransition(animations) {
	  return function (WrappedComponent) {
	    return function (_ref) {
	      var animationPair = _ref.animationPair,
	          props = _objectWithoutProperties(_ref, ['animationPair']);

	      return _react2.default.createElement(
	        _Animate2.default,
	        { pair: animationPair, animations: animations },
	        _react2.default.createElement(WrappedComponent, props)
	      );
	    };
	  };
	};

		exports.default = withTransition;

/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _react = __webpack_require__(2);

	var _react2 = _interopRequireDefault(_react);

	var _yubabaCore = __webpack_require__(3);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var Animate = function (_React$Component) {
	  _inherits(Animate, _React$Component);

	  function Animate() {
	    var _ref;

	    var _temp, _this, _ret;

	    _classCallCheck(this, Animate);

	    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
	      args[_key] = arguments[_key];
	    }

	    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = Animate.__proto__ || Object.getPrototypeOf(Animate)).call.apply(_ref, [this].concat(args))), _this), _this.state = {
	      visible: false
	    }, _this.setVisibility = function (visible) {
	      _this.setState({
	        visible: visible
	      });
	    }, _temp), _possibleConstructorReturn(_this, _ret);
	  }

	  _createClass(Animate, [{
	    key: 'componentDidMount',
	    value: function componentDidMount() {
	      this._detatch = (0, _yubabaCore.addListener)(this.props.pair, this.setVisibility);
	      this.initialise();
	    }
	  }, {
	    key: 'componentWillUnmount',
	    value: function componentWillUnmount() {
	      this._detatch();
	      this.initialise();

	      if (this._node.firstElementChild) {
	        (0, _yubabaCore.removeFromStore)(this.props.pair, this._node.firstElementChild, true);
	      }
	    }
	  }, {
	    key: 'initialise',
	    value: function initialise() {
	      if (!this._node.firstElementChild) {
	        return;
	      }

	      (0, _yubabaCore.orchestrator)(this.props.pair, {
	        node: this._node.firstElementChild,
	        animations: this.props.animations,
	        shouldShow: this.setVisibility
	      });
	    }
	  }, {
	    key: 'render',
	    value: function render() {
	      var _this2 = this;

	      var _props = this.props,
	          pair = _props.pair,
	          animations = _props.animations,
	          style = _props.style,
	          props = _objectWithoutProperties(_props, ['pair', 'animations', 'style']);

	      return _react2.default.createElement(
	        'div',
	        _extends({}, props, {
	          ref: function ref(node) {
	            return _this2._node = node;
	          },
	          style: _extends({}, style, { opacity: this.state.visible ? 1 : 0 })
	        }),
	        this.props.children
	      );
	    }
	  }]);

	  return Animate;
	}(_react2.default.Component);

		exports.default = Animate;

/***/ })
/******/ ])
});
;
//# sourceMappingURL=react-yubaba.js.map