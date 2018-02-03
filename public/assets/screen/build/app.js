/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
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
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	
	var Vue = __webpack_require__(1),
	    Vuex = __webpack_require__(5);
	Vue.use(Vuex);
	Vue.config.debug = ("dev") == 'dev';
	var createPersistedState = __webpack_require__(6),
	    config = __webpack_require__(10),
	    axios = __webpack_require__(11);
	
	// Component
	var formApp = __webpack_require__(36),
	    formUserarea = __webpack_require__(146);
	
	// Store
	var formStore = __webpack_require__(151),
	    Cookies = __webpack_require__(153);
	
	var app = new Vue({
	    el: "#app",
	    store: formStore,
	    data: {
	        config: config,
	        formData: {}
	    },
	    components: {
	        'form-app': formApp,
	        'form-userarea': formUserarea
	    },
	    methods: {
	        initSessionStorage: function initSessionStorage(formId) {
	            // Init sessionStorage save plugin
	            var formLocalStorage = createPersistedState({
	                key: 'appercode-form-data-' + formId,
	                paths: ['form', 'totalParts', 'totalSections', 'current'],
	                storage: window.sessionStorage
	            });
	            formLocalStorage(formStore);
	
	            var userLocalStorage = createPersistedState({
	                key: 'appercode-form-user',
	                paths: ['user', 'userProfile'],
	                storage: window.sessionStorage
	            });
	            userLocalStorage(formStore);
	        },
	        getCookieSession: function getCookieSession() {
	            var userInfo = void 0;
	            try {
	                userInfo = JSON.parse(decodeURIComponent(Cookies.get('userInfo')));
	                if (userInfo) {
	                    userInfo = {
	                        userId: userInfo.id,
	                        sessionId: userInfo.token,
	                        refreshToken: userInfo.refreshToken,
	                        isAnonymous: false
	                    };
	                }
	            } catch (e) {
	                console.log(e);
	            }
	
	            console.log(userInfo);
	
	            return userInfo;
	        },
	        auth: function auth() {
	            var _this2 = this;
	
	            return new Promise(function (resolve, reject) {
	                var cookieUser = _this2.getCookieSession();
	                var _this = _this2;
	
	                function anonimousLogin() {
	                    _this.$store.dispatch('loginAnonymous').then(function () {
	                        resolve();
	                    }).catch(function (e) {
	                        reject(e);
	                    });
	                }
	
	                if (cookieUser) {
	                    _this2.$store.commit('setUser', cookieUser);
	                    resolve();
	                } else {
	                    anonimousLogin();
	                }
	            });
	        },
	        init: function init() {
	            var _this3 = this;
	
	            var formId = this.$el.dataset.formId;
	
	            this.initSessionStorage(formId);
	
	            this.auth().then(function () {
	                if (!_this3.$store.state.user.isAnonymous) {
	                    return _this3.$store.dispatch('fetchUserProfile');
	                }
	            }).then(function () {
	                if (!_this3.$store.state.user.isAnonymous) {
	                    return _this3.$store.dispatch('fetchRegions');
	                }
	            }).then(function () {
	                return _this3.$store.dispatch('fetchForm', formId);
	            }).then(function (res) {
	                console.log('Parsing form data...');
	                _this3.formData = res.data;
	                _this3.$store.dispatch('parseFormData', res.data);
	            }).catch(function (e) {
	                if (e.response && e.response.status === 401) {
	                    _this3.$store.dispatch('loginByToken').then(function () {
	                        _this3.$store.dispatch('fetchForm', formId).then(function (res) {
	                            _this3.formData = res.data;
	                            _this3.$store.dispatch('parseFormData', res.data);
	                        });
	                    });
	                }
	            });
	        }
	    },
	    mounted: function mounted() {
	        this.init();
	    }
	});

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_RESULT__;/* WEBPACK VAR INJECTION */(function(global, setImmediate) {'use strict';
	
	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };
	
	/*!
	 * Vue.js v2.5.2
	 * (c) 2014-2017 Evan You
	 * Released under the MIT License.
	 */
	(function (global, factory) {
	  ( false ? 'undefined' : _typeof(exports)) === 'object' && typeof module !== 'undefined' ? module.exports = factory() :  true ? !(__WEBPACK_AMD_DEFINE_FACTORY__ = (factory), __WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ? (__WEBPACK_AMD_DEFINE_FACTORY__.call(exports, __webpack_require__, exports, module)) : __WEBPACK_AMD_DEFINE_FACTORY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__)) : global.Vue = factory();
	})(undefined, function () {
	  'use strict';
	
	  /*  */
	
	  // these helpers produces better vm code in JS engines due to their
	  // explicitness and function inlining
	
	  function isUndef(v) {
	    return v === undefined || v === null;
	  }
	
	  function isDef(v) {
	    return v !== undefined && v !== null;
	  }
	
	  function isTrue(v) {
	    return v === true;
	  }
	
	  function isFalse(v) {
	    return v === false;
	  }
	
	  /**
	   * Check if value is primitive
	   */
	  function isPrimitive(value) {
	    return typeof value === 'string' || typeof value === 'number' || typeof value === 'boolean';
	  }
	
	  /**
	   * Quick object check - this is primarily used to tell
	   * Objects from primitive values when we know the value
	   * is a JSON-compliant type.
	   */
	  function isObject(obj) {
	    return obj !== null && (typeof obj === 'undefined' ? 'undefined' : _typeof(obj)) === 'object';
	  }
	
	  /**
	   * Get the raw type string of a value e.g. [object Object]
	   */
	  var _toString = Object.prototype.toString;
	
	  function toRawType(value) {
	    return _toString.call(value).slice(8, -1);
	  }
	
	  /**
	   * Strict object type check. Only returns true
	   * for plain JavaScript objects.
	   */
	  function isPlainObject(obj) {
	    return _toString.call(obj) === '[object Object]';
	  }
	
	  function isRegExp(v) {
	    return _toString.call(v) === '[object RegExp]';
	  }
	
	  /**
	   * Check if val is a valid array index.
	   */
	  function isValidArrayIndex(val) {
	    var n = parseFloat(String(val));
	    return n >= 0 && Math.floor(n) === n && isFinite(val);
	  }
	
	  /**
	   * Convert a value to a string that is actually rendered.
	   */
	  function toString(val) {
	    return val == null ? '' : (typeof val === 'undefined' ? 'undefined' : _typeof(val)) === 'object' ? JSON.stringify(val, null, 2) : String(val);
	  }
	
	  /**
	   * Convert a input value to a number for persistence.
	   * If the conversion fails, return original string.
	   */
	  function toNumber(val) {
	    var n = parseFloat(val);
	    return isNaN(n) ? val : n;
	  }
	
	  /**
	   * Make a map and return a function for checking if a key
	   * is in that map.
	   */
	  function makeMap(str, expectsLowerCase) {
	    var map = Object.create(null);
	    var list = str.split(',');
	    for (var i = 0; i < list.length; i++) {
	      map[list[i]] = true;
	    }
	    return expectsLowerCase ? function (val) {
	      return map[val.toLowerCase()];
	    } : function (val) {
	      return map[val];
	    };
	  }
	
	  /**
	   * Check if a tag is a built-in tag.
	   */
	  var isBuiltInTag = makeMap('slot,component', true);
	
	  /**
	   * Check if a attribute is a reserved attribute.
	   */
	  var isReservedAttribute = makeMap('key,ref,slot,slot-scope,is');
	
	  /**
	   * Remove an item from an array
	   */
	  function remove(arr, item) {
	    if (arr.length) {
	      var index = arr.indexOf(item);
	      if (index > -1) {
	        return arr.splice(index, 1);
	      }
	    }
	  }
	
	  /**
	   * Check whether the object has the property.
	   */
	  var hasOwnProperty = Object.prototype.hasOwnProperty;
	  function hasOwn(obj, key) {
	    return hasOwnProperty.call(obj, key);
	  }
	
	  /**
	   * Create a cached version of a pure function.
	   */
	  function cached(fn) {
	    var cache = Object.create(null);
	    return function cachedFn(str) {
	      var hit = cache[str];
	      return hit || (cache[str] = fn(str));
	    };
	  }
	
	  /**
	   * Camelize a hyphen-delimited string.
	   */
	  var camelizeRE = /-(\w)/g;
	  var camelize = cached(function (str) {
	    return str.replace(camelizeRE, function (_, c) {
	      return c ? c.toUpperCase() : '';
	    });
	  });
	
	  /**
	   * Capitalize a string.
	   */
	  var capitalize = cached(function (str) {
	    return str.charAt(0).toUpperCase() + str.slice(1);
	  });
	
	  /**
	   * Hyphenate a camelCase string.
	   */
	  var hyphenateRE = /\B([A-Z])/g;
	  var hyphenate = cached(function (str) {
	    return str.replace(hyphenateRE, '-$1').toLowerCase();
	  });
	
	  /**
	   * Simple bind, faster than native
	   */
	  function bind(fn, ctx) {
	    function boundFn(a) {
	      var l = arguments.length;
	      return l ? l > 1 ? fn.apply(ctx, arguments) : fn.call(ctx, a) : fn.call(ctx);
	    }
	    // record original fn length
	    boundFn._length = fn.length;
	    return boundFn;
	  }
	
	  /**
	   * Convert an Array-like object to a real Array.
	   */
	  function toArray(list, start) {
	    start = start || 0;
	    var i = list.length - start;
	    var ret = new Array(i);
	    while (i--) {
	      ret[i] = list[i + start];
	    }
	    return ret;
	  }
	
	  /**
	   * Mix properties into target object.
	   */
	  function extend(to, _from) {
	    for (var key in _from) {
	      to[key] = _from[key];
	    }
	    return to;
	  }
	
	  /**
	   * Merge an Array of Objects into a single Object.
	   */
	  function toObject(arr) {
	    var res = {};
	    for (var i = 0; i < arr.length; i++) {
	      if (arr[i]) {
	        extend(res, arr[i]);
	      }
	    }
	    return res;
	  }
	
	  /**
	   * Perform no operation.
	   * Stubbing args to make Flow happy without leaving useless transpiled code
	   * with ...rest (https://flow.org/blog/2017/05/07/Strict-Function-Call-Arity/)
	   */
	  function noop(a, b, c) {}
	
	  /**
	   * Always return false.
	   */
	  var no = function no(a, b, c) {
	    return false;
	  };
	
	  /**
	   * Return same value
	   */
	  var identity = function identity(_) {
	    return _;
	  };
	
	  /**
	   * Generate a static keys string from compiler modules.
	   */
	  function genStaticKeys(modules) {
	    return modules.reduce(function (keys, m) {
	      return keys.concat(m.staticKeys || []);
	    }, []).join(',');
	  }
	
	  /**
	   * Check if two values are loosely equal - that is,
	   * if they are plain objects, do they have the same shape?
	   */
	  function looseEqual(a, b) {
	    if (a === b) {
	      return true;
	    }
	    var isObjectA = isObject(a);
	    var isObjectB = isObject(b);
	    if (isObjectA && isObjectB) {
	      try {
	        var isArrayA = Array.isArray(a);
	        var isArrayB = Array.isArray(b);
	        if (isArrayA && isArrayB) {
	          return a.length === b.length && a.every(function (e, i) {
	            return looseEqual(e, b[i]);
	          });
	        } else if (!isArrayA && !isArrayB) {
	          var keysA = Object.keys(a);
	          var keysB = Object.keys(b);
	          return keysA.length === keysB.length && keysA.every(function (key) {
	            return looseEqual(a[key], b[key]);
	          });
	        } else {
	          /* istanbul ignore next */
	          return false;
	        }
	      } catch (e) {
	        /* istanbul ignore next */
	        return false;
	      }
	    } else if (!isObjectA && !isObjectB) {
	      return String(a) === String(b);
	    } else {
	      return false;
	    }
	  }
	
	  function looseIndexOf(arr, val) {
	    for (var i = 0; i < arr.length; i++) {
	      if (looseEqual(arr[i], val)) {
	        return i;
	      }
	    }
	    return -1;
	  }
	
	  /**
	   * Ensure a function is called only once.
	   */
	  function once(fn) {
	    var called = false;
	    return function () {
	      if (!called) {
	        called = true;
	        fn.apply(this, arguments);
	      }
	    };
	  }
	
	  var SSR_ATTR = 'data-server-rendered';
	
	  var ASSET_TYPES = ['component', 'directive', 'filter'];
	
	  var LIFECYCLE_HOOKS = ['beforeCreate', 'created', 'beforeMount', 'mounted', 'beforeUpdate', 'updated', 'beforeDestroy', 'destroyed', 'activated', 'deactivated', 'errorCaptured'];
	
	  /*  */
	
	  var config = {
	    /**
	     * Option merge strategies (used in core/util/options)
	     */
	    optionMergeStrategies: Object.create(null),
	
	    /**
	     * Whether to suppress warnings.
	     */
	    silent: false,
	
	    /**
	     * Show production mode tip message on boot?
	     */
	    productionTip: "development" !== 'production',
	
	    /**
	     * Whether to enable devtools
	     */
	    devtools: "development" !== 'production',
	
	    /**
	     * Whether to record perf
	     */
	    performance: false,
	
	    /**
	     * Error handler for watcher errors
	     */
	    errorHandler: null,
	
	    /**
	     * Warn handler for watcher warns
	     */
	    warnHandler: null,
	
	    /**
	     * Ignore certain custom elements
	     */
	    ignoredElements: [],
	
	    /**
	     * Custom user key aliases for v-on
	     */
	    keyCodes: Object.create(null),
	
	    /**
	     * Check if a tag is reserved so that it cannot be registered as a
	     * component. This is platform-dependent and may be overwritten.
	     */
	    isReservedTag: no,
	
	    /**
	     * Check if an attribute is reserved so that it cannot be used as a component
	     * prop. This is platform-dependent and may be overwritten.
	     */
	    isReservedAttr: no,
	
	    /**
	     * Check if a tag is an unknown element.
	     * Platform-dependent.
	     */
	    isUnknownElement: no,
	
	    /**
	     * Get the namespace of an element
	     */
	    getTagNamespace: noop,
	
	    /**
	     * Parse the real tag name for the specific platform.
	     */
	    parsePlatformTagName: identity,
	
	    /**
	     * Check if an attribute must be bound using property, e.g. value
	     * Platform-dependent.
	     */
	    mustUseProp: no,
	
	    /**
	     * Exposed for legacy reasons
	     */
	    _lifecycleHooks: LIFECYCLE_HOOKS
	  };
	
	  /*  */
	
	  var emptyObject = Object.freeze({});
	
	  /**
	   * Check if a string starts with $ or _
	   */
	  function isReserved(str) {
	    var c = (str + '').charCodeAt(0);
	    return c === 0x24 || c === 0x5F;
	  }
	
	  /**
	   * Define a property.
	   */
	  function def(obj, key, val, enumerable) {
	    Object.defineProperty(obj, key, {
	      value: val,
	      enumerable: !!enumerable,
	      writable: true,
	      configurable: true
	    });
	  }
	
	  /**
	   * Parse simple path.
	   */
	  var bailRE = /[^\w.$]/;
	  function parsePath(path) {
	    if (bailRE.test(path)) {
	      return;
	    }
	    var segments = path.split('.');
	    return function (obj) {
	      for (var i = 0; i < segments.length; i++) {
	        if (!obj) {
	          return;
	        }
	        obj = obj[segments[i]];
	      }
	      return obj;
	    };
	  }
	
	  /*  */
	
	  // can we use __proto__?
	  var hasProto = '__proto__' in {};
	
	  // Browser environment sniffing
	  var inBrowser = typeof window !== 'undefined';
	  var UA = inBrowser && window.navigator.userAgent.toLowerCase();
	  var isIE = UA && /msie|trident/.test(UA);
	  var isIE9 = UA && UA.indexOf('msie 9.0') > 0;
	  var isEdge = UA && UA.indexOf('edge/') > 0;
	  var isAndroid = UA && UA.indexOf('android') > 0;
	  var isIOS = UA && /iphone|ipad|ipod|ios/.test(UA);
	  var isChrome = UA && /chrome\/\d+/.test(UA) && !isEdge;
	
	  // Firefox has a "watch" function on Object.prototype...
	  var nativeWatch = {}.watch;
	
	  var supportsPassive = false;
	  if (inBrowser) {
	    try {
	      var opts = {};
	      Object.defineProperty(opts, 'passive', {
	        get: function get() {
	          /* istanbul ignore next */
	          supportsPassive = true;
	        }
	      }); // https://github.com/facebook/flow/issues/285
	      window.addEventListener('test-passive', null, opts);
	    } catch (e) {}
	  }
	
	  // this needs to be lazy-evaled because vue may be required before
	  // vue-server-renderer can set VUE_ENV
	  var _isServer;
	  var isServerRendering = function isServerRendering() {
	    if (_isServer === undefined) {
	      /* istanbul ignore if */
	      if (!inBrowser && typeof global !== 'undefined') {
	        // detect presence of vue-server-renderer and avoid
	        // Webpack shimming the process
	        _isServer = global['process'].env.VUE_ENV === 'server';
	      } else {
	        _isServer = false;
	      }
	    }
	    return _isServer;
	  };
	
	  // detect devtools
	  var devtools = inBrowser && window.__VUE_DEVTOOLS_GLOBAL_HOOK__;
	
	  /* istanbul ignore next */
	  function isNative(Ctor) {
	    return typeof Ctor === 'function' && /native code/.test(Ctor.toString());
	  }
	
	  var hasSymbol = typeof Symbol !== 'undefined' && isNative(Symbol) && typeof Reflect !== 'undefined' && isNative(Reflect.ownKeys);
	
	  var _Set;
	  /* istanbul ignore if */ // $flow-disable-line
	  if (typeof Set !== 'undefined' && isNative(Set)) {
	    // use native Set when available.
	    _Set = Set;
	  } else {
	    // a non-standard Set polyfill that only works with primitive keys.
	    _Set = function () {
	      function Set() {
	        this.set = Object.create(null);
	      }
	      Set.prototype.has = function has(key) {
	        return this.set[key] === true;
	      };
	      Set.prototype.add = function add(key) {
	        this.set[key] = true;
	      };
	      Set.prototype.clear = function clear() {
	        this.set = Object.create(null);
	      };
	
	      return Set;
	    }();
	  }
	
	  /*  */
	
	  var warn = noop;
	  var tip = noop;
	  var generateComponentTrace = noop; // work around flow check
	  var formatComponentName = noop;
	
	  {
	    var hasConsole = typeof console !== 'undefined';
	    var classifyRE = /(?:^|[-_])(\w)/g;
	    var classify = function classify(str) {
	      return str.replace(classifyRE, function (c) {
	        return c.toUpperCase();
	      }).replace(/[-_]/g, '');
	    };
	
	    warn = function warn(msg, vm) {
	      var trace = vm ? generateComponentTrace(vm) : '';
	
	      if (config.warnHandler) {
	        config.warnHandler.call(null, msg, vm, trace);
	      } else if (hasConsole && !config.silent) {
	        console.error("[Vue warn]: " + msg + trace);
	      }
	    };
	
	    tip = function tip(msg, vm) {
	      if (hasConsole && !config.silent) {
	        console.warn("[Vue tip]: " + msg + (vm ? generateComponentTrace(vm) : ''));
	      }
	    };
	
	    formatComponentName = function formatComponentName(vm, includeFile) {
	      if (vm.$root === vm) {
	        return '<Root>';
	      }
	      var options = typeof vm === 'function' && vm.cid != null ? vm.options : vm._isVue ? vm.$options || vm.constructor.options : vm || {};
	      var name = options.name || options._componentTag;
	      var file = options.__file;
	      if (!name && file) {
	        var match = file.match(/([^/\\]+)\.vue$/);
	        name = match && match[1];
	      }
	
	      return (name ? "<" + classify(name) + ">" : "<Anonymous>") + (file && includeFile !== false ? " at " + file : '');
	    };
	
	    var repeat = function repeat(str, n) {
	      var res = '';
	      while (n) {
	        if (n % 2 === 1) {
	          res += str;
	        }
	        if (n > 1) {
	          str += str;
	        }
	        n >>= 1;
	      }
	      return res;
	    };
	
	    generateComponentTrace = function generateComponentTrace(vm) {
	      if (vm._isVue && vm.$parent) {
	        var tree = [];
	        var currentRecursiveSequence = 0;
	        while (vm) {
	          if (tree.length > 0) {
	            var last = tree[tree.length - 1];
	            if (last.constructor === vm.constructor) {
	              currentRecursiveSequence++;
	              vm = vm.$parent;
	              continue;
	            } else if (currentRecursiveSequence > 0) {
	              tree[tree.length - 1] = [last, currentRecursiveSequence];
	              currentRecursiveSequence = 0;
	            }
	          }
	          tree.push(vm);
	          vm = vm.$parent;
	        }
	        return '\n\nfound in\n\n' + tree.map(function (vm, i) {
	          return "" + (i === 0 ? '---> ' : repeat(' ', 5 + i * 2)) + (Array.isArray(vm) ? formatComponentName(vm[0]) + "... (" + vm[1] + " recursive calls)" : formatComponentName(vm));
	        }).join('\n');
	      } else {
	        return "\n\n(found in " + formatComponentName(vm) + ")";
	      }
	    };
	  }
	
	  /*  */
	
	  var uid = 0;
	
	  /**
	   * A dep is an observable that can have multiple
	   * directives subscribing to it.
	   */
	  var Dep = function Dep() {
	    this.id = uid++;
	    this.subs = [];
	  };
	
	  Dep.prototype.addSub = function addSub(sub) {
	    this.subs.push(sub);
	  };
	
	  Dep.prototype.removeSub = function removeSub(sub) {
	    remove(this.subs, sub);
	  };
	
	  Dep.prototype.depend = function depend() {
	    if (Dep.target) {
	      Dep.target.addDep(this);
	    }
	  };
	
	  Dep.prototype.notify = function notify() {
	    // stabilize the subscriber list first
	    var subs = this.subs.slice();
	    for (var i = 0, l = subs.length; i < l; i++) {
	      subs[i].update();
	    }
	  };
	
	  // the current target watcher being evaluated.
	  // this is globally unique because there could be only one
	  // watcher being evaluated at any time.
	  Dep.target = null;
	  var targetStack = [];
	
	  function pushTarget(_target) {
	    if (Dep.target) {
	      targetStack.push(Dep.target);
	    }
	    Dep.target = _target;
	  }
	
	  function popTarget() {
	    Dep.target = targetStack.pop();
	  }
	
	  /*  */
	
	  var VNode = function VNode(tag, data, children, text, elm, context, componentOptions, asyncFactory) {
	    this.tag = tag;
	    this.data = data;
	    this.children = children;
	    this.text = text;
	    this.elm = elm;
	    this.ns = undefined;
	    this.context = context;
	    this.functionalContext = undefined;
	    this.functionalOptions = undefined;
	    this.functionalScopeId = undefined;
	    this.key = data && data.key;
	    this.componentOptions = componentOptions;
	    this.componentInstance = undefined;
	    this.parent = undefined;
	    this.raw = false;
	    this.isStatic = false;
	    this.isRootInsert = true;
	    this.isComment = false;
	    this.isCloned = false;
	    this.isOnce = false;
	    this.asyncFactory = asyncFactory;
	    this.asyncMeta = undefined;
	    this.isAsyncPlaceholder = false;
	  };
	
	  var prototypeAccessors = { child: { configurable: true } };
	
	  // DEPRECATED: alias for componentInstance for backwards compat.
	  /* istanbul ignore next */
	  prototypeAccessors.child.get = function () {
	    return this.componentInstance;
	  };
	
	  Object.defineProperties(VNode.prototype, prototypeAccessors);
	
	  var createEmptyVNode = function createEmptyVNode(text) {
	    if (text === void 0) text = '';
	
	    var node = new VNode();
	    node.text = text;
	    node.isComment = true;
	    return node;
	  };
	
	  function createTextVNode(val) {
	    return new VNode(undefined, undefined, undefined, String(val));
	  }
	
	  // optimized shallow clone
	  // used for static nodes and slot nodes because they may be reused across
	  // multiple renders, cloning them avoids errors when DOM manipulations rely
	  // on their elm reference.
	  function cloneVNode(vnode, deep) {
	    var cloned = new VNode(vnode.tag, vnode.data, vnode.children, vnode.text, vnode.elm, vnode.context, vnode.componentOptions, vnode.asyncFactory);
	    cloned.ns = vnode.ns;
	    cloned.isStatic = vnode.isStatic;
	    cloned.key = vnode.key;
	    cloned.isComment = vnode.isComment;
	    cloned.isCloned = true;
	    if (deep && vnode.children) {
	      cloned.children = cloneVNodes(vnode.children);
	    }
	    return cloned;
	  }
	
	  function cloneVNodes(vnodes, deep) {
	    var len = vnodes.length;
	    var res = new Array(len);
	    for (var i = 0; i < len; i++) {
	      res[i] = cloneVNode(vnodes[i], deep);
	    }
	    return res;
	  }
	
	  /*
	   * not type checking this file because flow doesn't play well with
	   * dynamically accessing methods on Array prototype
	   */
	
	  var arrayProto = Array.prototype;
	  var arrayMethods = Object.create(arrayProto);['push', 'pop', 'shift', 'unshift', 'splice', 'sort', 'reverse'].forEach(function (method) {
	    // cache original method
	    var original = arrayProto[method];
	    def(arrayMethods, method, function mutator() {
	      var args = [],
	          len = arguments.length;
	      while (len--) {
	        args[len] = arguments[len];
	      }var result = original.apply(this, args);
	      var ob = this.__ob__;
	      var inserted;
	      switch (method) {
	        case 'push':
	        case 'unshift':
	          inserted = args;
	          break;
	        case 'splice':
	          inserted = args.slice(2);
	          break;
	      }
	      if (inserted) {
	        ob.observeArray(inserted);
	      }
	      // notify change
	      ob.dep.notify();
	      return result;
	    });
	  });
	
	  /*  */
	
	  var arrayKeys = Object.getOwnPropertyNames(arrayMethods);
	
	  /**
	   * By default, when a reactive property is set, the new value is
	   * also converted to become reactive. However when passing down props,
	   * we don't want to force conversion because the value may be a nested value
	   * under a frozen data structure. Converting it would defeat the optimization.
	   */
	  var observerState = {
	    shouldConvert: true
	  };
	
	  /**
	   * Observer class that are attached to each observed
	   * object. Once attached, the observer converts target
	   * object's property keys into getter/setters that
	   * collect dependencies and dispatches updates.
	   */
	  var Observer = function Observer(value) {
	    this.value = value;
	    this.dep = new Dep();
	    this.vmCount = 0;
	    def(value, '__ob__', this);
	    if (Array.isArray(value)) {
	      var augment = hasProto ? protoAugment : copyAugment;
	      augment(value, arrayMethods, arrayKeys);
	      this.observeArray(value);
	    } else {
	      this.walk(value);
	    }
	  };
	
	  /**
	   * Walk through each property and convert them into
	   * getter/setters. This method should only be called when
	   * value type is Object.
	   */
	  Observer.prototype.walk = function walk(obj) {
	    var keys = Object.keys(obj);
	    for (var i = 0; i < keys.length; i++) {
	      defineReactive(obj, keys[i], obj[keys[i]]);
	    }
	  };
	
	  /**
	   * Observe a list of Array items.
	   */
	  Observer.prototype.observeArray = function observeArray(items) {
	    for (var i = 0, l = items.length; i < l; i++) {
	      observe(items[i]);
	    }
	  };
	
	  // helpers
	
	  /**
	   * Augment an target Object or Array by intercepting
	   * the prototype chain using __proto__
	   */
	  function protoAugment(target, src, keys) {
	    /* eslint-disable no-proto */
	    target.__proto__ = src;
	    /* eslint-enable no-proto */
	  }
	
	  /**
	   * Augment an target Object or Array by defining
	   * hidden properties.
	   */
	  /* istanbul ignore next */
	  function copyAugment(target, src, keys) {
	    for (var i = 0, l = keys.length; i < l; i++) {
	      var key = keys[i];
	      def(target, key, src[key]);
	    }
	  }
	
	  /**
	   * Attempt to create an observer instance for a value,
	   * returns the new observer if successfully observed,
	   * or the existing observer if the value already has one.
	   */
	  function observe(value, asRootData) {
	    if (!isObject(value) || value instanceof VNode) {
	      return;
	    }
	    var ob;
	    if (hasOwn(value, '__ob__') && value.__ob__ instanceof Observer) {
	      ob = value.__ob__;
	    } else if (observerState.shouldConvert && !isServerRendering() && (Array.isArray(value) || isPlainObject(value)) && Object.isExtensible(value) && !value._isVue) {
	      ob = new Observer(value);
	    }
	    if (asRootData && ob) {
	      ob.vmCount++;
	    }
	    return ob;
	  }
	
	  /**
	   * Define a reactive property on an Object.
	   */
	  function defineReactive(obj, key, val, customSetter, shallow) {
	    var dep = new Dep();
	
	    var property = Object.getOwnPropertyDescriptor(obj, key);
	    if (property && property.configurable === false) {
	      return;
	    }
	
	    // cater for pre-defined getter/setters
	    var getter = property && property.get;
	    var setter = property && property.set;
	
	    var childOb = !shallow && observe(val);
	    Object.defineProperty(obj, key, {
	      enumerable: true,
	      configurable: true,
	      get: function reactiveGetter() {
	        var value = getter ? getter.call(obj) : val;
	        if (Dep.target) {
	          dep.depend();
	          if (childOb) {
	            childOb.dep.depend();
	            if (Array.isArray(value)) {
	              dependArray(value);
	            }
	          }
	        }
	        return value;
	      },
	      set: function reactiveSetter(newVal) {
	        var value = getter ? getter.call(obj) : val;
	        /* eslint-disable no-self-compare */
	        if (newVal === value || newVal !== newVal && value !== value) {
	          return;
	        }
	        /* eslint-enable no-self-compare */
	        if ("development" !== 'production' && customSetter) {
	          customSetter();
	        }
	        if (setter) {
	          setter.call(obj, newVal);
	        } else {
	          val = newVal;
	        }
	        childOb = !shallow && observe(newVal);
	        dep.notify();
	      }
	    });
	  }
	
	  /**
	   * Set a property on an object. Adds the new property and
	   * triggers change notification if the property doesn't
	   * already exist.
	   */
	  function set(target, key, val) {
	    if (Array.isArray(target) && isValidArrayIndex(key)) {
	      target.length = Math.max(target.length, key);
	      target.splice(key, 1, val);
	      return val;
	    }
	    if (hasOwn(target, key)) {
	      target[key] = val;
	      return val;
	    }
	    var ob = target.__ob__;
	    if (target._isVue || ob && ob.vmCount) {
	      "development" !== 'production' && warn('Avoid adding reactive properties to a Vue instance or its root $data ' + 'at runtime - declare it upfront in the data option.');
	      return val;
	    }
	    if (!ob) {
	      target[key] = val;
	      return val;
	    }
	    defineReactive(ob.value, key, val);
	    ob.dep.notify();
	    return val;
	  }
	
	  /**
	   * Delete a property and trigger change if necessary.
	   */
	  function del(target, key) {
	    if (Array.isArray(target) && isValidArrayIndex(key)) {
	      target.splice(key, 1);
	      return;
	    }
	    var ob = target.__ob__;
	    if (target._isVue || ob && ob.vmCount) {
	      "development" !== 'production' && warn('Avoid deleting properties on a Vue instance or its root $data ' + '- just set it to null.');
	      return;
	    }
	    if (!hasOwn(target, key)) {
	      return;
	    }
	    delete target[key];
	    if (!ob) {
	      return;
	    }
	    ob.dep.notify();
	  }
	
	  /**
	   * Collect dependencies on array elements when the array is touched, since
	   * we cannot intercept array element access like property getters.
	   */
	  function dependArray(value) {
	    for (var e = void 0, i = 0, l = value.length; i < l; i++) {
	      e = value[i];
	      e && e.__ob__ && e.__ob__.dep.depend();
	      if (Array.isArray(e)) {
	        dependArray(e);
	      }
	    }
	  }
	
	  /*  */
	
	  /**
	   * Option overwriting strategies are functions that handle
	   * how to merge a parent option value and a child option
	   * value into the final value.
	   */
	  var strats = config.optionMergeStrategies;
	
	  /**
	   * Options with restrictions
	   */
	  {
	    strats.el = strats.propsData = function (parent, child, vm, key) {
	      if (!vm) {
	        warn("option \"" + key + "\" can only be used during instance " + 'creation with the `new` keyword.');
	      }
	      return defaultStrat(parent, child);
	    };
	  }
	
	  /**
	   * Helper that recursively merges two data objects together.
	   */
	  function mergeData(to, from) {
	    if (!from) {
	      return to;
	    }
	    var key, toVal, fromVal;
	    var keys = Object.keys(from);
	    for (var i = 0; i < keys.length; i++) {
	      key = keys[i];
	      toVal = to[key];
	      fromVal = from[key];
	      if (!hasOwn(to, key)) {
	        set(to, key, fromVal);
	      } else if (isPlainObject(toVal) && isPlainObject(fromVal)) {
	        mergeData(toVal, fromVal);
	      }
	    }
	    return to;
	  }
	
	  /**
	   * Data
	   */
	  function mergeDataOrFn(parentVal, childVal, vm) {
	    if (!vm) {
	      // in a Vue.extend merge, both should be functions
	      if (!childVal) {
	        return parentVal;
	      }
	      if (!parentVal) {
	        return childVal;
	      }
	      // when parentVal & childVal are both present,
	      // we need to return a function that returns the
	      // merged result of both functions... no need to
	      // check if parentVal is a function here because
	      // it has to be a function to pass previous merges.
	      return function mergedDataFn() {
	        return mergeData(typeof childVal === 'function' ? childVal.call(this) : childVal, typeof parentVal === 'function' ? parentVal.call(this) : parentVal);
	      };
	    } else if (parentVal || childVal) {
	      return function mergedInstanceDataFn() {
	        // instance merge
	        var instanceData = typeof childVal === 'function' ? childVal.call(vm) : childVal;
	        var defaultData = typeof parentVal === 'function' ? parentVal.call(vm) : parentVal;
	        if (instanceData) {
	          return mergeData(instanceData, defaultData);
	        } else {
	          return defaultData;
	        }
	      };
	    }
	  }
	
	  strats.data = function (parentVal, childVal, vm) {
	    if (!vm) {
	      if (childVal && typeof childVal !== 'function') {
	        "development" !== 'production' && warn('The "data" option should be a function ' + 'that returns a per-instance value in component ' + 'definitions.', vm);
	
	        return parentVal;
	      }
	      return mergeDataOrFn.call(this, parentVal, childVal);
	    }
	
	    return mergeDataOrFn(parentVal, childVal, vm);
	  };
	
	  /**
	   * Hooks and props are merged as arrays.
	   */
	  function mergeHook(parentVal, childVal) {
	    return childVal ? parentVal ? parentVal.concat(childVal) : Array.isArray(childVal) ? childVal : [childVal] : parentVal;
	  }
	
	  LIFECYCLE_HOOKS.forEach(function (hook) {
	    strats[hook] = mergeHook;
	  });
	
	  /**
	   * Assets
	   *
	   * When a vm is present (instance creation), we need to do
	   * a three-way merge between constructor options, instance
	   * options and parent options.
	   */
	  function mergeAssets(parentVal, childVal, vm, key) {
	    var res = Object.create(parentVal || null);
	    if (childVal) {
	      "development" !== 'production' && assertObjectType(key, childVal, vm);
	      return extend(res, childVal);
	    } else {
	      return res;
	    }
	  }
	
	  ASSET_TYPES.forEach(function (type) {
	    strats[type + 's'] = mergeAssets;
	  });
	
	  /**
	   * Watchers.
	   *
	   * Watchers hashes should not overwrite one
	   * another, so we merge them as arrays.
	   */
	  strats.watch = function (parentVal, childVal, vm, key) {
	    // work around Firefox's Object.prototype.watch...
	    if (parentVal === nativeWatch) {
	      parentVal = undefined;
	    }
	    if (childVal === nativeWatch) {
	      childVal = undefined;
	    }
	    /* istanbul ignore if */
	    if (!childVal) {
	      return Object.create(parentVal || null);
	    }
	    {
	      assertObjectType(key, childVal, vm);
	    }
	    if (!parentVal) {
	      return childVal;
	    }
	    var ret = {};
	    extend(ret, parentVal);
	    for (var key$1 in childVal) {
	      var parent = ret[key$1];
	      var child = childVal[key$1];
	      if (parent && !Array.isArray(parent)) {
	        parent = [parent];
	      }
	      ret[key$1] = parent ? parent.concat(child) : Array.isArray(child) ? child : [child];
	    }
	    return ret;
	  };
	
	  /**
	   * Other object hashes.
	   */
	  strats.props = strats.methods = strats.inject = strats.computed = function (parentVal, childVal, vm, key) {
	    if (childVal && "development" !== 'production') {
	      assertObjectType(key, childVal, vm);
	    }
	    if (!parentVal) {
	      return childVal;
	    }
	    var ret = Object.create(null);
	    extend(ret, parentVal);
	    if (childVal) {
	      extend(ret, childVal);
	    }
	    return ret;
	  };
	  strats.provide = mergeDataOrFn;
	
	  /**
	   * Default strategy.
	   */
	  var defaultStrat = function defaultStrat(parentVal, childVal) {
	    return childVal === undefined ? parentVal : childVal;
	  };
	
	  /**
	   * Validate component names
	   */
	  function checkComponents(options) {
	    for (var key in options.components) {
	      var lower = key.toLowerCase();
	      if (isBuiltInTag(lower) || config.isReservedTag(lower)) {
	        warn('Do not use built-in or reserved HTML elements as component ' + 'id: ' + key);
	      }
	    }
	  }
	
	  /**
	   * Ensure all props option syntax are normalized into the
	   * Object-based format.
	   */
	  function normalizeProps(options, vm) {
	    var props = options.props;
	    if (!props) {
	      return;
	    }
	    var res = {};
	    var i, val, name;
	    if (Array.isArray(props)) {
	      i = props.length;
	      while (i--) {
	        val = props[i];
	        if (typeof val === 'string') {
	          name = camelize(val);
	          res[name] = { type: null };
	        } else {
	          warn('props must be strings when using array syntax.');
	        }
	      }
	    } else if (isPlainObject(props)) {
	      for (var key in props) {
	        val = props[key];
	        name = camelize(key);
	        res[name] = isPlainObject(val) ? val : { type: val };
	      }
	    } else {
	      warn("Invalid value for option \"props\": expected an Array or an Object, " + "but got " + toRawType(props) + ".", vm);
	    }
	    options.props = res;
	  }
	
	  /**
	   * Normalize all injections into Object-based format
	   */
	  function normalizeInject(options, vm) {
	    var inject = options.inject;
	    var normalized = options.inject = {};
	    if (Array.isArray(inject)) {
	      for (var i = 0; i < inject.length; i++) {
	        normalized[inject[i]] = { from: inject[i] };
	      }
	    } else if (isPlainObject(inject)) {
	      for (var key in inject) {
	        var val = inject[key];
	        normalized[key] = isPlainObject(val) ? extend({ from: key }, val) : { from: val };
	      }
	    } else if ("development" !== 'production' && inject) {
	      warn("Invalid value for option \"inject\": expected an Array or an Object, " + "but got " + toRawType(inject) + ".", vm);
	    }
	  }
	
	  /**
	   * Normalize raw function directives into object format.
	   */
	  function normalizeDirectives(options) {
	    var dirs = options.directives;
	    if (dirs) {
	      for (var key in dirs) {
	        var def = dirs[key];
	        if (typeof def === 'function') {
	          dirs[key] = { bind: def, update: def };
	        }
	      }
	    }
	  }
	
	  function assertObjectType(name, value, vm) {
	    if (!isPlainObject(value)) {
	      warn("Invalid value for option \"" + name + "\": expected an Object, " + "but got " + toRawType(value) + ".", vm);
	    }
	  }
	
	  /**
	   * Merge two option objects into a new one.
	   * Core utility used in both instantiation and inheritance.
	   */
	  function mergeOptions(parent, child, vm) {
	    {
	      checkComponents(child);
	    }
	
	    if (typeof child === 'function') {
	      child = child.options;
	    }
	
	    normalizeProps(child, vm);
	    normalizeInject(child, vm);
	    normalizeDirectives(child);
	    var extendsFrom = child.extends;
	    if (extendsFrom) {
	      parent = mergeOptions(parent, extendsFrom, vm);
	    }
	    if (child.mixins) {
	      for (var i = 0, l = child.mixins.length; i < l; i++) {
	        parent = mergeOptions(parent, child.mixins[i], vm);
	      }
	    }
	    var options = {};
	    var key;
	    for (key in parent) {
	      mergeField(key);
	    }
	    for (key in child) {
	      if (!hasOwn(parent, key)) {
	        mergeField(key);
	      }
	    }
	    function mergeField(key) {
	      var strat = strats[key] || defaultStrat;
	      options[key] = strat(parent[key], child[key], vm, key);
	    }
	    return options;
	  }
	
	  /**
	   * Resolve an asset.
	   * This function is used because child instances need access
	   * to assets defined in its ancestor chain.
	   */
	  function resolveAsset(options, type, id, warnMissing) {
	    /* istanbul ignore if */
	    if (typeof id !== 'string') {
	      return;
	    }
	    var assets = options[type];
	    // check local registration variations first
	    if (hasOwn(assets, id)) {
	      return assets[id];
	    }
	    var camelizedId = camelize(id);
	    if (hasOwn(assets, camelizedId)) {
	      return assets[camelizedId];
	    }
	    var PascalCaseId = capitalize(camelizedId);
	    if (hasOwn(assets, PascalCaseId)) {
	      return assets[PascalCaseId];
	    }
	    // fallback to prototype chain
	    var res = assets[id] || assets[camelizedId] || assets[PascalCaseId];
	    if ("development" !== 'production' && warnMissing && !res) {
	      warn('Failed to resolve ' + type.slice(0, -1) + ': ' + id, options);
	    }
	    return res;
	  }
	
	  /*  */
	
	  function validateProp(key, propOptions, propsData, vm) {
	    var prop = propOptions[key];
	    var absent = !hasOwn(propsData, key);
	    var value = propsData[key];
	    // handle boolean props
	    if (isType(Boolean, prop.type)) {
	      if (absent && !hasOwn(prop, 'default')) {
	        value = false;
	      } else if (!isType(String, prop.type) && (value === '' || value === hyphenate(key))) {
	        value = true;
	      }
	    }
	    // check default value
	    if (value === undefined) {
	      value = getPropDefaultValue(vm, prop, key);
	      // since the default value is a fresh copy,
	      // make sure to observe it.
	      var prevShouldConvert = observerState.shouldConvert;
	      observerState.shouldConvert = true;
	      observe(value);
	      observerState.shouldConvert = prevShouldConvert;
	    }
	    {
	      assertProp(prop, key, value, vm, absent);
	    }
	    return value;
	  }
	
	  /**
	   * Get the default value of a prop.
	   */
	  function getPropDefaultValue(vm, prop, key) {
	    // no default, return undefined
	    if (!hasOwn(prop, 'default')) {
	      return undefined;
	    }
	    var def = prop.default;
	    // warn against non-factory defaults for Object & Array
	    if ("development" !== 'production' && isObject(def)) {
	      warn('Invalid default value for prop "' + key + '": ' + 'Props with type Object/Array must use a factory function ' + 'to return the default value.', vm);
	    }
	    // the raw prop value was also undefined from previous render,
	    // return previous default value to avoid unnecessary watcher trigger
	    if (vm && vm.$options.propsData && vm.$options.propsData[key] === undefined && vm._props[key] !== undefined) {
	      return vm._props[key];
	    }
	    // call factory function for non-Function types
	    // a value is Function if its prototype is function even across different execution context
	    return typeof def === 'function' && getType(prop.type) !== 'Function' ? def.call(vm) : def;
	  }
	
	  /**
	   * Assert whether a prop is valid.
	   */
	  function assertProp(prop, name, value, vm, absent) {
	    if (prop.required && absent) {
	      warn('Missing required prop: "' + name + '"', vm);
	      return;
	    }
	    if (value == null && !prop.required) {
	      return;
	    }
	    var type = prop.type;
	    var valid = !type || type === true;
	    var expectedTypes = [];
	    if (type) {
	      if (!Array.isArray(type)) {
	        type = [type];
	      }
	      for (var i = 0; i < type.length && !valid; i++) {
	        var assertedType = assertType(value, type[i]);
	        expectedTypes.push(assertedType.expectedType || '');
	        valid = assertedType.valid;
	      }
	    }
	    if (!valid) {
	      warn("Invalid prop: type check failed for prop \"" + name + "\"." + " Expected " + expectedTypes.map(capitalize).join(', ') + ", got " + toRawType(value) + ".", vm);
	      return;
	    }
	    var validator = prop.validator;
	    if (validator) {
	      if (!validator(value)) {
	        warn('Invalid prop: custom validator check failed for prop "' + name + '".', vm);
	      }
	    }
	  }
	
	  var simpleCheckRE = /^(String|Number|Boolean|Function|Symbol)$/;
	
	  function assertType(value, type) {
	    var valid;
	    var expectedType = getType(type);
	    if (simpleCheckRE.test(expectedType)) {
	      var t = typeof value === 'undefined' ? 'undefined' : _typeof(value);
	      valid = t === expectedType.toLowerCase();
	      // for primitive wrapper objects
	      if (!valid && t === 'object') {
	        valid = value instanceof type;
	      }
	    } else if (expectedType === 'Object') {
	      valid = isPlainObject(value);
	    } else if (expectedType === 'Array') {
	      valid = Array.isArray(value);
	    } else {
	      valid = value instanceof type;
	    }
	    return {
	      valid: valid,
	      expectedType: expectedType
	    };
	  }
	
	  /**
	   * Use function string name to check built-in types,
	   * because a simple equality check will fail when running
	   * across different vms / iframes.
	   */
	  function getType(fn) {
	    var match = fn && fn.toString().match(/^\s*function (\w+)/);
	    return match ? match[1] : '';
	  }
	
	  function isType(type, fn) {
	    if (!Array.isArray(fn)) {
	      return getType(fn) === getType(type);
	    }
	    for (var i = 0, len = fn.length; i < len; i++) {
	      if (getType(fn[i]) === getType(type)) {
	        return true;
	      }
	    }
	    /* istanbul ignore next */
	    return false;
	  }
	
	  /*  */
	
	  function handleError(err, vm, info) {
	    if (vm) {
	      var cur = vm;
	      while (cur = cur.$parent) {
	        var hooks = cur.$options.errorCaptured;
	        if (hooks) {
	          for (var i = 0; i < hooks.length; i++) {
	            try {
	              var capture = hooks[i].call(cur, err, vm, info) === false;
	              if (capture) {
	                return;
	              }
	            } catch (e) {
	              globalHandleError(e, cur, 'errorCaptured hook');
	            }
	          }
	        }
	      }
	    }
	    globalHandleError(err, vm, info);
	  }
	
	  function globalHandleError(err, vm, info) {
	    if (config.errorHandler) {
	      try {
	        return config.errorHandler.call(null, err, vm, info);
	      } catch (e) {
	        logError(e, null, 'config.errorHandler');
	      }
	    }
	    logError(err, vm, info);
	  }
	
	  function logError(err, vm, info) {
	    {
	      warn("Error in " + info + ": \"" + err.toString() + "\"", vm);
	    }
	    /* istanbul ignore else */
	    if (inBrowser && typeof console !== 'undefined') {
	      console.error(err);
	    } else {
	      throw err;
	    }
	  }
	
	  /*  */
	  /* globals MessageChannel */
	
	  var callbacks = [];
	  var pending = false;
	
	  function flushCallbacks() {
	    pending = false;
	    var copies = callbacks.slice(0);
	    callbacks.length = 0;
	    for (var i = 0; i < copies.length; i++) {
	      copies[i]();
	    }
	  }
	
	  // Here we have async deferring wrappers using both micro and macro tasks.
	  // In < 2.4 we used micro tasks everywhere, but there are some scenarios where
	  // micro tasks have too high a priority and fires in between supposedly
	  // sequential events (e.g. #4521, #6690) or even between bubbling of the same
	  // event (#6566). However, using macro tasks everywhere also has subtle problems
	  // when state is changed right before repaint (e.g. #6813, out-in transitions).
	  // Here we use micro task by default, but expose a way to force macro task when
	  // needed (e.g. in event handlers attached by v-on).
	  var microTimerFunc;
	  var macroTimerFunc;
	  var useMacroTask = false;
	
	  // Determine (macro) Task defer implementation.
	  // Technically setImmediate should be the ideal choice, but it's only available
	  // in IE. The only polyfill that consistently queues the callback after all DOM
	  // events triggered in the same loop is by using MessageChannel.
	  /* istanbul ignore if */
	  if (typeof setImmediate !== 'undefined' && isNative(setImmediate)) {
	    macroTimerFunc = function macroTimerFunc() {
	      setImmediate(flushCallbacks);
	    };
	  } else if (typeof MessageChannel !== 'undefined' && (isNative(MessageChannel) ||
	  // PhantomJS
	  MessageChannel.toString() === '[object MessageChannelConstructor]')) {
	    var channel = new MessageChannel();
	    var port = channel.port2;
	    channel.port1.onmessage = flushCallbacks;
	    macroTimerFunc = function macroTimerFunc() {
	      port.postMessage(1);
	    };
	  } else {
	    /* istanbul ignore next */
	    macroTimerFunc = function macroTimerFunc() {
	      setTimeout(flushCallbacks, 0);
	    };
	  }
	
	  // Determine MicroTask defer implementation.
	  /* istanbul ignore next, $flow-disable-line */
	  if (typeof Promise !== 'undefined' && isNative(Promise)) {
	    var p = Promise.resolve();
	    microTimerFunc = function microTimerFunc() {
	      p.then(flushCallbacks);
	      // in problematic UIWebViews, Promise.then doesn't completely break, but
	      // it can get stuck in a weird state where callbacks are pushed into the
	      // microtask queue but the queue isn't being flushed, until the browser
	      // needs to do some other work, e.g. handle a timer. Therefore we can
	      // "force" the microtask queue to be flushed by adding an empty timer.
	      if (isIOS) {
	        setTimeout(noop);
	      }
	    };
	  } else {
	    // fallback to macro
	    microTimerFunc = macroTimerFunc;
	  }
	
	  /**
	   * Wrap a function so that if any code inside triggers state change,
	   * the changes are queued using a Task instead of a MicroTask.
	   */
	  function withMacroTask(fn) {
	    return fn._withTask || (fn._withTask = function () {
	      useMacroTask = true;
	      var res = fn.apply(null, arguments);
	      useMacroTask = false;
	      return res;
	    });
	  }
	
	  function nextTick(cb, ctx) {
	    var _resolve;
	    callbacks.push(function () {
	      if (cb) {
	        try {
	          cb.call(ctx);
	        } catch (e) {
	          handleError(e, ctx, 'nextTick');
	        }
	      } else if (_resolve) {
	        _resolve(ctx);
	      }
	    });
	    if (!pending) {
	      pending = true;
	      if (useMacroTask) {
	        macroTimerFunc();
	      } else {
	        microTimerFunc();
	      }
	    }
	    // $flow-disable-line
	    if (!cb && typeof Promise !== 'undefined') {
	      return new Promise(function (resolve) {
	        _resolve = resolve;
	      });
	    }
	  }
	
	  /*  */
	
	  var mark;
	  var measure;
	
	  {
	    var perf = inBrowser && window.performance;
	    /* istanbul ignore if */
	    if (perf && perf.mark && perf.measure && perf.clearMarks && perf.clearMeasures) {
	      mark = function mark(tag) {
	        return perf.mark(tag);
	      };
	      measure = function measure(name, startTag, endTag) {
	        perf.measure(name, startTag, endTag);
	        perf.clearMarks(startTag);
	        perf.clearMarks(endTag);
	        perf.clearMeasures(name);
	      };
	    }
	  }
	
	  /* not type checking this file because flow doesn't play well with Proxy */
	
	  var initProxy;
	
	  {
	    var allowedGlobals = makeMap('Infinity,undefined,NaN,isFinite,isNaN,' + 'parseFloat,parseInt,decodeURI,decodeURIComponent,encodeURI,encodeURIComponent,' + 'Math,Number,Date,Array,Object,Boolean,String,RegExp,Map,Set,JSON,Intl,' + 'require' // for Webpack/Browserify
	    );
	
	    var warnNonPresent = function warnNonPresent(target, key) {
	      warn("Property or method \"" + key + "\" is not defined on the instance but " + 'referenced during render. Make sure that this property is reactive, ' + 'either in the data option, or for class-based components, by ' + 'initializing the property. ' + 'See: https://vuejs.org/v2/guide/reactivity.html#Declaring-Reactive-Properties.', target);
	    };
	
	    var hasProxy = typeof Proxy !== 'undefined' && Proxy.toString().match(/native code/);
	
	    if (hasProxy) {
	      var isBuiltInModifier = makeMap('stop,prevent,self,ctrl,shift,alt,meta,exact');
	      config.keyCodes = new Proxy(config.keyCodes, {
	        set: function set(target, key, value) {
	          if (isBuiltInModifier(key)) {
	            warn("Avoid overwriting built-in modifier in config.keyCodes: ." + key);
	            return false;
	          } else {
	            target[key] = value;
	            return true;
	          }
	        }
	      });
	    }
	
	    var hasHandler = {
	      has: function has(target, key) {
	        var has = key in target;
	        var isAllowed = allowedGlobals(key) || key.charAt(0) === '_';
	        if (!has && !isAllowed) {
	          warnNonPresent(target, key);
	        }
	        return has || !isAllowed;
	      }
	    };
	
	    var getHandler = {
	      get: function get(target, key) {
	        if (typeof key === 'string' && !(key in target)) {
	          warnNonPresent(target, key);
	        }
	        return target[key];
	      }
	    };
	
	    initProxy = function initProxy(vm) {
	      if (hasProxy) {
	        // determine which proxy handler to use
	        var options = vm.$options;
	        var handlers = options.render && options.render._withStripped ? getHandler : hasHandler;
	        vm._renderProxy = new Proxy(vm, handlers);
	      } else {
	        vm._renderProxy = vm;
	      }
	    };
	  }
	
	  /*  */
	
	  var normalizeEvent = cached(function (name) {
	    var passive = name.charAt(0) === '&';
	    name = passive ? name.slice(1) : name;
	    var once$$1 = name.charAt(0) === '~'; // Prefixed last, checked first
	    name = once$$1 ? name.slice(1) : name;
	    var capture = name.charAt(0) === '!';
	    name = capture ? name.slice(1) : name;
	    return {
	      name: name,
	      once: once$$1,
	      capture: capture,
	      passive: passive
	    };
	  });
	
	  function createFnInvoker(fns) {
	    function invoker() {
	      var arguments$1 = arguments;
	
	      var fns = invoker.fns;
	      if (Array.isArray(fns)) {
	        var cloned = fns.slice();
	        for (var i = 0; i < cloned.length; i++) {
	          cloned[i].apply(null, arguments$1);
	        }
	      } else {
	        // return handler return value for single handlers
	        return fns.apply(null, arguments);
	      }
	    }
	    invoker.fns = fns;
	    return invoker;
	  }
	
	  function updateListeners(on, oldOn, add, remove$$1, vm) {
	    var name, cur, old, event;
	    for (name in on) {
	      cur = on[name];
	      old = oldOn[name];
	      event = normalizeEvent(name);
	      if (isUndef(cur)) {
	        "development" !== 'production' && warn("Invalid handler for event \"" + event.name + "\": got " + String(cur), vm);
	      } else if (isUndef(old)) {
	        if (isUndef(cur.fns)) {
	          cur = on[name] = createFnInvoker(cur);
	        }
	        add(event.name, cur, event.once, event.capture, event.passive);
	      } else if (cur !== old) {
	        old.fns = cur;
	        on[name] = old;
	      }
	    }
	    for (name in oldOn) {
	      if (isUndef(on[name])) {
	        event = normalizeEvent(name);
	        remove$$1(event.name, oldOn[name], event.capture);
	      }
	    }
	  }
	
	  /*  */
	
	  function mergeVNodeHook(def, hookKey, hook) {
	    var invoker;
	    var oldHook = def[hookKey];
	
	    function wrappedHook() {
	      hook.apply(this, arguments);
	      // important: remove merged hook to ensure it's called only once
	      // and prevent memory leak
	      remove(invoker.fns, wrappedHook);
	    }
	
	    if (isUndef(oldHook)) {
	      // no existing hook
	      invoker = createFnInvoker([wrappedHook]);
	    } else {
	      /* istanbul ignore if */
	      if (isDef(oldHook.fns) && isTrue(oldHook.merged)) {
	        // already a merged invoker
	        invoker = oldHook;
	        invoker.fns.push(wrappedHook);
	      } else {
	        // existing plain hook
	        invoker = createFnInvoker([oldHook, wrappedHook]);
	      }
	    }
	
	    invoker.merged = true;
	    def[hookKey] = invoker;
	  }
	
	  /*  */
	
	  function extractPropsFromVNodeData(data, Ctor, tag) {
	    // we are only extracting raw values here.
	    // validation and default values are handled in the child
	    // component itself.
	    var propOptions = Ctor.options.props;
	    if (isUndef(propOptions)) {
	      return;
	    }
	    var res = {};
	    var attrs = data.attrs;
	    var props = data.props;
	    if (isDef(attrs) || isDef(props)) {
	      for (var key in propOptions) {
	        var altKey = hyphenate(key);
	        {
	          var keyInLowerCase = key.toLowerCase();
	          if (key !== keyInLowerCase && attrs && hasOwn(attrs, keyInLowerCase)) {
	            tip("Prop \"" + keyInLowerCase + "\" is passed to component " + formatComponentName(tag || Ctor) + ", but the declared prop name is" + " \"" + key + "\". " + "Note that HTML attributes are case-insensitive and camelCased " + "props need to use their kebab-case equivalents when using in-DOM " + "templates. You should probably use \"" + altKey + "\" instead of \"" + key + "\".");
	          }
	        }
	        checkProp(res, props, key, altKey, true) || checkProp(res, attrs, key, altKey, false);
	      }
	    }
	    return res;
	  }
	
	  function checkProp(res, hash, key, altKey, preserve) {
	    if (isDef(hash)) {
	      if (hasOwn(hash, key)) {
	        res[key] = hash[key];
	        if (!preserve) {
	          delete hash[key];
	        }
	        return true;
	      } else if (hasOwn(hash, altKey)) {
	        res[key] = hash[altKey];
	        if (!preserve) {
	          delete hash[altKey];
	        }
	        return true;
	      }
	    }
	    return false;
	  }
	
	  /*  */
	
	  // The template compiler attempts to minimize the need for normalization by
	  // statically analyzing the template at compile time.
	  //
	  // For plain HTML markup, normalization can be completely skipped because the
	  // generated render function is guaranteed to return Array<VNode>. There are
	  // two cases where extra normalization is needed:
	
	  // 1. When the children contains components - because a functional component
	  // may return an Array instead of a single root. In this case, just a simple
	  // normalization is needed - if any child is an Array, we flatten the whole
	  // thing with Array.prototype.concat. It is guaranteed to be only 1-level deep
	  // because functional components already normalize their own children.
	  function simpleNormalizeChildren(children) {
	    for (var i = 0; i < children.length; i++) {
	      if (Array.isArray(children[i])) {
	        return Array.prototype.concat.apply([], children);
	      }
	    }
	    return children;
	  }
	
	  // 2. When the children contains constructs that always generated nested Arrays,
	  // e.g. <template>, <slot>, v-for, or when the children is provided by user
	  // with hand-written render functions / JSX. In such cases a full normalization
	  // is needed to cater to all possible types of children values.
	  function normalizeChildren(children) {
	    return isPrimitive(children) ? [createTextVNode(children)] : Array.isArray(children) ? normalizeArrayChildren(children) : undefined;
	  }
	
	  function isTextNode(node) {
	    return isDef(node) && isDef(node.text) && isFalse(node.isComment);
	  }
	
	  function normalizeArrayChildren(children, nestedIndex) {
	    var res = [];
	    var i, c, lastIndex, last;
	    for (i = 0; i < children.length; i++) {
	      c = children[i];
	      if (isUndef(c) || typeof c === 'boolean') {
	        continue;
	      }
	      lastIndex = res.length - 1;
	      last = res[lastIndex];
	      //  nested
	      if (Array.isArray(c)) {
	        if (c.length > 0) {
	          c = normalizeArrayChildren(c, (nestedIndex || '') + "_" + i);
	          // merge adjacent text nodes
	          if (isTextNode(c[0]) && isTextNode(last)) {
	            res[lastIndex] = createTextVNode(last.text + c[0].text);
	            c.shift();
	          }
	          res.push.apply(res, c);
	        }
	      } else if (isPrimitive(c)) {
	        if (isTextNode(last)) {
	          // merge adjacent text nodes
	          // this is necessary for SSR hydration because text nodes are
	          // essentially merged when rendered to HTML strings
	          res[lastIndex] = createTextVNode(last.text + c);
	        } else if (c !== '') {
	          // convert primitive to vnode
	          res.push(createTextVNode(c));
	        }
	      } else {
	        if (isTextNode(c) && isTextNode(last)) {
	          // merge adjacent text nodes
	          res[lastIndex] = createTextVNode(last.text + c.text);
	        } else {
	          // default key for nested array children (likely generated by v-for)
	          if (isTrue(children._isVList) && isDef(c.tag) && isUndef(c.key) && isDef(nestedIndex)) {
	            c.key = "__vlist" + nestedIndex + "_" + i + "__";
	          }
	          res.push(c);
	        }
	      }
	    }
	    return res;
	  }
	
	  /*  */
	
	  function ensureCtor(comp, base) {
	    if (comp.__esModule || hasSymbol && comp[Symbol.toStringTag] === 'Module') {
	      comp = comp.default;
	    }
	    return isObject(comp) ? base.extend(comp) : comp;
	  }
	
	  function createAsyncPlaceholder(factory, data, context, children, tag) {
	    var node = createEmptyVNode();
	    node.asyncFactory = factory;
	    node.asyncMeta = { data: data, context: context, children: children, tag: tag };
	    return node;
	  }
	
	  function resolveAsyncComponent(factory, baseCtor, context) {
	    if (isTrue(factory.error) && isDef(factory.errorComp)) {
	      return factory.errorComp;
	    }
	
	    if (isDef(factory.resolved)) {
	      return factory.resolved;
	    }
	
	    if (isTrue(factory.loading) && isDef(factory.loadingComp)) {
	      return factory.loadingComp;
	    }
	
	    if (isDef(factory.contexts)) {
	      // already pending
	      factory.contexts.push(context);
	    } else {
	      var contexts = factory.contexts = [context];
	      var sync = true;
	
	      var forceRender = function forceRender() {
	        for (var i = 0, l = contexts.length; i < l; i++) {
	          contexts[i].$forceUpdate();
	        }
	      };
	
	      var resolve = once(function (res) {
	        // cache resolved
	        factory.resolved = ensureCtor(res, baseCtor);
	        // invoke callbacks only if this is not a synchronous resolve
	        // (async resolves are shimmed as synchronous during SSR)
	        if (!sync) {
	          forceRender();
	        }
	      });
	
	      var reject = once(function (reason) {
	        "development" !== 'production' && warn("Failed to resolve async component: " + String(factory) + (reason ? "\nReason: " + reason : ''));
	        if (isDef(factory.errorComp)) {
	          factory.error = true;
	          forceRender();
	        }
	      });
	
	      var res = factory(resolve, reject);
	
	      if (isObject(res)) {
	        if (typeof res.then === 'function') {
	          // () => Promise
	          if (isUndef(factory.resolved)) {
	            res.then(resolve, reject);
	          }
	        } else if (isDef(res.component) && typeof res.component.then === 'function') {
	          res.component.then(resolve, reject);
	
	          if (isDef(res.error)) {
	            factory.errorComp = ensureCtor(res.error, baseCtor);
	          }
	
	          if (isDef(res.loading)) {
	            factory.loadingComp = ensureCtor(res.loading, baseCtor);
	            if (res.delay === 0) {
	              factory.loading = true;
	            } else {
	              setTimeout(function () {
	                if (isUndef(factory.resolved) && isUndef(factory.error)) {
	                  factory.loading = true;
	                  forceRender();
	                }
	              }, res.delay || 200);
	            }
	          }
	
	          if (isDef(res.timeout)) {
	            setTimeout(function () {
	              if (isUndef(factory.resolved)) {
	                reject("timeout (" + res.timeout + "ms)");
	              }
	            }, res.timeout);
	          }
	        }
	      }
	
	      sync = false;
	      // return in case resolved synchronously
	      return factory.loading ? factory.loadingComp : factory.resolved;
	    }
	  }
	
	  /*  */
	
	  function isAsyncPlaceholder(node) {
	    return node.isComment && node.asyncFactory;
	  }
	
	  /*  */
	
	  function getFirstComponentChild(children) {
	    if (Array.isArray(children)) {
	      for (var i = 0; i < children.length; i++) {
	        var c = children[i];
	        if (isDef(c) && (isDef(c.componentOptions) || isAsyncPlaceholder(c))) {
	          return c;
	        }
	      }
	    }
	  }
	
	  /*  */
	
	  /*  */
	
	  function initEvents(vm) {
	    vm._events = Object.create(null);
	    vm._hasHookEvent = false;
	    // init parent attached events
	    var listeners = vm.$options._parentListeners;
	    if (listeners) {
	      updateComponentListeners(vm, listeners);
	    }
	  }
	
	  var target;
	
	  function add(event, fn, once) {
	    if (once) {
	      target.$once(event, fn);
	    } else {
	      target.$on(event, fn);
	    }
	  }
	
	  function remove$1(event, fn) {
	    target.$off(event, fn);
	  }
	
	  function updateComponentListeners(vm, listeners, oldListeners) {
	    target = vm;
	    updateListeners(listeners, oldListeners || {}, add, remove$1, vm);
	  }
	
	  function eventsMixin(Vue) {
	    var hookRE = /^hook:/;
	    Vue.prototype.$on = function (event, fn) {
	      var this$1 = this;
	
	      var vm = this;
	      if (Array.isArray(event)) {
	        for (var i = 0, l = event.length; i < l; i++) {
	          this$1.$on(event[i], fn);
	        }
	      } else {
	        (vm._events[event] || (vm._events[event] = [])).push(fn);
	        // optimize hook:event cost by using a boolean flag marked at registration
	        // instead of a hash lookup
	        if (hookRE.test(event)) {
	          vm._hasHookEvent = true;
	        }
	      }
	      return vm;
	    };
	
	    Vue.prototype.$once = function (event, fn) {
	      var vm = this;
	      function on() {
	        vm.$off(event, on);
	        fn.apply(vm, arguments);
	      }
	      on.fn = fn;
	      vm.$on(event, on);
	      return vm;
	    };
	
	    Vue.prototype.$off = function (event, fn) {
	      var this$1 = this;
	
	      var vm = this;
	      // all
	      if (!arguments.length) {
	        vm._events = Object.create(null);
	        return vm;
	      }
	      // array of events
	      if (Array.isArray(event)) {
	        for (var i = 0, l = event.length; i < l; i++) {
	          this$1.$off(event[i], fn);
	        }
	        return vm;
	      }
	      // specific event
	      var cbs = vm._events[event];
	      if (!cbs) {
	        return vm;
	      }
	      if (arguments.length === 1) {
	        vm._events[event] = null;
	        return vm;
	      }
	      if (fn) {
	        // specific handler
	        var cb;
	        var i$1 = cbs.length;
	        while (i$1--) {
	          cb = cbs[i$1];
	          if (cb === fn || cb.fn === fn) {
	            cbs.splice(i$1, 1);
	            break;
	          }
	        }
	      }
	      return vm;
	    };
	
	    Vue.prototype.$emit = function (event) {
	      var vm = this;
	      {
	        var lowerCaseEvent = event.toLowerCase();
	        if (lowerCaseEvent !== event && vm._events[lowerCaseEvent]) {
	          tip("Event \"" + lowerCaseEvent + "\" is emitted in component " + formatComponentName(vm) + " but the handler is registered for \"" + event + "\". " + "Note that HTML attributes are case-insensitive and you cannot use " + "v-on to listen to camelCase events when using in-DOM templates. " + "You should probably use \"" + hyphenate(event) + "\" instead of \"" + event + "\".");
	        }
	      }
	      var cbs = vm._events[event];
	      if (cbs) {
	        cbs = cbs.length > 1 ? toArray(cbs) : cbs;
	        var args = toArray(arguments, 1);
	        for (var i = 0, l = cbs.length; i < l; i++) {
	          try {
	            cbs[i].apply(vm, args);
	          } catch (e) {
	            handleError(e, vm, "event handler for \"" + event + "\"");
	          }
	        }
	      }
	      return vm;
	    };
	  }
	
	  /*  */
	
	  /**
	   * Runtime helper for resolving raw children VNodes into a slot object.
	   */
	  function resolveSlots(children, context) {
	    var slots = {};
	    if (!children) {
	      return slots;
	    }
	    var defaultSlot = [];
	    for (var i = 0, l = children.length; i < l; i++) {
	      var child = children[i];
	      var data = child.data;
	      // remove slot attribute if the node is resolved as a Vue slot node
	      if (data && data.attrs && data.attrs.slot) {
	        delete data.attrs.slot;
	      }
	      // named slots should only be respected if the vnode was rendered in the
	      // same context.
	      if ((child.context === context || child.functionalContext === context) && data && data.slot != null) {
	        var name = child.data.slot;
	        var slot = slots[name] || (slots[name] = []);
	        if (child.tag === 'template') {
	          slot.push.apply(slot, child.children);
	        } else {
	          slot.push(child);
	        }
	      } else {
	        defaultSlot.push(child);
	      }
	    }
	    // ignore whitespace
	    if (!defaultSlot.every(isWhitespace)) {
	      slots.default = defaultSlot;
	    }
	    return slots;
	  }
	
	  function isWhitespace(node) {
	    return node.isComment || node.text === ' ';
	  }
	
	  function resolveScopedSlots(fns, // see flow/vnode
	  res) {
	    res = res || {};
	    for (var i = 0; i < fns.length; i++) {
	      if (Array.isArray(fns[i])) {
	        resolveScopedSlots(fns[i], res);
	      } else {
	        res[fns[i].key] = fns[i].fn;
	      }
	    }
	    return res;
	  }
	
	  /*  */
	
	  var activeInstance = null;
	  var isUpdatingChildComponent = false;
	
	  function initLifecycle(vm) {
	    var options = vm.$options;
	
	    // locate first non-abstract parent
	    var parent = options.parent;
	    if (parent && !options.abstract) {
	      while (parent.$options.abstract && parent.$parent) {
	        parent = parent.$parent;
	      }
	      parent.$children.push(vm);
	    }
	
	    vm.$parent = parent;
	    vm.$root = parent ? parent.$root : vm;
	
	    vm.$children = [];
	    vm.$refs = {};
	
	    vm._watcher = null;
	    vm._inactive = null;
	    vm._directInactive = false;
	    vm._isMounted = false;
	    vm._isDestroyed = false;
	    vm._isBeingDestroyed = false;
	  }
	
	  function lifecycleMixin(Vue) {
	    Vue.prototype._update = function (vnode, hydrating) {
	      var vm = this;
	      if (vm._isMounted) {
	        callHook(vm, 'beforeUpdate');
	      }
	      var prevEl = vm.$el;
	      var prevVnode = vm._vnode;
	      var prevActiveInstance = activeInstance;
	      activeInstance = vm;
	      vm._vnode = vnode;
	      // Vue.prototype.__patch__ is injected in entry points
	      // based on the rendering backend used.
	      if (!prevVnode) {
	        // initial render
	        vm.$el = vm.__patch__(vm.$el, vnode, hydrating, false /* removeOnly */
	        , vm.$options._parentElm, vm.$options._refElm);
	        // no need for the ref nodes after initial patch
	        // this prevents keeping a detached DOM tree in memory (#5851)
	        vm.$options._parentElm = vm.$options._refElm = null;
	      } else {
	        // updates
	        vm.$el = vm.__patch__(prevVnode, vnode);
	      }
	      activeInstance = prevActiveInstance;
	      // update __vue__ reference
	      if (prevEl) {
	        prevEl.__vue__ = null;
	      }
	      if (vm.$el) {
	        vm.$el.__vue__ = vm;
	      }
	      // if parent is an HOC, update its $el as well
	      if (vm.$vnode && vm.$parent && vm.$vnode === vm.$parent._vnode) {
	        vm.$parent.$el = vm.$el;
	      }
	      // updated hook is called by the scheduler to ensure that children are
	      // updated in a parent's updated hook.
	    };
	
	    Vue.prototype.$forceUpdate = function () {
	      var vm = this;
	      if (vm._watcher) {
	        vm._watcher.update();
	      }
	    };
	
	    Vue.prototype.$destroy = function () {
	      var vm = this;
	      if (vm._isBeingDestroyed) {
	        return;
	      }
	      callHook(vm, 'beforeDestroy');
	      vm._isBeingDestroyed = true;
	      // remove self from parent
	      var parent = vm.$parent;
	      if (parent && !parent._isBeingDestroyed && !vm.$options.abstract) {
	        remove(parent.$children, vm);
	      }
	      // teardown watchers
	      if (vm._watcher) {
	        vm._watcher.teardown();
	      }
	      var i = vm._watchers.length;
	      while (i--) {
	        vm._watchers[i].teardown();
	      }
	      // remove reference from data ob
	      // frozen object may not have observer.
	      if (vm._data.__ob__) {
	        vm._data.__ob__.vmCount--;
	      }
	      // call the last hook...
	      vm._isDestroyed = true;
	      // invoke destroy hooks on current rendered tree
	      vm.__patch__(vm._vnode, null);
	      // fire destroyed hook
	      callHook(vm, 'destroyed');
	      // turn off all instance listeners.
	      vm.$off();
	      // remove __vue__ reference
	      if (vm.$el) {
	        vm.$el.__vue__ = null;
	      }
	      // release circular reference (#6759)
	      if (vm.$vnode) {
	        vm.$vnode.parent = null;
	      }
	    };
	  }
	
	  function mountComponent(vm, el, hydrating) {
	    vm.$el = el;
	    if (!vm.$options.render) {
	      vm.$options.render = createEmptyVNode;
	      {
	        /* istanbul ignore if */
	        if (vm.$options.template && vm.$options.template.charAt(0) !== '#' || vm.$options.el || el) {
	          warn('You are using the runtime-only build of Vue where the template ' + 'compiler is not available. Either pre-compile the templates into ' + 'render functions, or use the compiler-included build.', vm);
	        } else {
	          warn('Failed to mount component: template or render function not defined.', vm);
	        }
	      }
	    }
	    callHook(vm, 'beforeMount');
	
	    var updateComponent;
	    /* istanbul ignore if */
	    if ("development" !== 'production' && config.performance && mark) {
	      updateComponent = function updateComponent() {
	        var name = vm._name;
	        var id = vm._uid;
	        var startTag = "vue-perf-start:" + id;
	        var endTag = "vue-perf-end:" + id;
	
	        mark(startTag);
	        var vnode = vm._render();
	        mark(endTag);
	        measure("vue " + name + " render", startTag, endTag);
	
	        mark(startTag);
	        vm._update(vnode, hydrating);
	        mark(endTag);
	        measure("vue " + name + " patch", startTag, endTag);
	      };
	    } else {
	      updateComponent = function updateComponent() {
	        vm._update(vm._render(), hydrating);
	      };
	    }
	
	    vm._watcher = new Watcher(vm, updateComponent, noop);
	    hydrating = false;
	
	    // manually mounted instance, call mounted on self
	    // mounted is called for render-created child components in its inserted hook
	    if (vm.$vnode == null) {
	      vm._isMounted = true;
	      callHook(vm, 'mounted');
	    }
	    return vm;
	  }
	
	  function updateChildComponent(vm, propsData, listeners, parentVnode, renderChildren) {
	    {
	      isUpdatingChildComponent = true;
	    }
	
	    // determine whether component has slot children
	    // we need to do this before overwriting $options._renderChildren
	    var hasChildren = !!(renderChildren || // has new static slots
	    vm.$options._renderChildren || // has old static slots
	    parentVnode.data.scopedSlots || // has new scoped slots
	    vm.$scopedSlots !== emptyObject // has old scoped slots
	    );
	
	    vm.$options._parentVnode = parentVnode;
	    vm.$vnode = parentVnode; // update vm's placeholder node without re-render
	
	    if (vm._vnode) {
	      // update child tree's parent
	      vm._vnode.parent = parentVnode;
	    }
	    vm.$options._renderChildren = renderChildren;
	
	    // update $attrs and $listeners hash
	    // these are also reactive so they may trigger child update if the child
	    // used them during render
	    vm.$attrs = parentVnode.data && parentVnode.data.attrs || emptyObject;
	    vm.$listeners = listeners || emptyObject;
	
	    // update props
	    if (propsData && vm.$options.props) {
	      observerState.shouldConvert = false;
	      var props = vm._props;
	      var propKeys = vm.$options._propKeys || [];
	      for (var i = 0; i < propKeys.length; i++) {
	        var key = propKeys[i];
	        props[key] = validateProp(key, vm.$options.props, propsData, vm);
	      }
	      observerState.shouldConvert = true;
	      // keep a copy of raw propsData
	      vm.$options.propsData = propsData;
	    }
	
	    // update listeners
	    if (listeners) {
	      var oldListeners = vm.$options._parentListeners;
	      vm.$options._parentListeners = listeners;
	      updateComponentListeners(vm, listeners, oldListeners);
	    }
	    // resolve slots + force update if has children
	    if (hasChildren) {
	      vm.$slots = resolveSlots(renderChildren, parentVnode.context);
	      vm.$forceUpdate();
	    }
	
	    {
	      isUpdatingChildComponent = false;
	    }
	  }
	
	  function isInInactiveTree(vm) {
	    while (vm && (vm = vm.$parent)) {
	      if (vm._inactive) {
	        return true;
	      }
	    }
	    return false;
	  }
	
	  function activateChildComponent(vm, direct) {
	    if (direct) {
	      vm._directInactive = false;
	      if (isInInactiveTree(vm)) {
	        return;
	      }
	    } else if (vm._directInactive) {
	      return;
	    }
	    if (vm._inactive || vm._inactive === null) {
	      vm._inactive = false;
	      for (var i = 0; i < vm.$children.length; i++) {
	        activateChildComponent(vm.$children[i]);
	      }
	      callHook(vm, 'activated');
	    }
	  }
	
	  function deactivateChildComponent(vm, direct) {
	    if (direct) {
	      vm._directInactive = true;
	      if (isInInactiveTree(vm)) {
	        return;
	      }
	    }
	    if (!vm._inactive) {
	      vm._inactive = true;
	      for (var i = 0; i < vm.$children.length; i++) {
	        deactivateChildComponent(vm.$children[i]);
	      }
	      callHook(vm, 'deactivated');
	    }
	  }
	
	  function callHook(vm, hook) {
	    var handlers = vm.$options[hook];
	    if (handlers) {
	      for (var i = 0, j = handlers.length; i < j; i++) {
	        try {
	          handlers[i].call(vm);
	        } catch (e) {
	          handleError(e, vm, hook + " hook");
	        }
	      }
	    }
	    if (vm._hasHookEvent) {
	      vm.$emit('hook:' + hook);
	    }
	  }
	
	  /*  */
	
	  var MAX_UPDATE_COUNT = 100;
	
	  var queue = [];
	  var activatedChildren = [];
	  var has = {};
	  var circular = {};
	  var waiting = false;
	  var flushing = false;
	  var index = 0;
	
	  /**
	   * Reset the scheduler's state.
	   */
	  function resetSchedulerState() {
	    index = queue.length = activatedChildren.length = 0;
	    has = {};
	    {
	      circular = {};
	    }
	    waiting = flushing = false;
	  }
	
	  /**
	   * Flush both queues and run the watchers.
	   */
	  function flushSchedulerQueue() {
	    flushing = true;
	    var watcher, id;
	
	    // Sort queue before flush.
	    // This ensures that:
	    // 1. Components are updated from parent to child. (because parent is always
	    //    created before the child)
	    // 2. A component's user watchers are run before its render watcher (because
	    //    user watchers are created before the render watcher)
	    // 3. If a component is destroyed during a parent component's watcher run,
	    //    its watchers can be skipped.
	    queue.sort(function (a, b) {
	      return a.id - b.id;
	    });
	
	    // do not cache length because more watchers might be pushed
	    // as we run existing watchers
	    for (index = 0; index < queue.length; index++) {
	      watcher = queue[index];
	      id = watcher.id;
	      has[id] = null;
	      watcher.run();
	      // in dev build, check and stop circular updates.
	      if ("development" !== 'production' && has[id] != null) {
	        circular[id] = (circular[id] || 0) + 1;
	        if (circular[id] > MAX_UPDATE_COUNT) {
	          warn('You may have an infinite update loop ' + (watcher.user ? "in watcher with expression \"" + watcher.expression + "\"" : "in a component render function."), watcher.vm);
	          break;
	        }
	      }
	    }
	
	    // keep copies of post queues before resetting state
	    var activatedQueue = activatedChildren.slice();
	    var updatedQueue = queue.slice();
	
	    resetSchedulerState();
	
	    // call component updated and activated hooks
	    callActivatedHooks(activatedQueue);
	    callUpdatedHooks(updatedQueue);
	
	    // devtool hook
	    /* istanbul ignore if */
	    if (devtools && config.devtools) {
	      devtools.emit('flush');
	    }
	  }
	
	  function callUpdatedHooks(queue) {
	    var i = queue.length;
	    while (i--) {
	      var watcher = queue[i];
	      var vm = watcher.vm;
	      if (vm._watcher === watcher && vm._isMounted) {
	        callHook(vm, 'updated');
	      }
	    }
	  }
	
	  /**
	   * Queue a kept-alive component that was activated during patch.
	   * The queue will be processed after the entire tree has been patched.
	   */
	  function queueActivatedComponent(vm) {
	    // setting _inactive to false here so that a render function can
	    // rely on checking whether it's in an inactive tree (e.g. router-view)
	    vm._inactive = false;
	    activatedChildren.push(vm);
	  }
	
	  function callActivatedHooks(queue) {
	    for (var i = 0; i < queue.length; i++) {
	      queue[i]._inactive = true;
	      activateChildComponent(queue[i], true /* true */);
	    }
	  }
	
	  /**
	   * Push a watcher into the watcher queue.
	   * Jobs with duplicate IDs will be skipped unless it's
	   * pushed when the queue is being flushed.
	   */
	  function queueWatcher(watcher) {
	    var id = watcher.id;
	    if (has[id] == null) {
	      has[id] = true;
	      if (!flushing) {
	        queue.push(watcher);
	      } else {
	        // if already flushing, splice the watcher based on its id
	        // if already past its id, it will be run next immediately.
	        var i = queue.length - 1;
	        while (i > index && queue[i].id > watcher.id) {
	          i--;
	        }
	        queue.splice(i + 1, 0, watcher);
	      }
	      // queue the flush
	      if (!waiting) {
	        waiting = true;
	        nextTick(flushSchedulerQueue);
	      }
	    }
	  }
	
	  /*  */
	
	  var uid$2 = 0;
	
	  /**
	   * A watcher parses an expression, collects dependencies,
	   * and fires callback when the expression value changes.
	   * This is used for both the $watch() api and directives.
	   */
	  var Watcher = function Watcher(vm, expOrFn, cb, options) {
	    this.vm = vm;
	    vm._watchers.push(this);
	    // options
	    if (options) {
	      this.deep = !!options.deep;
	      this.user = !!options.user;
	      this.lazy = !!options.lazy;
	      this.sync = !!options.sync;
	    } else {
	      this.deep = this.user = this.lazy = this.sync = false;
	    }
	    this.cb = cb;
	    this.id = ++uid$2; // uid for batching
	    this.active = true;
	    this.dirty = this.lazy; // for lazy watchers
	    this.deps = [];
	    this.newDeps = [];
	    this.depIds = new _Set();
	    this.newDepIds = new _Set();
	    this.expression = expOrFn.toString();
	    // parse expression for getter
	    if (typeof expOrFn === 'function') {
	      this.getter = expOrFn;
	    } else {
	      this.getter = parsePath(expOrFn);
	      if (!this.getter) {
	        this.getter = function () {};
	        "development" !== 'production' && warn("Failed watching path: \"" + expOrFn + "\" " + 'Watcher only accepts simple dot-delimited paths. ' + 'For full control, use a function instead.', vm);
	      }
	    }
	    this.value = this.lazy ? undefined : this.get();
	  };
	
	  /**
	   * Evaluate the getter, and re-collect dependencies.
	   */
	  Watcher.prototype.get = function get() {
	    pushTarget(this);
	    var value;
	    var vm = this.vm;
	    try {
	      value = this.getter.call(vm, vm);
	    } catch (e) {
	      if (this.user) {
	        handleError(e, vm, "getter for watcher \"" + this.expression + "\"");
	      } else {
	        throw e;
	      }
	    } finally {
	      // "touch" every property so they are all tracked as
	      // dependencies for deep watching
	      if (this.deep) {
	        traverse(value);
	      }
	      popTarget();
	      this.cleanupDeps();
	    }
	    return value;
	  };
	
	  /**
	   * Add a dependency to this directive.
	   */
	  Watcher.prototype.addDep = function addDep(dep) {
	    var id = dep.id;
	    if (!this.newDepIds.has(id)) {
	      this.newDepIds.add(id);
	      this.newDeps.push(dep);
	      if (!this.depIds.has(id)) {
	        dep.addSub(this);
	      }
	    }
	  };
	
	  /**
	   * Clean up for dependency collection.
	   */
	  Watcher.prototype.cleanupDeps = function cleanupDeps() {
	    var this$1 = this;
	
	    var i = this.deps.length;
	    while (i--) {
	      var dep = this$1.deps[i];
	      if (!this$1.newDepIds.has(dep.id)) {
	        dep.removeSub(this$1);
	      }
	    }
	    var tmp = this.depIds;
	    this.depIds = this.newDepIds;
	    this.newDepIds = tmp;
	    this.newDepIds.clear();
	    tmp = this.deps;
	    this.deps = this.newDeps;
	    this.newDeps = tmp;
	    this.newDeps.length = 0;
	  };
	
	  /**
	   * Subscriber interface.
	   * Will be called when a dependency changes.
	   */
	  Watcher.prototype.update = function update() {
	    /* istanbul ignore else */
	    if (this.lazy) {
	      this.dirty = true;
	    } else if (this.sync) {
	      this.run();
	    } else {
	      queueWatcher(this);
	    }
	  };
	
	  /**
	   * Scheduler job interface.
	   * Will be called by the scheduler.
	   */
	  Watcher.prototype.run = function run() {
	    if (this.active) {
	      var value = this.get();
	      if (value !== this.value ||
	      // Deep watchers and watchers on Object/Arrays should fire even
	      // when the value is the same, because the value may
	      // have mutated.
	      isObject(value) || this.deep) {
	        // set new value
	        var oldValue = this.value;
	        this.value = value;
	        if (this.user) {
	          try {
	            this.cb.call(this.vm, value, oldValue);
	          } catch (e) {
	            handleError(e, this.vm, "callback for watcher \"" + this.expression + "\"");
	          }
	        } else {
	          this.cb.call(this.vm, value, oldValue);
	        }
	      }
	    }
	  };
	
	  /**
	   * Evaluate the value of the watcher.
	   * This only gets called for lazy watchers.
	   */
	  Watcher.prototype.evaluate = function evaluate() {
	    this.value = this.get();
	    this.dirty = false;
	  };
	
	  /**
	   * Depend on all deps collected by this watcher.
	   */
	  Watcher.prototype.depend = function depend() {
	    var this$1 = this;
	
	    var i = this.deps.length;
	    while (i--) {
	      this$1.deps[i].depend();
	    }
	  };
	
	  /**
	   * Remove self from all dependencies' subscriber list.
	   */
	  Watcher.prototype.teardown = function teardown() {
	    var this$1 = this;
	
	    if (this.active) {
	      // remove self from vm's watcher list
	      // this is a somewhat expensive operation so we skip it
	      // if the vm is being destroyed.
	      if (!this.vm._isBeingDestroyed) {
	        remove(this.vm._watchers, this);
	      }
	      var i = this.deps.length;
	      while (i--) {
	        this$1.deps[i].removeSub(this$1);
	      }
	      this.active = false;
	    }
	  };
	
	  /**
	   * Recursively traverse an object to evoke all converted
	   * getters, so that every nested property inside the object
	   * is collected as a "deep" dependency.
	   */
	  var seenObjects = new _Set();
	  function traverse(val) {
	    seenObjects.clear();
	    _traverse(val, seenObjects);
	  }
	
	  function _traverse(val, seen) {
	    var i, keys;
	    var isA = Array.isArray(val);
	    if (!isA && !isObject(val) || !Object.isExtensible(val)) {
	      return;
	    }
	    if (val.__ob__) {
	      var depId = val.__ob__.dep.id;
	      if (seen.has(depId)) {
	        return;
	      }
	      seen.add(depId);
	    }
	    if (isA) {
	      i = val.length;
	      while (i--) {
	        _traverse(val[i], seen);
	      }
	    } else {
	      keys = Object.keys(val);
	      i = keys.length;
	      while (i--) {
	        _traverse(val[keys[i]], seen);
	      }
	    }
	  }
	
	  /*  */
	
	  var sharedPropertyDefinition = {
	    enumerable: true,
	    configurable: true,
	    get: noop,
	    set: noop
	  };
	
	  function proxy(target, sourceKey, key) {
	    sharedPropertyDefinition.get = function proxyGetter() {
	      return this[sourceKey][key];
	    };
	    sharedPropertyDefinition.set = function proxySetter(val) {
	      this[sourceKey][key] = val;
	    };
	    Object.defineProperty(target, key, sharedPropertyDefinition);
	  }
	
	  function initState(vm) {
	    vm._watchers = [];
	    var opts = vm.$options;
	    if (opts.props) {
	      initProps(vm, opts.props);
	    }
	    if (opts.methods) {
	      initMethods(vm, opts.methods);
	    }
	    if (opts.data) {
	      initData(vm);
	    } else {
	      observe(vm._data = {}, true /* asRootData */);
	    }
	    if (opts.computed) {
	      initComputed(vm, opts.computed);
	    }
	    if (opts.watch && opts.watch !== nativeWatch) {
	      initWatch(vm, opts.watch);
	    }
	  }
	
	  function initProps(vm, propsOptions) {
	    var propsData = vm.$options.propsData || {};
	    var props = vm._props = {};
	    // cache prop keys so that future props updates can iterate using Array
	    // instead of dynamic object key enumeration.
	    var keys = vm.$options._propKeys = [];
	    var isRoot = !vm.$parent;
	    // root instance props should be converted
	    observerState.shouldConvert = isRoot;
	    var loop = function loop(key) {
	      keys.push(key);
	      var value = validateProp(key, propsOptions, propsData, vm);
	      /* istanbul ignore else */
	      {
	        var hyphenatedKey = hyphenate(key);
	        if (isReservedAttribute(hyphenatedKey) || config.isReservedAttr(hyphenatedKey)) {
	          warn("\"" + hyphenatedKey + "\" is a reserved attribute and cannot be used as component prop.", vm);
	        }
	        defineReactive(props, key, value, function () {
	          if (vm.$parent && !isUpdatingChildComponent) {
	            warn("Avoid mutating a prop directly since the value will be " + "overwritten whenever the parent component re-renders. " + "Instead, use a data or computed property based on the prop's " + "value. Prop being mutated: \"" + key + "\"", vm);
	          }
	        });
	      }
	      // static props are already proxied on the component's prototype
	      // during Vue.extend(). We only need to proxy props defined at
	      // instantiation here.
	      if (!(key in vm)) {
	        proxy(vm, "_props", key);
	      }
	    };
	
	    for (var key in propsOptions) {
	      loop(key);
	    }observerState.shouldConvert = true;
	  }
	
	  function initData(vm) {
	    var data = vm.$options.data;
	    data = vm._data = typeof data === 'function' ? getData(data, vm) : data || {};
	    if (!isPlainObject(data)) {
	      data = {};
	      "development" !== 'production' && warn('data functions should return an object:\n' + 'https://vuejs.org/v2/guide/components.html#data-Must-Be-a-Function', vm);
	    }
	    // proxy data on instance
	    var keys = Object.keys(data);
	    var props = vm.$options.props;
	    var methods = vm.$options.methods;
	    var i = keys.length;
	    while (i--) {
	      var key = keys[i];
	      {
	        if (methods && hasOwn(methods, key)) {
	          warn("Method \"" + key + "\" has already been defined as a data property.", vm);
	        }
	      }
	      if (props && hasOwn(props, key)) {
	        "development" !== 'production' && warn("The data property \"" + key + "\" is already declared as a prop. " + "Use prop default value instead.", vm);
	      } else if (!isReserved(key)) {
	        proxy(vm, "_data", key);
	      }
	    }
	    // observe data
	    observe(data, true /* asRootData */);
	  }
	
	  function getData(data, vm) {
	    try {
	      return data.call(vm, vm);
	    } catch (e) {
	      handleError(e, vm, "data()");
	      return {};
	    }
	  }
	
	  var computedWatcherOptions = { lazy: true };
	
	  function initComputed(vm, computed) {
	    var watchers = vm._computedWatchers = Object.create(null);
	    // computed properties are just getters during SSR
	    var isSSR = isServerRendering();
	
	    for (var key in computed) {
	      var userDef = computed[key];
	      var getter = typeof userDef === 'function' ? userDef : userDef.get;
	      if ("development" !== 'production' && getter == null) {
	        warn("Getter is missing for computed property \"" + key + "\".", vm);
	      }
	
	      if (!isSSR) {
	        // create internal watcher for the computed property.
	        watchers[key] = new Watcher(vm, getter || noop, noop, computedWatcherOptions);
	      }
	
	      // component-defined computed properties are already defined on the
	      // component prototype. We only need to define computed properties defined
	      // at instantiation here.
	      if (!(key in vm)) {
	        defineComputed(vm, key, userDef);
	      } else {
	        if (key in vm.$data) {
	          warn("The computed property \"" + key + "\" is already defined in data.", vm);
	        } else if (vm.$options.props && key in vm.$options.props) {
	          warn("The computed property \"" + key + "\" is already defined as a prop.", vm);
	        }
	      }
	    }
	  }
	
	  function defineComputed(target, key, userDef) {
	    var shouldCache = !isServerRendering();
	    if (typeof userDef === 'function') {
	      sharedPropertyDefinition.get = shouldCache ? createComputedGetter(key) : userDef;
	      sharedPropertyDefinition.set = noop;
	    } else {
	      sharedPropertyDefinition.get = userDef.get ? shouldCache && userDef.cache !== false ? createComputedGetter(key) : userDef.get : noop;
	      sharedPropertyDefinition.set = userDef.set ? userDef.set : noop;
	    }
	    if ("development" !== 'production' && sharedPropertyDefinition.set === noop) {
	      sharedPropertyDefinition.set = function () {
	        warn("Computed property \"" + key + "\" was assigned to but it has no setter.", this);
	      };
	    }
	    Object.defineProperty(target, key, sharedPropertyDefinition);
	  }
	
	  function createComputedGetter(key) {
	    return function computedGetter() {
	      var watcher = this._computedWatchers && this._computedWatchers[key];
	      if (watcher) {
	        if (watcher.dirty) {
	          watcher.evaluate();
	        }
	        if (Dep.target) {
	          watcher.depend();
	        }
	        return watcher.value;
	      }
	    };
	  }
	
	  function initMethods(vm, methods) {
	    var props = vm.$options.props;
	    for (var key in methods) {
	      {
	        if (methods[key] == null) {
	          warn("Method \"" + key + "\" has an undefined value in the component definition. " + "Did you reference the function correctly?", vm);
	        }
	        if (props && hasOwn(props, key)) {
	          warn("Method \"" + key + "\" has already been defined as a prop.", vm);
	        }
	        if (key in vm && isReserved(key)) {
	          warn("Method \"" + key + "\" conflicts with an existing Vue instance method. " + "Avoid defining component methods that start with _ or $.");
	        }
	      }
	      vm[key] = methods[key] == null ? noop : bind(methods[key], vm);
	    }
	  }
	
	  function initWatch(vm, watch) {
	    for (var key in watch) {
	      var handler = watch[key];
	      if (Array.isArray(handler)) {
	        for (var i = 0; i < handler.length; i++) {
	          createWatcher(vm, key, handler[i]);
	        }
	      } else {
	        createWatcher(vm, key, handler);
	      }
	    }
	  }
	
	  function createWatcher(vm, keyOrFn, handler, options) {
	    if (isPlainObject(handler)) {
	      options = handler;
	      handler = handler.handler;
	    }
	    if (typeof handler === 'string') {
	      handler = vm[handler];
	    }
	    return vm.$watch(keyOrFn, handler, options);
	  }
	
	  function stateMixin(Vue) {
	    // flow somehow has problems with directly declared definition object
	    // when using Object.defineProperty, so we have to procedurally build up
	    // the object here.
	    var dataDef = {};
	    dataDef.get = function () {
	      return this._data;
	    };
	    var propsDef = {};
	    propsDef.get = function () {
	      return this._props;
	    };
	    {
	      dataDef.set = function (newData) {
	        warn('Avoid replacing instance root $data. ' + 'Use nested data properties instead.', this);
	      };
	      propsDef.set = function () {
	        warn("$props is readonly.", this);
	      };
	    }
	    Object.defineProperty(Vue.prototype, '$data', dataDef);
	    Object.defineProperty(Vue.prototype, '$props', propsDef);
	
	    Vue.prototype.$set = set;
	    Vue.prototype.$delete = del;
	
	    Vue.prototype.$watch = function (expOrFn, cb, options) {
	      var vm = this;
	      if (isPlainObject(cb)) {
	        return createWatcher(vm, expOrFn, cb, options);
	      }
	      options = options || {};
	      options.user = true;
	      var watcher = new Watcher(vm, expOrFn, cb, options);
	      if (options.immediate) {
	        cb.call(vm, watcher.value);
	      }
	      return function unwatchFn() {
	        watcher.teardown();
	      };
	    };
	  }
	
	  /*  */
	
	  function initProvide(vm) {
	    var provide = vm.$options.provide;
	    if (provide) {
	      vm._provided = typeof provide === 'function' ? provide.call(vm) : provide;
	    }
	  }
	
	  function initInjections(vm) {
	    var result = resolveInject(vm.$options.inject, vm);
	    if (result) {
	      observerState.shouldConvert = false;
	      Object.keys(result).forEach(function (key) {
	        /* istanbul ignore else */
	        {
	          defineReactive(vm, key, result[key], function () {
	            warn("Avoid mutating an injected value directly since the changes will be " + "overwritten whenever the provided component re-renders. " + "injection being mutated: \"" + key + "\"", vm);
	          });
	        }
	      });
	      observerState.shouldConvert = true;
	    }
	  }
	
	  function resolveInject(inject, vm) {
	    if (inject) {
	      // inject is :any because flow is not smart enough to figure out cached
	      var result = Object.create(null);
	      var keys = hasSymbol ? Reflect.ownKeys(inject).filter(function (key) {
	        /* istanbul ignore next */
	        return Object.getOwnPropertyDescriptor(inject, key).enumerable;
	      }) : Object.keys(inject);
	
	      for (var i = 0; i < keys.length; i++) {
	        var key = keys[i];
	        var provideKey = inject[key].from;
	        var source = vm;
	        while (source) {
	          if (source._provided && provideKey in source._provided) {
	            result[key] = source._provided[provideKey];
	            break;
	          }
	          source = source.$parent;
	        }
	        if (!source) {
	          if ('default' in inject[key]) {
	            var provideDefault = inject[key].default;
	            result[key] = typeof provideDefault === 'function' ? provideDefault.call(vm) : provideDefault;
	          } else {
	            warn("Injection \"" + key + "\" not found", vm);
	          }
	        }
	      }
	      return result;
	    }
	  }
	
	  /*  */
	
	  /**
	   * Runtime helper for rendering v-for lists.
	   */
	  function renderList(val, render) {
	    var ret, i, l, keys, key;
	    if (Array.isArray(val) || typeof val === 'string') {
	      ret = new Array(val.length);
	      for (i = 0, l = val.length; i < l; i++) {
	        ret[i] = render(val[i], i);
	      }
	    } else if (typeof val === 'number') {
	      ret = new Array(val);
	      for (i = 0; i < val; i++) {
	        ret[i] = render(i + 1, i);
	      }
	    } else if (isObject(val)) {
	      keys = Object.keys(val);
	      ret = new Array(keys.length);
	      for (i = 0, l = keys.length; i < l; i++) {
	        key = keys[i];
	        ret[i] = render(val[key], key, i);
	      }
	    }
	    if (isDef(ret)) {
	      ret._isVList = true;
	    }
	    return ret;
	  }
	
	  /*  */
	
	  /**
	   * Runtime helper for rendering <slot>
	   */
	  function renderSlot(name, fallback, props, bindObject) {
	    var scopedSlotFn = this.$scopedSlots[name];
	    if (scopedSlotFn) {
	      // scoped slot
	      props = props || {};
	      if (bindObject) {
	        if ("development" !== 'production' && !isObject(bindObject)) {
	          warn('slot v-bind without argument expects an Object', this);
	        }
	        props = extend(extend({}, bindObject), props);
	      }
	      return scopedSlotFn(props) || fallback;
	    } else {
	      var slotNodes = this.$slots[name];
	      // warn duplicate slot usage
	      if (slotNodes && "development" !== 'production') {
	        slotNodes._rendered && warn("Duplicate presence of slot \"" + name + "\" found in the same render tree " + "- this will likely cause render errors.", this);
	        slotNodes._rendered = true;
	      }
	      return slotNodes || fallback;
	    }
	  }
	
	  /*  */
	
	  /**
	   * Runtime helper for resolving filters
	   */
	  function resolveFilter(id) {
	    return resolveAsset(this.$options, 'filters', id, true) || identity;
	  }
	
	  /*  */
	
	  /**
	   * Runtime helper for checking keyCodes from config.
	   * exposed as Vue.prototype._k
	   * passing in eventKeyName as last argument separately for backwards compat
	   */
	  function checkKeyCodes(eventKeyCode, key, builtInAlias, eventKeyName) {
	    var keyCodes = config.keyCodes[key] || builtInAlias;
	    if (keyCodes) {
	      if (Array.isArray(keyCodes)) {
	        return keyCodes.indexOf(eventKeyCode) === -1;
	      } else {
	        return keyCodes !== eventKeyCode;
	      }
	    } else if (eventKeyName) {
	      return hyphenate(eventKeyName) !== key;
	    }
	  }
	
	  /*  */
	
	  /**
	   * Runtime helper for merging v-bind="object" into a VNode's data.
	   */
	  function bindObjectProps(data, tag, value, asProp, isSync) {
	    if (value) {
	      if (!isObject(value)) {
	        "development" !== 'production' && warn('v-bind without argument expects an Object or Array value', this);
	      } else {
	        if (Array.isArray(value)) {
	          value = toObject(value);
	        }
	        var hash;
	        var loop = function loop(key) {
	          if (key === 'class' || key === 'style' || isReservedAttribute(key)) {
	            hash = data;
	          } else {
	            var type = data.attrs && data.attrs.type;
	            hash = asProp || config.mustUseProp(tag, type, key) ? data.domProps || (data.domProps = {}) : data.attrs || (data.attrs = {});
	          }
	          if (!(key in hash)) {
	            hash[key] = value[key];
	
	            if (isSync) {
	              var on = data.on || (data.on = {});
	              on["update:" + key] = function ($event) {
	                value[key] = $event;
	              };
	            }
	          }
	        };
	
	        for (var key in value) {
	          loop(key);
	        }
	      }
	    }
	    return data;
	  }
	
	  /*  */
	
	  /**
	   * Runtime helper for rendering static trees.
	   */
	  function renderStatic(index, isInFor) {
	    // static trees can be rendered once and cached on the contructor options
	    // so every instance shares the same cached trees
	    var renderFns = this.$options.staticRenderFns;
	    var cached = renderFns.cached || (renderFns.cached = []);
	    var tree = cached[index];
	    // if has already-rendered static tree and not inside v-for,
	    // we can reuse the same tree by doing a shallow clone.
	    if (tree && !isInFor) {
	      return Array.isArray(tree) ? cloneVNodes(tree) : cloneVNode(tree);
	    }
	    // otherwise, render a fresh tree.
	    tree = cached[index] = renderFns[index].call(this._renderProxy, null, this);
	    markStatic(tree, "__static__" + index, false);
	    return tree;
	  }
	
	  /**
	   * Runtime helper for v-once.
	   * Effectively it means marking the node as static with a unique key.
	   */
	  function markOnce(tree, index, key) {
	    markStatic(tree, "__once__" + index + (key ? "_" + key : ""), true);
	    return tree;
	  }
	
	  function markStatic(tree, key, isOnce) {
	    if (Array.isArray(tree)) {
	      for (var i = 0; i < tree.length; i++) {
	        if (tree[i] && typeof tree[i] !== 'string') {
	          markStaticNode(tree[i], key + "_" + i, isOnce);
	        }
	      }
	    } else {
	      markStaticNode(tree, key, isOnce);
	    }
	  }
	
	  function markStaticNode(node, key, isOnce) {
	    node.isStatic = true;
	    node.key = key;
	    node.isOnce = isOnce;
	  }
	
	  /*  */
	
	  function bindObjectListeners(data, value) {
	    if (value) {
	      if (!isPlainObject(value)) {
	        "development" !== 'production' && warn('v-on without argument expects an Object value', this);
	      } else {
	        var on = data.on = data.on ? extend({}, data.on) : {};
	        for (var key in value) {
	          var existing = on[key];
	          var ours = value[key];
	          on[key] = existing ? [].concat(existing, ours) : ours;
	        }
	      }
	    }
	    return data;
	  }
	
	  /*  */
	
	  function installRenderHelpers(target) {
	    target._o = markOnce;
	    target._n = toNumber;
	    target._s = toString;
	    target._l = renderList;
	    target._t = renderSlot;
	    target._q = looseEqual;
	    target._i = looseIndexOf;
	    target._m = renderStatic;
	    target._f = resolveFilter;
	    target._k = checkKeyCodes;
	    target._b = bindObjectProps;
	    target._v = createTextVNode;
	    target._e = createEmptyVNode;
	    target._u = resolveScopedSlots;
	    target._g = bindObjectListeners;
	  }
	
	  /*  */
	
	  function FunctionalRenderContext(data, props, children, parent, Ctor) {
	    var options = Ctor.options;
	    this.data = data;
	    this.props = props;
	    this.children = children;
	    this.parent = parent;
	    this.listeners = data.on || emptyObject;
	    this.injections = resolveInject(options.inject, parent);
	    this.slots = function () {
	      return resolveSlots(children, parent);
	    };
	
	    // ensure the createElement function in functional components
	    // gets a unique context - this is necessary for correct named slot check
	    var contextVm = Object.create(parent);
	    var isCompiled = isTrue(options._compiled);
	    var needNormalization = !isCompiled;
	
	    // support for compiled functional template
	    if (isCompiled) {
	      // exposing $options for renderStatic()
	      this.$options = options;
	      // pre-resolve slots for renderSlot()
	      this.$slots = this.slots();
	      this.$scopedSlots = data.scopedSlots || emptyObject;
	    }
	
	    if (options._scopeId) {
	      this._c = function (a, b, c, d) {
	        var vnode = createElement(contextVm, a, b, c, d, needNormalization);
	        if (vnode) {
	          vnode.functionalScopeId = options._scopeId;
	          vnode.functionalContext = parent;
	        }
	        return vnode;
	      };
	    } else {
	      this._c = function (a, b, c, d) {
	        return createElement(contextVm, a, b, c, d, needNormalization);
	      };
	    }
	  }
	
	  installRenderHelpers(FunctionalRenderContext.prototype);
	
	  function createFunctionalComponent(Ctor, propsData, data, contextVm, children) {
	    var options = Ctor.options;
	    var props = {};
	    var propOptions = options.props;
	    if (isDef(propOptions)) {
	      for (var key in propOptions) {
	        props[key] = validateProp(key, propOptions, propsData || emptyObject);
	      }
	    } else {
	      if (isDef(data.attrs)) {
	        mergeProps(props, data.attrs);
	      }
	      if (isDef(data.props)) {
	        mergeProps(props, data.props);
	      }
	    }
	
	    var renderContext = new FunctionalRenderContext(data, props, children, contextVm, Ctor);
	
	    var vnode = options.render.call(null, renderContext._c, renderContext);
	
	    if (vnode instanceof VNode) {
	      vnode.functionalContext = contextVm;
	      vnode.functionalOptions = options;
	      if (data.slot) {
	        (vnode.data || (vnode.data = {})).slot = data.slot;
	      }
	    }
	
	    return vnode;
	  }
	
	  function mergeProps(to, from) {
	    for (var key in from) {
	      to[camelize(key)] = from[key];
	    }
	  }
	
	  /*  */
	
	  // hooks to be invoked on component VNodes during patch
	  var componentVNodeHooks = {
	    init: function init(vnode, hydrating, parentElm, refElm) {
	      if (!vnode.componentInstance || vnode.componentInstance._isDestroyed) {
	        var child = vnode.componentInstance = createComponentInstanceForVnode(vnode, activeInstance, parentElm, refElm);
	        child.$mount(hydrating ? vnode.elm : undefined, hydrating);
	      } else if (vnode.data.keepAlive) {
	        // kept-alive components, treat as a patch
	        var mountedNode = vnode; // work around flow
	        componentVNodeHooks.prepatch(mountedNode, mountedNode);
	      }
	    },
	
	    prepatch: function prepatch(oldVnode, vnode) {
	      var options = vnode.componentOptions;
	      var child = vnode.componentInstance = oldVnode.componentInstance;
	      updateChildComponent(child, options.propsData, // updated props
	      options.listeners, // updated listeners
	      vnode, // new parent vnode
	      options.children // new children
	      );
	    },
	
	    insert: function insert(vnode) {
	      var context = vnode.context;
	      var componentInstance = vnode.componentInstance;
	      if (!componentInstance._isMounted) {
	        componentInstance._isMounted = true;
	        callHook(componentInstance, 'mounted');
	      }
	      if (vnode.data.keepAlive) {
	        if (context._isMounted) {
	          // vue-router#1212
	          // During updates, a kept-alive component's child components may
	          // change, so directly walking the tree here may call activated hooks
	          // on incorrect children. Instead we push them into a queue which will
	          // be processed after the whole patch process ended.
	          queueActivatedComponent(componentInstance);
	        } else {
	          activateChildComponent(componentInstance, true /* direct */);
	        }
	      }
	    },
	
	    destroy: function destroy(vnode) {
	      var componentInstance = vnode.componentInstance;
	      if (!componentInstance._isDestroyed) {
	        if (!vnode.data.keepAlive) {
	          componentInstance.$destroy();
	        } else {
	          deactivateChildComponent(componentInstance, true /* direct */);
	        }
	      }
	    }
	  };
	
	  var hooksToMerge = Object.keys(componentVNodeHooks);
	
	  function createComponent(Ctor, data, context, children, tag) {
	    if (isUndef(Ctor)) {
	      return;
	    }
	
	    var baseCtor = context.$options._base;
	
	    // plain options object: turn it into a constructor
	    if (isObject(Ctor)) {
	      Ctor = baseCtor.extend(Ctor);
	    }
	
	    // if at this stage it's not a constructor or an async component factory,
	    // reject.
	    if (typeof Ctor !== 'function') {
	      {
	        warn("Invalid Component definition: " + String(Ctor), context);
	      }
	      return;
	    }
	
	    // async component
	    var asyncFactory;
	    if (isUndef(Ctor.cid)) {
	      asyncFactory = Ctor;
	      Ctor = resolveAsyncComponent(asyncFactory, baseCtor, context);
	      if (Ctor === undefined) {
	        // return a placeholder node for async component, which is rendered
	        // as a comment node but preserves all the raw information for the node.
	        // the information will be used for async server-rendering and hydration.
	        return createAsyncPlaceholder(asyncFactory, data, context, children, tag);
	      }
	    }
	
	    data = data || {};
	
	    // resolve constructor options in case global mixins are applied after
	    // component constructor creation
	    resolveConstructorOptions(Ctor);
	
	    // transform component v-model data into props & events
	    if (isDef(data.model)) {
	      transformModel(Ctor.options, data);
	    }
	
	    // extract props
	    var propsData = extractPropsFromVNodeData(data, Ctor, tag);
	
	    // functional component
	    if (isTrue(Ctor.options.functional)) {
	      return createFunctionalComponent(Ctor, propsData, data, context, children);
	    }
	
	    // extract listeners, since these needs to be treated as
	    // child component listeners instead of DOM listeners
	    var listeners = data.on;
	    // replace with listeners with .native modifier
	    // so it gets processed during parent component patch.
	    data.on = data.nativeOn;
	
	    if (isTrue(Ctor.options.abstract)) {
	      // abstract components do not keep anything
	      // other than props & listeners & slot
	
	      // work around flow
	      var slot = data.slot;
	      data = {};
	      if (slot) {
	        data.slot = slot;
	      }
	    }
	
	    // merge component management hooks onto the placeholder node
	    mergeHooks(data);
	
	    // return a placeholder vnode
	    var name = Ctor.options.name || tag;
	    var vnode = new VNode("vue-component-" + Ctor.cid + (name ? "-" + name : ''), data, undefined, undefined, undefined, context, { Ctor: Ctor, propsData: propsData, listeners: listeners, tag: tag, children: children }, asyncFactory);
	    return vnode;
	  }
	
	  function createComponentInstanceForVnode(vnode, // we know it's MountedComponentVNode but flow doesn't
	  parent, // activeInstance in lifecycle state
	  parentElm, refElm) {
	    var vnodeComponentOptions = vnode.componentOptions;
	    var options = {
	      _isComponent: true,
	      parent: parent,
	      propsData: vnodeComponentOptions.propsData,
	      _componentTag: vnodeComponentOptions.tag,
	      _parentVnode: vnode,
	      _parentListeners: vnodeComponentOptions.listeners,
	      _renderChildren: vnodeComponentOptions.children,
	      _parentElm: parentElm || null,
	      _refElm: refElm || null
	    };
	    // check inline-template render functions
	    var inlineTemplate = vnode.data.inlineTemplate;
	    if (isDef(inlineTemplate)) {
	      options.render = inlineTemplate.render;
	      options.staticRenderFns = inlineTemplate.staticRenderFns;
	    }
	    return new vnodeComponentOptions.Ctor(options);
	  }
	
	  function mergeHooks(data) {
	    if (!data.hook) {
	      data.hook = {};
	    }
	    for (var i = 0; i < hooksToMerge.length; i++) {
	      var key = hooksToMerge[i];
	      var fromParent = data.hook[key];
	      var ours = componentVNodeHooks[key];
	      data.hook[key] = fromParent ? mergeHook$1(ours, fromParent) : ours;
	    }
	  }
	
	  function mergeHook$1(one, two) {
	    return function (a, b, c, d) {
	      one(a, b, c, d);
	      two(a, b, c, d);
	    };
	  }
	
	  // transform component v-model info (value and callback) into
	  // prop and event handler respectively.
	  function transformModel(options, data) {
	    var prop = options.model && options.model.prop || 'value';
	    var event = options.model && options.model.event || 'input';(data.props || (data.props = {}))[prop] = data.model.value;
	    var on = data.on || (data.on = {});
	    if (isDef(on[event])) {
	      on[event] = [data.model.callback].concat(on[event]);
	    } else {
	      on[event] = data.model.callback;
	    }
	  }
	
	  /*  */
	
	  var SIMPLE_NORMALIZE = 1;
	  var ALWAYS_NORMALIZE = 2;
	
	  // wrapper function for providing a more flexible interface
	  // without getting yelled at by flow
	  function createElement(context, tag, data, children, normalizationType, alwaysNormalize) {
	    if (Array.isArray(data) || isPrimitive(data)) {
	      normalizationType = children;
	      children = data;
	      data = undefined;
	    }
	    if (isTrue(alwaysNormalize)) {
	      normalizationType = ALWAYS_NORMALIZE;
	    }
	    return _createElement(context, tag, data, children, normalizationType);
	  }
	
	  function _createElement(context, tag, data, children, normalizationType) {
	    if (isDef(data) && isDef(data.__ob__)) {
	      "development" !== 'production' && warn("Avoid using observed data object as vnode data: " + JSON.stringify(data) + "\n" + 'Always create fresh vnode data objects in each render!', context);
	      return createEmptyVNode();
	    }
	    // object syntax in v-bind
	    if (isDef(data) && isDef(data.is)) {
	      tag = data.is;
	    }
	    if (!tag) {
	      // in case of component :is set to falsy value
	      return createEmptyVNode();
	    }
	    // warn against non-primitive key
	    if ("development" !== 'production' && isDef(data) && isDef(data.key) && !isPrimitive(data.key)) {
	      warn('Avoid using non-primitive value as key, ' + 'use string/number value instead.', context);
	    }
	    // support single function children as default scoped slot
	    if (Array.isArray(children) && typeof children[0] === 'function') {
	      data = data || {};
	      data.scopedSlots = { default: children[0] };
	      children.length = 0;
	    }
	    if (normalizationType === ALWAYS_NORMALIZE) {
	      children = normalizeChildren(children);
	    } else if (normalizationType === SIMPLE_NORMALIZE) {
	      children = simpleNormalizeChildren(children);
	    }
	    var vnode, ns;
	    if (typeof tag === 'string') {
	      var Ctor;
	      ns = context.$vnode && context.$vnode.ns || config.getTagNamespace(tag);
	      if (config.isReservedTag(tag)) {
	        // platform built-in elements
	        vnode = new VNode(config.parsePlatformTagName(tag), data, children, undefined, undefined, context);
	      } else if (isDef(Ctor = resolveAsset(context.$options, 'components', tag))) {
	        // component
	        vnode = createComponent(Ctor, data, context, children, tag);
	      } else {
	        // unknown or unlisted namespaced elements
	        // check at runtime because it may get assigned a namespace when its
	        // parent normalizes children
	        vnode = new VNode(tag, data, children, undefined, undefined, context);
	      }
	    } else {
	      // direct component options / constructor
	      vnode = createComponent(tag, data, context, children);
	    }
	    if (isDef(vnode)) {
	      if (ns) {
	        applyNS(vnode, ns);
	      }
	      return vnode;
	    } else {
	      return createEmptyVNode();
	    }
	  }
	
	  function applyNS(vnode, ns, force) {
	    vnode.ns = ns;
	    if (vnode.tag === 'foreignObject') {
	      // use default namespace inside foreignObject
	      ns = undefined;
	      force = true;
	    }
	    if (isDef(vnode.children)) {
	      for (var i = 0, l = vnode.children.length; i < l; i++) {
	        var child = vnode.children[i];
	        if (isDef(child.tag) && (isUndef(child.ns) || isTrue(force))) {
	          applyNS(child, ns, force);
	        }
	      }
	    }
	  }
	
	  /*  */
	
	  function initRender(vm) {
	    vm._vnode = null; // the root of the child tree
	    var options = vm.$options;
	    var parentVnode = vm.$vnode = options._parentVnode; // the placeholder node in parent tree
	    var renderContext = parentVnode && parentVnode.context;
	    vm.$slots = resolveSlots(options._renderChildren, renderContext);
	    vm.$scopedSlots = emptyObject;
	    // bind the createElement fn to this instance
	    // so that we get proper render context inside it.
	    // args order: tag, data, children, normalizationType, alwaysNormalize
	    // internal version is used by render functions compiled from templates
	    vm._c = function (a, b, c, d) {
	      return createElement(vm, a, b, c, d, false);
	    };
	    // normalization is always applied for the public version, used in
	    // user-written render functions.
	    vm.$createElement = function (a, b, c, d) {
	      return createElement(vm, a, b, c, d, true);
	    };
	
	    // $attrs & $listeners are exposed for easier HOC creation.
	    // they need to be reactive so that HOCs using them are always updated
	    var parentData = parentVnode && parentVnode.data;
	
	    /* istanbul ignore else */
	    {
	      defineReactive(vm, '$attrs', parentData && parentData.attrs || emptyObject, function () {
	        !isUpdatingChildComponent && warn("$attrs is readonly.", vm);
	      }, true);
	      defineReactive(vm, '$listeners', options._parentListeners || emptyObject, function () {
	        !isUpdatingChildComponent && warn("$listeners is readonly.", vm);
	      }, true);
	    }
	  }
	
	  function renderMixin(Vue) {
	    // install runtime convenience helpers
	    installRenderHelpers(Vue.prototype);
	
	    Vue.prototype.$nextTick = function (fn) {
	      return nextTick(fn, this);
	    };
	
	    Vue.prototype._render = function () {
	      var vm = this;
	      var ref = vm.$options;
	      var render = ref.render;
	      var _parentVnode = ref._parentVnode;
	
	      if (vm._isMounted) {
	        // if the parent didn't update, the slot nodes will be the ones from
	        // last render. They need to be cloned to ensure "freshness" for this render.
	        for (var key in vm.$slots) {
	          var slot = vm.$slots[key];
	          if (slot._rendered) {
	            vm.$slots[key] = cloneVNodes(slot, true /* deep */);
	          }
	        }
	      }
	
	      vm.$scopedSlots = _parentVnode && _parentVnode.data.scopedSlots || emptyObject;
	
	      // set parent vnode. this allows render functions to have access
	      // to the data on the placeholder node.
	      vm.$vnode = _parentVnode;
	      // render self
	      var vnode;
	      try {
	        vnode = render.call(vm._renderProxy, vm.$createElement);
	      } catch (e) {
	        handleError(e, vm, "render");
	        // return error render result,
	        // or previous vnode to prevent render error causing blank component
	        /* istanbul ignore else */
	        {
	          if (vm.$options.renderError) {
	            try {
	              vnode = vm.$options.renderError.call(vm._renderProxy, vm.$createElement, e);
	            } catch (e) {
	              handleError(e, vm, "renderError");
	              vnode = vm._vnode;
	            }
	          } else {
	            vnode = vm._vnode;
	          }
	        }
	      }
	      // return empty vnode in case the render function errored out
	      if (!(vnode instanceof VNode)) {
	        if ("development" !== 'production' && Array.isArray(vnode)) {
	          warn('Multiple root nodes returned from render function. Render function ' + 'should return a single root node.', vm);
	        }
	        vnode = createEmptyVNode();
	      }
	      // set parent
	      vnode.parent = _parentVnode;
	      return vnode;
	    };
	  }
	
	  /*  */
	
	  var uid$1 = 0;
	
	  function initMixin(Vue) {
	    Vue.prototype._init = function (options) {
	      var vm = this;
	      // a uid
	      vm._uid = uid$1++;
	
	      var startTag, endTag;
	      /* istanbul ignore if */
	      if ("development" !== 'production' && config.performance && mark) {
	        startTag = "vue-perf-start:" + vm._uid;
	        endTag = "vue-perf-end:" + vm._uid;
	        mark(startTag);
	      }
	
	      // a flag to avoid this being observed
	      vm._isVue = true;
	      // merge options
	      if (options && options._isComponent) {
	        // optimize internal component instantiation
	        // since dynamic options merging is pretty slow, and none of the
	        // internal component options needs special treatment.
	        initInternalComponent(vm, options);
	      } else {
	        vm.$options = mergeOptions(resolveConstructorOptions(vm.constructor), options || {}, vm);
	      }
	      /* istanbul ignore else */
	      {
	        initProxy(vm);
	      }
	      // expose real self
	      vm._self = vm;
	      initLifecycle(vm);
	      initEvents(vm);
	      initRender(vm);
	      callHook(vm, 'beforeCreate');
	      initInjections(vm); // resolve injections before data/props
	      initState(vm);
	      initProvide(vm); // resolve provide after data/props
	      callHook(vm, 'created');
	
	      /* istanbul ignore if */
	      if ("development" !== 'production' && config.performance && mark) {
	        vm._name = formatComponentName(vm, false);
	        mark(endTag);
	        measure("vue " + vm._name + " init", startTag, endTag);
	      }
	
	      if (vm.$options.el) {
	        vm.$mount(vm.$options.el);
	      }
	    };
	  }
	
	  function initInternalComponent(vm, options) {
	    var opts = vm.$options = Object.create(vm.constructor.options);
	    // doing this because it's faster than dynamic enumeration.
	    opts.parent = options.parent;
	    opts.propsData = options.propsData;
	    opts._parentVnode = options._parentVnode;
	    opts._parentListeners = options._parentListeners;
	    opts._renderChildren = options._renderChildren;
	    opts._componentTag = options._componentTag;
	    opts._parentElm = options._parentElm;
	    opts._refElm = options._refElm;
	    if (options.render) {
	      opts.render = options.render;
	      opts.staticRenderFns = options.staticRenderFns;
	    }
	  }
	
	  function resolveConstructorOptions(Ctor) {
	    var options = Ctor.options;
	    if (Ctor.super) {
	      var superOptions = resolveConstructorOptions(Ctor.super);
	      var cachedSuperOptions = Ctor.superOptions;
	      if (superOptions !== cachedSuperOptions) {
	        // super option changed,
	        // need to resolve new options.
	        Ctor.superOptions = superOptions;
	        // check if there are any late-modified/attached options (#4976)
	        var modifiedOptions = resolveModifiedOptions(Ctor);
	        // update base extend options
	        if (modifiedOptions) {
	          extend(Ctor.extendOptions, modifiedOptions);
	        }
	        options = Ctor.options = mergeOptions(superOptions, Ctor.extendOptions);
	        if (options.name) {
	          options.components[options.name] = Ctor;
	        }
	      }
	    }
	    return options;
	  }
	
	  function resolveModifiedOptions(Ctor) {
	    var modified;
	    var latest = Ctor.options;
	    var extended = Ctor.extendOptions;
	    var sealed = Ctor.sealedOptions;
	    for (var key in latest) {
	      if (latest[key] !== sealed[key]) {
	        if (!modified) {
	          modified = {};
	        }
	        modified[key] = dedupe(latest[key], extended[key], sealed[key]);
	      }
	    }
	    return modified;
	  }
	
	  function dedupe(latest, extended, sealed) {
	    // compare latest and sealed to ensure lifecycle hooks won't be duplicated
	    // between merges
	    if (Array.isArray(latest)) {
	      var res = [];
	      sealed = Array.isArray(sealed) ? sealed : [sealed];
	      extended = Array.isArray(extended) ? extended : [extended];
	      for (var i = 0; i < latest.length; i++) {
	        // push original options and not sealed options to exclude duplicated options
	        if (extended.indexOf(latest[i]) >= 0 || sealed.indexOf(latest[i]) < 0) {
	          res.push(latest[i]);
	        }
	      }
	      return res;
	    } else {
	      return latest;
	    }
	  }
	
	  function Vue$3(options) {
	    if ("development" !== 'production' && !(this instanceof Vue$3)) {
	      warn('Vue is a constructor and should be called with the `new` keyword');
	    }
	    this._init(options);
	  }
	
	  initMixin(Vue$3);
	  stateMixin(Vue$3);
	  eventsMixin(Vue$3);
	  lifecycleMixin(Vue$3);
	  renderMixin(Vue$3);
	
	  /*  */
	
	  function initUse(Vue) {
	    Vue.use = function (plugin) {
	      var installedPlugins = this._installedPlugins || (this._installedPlugins = []);
	      if (installedPlugins.indexOf(plugin) > -1) {
	        return this;
	      }
	
	      // additional parameters
	      var args = toArray(arguments, 1);
	      args.unshift(this);
	      if (typeof plugin.install === 'function') {
	        plugin.install.apply(plugin, args);
	      } else if (typeof plugin === 'function') {
	        plugin.apply(null, args);
	      }
	      installedPlugins.push(plugin);
	      return this;
	    };
	  }
	
	  /*  */
	
	  function initMixin$1(Vue) {
	    Vue.mixin = function (mixin) {
	      this.options = mergeOptions(this.options, mixin);
	      return this;
	    };
	  }
	
	  /*  */
	
	  function initExtend(Vue) {
	    /**
	     * Each instance constructor, including Vue, has a unique
	     * cid. This enables us to create wrapped "child
	     * constructors" for prototypal inheritance and cache them.
	     */
	    Vue.cid = 0;
	    var cid = 1;
	
	    /**
	     * Class inheritance
	     */
	    Vue.extend = function (extendOptions) {
	      extendOptions = extendOptions || {};
	      var Super = this;
	      var SuperId = Super.cid;
	      var cachedCtors = extendOptions._Ctor || (extendOptions._Ctor = {});
	      if (cachedCtors[SuperId]) {
	        return cachedCtors[SuperId];
	      }
	
	      var name = extendOptions.name || Super.options.name;
	      {
	        if (!/^[a-zA-Z][\w-]*$/.test(name)) {
	          warn('Invalid component name: "' + name + '". Component names ' + 'can only contain alphanumeric characters and the hyphen, ' + 'and must start with a letter.');
	        }
	      }
	
	      var Sub = function VueComponent(options) {
	        this._init(options);
	      };
	      Sub.prototype = Object.create(Super.prototype);
	      Sub.prototype.constructor = Sub;
	      Sub.cid = cid++;
	      Sub.options = mergeOptions(Super.options, extendOptions);
	      Sub['super'] = Super;
	
	      // For props and computed properties, we define the proxy getters on
	      // the Vue instances at extension time, on the extended prototype. This
	      // avoids Object.defineProperty calls for each instance created.
	      if (Sub.options.props) {
	        initProps$1(Sub);
	      }
	      if (Sub.options.computed) {
	        initComputed$1(Sub);
	      }
	
	      // allow further extension/mixin/plugin usage
	      Sub.extend = Super.extend;
	      Sub.mixin = Super.mixin;
	      Sub.use = Super.use;
	
	      // create asset registers, so extended classes
	      // can have their private assets too.
	      ASSET_TYPES.forEach(function (type) {
	        Sub[type] = Super[type];
	      });
	      // enable recursive self-lookup
	      if (name) {
	        Sub.options.components[name] = Sub;
	      }
	
	      // keep a reference to the super options at extension time.
	      // later at instantiation we can check if Super's options have
	      // been updated.
	      Sub.superOptions = Super.options;
	      Sub.extendOptions = extendOptions;
	      Sub.sealedOptions = extend({}, Sub.options);
	
	      // cache constructor
	      cachedCtors[SuperId] = Sub;
	      return Sub;
	    };
	  }
	
	  function initProps$1(Comp) {
	    var props = Comp.options.props;
	    for (var key in props) {
	      proxy(Comp.prototype, "_props", key);
	    }
	  }
	
	  function initComputed$1(Comp) {
	    var computed = Comp.options.computed;
	    for (var key in computed) {
	      defineComputed(Comp.prototype, key, computed[key]);
	    }
	  }
	
	  /*  */
	
	  function initAssetRegisters(Vue) {
	    /**
	     * Create asset registration methods.
	     */
	    ASSET_TYPES.forEach(function (type) {
	      Vue[type] = function (id, definition) {
	        if (!definition) {
	          return this.options[type + 's'][id];
	        } else {
	          /* istanbul ignore if */
	          {
	            if (type === 'component' && config.isReservedTag(id)) {
	              warn('Do not use built-in or reserved HTML elements as component ' + 'id: ' + id);
	            }
	          }
	          if (type === 'component' && isPlainObject(definition)) {
	            definition.name = definition.name || id;
	            definition = this.options._base.extend(definition);
	          }
	          if (type === 'directive' && typeof definition === 'function') {
	            definition = { bind: definition, update: definition };
	          }
	          this.options[type + 's'][id] = definition;
	          return definition;
	        }
	      };
	    });
	  }
	
	  /*  */
	
	  function getComponentName(opts) {
	    return opts && (opts.Ctor.options.name || opts.tag);
	  }
	
	  function matches(pattern, name) {
	    if (Array.isArray(pattern)) {
	      return pattern.indexOf(name) > -1;
	    } else if (typeof pattern === 'string') {
	      return pattern.split(',').indexOf(name) > -1;
	    } else if (isRegExp(pattern)) {
	      return pattern.test(name);
	    }
	    /* istanbul ignore next */
	    return false;
	  }
	
	  function pruneCache(keepAliveInstance, filter) {
	    var cache = keepAliveInstance.cache;
	    var keys = keepAliveInstance.keys;
	    var _vnode = keepAliveInstance._vnode;
	    for (var key in cache) {
	      var cachedNode = cache[key];
	      if (cachedNode) {
	        var name = getComponentName(cachedNode.componentOptions);
	        if (name && !filter(name)) {
	          pruneCacheEntry(cache, key, keys, _vnode);
	        }
	      }
	    }
	  }
	
	  function pruneCacheEntry(cache, key, keys, current) {
	    var cached$$1 = cache[key];
	    if (cached$$1 && cached$$1 !== current) {
	      cached$$1.componentInstance.$destroy();
	    }
	    cache[key] = null;
	    remove(keys, key);
	  }
	
	  var patternTypes = [String, RegExp, Array];
	
	  var KeepAlive = {
	    name: 'keep-alive',
	    abstract: true,
	
	    props: {
	      include: patternTypes,
	      exclude: patternTypes,
	      max: [String, Number]
	    },
	
	    created: function created() {
	      this.cache = Object.create(null);
	      this.keys = [];
	    },
	
	    destroyed: function destroyed() {
	      var this$1 = this;
	
	      for (var key in this$1.cache) {
	        pruneCacheEntry(this$1.cache, key, this$1.keys);
	      }
	    },
	
	    watch: {
	      include: function include(val) {
	        pruneCache(this, function (name) {
	          return matches(val, name);
	        });
	      },
	      exclude: function exclude(val) {
	        pruneCache(this, function (name) {
	          return !matches(val, name);
	        });
	      }
	    },
	
	    render: function render() {
	      var vnode = getFirstComponentChild(this.$slots.default);
	      var componentOptions = vnode && vnode.componentOptions;
	      if (componentOptions) {
	        // check pattern
	        var name = getComponentName(componentOptions);
	        if (name && (this.include && !matches(this.include, name) || this.exclude && matches(this.exclude, name))) {
	          return vnode;
	        }
	
	        var ref = this;
	        var cache = ref.cache;
	        var keys = ref.keys;
	        var key = vnode.key == null
	        // same constructor may get registered as different local components
	        // so cid alone is not enough (#3269)
	        ? componentOptions.Ctor.cid + (componentOptions.tag ? "::" + componentOptions.tag : '') : vnode.key;
	        if (cache[key]) {
	          vnode.componentInstance = cache[key].componentInstance;
	          // make current key freshest
	          remove(keys, key);
	          keys.push(key);
	        } else {
	          cache[key] = vnode;
	          keys.push(key);
	          // prune oldest entry
	          if (this.max && keys.length > parseInt(this.max)) {
	            pruneCacheEntry(cache, keys[0], keys, this._vnode);
	          }
	        }
	
	        vnode.data.keepAlive = true;
	      }
	      return vnode;
	    }
	  };
	
	  var builtInComponents = {
	    KeepAlive: KeepAlive
	  };
	
	  /*  */
	
	  function initGlobalAPI(Vue) {
	    // config
	    var configDef = {};
	    configDef.get = function () {
	      return config;
	    };
	    {
	      configDef.set = function () {
	        warn('Do not replace the Vue.config object, set individual fields instead.');
	      };
	    }
	    Object.defineProperty(Vue, 'config', configDef);
	
	    // exposed util methods.
	    // NOTE: these are not considered part of the public API - avoid relying on
	    // them unless you are aware of the risk.
	    Vue.util = {
	      warn: warn,
	      extend: extend,
	      mergeOptions: mergeOptions,
	      defineReactive: defineReactive
	    };
	
	    Vue.set = set;
	    Vue.delete = del;
	    Vue.nextTick = nextTick;
	
	    Vue.options = Object.create(null);
	    ASSET_TYPES.forEach(function (type) {
	      Vue.options[type + 's'] = Object.create(null);
	    });
	
	    // this is used to identify the "base" constructor to extend all plain-object
	    // components with in Weex's multi-instance scenarios.
	    Vue.options._base = Vue;
	
	    extend(Vue.options.components, builtInComponents);
	
	    initUse(Vue);
	    initMixin$1(Vue);
	    initExtend(Vue);
	    initAssetRegisters(Vue);
	  }
	
	  initGlobalAPI(Vue$3);
	
	  Object.defineProperty(Vue$3.prototype, '$isServer', {
	    get: isServerRendering
	  });
	
	  Object.defineProperty(Vue$3.prototype, '$ssrContext', {
	    get: function get() {
	      /* istanbul ignore next */
	      return this.$vnode && this.$vnode.ssrContext;
	    }
	  });
	
	  Vue$3.version = '2.5.2';
	
	  /*  */
	
	  // these are reserved for web because they are directly compiled away
	  // during template compilation
	  var isReservedAttr = makeMap('style,class');
	
	  // attributes that should be using props for binding
	  var acceptValue = makeMap('input,textarea,option,select,progress');
	  var mustUseProp = function mustUseProp(tag, type, attr) {
	    return attr === 'value' && acceptValue(tag) && type !== 'button' || attr === 'selected' && tag === 'option' || attr === 'checked' && tag === 'input' || attr === 'muted' && tag === 'video';
	  };
	
	  var isEnumeratedAttr = makeMap('contenteditable,draggable,spellcheck');
	
	  var isBooleanAttr = makeMap('allowfullscreen,async,autofocus,autoplay,checked,compact,controls,declare,' + 'default,defaultchecked,defaultmuted,defaultselected,defer,disabled,' + 'enabled,formnovalidate,hidden,indeterminate,inert,ismap,itemscope,loop,multiple,' + 'muted,nohref,noresize,noshade,novalidate,nowrap,open,pauseonexit,readonly,' + 'required,reversed,scoped,seamless,selected,sortable,translate,' + 'truespeed,typemustmatch,visible');
	
	  var xlinkNS = 'http://www.w3.org/1999/xlink';
	
	  var isXlink = function isXlink(name) {
	    return name.charAt(5) === ':' && name.slice(0, 5) === 'xlink';
	  };
	
	  var getXlinkProp = function getXlinkProp(name) {
	    return isXlink(name) ? name.slice(6, name.length) : '';
	  };
	
	  var isFalsyAttrValue = function isFalsyAttrValue(val) {
	    return val == null || val === false;
	  };
	
	  /*  */
	
	  function genClassForVnode(vnode) {
	    var data = vnode.data;
	    var parentNode = vnode;
	    var childNode = vnode;
	    while (isDef(childNode.componentInstance)) {
	      childNode = childNode.componentInstance._vnode;
	      if (childNode.data) {
	        data = mergeClassData(childNode.data, data);
	      }
	    }
	    while (isDef(parentNode = parentNode.parent)) {
	      if (parentNode.data) {
	        data = mergeClassData(data, parentNode.data);
	      }
	    }
	    return renderClass(data.staticClass, data.class);
	  }
	
	  function mergeClassData(child, parent) {
	    return {
	      staticClass: concat(child.staticClass, parent.staticClass),
	      class: isDef(child.class) ? [child.class, parent.class] : parent.class
	    };
	  }
	
	  function renderClass(staticClass, dynamicClass) {
	    if (isDef(staticClass) || isDef(dynamicClass)) {
	      return concat(staticClass, stringifyClass(dynamicClass));
	    }
	    /* istanbul ignore next */
	    return '';
	  }
	
	  function concat(a, b) {
	    return a ? b ? a + ' ' + b : a : b || '';
	  }
	
	  function stringifyClass(value) {
	    if (Array.isArray(value)) {
	      return stringifyArray(value);
	    }
	    if (isObject(value)) {
	      return stringifyObject(value);
	    }
	    if (typeof value === 'string') {
	      return value;
	    }
	    /* istanbul ignore next */
	    return '';
	  }
	
	  function stringifyArray(value) {
	    var res = '';
	    var stringified;
	    for (var i = 0, l = value.length; i < l; i++) {
	      if (isDef(stringified = stringifyClass(value[i])) && stringified !== '') {
	        if (res) {
	          res += ' ';
	        }
	        res += stringified;
	      }
	    }
	    return res;
	  }
	
	  function stringifyObject(value) {
	    var res = '';
	    for (var key in value) {
	      if (value[key]) {
	        if (res) {
	          res += ' ';
	        }
	        res += key;
	      }
	    }
	    return res;
	  }
	
	  /*  */
	
	  var namespaceMap = {
	    svg: 'http://www.w3.org/2000/svg',
	    math: 'http://www.w3.org/1998/Math/MathML'
	  };
	
	  var isHTMLTag = makeMap('html,body,base,head,link,meta,style,title,' + 'address,article,aside,footer,header,h1,h2,h3,h4,h5,h6,hgroup,nav,section,' + 'div,dd,dl,dt,figcaption,figure,picture,hr,img,li,main,ol,p,pre,ul,' + 'a,b,abbr,bdi,bdo,br,cite,code,data,dfn,em,i,kbd,mark,q,rp,rt,rtc,ruby,' + 's,samp,small,span,strong,sub,sup,time,u,var,wbr,area,audio,map,track,video,' + 'embed,object,param,source,canvas,script,noscript,del,ins,' + 'caption,col,colgroup,table,thead,tbody,td,th,tr,' + 'button,datalist,fieldset,form,input,label,legend,meter,optgroup,option,' + 'output,progress,select,textarea,' + 'details,dialog,menu,menuitem,summary,' + 'content,element,shadow,template,blockquote,iframe,tfoot');
	
	  // this map is intentionally selective, only covering SVG elements that may
	  // contain child elements.
	  var isSVG = makeMap('svg,animate,circle,clippath,cursor,defs,desc,ellipse,filter,font-face,' + 'foreignObject,g,glyph,image,line,marker,mask,missing-glyph,path,pattern,' + 'polygon,polyline,rect,switch,symbol,text,textpath,tspan,use,view', true);
	
	  var isPreTag = function isPreTag(tag) {
	    return tag === 'pre';
	  };
	
	  var isReservedTag = function isReservedTag(tag) {
	    return isHTMLTag(tag) || isSVG(tag);
	  };
	
	  function getTagNamespace(tag) {
	    if (isSVG(tag)) {
	      return 'svg';
	    }
	    // basic support for MathML
	    // note it doesn't support other MathML elements being component roots
	    if (tag === 'math') {
	      return 'math';
	    }
	  }
	
	  var unknownElementCache = Object.create(null);
	  function isUnknownElement(tag) {
	    /* istanbul ignore if */
	    if (!inBrowser) {
	      return true;
	    }
	    if (isReservedTag(tag)) {
	      return false;
	    }
	    tag = tag.toLowerCase();
	    /* istanbul ignore if */
	    if (unknownElementCache[tag] != null) {
	      return unknownElementCache[tag];
	    }
	    var el = document.createElement(tag);
	    if (tag.indexOf('-') > -1) {
	      // http://stackoverflow.com/a/28210364/1070244
	      return unknownElementCache[tag] = el.constructor === window.HTMLUnknownElement || el.constructor === window.HTMLElement;
	    } else {
	      return unknownElementCache[tag] = /HTMLUnknownElement/.test(el.toString());
	    }
	  }
	
	  var isTextInputType = makeMap('text,number,password,search,email,tel,url');
	
	  /*  */
	
	  /**
	   * Query an element selector if it's not an element already.
	   */
	  function query(el) {
	    if (typeof el === 'string') {
	      var selected = document.querySelector(el);
	      if (!selected) {
	        "development" !== 'production' && warn('Cannot find element: ' + el);
	        return document.createElement('div');
	      }
	      return selected;
	    } else {
	      return el;
	    }
	  }
	
	  /*  */
	
	  function createElement$1(tagName, vnode) {
	    var elm = document.createElement(tagName);
	    if (tagName !== 'select') {
	      return elm;
	    }
	    // false or null will remove the attribute but undefined will not
	    if (vnode.data && vnode.data.attrs && vnode.data.attrs.multiple !== undefined) {
	      elm.setAttribute('multiple', 'multiple');
	    }
	    return elm;
	  }
	
	  function createElementNS(namespace, tagName) {
	    return document.createElementNS(namespaceMap[namespace], tagName);
	  }
	
	  function createTextNode(text) {
	    return document.createTextNode(text);
	  }
	
	  function createComment(text) {
	    return document.createComment(text);
	  }
	
	  function insertBefore(parentNode, newNode, referenceNode) {
	    parentNode.insertBefore(newNode, referenceNode);
	  }
	
	  function removeChild(node, child) {
	    node.removeChild(child);
	  }
	
	  function appendChild(node, child) {
	    node.appendChild(child);
	  }
	
	  function parentNode(node) {
	    return node.parentNode;
	  }
	
	  function nextSibling(node) {
	    return node.nextSibling;
	  }
	
	  function tagName(node) {
	    return node.tagName;
	  }
	
	  function setTextContent(node, text) {
	    node.textContent = text;
	  }
	
	  function setAttribute(node, key, val) {
	    node.setAttribute(key, val);
	  }
	
	  var nodeOps = Object.freeze({
	    createElement: createElement$1,
	    createElementNS: createElementNS,
	    createTextNode: createTextNode,
	    createComment: createComment,
	    insertBefore: insertBefore,
	    removeChild: removeChild,
	    appendChild: appendChild,
	    parentNode: parentNode,
	    nextSibling: nextSibling,
	    tagName: tagName,
	    setTextContent: setTextContent,
	    setAttribute: setAttribute
	  });
	
	  /*  */
	
	  var ref = {
	    create: function create(_, vnode) {
	      registerRef(vnode);
	    },
	    update: function update(oldVnode, vnode) {
	      if (oldVnode.data.ref !== vnode.data.ref) {
	        registerRef(oldVnode, true);
	        registerRef(vnode);
	      }
	    },
	    destroy: function destroy(vnode) {
	      registerRef(vnode, true);
	    }
	  };
	
	  function registerRef(vnode, isRemoval) {
	    var key = vnode.data.ref;
	    if (!key) {
	      return;
	    }
	
	    var vm = vnode.context;
	    var ref = vnode.componentInstance || vnode.elm;
	    var refs = vm.$refs;
	    if (isRemoval) {
	      if (Array.isArray(refs[key])) {
	        remove(refs[key], ref);
	      } else if (refs[key] === ref) {
	        refs[key] = undefined;
	      }
	    } else {
	      if (vnode.data.refInFor) {
	        if (!Array.isArray(refs[key])) {
	          refs[key] = [ref];
	        } else if (refs[key].indexOf(ref) < 0) {
	          // $flow-disable-line
	          refs[key].push(ref);
	        }
	      } else {
	        refs[key] = ref;
	      }
	    }
	  }
	
	  /**
	   * Virtual DOM patching algorithm based on Snabbdom by
	   * Simon Friis Vindum (@paldepind)
	   * Licensed under the MIT License
	   * https://github.com/paldepind/snabbdom/blob/master/LICENSE
	   *
	   * modified by Evan You (@yyx990803)
	   *
	   * Not type-checking this because this file is perf-critical and the cost
	   * of making flow understand it is not worth it.
	   */
	
	  var emptyNode = new VNode('', {}, []);
	
	  var hooks = ['create', 'activate', 'update', 'remove', 'destroy'];
	
	  function sameVnode(a, b) {
	    return a.key === b.key && (a.tag === b.tag && a.isComment === b.isComment && isDef(a.data) === isDef(b.data) && sameInputType(a, b) || isTrue(a.isAsyncPlaceholder) && a.asyncFactory === b.asyncFactory && isUndef(b.asyncFactory.error));
	  }
	
	  function sameInputType(a, b) {
	    if (a.tag !== 'input') {
	      return true;
	    }
	    var i;
	    var typeA = isDef(i = a.data) && isDef(i = i.attrs) && i.type;
	    var typeB = isDef(i = b.data) && isDef(i = i.attrs) && i.type;
	    return typeA === typeB || isTextInputType(typeA) && isTextInputType(typeB);
	  }
	
	  function createKeyToOldIdx(children, beginIdx, endIdx) {
	    var i, key;
	    var map = {};
	    for (i = beginIdx; i <= endIdx; ++i) {
	      key = children[i].key;
	      if (isDef(key)) {
	        map[key] = i;
	      }
	    }
	    return map;
	  }
	
	  function createPatchFunction(backend) {
	    var i, j;
	    var cbs = {};
	
	    var modules = backend.modules;
	    var nodeOps = backend.nodeOps;
	
	    for (i = 0; i < hooks.length; ++i) {
	      cbs[hooks[i]] = [];
	      for (j = 0; j < modules.length; ++j) {
	        if (isDef(modules[j][hooks[i]])) {
	          cbs[hooks[i]].push(modules[j][hooks[i]]);
	        }
	      }
	    }
	
	    function emptyNodeAt(elm) {
	      return new VNode(nodeOps.tagName(elm).toLowerCase(), {}, [], undefined, elm);
	    }
	
	    function createRmCb(childElm, listeners) {
	      function remove() {
	        if (--remove.listeners === 0) {
	          removeNode(childElm);
	        }
	      }
	      remove.listeners = listeners;
	      return remove;
	    }
	
	    function removeNode(el) {
	      var parent = nodeOps.parentNode(el);
	      // element may have already been removed due to v-html / v-text
	      if (isDef(parent)) {
	        nodeOps.removeChild(parent, el);
	      }
	    }
	
	    var inPre = 0;
	    function createElm(vnode, insertedVnodeQueue, parentElm, refElm, nested) {
	      vnode.isRootInsert = !nested; // for transition enter check
	      if (createComponent(vnode, insertedVnodeQueue, parentElm, refElm)) {
	        return;
	      }
	
	      var data = vnode.data;
	      var children = vnode.children;
	      var tag = vnode.tag;
	      if (isDef(tag)) {
	        {
	          if (data && data.pre) {
	            inPre++;
	          }
	          if (!inPre && !vnode.ns && !(config.ignoredElements.length && config.ignoredElements.some(function (ignore) {
	            return isRegExp(ignore) ? ignore.test(tag) : ignore === tag;
	          })) && config.isUnknownElement(tag)) {
	            warn('Unknown custom element: <' + tag + '> - did you ' + 'register the component correctly? For recursive components, ' + 'make sure to provide the "name" option.', vnode.context);
	          }
	        }
	        vnode.elm = vnode.ns ? nodeOps.createElementNS(vnode.ns, tag) : nodeOps.createElement(tag, vnode);
	        setScope(vnode);
	
	        /* istanbul ignore if */
	        {
	          createChildren(vnode, children, insertedVnodeQueue);
	          if (isDef(data)) {
	            invokeCreateHooks(vnode, insertedVnodeQueue);
	          }
	          insert(parentElm, vnode.elm, refElm);
	        }
	
	        if ("development" !== 'production' && data && data.pre) {
	          inPre--;
	        }
	      } else if (isTrue(vnode.isComment)) {
	        vnode.elm = nodeOps.createComment(vnode.text);
	        insert(parentElm, vnode.elm, refElm);
	      } else {
	        vnode.elm = nodeOps.createTextNode(vnode.text);
	        insert(parentElm, vnode.elm, refElm);
	      }
	    }
	
	    function createComponent(vnode, insertedVnodeQueue, parentElm, refElm) {
	      var i = vnode.data;
	      if (isDef(i)) {
	        var isReactivated = isDef(vnode.componentInstance) && i.keepAlive;
	        if (isDef(i = i.hook) && isDef(i = i.init)) {
	          i(vnode, false /* hydrating */, parentElm, refElm);
	        }
	        // after calling the init hook, if the vnode is a child component
	        // it should've created a child instance and mounted it. the child
	        // component also has set the placeholder vnode's elm.
	        // in that case we can just return the element and be done.
	        if (isDef(vnode.componentInstance)) {
	          initComponent(vnode, insertedVnodeQueue);
	          if (isTrue(isReactivated)) {
	            reactivateComponent(vnode, insertedVnodeQueue, parentElm, refElm);
	          }
	          return true;
	        }
	      }
	    }
	
	    function initComponent(vnode, insertedVnodeQueue) {
	      if (isDef(vnode.data.pendingInsert)) {
	        insertedVnodeQueue.push.apply(insertedVnodeQueue, vnode.data.pendingInsert);
	        vnode.data.pendingInsert = null;
	      }
	      vnode.elm = vnode.componentInstance.$el;
	      if (isPatchable(vnode)) {
	        invokeCreateHooks(vnode, insertedVnodeQueue);
	        setScope(vnode);
	      } else {
	        // empty component root.
	        // skip all element-related modules except for ref (#3455)
	        registerRef(vnode);
	        // make sure to invoke the insert hook
	        insertedVnodeQueue.push(vnode);
	      }
	    }
	
	    function reactivateComponent(vnode, insertedVnodeQueue, parentElm, refElm) {
	      var i;
	      // hack for #4339: a reactivated component with inner transition
	      // does not trigger because the inner node's created hooks are not called
	      // again. It's not ideal to involve module-specific logic in here but
	      // there doesn't seem to be a better way to do it.
	      var innerNode = vnode;
	      while (innerNode.componentInstance) {
	        innerNode = innerNode.componentInstance._vnode;
	        if (isDef(i = innerNode.data) && isDef(i = i.transition)) {
	          for (i = 0; i < cbs.activate.length; ++i) {
	            cbs.activate[i](emptyNode, innerNode);
	          }
	          insertedVnodeQueue.push(innerNode);
	          break;
	        }
	      }
	      // unlike a newly created component,
	      // a reactivated keep-alive component doesn't insert itself
	      insert(parentElm, vnode.elm, refElm);
	    }
	
	    function insert(parent, elm, ref$$1) {
	      if (isDef(parent)) {
	        if (isDef(ref$$1)) {
	          if (ref$$1.parentNode === parent) {
	            nodeOps.insertBefore(parent, elm, ref$$1);
	          }
	        } else {
	          nodeOps.appendChild(parent, elm);
	        }
	      }
	    }
	
	    function createChildren(vnode, children, insertedVnodeQueue) {
	      if (Array.isArray(children)) {
	        for (var i = 0; i < children.length; ++i) {
	          createElm(children[i], insertedVnodeQueue, vnode.elm, null, true);
	        }
	      } else if (isPrimitive(vnode.text)) {
	        nodeOps.appendChild(vnode.elm, nodeOps.createTextNode(vnode.text));
	      }
	    }
	
	    function isPatchable(vnode) {
	      while (vnode.componentInstance) {
	        vnode = vnode.componentInstance._vnode;
	      }
	      return isDef(vnode.tag);
	    }
	
	    function invokeCreateHooks(vnode, insertedVnodeQueue) {
	      for (var i$1 = 0; i$1 < cbs.create.length; ++i$1) {
	        cbs.create[i$1](emptyNode, vnode);
	      }
	      i = vnode.data.hook; // Reuse variable
	      if (isDef(i)) {
	        if (isDef(i.create)) {
	          i.create(emptyNode, vnode);
	        }
	        if (isDef(i.insert)) {
	          insertedVnodeQueue.push(vnode);
	        }
	      }
	    }
	
	    // set scope id attribute for scoped CSS.
	    // this is implemented as a special case to avoid the overhead
	    // of going through the normal attribute patching process.
	    function setScope(vnode) {
	      var i;
	      if (isDef(i = vnode.functionalScopeId)) {
	        nodeOps.setAttribute(vnode.elm, i, '');
	      } else {
	        var ancestor = vnode;
	        while (ancestor) {
	          if (isDef(i = ancestor.context) && isDef(i = i.$options._scopeId)) {
	            nodeOps.setAttribute(vnode.elm, i, '');
	          }
	          ancestor = ancestor.parent;
	        }
	      }
	      // for slot content they should also get the scopeId from the host instance.
	      if (isDef(i = activeInstance) && i !== vnode.context && i !== vnode.functionalContext && isDef(i = i.$options._scopeId)) {
	        nodeOps.setAttribute(vnode.elm, i, '');
	      }
	    }
	
	    function addVnodes(parentElm, refElm, vnodes, startIdx, endIdx, insertedVnodeQueue) {
	      for (; startIdx <= endIdx; ++startIdx) {
	        createElm(vnodes[startIdx], insertedVnodeQueue, parentElm, refElm);
	      }
	    }
	
	    function invokeDestroyHook(vnode) {
	      var i, j;
	      var data = vnode.data;
	      if (isDef(data)) {
	        if (isDef(i = data.hook) && isDef(i = i.destroy)) {
	          i(vnode);
	        }
	        for (i = 0; i < cbs.destroy.length; ++i) {
	          cbs.destroy[i](vnode);
	        }
	      }
	      if (isDef(i = vnode.children)) {
	        for (j = 0; j < vnode.children.length; ++j) {
	          invokeDestroyHook(vnode.children[j]);
	        }
	      }
	    }
	
	    function removeVnodes(parentElm, vnodes, startIdx, endIdx) {
	      for (; startIdx <= endIdx; ++startIdx) {
	        var ch = vnodes[startIdx];
	        if (isDef(ch)) {
	          if (isDef(ch.tag)) {
	            removeAndInvokeRemoveHook(ch);
	            invokeDestroyHook(ch);
	          } else {
	            // Text node
	            removeNode(ch.elm);
	          }
	        }
	      }
	    }
	
	    function removeAndInvokeRemoveHook(vnode, rm) {
	      if (isDef(rm) || isDef(vnode.data)) {
	        var i;
	        var listeners = cbs.remove.length + 1;
	        if (isDef(rm)) {
	          // we have a recursively passed down rm callback
	          // increase the listeners count
	          rm.listeners += listeners;
	        } else {
	          // directly removing
	          rm = createRmCb(vnode.elm, listeners);
	        }
	        // recursively invoke hooks on child component root node
	        if (isDef(i = vnode.componentInstance) && isDef(i = i._vnode) && isDef(i.data)) {
	          removeAndInvokeRemoveHook(i, rm);
	        }
	        for (i = 0; i < cbs.remove.length; ++i) {
	          cbs.remove[i](vnode, rm);
	        }
	        if (isDef(i = vnode.data.hook) && isDef(i = i.remove)) {
	          i(vnode, rm);
	        } else {
	          rm();
	        }
	      } else {
	        removeNode(vnode.elm);
	      }
	    }
	
	    function updateChildren(parentElm, oldCh, newCh, insertedVnodeQueue, removeOnly) {
	      var oldStartIdx = 0;
	      var newStartIdx = 0;
	      var oldEndIdx = oldCh.length - 1;
	      var oldStartVnode = oldCh[0];
	      var oldEndVnode = oldCh[oldEndIdx];
	      var newEndIdx = newCh.length - 1;
	      var newStartVnode = newCh[0];
	      var newEndVnode = newCh[newEndIdx];
	      var oldKeyToIdx, idxInOld, vnodeToMove, refElm;
	
	      // removeOnly is a special flag used only by <transition-group>
	      // to ensure removed elements stay in correct relative positions
	      // during leaving transitions
	      var canMove = !removeOnly;
	
	      while (oldStartIdx <= oldEndIdx && newStartIdx <= newEndIdx) {
	        if (isUndef(oldStartVnode)) {
	          oldStartVnode = oldCh[++oldStartIdx]; // Vnode has been moved left
	        } else if (isUndef(oldEndVnode)) {
	          oldEndVnode = oldCh[--oldEndIdx];
	        } else if (sameVnode(oldStartVnode, newStartVnode)) {
	          patchVnode(oldStartVnode, newStartVnode, insertedVnodeQueue);
	          oldStartVnode = oldCh[++oldStartIdx];
	          newStartVnode = newCh[++newStartIdx];
	        } else if (sameVnode(oldEndVnode, newEndVnode)) {
	          patchVnode(oldEndVnode, newEndVnode, insertedVnodeQueue);
	          oldEndVnode = oldCh[--oldEndIdx];
	          newEndVnode = newCh[--newEndIdx];
	        } else if (sameVnode(oldStartVnode, newEndVnode)) {
	          // Vnode moved right
	          patchVnode(oldStartVnode, newEndVnode, insertedVnodeQueue);
	          canMove && nodeOps.insertBefore(parentElm, oldStartVnode.elm, nodeOps.nextSibling(oldEndVnode.elm));
	          oldStartVnode = oldCh[++oldStartIdx];
	          newEndVnode = newCh[--newEndIdx];
	        } else if (sameVnode(oldEndVnode, newStartVnode)) {
	          // Vnode moved left
	          patchVnode(oldEndVnode, newStartVnode, insertedVnodeQueue);
	          canMove && nodeOps.insertBefore(parentElm, oldEndVnode.elm, oldStartVnode.elm);
	          oldEndVnode = oldCh[--oldEndIdx];
	          newStartVnode = newCh[++newStartIdx];
	        } else {
	          if (isUndef(oldKeyToIdx)) {
	            oldKeyToIdx = createKeyToOldIdx(oldCh, oldStartIdx, oldEndIdx);
	          }
	          idxInOld = isDef(newStartVnode.key) ? oldKeyToIdx[newStartVnode.key] : findIdxInOld(newStartVnode, oldCh, oldStartIdx, oldEndIdx);
	          if (isUndef(idxInOld)) {
	            // New element
	            createElm(newStartVnode, insertedVnodeQueue, parentElm, oldStartVnode.elm);
	          } else {
	            vnodeToMove = oldCh[idxInOld];
	            /* istanbul ignore if */
	            if ("development" !== 'production' && !vnodeToMove) {
	              warn('It seems there are duplicate keys that is causing an update error. ' + 'Make sure each v-for item has a unique key.');
	            }
	            if (sameVnode(vnodeToMove, newStartVnode)) {
	              patchVnode(vnodeToMove, newStartVnode, insertedVnodeQueue);
	              oldCh[idxInOld] = undefined;
	              canMove && nodeOps.insertBefore(parentElm, vnodeToMove.elm, oldStartVnode.elm);
	            } else {
	              // same key but different element. treat as new element
	              createElm(newStartVnode, insertedVnodeQueue, parentElm, oldStartVnode.elm);
	            }
	          }
	          newStartVnode = newCh[++newStartIdx];
	        }
	      }
	      if (oldStartIdx > oldEndIdx) {
	        refElm = isUndef(newCh[newEndIdx + 1]) ? null : newCh[newEndIdx + 1].elm;
	        addVnodes(parentElm, refElm, newCh, newStartIdx, newEndIdx, insertedVnodeQueue);
	      } else if (newStartIdx > newEndIdx) {
	        removeVnodes(parentElm, oldCh, oldStartIdx, oldEndIdx);
	      }
	    }
	
	    function findIdxInOld(node, oldCh, start, end) {
	      for (var i = start; i < end; i++) {
	        var c = oldCh[i];
	        if (isDef(c) && sameVnode(node, c)) {
	          return i;
	        }
	      }
	    }
	
	    function patchVnode(oldVnode, vnode, insertedVnodeQueue, removeOnly) {
	      if (oldVnode === vnode) {
	        return;
	      }
	
	      var elm = vnode.elm = oldVnode.elm;
	
	      if (isTrue(oldVnode.isAsyncPlaceholder)) {
	        if (isDef(vnode.asyncFactory.resolved)) {
	          hydrate(oldVnode.elm, vnode, insertedVnodeQueue);
	        } else {
	          vnode.isAsyncPlaceholder = true;
	        }
	        return;
	      }
	
	      // reuse element for static trees.
	      // note we only do this if the vnode is cloned -
	      // if the new node is not cloned it means the render functions have been
	      // reset by the hot-reload-api and we need to do a proper re-render.
	      if (isTrue(vnode.isStatic) && isTrue(oldVnode.isStatic) && vnode.key === oldVnode.key && (isTrue(vnode.isCloned) || isTrue(vnode.isOnce))) {
	        vnode.componentInstance = oldVnode.componentInstance;
	        return;
	      }
	
	      var i;
	      var data = vnode.data;
	      if (isDef(data) && isDef(i = data.hook) && isDef(i = i.prepatch)) {
	        i(oldVnode, vnode);
	      }
	
	      var oldCh = oldVnode.children;
	      var ch = vnode.children;
	      if (isDef(data) && isPatchable(vnode)) {
	        for (i = 0; i < cbs.update.length; ++i) {
	          cbs.update[i](oldVnode, vnode);
	        }
	        if (isDef(i = data.hook) && isDef(i = i.update)) {
	          i(oldVnode, vnode);
	        }
	      }
	      if (isUndef(vnode.text)) {
	        if (isDef(oldCh) && isDef(ch)) {
	          if (oldCh !== ch) {
	            updateChildren(elm, oldCh, ch, insertedVnodeQueue, removeOnly);
	          }
	        } else if (isDef(ch)) {
	          if (isDef(oldVnode.text)) {
	            nodeOps.setTextContent(elm, '');
	          }
	          addVnodes(elm, null, ch, 0, ch.length - 1, insertedVnodeQueue);
	        } else if (isDef(oldCh)) {
	          removeVnodes(elm, oldCh, 0, oldCh.length - 1);
	        } else if (isDef(oldVnode.text)) {
	          nodeOps.setTextContent(elm, '');
	        }
	      } else if (oldVnode.text !== vnode.text) {
	        nodeOps.setTextContent(elm, vnode.text);
	      }
	      if (isDef(data)) {
	        if (isDef(i = data.hook) && isDef(i = i.postpatch)) {
	          i(oldVnode, vnode);
	        }
	      }
	    }
	
	    function invokeInsertHook(vnode, queue, initial) {
	      // delay insert hooks for component root nodes, invoke them after the
	      // element is really inserted
	      if (isTrue(initial) && isDef(vnode.parent)) {
	        vnode.parent.data.pendingInsert = queue;
	      } else {
	        for (var i = 0; i < queue.length; ++i) {
	          queue[i].data.hook.insert(queue[i]);
	        }
	      }
	    }
	
	    var bailed = false;
	    // list of modules that can skip create hook during hydration because they
	    // are already rendered on the client or has no need for initialization
	    var isRenderedModule = makeMap('attrs,style,class,staticClass,staticStyle,key');
	
	    // Note: this is a browser-only function so we can assume elms are DOM nodes.
	    function hydrate(elm, vnode, insertedVnodeQueue) {
	      if (isTrue(vnode.isComment) && isDef(vnode.asyncFactory)) {
	        vnode.elm = elm;
	        vnode.isAsyncPlaceholder = true;
	        return true;
	      }
	      {
	        if (!assertNodeMatch(elm, vnode)) {
	          return false;
	        }
	      }
	      vnode.elm = elm;
	      var tag = vnode.tag;
	      var data = vnode.data;
	      var children = vnode.children;
	      if (isDef(data)) {
	        if (isDef(i = data.hook) && isDef(i = i.init)) {
	          i(vnode, true /* hydrating */);
	        }
	        if (isDef(i = vnode.componentInstance)) {
	          // child component. it should have hydrated its own tree.
	          initComponent(vnode, insertedVnodeQueue);
	          return true;
	        }
	      }
	      if (isDef(tag)) {
	        if (isDef(children)) {
	          // empty element, allow client to pick up and populate children
	          if (!elm.hasChildNodes()) {
	            createChildren(vnode, children, insertedVnodeQueue);
	          } else {
	            // v-html and domProps: innerHTML
	            if (isDef(i = data) && isDef(i = i.domProps) && isDef(i = i.innerHTML)) {
	              if (i !== elm.innerHTML) {
	                /* istanbul ignore if */
	                if ("development" !== 'production' && typeof console !== 'undefined' && !bailed) {
	                  bailed = true;
	                  console.warn('Parent: ', elm);
	                  console.warn('server innerHTML: ', i);
	                  console.warn('client innerHTML: ', elm.innerHTML);
	                }
	                return false;
	              }
	            } else {
	              // iterate and compare children lists
	              var childrenMatch = true;
	              var childNode = elm.firstChild;
	              for (var i$1 = 0; i$1 < children.length; i$1++) {
	                if (!childNode || !hydrate(childNode, children[i$1], insertedVnodeQueue)) {
	                  childrenMatch = false;
	                  break;
	                }
	                childNode = childNode.nextSibling;
	              }
	              // if childNode is not null, it means the actual childNodes list is
	              // longer than the virtual children list.
	              if (!childrenMatch || childNode) {
	                /* istanbul ignore if */
	                if ("development" !== 'production' && typeof console !== 'undefined' && !bailed) {
	                  bailed = true;
	                  console.warn('Parent: ', elm);
	                  console.warn('Mismatching childNodes vs. VNodes: ', elm.childNodes, children);
	                }
	                return false;
	              }
	            }
	          }
	        }
	        if (isDef(data)) {
	          for (var key in data) {
	            if (!isRenderedModule(key)) {
	              invokeCreateHooks(vnode, insertedVnodeQueue);
	              break;
	            }
	          }
	        }
	      } else if (elm.data !== vnode.text) {
	        elm.data = vnode.text;
	      }
	      return true;
	    }
	
	    function assertNodeMatch(node, vnode) {
	      if (isDef(vnode.tag)) {
	        return vnode.tag.indexOf('vue-component') === 0 || vnode.tag.toLowerCase() === (node.tagName && node.tagName.toLowerCase());
	      } else {
	        return node.nodeType === (vnode.isComment ? 8 : 3);
	      }
	    }
	
	    return function patch(oldVnode, vnode, hydrating, removeOnly, parentElm, refElm) {
	      if (isUndef(vnode)) {
	        if (isDef(oldVnode)) {
	          invokeDestroyHook(oldVnode);
	        }
	        return;
	      }
	
	      var isInitialPatch = false;
	      var insertedVnodeQueue = [];
	
	      if (isUndef(oldVnode)) {
	        // empty mount (likely as component), create new root element
	        isInitialPatch = true;
	        createElm(vnode, insertedVnodeQueue, parentElm, refElm);
	      } else {
	        var isRealElement = isDef(oldVnode.nodeType);
	        if (!isRealElement && sameVnode(oldVnode, vnode)) {
	          // patch existing root node
	          patchVnode(oldVnode, vnode, insertedVnodeQueue, removeOnly);
	        } else {
	          if (isRealElement) {
	            // mounting to a real element
	            // check if this is server-rendered content and if we can perform
	            // a successful hydration.
	            if (oldVnode.nodeType === 1 && oldVnode.hasAttribute(SSR_ATTR)) {
	              oldVnode.removeAttribute(SSR_ATTR);
	              hydrating = true;
	            }
	            if (isTrue(hydrating)) {
	              if (hydrate(oldVnode, vnode, insertedVnodeQueue)) {
	                invokeInsertHook(vnode, insertedVnodeQueue, true);
	                return oldVnode;
	              } else {
	                warn('The client-side rendered virtual DOM tree is not matching ' + 'server-rendered content. This is likely caused by incorrect ' + 'HTML markup, for example nesting block-level elements inside ' + '<p>, or missing <tbody>. Bailing hydration and performing ' + 'full client-side render.');
	              }
	            }
	            // either not server-rendered, or hydration failed.
	            // create an empty node and replace it
	            oldVnode = emptyNodeAt(oldVnode);
	          }
	          // replacing existing element
	          var oldElm = oldVnode.elm;
	          var parentElm$1 = nodeOps.parentNode(oldElm);
	          createElm(vnode, insertedVnodeQueue,
	          // extremely rare edge case: do not insert if old element is in a
	          // leaving transition. Only happens when combining transition +
	          // keep-alive + HOCs. (#4590)
	          oldElm._leaveCb ? null : parentElm$1, nodeOps.nextSibling(oldElm));
	
	          if (isDef(vnode.parent)) {
	            // component root element replaced.
	            // update parent placeholder node element, recursively
	            var ancestor = vnode.parent;
	            var patchable = isPatchable(vnode);
	            while (ancestor) {
	              for (var i = 0; i < cbs.destroy.length; ++i) {
	                cbs.destroy[i](ancestor);
	              }
	              ancestor.elm = vnode.elm;
	              if (patchable) {
	                for (var i$1 = 0; i$1 < cbs.create.length; ++i$1) {
	                  cbs.create[i$1](emptyNode, ancestor);
	                }
	                // #6513
	                // invoke insert hooks that may have been merged by create hooks.
	                // e.g. for directives that uses the "inserted" hook.
	                var insert = ancestor.data.hook.insert;
	                if (insert.merged) {
	                  // start at index 1 to avoid re-invoking component mounted hook
	                  for (var i$2 = 1; i$2 < insert.fns.length; i$2++) {
	                    insert.fns[i$2]();
	                  }
	                }
	              } else {
	                registerRef(ancestor);
	              }
	              ancestor = ancestor.parent;
	            }
	          }
	
	          if (isDef(parentElm$1)) {
	            removeVnodes(parentElm$1, [oldVnode], 0, 0);
	          } else if (isDef(oldVnode.tag)) {
	            invokeDestroyHook(oldVnode);
	          }
	        }
	      }
	
	      invokeInsertHook(vnode, insertedVnodeQueue, isInitialPatch);
	      return vnode.elm;
	    };
	  }
	
	  /*  */
	
	  var directives = {
	    create: updateDirectives,
	    update: updateDirectives,
	    destroy: function unbindDirectives(vnode) {
	      updateDirectives(vnode, emptyNode);
	    }
	  };
	
	  function updateDirectives(oldVnode, vnode) {
	    if (oldVnode.data.directives || vnode.data.directives) {
	      _update(oldVnode, vnode);
	    }
	  }
	
	  function _update(oldVnode, vnode) {
	    var isCreate = oldVnode === emptyNode;
	    var isDestroy = vnode === emptyNode;
	    var oldDirs = normalizeDirectives$1(oldVnode.data.directives, oldVnode.context);
	    var newDirs = normalizeDirectives$1(vnode.data.directives, vnode.context);
	
	    var dirsWithInsert = [];
	    var dirsWithPostpatch = [];
	
	    var key, oldDir, dir;
	    for (key in newDirs) {
	      oldDir = oldDirs[key];
	      dir = newDirs[key];
	      if (!oldDir) {
	        // new directive, bind
	        callHook$1(dir, 'bind', vnode, oldVnode);
	        if (dir.def && dir.def.inserted) {
	          dirsWithInsert.push(dir);
	        }
	      } else {
	        // existing directive, update
	        dir.oldValue = oldDir.value;
	        callHook$1(dir, 'update', vnode, oldVnode);
	        if (dir.def && dir.def.componentUpdated) {
	          dirsWithPostpatch.push(dir);
	        }
	      }
	    }
	
	    if (dirsWithInsert.length) {
	      var callInsert = function callInsert() {
	        for (var i = 0; i < dirsWithInsert.length; i++) {
	          callHook$1(dirsWithInsert[i], 'inserted', vnode, oldVnode);
	        }
	      };
	      if (isCreate) {
	        mergeVNodeHook(vnode.data.hook || (vnode.data.hook = {}), 'insert', callInsert);
	      } else {
	        callInsert();
	      }
	    }
	
	    if (dirsWithPostpatch.length) {
	      mergeVNodeHook(vnode.data.hook || (vnode.data.hook = {}), 'postpatch', function () {
	        for (var i = 0; i < dirsWithPostpatch.length; i++) {
	          callHook$1(dirsWithPostpatch[i], 'componentUpdated', vnode, oldVnode);
	        }
	      });
	    }
	
	    if (!isCreate) {
	      for (key in oldDirs) {
	        if (!newDirs[key]) {
	          // no longer present, unbind
	          callHook$1(oldDirs[key], 'unbind', oldVnode, oldVnode, isDestroy);
	        }
	      }
	    }
	  }
	
	  var emptyModifiers = Object.create(null);
	
	  function normalizeDirectives$1(dirs, vm) {
	    var res = Object.create(null);
	    if (!dirs) {
	      return res;
	    }
	    var i, dir;
	    for (i = 0; i < dirs.length; i++) {
	      dir = dirs[i];
	      if (!dir.modifiers) {
	        dir.modifiers = emptyModifiers;
	      }
	      res[getRawDirName(dir)] = dir;
	      dir.def = resolveAsset(vm.$options, 'directives', dir.name, true);
	    }
	    return res;
	  }
	
	  function getRawDirName(dir) {
	    return dir.rawName || dir.name + "." + Object.keys(dir.modifiers || {}).join('.');
	  }
	
	  function callHook$1(dir, hook, vnode, oldVnode, isDestroy) {
	    var fn = dir.def && dir.def[hook];
	    if (fn) {
	      try {
	        fn(vnode.elm, dir, vnode, oldVnode, isDestroy);
	      } catch (e) {
	        handleError(e, vnode.context, "directive " + dir.name + " " + hook + " hook");
	      }
	    }
	  }
	
	  var baseModules = [ref, directives];
	
	  /*  */
	
	  function updateAttrs(oldVnode, vnode) {
	    var opts = vnode.componentOptions;
	    if (isDef(opts) && opts.Ctor.options.inheritAttrs === false) {
	      return;
	    }
	    if (isUndef(oldVnode.data.attrs) && isUndef(vnode.data.attrs)) {
	      return;
	    }
	    var key, cur, old;
	    var elm = vnode.elm;
	    var oldAttrs = oldVnode.data.attrs || {};
	    var attrs = vnode.data.attrs || {};
	    // clone observed objects, as the user probably wants to mutate it
	    if (isDef(attrs.__ob__)) {
	      attrs = vnode.data.attrs = extend({}, attrs);
	    }
	
	    for (key in attrs) {
	      cur = attrs[key];
	      old = oldAttrs[key];
	      if (old !== cur) {
	        setAttr(elm, key, cur);
	      }
	    }
	    // #4391: in IE9, setting type can reset value for input[type=radio]
	    // #6666: IE/Edge forces progress value down to 1 before setting a max
	    /* istanbul ignore if */
	    if ((isIE9 || isEdge) && attrs.value !== oldAttrs.value) {
	      setAttr(elm, 'value', attrs.value);
	    }
	    for (key in oldAttrs) {
	      if (isUndef(attrs[key])) {
	        if (isXlink(key)) {
	          elm.removeAttributeNS(xlinkNS, getXlinkProp(key));
	        } else if (!isEnumeratedAttr(key)) {
	          elm.removeAttribute(key);
	        }
	      }
	    }
	  }
	
	  function setAttr(el, key, value) {
	    if (isBooleanAttr(key)) {
	      // set attribute for blank value
	      // e.g. <option disabled>Select one</option>
	      if (isFalsyAttrValue(value)) {
	        el.removeAttribute(key);
	      } else {
	        // technically allowfullscreen is a boolean attribute for <iframe>,
	        // but Flash expects a value of "true" when used on <embed> tag
	        value = key === 'allowfullscreen' && el.tagName === 'EMBED' ? 'true' : key;
	        el.setAttribute(key, value);
	      }
	    } else if (isEnumeratedAttr(key)) {
	      el.setAttribute(key, isFalsyAttrValue(value) || value === 'false' ? 'false' : 'true');
	    } else if (isXlink(key)) {
	      if (isFalsyAttrValue(value)) {
	        el.removeAttributeNS(xlinkNS, getXlinkProp(key));
	      } else {
	        el.setAttributeNS(xlinkNS, key, value);
	      }
	    } else {
	      if (isFalsyAttrValue(value)) {
	        el.removeAttribute(key);
	      } else {
	        el.setAttribute(key, value);
	      }
	    }
	  }
	
	  var attrs = {
	    create: updateAttrs,
	    update: updateAttrs
	  };
	
	  /*  */
	
	  function updateClass(oldVnode, vnode) {
	    var el = vnode.elm;
	    var data = vnode.data;
	    var oldData = oldVnode.data;
	    if (isUndef(data.staticClass) && isUndef(data.class) && (isUndef(oldData) || isUndef(oldData.staticClass) && isUndef(oldData.class))) {
	      return;
	    }
	
	    var cls = genClassForVnode(vnode);
	
	    // handle transition classes
	    var transitionClass = el._transitionClasses;
	    if (isDef(transitionClass)) {
	      cls = concat(cls, stringifyClass(transitionClass));
	    }
	
	    // set the class
	    if (cls !== el._prevClass) {
	      el.setAttribute('class', cls);
	      el._prevClass = cls;
	    }
	  }
	
	  var klass = {
	    create: updateClass,
	    update: updateClass
	  };
	
	  /*  */
	
	  var validDivisionCharRE = /[\w).+\-_$\]]/;
	
	  function parseFilters(exp) {
	    var inSingle = false;
	    var inDouble = false;
	    var inTemplateString = false;
	    var inRegex = false;
	    var curly = 0;
	    var square = 0;
	    var paren = 0;
	    var lastFilterIndex = 0;
	    var c, prev, i, expression, filters;
	
	    for (i = 0; i < exp.length; i++) {
	      prev = c;
	      c = exp.charCodeAt(i);
	      if (inSingle) {
	        if (c === 0x27 && prev !== 0x5C) {
	          inSingle = false;
	        }
	      } else if (inDouble) {
	        if (c === 0x22 && prev !== 0x5C) {
	          inDouble = false;
	        }
	      } else if (inTemplateString) {
	        if (c === 0x60 && prev !== 0x5C) {
	          inTemplateString = false;
	        }
	      } else if (inRegex) {
	        if (c === 0x2f && prev !== 0x5C) {
	          inRegex = false;
	        }
	      } else if (c === 0x7C && // pipe
	      exp.charCodeAt(i + 1) !== 0x7C && exp.charCodeAt(i - 1) !== 0x7C && !curly && !square && !paren) {
	        if (expression === undefined) {
	          // first filter, end of expression
	          lastFilterIndex = i + 1;
	          expression = exp.slice(0, i).trim();
	        } else {
	          pushFilter();
	        }
	      } else {
	        switch (c) {
	          case 0x22:
	            inDouble = true;break; // "
	          case 0x27:
	            inSingle = true;break; // '
	          case 0x60:
	            inTemplateString = true;break; // `
	          case 0x28:
	            paren++;break; // (
	          case 0x29:
	            paren--;break; // )
	          case 0x5B:
	            square++;break; // [
	          case 0x5D:
	            square--;break; // ]
	          case 0x7B:
	            curly++;break; // {
	          case 0x7D:
	            curly--;break; // }
	        }
	        if (c === 0x2f) {
	          // /
	          var j = i - 1;
	          var p = void 0;
	          // find first non-whitespace prev char
	          for (; j >= 0; j--) {
	            p = exp.charAt(j);
	            if (p !== ' ') {
	              break;
	            }
	          }
	          if (!p || !validDivisionCharRE.test(p)) {
	            inRegex = true;
	          }
	        }
	      }
	    }
	
	    if (expression === undefined) {
	      expression = exp.slice(0, i).trim();
	    } else if (lastFilterIndex !== 0) {
	      pushFilter();
	    }
	
	    function pushFilter() {
	      (filters || (filters = [])).push(exp.slice(lastFilterIndex, i).trim());
	      lastFilterIndex = i + 1;
	    }
	
	    if (filters) {
	      for (i = 0; i < filters.length; i++) {
	        expression = wrapFilter(expression, filters[i]);
	      }
	    }
	
	    return expression;
	  }
	
	  function wrapFilter(exp, filter) {
	    var i = filter.indexOf('(');
	    if (i < 0) {
	      // _f: resolveFilter
	      return "_f(\"" + filter + "\")(" + exp + ")";
	    } else {
	      var name = filter.slice(0, i);
	      var args = filter.slice(i + 1);
	      return "_f(\"" + name + "\")(" + exp + "," + args;
	    }
	  }
	
	  /*  */
	
	  function baseWarn(msg) {
	    console.error("[Vue compiler]: " + msg);
	  }
	
	  function pluckModuleFunction(modules, key) {
	    return modules ? modules.map(function (m) {
	      return m[key];
	    }).filter(function (_) {
	      return _;
	    }) : [];
	  }
	
	  function addProp(el, name, value) {
	    (el.props || (el.props = [])).push({ name: name, value: value });
	  }
	
	  function addAttr(el, name, value) {
	    (el.attrs || (el.attrs = [])).push({ name: name, value: value });
	  }
	
	  function addDirective(el, name, rawName, value, arg, modifiers) {
	    (el.directives || (el.directives = [])).push({ name: name, rawName: rawName, value: value, arg: arg, modifiers: modifiers });
	  }
	
	  function addHandler(el, name, value, modifiers, important, warn) {
	    // warn prevent and passive modifier
	    /* istanbul ignore if */
	    if ("development" !== 'production' && warn && modifiers && modifiers.prevent && modifiers.passive) {
	      warn('passive and prevent can\'t be used together. ' + 'Passive handler can\'t prevent default event.');
	    }
	    // check capture modifier
	    if (modifiers && modifiers.capture) {
	      delete modifiers.capture;
	      name = '!' + name; // mark the event as captured
	    }
	    if (modifiers && modifiers.once) {
	      delete modifiers.once;
	      name = '~' + name; // mark the event as once
	    }
	    /* istanbul ignore if */
	    if (modifiers && modifiers.passive) {
	      delete modifiers.passive;
	      name = '&' + name; // mark the event as passive
	    }
	    var events;
	    if (modifiers && modifiers.native) {
	      delete modifiers.native;
	      events = el.nativeEvents || (el.nativeEvents = {});
	    } else {
	      events = el.events || (el.events = {});
	    }
	    var newHandler = { value: value, modifiers: modifiers };
	    var handlers = events[name];
	    /* istanbul ignore if */
	    if (Array.isArray(handlers)) {
	      important ? handlers.unshift(newHandler) : handlers.push(newHandler);
	    } else if (handlers) {
	      events[name] = important ? [newHandler, handlers] : [handlers, newHandler];
	    } else {
	      events[name] = newHandler;
	    }
	  }
	
	  function getBindingAttr(el, name, getStatic) {
	    var dynamicValue = getAndRemoveAttr(el, ':' + name) || getAndRemoveAttr(el, 'v-bind:' + name);
	    if (dynamicValue != null) {
	      return parseFilters(dynamicValue);
	    } else if (getStatic !== false) {
	      var staticValue = getAndRemoveAttr(el, name);
	      if (staticValue != null) {
	        return JSON.stringify(staticValue);
	      }
	    }
	  }
	
	  // note: this only removes the attr from the Array (attrsList) so that it
	  // doesn't get processed by processAttrs.
	  // By default it does NOT remove it from the map (attrsMap) because the map is
	  // needed during codegen.
	  function getAndRemoveAttr(el, name, removeFromMap) {
	    var val;
	    if ((val = el.attrsMap[name]) != null) {
	      var list = el.attrsList;
	      for (var i = 0, l = list.length; i < l; i++) {
	        if (list[i].name === name) {
	          list.splice(i, 1);
	          break;
	        }
	      }
	    }
	    if (removeFromMap) {
	      delete el.attrsMap[name];
	    }
	    return val;
	  }
	
	  /*  */
	
	  /**
	   * Cross-platform code generation for component v-model
	   */
	  function genComponentModel(el, value, modifiers) {
	    var ref = modifiers || {};
	    var number = ref.number;
	    var trim = ref.trim;
	
	    var baseValueExpression = '$$v';
	    var valueExpression = baseValueExpression;
	    if (trim) {
	      valueExpression = "(typeof " + baseValueExpression + " === 'string'" + "? " + baseValueExpression + ".trim()" + ": " + baseValueExpression + ")";
	    }
	    if (number) {
	      valueExpression = "_n(" + valueExpression + ")";
	    }
	    var assignment = genAssignmentCode(value, valueExpression);
	
	    el.model = {
	      value: "(" + value + ")",
	      expression: "\"" + value + "\"",
	      callback: "function (" + baseValueExpression + ") {" + assignment + "}"
	    };
	  }
	
	  /**
	   * Cross-platform codegen helper for generating v-model value assignment code.
	   */
	  function genAssignmentCode(value, assignment) {
	    var res = parseModel(value);
	    if (res.key === null) {
	      return value + "=" + assignment;
	    } else {
	      return "$set(" + res.exp + ", " + res.key + ", " + assignment + ")";
	    }
	  }
	
	  /**
	   * Parse a v-model expression into a base path and a final key segment.
	   * Handles both dot-path and possible square brackets.
	   *
	   * Possible cases:
	   *
	   * - test
	   * - test[key]
	   * - test[test1[key]]
	   * - test["a"][key]
	   * - xxx.test[a[a].test1[key]]
	   * - test.xxx.a["asa"][test1[key]]
	   *
	   */
	
	  var len;
	  var str;
	  var chr;
	  var index$1;
	  var expressionPos;
	  var expressionEndPos;
	
	  function parseModel(val) {
	    len = val.length;
	
	    if (val.indexOf('[') < 0 || val.lastIndexOf(']') < len - 1) {
	      index$1 = val.lastIndexOf('.');
	      if (index$1 > -1) {
	        return {
	          exp: val.slice(0, index$1),
	          key: '"' + val.slice(index$1 + 1) + '"'
	        };
	      } else {
	        return {
	          exp: val,
	          key: null
	        };
	      }
	    }
	
	    str = val;
	    index$1 = expressionPos = expressionEndPos = 0;
	
	    while (!eof()) {
	      chr = next();
	      /* istanbul ignore if */
	      if (isStringStart(chr)) {
	        parseString(chr);
	      } else if (chr === 0x5B) {
	        parseBracket(chr);
	      }
	    }
	
	    return {
	      exp: val.slice(0, expressionPos),
	      key: val.slice(expressionPos + 1, expressionEndPos)
	    };
	  }
	
	  function next() {
	    return str.charCodeAt(++index$1);
	  }
	
	  function eof() {
	    return index$1 >= len;
	  }
	
	  function isStringStart(chr) {
	    return chr === 0x22 || chr === 0x27;
	  }
	
	  function parseBracket(chr) {
	    var inBracket = 1;
	    expressionPos = index$1;
	    while (!eof()) {
	      chr = next();
	      if (isStringStart(chr)) {
	        parseString(chr);
	        continue;
	      }
	      if (chr === 0x5B) {
	        inBracket++;
	      }
	      if (chr === 0x5D) {
	        inBracket--;
	      }
	      if (inBracket === 0) {
	        expressionEndPos = index$1;
	        break;
	      }
	    }
	  }
	
	  function parseString(chr) {
	    var stringQuote = chr;
	    while (!eof()) {
	      chr = next();
	      if (chr === stringQuote) {
	        break;
	      }
	    }
	  }
	
	  /*  */
	
	  var warn$1;
	
	  // in some cases, the event used has to be determined at runtime
	  // so we used some reserved tokens during compile.
	  var RANGE_TOKEN = '__r';
	  var CHECKBOX_RADIO_TOKEN = '__c';
	
	  function model(el, dir, _warn) {
	    warn$1 = _warn;
	    var value = dir.value;
	    var modifiers = dir.modifiers;
	    var tag = el.tag;
	    var type = el.attrsMap.type;
	
	    {
	      // inputs with type="file" are read only and setting the input's
	      // value will throw an error.
	      if (tag === 'input' && type === 'file') {
	        warn$1("<" + el.tag + " v-model=\"" + value + "\" type=\"file\">:\n" + "File inputs are read only. Use a v-on:change listener instead.");
	      }
	    }
	
	    if (el.component) {
	      genComponentModel(el, value, modifiers);
	      // component v-model doesn't need extra runtime
	      return false;
	    } else if (tag === 'select') {
	      genSelect(el, value, modifiers);
	    } else if (tag === 'input' && type === 'checkbox') {
	      genCheckboxModel(el, value, modifiers);
	    } else if (tag === 'input' && type === 'radio') {
	      genRadioModel(el, value, modifiers);
	    } else if (tag === 'input' || tag === 'textarea') {
	      genDefaultModel(el, value, modifiers);
	    } else if (!config.isReservedTag(tag)) {
	      genComponentModel(el, value, modifiers);
	      // component v-model doesn't need extra runtime
	      return false;
	    } else {
	      warn$1("<" + el.tag + " v-model=\"" + value + "\">: " + "v-model is not supported on this element type. " + 'If you are working with contenteditable, it\'s recommended to ' + 'wrap a library dedicated for that purpose inside a custom component.');
	    }
	
	    // ensure runtime directive metadata
	    return true;
	  }
	
	  function genCheckboxModel(el, value, modifiers) {
	    var number = modifiers && modifiers.number;
	    var valueBinding = getBindingAttr(el, 'value') || 'null';
	    var trueValueBinding = getBindingAttr(el, 'true-value') || 'true';
	    var falseValueBinding = getBindingAttr(el, 'false-value') || 'false';
	    addProp(el, 'checked', "Array.isArray(" + value + ")" + "?_i(" + value + "," + valueBinding + ")>-1" + (trueValueBinding === 'true' ? ":(" + value + ")" : ":_q(" + value + "," + trueValueBinding + ")"));
	    addHandler(el, 'change', "var $$a=" + value + "," + '$$el=$event.target,' + "$$c=$$el.checked?(" + trueValueBinding + "):(" + falseValueBinding + ");" + 'if(Array.isArray($$a)){' + "var $$v=" + (number ? '_n(' + valueBinding + ')' : valueBinding) + "," + '$$i=_i($$a,$$v);' + "if($$el.checked){$$i<0&&(" + value + "=$$a.concat([$$v]))}" + "else{$$i>-1&&(" + value + "=$$a.slice(0,$$i).concat($$a.slice($$i+1)))}" + "}else{" + genAssignmentCode(value, '$$c') + "}", null, true);
	  }
	
	  function genRadioModel(el, value, modifiers) {
	    var number = modifiers && modifiers.number;
	    var valueBinding = getBindingAttr(el, 'value') || 'null';
	    valueBinding = number ? "_n(" + valueBinding + ")" : valueBinding;
	    addProp(el, 'checked', "_q(" + value + "," + valueBinding + ")");
	    addHandler(el, 'change', genAssignmentCode(value, valueBinding), null, true);
	  }
	
	  function genSelect(el, value, modifiers) {
	    var number = modifiers && modifiers.number;
	    var selectedVal = "Array.prototype.filter" + ".call($event.target.options,function(o){return o.selected})" + ".map(function(o){var val = \"_value\" in o ? o._value : o.value;" + "return " + (number ? '_n(val)' : 'val') + "})";
	
	    var assignment = '$event.target.multiple ? $$selectedVal : $$selectedVal[0]';
	    var code = "var $$selectedVal = " + selectedVal + ";";
	    code = code + " " + genAssignmentCode(value, assignment);
	    addHandler(el, 'change', code, null, true);
	  }
	
	  function genDefaultModel(el, value, modifiers) {
	    var type = el.attrsMap.type;
	    var ref = modifiers || {};
	    var lazy = ref.lazy;
	    var number = ref.number;
	    var trim = ref.trim;
	    var needCompositionGuard = !lazy && type !== 'range';
	    var event = lazy ? 'change' : type === 'range' ? RANGE_TOKEN : 'input';
	
	    var valueExpression = '$event.target.value';
	    if (trim) {
	      valueExpression = "$event.target.value.trim()";
	    }
	    if (number) {
	      valueExpression = "_n(" + valueExpression + ")";
	    }
	
	    var code = genAssignmentCode(value, valueExpression);
	    if (needCompositionGuard) {
	      code = "if($event.target.composing)return;" + code;
	    }
	
	    addProp(el, 'value', "(" + value + ")");
	    addHandler(el, event, code, null, true);
	    if (trim || number) {
	      addHandler(el, 'blur', '$forceUpdate()');
	    }
	  }
	
	  /*  */
	
	  // normalize v-model event tokens that can only be determined at runtime.
	  // it's important to place the event as the first in the array because
	  // the whole point is ensuring the v-model callback gets called before
	  // user-attached handlers.
	  function normalizeEvents(on) {
	    /* istanbul ignore if */
	    if (isDef(on[RANGE_TOKEN])) {
	      // IE input[type=range] only supports `change` event
	      var event = isIE ? 'change' : 'input';
	      on[event] = [].concat(on[RANGE_TOKEN], on[event] || []);
	      delete on[RANGE_TOKEN];
	    }
	    // This was originally intended to fix #4521 but no longer necessary
	    // after 2.5. Keeping it for backwards compat with generated code from < 2.4
	    /* istanbul ignore if */
	    if (isDef(on[CHECKBOX_RADIO_TOKEN])) {
	      on.change = [].concat(on[CHECKBOX_RADIO_TOKEN], on.change || []);
	      delete on[CHECKBOX_RADIO_TOKEN];
	    }
	  }
	
	  var target$1;
	
	  function createOnceHandler(handler, event, capture) {
	    var _target = target$1; // save current target element in closure
	    return function onceHandler() {
	      var res = handler.apply(null, arguments);
	      if (res !== null) {
	        remove$2(event, onceHandler, capture, _target);
	      }
	    };
	  }
	
	  function add$1(event, handler, once$$1, capture, passive) {
	    handler = withMacroTask(handler);
	    if (once$$1) {
	      handler = createOnceHandler(handler, event, capture);
	    }
	    target$1.addEventListener(event, handler, supportsPassive ? { capture: capture, passive: passive } : capture);
	  }
	
	  function remove$2(event, handler, capture, _target) {
	    (_target || target$1).removeEventListener(event, handler._withTask || handler, capture);
	  }
	
	  function updateDOMListeners(oldVnode, vnode) {
	    if (isUndef(oldVnode.data.on) && isUndef(vnode.data.on)) {
	      return;
	    }
	    var on = vnode.data.on || {};
	    var oldOn = oldVnode.data.on || {};
	    target$1 = vnode.elm;
	    normalizeEvents(on);
	    updateListeners(on, oldOn, add$1, remove$2, vnode.context);
	  }
	
	  var events = {
	    create: updateDOMListeners,
	    update: updateDOMListeners
	  };
	
	  /*  */
	
	  function updateDOMProps(oldVnode, vnode) {
	    if (isUndef(oldVnode.data.domProps) && isUndef(vnode.data.domProps)) {
	      return;
	    }
	    var key, cur;
	    var elm = vnode.elm;
	    var oldProps = oldVnode.data.domProps || {};
	    var props = vnode.data.domProps || {};
	    // clone observed objects, as the user probably wants to mutate it
	    if (isDef(props.__ob__)) {
	      props = vnode.data.domProps = extend({}, props);
	    }
	
	    for (key in oldProps) {
	      if (isUndef(props[key])) {
	        elm[key] = '';
	      }
	    }
	    for (key in props) {
	      cur = props[key];
	      // ignore children if the node has textContent or innerHTML,
	      // as these will throw away existing DOM nodes and cause removal errors
	      // on subsequent patches (#3360)
	      if (key === 'textContent' || key === 'innerHTML') {
	        if (vnode.children) {
	          vnode.children.length = 0;
	        }
	        if (cur === oldProps[key]) {
	          continue;
	        }
	        // #6601 work around Chrome version <= 55 bug where single textNode
	        // replaced by innerHTML/textContent retains its parentNode property
	        if (elm.childNodes.length === 1) {
	          elm.removeChild(elm.childNodes[0]);
	        }
	      }
	
	      if (key === 'value') {
	        // store value as _value as well since
	        // non-string values will be stringified
	        elm._value = cur;
	        // avoid resetting cursor position when value is the same
	        var strCur = isUndef(cur) ? '' : String(cur);
	        if (shouldUpdateValue(elm, strCur)) {
	          elm.value = strCur;
	        }
	      } else {
	        elm[key] = cur;
	      }
	    }
	  }
	
	  // check platforms/web/util/attrs.js acceptValue
	
	
	  function shouldUpdateValue(elm, checkVal) {
	    return !elm.composing && (elm.tagName === 'OPTION' || isDirty(elm, checkVal) || isInputChanged(elm, checkVal));
	  }
	
	  function isDirty(elm, checkVal) {
	    // return true when textbox (.number and .trim) loses focus and its value is
	    // not equal to the updated value
	    var notInFocus = true;
	    // #6157
	    // work around IE bug when accessing document.activeElement in an iframe
	    try {
	      notInFocus = document.activeElement !== elm;
	    } catch (e) {}
	    return notInFocus && elm.value !== checkVal;
	  }
	
	  function isInputChanged(elm, newVal) {
	    var value = elm.value;
	    var modifiers = elm._vModifiers; // injected by v-model runtime
	    if (isDef(modifiers) && modifiers.number) {
	      return toNumber(value) !== toNumber(newVal);
	    }
	    if (isDef(modifiers) && modifiers.trim) {
	      return value.trim() !== newVal.trim();
	    }
	    return value !== newVal;
	  }
	
	  var domProps = {
	    create: updateDOMProps,
	    update: updateDOMProps
	  };
	
	  /*  */
	
	  var parseStyleText = cached(function (cssText) {
	    var res = {};
	    var listDelimiter = /;(?![^(]*\))/g;
	    var propertyDelimiter = /:(.+)/;
	    cssText.split(listDelimiter).forEach(function (item) {
	      if (item) {
	        var tmp = item.split(propertyDelimiter);
	        tmp.length > 1 && (res[tmp[0].trim()] = tmp[1].trim());
	      }
	    });
	    return res;
	  });
	
	  // merge static and dynamic style data on the same vnode
	  function normalizeStyleData(data) {
	    var style = normalizeStyleBinding(data.style);
	    // static style is pre-processed into an object during compilation
	    // and is always a fresh object, so it's safe to merge into it
	    return data.staticStyle ? extend(data.staticStyle, style) : style;
	  }
	
	  // normalize possible array / string values into Object
	  function normalizeStyleBinding(bindingStyle) {
	    if (Array.isArray(bindingStyle)) {
	      return toObject(bindingStyle);
	    }
	    if (typeof bindingStyle === 'string') {
	      return parseStyleText(bindingStyle);
	    }
	    return bindingStyle;
	  }
	
	  /**
	   * parent component style should be after child's
	   * so that parent component's style could override it
	   */
	  function getStyle(vnode, checkChild) {
	    var res = {};
	    var styleData;
	
	    if (checkChild) {
	      var childNode = vnode;
	      while (childNode.componentInstance) {
	        childNode = childNode.componentInstance._vnode;
	        if (childNode.data && (styleData = normalizeStyleData(childNode.data))) {
	          extend(res, styleData);
	        }
	      }
	    }
	
	    if (styleData = normalizeStyleData(vnode.data)) {
	      extend(res, styleData);
	    }
	
	    var parentNode = vnode;
	    while (parentNode = parentNode.parent) {
	      if (parentNode.data && (styleData = normalizeStyleData(parentNode.data))) {
	        extend(res, styleData);
	      }
	    }
	    return res;
	  }
	
	  /*  */
	
	  var cssVarRE = /^--/;
	  var importantRE = /\s*!important$/;
	  var setProp = function setProp(el, name, val) {
	    /* istanbul ignore if */
	    if (cssVarRE.test(name)) {
	      el.style.setProperty(name, val);
	    } else if (importantRE.test(val)) {
	      el.style.setProperty(name, val.replace(importantRE, ''), 'important');
	    } else {
	      var normalizedName = normalize(name);
	      if (Array.isArray(val)) {
	        // Support values array created by autoprefixer, e.g.
	        // {display: ["-webkit-box", "-ms-flexbox", "flex"]}
	        // Set them one by one, and the browser will only set those it can recognize
	        for (var i = 0, len = val.length; i < len; i++) {
	          el.style[normalizedName] = val[i];
	        }
	      } else {
	        el.style[normalizedName] = val;
	      }
	    }
	  };
	
	  var vendorNames = ['Webkit', 'Moz', 'ms'];
	
	  var emptyStyle;
	  var normalize = cached(function (prop) {
	    emptyStyle = emptyStyle || document.createElement('div').style;
	    prop = camelize(prop);
	    if (prop !== 'filter' && prop in emptyStyle) {
	      return prop;
	    }
	    var capName = prop.charAt(0).toUpperCase() + prop.slice(1);
	    for (var i = 0; i < vendorNames.length; i++) {
	      var name = vendorNames[i] + capName;
	      if (name in emptyStyle) {
	        return name;
	      }
	    }
	  });
	
	  function updateStyle(oldVnode, vnode) {
	    var data = vnode.data;
	    var oldData = oldVnode.data;
	
	    if (isUndef(data.staticStyle) && isUndef(data.style) && isUndef(oldData.staticStyle) && isUndef(oldData.style)) {
	      return;
	    }
	
	    var cur, name;
	    var el = vnode.elm;
	    var oldStaticStyle = oldData.staticStyle;
	    var oldStyleBinding = oldData.normalizedStyle || oldData.style || {};
	
	    // if static style exists, stylebinding already merged into it when doing normalizeStyleData
	    var oldStyle = oldStaticStyle || oldStyleBinding;
	
	    var style = normalizeStyleBinding(vnode.data.style) || {};
	
	    // store normalized style under a different key for next diff
	    // make sure to clone it if it's reactive, since the user likely wants
	    // to mutate it.
	    vnode.data.normalizedStyle = isDef(style.__ob__) ? extend({}, style) : style;
	
	    var newStyle = getStyle(vnode, true);
	
	    for (name in oldStyle) {
	      if (isUndef(newStyle[name])) {
	        setProp(el, name, '');
	      }
	    }
	    for (name in newStyle) {
	      cur = newStyle[name];
	      if (cur !== oldStyle[name]) {
	        // ie9 setting to null has no effect, must use empty string
	        setProp(el, name, cur == null ? '' : cur);
	      }
	    }
	  }
	
	  var style = {
	    create: updateStyle,
	    update: updateStyle
	  };
	
	  /*  */
	
	  /**
	   * Add class with compatibility for SVG since classList is not supported on
	   * SVG elements in IE
	   */
	  function addClass(el, cls) {
	    /* istanbul ignore if */
	    if (!cls || !(cls = cls.trim())) {
	      return;
	    }
	
	    /* istanbul ignore else */
	    if (el.classList) {
	      if (cls.indexOf(' ') > -1) {
	        cls.split(/\s+/).forEach(function (c) {
	          return el.classList.add(c);
	        });
	      } else {
	        el.classList.add(cls);
	      }
	    } else {
	      var cur = " " + (el.getAttribute('class') || '') + " ";
	      if (cur.indexOf(' ' + cls + ' ') < 0) {
	        el.setAttribute('class', (cur + cls).trim());
	      }
	    }
	  }
	
	  /**
	   * Remove class with compatibility for SVG since classList is not supported on
	   * SVG elements in IE
	   */
	  function removeClass(el, cls) {
	    /* istanbul ignore if */
	    if (!cls || !(cls = cls.trim())) {
	      return;
	    }
	
	    /* istanbul ignore else */
	    if (el.classList) {
	      if (cls.indexOf(' ') > -1) {
	        cls.split(/\s+/).forEach(function (c) {
	          return el.classList.remove(c);
	        });
	      } else {
	        el.classList.remove(cls);
	      }
	      if (!el.classList.length) {
	        el.removeAttribute('class');
	      }
	    } else {
	      var cur = " " + (el.getAttribute('class') || '') + " ";
	      var tar = ' ' + cls + ' ';
	      while (cur.indexOf(tar) >= 0) {
	        cur = cur.replace(tar, ' ');
	      }
	      cur = cur.trim();
	      if (cur) {
	        el.setAttribute('class', cur);
	      } else {
	        el.removeAttribute('class');
	      }
	    }
	  }
	
	  /*  */
	
	  function resolveTransition(def) {
	    if (!def) {
	      return;
	    }
	    /* istanbul ignore else */
	    if ((typeof def === 'undefined' ? 'undefined' : _typeof(def)) === 'object') {
	      var res = {};
	      if (def.css !== false) {
	        extend(res, autoCssTransition(def.name || 'v'));
	      }
	      extend(res, def);
	      return res;
	    } else if (typeof def === 'string') {
	      return autoCssTransition(def);
	    }
	  }
	
	  var autoCssTransition = cached(function (name) {
	    return {
	      enterClass: name + "-enter",
	      enterToClass: name + "-enter-to",
	      enterActiveClass: name + "-enter-active",
	      leaveClass: name + "-leave",
	      leaveToClass: name + "-leave-to",
	      leaveActiveClass: name + "-leave-active"
	    };
	  });
	
	  var hasTransition = inBrowser && !isIE9;
	  var TRANSITION = 'transition';
	  var ANIMATION = 'animation';
	
	  // Transition property/event sniffing
	  var transitionProp = 'transition';
	  var transitionEndEvent = 'transitionend';
	  var animationProp = 'animation';
	  var animationEndEvent = 'animationend';
	  if (hasTransition) {
	    /* istanbul ignore if */
	    if (window.ontransitionend === undefined && window.onwebkittransitionend !== undefined) {
	      transitionProp = 'WebkitTransition';
	      transitionEndEvent = 'webkitTransitionEnd';
	    }
	    if (window.onanimationend === undefined && window.onwebkitanimationend !== undefined) {
	      animationProp = 'WebkitAnimation';
	      animationEndEvent = 'webkitAnimationEnd';
	    }
	  }
	
	  // binding to window is necessary to make hot reload work in IE in strict mode
	  var raf = inBrowser ? window.requestAnimationFrame ? window.requestAnimationFrame.bind(window) : setTimeout : /* istanbul ignore next */function (fn) {
	    return fn();
	  };
	
	  function nextFrame(fn) {
	    raf(function () {
	      raf(fn);
	    });
	  }
	
	  function addTransitionClass(el, cls) {
	    var transitionClasses = el._transitionClasses || (el._transitionClasses = []);
	    if (transitionClasses.indexOf(cls) < 0) {
	      transitionClasses.push(cls);
	      addClass(el, cls);
	    }
	  }
	
	  function removeTransitionClass(el, cls) {
	    if (el._transitionClasses) {
	      remove(el._transitionClasses, cls);
	    }
	    removeClass(el, cls);
	  }
	
	  function whenTransitionEnds(el, expectedType, cb) {
	    var ref = getTransitionInfo(el, expectedType);
	    var type = ref.type;
	    var timeout = ref.timeout;
	    var propCount = ref.propCount;
	    if (!type) {
	      return cb();
	    }
	    var event = type === TRANSITION ? transitionEndEvent : animationEndEvent;
	    var ended = 0;
	    var end = function end() {
	      el.removeEventListener(event, onEnd);
	      cb();
	    };
	    var onEnd = function onEnd(e) {
	      if (e.target === el) {
	        if (++ended >= propCount) {
	          end();
	        }
	      }
	    };
	    setTimeout(function () {
	      if (ended < propCount) {
	        end();
	      }
	    }, timeout + 1);
	    el.addEventListener(event, onEnd);
	  }
	
	  var transformRE = /\b(transform|all)(,|$)/;
	
	  function getTransitionInfo(el, expectedType) {
	    var styles = window.getComputedStyle(el);
	    var transitionDelays = styles[transitionProp + 'Delay'].split(', ');
	    var transitionDurations = styles[transitionProp + 'Duration'].split(', ');
	    var transitionTimeout = getTimeout(transitionDelays, transitionDurations);
	    var animationDelays = styles[animationProp + 'Delay'].split(', ');
	    var animationDurations = styles[animationProp + 'Duration'].split(', ');
	    var animationTimeout = getTimeout(animationDelays, animationDurations);
	
	    var type;
	    var timeout = 0;
	    var propCount = 0;
	    /* istanbul ignore if */
	    if (expectedType === TRANSITION) {
	      if (transitionTimeout > 0) {
	        type = TRANSITION;
	        timeout = transitionTimeout;
	        propCount = transitionDurations.length;
	      }
	    } else if (expectedType === ANIMATION) {
	      if (animationTimeout > 0) {
	        type = ANIMATION;
	        timeout = animationTimeout;
	        propCount = animationDurations.length;
	      }
	    } else {
	      timeout = Math.max(transitionTimeout, animationTimeout);
	      type = timeout > 0 ? transitionTimeout > animationTimeout ? TRANSITION : ANIMATION : null;
	      propCount = type ? type === TRANSITION ? transitionDurations.length : animationDurations.length : 0;
	    }
	    var hasTransform = type === TRANSITION && transformRE.test(styles[transitionProp + 'Property']);
	    return {
	      type: type,
	      timeout: timeout,
	      propCount: propCount,
	      hasTransform: hasTransform
	    };
	  }
	
	  function getTimeout(delays, durations) {
	    /* istanbul ignore next */
	    while (delays.length < durations.length) {
	      delays = delays.concat(delays);
	    }
	
	    return Math.max.apply(null, durations.map(function (d, i) {
	      return toMs(d) + toMs(delays[i]);
	    }));
	  }
	
	  function toMs(s) {
	    return Number(s.slice(0, -1)) * 1000;
	  }
	
	  /*  */
	
	  function enter(vnode, toggleDisplay) {
	    var el = vnode.elm;
	
	    // call leave callback now
	    if (isDef(el._leaveCb)) {
	      el._leaveCb.cancelled = true;
	      el._leaveCb();
	    }
	
	    var data = resolveTransition(vnode.data.transition);
	    if (isUndef(data)) {
	      return;
	    }
	
	    /* istanbul ignore if */
	    if (isDef(el._enterCb) || el.nodeType !== 1) {
	      return;
	    }
	
	    var css = data.css;
	    var type = data.type;
	    var enterClass = data.enterClass;
	    var enterToClass = data.enterToClass;
	    var enterActiveClass = data.enterActiveClass;
	    var appearClass = data.appearClass;
	    var appearToClass = data.appearToClass;
	    var appearActiveClass = data.appearActiveClass;
	    var beforeEnter = data.beforeEnter;
	    var enter = data.enter;
	    var afterEnter = data.afterEnter;
	    var enterCancelled = data.enterCancelled;
	    var beforeAppear = data.beforeAppear;
	    var appear = data.appear;
	    var afterAppear = data.afterAppear;
	    var appearCancelled = data.appearCancelled;
	    var duration = data.duration;
	
	    // activeInstance will always be the <transition> component managing this
	    // transition. One edge case to check is when the <transition> is placed
	    // as the root node of a child component. In that case we need to check
	    // <transition>'s parent for appear check.
	    var context = activeInstance;
	    var transitionNode = activeInstance.$vnode;
	    while (transitionNode && transitionNode.parent) {
	      transitionNode = transitionNode.parent;
	      context = transitionNode.context;
	    }
	
	    var isAppear = !context._isMounted || !vnode.isRootInsert;
	
	    if (isAppear && !appear && appear !== '') {
	      return;
	    }
	
	    var startClass = isAppear && appearClass ? appearClass : enterClass;
	    var activeClass = isAppear && appearActiveClass ? appearActiveClass : enterActiveClass;
	    var toClass = isAppear && appearToClass ? appearToClass : enterToClass;
	
	    var beforeEnterHook = isAppear ? beforeAppear || beforeEnter : beforeEnter;
	    var enterHook = isAppear ? typeof appear === 'function' ? appear : enter : enter;
	    var afterEnterHook = isAppear ? afterAppear || afterEnter : afterEnter;
	    var enterCancelledHook = isAppear ? appearCancelled || enterCancelled : enterCancelled;
	
	    var explicitEnterDuration = toNumber(isObject(duration) ? duration.enter : duration);
	
	    if ("development" !== 'production' && explicitEnterDuration != null) {
	      checkDuration(explicitEnterDuration, 'enter', vnode);
	    }
	
	    var expectsCSS = css !== false && !isIE9;
	    var userWantsControl = getHookArgumentsLength(enterHook);
	
	    var cb = el._enterCb = once(function () {
	      if (expectsCSS) {
	        removeTransitionClass(el, toClass);
	        removeTransitionClass(el, activeClass);
	      }
	      if (cb.cancelled) {
	        if (expectsCSS) {
	          removeTransitionClass(el, startClass);
	        }
	        enterCancelledHook && enterCancelledHook(el);
	      } else {
	        afterEnterHook && afterEnterHook(el);
	      }
	      el._enterCb = null;
	    });
	
	    if (!vnode.data.show) {
	      // remove pending leave element on enter by injecting an insert hook
	      mergeVNodeHook(vnode.data.hook || (vnode.data.hook = {}), 'insert', function () {
	        var parent = el.parentNode;
	        var pendingNode = parent && parent._pending && parent._pending[vnode.key];
	        if (pendingNode && pendingNode.tag === vnode.tag && pendingNode.elm._leaveCb) {
	          pendingNode.elm._leaveCb();
	        }
	        enterHook && enterHook(el, cb);
	      });
	    }
	
	    // start enter transition
	    beforeEnterHook && beforeEnterHook(el);
	    if (expectsCSS) {
	      addTransitionClass(el, startClass);
	      addTransitionClass(el, activeClass);
	      nextFrame(function () {
	        addTransitionClass(el, toClass);
	        removeTransitionClass(el, startClass);
	        if (!cb.cancelled && !userWantsControl) {
	          if (isValidDuration(explicitEnterDuration)) {
	            setTimeout(cb, explicitEnterDuration);
	          } else {
	            whenTransitionEnds(el, type, cb);
	          }
	        }
	      });
	    }
	
	    if (vnode.data.show) {
	      toggleDisplay && toggleDisplay();
	      enterHook && enterHook(el, cb);
	    }
	
	    if (!expectsCSS && !userWantsControl) {
	      cb();
	    }
	  }
	
	  function leave(vnode, rm) {
	    var el = vnode.elm;
	
	    // call enter callback now
	    if (isDef(el._enterCb)) {
	      el._enterCb.cancelled = true;
	      el._enterCb();
	    }
	
	    var data = resolveTransition(vnode.data.transition);
	    if (isUndef(data)) {
	      return rm();
	    }
	
	    /* istanbul ignore if */
	    if (isDef(el._leaveCb) || el.nodeType !== 1) {
	      return;
	    }
	
	    var css = data.css;
	    var type = data.type;
	    var leaveClass = data.leaveClass;
	    var leaveToClass = data.leaveToClass;
	    var leaveActiveClass = data.leaveActiveClass;
	    var beforeLeave = data.beforeLeave;
	    var leave = data.leave;
	    var afterLeave = data.afterLeave;
	    var leaveCancelled = data.leaveCancelled;
	    var delayLeave = data.delayLeave;
	    var duration = data.duration;
	
	    var expectsCSS = css !== false && !isIE9;
	    var userWantsControl = getHookArgumentsLength(leave);
	
	    var explicitLeaveDuration = toNumber(isObject(duration) ? duration.leave : duration);
	
	    if ("development" !== 'production' && isDef(explicitLeaveDuration)) {
	      checkDuration(explicitLeaveDuration, 'leave', vnode);
	    }
	
	    var cb = el._leaveCb = once(function () {
	      if (el.parentNode && el.parentNode._pending) {
	        el.parentNode._pending[vnode.key] = null;
	      }
	      if (expectsCSS) {
	        removeTransitionClass(el, leaveToClass);
	        removeTransitionClass(el, leaveActiveClass);
	      }
	      if (cb.cancelled) {
	        if (expectsCSS) {
	          removeTransitionClass(el, leaveClass);
	        }
	        leaveCancelled && leaveCancelled(el);
	      } else {
	        rm();
	        afterLeave && afterLeave(el);
	      }
	      el._leaveCb = null;
	    });
	
	    if (delayLeave) {
	      delayLeave(performLeave);
	    } else {
	      performLeave();
	    }
	
	    function performLeave() {
	      // the delayed leave may have already been cancelled
	      if (cb.cancelled) {
	        return;
	      }
	      // record leaving element
	      if (!vnode.data.show) {
	        (el.parentNode._pending || (el.parentNode._pending = {}))[vnode.key] = vnode;
	      }
	      beforeLeave && beforeLeave(el);
	      if (expectsCSS) {
	        addTransitionClass(el, leaveClass);
	        addTransitionClass(el, leaveActiveClass);
	        nextFrame(function () {
	          addTransitionClass(el, leaveToClass);
	          removeTransitionClass(el, leaveClass);
	          if (!cb.cancelled && !userWantsControl) {
	            if (isValidDuration(explicitLeaveDuration)) {
	              setTimeout(cb, explicitLeaveDuration);
	            } else {
	              whenTransitionEnds(el, type, cb);
	            }
	          }
	        });
	      }
	      leave && leave(el, cb);
	      if (!expectsCSS && !userWantsControl) {
	        cb();
	      }
	    }
	  }
	
	  // only used in dev mode
	  function checkDuration(val, name, vnode) {
	    if (typeof val !== 'number') {
	      warn("<transition> explicit " + name + " duration is not a valid number - " + "got " + JSON.stringify(val) + ".", vnode.context);
	    } else if (isNaN(val)) {
	      warn("<transition> explicit " + name + " duration is NaN - " + 'the duration expression might be incorrect.', vnode.context);
	    }
	  }
	
	  function isValidDuration(val) {
	    return typeof val === 'number' && !isNaN(val);
	  }
	
	  /**
	   * Normalize a transition hook's argument length. The hook may be:
	   * - a merged hook (invoker) with the original in .fns
	   * - a wrapped component method (check ._length)
	   * - a plain function (.length)
	   */
	  function getHookArgumentsLength(fn) {
	    if (isUndef(fn)) {
	      return false;
	    }
	    var invokerFns = fn.fns;
	    if (isDef(invokerFns)) {
	      // invoker
	      return getHookArgumentsLength(Array.isArray(invokerFns) ? invokerFns[0] : invokerFns);
	    } else {
	      return (fn._length || fn.length) > 1;
	    }
	  }
	
	  function _enter(_, vnode) {
	    if (vnode.data.show !== true) {
	      enter(vnode);
	    }
	  }
	
	  var transition = inBrowser ? {
	    create: _enter,
	    activate: _enter,
	    remove: function remove$$1(vnode, rm) {
	      /* istanbul ignore else */
	      if (vnode.data.show !== true) {
	        leave(vnode, rm);
	      } else {
	        rm();
	      }
	    }
	  } : {};
	
	  var platformModules = [attrs, klass, events, domProps, style, transition];
	
	  /*  */
	
	  // the directive module should be applied last, after all
	  // built-in modules have been applied.
	  var modules = platformModules.concat(baseModules);
	
	  var patch = createPatchFunction({ nodeOps: nodeOps, modules: modules });
	
	  /**
	   * Not type checking this file because flow doesn't like attaching
	   * properties to Elements.
	   */
	
	  /* istanbul ignore if */
	  if (isIE9) {
	    // http://www.matts411.com/post/internet-explorer-9-oninput/
	    document.addEventListener('selectionchange', function () {
	      var el = document.activeElement;
	      if (el && el.vmodel) {
	        trigger(el, 'input');
	      }
	    });
	  }
	
	  var model$1 = {
	    inserted: function inserted(el, binding, vnode) {
	      if (vnode.tag === 'select') {
	        setSelected(el, binding, vnode.context);
	        el._vOptions = [].map.call(el.options, getValue);
	      } else if (vnode.tag === 'textarea' || isTextInputType(el.type)) {
	        el._vModifiers = binding.modifiers;
	        if (!binding.modifiers.lazy) {
	          // Safari < 10.2 & UIWebView doesn't fire compositionend when
	          // switching focus before confirming composition choice
	          // this also fixes the issue where some browsers e.g. iOS Chrome
	          // fires "change" instead of "input" on autocomplete.
	          el.addEventListener('change', onCompositionEnd);
	          if (!isAndroid) {
	            el.addEventListener('compositionstart', onCompositionStart);
	            el.addEventListener('compositionend', onCompositionEnd);
	          }
	          /* istanbul ignore if */
	          if (isIE9) {
	            el.vmodel = true;
	          }
	        }
	      }
	    },
	    componentUpdated: function componentUpdated(el, binding, vnode) {
	      if (vnode.tag === 'select') {
	        setSelected(el, binding, vnode.context);
	        // in case the options rendered by v-for have changed,
	        // it's possible that the value is out-of-sync with the rendered options.
	        // detect such cases and filter out values that no longer has a matching
	        // option in the DOM.
	        var prevOptions = el._vOptions;
	        var curOptions = el._vOptions = [].map.call(el.options, getValue);
	        if (curOptions.some(function (o, i) {
	          return !looseEqual(o, prevOptions[i]);
	        })) {
	          // trigger change event if
	          // no matching option found for at least one value
	          var needReset = el.multiple ? binding.value.some(function (v) {
	            return hasNoMatchingOption(v, curOptions);
	          }) : binding.value !== binding.oldValue && hasNoMatchingOption(binding.value, curOptions);
	          if (needReset) {
	            trigger(el, 'change');
	          }
	        }
	      }
	    }
	  };
	
	  function setSelected(el, binding, vm) {
	    actuallySetSelected(el, binding, vm);
	    /* istanbul ignore if */
	    if (isIE || isEdge) {
	      setTimeout(function () {
	        actuallySetSelected(el, binding, vm);
	      }, 0);
	    }
	  }
	
	  function actuallySetSelected(el, binding, vm) {
	    var value = binding.value;
	    var isMultiple = el.multiple;
	    if (isMultiple && !Array.isArray(value)) {
	      "development" !== 'production' && warn("<select multiple v-model=\"" + binding.expression + "\"> " + "expects an Array value for its binding, but got " + Object.prototype.toString.call(value).slice(8, -1), vm);
	      return;
	    }
	    var selected, option;
	    for (var i = 0, l = el.options.length; i < l; i++) {
	      option = el.options[i];
	      if (isMultiple) {
	        selected = looseIndexOf(value, getValue(option)) > -1;
	        if (option.selected !== selected) {
	          option.selected = selected;
	        }
	      } else {
	        if (looseEqual(getValue(option), value)) {
	          if (el.selectedIndex !== i) {
	            el.selectedIndex = i;
	          }
	          return;
	        }
	      }
	    }
	    if (!isMultiple) {
	      el.selectedIndex = -1;
	    }
	  }
	
	  function hasNoMatchingOption(value, options) {
	    return options.every(function (o) {
	      return !looseEqual(o, value);
	    });
	  }
	
	  function getValue(option) {
	    return '_value' in option ? option._value : option.value;
	  }
	
	  function onCompositionStart(e) {
	    e.target.composing = true;
	  }
	
	  function onCompositionEnd(e) {
	    // prevent triggering an input event for no reason
	    if (!e.target.composing) {
	      return;
	    }
	    e.target.composing = false;
	    trigger(e.target, 'input');
	  }
	
	  function trigger(el, type) {
	    var e = document.createEvent('HTMLEvents');
	    e.initEvent(type, true, true);
	    el.dispatchEvent(e);
	  }
	
	  /*  */
	
	  // recursively search for possible transition defined inside the component root
	  function locateNode(vnode) {
	    return vnode.componentInstance && (!vnode.data || !vnode.data.transition) ? locateNode(vnode.componentInstance._vnode) : vnode;
	  }
	
	  var show = {
	    bind: function bind(el, ref, vnode) {
	      var value = ref.value;
	
	      vnode = locateNode(vnode);
	      var transition$$1 = vnode.data && vnode.data.transition;
	      var originalDisplay = el.__vOriginalDisplay = el.style.display === 'none' ? '' : el.style.display;
	      if (value && transition$$1) {
	        vnode.data.show = true;
	        enter(vnode, function () {
	          el.style.display = originalDisplay;
	        });
	      } else {
	        el.style.display = value ? originalDisplay : 'none';
	      }
	    },
	
	    update: function update(el, ref, vnode) {
	      var value = ref.value;
	      var oldValue = ref.oldValue;
	
	      /* istanbul ignore if */
	      if (value === oldValue) {
	        return;
	      }
	      vnode = locateNode(vnode);
	      var transition$$1 = vnode.data && vnode.data.transition;
	      if (transition$$1) {
	        vnode.data.show = true;
	        if (value) {
	          enter(vnode, function () {
	            el.style.display = el.__vOriginalDisplay;
	          });
	        } else {
	          leave(vnode, function () {
	            el.style.display = 'none';
	          });
	        }
	      } else {
	        el.style.display = value ? el.__vOriginalDisplay : 'none';
	      }
	    },
	
	    unbind: function unbind(el, binding, vnode, oldVnode, isDestroy) {
	      if (!isDestroy) {
	        el.style.display = el.__vOriginalDisplay;
	      }
	    }
	  };
	
	  var platformDirectives = {
	    model: model$1,
	    show: show
	  };
	
	  /*  */
	
	  // Provides transition support for a single element/component.
	  // supports transition mode (out-in / in-out)
	
	  var transitionProps = {
	    name: String,
	    appear: Boolean,
	    css: Boolean,
	    mode: String,
	    type: String,
	    enterClass: String,
	    leaveClass: String,
	    enterToClass: String,
	    leaveToClass: String,
	    enterActiveClass: String,
	    leaveActiveClass: String,
	    appearClass: String,
	    appearActiveClass: String,
	    appearToClass: String,
	    duration: [Number, String, Object]
	  };
	
	  // in case the child is also an abstract component, e.g. <keep-alive>
	  // we want to recursively retrieve the real component to be rendered
	  function getRealChild(vnode) {
	    var compOptions = vnode && vnode.componentOptions;
	    if (compOptions && compOptions.Ctor.options.abstract) {
	      return getRealChild(getFirstComponentChild(compOptions.children));
	    } else {
	      return vnode;
	    }
	  }
	
	  function extractTransitionData(comp) {
	    var data = {};
	    var options = comp.$options;
	    // props
	    for (var key in options.propsData) {
	      data[key] = comp[key];
	    }
	    // events.
	    // extract listeners and pass them directly to the transition methods
	    var listeners = options._parentListeners;
	    for (var key$1 in listeners) {
	      data[camelize(key$1)] = listeners[key$1];
	    }
	    return data;
	  }
	
	  function placeholder(h, rawChild) {
	    if (/\d-keep-alive$/.test(rawChild.tag)) {
	      return h('keep-alive', {
	        props: rawChild.componentOptions.propsData
	      });
	    }
	  }
	
	  function hasParentTransition(vnode) {
	    while (vnode = vnode.parent) {
	      if (vnode.data.transition) {
	        return true;
	      }
	    }
	  }
	
	  function isSameChild(child, oldChild) {
	    return oldChild.key === child.key && oldChild.tag === child.tag;
	  }
	
	  var Transition = {
	    name: 'transition',
	    props: transitionProps,
	    abstract: true,
	
	    render: function render(h) {
	      var this$1 = this;
	
	      var children = this.$options._renderChildren;
	      if (!children) {
	        return;
	      }
	
	      // filter out text nodes (possible whitespaces)
	      children = children.filter(function (c) {
	        return c.tag || isAsyncPlaceholder(c);
	      });
	      /* istanbul ignore if */
	      if (!children.length) {
	        return;
	      }
	
	      // warn multiple elements
	      if ("development" !== 'production' && children.length > 1) {
	        warn('<transition> can only be used on a single element. Use ' + '<transition-group> for lists.', this.$parent);
	      }
	
	      var mode = this.mode;
	
	      // warn invalid mode
	      if ("development" !== 'production' && mode && mode !== 'in-out' && mode !== 'out-in') {
	        warn('invalid <transition> mode: ' + mode, this.$parent);
	      }
	
	      var rawChild = children[0];
	
	      // if this is a component root node and the component's
	      // parent container node also has transition, skip.
	      if (hasParentTransition(this.$vnode)) {
	        return rawChild;
	      }
	
	      // apply transition data to child
	      // use getRealChild() to ignore abstract components e.g. keep-alive
	      var child = getRealChild(rawChild);
	      /* istanbul ignore if */
	      if (!child) {
	        return rawChild;
	      }
	
	      if (this._leaving) {
	        return placeholder(h, rawChild);
	      }
	
	      // ensure a key that is unique to the vnode type and to this transition
	      // component instance. This key will be used to remove pending leaving nodes
	      // during entering.
	      var id = "__transition-" + this._uid + "-";
	      child.key = child.key == null ? child.isComment ? id + 'comment' : id + child.tag : isPrimitive(child.key) ? String(child.key).indexOf(id) === 0 ? child.key : id + child.key : child.key;
	
	      var data = (child.data || (child.data = {})).transition = extractTransitionData(this);
	      var oldRawChild = this._vnode;
	      var oldChild = getRealChild(oldRawChild);
	
	      // mark v-show
	      // so that the transition module can hand over the control to the directive
	      if (child.data.directives && child.data.directives.some(function (d) {
	        return d.name === 'show';
	      })) {
	        child.data.show = true;
	      }
	
	      if (oldChild && oldChild.data && !isSameChild(child, oldChild) && !isAsyncPlaceholder(oldChild)) {
	        // replace old child transition data with fresh one
	        // important for dynamic transitions!
	        var oldData = oldChild.data.transition = extend({}, data);
	        // handle transition mode
	        if (mode === 'out-in') {
	          // return placeholder node and queue update when leave finishes
	          this._leaving = true;
	          mergeVNodeHook(oldData, 'afterLeave', function () {
	            this$1._leaving = false;
	            this$1.$forceUpdate();
	          });
	          return placeholder(h, rawChild);
	        } else if (mode === 'in-out') {
	          if (isAsyncPlaceholder(child)) {
	            return oldRawChild;
	          }
	          var delayedLeave;
	          var performLeave = function performLeave() {
	            delayedLeave();
	          };
	          mergeVNodeHook(data, 'afterEnter', performLeave);
	          mergeVNodeHook(data, 'enterCancelled', performLeave);
	          mergeVNodeHook(oldData, 'delayLeave', function (leave) {
	            delayedLeave = leave;
	          });
	        }
	      }
	
	      return rawChild;
	    }
	  };
	
	  /*  */
	
	  // Provides transition support for list items.
	  // supports move transitions using the FLIP technique.
	
	  // Because the vdom's children update algorithm is "unstable" - i.e.
	  // it doesn't guarantee the relative positioning of removed elements,
	  // we force transition-group to update its children into two passes:
	  // in the first pass, we remove all nodes that need to be removed,
	  // triggering their leaving transition; in the second pass, we insert/move
	  // into the final desired state. This way in the second pass removed
	  // nodes will remain where they should be.
	
	  var props = extend({
	    tag: String,
	    moveClass: String
	  }, transitionProps);
	
	  delete props.mode;
	
	  var TransitionGroup = {
	    props: props,
	
	    render: function render(h) {
	      var tag = this.tag || this.$vnode.data.tag || 'span';
	      var map = Object.create(null);
	      var prevChildren = this.prevChildren = this.children;
	      var rawChildren = this.$slots.default || [];
	      var children = this.children = [];
	      var transitionData = extractTransitionData(this);
	
	      for (var i = 0; i < rawChildren.length; i++) {
	        var c = rawChildren[i];
	        if (c.tag) {
	          if (c.key != null && String(c.key).indexOf('__vlist') !== 0) {
	            children.push(c);
	            map[c.key] = c;(c.data || (c.data = {})).transition = transitionData;
	          } else {
	            var opts = c.componentOptions;
	            var name = opts ? opts.Ctor.options.name || opts.tag || '' : c.tag;
	            warn("<transition-group> children must be keyed: <" + name + ">");
	          }
	        }
	      }
	
	      if (prevChildren) {
	        var kept = [];
	        var removed = [];
	        for (var i$1 = 0; i$1 < prevChildren.length; i$1++) {
	          var c$1 = prevChildren[i$1];
	          c$1.data.transition = transitionData;
	          c$1.data.pos = c$1.elm.getBoundingClientRect();
	          if (map[c$1.key]) {
	            kept.push(c$1);
	          } else {
	            removed.push(c$1);
	          }
	        }
	        this.kept = h(tag, null, kept);
	        this.removed = removed;
	      }
	
	      return h(tag, null, children);
	    },
	
	    beforeUpdate: function beforeUpdate() {
	      // force removing pass
	      this.__patch__(this._vnode, this.kept, false, // hydrating
	      true // removeOnly (!important, avoids unnecessary moves)
	      );
	      this._vnode = this.kept;
	    },
	
	    updated: function updated() {
	      var children = this.prevChildren;
	      var moveClass = this.moveClass || (this.name || 'v') + '-move';
	      if (!children.length || !this.hasMove(children[0].elm, moveClass)) {
	        return;
	      }
	
	      // we divide the work into three loops to avoid mixing DOM reads and writes
	      // in each iteration - which helps prevent layout thrashing.
	      children.forEach(callPendingCbs);
	      children.forEach(recordPosition);
	      children.forEach(applyTranslation);
	
	      // force reflow to put everything in position
	      // assign to this to avoid being removed in tree-shaking
	      // $flow-disable-line
	      this._reflow = document.body.offsetHeight;
	
	      children.forEach(function (c) {
	        if (c.data.moved) {
	          var el = c.elm;
	          var s = el.style;
	          addTransitionClass(el, moveClass);
	          s.transform = s.WebkitTransform = s.transitionDuration = '';
	          el.addEventListener(transitionEndEvent, el._moveCb = function cb(e) {
	            if (!e || /transform$/.test(e.propertyName)) {
	              el.removeEventListener(transitionEndEvent, cb);
	              el._moveCb = null;
	              removeTransitionClass(el, moveClass);
	            }
	          });
	        }
	      });
	    },
	
	    methods: {
	      hasMove: function hasMove(el, moveClass) {
	        /* istanbul ignore if */
	        if (!hasTransition) {
	          return false;
	        }
	        /* istanbul ignore if */
	        if (this._hasMove) {
	          return this._hasMove;
	        }
	        // Detect whether an element with the move class applied has
	        // CSS transitions. Since the element may be inside an entering
	        // transition at this very moment, we make a clone of it and remove
	        // all other transition classes applied to ensure only the move class
	        // is applied.
	        var clone = el.cloneNode();
	        if (el._transitionClasses) {
	          el._transitionClasses.forEach(function (cls) {
	            removeClass(clone, cls);
	          });
	        }
	        addClass(clone, moveClass);
	        clone.style.display = 'none';
	        this.$el.appendChild(clone);
	        var info = getTransitionInfo(clone);
	        this.$el.removeChild(clone);
	        return this._hasMove = info.hasTransform;
	      }
	    }
	  };
	
	  function callPendingCbs(c) {
	    /* istanbul ignore if */
	    if (c.elm._moveCb) {
	      c.elm._moveCb();
	    }
	    /* istanbul ignore if */
	    if (c.elm._enterCb) {
	      c.elm._enterCb();
	    }
	  }
	
	  function recordPosition(c) {
	    c.data.newPos = c.elm.getBoundingClientRect();
	  }
	
	  function applyTranslation(c) {
	    var oldPos = c.data.pos;
	    var newPos = c.data.newPos;
	    var dx = oldPos.left - newPos.left;
	    var dy = oldPos.top - newPos.top;
	    if (dx || dy) {
	      c.data.moved = true;
	      var s = c.elm.style;
	      s.transform = s.WebkitTransform = "translate(" + dx + "px," + dy + "px)";
	      s.transitionDuration = '0s';
	    }
	  }
	
	  var platformComponents = {
	    Transition: Transition,
	    TransitionGroup: TransitionGroup
	  };
	
	  /*  */
	
	  // install platform specific utils
	  Vue$3.config.mustUseProp = mustUseProp;
	  Vue$3.config.isReservedTag = isReservedTag;
	  Vue$3.config.isReservedAttr = isReservedAttr;
	  Vue$3.config.getTagNamespace = getTagNamespace;
	  Vue$3.config.isUnknownElement = isUnknownElement;
	
	  // install platform runtime directives & components
	  extend(Vue$3.options.directives, platformDirectives);
	  extend(Vue$3.options.components, platformComponents);
	
	  // install platform patch function
	  Vue$3.prototype.__patch__ = inBrowser ? patch : noop;
	
	  // public mount method
	  Vue$3.prototype.$mount = function (el, hydrating) {
	    el = el && inBrowser ? query(el) : undefined;
	    return mountComponent(this, el, hydrating);
	  };
	
	  // devtools global hook
	  /* istanbul ignore next */
	  Vue$3.nextTick(function () {
	    if (config.devtools) {
	      if (devtools) {
	        devtools.emit('init', Vue$3);
	      } else if ("development" !== 'production' && isChrome) {
	        console[console.info ? 'info' : 'log']('Download the Vue Devtools extension for a better development experience:\n' + 'https://github.com/vuejs/vue-devtools');
	      }
	    }
	    if ("development" !== 'production' && config.productionTip !== false && inBrowser && typeof console !== 'undefined') {
	      console[console.info ? 'info' : 'log']("You are running Vue in development mode.\n" + "Make sure to turn on production mode when deploying for production.\n" + "See more tips at https://vuejs.org/guide/deployment.html");
	    }
	  }, 0);
	
	  /*  */
	
	  // check whether current browser encodes a char inside attribute values
	  function shouldDecode(content, encoded) {
	    var div = document.createElement('div');
	    div.innerHTML = "<div a=\"" + content + "\"/>";
	    return div.innerHTML.indexOf(encoded) > 0;
	  }
	
	  // #3663
	  // IE encodes newlines inside attribute values while other browsers don't
	  var shouldDecodeNewlines = inBrowser ? shouldDecode('\n', '&#10;') : false;
	
	  /*  */
	
	  var defaultTagRE = /\{\{((?:.|\n)+?)\}\}/g;
	  var regexEscapeRE = /[-.*+?^${}()|[\]\/\\]/g;
	
	  var buildRegex = cached(function (delimiters) {
	    var open = delimiters[0].replace(regexEscapeRE, '\\$&');
	    var close = delimiters[1].replace(regexEscapeRE, '\\$&');
	    return new RegExp(open + '((?:.|\\n)+?)' + close, 'g');
	  });
	
	  function parseText(text, delimiters) {
	    var tagRE = delimiters ? buildRegex(delimiters) : defaultTagRE;
	    if (!tagRE.test(text)) {
	      return;
	    }
	    var tokens = [];
	    var lastIndex = tagRE.lastIndex = 0;
	    var match, index;
	    while (match = tagRE.exec(text)) {
	      index = match.index;
	      // push text token
	      if (index > lastIndex) {
	        tokens.push(JSON.stringify(text.slice(lastIndex, index)));
	      }
	      // tag token
	      var exp = parseFilters(match[1].trim());
	      tokens.push("_s(" + exp + ")");
	      lastIndex = index + match[0].length;
	    }
	    if (lastIndex < text.length) {
	      tokens.push(JSON.stringify(text.slice(lastIndex)));
	    }
	    return tokens.join('+');
	  }
	
	  /*  */
	
	  function transformNode(el, options) {
	    var warn = options.warn || baseWarn;
	    var staticClass = getAndRemoveAttr(el, 'class');
	    if ("development" !== 'production' && staticClass) {
	      var expression = parseText(staticClass, options.delimiters);
	      if (expression) {
	        warn("class=\"" + staticClass + "\": " + 'Interpolation inside attributes has been removed. ' + 'Use v-bind or the colon shorthand instead. For example, ' + 'instead of <div class="{{ val }}">, use <div :class="val">.');
	      }
	    }
	    if (staticClass) {
	      el.staticClass = JSON.stringify(staticClass);
	    }
	    var classBinding = getBindingAttr(el, 'class', false /* getStatic */);
	    if (classBinding) {
	      el.classBinding = classBinding;
	    }
	  }
	
	  function genData(el) {
	    var data = '';
	    if (el.staticClass) {
	      data += "staticClass:" + el.staticClass + ",";
	    }
	    if (el.classBinding) {
	      data += "class:" + el.classBinding + ",";
	    }
	    return data;
	  }
	
	  var klass$1 = {
	    staticKeys: ['staticClass'],
	    transformNode: transformNode,
	    genData: genData
	  };
	
	  /*  */
	
	  function transformNode$1(el, options) {
	    var warn = options.warn || baseWarn;
	    var staticStyle = getAndRemoveAttr(el, 'style');
	    if (staticStyle) {
	      /* istanbul ignore if */
	      {
	        var expression = parseText(staticStyle, options.delimiters);
	        if (expression) {
	          warn("style=\"" + staticStyle + "\": " + 'Interpolation inside attributes has been removed. ' + 'Use v-bind or the colon shorthand instead. For example, ' + 'instead of <div style="{{ val }}">, use <div :style="val">.');
	        }
	      }
	      el.staticStyle = JSON.stringify(parseStyleText(staticStyle));
	    }
	
	    var styleBinding = getBindingAttr(el, 'style', false /* getStatic */);
	    if (styleBinding) {
	      el.styleBinding = styleBinding;
	    }
	  }
	
	  function genData$1(el) {
	    var data = '';
	    if (el.staticStyle) {
	      data += "staticStyle:" + el.staticStyle + ",";
	    }
	    if (el.styleBinding) {
	      data += "style:(" + el.styleBinding + "),";
	    }
	    return data;
	  }
	
	  var style$1 = {
	    staticKeys: ['staticStyle'],
	    transformNode: transformNode$1,
	    genData: genData$1
	  };
	
	  /*  */
	
	  var decoder;
	
	  var he = {
	    decode: function decode(html) {
	      decoder = decoder || document.createElement('div');
	      decoder.innerHTML = html;
	      return decoder.textContent;
	    }
	  };
	
	  /*  */
	
	  var isUnaryTag = makeMap('area,base,br,col,embed,frame,hr,img,input,isindex,keygen,' + 'link,meta,param,source,track,wbr');
	
	  // Elements that you can, intentionally, leave open
	  // (and which close themselves)
	  var canBeLeftOpenTag = makeMap('colgroup,dd,dt,li,options,p,td,tfoot,th,thead,tr,source');
	
	  // HTML5 tags https://html.spec.whatwg.org/multipage/indices.html#elements-3
	  // Phrasing Content https://html.spec.whatwg.org/multipage/dom.html#phrasing-content
	  var isNonPhrasingTag = makeMap('address,article,aside,base,blockquote,body,caption,col,colgroup,dd,' + 'details,dialog,div,dl,dt,fieldset,figcaption,figure,footer,form,' + 'h1,h2,h3,h4,h5,h6,head,header,hgroup,hr,html,legend,li,menuitem,meta,' + 'optgroup,option,param,rp,rt,source,style,summary,tbody,td,tfoot,th,thead,' + 'title,tr,track');
	
	  /**
	   * Not type-checking this file because it's mostly vendor code.
	   */
	
	  /*!
	   * HTML Parser By John Resig (ejohn.org)
	   * Modified by Juriy "kangax" Zaytsev
	   * Original code by Erik Arvidsson, Mozilla Public License
	   * http://erik.eae.net/simplehtmlparser/simplehtmlparser.js
	   */
	
	  // Regular Expressions for parsing tags and attributes
	  var attribute = /^\s*([^\s"'<>\/=]+)(?:\s*(=)\s*(?:"([^"]*)"+|'([^']*)'+|([^\s"'=<>`]+)))?/;
	  // could use https://www.w3.org/TR/1999/REC-xml-names-19990114/#NT-QName
	  // but for Vue templates we can enforce a simple charset
	  var ncname = '[a-zA-Z_][\\w\\-\\.]*';
	  var qnameCapture = "((?:" + ncname + "\\:)?" + ncname + ")";
	  var startTagOpen = new RegExp("^<" + qnameCapture);
	  var startTagClose = /^\s*(\/?)>/;
	  var endTag = new RegExp("^<\\/" + qnameCapture + "[^>]*>");
	  var doctype = /^<!DOCTYPE [^>]+>/i;
	  var comment = /^<!--/;
	  var conditionalComment = /^<!\[/;
	
	  var IS_REGEX_CAPTURING_BROKEN = false;
	  'x'.replace(/x(.)?/g, function (m, g) {
	    IS_REGEX_CAPTURING_BROKEN = g === '';
	  });
	
	  // Special Elements (can contain anything)
	  var isPlainTextElement = makeMap('script,style,textarea', true);
	  var reCache = {};
	
	  var decodingMap = {
	    '&lt;': '<',
	    '&gt;': '>',
	    '&quot;': '"',
	    '&amp;': '&',
	    '&#10;': '\n'
	  };
	  var encodedAttr = /&(?:lt|gt|quot|amp);/g;
	  var encodedAttrWithNewLines = /&(?:lt|gt|quot|amp|#10);/g;
	
	  // #5992
	  var isIgnoreNewlineTag = makeMap('pre,textarea', true);
	  var shouldIgnoreFirstNewline = function shouldIgnoreFirstNewline(tag, html) {
	    return tag && isIgnoreNewlineTag(tag) && html[0] === '\n';
	  };
	
	  function decodeAttr(value, shouldDecodeNewlines) {
	    var re = shouldDecodeNewlines ? encodedAttrWithNewLines : encodedAttr;
	    return value.replace(re, function (match) {
	      return decodingMap[match];
	    });
	  }
	
	  function parseHTML(html, options) {
	    var stack = [];
	    var expectHTML = options.expectHTML;
	    var isUnaryTag$$1 = options.isUnaryTag || no;
	    var canBeLeftOpenTag$$1 = options.canBeLeftOpenTag || no;
	    var index = 0;
	    var last, lastTag;
	    while (html) {
	      last = html;
	      // Make sure we're not in a plaintext content element like script/style
	      if (!lastTag || !isPlainTextElement(lastTag)) {
	        var textEnd = html.indexOf('<');
	        if (textEnd === 0) {
	          // Comment:
	          if (comment.test(html)) {
	            var commentEnd = html.indexOf('-->');
	
	            if (commentEnd >= 0) {
	              if (options.shouldKeepComment) {
	                options.comment(html.substring(4, commentEnd));
	              }
	              advance(commentEnd + 3);
	              continue;
	            }
	          }
	
	          // http://en.wikipedia.org/wiki/Conditional_comment#Downlevel-revealed_conditional_comment
	          if (conditionalComment.test(html)) {
	            var conditionalEnd = html.indexOf(']>');
	
	            if (conditionalEnd >= 0) {
	              advance(conditionalEnd + 2);
	              continue;
	            }
	          }
	
	          // Doctype:
	          var doctypeMatch = html.match(doctype);
	          if (doctypeMatch) {
	            advance(doctypeMatch[0].length);
	            continue;
	          }
	
	          // End tag:
	          var endTagMatch = html.match(endTag);
	          if (endTagMatch) {
	            var curIndex = index;
	            advance(endTagMatch[0].length);
	            parseEndTag(endTagMatch[1], curIndex, index);
	            continue;
	          }
	
	          // Start tag:
	          var startTagMatch = parseStartTag();
	          if (startTagMatch) {
	            handleStartTag(startTagMatch);
	            if (shouldIgnoreFirstNewline(lastTag, html)) {
	              advance(1);
	            }
	            continue;
	          }
	        }
	
	        var text = void 0,
	            rest = void 0,
	            next = void 0;
	        if (textEnd >= 0) {
	          rest = html.slice(textEnd);
	          while (!endTag.test(rest) && !startTagOpen.test(rest) && !comment.test(rest) && !conditionalComment.test(rest)) {
	            // < in plain text, be forgiving and treat it as text
	            next = rest.indexOf('<', 1);
	            if (next < 0) {
	              break;
	            }
	            textEnd += next;
	            rest = html.slice(textEnd);
	          }
	          text = html.substring(0, textEnd);
	          advance(textEnd);
	        }
	
	        if (textEnd < 0) {
	          text = html;
	          html = '';
	        }
	
	        if (options.chars && text) {
	          options.chars(text);
	        }
	      } else {
	        var endTagLength = 0;
	        var stackedTag = lastTag.toLowerCase();
	        var reStackedTag = reCache[stackedTag] || (reCache[stackedTag] = new RegExp('([\\s\\S]*?)(</' + stackedTag + '[^>]*>)', 'i'));
	        var rest$1 = html.replace(reStackedTag, function (all, text, endTag) {
	          endTagLength = endTag.length;
	          if (!isPlainTextElement(stackedTag) && stackedTag !== 'noscript') {
	            text = text.replace(/<!--([\s\S]*?)-->/g, '$1').replace(/<!\[CDATA\[([\s\S]*?)]]>/g, '$1');
	          }
	          if (shouldIgnoreFirstNewline(stackedTag, text)) {
	            text = text.slice(1);
	          }
	          if (options.chars) {
	            options.chars(text);
	          }
	          return '';
	        });
	        index += html.length - rest$1.length;
	        html = rest$1;
	        parseEndTag(stackedTag, index - endTagLength, index);
	      }
	
	      if (html === last) {
	        options.chars && options.chars(html);
	        if ("development" !== 'production' && !stack.length && options.warn) {
	          options.warn("Mal-formatted tag at end of template: \"" + html + "\"");
	        }
	        break;
	      }
	    }
	
	    // Clean up any remaining tags
	    parseEndTag();
	
	    function advance(n) {
	      index += n;
	      html = html.substring(n);
	    }
	
	    function parseStartTag() {
	      var start = html.match(startTagOpen);
	      if (start) {
	        var match = {
	          tagName: start[1],
	          attrs: [],
	          start: index
	        };
	        advance(start[0].length);
	        var end, attr;
	        while (!(end = html.match(startTagClose)) && (attr = html.match(attribute))) {
	          advance(attr[0].length);
	          match.attrs.push(attr);
	        }
	        if (end) {
	          match.unarySlash = end[1];
	          advance(end[0].length);
	          match.end = index;
	          return match;
	        }
	      }
	    }
	
	    function handleStartTag(match) {
	      var tagName = match.tagName;
	      var unarySlash = match.unarySlash;
	
	      if (expectHTML) {
	        if (lastTag === 'p' && isNonPhrasingTag(tagName)) {
	          parseEndTag(lastTag);
	        }
	        if (canBeLeftOpenTag$$1(tagName) && lastTag === tagName) {
	          parseEndTag(tagName);
	        }
	      }
	
	      var unary = isUnaryTag$$1(tagName) || !!unarySlash;
	
	      var l = match.attrs.length;
	      var attrs = new Array(l);
	      for (var i = 0; i < l; i++) {
	        var args = match.attrs[i];
	        // hackish work around FF bug https://bugzilla.mozilla.org/show_bug.cgi?id=369778
	        if (IS_REGEX_CAPTURING_BROKEN && args[0].indexOf('""') === -1) {
	          if (args[3] === '') {
	            delete args[3];
	          }
	          if (args[4] === '') {
	            delete args[4];
	          }
	          if (args[5] === '') {
	            delete args[5];
	          }
	        }
	        var value = args[3] || args[4] || args[5] || '';
	        attrs[i] = {
	          name: args[1],
	          value: decodeAttr(value, options.shouldDecodeNewlines)
	        };
	      }
	
	      if (!unary) {
	        stack.push({ tag: tagName, lowerCasedTag: tagName.toLowerCase(), attrs: attrs });
	        lastTag = tagName;
	      }
	
	      if (options.start) {
	        options.start(tagName, attrs, unary, match.start, match.end);
	      }
	    }
	
	    function parseEndTag(tagName, start, end) {
	      var pos, lowerCasedTagName;
	      if (start == null) {
	        start = index;
	      }
	      if (end == null) {
	        end = index;
	      }
	
	      if (tagName) {
	        lowerCasedTagName = tagName.toLowerCase();
	      }
	
	      // Find the closest opened tag of the same type
	      if (tagName) {
	        for (pos = stack.length - 1; pos >= 0; pos--) {
	          if (stack[pos].lowerCasedTag === lowerCasedTagName) {
	            break;
	          }
	        }
	      } else {
	        // If no tag name is provided, clean shop
	        pos = 0;
	      }
	
	      if (pos >= 0) {
	        // Close all the open elements, up the stack
	        for (var i = stack.length - 1; i >= pos; i--) {
	          if ("development" !== 'production' && (i > pos || !tagName) && options.warn) {
	            options.warn("tag <" + stack[i].tag + "> has no matching end tag.");
	          }
	          if (options.end) {
	            options.end(stack[i].tag, start, end);
	          }
	        }
	
	        // Remove the open elements from the stack
	        stack.length = pos;
	        lastTag = pos && stack[pos - 1].tag;
	      } else if (lowerCasedTagName === 'br') {
	        if (options.start) {
	          options.start(tagName, [], true, start, end);
	        }
	      } else if (lowerCasedTagName === 'p') {
	        if (options.start) {
	          options.start(tagName, [], false, start, end);
	        }
	        if (options.end) {
	          options.end(tagName, start, end);
	        }
	      }
	    }
	  }
	
	  /*  */
	
	  var onRE = /^@|^v-on:/;
	  var dirRE = /^v-|^@|^:/;
	  var forAliasRE = /(.*?)\s+(?:in|of)\s+(.*)/;
	  var forIteratorRE = /\((\{[^}]*\}|[^,]*),([^,]*)(?:,([^,]*))?\)/;
	
	  var argRE = /:(.*)$/;
	  var bindRE = /^:|^v-bind:/;
	  var modifierRE = /\.[^.]+/g;
	
	  var decodeHTMLCached = cached(he.decode);
	
	  // configurable state
	  var warn$2;
	  var delimiters;
	  var transforms;
	  var preTransforms;
	  var postTransforms;
	  var platformIsPreTag;
	  var platformMustUseProp;
	  var platformGetTagNamespace;
	
	  function createASTElement(tag, attrs, parent) {
	    return {
	      type: 1,
	      tag: tag,
	      attrsList: attrs,
	      attrsMap: makeAttrsMap(attrs),
	      parent: parent,
	      children: []
	    };
	  }
	
	  /**
	   * Convert HTML string to AST.
	   */
	  function parse(template, options) {
	    warn$2 = options.warn || baseWarn;
	
	    platformIsPreTag = options.isPreTag || no;
	    platformMustUseProp = options.mustUseProp || no;
	    platformGetTagNamespace = options.getTagNamespace || no;
	
	    transforms = pluckModuleFunction(options.modules, 'transformNode');
	    preTransforms = pluckModuleFunction(options.modules, 'preTransformNode');
	    postTransforms = pluckModuleFunction(options.modules, 'postTransformNode');
	
	    delimiters = options.delimiters;
	
	    var stack = [];
	    var preserveWhitespace = options.preserveWhitespace !== false;
	    var root;
	    var currentParent;
	    var inVPre = false;
	    var inPre = false;
	    var warned = false;
	
	    function warnOnce(msg) {
	      if (!warned) {
	        warned = true;
	        warn$2(msg);
	      }
	    }
	
	    function endPre(element) {
	      // check pre state
	      if (element.pre) {
	        inVPre = false;
	      }
	      if (platformIsPreTag(element.tag)) {
	        inPre = false;
	      }
	    }
	
	    parseHTML(template, {
	      warn: warn$2,
	      expectHTML: options.expectHTML,
	      isUnaryTag: options.isUnaryTag,
	      canBeLeftOpenTag: options.canBeLeftOpenTag,
	      shouldDecodeNewlines: options.shouldDecodeNewlines,
	      shouldKeepComment: options.comments,
	      start: function start(tag, attrs, unary) {
	        // check namespace.
	        // inherit parent ns if there is one
	        var ns = currentParent && currentParent.ns || platformGetTagNamespace(tag);
	
	        // handle IE svg bug
	        /* istanbul ignore if */
	        if (isIE && ns === 'svg') {
	          attrs = guardIESVGBug(attrs);
	        }
	
	        var element = createASTElement(tag, attrs, currentParent);
	        if (ns) {
	          element.ns = ns;
	        }
	
	        if (isForbiddenTag(element) && !isServerRendering()) {
	          element.forbidden = true;
	          "development" !== 'production' && warn$2('Templates should only be responsible for mapping the state to the ' + 'UI. Avoid placing tags with side-effects in your templates, such as ' + "<" + tag + ">" + ', as they will not be parsed.');
	        }
	
	        // apply pre-transforms
	        for (var i = 0; i < preTransforms.length; i++) {
	          element = preTransforms[i](element, options) || element;
	        }
	
	        if (!inVPre) {
	          processPre(element);
	          if (element.pre) {
	            inVPre = true;
	          }
	        }
	        if (platformIsPreTag(element.tag)) {
	          inPre = true;
	        }
	        if (inVPre) {
	          processRawAttrs(element);
	        } else if (!element.processed) {
	          // structural directives
	          processFor(element);
	          processIf(element);
	          processOnce(element);
	          // element-scope stuff
	          processElement(element, options);
	        }
	
	        function checkRootConstraints(el) {
	          {
	            if (el.tag === 'slot' || el.tag === 'template') {
	              warnOnce("Cannot use <" + el.tag + "> as component root element because it may " + 'contain multiple nodes.');
	            }
	            if (el.attrsMap.hasOwnProperty('v-for')) {
	              warnOnce('Cannot use v-for on stateful component root element because ' + 'it renders multiple elements.');
	            }
	          }
	        }
	
	        // tree management
	        if (!root) {
	          root = element;
	          checkRootConstraints(root);
	        } else if (!stack.length) {
	          // allow root elements with v-if, v-else-if and v-else
	          if (root.if && (element.elseif || element.else)) {
	            checkRootConstraints(element);
	            addIfCondition(root, {
	              exp: element.elseif,
	              block: element
	            });
	          } else {
	            warnOnce("Component template should contain exactly one root element. " + "If you are using v-if on multiple elements, " + "use v-else-if to chain them instead.");
	          }
	        }
	        if (currentParent && !element.forbidden) {
	          if (element.elseif || element.else) {
	            processIfConditions(element, currentParent);
	          } else if (element.slotScope) {
	            // scoped slot
	            currentParent.plain = false;
	            var name = element.slotTarget || '"default"';(currentParent.scopedSlots || (currentParent.scopedSlots = {}))[name] = element;
	          } else {
	            currentParent.children.push(element);
	            element.parent = currentParent;
	          }
	        }
	        if (!unary) {
	          currentParent = element;
	          stack.push(element);
	        } else {
	          endPre(element);
	        }
	        // apply post-transforms
	        for (var i$1 = 0; i$1 < postTransforms.length; i$1++) {
	          postTransforms[i$1](element, options);
	        }
	      },
	
	      end: function end() {
	        // remove trailing whitespace
	        var element = stack[stack.length - 1];
	        var lastNode = element.children[element.children.length - 1];
	        if (lastNode && lastNode.type === 3 && lastNode.text === ' ' && !inPre) {
	          element.children.pop();
	        }
	        // pop stack
	        stack.length -= 1;
	        currentParent = stack[stack.length - 1];
	        endPre(element);
	      },
	
	      chars: function chars(text) {
	        if (!currentParent) {
	          {
	            if (text === template) {
	              warnOnce('Component template requires a root element, rather than just text.');
	            } else if (text = text.trim()) {
	              warnOnce("text \"" + text + "\" outside root element will be ignored.");
	            }
	          }
	          return;
	        }
	        // IE textarea placeholder bug
	        /* istanbul ignore if */
	        if (isIE && currentParent.tag === 'textarea' && currentParent.attrsMap.placeholder === text) {
	          return;
	        }
	        var children = currentParent.children;
	        text = inPre || text.trim() ? isTextTag(currentParent) ? text : decodeHTMLCached(text)
	        // only preserve whitespace if its not right after a starting tag
	        : preserveWhitespace && children.length ? ' ' : '';
	        if (text) {
	          var expression;
	          if (!inVPre && text !== ' ' && (expression = parseText(text, delimiters))) {
	            children.push({
	              type: 2,
	              expression: expression,
	              text: text
	            });
	          } else if (text !== ' ' || !children.length || children[children.length - 1].text !== ' ') {
	            children.push({
	              type: 3,
	              text: text
	            });
	          }
	        }
	      },
	      comment: function comment(text) {
	        currentParent.children.push({
	          type: 3,
	          text: text,
	          isComment: true
	        });
	      }
	    });
	    return root;
	  }
	
	  function processPre(el) {
	    if (getAndRemoveAttr(el, 'v-pre') != null) {
	      el.pre = true;
	    }
	  }
	
	  function processRawAttrs(el) {
	    var l = el.attrsList.length;
	    if (l) {
	      var attrs = el.attrs = new Array(l);
	      for (var i = 0; i < l; i++) {
	        attrs[i] = {
	          name: el.attrsList[i].name,
	          value: JSON.stringify(el.attrsList[i].value)
	        };
	      }
	    } else if (!el.pre) {
	      // non root node in pre blocks with no attributes
	      el.plain = true;
	    }
	  }
	
	  function processElement(element, options) {
	    processKey(element);
	
	    // determine whether this is a plain element after
	    // removing structural attributes
	    element.plain = !element.key && !element.attrsList.length;
	
	    processRef(element);
	    processSlot(element);
	    processComponent(element);
	    for (var i = 0; i < transforms.length; i++) {
	      element = transforms[i](element, options) || element;
	    }
	    processAttrs(element);
	  }
	
	  function processKey(el) {
	    var exp = getBindingAttr(el, 'key');
	    if (exp) {
	      if ("development" !== 'production' && el.tag === 'template') {
	        warn$2("<template> cannot be keyed. Place the key on real elements instead.");
	      }
	      el.key = exp;
	    }
	  }
	
	  function processRef(el) {
	    var ref = getBindingAttr(el, 'ref');
	    if (ref) {
	      el.ref = ref;
	      el.refInFor = checkInFor(el);
	    }
	  }
	
	  function processFor(el) {
	    var exp;
	    if (exp = getAndRemoveAttr(el, 'v-for')) {
	      var inMatch = exp.match(forAliasRE);
	      if (!inMatch) {
	        "development" !== 'production' && warn$2("Invalid v-for expression: " + exp);
	        return;
	      }
	      el.for = inMatch[2].trim();
	      var alias = inMatch[1].trim();
	      var iteratorMatch = alias.match(forIteratorRE);
	      if (iteratorMatch) {
	        el.alias = iteratorMatch[1].trim();
	        el.iterator1 = iteratorMatch[2].trim();
	        if (iteratorMatch[3]) {
	          el.iterator2 = iteratorMatch[3].trim();
	        }
	      } else {
	        el.alias = alias;
	      }
	    }
	  }
	
	  function processIf(el) {
	    var exp = getAndRemoveAttr(el, 'v-if');
	    if (exp) {
	      el.if = exp;
	      addIfCondition(el, {
	        exp: exp,
	        block: el
	      });
	    } else {
	      if (getAndRemoveAttr(el, 'v-else') != null) {
	        el.else = true;
	      }
	      var elseif = getAndRemoveAttr(el, 'v-else-if');
	      if (elseif) {
	        el.elseif = elseif;
	      }
	    }
	  }
	
	  function processIfConditions(el, parent) {
	    var prev = findPrevElement(parent.children);
	    if (prev && prev.if) {
	      addIfCondition(prev, {
	        exp: el.elseif,
	        block: el
	      });
	    } else {
	      warn$2("v-" + (el.elseif ? 'else-if="' + el.elseif + '"' : 'else') + " " + "used on element <" + el.tag + "> without corresponding v-if.");
	    }
	  }
	
	  function findPrevElement(children) {
	    var i = children.length;
	    while (i--) {
	      if (children[i].type === 1) {
	        return children[i];
	      } else {
	        if ("development" !== 'production' && children[i].text !== ' ') {
	          warn$2("text \"" + children[i].text.trim() + "\" between v-if and v-else(-if) " + "will be ignored.");
	        }
	        children.pop();
	      }
	    }
	  }
	
	  function addIfCondition(el, condition) {
	    if (!el.ifConditions) {
	      el.ifConditions = [];
	    }
	    el.ifConditions.push(condition);
	  }
	
	  function processOnce(el) {
	    var once$$1 = getAndRemoveAttr(el, 'v-once');
	    if (once$$1 != null) {
	      el.once = true;
	    }
	  }
	
	  function processSlot(el) {
	    if (el.tag === 'slot') {
	      el.slotName = getBindingAttr(el, 'name');
	      if ("development" !== 'production' && el.key) {
	        warn$2("`key` does not work on <slot> because slots are abstract outlets " + "and can possibly expand into multiple elements. " + "Use the key on a wrapping element instead.");
	      }
	    } else {
	      var slotScope;
	      if (el.tag === 'template') {
	        slotScope = getAndRemoveAttr(el, 'scope');
	        /* istanbul ignore if */
	        if ("development" !== 'production' && slotScope) {
	          warn$2("the \"scope\" attribute for scoped slots have been deprecated and " + "replaced by \"slot-scope\" since 2.5. The new \"slot-scope\" attribute " + "can also be used on plain elements in addition to <template> to " + "denote scoped slots.", true);
	        }
	        el.slotScope = slotScope || getAndRemoveAttr(el, 'slot-scope');
	      } else if (slotScope = getAndRemoveAttr(el, 'slot-scope')) {
	        el.slotScope = slotScope;
	      }
	      var slotTarget = getBindingAttr(el, 'slot');
	      if (slotTarget) {
	        el.slotTarget = slotTarget === '""' ? '"default"' : slotTarget;
	        // preserve slot as an attribute for native shadow DOM compat
	        // only for non-scoped slots.
	        if (!el.slotScope) {
	          addAttr(el, 'slot', slotTarget);
	        }
	      }
	    }
	  }
	
	  function processComponent(el) {
	    var binding;
	    if (binding = getBindingAttr(el, 'is')) {
	      el.component = binding;
	    }
	    if (getAndRemoveAttr(el, 'inline-template') != null) {
	      el.inlineTemplate = true;
	    }
	  }
	
	  function processAttrs(el) {
	    var list = el.attrsList;
	    var i, l, name, rawName, value, modifiers, isProp;
	    for (i = 0, l = list.length; i < l; i++) {
	      name = rawName = list[i].name;
	      value = list[i].value;
	      if (dirRE.test(name)) {
	        // mark element as dynamic
	        el.hasBindings = true;
	        // modifiers
	        modifiers = parseModifiers(name);
	        if (modifiers) {
	          name = name.replace(modifierRE, '');
	        }
	        if (bindRE.test(name)) {
	          // v-bind
	          name = name.replace(bindRE, '');
	          value = parseFilters(value);
	          isProp = false;
	          if (modifiers) {
	            if (modifiers.prop) {
	              isProp = true;
	              name = camelize(name);
	              if (name === 'innerHtml') {
	                name = 'innerHTML';
	              }
	            }
	            if (modifiers.camel) {
	              name = camelize(name);
	            }
	            if (modifiers.sync) {
	              addHandler(el, "update:" + camelize(name), genAssignmentCode(value, "$event"));
	            }
	          }
	          if (isProp || !el.component && platformMustUseProp(el.tag, el.attrsMap.type, name)) {
	            addProp(el, name, value);
	          } else {
	            addAttr(el, name, value);
	          }
	        } else if (onRE.test(name)) {
	          // v-on
	          name = name.replace(onRE, '');
	          addHandler(el, name, value, modifiers, false, warn$2);
	        } else {
	          // normal directives
	          name = name.replace(dirRE, '');
	          // parse arg
	          var argMatch = name.match(argRE);
	          var arg = argMatch && argMatch[1];
	          if (arg) {
	            name = name.slice(0, -(arg.length + 1));
	          }
	          addDirective(el, name, rawName, value, arg, modifiers);
	          if ("development" !== 'production' && name === 'model') {
	            checkForAliasModel(el, value);
	          }
	        }
	      } else {
	        // literal attribute
	        {
	          var expression = parseText(value, delimiters);
	          if (expression) {
	            warn$2(name + "=\"" + value + "\": " + 'Interpolation inside attributes has been removed. ' + 'Use v-bind or the colon shorthand instead. For example, ' + 'instead of <div id="{{ val }}">, use <div :id="val">.');
	          }
	        }
	        addAttr(el, name, JSON.stringify(value));
	      }
	    }
	  }
	
	  function checkInFor(el) {
	    var parent = el;
	    while (parent) {
	      if (parent.for !== undefined) {
	        return true;
	      }
	      parent = parent.parent;
	    }
	    return false;
	  }
	
	  function parseModifiers(name) {
	    var match = name.match(modifierRE);
	    if (match) {
	      var ret = {};
	      match.forEach(function (m) {
	        ret[m.slice(1)] = true;
	      });
	      return ret;
	    }
	  }
	
	  function makeAttrsMap(attrs) {
	    var map = {};
	    for (var i = 0, l = attrs.length; i < l; i++) {
	      if ("development" !== 'production' && map[attrs[i].name] && !isIE && !isEdge) {
	        warn$2('duplicate attribute: ' + attrs[i].name);
	      }
	      map[attrs[i].name] = attrs[i].value;
	    }
	    return map;
	  }
	
	  // for script (e.g. type="x/template") or style, do not decode content
	  function isTextTag(el) {
	    return el.tag === 'script' || el.tag === 'style';
	  }
	
	  function isForbiddenTag(el) {
	    return el.tag === 'style' || el.tag === 'script' && (!el.attrsMap.type || el.attrsMap.type === 'text/javascript');
	  }
	
	  var ieNSBug = /^xmlns:NS\d+/;
	  var ieNSPrefix = /^NS\d+:/;
	
	  /* istanbul ignore next */
	  function guardIESVGBug(attrs) {
	    var res = [];
	    for (var i = 0; i < attrs.length; i++) {
	      var attr = attrs[i];
	      if (!ieNSBug.test(attr.name)) {
	        attr.name = attr.name.replace(ieNSPrefix, '');
	        res.push(attr);
	      }
	    }
	    return res;
	  }
	
	  function checkForAliasModel(el, value) {
	    var _el = el;
	    while (_el) {
	      if (_el.for && _el.alias === value) {
	        warn$2("<" + el.tag + " v-model=\"" + value + "\">: " + "You are binding v-model directly to a v-for iteration alias. " + "This will not be able to modify the v-for source array because " + "writing to the alias is like modifying a function local variable. " + "Consider using an array of objects and use v-model on an object property instead.");
	      }
	      _el = _el.parent;
	    }
	  }
	
	  /*  */
	
	  /**
	   * Expand input[v-model] with dyanmic type bindings into v-if-else chains
	   * Turn this:
	   *   <input v-model="data[type]" :type="type">
	   * into this:
	   *   <input v-if="type === 'checkbox'" type="checkbox" v-model="data[type]">
	   *   <input v-else-if="type === 'radio'" type="radio" v-model="data[type]">
	   *   <input v-else :type="type" v-model="data[type]">
	   */
	
	  function preTransformNode(el, options) {
	    if (el.tag === 'input') {
	      var map = el.attrsMap;
	      if (map['v-model'] && (map['v-bind:type'] || map[':type'])) {
	        var typeBinding = getBindingAttr(el, 'type');
	        var ifCondition = getAndRemoveAttr(el, 'v-if', true);
	        var ifConditionExtra = ifCondition ? "&&(" + ifCondition + ")" : "";
	        // 1. checkbox
	        var branch0 = cloneASTElement(el);
	        // process for on the main node
	        processFor(branch0);
	        addRawAttr(branch0, 'type', 'checkbox');
	        processElement(branch0, options);
	        branch0.processed = true; // prevent it from double-processed
	        branch0.if = "(" + typeBinding + ")==='checkbox'" + ifConditionExtra;
	        addIfCondition(branch0, {
	          exp: branch0.if,
	          block: branch0
	        });
	        // 2. add radio else-if condition
	        var branch1 = cloneASTElement(el);
	        getAndRemoveAttr(branch1, 'v-for', true);
	        addRawAttr(branch1, 'type', 'radio');
	        processElement(branch1, options);
	        addIfCondition(branch0, {
	          exp: "(" + typeBinding + ")==='radio'" + ifConditionExtra,
	          block: branch1
	        });
	        // 3. other
	        var branch2 = cloneASTElement(el);
	        getAndRemoveAttr(branch2, 'v-for', true);
	        addRawAttr(branch2, ':type', typeBinding);
	        processElement(branch2, options);
	        addIfCondition(branch0, {
	          exp: ifCondition,
	          block: branch2
	        });
	        return branch0;
	      }
	    }
	  }
	
	  function cloneASTElement(el) {
	    return createASTElement(el.tag, el.attrsList.slice(), el.parent);
	  }
	
	  function addRawAttr(el, name, value) {
	    el.attrsMap[name] = value;
	    el.attrsList.push({ name: name, value: value });
	  }
	
	  var model$2 = {
	    preTransformNode: preTransformNode
	  };
	
	  var modules$1 = [klass$1, style$1, model$2];
	
	  /*  */
	
	  function text(el, dir) {
	    if (dir.value) {
	      addProp(el, 'textContent', "_s(" + dir.value + ")");
	    }
	  }
	
	  /*  */
	
	  function html(el, dir) {
	    if (dir.value) {
	      addProp(el, 'innerHTML', "_s(" + dir.value + ")");
	    }
	  }
	
	  var directives$1 = {
	    model: model,
	    text: text,
	    html: html
	  };
	
	  /*  */
	
	  var baseOptions = {
	    expectHTML: true,
	    modules: modules$1,
	    directives: directives$1,
	    isPreTag: isPreTag,
	    isUnaryTag: isUnaryTag,
	    mustUseProp: mustUseProp,
	    canBeLeftOpenTag: canBeLeftOpenTag,
	    isReservedTag: isReservedTag,
	    getTagNamespace: getTagNamespace,
	    staticKeys: genStaticKeys(modules$1)
	  };
	
	  /*  */
	
	  var isStaticKey;
	  var isPlatformReservedTag;
	
	  var genStaticKeysCached = cached(genStaticKeys$1);
	
	  /**
	   * Goal of the optimizer: walk the generated template AST tree
	   * and detect sub-trees that are purely static, i.e. parts of
	   * the DOM that never needs to change.
	   *
	   * Once we detect these sub-trees, we can:
	   *
	   * 1. Hoist them into constants, so that we no longer need to
	   *    create fresh nodes for them on each re-render;
	   * 2. Completely skip them in the patching process.
	   */
	  function optimize(root, options) {
	    if (!root) {
	      return;
	    }
	    isStaticKey = genStaticKeysCached(options.staticKeys || '');
	    isPlatformReservedTag = options.isReservedTag || no;
	    // first pass: mark all non-static nodes.
	    markStatic$1(root);
	    // second pass: mark static roots.
	    markStaticRoots(root, false);
	  }
	
	  function genStaticKeys$1(keys) {
	    return makeMap('type,tag,attrsList,attrsMap,plain,parent,children,attrs' + (keys ? ',' + keys : ''));
	  }
	
	  function markStatic$1(node) {
	    node.static = isStatic(node);
	    if (node.type === 1) {
	      // do not make component slot content static. this avoids
	      // 1. components not able to mutate slot nodes
	      // 2. static slot content fails for hot-reloading
	      if (!isPlatformReservedTag(node.tag) && node.tag !== 'slot' && node.attrsMap['inline-template'] == null) {
	        return;
	      }
	      for (var i = 0, l = node.children.length; i < l; i++) {
	        var child = node.children[i];
	        markStatic$1(child);
	        if (!child.static) {
	          node.static = false;
	        }
	      }
	      if (node.ifConditions) {
	        for (var i$1 = 1, l$1 = node.ifConditions.length; i$1 < l$1; i$1++) {
	          var block = node.ifConditions[i$1].block;
	          markStatic$1(block);
	          if (!block.static) {
	            node.static = false;
	          }
	        }
	      }
	    }
	  }
	
	  function markStaticRoots(node, isInFor) {
	    if (node.type === 1) {
	      if (node.static || node.once) {
	        node.staticInFor = isInFor;
	      }
	      // For a node to qualify as a static root, it should have children that
	      // are not just static text. Otherwise the cost of hoisting out will
	      // outweigh the benefits and it's better off to just always render it fresh.
	      if (node.static && node.children.length && !(node.children.length === 1 && node.children[0].type === 3)) {
	        node.staticRoot = true;
	        return;
	      } else {
	        node.staticRoot = false;
	      }
	      if (node.children) {
	        for (var i = 0, l = node.children.length; i < l; i++) {
	          markStaticRoots(node.children[i], isInFor || !!node.for);
	        }
	      }
	      if (node.ifConditions) {
	        for (var i$1 = 1, l$1 = node.ifConditions.length; i$1 < l$1; i$1++) {
	          markStaticRoots(node.ifConditions[i$1].block, isInFor);
	        }
	      }
	    }
	  }
	
	  function isStatic(node) {
	    if (node.type === 2) {
	      // expression
	      return false;
	    }
	    if (node.type === 3) {
	      // text
	      return true;
	    }
	    return !!(node.pre || !node.hasBindings && // no dynamic bindings
	    !node.if && !node.for && // not v-if or v-for or v-else
	    !isBuiltInTag(node.tag) && // not a built-in
	    isPlatformReservedTag(node.tag) && // not a component
	    !isDirectChildOfTemplateFor(node) && Object.keys(node).every(isStaticKey));
	  }
	
	  function isDirectChildOfTemplateFor(node) {
	    while (node.parent) {
	      node = node.parent;
	      if (node.tag !== 'template') {
	        return false;
	      }
	      if (node.for) {
	        return true;
	      }
	    }
	    return false;
	  }
	
	  /*  */
	
	  var fnExpRE = /^\s*([\w$_]+|\([^)]*?\))\s*=>|^function\s*\(/;
	  var simplePathRE = /^\s*[A-Za-z_$][\w$]*(?:\.[A-Za-z_$][\w$]*|\['.*?']|\[".*?"]|\[\d+]|\[[A-Za-z_$][\w$]*])*\s*$/;
	
	  // keyCode aliases
	  var keyCodes = {
	    esc: 27,
	    tab: 9,
	    enter: 13,
	    space: 32,
	    up: 38,
	    left: 37,
	    right: 39,
	    down: 40,
	    'delete': [8, 46]
	  };
	
	  // #4868: modifiers that prevent the execution of the listener
	  // need to explicitly return null so that we can determine whether to remove
	  // the listener for .once
	  var genGuard = function genGuard(condition) {
	    return "if(" + condition + ")return null;";
	  };
	
	  var modifierCode = {
	    stop: '$event.stopPropagation();',
	    prevent: '$event.preventDefault();',
	    self: genGuard("$event.target !== $event.currentTarget"),
	    ctrl: genGuard("!$event.ctrlKey"),
	    shift: genGuard("!$event.shiftKey"),
	    alt: genGuard("!$event.altKey"),
	    meta: genGuard("!$event.metaKey"),
	    left: genGuard("'button' in $event && $event.button !== 0"),
	    middle: genGuard("'button' in $event && $event.button !== 1"),
	    right: genGuard("'button' in $event && $event.button !== 2")
	  };
	
	  function genHandlers(events, isNative, warn) {
	    var res = isNative ? 'nativeOn:{' : 'on:{';
	    for (var name in events) {
	      var handler = events[name];
	      // #5330: warn click.right, since right clicks do not actually fire click events.
	      if ("development" !== 'production' && name === 'click' && handler && handler.modifiers && handler.modifiers.right) {
	        warn("Use \"contextmenu\" instead of \"click.right\" since right clicks " + "do not actually fire \"click\" events.");
	      }
	      res += "\"" + name + "\":" + genHandler(name, handler) + ",";
	    }
	    return res.slice(0, -1) + '}';
	  }
	
	  function genHandler(name, handler) {
	    if (!handler) {
	      return 'function(){}';
	    }
	
	    if (Array.isArray(handler)) {
	      return "[" + handler.map(function (handler) {
	        return genHandler(name, handler);
	      }).join(',') + "]";
	    }
	
	    var isMethodPath = simplePathRE.test(handler.value);
	    var isFunctionExpression = fnExpRE.test(handler.value);
	
	    if (!handler.modifiers) {
	      return isMethodPath || isFunctionExpression ? handler.value : "function($event){" + handler.value + "}"; // inline statement
	    } else {
	      var code = '';
	      var genModifierCode = '';
	      var keys = [];
	      for (var key in handler.modifiers) {
	        if (modifierCode[key]) {
	          genModifierCode += modifierCode[key];
	          // left/right
	          if (keyCodes[key]) {
	            keys.push(key);
	          }
	        } else if (key === 'exact') {
	          var modifiers = handler.modifiers;
	          genModifierCode += genGuard(['ctrl', 'shift', 'alt', 'meta'].filter(function (keyModifier) {
	            return !modifiers[keyModifier];
	          }).map(function (keyModifier) {
	            return "$event." + keyModifier + "Key";
	          }).join('||'));
	        } else {
	          keys.push(key);
	        }
	      }
	      if (keys.length) {
	        code += genKeyFilter(keys);
	      }
	      // Make sure modifiers like prevent and stop get executed after key filtering
	      if (genModifierCode) {
	        code += genModifierCode;
	      }
	      var handlerCode = isMethodPath ? handler.value + '($event)' : isFunctionExpression ? "(" + handler.value + ")($event)" : handler.value;
	      return "function($event){" + code + handlerCode + "}";
	    }
	  }
	
	  function genKeyFilter(keys) {
	    return "if(!('button' in $event)&&" + keys.map(genFilterCode).join('&&') + ")return null;";
	  }
	
	  function genFilterCode(key) {
	    var keyVal = parseInt(key, 10);
	    if (keyVal) {
	      return "$event.keyCode!==" + keyVal;
	    }
	    var code = keyCodes[key];
	    return "_k($event.keyCode," + JSON.stringify(key) + "," + JSON.stringify(code) + "," + "$event.key)";
	  }
	
	  /*  */
	
	  function on(el, dir) {
	    if ("development" !== 'production' && dir.modifiers) {
	      warn("v-on without argument does not support modifiers.");
	    }
	    el.wrapListeners = function (code) {
	      return "_g(" + code + "," + dir.value + ")";
	    };
	  }
	
	  /*  */
	
	  function bind$1(el, dir) {
	    el.wrapData = function (code) {
	      return "_b(" + code + ",'" + el.tag + "'," + dir.value + "," + (dir.modifiers && dir.modifiers.prop ? 'true' : 'false') + (dir.modifiers && dir.modifiers.sync ? ',true' : '') + ")";
	    };
	  }
	
	  /*  */
	
	  var baseDirectives = {
	    on: on,
	    bind: bind$1,
	    cloak: noop
	  };
	
	  /*  */
	
	  var CodegenState = function CodegenState(options) {
	    this.options = options;
	    this.warn = options.warn || baseWarn;
	    this.transforms = pluckModuleFunction(options.modules, 'transformCode');
	    this.dataGenFns = pluckModuleFunction(options.modules, 'genData');
	    this.directives = extend(extend({}, baseDirectives), options.directives);
	    var isReservedTag = options.isReservedTag || no;
	    this.maybeComponent = function (el) {
	      return !isReservedTag(el.tag);
	    };
	    this.onceId = 0;
	    this.staticRenderFns = [];
	  };
	
	  function generate(ast, options) {
	    var state = new CodegenState(options);
	    var code = ast ? genElement(ast, state) : '_c("div")';
	    return {
	      render: "with(this){return " + code + "}",
	      staticRenderFns: state.staticRenderFns
	    };
	  }
	
	  function genElement(el, state) {
	    if (el.staticRoot && !el.staticProcessed) {
	      return genStatic(el, state);
	    } else if (el.once && !el.onceProcessed) {
	      return genOnce(el, state);
	    } else if (el.for && !el.forProcessed) {
	      return genFor(el, state);
	    } else if (el.if && !el.ifProcessed) {
	      return genIf(el, state);
	    } else if (el.tag === 'template' && !el.slotTarget) {
	      return genChildren(el, state) || 'void 0';
	    } else if (el.tag === 'slot') {
	      return genSlot(el, state);
	    } else {
	      // component or element
	      var code;
	      if (el.component) {
	        code = genComponent(el.component, el, state);
	      } else {
	        var data = el.plain ? undefined : genData$2(el, state);
	
	        var children = el.inlineTemplate ? null : genChildren(el, state, true);
	        code = "_c('" + el.tag + "'" + (data ? "," + data : '') + (children ? "," + children : '') + ")";
	      }
	      // module transforms
	      for (var i = 0; i < state.transforms.length; i++) {
	        code = state.transforms[i](el, code);
	      }
	      return code;
	    }
	  }
	
	  // hoist static sub-trees out
	  function genStatic(el, state) {
	    el.staticProcessed = true;
	    state.staticRenderFns.push("with(this){return " + genElement(el, state) + "}");
	    return "_m(" + (state.staticRenderFns.length - 1) + (el.staticInFor ? ',true' : '') + ")";
	  }
	
	  // v-once
	  function genOnce(el, state) {
	    el.onceProcessed = true;
	    if (el.if && !el.ifProcessed) {
	      return genIf(el, state);
	    } else if (el.staticInFor) {
	      var key = '';
	      var parent = el.parent;
	      while (parent) {
	        if (parent.for) {
	          key = parent.key;
	          break;
	        }
	        parent = parent.parent;
	      }
	      if (!key) {
	        "development" !== 'production' && state.warn("v-once can only be used inside v-for that is keyed. ");
	        return genElement(el, state);
	      }
	      return "_o(" + genElement(el, state) + "," + state.onceId++ + "," + key + ")";
	    } else {
	      return genStatic(el, state);
	    }
	  }
	
	  function genIf(el, state, altGen, altEmpty) {
	    el.ifProcessed = true; // avoid recursion
	    return genIfConditions(el.ifConditions.slice(), state, altGen, altEmpty);
	  }
	
	  function genIfConditions(conditions, state, altGen, altEmpty) {
	    if (!conditions.length) {
	      return altEmpty || '_e()';
	    }
	
	    var condition = conditions.shift();
	    if (condition.exp) {
	      return "(" + condition.exp + ")?" + genTernaryExp(condition.block) + ":" + genIfConditions(conditions, state, altGen, altEmpty);
	    } else {
	      return "" + genTernaryExp(condition.block);
	    }
	
	    // v-if with v-once should generate code like (a)?_m(0):_m(1)
	    function genTernaryExp(el) {
	      return altGen ? altGen(el, state) : el.once ? genOnce(el, state) : genElement(el, state);
	    }
	  }
	
	  function genFor(el, state, altGen, altHelper) {
	    var exp = el.for;
	    var alias = el.alias;
	    var iterator1 = el.iterator1 ? "," + el.iterator1 : '';
	    var iterator2 = el.iterator2 ? "," + el.iterator2 : '';
	
	    if ("development" !== 'production' && state.maybeComponent(el) && el.tag !== 'slot' && el.tag !== 'template' && !el.key) {
	      state.warn("<" + el.tag + " v-for=\"" + alias + " in " + exp + "\">: component lists rendered with " + "v-for should have explicit keys. " + "See https://vuejs.org/guide/list.html#key for more info.", true /* tip */
	      );
	    }
	
	    el.forProcessed = true; // avoid recursion
	    return (altHelper || '_l') + "((" + exp + ")," + "function(" + alias + iterator1 + iterator2 + "){" + "return " + (altGen || genElement)(el, state) + '})';
	  }
	
	  function genData$2(el, state) {
	    var data = '{';
	
	    // directives first.
	    // directives may mutate the el's other properties before they are generated.
	    var dirs = genDirectives(el, state);
	    if (dirs) {
	      data += dirs + ',';
	    }
	
	    // key
	    if (el.key) {
	      data += "key:" + el.key + ",";
	    }
	    // ref
	    if (el.ref) {
	      data += "ref:" + el.ref + ",";
	    }
	    if (el.refInFor) {
	      data += "refInFor:true,";
	    }
	    // pre
	    if (el.pre) {
	      data += "pre:true,";
	    }
	    // record original tag name for components using "is" attribute
	    if (el.component) {
	      data += "tag:\"" + el.tag + "\",";
	    }
	    // module data generation functions
	    for (var i = 0; i < state.dataGenFns.length; i++) {
	      data += state.dataGenFns[i](el);
	    }
	    // attributes
	    if (el.attrs) {
	      data += "attrs:{" + genProps(el.attrs) + "},";
	    }
	    // DOM props
	    if (el.props) {
	      data += "domProps:{" + genProps(el.props) + "},";
	    }
	    // event handlers
	    if (el.events) {
	      data += genHandlers(el.events, false, state.warn) + ",";
	    }
	    if (el.nativeEvents) {
	      data += genHandlers(el.nativeEvents, true, state.warn) + ",";
	    }
	    // slot target
	    // only for non-scoped slots
	    if (el.slotTarget && !el.slotScope) {
	      data += "slot:" + el.slotTarget + ",";
	    }
	    // scoped slots
	    if (el.scopedSlots) {
	      data += genScopedSlots(el.scopedSlots, state) + ",";
	    }
	    // component v-model
	    if (el.model) {
	      data += "model:{value:" + el.model.value + ",callback:" + el.model.callback + ",expression:" + el.model.expression + "},";
	    }
	    // inline-template
	    if (el.inlineTemplate) {
	      var inlineTemplate = genInlineTemplate(el, state);
	      if (inlineTemplate) {
	        data += inlineTemplate + ",";
	      }
	    }
	    data = data.replace(/,$/, '') + '}';
	    // v-bind data wrap
	    if (el.wrapData) {
	      data = el.wrapData(data);
	    }
	    // v-on data wrap
	    if (el.wrapListeners) {
	      data = el.wrapListeners(data);
	    }
	    return data;
	  }
	
	  function genDirectives(el, state) {
	    var dirs = el.directives;
	    if (!dirs) {
	      return;
	    }
	    var res = 'directives:[';
	    var hasRuntime = false;
	    var i, l, dir, needRuntime;
	    for (i = 0, l = dirs.length; i < l; i++) {
	      dir = dirs[i];
	      needRuntime = true;
	      var gen = state.directives[dir.name];
	      if (gen) {
	        // compile-time directive that manipulates AST.
	        // returns true if it also needs a runtime counterpart.
	        needRuntime = !!gen(el, dir, state.warn);
	      }
	      if (needRuntime) {
	        hasRuntime = true;
	        res += "{name:\"" + dir.name + "\",rawName:\"" + dir.rawName + "\"" + (dir.value ? ",value:(" + dir.value + "),expression:" + JSON.stringify(dir.value) : '') + (dir.arg ? ",arg:\"" + dir.arg + "\"" : '') + (dir.modifiers ? ",modifiers:" + JSON.stringify(dir.modifiers) : '') + "},";
	      }
	    }
	    if (hasRuntime) {
	      return res.slice(0, -1) + ']';
	    }
	  }
	
	  function genInlineTemplate(el, state) {
	    var ast = el.children[0];
	    if ("development" !== 'production' && (el.children.length !== 1 || ast.type !== 1)) {
	      state.warn('Inline-template components must have exactly one child element.');
	    }
	    if (ast.type === 1) {
	      var inlineRenderFns = generate(ast, state.options);
	      return "inlineTemplate:{render:function(){" + inlineRenderFns.render + "},staticRenderFns:[" + inlineRenderFns.staticRenderFns.map(function (code) {
	        return "function(){" + code + "}";
	      }).join(',') + "]}";
	    }
	  }
	
	  function genScopedSlots(slots, state) {
	    return "scopedSlots:_u([" + Object.keys(slots).map(function (key) {
	      return genScopedSlot(key, slots[key], state);
	    }).join(',') + "])";
	  }
	
	  function genScopedSlot(key, el, state) {
	    if (el.for && !el.forProcessed) {
	      return genForScopedSlot(key, el, state);
	    }
	    var fn = "function(" + String(el.slotScope) + "){" + "return " + (el.tag === 'template' ? el.if ? el.if + "?" + (genChildren(el, state) || 'undefined') + ":undefined" : genChildren(el, state) || 'undefined' : genElement(el, state)) + "}";
	    return "{key:" + key + ",fn:" + fn + "}";
	  }
	
	  function genForScopedSlot(key, el, state) {
	    var exp = el.for;
	    var alias = el.alias;
	    var iterator1 = el.iterator1 ? "," + el.iterator1 : '';
	    var iterator2 = el.iterator2 ? "," + el.iterator2 : '';
	    el.forProcessed = true; // avoid recursion
	    return "_l((" + exp + ")," + "function(" + alias + iterator1 + iterator2 + "){" + "return " + genScopedSlot(key, el, state) + '})';
	  }
	
	  function genChildren(el, state, checkSkip, altGenElement, altGenNode) {
	    var children = el.children;
	    if (children.length) {
	      var el$1 = children[0];
	      // optimize single v-for
	      if (children.length === 1 && el$1.for && el$1.tag !== 'template' && el$1.tag !== 'slot') {
	        return (altGenElement || genElement)(el$1, state);
	      }
	      var normalizationType = checkSkip ? getNormalizationType(children, state.maybeComponent) : 0;
	      var gen = altGenNode || genNode;
	      return "[" + children.map(function (c) {
	        return gen(c, state);
	      }).join(',') + "]" + (normalizationType ? "," + normalizationType : '');
	    }
	  }
	
	  // determine the normalization needed for the children array.
	  // 0: no normalization needed
	  // 1: simple normalization needed (possible 1-level deep nested array)
	  // 2: full normalization needed
	  function getNormalizationType(children, maybeComponent) {
	    var res = 0;
	    for (var i = 0; i < children.length; i++) {
	      var el = children[i];
	      if (el.type !== 1) {
	        continue;
	      }
	      if (needsNormalization(el) || el.ifConditions && el.ifConditions.some(function (c) {
	        return needsNormalization(c.block);
	      })) {
	        res = 2;
	        break;
	      }
	      if (maybeComponent(el) || el.ifConditions && el.ifConditions.some(function (c) {
	        return maybeComponent(c.block);
	      })) {
	        res = 1;
	      }
	    }
	    return res;
	  }
	
	  function needsNormalization(el) {
	    return el.for !== undefined || el.tag === 'template' || el.tag === 'slot';
	  }
	
	  function genNode(node, state) {
	    if (node.type === 1) {
	      return genElement(node, state);
	    }if (node.type === 3 && node.isComment) {
	      return genComment(node);
	    } else {
	      return genText(node);
	    }
	  }
	
	  function genText(text) {
	    return "_v(" + (text.type === 2 ? text.expression // no need for () because already wrapped in _s()
	    : transformSpecialNewlines(JSON.stringify(text.text))) + ")";
	  }
	
	  function genComment(comment) {
	    return "_e(" + JSON.stringify(comment.text) + ")";
	  }
	
	  function genSlot(el, state) {
	    var slotName = el.slotName || '"default"';
	    var children = genChildren(el, state);
	    var res = "_t(" + slotName + (children ? "," + children : '');
	    var attrs = el.attrs && "{" + el.attrs.map(function (a) {
	      return camelize(a.name) + ":" + a.value;
	    }).join(',') + "}";
	    var bind$$1 = el.attrsMap['v-bind'];
	    if ((attrs || bind$$1) && !children) {
	      res += ",null";
	    }
	    if (attrs) {
	      res += "," + attrs;
	    }
	    if (bind$$1) {
	      res += (attrs ? '' : ',null') + "," + bind$$1;
	    }
	    return res + ')';
	  }
	
	  // componentName is el.component, take it as argument to shun flow's pessimistic refinement
	  function genComponent(componentName, el, state) {
	    var children = el.inlineTemplate ? null : genChildren(el, state, true);
	    return "_c(" + componentName + "," + genData$2(el, state) + (children ? "," + children : '') + ")";
	  }
	
	  function genProps(props) {
	    var res = '';
	    for (var i = 0; i < props.length; i++) {
	      var prop = props[i];
	      res += "\"" + prop.name + "\":" + transformSpecialNewlines(prop.value) + ",";
	    }
	    return res.slice(0, -1);
	  }
	
	  // #3895, #4268
	  function transformSpecialNewlines(text) {
	    return text.replace(/\u2028/g, '\\u2028').replace(/\u2029/g, '\\u2029');
	  }
	
	  /*  */
	
	  // these keywords should not appear inside expressions, but operators like
	  // typeof, instanceof and in are allowed
	  var prohibitedKeywordRE = new RegExp('\\b' + ('do,if,for,let,new,try,var,case,else,with,await,break,catch,class,const,' + 'super,throw,while,yield,delete,export,import,return,switch,default,' + 'extends,finally,continue,debugger,function,arguments').split(',').join('\\b|\\b') + '\\b');
	
	  // these unary operators should not be used as property/method names
	  var unaryOperatorsRE = new RegExp('\\b' + 'delete,typeof,void'.split(',').join('\\s*\\([^\\)]*\\)|\\b') + '\\s*\\([^\\)]*\\)');
	
	  // check valid identifier for v-for
	  var identRE = /[A-Za-z_$][\w$]*/;
	
	  // strip strings in expressions
	  var stripStringRE = /'(?:[^'\\]|\\.)*'|"(?:[^"\\]|\\.)*"|`(?:[^`\\]|\\.)*\$\{|\}(?:[^`\\]|\\.)*`|`(?:[^`\\]|\\.)*`/g;
	
	  // detect problematic expressions in a template
	  function detectErrors(ast) {
	    var errors = [];
	    if (ast) {
	      checkNode(ast, errors);
	    }
	    return errors;
	  }
	
	  function checkNode(node, errors) {
	    if (node.type === 1) {
	      for (var name in node.attrsMap) {
	        if (dirRE.test(name)) {
	          var value = node.attrsMap[name];
	          if (value) {
	            if (name === 'v-for') {
	              checkFor(node, "v-for=\"" + value + "\"", errors);
	            } else if (onRE.test(name)) {
	              checkEvent(value, name + "=\"" + value + "\"", errors);
	            } else {
	              checkExpression(value, name + "=\"" + value + "\"", errors);
	            }
	          }
	        }
	      }
	      if (node.children) {
	        for (var i = 0; i < node.children.length; i++) {
	          checkNode(node.children[i], errors);
	        }
	      }
	    } else if (node.type === 2) {
	      checkExpression(node.expression, node.text, errors);
	    }
	  }
	
	  function checkEvent(exp, text, errors) {
	    var stipped = exp.replace(stripStringRE, '');
	    var keywordMatch = stipped.match(unaryOperatorsRE);
	    if (keywordMatch && stipped.charAt(keywordMatch.index - 1) !== '$') {
	      errors.push("avoid using JavaScript unary operator as property name: " + "\"" + keywordMatch[0] + "\" in expression " + text.trim());
	    }
	    checkExpression(exp, text, errors);
	  }
	
	  function checkFor(node, text, errors) {
	    checkExpression(node.for || '', text, errors);
	    checkIdentifier(node.alias, 'v-for alias', text, errors);
	    checkIdentifier(node.iterator1, 'v-for iterator', text, errors);
	    checkIdentifier(node.iterator2, 'v-for iterator', text, errors);
	  }
	
	  function checkIdentifier(ident, type, text, errors) {
	    if (typeof ident === 'string' && !identRE.test(ident)) {
	      errors.push("invalid " + type + " \"" + ident + "\" in expression: " + text.trim());
	    }
	  }
	
	  function checkExpression(exp, text, errors) {
	    try {
	      new Function("return " + exp);
	    } catch (e) {
	      var keywordMatch = exp.replace(stripStringRE, '').match(prohibitedKeywordRE);
	      if (keywordMatch) {
	        errors.push("avoid using JavaScript keyword as property name: " + "\"" + keywordMatch[0] + "\"\n  Raw expression: " + text.trim());
	      } else {
	        errors.push("invalid expression: " + e.message + " in\n\n" + "    " + exp + "\n\n" + "  Raw expression: " + text.trim() + "\n");
	      }
	    }
	  }
	
	  /*  */
	
	  function createFunction(code, errors) {
	    try {
	      return new Function(code);
	    } catch (err) {
	      errors.push({ err: err, code: code });
	      return noop;
	    }
	  }
	
	  function createCompileToFunctionFn(compile) {
	    var cache = Object.create(null);
	
	    return function compileToFunctions(template, options, vm) {
	      options = extend({}, options);
	      var warn$$1 = options.warn || warn;
	      delete options.warn;
	
	      /* istanbul ignore if */
	      {
	        // detect possible CSP restriction
	        try {
	          new Function('return 1');
	        } catch (e) {
	          if (e.toString().match(/unsafe-eval|CSP/)) {
	            warn$$1('It seems you are using the standalone build of Vue.js in an ' + 'environment with Content Security Policy that prohibits unsafe-eval. ' + 'The template compiler cannot work in this environment. Consider ' + 'relaxing the policy to allow unsafe-eval or pre-compiling your ' + 'templates into render functions.');
	          }
	        }
	      }
	
	      // check cache
	      var key = options.delimiters ? String(options.delimiters) + template : template;
	      if (cache[key]) {
	        return cache[key];
	      }
	
	      // compile
	      var compiled = compile(template, options);
	
	      // check compilation errors/tips
	      {
	        if (compiled.errors && compiled.errors.length) {
	          warn$$1("Error compiling template:\n\n" + template + "\n\n" + compiled.errors.map(function (e) {
	            return "- " + e;
	          }).join('\n') + '\n', vm);
	        }
	        if (compiled.tips && compiled.tips.length) {
	          compiled.tips.forEach(function (msg) {
	            return tip(msg, vm);
	          });
	        }
	      }
	
	      // turn code into functions
	      var res = {};
	      var fnGenErrors = [];
	      res.render = createFunction(compiled.render, fnGenErrors);
	      res.staticRenderFns = compiled.staticRenderFns.map(function (code) {
	        return createFunction(code, fnGenErrors);
	      });
	
	      // check function generation errors.
	      // this should only happen if there is a bug in the compiler itself.
	      // mostly for codegen development use
	      /* istanbul ignore if */
	      {
	        if ((!compiled.errors || !compiled.errors.length) && fnGenErrors.length) {
	          warn$$1("Failed to generate render function:\n\n" + fnGenErrors.map(function (ref) {
	            var err = ref.err;
	            var code = ref.code;
	
	            return err.toString() + " in\n\n" + code + "\n";
	          }).join('\n'), vm);
	        }
	      }
	
	      return cache[key] = res;
	    };
	  }
	
	  /*  */
	
	  function createCompilerCreator(baseCompile) {
	    return function createCompiler(baseOptions) {
	      function compile(template, options) {
	        var finalOptions = Object.create(baseOptions);
	        var errors = [];
	        var tips = [];
	        finalOptions.warn = function (msg, tip) {
	          (tip ? tips : errors).push(msg);
	        };
	
	        if (options) {
	          // merge custom modules
	          if (options.modules) {
	            finalOptions.modules = (baseOptions.modules || []).concat(options.modules);
	          }
	          // merge custom directives
	          if (options.directives) {
	            finalOptions.directives = extend(Object.create(baseOptions.directives), options.directives);
	          }
	          // copy other options
	          for (var key in options) {
	            if (key !== 'modules' && key !== 'directives') {
	              finalOptions[key] = options[key];
	            }
	          }
	        }
	
	        var compiled = baseCompile(template, finalOptions);
	        {
	          errors.push.apply(errors, detectErrors(compiled.ast));
	        }
	        compiled.errors = errors;
	        compiled.tips = tips;
	        return compiled;
	      }
	
	      return {
	        compile: compile,
	        compileToFunctions: createCompileToFunctionFn(compile)
	      };
	    };
	  }
	
	  /*  */
	
	  // `createCompilerCreator` allows creating compilers that use alternative
	  // parser/optimizer/codegen, e.g the SSR optimizing compiler.
	  // Here we just export a default compiler using the default parts.
	  var createCompiler = createCompilerCreator(function baseCompile(template, options) {
	    var ast = parse(template.trim(), options);
	    optimize(ast, options);
	    var code = generate(ast, options);
	    return {
	      ast: ast,
	      render: code.render,
	      staticRenderFns: code.staticRenderFns
	    };
	  });
	
	  /*  */
	
	  var ref$1 = createCompiler(baseOptions);
	  var compileToFunctions = ref$1.compileToFunctions;
	
	  /*  */
	
	  var idToTemplate = cached(function (id) {
	    var el = query(id);
	    return el && el.innerHTML;
	  });
	
	  var mount = Vue$3.prototype.$mount;
	  Vue$3.prototype.$mount = function (el, hydrating) {
	    el = el && query(el);
	
	    /* istanbul ignore if */
	    if (el === document.body || el === document.documentElement) {
	      "development" !== 'production' && warn("Do not mount Vue to <html> or <body> - mount to normal elements instead.");
	      return this;
	    }
	
	    var options = this.$options;
	    // resolve template/el and convert to render function
	    if (!options.render) {
	      var template = options.template;
	      if (template) {
	        if (typeof template === 'string') {
	          if (template.charAt(0) === '#') {
	            template = idToTemplate(template);
	            /* istanbul ignore if */
	            if ("development" !== 'production' && !template) {
	              warn("Template element not found or is empty: " + options.template, this);
	            }
	          }
	        } else if (template.nodeType) {
	          template = template.innerHTML;
	        } else {
	          {
	            warn('invalid template option:' + template, this);
	          }
	          return this;
	        }
	      } else if (el) {
	        template = getOuterHTML(el);
	      }
	      if (template) {
	        /* istanbul ignore if */
	        if ("development" !== 'production' && config.performance && mark) {
	          mark('compile');
	        }
	
	        var ref = compileToFunctions(template, {
	          shouldDecodeNewlines: shouldDecodeNewlines,
	          delimiters: options.delimiters,
	          comments: options.comments
	        }, this);
	        var render = ref.render;
	        var staticRenderFns = ref.staticRenderFns;
	        options.render = render;
	        options.staticRenderFns = staticRenderFns;
	
	        /* istanbul ignore if */
	        if ("development" !== 'production' && config.performance && mark) {
	          mark('compile end');
	          measure("vue " + this._name + " compile", 'compile', 'compile end');
	        }
	      }
	    }
	    return mount.call(this, el, hydrating);
	  };
	
	  /**
	   * Get outerHTML of elements, taking care
	   * of SVG elements in IE as well.
	   */
	  function getOuterHTML(el) {
	    if (el.outerHTML) {
	      return el.outerHTML;
	    } else {
	      var container = document.createElement('div');
	      container.appendChild(el.cloneNode(true));
	      return container.innerHTML;
	    }
	  }
	
	  Vue$3.compile = compileToFunctions;
	
	  return Vue$3;
	});
	/* WEBPACK VAR INJECTION */}.call(exports, (function() { return this; }()), __webpack_require__(2).setImmediate))

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

	"use strict";
	
	var apply = Function.prototype.apply;
	
	// DOM APIs, for completeness
	
	exports.setTimeout = function () {
	  return new Timeout(apply.call(setTimeout, window, arguments), clearTimeout);
	};
	exports.setInterval = function () {
	  return new Timeout(apply.call(setInterval, window, arguments), clearInterval);
	};
	exports.clearTimeout = exports.clearInterval = function (timeout) {
	  if (timeout) {
	    timeout.close();
	  }
	};
	
	function Timeout(id, clearFn) {
	  this._id = id;
	  this._clearFn = clearFn;
	}
	Timeout.prototype.unref = Timeout.prototype.ref = function () {};
	Timeout.prototype.close = function () {
	  this._clearFn.call(window, this._id);
	};
	
	// Does not start the time, just sets up the members needed.
	exports.enroll = function (item, msecs) {
	  clearTimeout(item._idleTimeoutId);
	  item._idleTimeout = msecs;
	};
	
	exports.unenroll = function (item) {
	  clearTimeout(item._idleTimeoutId);
	  item._idleTimeout = -1;
	};
	
	exports._unrefActive = exports.active = function (item) {
	  clearTimeout(item._idleTimeoutId);
	
	  var msecs = item._idleTimeout;
	  if (msecs >= 0) {
	    item._idleTimeoutId = setTimeout(function onTimeout() {
	      if (item._onTimeout) item._onTimeout();
	    }, msecs);
	  }
	};
	
	// setimmediate attaches itself to the global object
	__webpack_require__(3);
	exports.setImmediate = setImmediate;
	exports.clearImmediate = clearImmediate;

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(global, process) {"use strict";
	
	(function (global, undefined) {
	    "use strict";
	
	    if (global.setImmediate) {
	        return;
	    }
	
	    var nextHandle = 1; // Spec says greater than zero
	    var tasksByHandle = {};
	    var currentlyRunningATask = false;
	    var doc = global.document;
	    var registerImmediate;
	
	    function setImmediate(callback) {
	        // Callback can either be a function or a string
	        if (typeof callback !== "function") {
	            callback = new Function("" + callback);
	        }
	        // Copy function arguments
	        var args = new Array(arguments.length - 1);
	        for (var i = 0; i < args.length; i++) {
	            args[i] = arguments[i + 1];
	        }
	        // Store and register the task
	        var task = { callback: callback, args: args };
	        tasksByHandle[nextHandle] = task;
	        registerImmediate(nextHandle);
	        return nextHandle++;
	    }
	
	    function clearImmediate(handle) {
	        delete tasksByHandle[handle];
	    }
	
	    function run(task) {
	        var callback = task.callback;
	        var args = task.args;
	        switch (args.length) {
	            case 0:
	                callback();
	                break;
	            case 1:
	                callback(args[0]);
	                break;
	            case 2:
	                callback(args[0], args[1]);
	                break;
	            case 3:
	                callback(args[0], args[1], args[2]);
	                break;
	            default:
	                callback.apply(undefined, args);
	                break;
	        }
	    }
	
	    function runIfPresent(handle) {
	        // From the spec: "Wait until any invocations of this algorithm started before this one have completed."
	        // So if we're currently running a task, we'll need to delay this invocation.
	        if (currentlyRunningATask) {
	            // Delay by doing a setTimeout. setImmediate was tried instead, but in Firefox 7 it generated a
	            // "too much recursion" error.
	            setTimeout(runIfPresent, 0, handle);
	        } else {
	            var task = tasksByHandle[handle];
	            if (task) {
	                currentlyRunningATask = true;
	                try {
	                    run(task);
	                } finally {
	                    clearImmediate(handle);
	                    currentlyRunningATask = false;
	                }
	            }
	        }
	    }
	
	    function installNextTickImplementation() {
	        registerImmediate = function registerImmediate(handle) {
	            process.nextTick(function () {
	                runIfPresent(handle);
	            });
	        };
	    }
	
	    function canUsePostMessage() {
	        // The test against `importScripts` prevents this implementation from being installed inside a web worker,
	        // where `global.postMessage` means something completely different and can't be used for this purpose.
	        if (global.postMessage && !global.importScripts) {
	            var postMessageIsAsynchronous = true;
	            var oldOnMessage = global.onmessage;
	            global.onmessage = function () {
	                postMessageIsAsynchronous = false;
	            };
	            global.postMessage("", "*");
	            global.onmessage = oldOnMessage;
	            return postMessageIsAsynchronous;
	        }
	    }
	
	    function installPostMessageImplementation() {
	        // Installs an event handler on `global` for the `message` event: see
	        // * https://developer.mozilla.org/en/DOM/window.postMessage
	        // * http://www.whatwg.org/specs/web-apps/current-work/multipage/comms.html#crossDocumentMessages
	
	        var messagePrefix = "setImmediate$" + Math.random() + "$";
	        var onGlobalMessage = function onGlobalMessage(event) {
	            if (event.source === global && typeof event.data === "string" && event.data.indexOf(messagePrefix) === 0) {
	                runIfPresent(+event.data.slice(messagePrefix.length));
	            }
	        };
	
	        if (global.addEventListener) {
	            global.addEventListener("message", onGlobalMessage, false);
	        } else {
	            global.attachEvent("onmessage", onGlobalMessage);
	        }
	
	        registerImmediate = function registerImmediate(handle) {
	            global.postMessage(messagePrefix + handle, "*");
	        };
	    }
	
	    function installMessageChannelImplementation() {
	        var channel = new MessageChannel();
	        channel.port1.onmessage = function (event) {
	            var handle = event.data;
	            runIfPresent(handle);
	        };
	
	        registerImmediate = function registerImmediate(handle) {
	            channel.port2.postMessage(handle);
	        };
	    }
	
	    function installReadyStateChangeImplementation() {
	        var html = doc.documentElement;
	        registerImmediate = function registerImmediate(handle) {
	            // Create a <script> element; its readystatechange event will be fired asynchronously once it is inserted
	            // into the document. Do so, thus queuing up the task. Remember to clean up once it's been called.
	            var script = doc.createElement("script");
	            script.onreadystatechange = function () {
	                runIfPresent(handle);
	                script.onreadystatechange = null;
	                html.removeChild(script);
	                script = null;
	            };
	            html.appendChild(script);
	        };
	    }
	
	    function installSetTimeoutImplementation() {
	        registerImmediate = function registerImmediate(handle) {
	            setTimeout(runIfPresent, 0, handle);
	        };
	    }
	
	    // If supported, we should attach to the prototype of global, since that is where setTimeout et al. live.
	    var attachTo = Object.getPrototypeOf && Object.getPrototypeOf(global);
	    attachTo = attachTo && attachTo.setTimeout ? attachTo : global;
	
	    // Don't get fooled by e.g. browserify environments.
	    if ({}.toString.call(global.process) === "[object process]") {
	        // For Node.js before 0.9
	        installNextTickImplementation();
	    } else if (canUsePostMessage()) {
	        // For non-IE10 modern browsers
	        installPostMessageImplementation();
	    } else if (global.MessageChannel) {
	        // For web workers, where supported
	        installMessageChannelImplementation();
	    } else if (doc && "onreadystatechange" in doc.createElement("script")) {
	        // For IE 6–8
	        installReadyStateChangeImplementation();
	    } else {
	        // For older browsers
	        installSetTimeoutImplementation();
	    }
	
	    attachTo.setImmediate = setImmediate;
	    attachTo.clearImmediate = clearImmediate;
	})(typeof self === "undefined" ? typeof global === "undefined" ? undefined : global : self);
	/* WEBPACK VAR INJECTION */}.call(exports, (function() { return this; }()), __webpack_require__(4)))

/***/ }),
/* 4 */
/***/ (function(module, exports) {

	'use strict';
	
	// shim for using process in browser
	var process = module.exports = {};
	
	// cached from whatever global is present so that test runners that stub it
	// don't break things.  But we need to wrap it in a try catch in case it is
	// wrapped in strict mode code which doesn't define any globals.  It's inside a
	// function because try/catches deoptimize in certain engines.
	
	var cachedSetTimeout;
	var cachedClearTimeout;
	
	function defaultSetTimout() {
	    throw new Error('setTimeout has not been defined');
	}
	function defaultClearTimeout() {
	    throw new Error('clearTimeout has not been defined');
	}
	(function () {
	    try {
	        if (typeof setTimeout === 'function') {
	            cachedSetTimeout = setTimeout;
	        } else {
	            cachedSetTimeout = defaultSetTimout;
	        }
	    } catch (e) {
	        cachedSetTimeout = defaultSetTimout;
	    }
	    try {
	        if (typeof clearTimeout === 'function') {
	            cachedClearTimeout = clearTimeout;
	        } else {
	            cachedClearTimeout = defaultClearTimeout;
	        }
	    } catch (e) {
	        cachedClearTimeout = defaultClearTimeout;
	    }
	})();
	function runTimeout(fun) {
	    if (cachedSetTimeout === setTimeout) {
	        //normal enviroments in sane situations
	        return setTimeout(fun, 0);
	    }
	    // if setTimeout wasn't available but was latter defined
	    if ((cachedSetTimeout === defaultSetTimout || !cachedSetTimeout) && setTimeout) {
	        cachedSetTimeout = setTimeout;
	        return setTimeout(fun, 0);
	    }
	    try {
	        // when when somebody has screwed with setTimeout but no I.E. maddness
	        return cachedSetTimeout(fun, 0);
	    } catch (e) {
	        try {
	            // When we are in I.E. but the script has been evaled so I.E. doesn't trust the global object when called normally
	            return cachedSetTimeout.call(null, fun, 0);
	        } catch (e) {
	            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error
	            return cachedSetTimeout.call(this, fun, 0);
	        }
	    }
	}
	function runClearTimeout(marker) {
	    if (cachedClearTimeout === clearTimeout) {
	        //normal enviroments in sane situations
	        return clearTimeout(marker);
	    }
	    // if clearTimeout wasn't available but was latter defined
	    if ((cachedClearTimeout === defaultClearTimeout || !cachedClearTimeout) && clearTimeout) {
	        cachedClearTimeout = clearTimeout;
	        return clearTimeout(marker);
	    }
	    try {
	        // when when somebody has screwed with setTimeout but no I.E. maddness
	        return cachedClearTimeout(marker);
	    } catch (e) {
	        try {
	            // When we are in I.E. but the script has been evaled so I.E. doesn't  trust the global object when called normally
	            return cachedClearTimeout.call(null, marker);
	        } catch (e) {
	            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error.
	            // Some versions of I.E. have different rules for clearTimeout vs setTimeout
	            return cachedClearTimeout.call(this, marker);
	        }
	    }
	}
	var queue = [];
	var draining = false;
	var currentQueue;
	var queueIndex = -1;
	
	function cleanUpNextTick() {
	    if (!draining || !currentQueue) {
	        return;
	    }
	    draining = false;
	    if (currentQueue.length) {
	        queue = currentQueue.concat(queue);
	    } else {
	        queueIndex = -1;
	    }
	    if (queue.length) {
	        drainQueue();
	    }
	}
	
	function drainQueue() {
	    if (draining) {
	        return;
	    }
	    var timeout = runTimeout(cleanUpNextTick);
	    draining = true;
	
	    var len = queue.length;
	    while (len) {
	        currentQueue = queue;
	        queue = [];
	        while (++queueIndex < len) {
	            if (currentQueue) {
	                currentQueue[queueIndex].run();
	            }
	        }
	        queueIndex = -1;
	        len = queue.length;
	    }
	    currentQueue = null;
	    draining = false;
	    runClearTimeout(timeout);
	}
	
	process.nextTick = function (fun) {
	    var args = new Array(arguments.length - 1);
	    if (arguments.length > 1) {
	        for (var i = 1; i < arguments.length; i++) {
	            args[i - 1] = arguments[i];
	        }
	    }
	    queue.push(new Item(fun, args));
	    if (queue.length === 1 && !draining) {
	        runTimeout(drainQueue);
	    }
	};
	
	// v8 likes predictible objects
	function Item(fun, array) {
	    this.fun = fun;
	    this.array = array;
	}
	Item.prototype.run = function () {
	    this.fun.apply(null, this.array);
	};
	process.title = 'browser';
	process.browser = true;
	process.env = {};
	process.argv = [];
	process.version = ''; // empty string to avoid regexp issues
	process.versions = {};
	
	function noop() {}
	
	process.on = noop;
	process.addListener = noop;
	process.once = noop;
	process.off = noop;
	process.removeListener = noop;
	process.removeAllListeners = noop;
	process.emit = noop;
	process.prependListener = noop;
	process.prependOnceListener = noop;
	
	process.listeners = function (name) {
	    return [];
	};
	
	process.binding = function (name) {
	    throw new Error('process.binding is not supported');
	};
	
	process.cwd = function () {
	    return '/';
	};
	process.chdir = function (dir) {
	    throw new Error('process.chdir is not supported');
	};
	process.umask = function () {
	    return 0;
	};

/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(process) {/**
	 * vuex v2.5.0
	 * (c) 2017 Evan You
	 * @license MIT
	 */
	'use strict';
	
	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };
	
	var applyMixin = function applyMixin(Vue) {
	  var version = Number(Vue.version.split('.')[0]);
	
	  if (version >= 2) {
	    Vue.mixin({ beforeCreate: vuexInit });
	  } else {
	    // override init and inject vuex init procedure
	    // for 1.x backwards compatibility.
	    var _init = Vue.prototype._init;
	    Vue.prototype._init = function (options) {
	      if (options === void 0) options = {};
	
	      options.init = options.init ? [vuexInit].concat(options.init) : vuexInit;
	      _init.call(this, options);
	    };
	  }
	
	  /**
	   * Vuex init hook, injected into each instances init hooks list.
	   */
	
	  function vuexInit() {
	    var options = this.$options;
	    // store injection
	    if (options.store) {
	      this.$store = typeof options.store === 'function' ? options.store() : options.store;
	    } else if (options.parent && options.parent.$store) {
	      this.$store = options.parent.$store;
	    }
	  }
	};
	
	var devtoolHook = typeof window !== 'undefined' && window.__VUE_DEVTOOLS_GLOBAL_HOOK__;
	
	function devtoolPlugin(store) {
	  if (!devtoolHook) {
	    return;
	  }
	
	  store._devtoolHook = devtoolHook;
	
	  devtoolHook.emit('vuex:init', store);
	
	  devtoolHook.on('vuex:travel-to-state', function (targetState) {
	    store.replaceState(targetState);
	  });
	
	  store.subscribe(function (mutation, state) {
	    devtoolHook.emit('vuex:mutation', mutation, state);
	  });
	}
	
	/**
	 * Get the first item that pass the test
	 * by second argument function
	 *
	 * @param {Array} list
	 * @param {Function} f
	 * @return {*}
	 */
	/**
	 * Deep copy the given object considering circular structure.
	 * This function caches all nested objects and its copies.
	 * If it detects circular structure, use cached copy to avoid infinite loop.
	 *
	 * @param {*} obj
	 * @param {Array<Object>} cache
	 * @return {*}
	 */
	
	/**
	 * forEach for object
	 */
	function forEachValue(obj, fn) {
	  Object.keys(obj).forEach(function (key) {
	    return fn(obj[key], key);
	  });
	}
	
	function isObject(obj) {
	  return obj !== null && (typeof obj === 'undefined' ? 'undefined' : _typeof(obj)) === 'object';
	}
	
	function isPromise(val) {
	  return val && typeof val.then === 'function';
	}
	
	function assert(condition, msg) {
	  if (!condition) {
	    throw new Error("[vuex] " + msg);
	  }
	}
	
	var Module = function Module(rawModule, runtime) {
	  this.runtime = runtime;
	  this._children = Object.create(null);
	  this._rawModule = rawModule;
	  var rawState = rawModule.state;
	  this.state = (typeof rawState === 'function' ? rawState() : rawState) || {};
	};
	
	var prototypeAccessors$1 = { namespaced: { configurable: true } };
	
	prototypeAccessors$1.namespaced.get = function () {
	  return !!this._rawModule.namespaced;
	};
	
	Module.prototype.addChild = function addChild(key, module) {
	  this._children[key] = module;
	};
	
	Module.prototype.removeChild = function removeChild(key) {
	  delete this._children[key];
	};
	
	Module.prototype.getChild = function getChild(key) {
	  return this._children[key];
	};
	
	Module.prototype.update = function update(rawModule) {
	  this._rawModule.namespaced = rawModule.namespaced;
	  if (rawModule.actions) {
	    this._rawModule.actions = rawModule.actions;
	  }
	  if (rawModule.mutations) {
	    this._rawModule.mutations = rawModule.mutations;
	  }
	  if (rawModule.getters) {
	    this._rawModule.getters = rawModule.getters;
	  }
	};
	
	Module.prototype.forEachChild = function forEachChild(fn) {
	  forEachValue(this._children, fn);
	};
	
	Module.prototype.forEachGetter = function forEachGetter(fn) {
	  if (this._rawModule.getters) {
	    forEachValue(this._rawModule.getters, fn);
	  }
	};
	
	Module.prototype.forEachAction = function forEachAction(fn) {
	  if (this._rawModule.actions) {
	    forEachValue(this._rawModule.actions, fn);
	  }
	};
	
	Module.prototype.forEachMutation = function forEachMutation(fn) {
	  if (this._rawModule.mutations) {
	    forEachValue(this._rawModule.mutations, fn);
	  }
	};
	
	Object.defineProperties(Module.prototype, prototypeAccessors$1);
	
	var ModuleCollection = function ModuleCollection(rawRootModule) {
	  // register root module (Vuex.Store options)
	  this.register([], rawRootModule, false);
	};
	
	ModuleCollection.prototype.get = function get(path) {
	  return path.reduce(function (module, key) {
	    return module.getChild(key);
	  }, this.root);
	};
	
	ModuleCollection.prototype.getNamespace = function getNamespace(path) {
	  var module = this.root;
	  return path.reduce(function (namespace, key) {
	    module = module.getChild(key);
	    return namespace + (module.namespaced ? key + '/' : '');
	  }, '');
	};
	
	ModuleCollection.prototype.update = function update$1(rawRootModule) {
	  update([], this.root, rawRootModule);
	};
	
	ModuleCollection.prototype.register = function register(path, rawModule, runtime) {
	  var this$1 = this;
	  if (runtime === void 0) runtime = true;
	
	  if (process.env.NODE_ENV !== 'production') {
	    assertRawModule(path, rawModule);
	  }
	
	  var newModule = new Module(rawModule, runtime);
	  if (path.length === 0) {
	    this.root = newModule;
	  } else {
	    var parent = this.get(path.slice(0, -1));
	    parent.addChild(path[path.length - 1], newModule);
	  }
	
	  // register nested modules
	  if (rawModule.modules) {
	    forEachValue(rawModule.modules, function (rawChildModule, key) {
	      this$1.register(path.concat(key), rawChildModule, runtime);
	    });
	  }
	};
	
	ModuleCollection.prototype.unregister = function unregister(path) {
	  var parent = this.get(path.slice(0, -1));
	  var key = path[path.length - 1];
	  if (!parent.getChild(key).runtime) {
	    return;
	  }
	
	  parent.removeChild(key);
	};
	
	function update(path, targetModule, newModule) {
	  if (process.env.NODE_ENV !== 'production') {
	    assertRawModule(path, newModule);
	  }
	
	  // update target module
	  targetModule.update(newModule);
	
	  // update nested modules
	  if (newModule.modules) {
	    for (var key in newModule.modules) {
	      if (!targetModule.getChild(key)) {
	        if (process.env.NODE_ENV !== 'production') {
	          console.warn("[vuex] trying to add a new module '" + key + "' on hot reloading, " + 'manual reload is needed');
	        }
	        return;
	      }
	      update(path.concat(key), targetModule.getChild(key), newModule.modules[key]);
	    }
	  }
	}
	
	var functionAssert = {
	  assert: function assert(value) {
	    return typeof value === 'function';
	  },
	  expected: 'function'
	};
	
	var objectAssert = {
	  assert: function assert(value) {
	    return typeof value === 'function' || (typeof value === 'undefined' ? 'undefined' : _typeof(value)) === 'object' && typeof value.handler === 'function';
	  },
	  expected: 'function or object with "handler" function'
	};
	
	var assertTypes = {
	  getters: functionAssert,
	  mutations: functionAssert,
	  actions: objectAssert
	};
	
	function assertRawModule(path, rawModule) {
	  Object.keys(assertTypes).forEach(function (key) {
	    if (!rawModule[key]) {
	      return;
	    }
	
	    var assertOptions = assertTypes[key];
	
	    forEachValue(rawModule[key], function (value, type) {
	      assert(assertOptions.assert(value), makeAssertionMessage(path, key, type, value, assertOptions.expected));
	    });
	  });
	}
	
	function makeAssertionMessage(path, key, type, value, expected) {
	  var buf = key + " should be " + expected + " but \"" + key + "." + type + "\"";
	  if (path.length > 0) {
	    buf += " in module \"" + path.join('.') + "\"";
	  }
	  buf += " is " + JSON.stringify(value) + ".";
	  return buf;
	}
	
	var Vue; // bind on install
	
	var Store = function Store(options) {
	  var this$1 = this;
	  if (options === void 0) options = {};
	
	  // Auto install if it is not done yet and `window` has `Vue`.
	  // To allow users to avoid auto-installation in some cases,
	  // this code should be placed here. See #731
	  if (!Vue && typeof window !== 'undefined' && window.Vue) {
	    install(window.Vue);
	  }
	
	  if (process.env.NODE_ENV !== 'production') {
	    assert(Vue, "must call Vue.use(Vuex) before creating a store instance.");
	    assert(typeof Promise !== 'undefined', "vuex requires a Promise polyfill in this browser.");
	    assert(this instanceof Store, "Store must be called with the new operator.");
	  }
	
	  var plugins = options.plugins;if (plugins === void 0) plugins = [];
	  var strict = options.strict;if (strict === void 0) strict = false;
	
	  var state = options.state;if (state === void 0) state = {};
	  if (typeof state === 'function') {
	    state = state() || {};
	  }
	
	  // store internal state
	  this._committing = false;
	  this._actions = Object.create(null);
	  this._actionSubscribers = [];
	  this._mutations = Object.create(null);
	  this._wrappedGetters = Object.create(null);
	  this._modules = new ModuleCollection(options);
	  this._modulesNamespaceMap = Object.create(null);
	  this._subscribers = [];
	  this._watcherVM = new Vue();
	
	  // bind commit and dispatch to self
	  var store = this;
	  var ref = this;
	  var dispatch = ref.dispatch;
	  var commit = ref.commit;
	  this.dispatch = function boundDispatch(type, payload) {
	    return dispatch.call(store, type, payload);
	  };
	  this.commit = function boundCommit(type, payload, options) {
	    return commit.call(store, type, payload, options);
	  };
	
	  // strict mode
	  this.strict = strict;
	
	  // init root module.
	  // this also recursively registers all sub-modules
	  // and collects all module getters inside this._wrappedGetters
	  installModule(this, state, [], this._modules.root);
	
	  // initialize the store vm, which is responsible for the reactivity
	  // (also registers _wrappedGetters as computed properties)
	  resetStoreVM(this, state);
	
	  // apply plugins
	  plugins.forEach(function (plugin) {
	    return plugin(this$1);
	  });
	
	  if (Vue.config.devtools) {
	    devtoolPlugin(this);
	  }
	};
	
	var prototypeAccessors = { state: { configurable: true } };
	
	prototypeAccessors.state.get = function () {
	  return this._vm._data.$$state;
	};
	
	prototypeAccessors.state.set = function (v) {
	  if (process.env.NODE_ENV !== 'production') {
	    assert(false, "Use store.replaceState() to explicit replace store state.");
	  }
	};
	
	Store.prototype.commit = function commit(_type, _payload, _options) {
	  var this$1 = this;
	
	  // check object-style commit
	  var ref = unifyObjectStyle(_type, _payload, _options);
	  var type = ref.type;
	  var payload = ref.payload;
	  var options = ref.options;
	
	  var mutation = { type: type, payload: payload };
	  var entry = this._mutations[type];
	  if (!entry) {
	    if (process.env.NODE_ENV !== 'production') {
	      console.error("[vuex] unknown mutation type: " + type);
	    }
	    return;
	  }
	  this._withCommit(function () {
	    entry.forEach(function commitIterator(handler) {
	      handler(payload);
	    });
	  });
	  this._subscribers.forEach(function (sub) {
	    return sub(mutation, this$1.state);
	  });
	
	  if (process.env.NODE_ENV !== 'production' && options && options.silent) {
	    console.warn("[vuex] mutation type: " + type + ". Silent option has been removed. " + 'Use the filter functionality in the vue-devtools');
	  }
	};
	
	Store.prototype.dispatch = function dispatch(_type, _payload) {
	  var this$1 = this;
	
	  // check object-style dispatch
	  var ref = unifyObjectStyle(_type, _payload);
	  var type = ref.type;
	  var payload = ref.payload;
	
	  var action = { type: type, payload: payload };
	  var entry = this._actions[type];
	  if (!entry) {
	    if (process.env.NODE_ENV !== 'production') {
	      console.error("[vuex] unknown action type: " + type);
	    }
	    return;
	  }
	
	  this._actionSubscribers.forEach(function (sub) {
	    return sub(action, this$1.state);
	  });
	
	  return entry.length > 1 ? Promise.all(entry.map(function (handler) {
	    return handler(payload);
	  })) : entry[0](payload);
	};
	
	Store.prototype.subscribe = function subscribe(fn) {
	  return genericSubscribe(fn, this._subscribers);
	};
	
	Store.prototype.subscribeAction = function subscribeAction(fn) {
	  return genericSubscribe(fn, this._actionSubscribers);
	};
	
	Store.prototype.watch = function watch(getter, cb, options) {
	  var this$1 = this;
	
	  if (process.env.NODE_ENV !== 'production') {
	    assert(typeof getter === 'function', "store.watch only accepts a function.");
	  }
	  return this._watcherVM.$watch(function () {
	    return getter(this$1.state, this$1.getters);
	  }, cb, options);
	};
	
	Store.prototype.replaceState = function replaceState(state) {
	  var this$1 = this;
	
	  this._withCommit(function () {
	    this$1._vm._data.$$state = state;
	  });
	};
	
	Store.prototype.registerModule = function registerModule(path, rawModule, options) {
	  if (options === void 0) options = {};
	
	  if (typeof path === 'string') {
	    path = [path];
	  }
	
	  if (process.env.NODE_ENV !== 'production') {
	    assert(Array.isArray(path), "module path must be a string or an Array.");
	    assert(path.length > 0, 'cannot register the root module by using registerModule.');
	  }
	
	  this._modules.register(path, rawModule);
	  installModule(this, this.state, path, this._modules.get(path), options.preserveState);
	  // reset store to update getters...
	  resetStoreVM(this, this.state);
	};
	
	Store.prototype.unregisterModule = function unregisterModule(path) {
	  var this$1 = this;
	
	  if (typeof path === 'string') {
	    path = [path];
	  }
	
	  if (process.env.NODE_ENV !== 'production') {
	    assert(Array.isArray(path), "module path must be a string or an Array.");
	  }
	
	  this._modules.unregister(path);
	  this._withCommit(function () {
	    var parentState = getNestedState(this$1.state, path.slice(0, -1));
	    Vue.delete(parentState, path[path.length - 1]);
	  });
	  resetStore(this);
	};
	
	Store.prototype.hotUpdate = function hotUpdate(newOptions) {
	  this._modules.update(newOptions);
	  resetStore(this, true);
	};
	
	Store.prototype._withCommit = function _withCommit(fn) {
	  var committing = this._committing;
	  this._committing = true;
	  fn();
	  this._committing = committing;
	};
	
	Object.defineProperties(Store.prototype, prototypeAccessors);
	
	function genericSubscribe(fn, subs) {
	  if (subs.indexOf(fn) < 0) {
	    subs.push(fn);
	  }
	  return function () {
	    var i = subs.indexOf(fn);
	    if (i > -1) {
	      subs.splice(i, 1);
	    }
	  };
	}
	
	function resetStore(store, hot) {
	  store._actions = Object.create(null);
	  store._mutations = Object.create(null);
	  store._wrappedGetters = Object.create(null);
	  store._modulesNamespaceMap = Object.create(null);
	  var state = store.state;
	  // init all modules
	  installModule(store, state, [], store._modules.root, true);
	  // reset vm
	  resetStoreVM(store, state, hot);
	}
	
	function resetStoreVM(store, state, hot) {
	  var oldVm = store._vm;
	
	  // bind store public getters
	  store.getters = {};
	  var wrappedGetters = store._wrappedGetters;
	  var computed = {};
	  forEachValue(wrappedGetters, function (fn, key) {
	    // use computed to leverage its lazy-caching mechanism
	    computed[key] = function () {
	      return fn(store);
	    };
	    Object.defineProperty(store.getters, key, {
	      get: function get() {
	        return store._vm[key];
	      },
	      enumerable: true // for local getters
	    });
	  });
	
	  // use a Vue instance to store the state tree
	  // suppress warnings just in case the user has added
	  // some funky global mixins
	  var silent = Vue.config.silent;
	  Vue.config.silent = true;
	  store._vm = new Vue({
	    data: {
	      $$state: state
	    },
	    computed: computed
	  });
	  Vue.config.silent = silent;
	
	  // enable strict mode for new vm
	  if (store.strict) {
	    enableStrictMode(store);
	  }
	
	  if (oldVm) {
	    if (hot) {
	      // dispatch changes in all subscribed watchers
	      // to force getter re-evaluation for hot reloading.
	      store._withCommit(function () {
	        oldVm._data.$$state = null;
	      });
	    }
	    Vue.nextTick(function () {
	      return oldVm.$destroy();
	    });
	  }
	}
	
	function installModule(store, rootState, path, module, hot) {
	  var isRoot = !path.length;
	  var namespace = store._modules.getNamespace(path);
	
	  // register in namespace map
	  if (module.namespaced) {
	    store._modulesNamespaceMap[namespace] = module;
	  }
	
	  // set state
	  if (!isRoot && !hot) {
	    var parentState = getNestedState(rootState, path.slice(0, -1));
	    var moduleName = path[path.length - 1];
	    store._withCommit(function () {
	      Vue.set(parentState, moduleName, module.state);
	    });
	  }
	
	  var local = module.context = makeLocalContext(store, namespace, path);
	
	  module.forEachMutation(function (mutation, key) {
	    var namespacedType = namespace + key;
	    registerMutation(store, namespacedType, mutation, local);
	  });
	
	  module.forEachAction(function (action, key) {
	    var type = action.root ? key : namespace + key;
	    var handler = action.handler || action;
	    registerAction(store, type, handler, local);
	  });
	
	  module.forEachGetter(function (getter, key) {
	    var namespacedType = namespace + key;
	    registerGetter(store, namespacedType, getter, local);
	  });
	
	  module.forEachChild(function (child, key) {
	    installModule(store, rootState, path.concat(key), child, hot);
	  });
	}
	
	/**
	 * make localized dispatch, commit, getters and state
	 * if there is no namespace, just use root ones
	 */
	function makeLocalContext(store, namespace, path) {
	  var noNamespace = namespace === '';
	
	  var local = {
	    dispatch: noNamespace ? store.dispatch : function (_type, _payload, _options) {
	      var args = unifyObjectStyle(_type, _payload, _options);
	      var payload = args.payload;
	      var options = args.options;
	      var type = args.type;
	
	      if (!options || !options.root) {
	        type = namespace + type;
	        if (process.env.NODE_ENV !== 'production' && !store._actions[type]) {
	          console.error("[vuex] unknown local action type: " + args.type + ", global type: " + type);
	          return;
	        }
	      }
	
	      return store.dispatch(type, payload);
	    },
	
	    commit: noNamespace ? store.commit : function (_type, _payload, _options) {
	      var args = unifyObjectStyle(_type, _payload, _options);
	      var payload = args.payload;
	      var options = args.options;
	      var type = args.type;
	
	      if (!options || !options.root) {
	        type = namespace + type;
	        if (process.env.NODE_ENV !== 'production' && !store._mutations[type]) {
	          console.error("[vuex] unknown local mutation type: " + args.type + ", global type: " + type);
	          return;
	        }
	      }
	
	      store.commit(type, payload, options);
	    }
	  };
	
	  // getters and state object must be gotten lazily
	  // because they will be changed by vm update
	  Object.defineProperties(local, {
	    getters: {
	      get: noNamespace ? function () {
	        return store.getters;
	      } : function () {
	        return makeLocalGetters(store, namespace);
	      }
	    },
	    state: {
	      get: function get() {
	        return getNestedState(store.state, path);
	      }
	    }
	  });
	
	  return local;
	}
	
	function makeLocalGetters(store, namespace) {
	  var gettersProxy = {};
	
	  var splitPos = namespace.length;
	  Object.keys(store.getters).forEach(function (type) {
	    // skip if the target getter is not match this namespace
	    if (type.slice(0, splitPos) !== namespace) {
	      return;
	    }
	
	    // extract local getter type
	    var localType = type.slice(splitPos);
	
	    // Add a port to the getters proxy.
	    // Define as getter property because
	    // we do not want to evaluate the getters in this time.
	    Object.defineProperty(gettersProxy, localType, {
	      get: function get() {
	        return store.getters[type];
	      },
	      enumerable: true
	    });
	  });
	
	  return gettersProxy;
	}
	
	function registerMutation(store, type, handler, local) {
	  var entry = store._mutations[type] || (store._mutations[type] = []);
	  entry.push(function wrappedMutationHandler(payload) {
	    handler.call(store, local.state, payload);
	  });
	}
	
	function registerAction(store, type, handler, local) {
	  var entry = store._actions[type] || (store._actions[type] = []);
	  entry.push(function wrappedActionHandler(payload, cb) {
	    var res = handler.call(store, {
	      dispatch: local.dispatch,
	      commit: local.commit,
	      getters: local.getters,
	      state: local.state,
	      rootGetters: store.getters,
	      rootState: store.state
	    }, payload, cb);
	    if (!isPromise(res)) {
	      res = Promise.resolve(res);
	    }
	    if (store._devtoolHook) {
	      return res.catch(function (err) {
	        store._devtoolHook.emit('vuex:error', err);
	        throw err;
	      });
	    } else {
	      return res;
	    }
	  });
	}
	
	function registerGetter(store, type, rawGetter, local) {
	  if (store._wrappedGetters[type]) {
	    if (process.env.NODE_ENV !== 'production') {
	      console.error("[vuex] duplicate getter key: " + type);
	    }
	    return;
	  }
	  store._wrappedGetters[type] = function wrappedGetter(store) {
	    return rawGetter(local.state, // local state
	    local.getters, // local getters
	    store.state, // root state
	    store.getters // root getters
	    );
	  };
	}
	
	function enableStrictMode(store) {
	  store._vm.$watch(function () {
	    return this._data.$$state;
	  }, function () {
	    if (process.env.NODE_ENV !== 'production') {
	      assert(store._committing, "Do not mutate vuex store state outside mutation handlers.");
	    }
	  }, { deep: true, sync: true });
	}
	
	function getNestedState(state, path) {
	  return path.length ? path.reduce(function (state, key) {
	    return state[key];
	  }, state) : state;
	}
	
	function unifyObjectStyle(type, payload, options) {
	  if (isObject(type) && type.type) {
	    options = payload;
	    payload = type;
	    type = type.type;
	  }
	
	  if (process.env.NODE_ENV !== 'production') {
	    assert(typeof type === 'string', "Expects string as the type, but found " + (typeof type === 'undefined' ? 'undefined' : _typeof(type)) + ".");
	  }
	
	  return { type: type, payload: payload, options: options };
	}
	
	function install(_Vue) {
	  if (Vue && _Vue === Vue) {
	    if (process.env.NODE_ENV !== 'production') {
	      console.error('[vuex] already installed. Vue.use(Vuex) should be called only once.');
	    }
	    return;
	  }
	  Vue = _Vue;
	  applyMixin(Vue);
	}
	
	var mapState = normalizeNamespace(function (namespace, states) {
	  var res = {};
	  normalizeMap(states).forEach(function (ref) {
	    var key = ref.key;
	    var val = ref.val;
	
	    res[key] = function mappedState() {
	      var state = this.$store.state;
	      var getters = this.$store.getters;
	      if (namespace) {
	        var module = getModuleByNamespace(this.$store, 'mapState', namespace);
	        if (!module) {
	          return;
	        }
	        state = module.context.state;
	        getters = module.context.getters;
	      }
	      return typeof val === 'function' ? val.call(this, state, getters) : state[val];
	    };
	    // mark vuex getter for devtools
	    res[key].vuex = true;
	  });
	  return res;
	});
	
	var mapMutations = normalizeNamespace(function (namespace, mutations) {
	  var res = {};
	  normalizeMap(mutations).forEach(function (ref) {
	    var key = ref.key;
	    var val = ref.val;
	
	    res[key] = function mappedMutation() {
	      var args = [],
	          len = arguments.length;
	      while (len--) {
	        args[len] = arguments[len];
	      }var commit = this.$store.commit;
	      if (namespace) {
	        var module = getModuleByNamespace(this.$store, 'mapMutations', namespace);
	        if (!module) {
	          return;
	        }
	        commit = module.context.commit;
	      }
	      return typeof val === 'function' ? val.apply(this, [commit].concat(args)) : commit.apply(this.$store, [val].concat(args));
	    };
	  });
	  return res;
	});
	
	var mapGetters = normalizeNamespace(function (namespace, getters) {
	  var res = {};
	  normalizeMap(getters).forEach(function (ref) {
	    var key = ref.key;
	    var val = ref.val;
	
	    val = namespace + val;
	    res[key] = function mappedGetter() {
	      if (namespace && !getModuleByNamespace(this.$store, 'mapGetters', namespace)) {
	        return;
	      }
	      if (process.env.NODE_ENV !== 'production' && !(val in this.$store.getters)) {
	        console.error("[vuex] unknown getter: " + val);
	        return;
	      }
	      return this.$store.getters[val];
	    };
	    // mark vuex getter for devtools
	    res[key].vuex = true;
	  });
	  return res;
	});
	
	var mapActions = normalizeNamespace(function (namespace, actions) {
	  var res = {};
	  normalizeMap(actions).forEach(function (ref) {
	    var key = ref.key;
	    var val = ref.val;
	
	    res[key] = function mappedAction() {
	      var args = [],
	          len = arguments.length;
	      while (len--) {
	        args[len] = arguments[len];
	      }var dispatch = this.$store.dispatch;
	      if (namespace) {
	        var module = getModuleByNamespace(this.$store, 'mapActions', namespace);
	        if (!module) {
	          return;
	        }
	        dispatch = module.context.dispatch;
	      }
	      return typeof val === 'function' ? val.apply(this, [dispatch].concat(args)) : dispatch.apply(this.$store, [val].concat(args));
	    };
	  });
	  return res;
	});
	
	var createNamespacedHelpers = function createNamespacedHelpers(namespace) {
	  return {
	    mapState: mapState.bind(null, namespace),
	    mapGetters: mapGetters.bind(null, namespace),
	    mapMutations: mapMutations.bind(null, namespace),
	    mapActions: mapActions.bind(null, namespace)
	  };
	};
	
	function normalizeMap(map) {
	  return Array.isArray(map) ? map.map(function (key) {
	    return { key: key, val: key };
	  }) : Object.keys(map).map(function (key) {
	    return { key: key, val: map[key] };
	  });
	}
	
	function normalizeNamespace(fn) {
	  return function (namespace, map) {
	    if (typeof namespace !== 'string') {
	      map = namespace;
	      namespace = '';
	    } else if (namespace.charAt(namespace.length - 1) !== '/') {
	      namespace += '/';
	    }
	    return fn(namespace, map);
	  };
	}
	
	function getModuleByNamespace(store, helper, namespace) {
	  var module = store._modulesNamespaceMap[namespace];
	  if (process.env.NODE_ENV !== 'production' && !module) {
	    console.error("[vuex] module namespace not found in " + helper + "(): " + namespace);
	  }
	  return module;
	}
	
	var index = {
	  Store: Store,
	  install: install,
	  version: '2.5.0',
	  mapState: mapState,
	  mapMutations: mapMutations,
	  mapGetters: mapGetters,
	  mapActions: mapActions,
	  createNamespacedHelpers: createNamespacedHelpers
	};
	
	module.exports = index;
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(4)))

/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;'use strict';
	
	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };
	
	/**
	 * @license
	 *
	 * vuex-persistedstate v1.4.1
	 *
	 * (c) 2017 Robin van der Vleuten <robin@webstronauts.co>
	 *
	 * For the full copyright and license information, please view the LICENSE
	 * file that was distributed with this source code.
	 */
	(function (global, factory) {
	  ( false ? 'undefined' : _typeof(exports)) === 'object' && typeof module !== 'undefined' ? module.exports = factory(__webpack_require__(7), __webpack_require__(9)) :  true ? !(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(7), __webpack_require__(9)], __WEBPACK_AMD_DEFINE_FACTORY__ = (factory), __WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ? (__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__)) : global.createPersistedState = factory(global.merge, global.objectPath);
	})(undefined, function (merge, objectPath) {
	  'use strict';
	
	  merge = 'default' in merge ? merge['default'] : merge;
	  objectPath = 'default' in objectPath ? objectPath['default'] : objectPath;
	
	  var defaultReducer = function defaultReducer(state, paths) {
	    return paths.length === 0 ? state : paths.reduce(function (substate, path) {
	      objectPath.set(substate, path, objectPath.get(state, path));
	      return substate;
	    }, {});
	  };
	
	  var canWriteToLocalStorage = function canWriteToLocalStorage() {
	    try {
	      window.localStorage.setItem('_canWriteToLocalStorage', 1);
	      window.localStorage.removeItem('_canWriteToLocalStorage');
	      return true;
	    } catch (e) {
	      return false;
	    }
	  };
	
	  var defaultStorage = function () {
	    if (typeof window !== 'undefined' && 'localStorage' in window && canWriteToLocalStorage()) {
	      return window.localStorage;
	    }
	
	    var InternalStorage = function InternalStorage() {};
	
	    InternalStorage.prototype.setItem = function setItem(key, item) {
	      this[key] = item;
	      return item;
	    };
	
	    InternalStorage.prototype.getItem = function getItem(key) {
	      return this[key];
	    };
	
	    InternalStorage.prototype.removeItem = function removeItem(key) {
	      delete this[key];
	    };
	
	    InternalStorage.prototype.clear = function clear() {
	      var this$1 = this;
	
	      Object.keys(this).forEach(function (key) {
	        return delete this$1[key];
	      });
	    };
	
	    return new InternalStorage();
	  }();
	
	  function createPersistedState(ref) {
	    if (ref === void 0) ref = {};
	    var key = ref.key;if (key === void 0) key = 'vuex';
	    var paths = ref.paths;if (paths === void 0) paths = [];
	    var getState = ref.getState;if (getState === void 0) getState = function getState(key, storage) {
	      var value = storage.getItem(key);
	      return value && value !== 'undefined' ? JSON.parse(value) : undefined;
	    };
	    var setState = ref.setState;if (setState === void 0) setState = function setState(key, state, storage) {
	      return storage.setItem(key, JSON.stringify(state));
	    };
	    var reducer = ref.reducer;if (reducer === void 0) reducer = defaultReducer;
	    var storage = ref.storage;if (storage === void 0) storage = defaultStorage;
	    var filter = ref.filter;if (filter === void 0) filter = function filter() {
	      return true;
	    };
	    var subscriber = ref.subscriber;if (subscriber === void 0) subscriber = function subscriber(store) {
	      return function (handler) {
	        return store.subscribe(handler);
	      };
	    };
	
	    return function (store) {
	      var savedState = getState(key, storage);
	      if ((typeof savedState === 'undefined' ? 'undefined' : _typeof(savedState)) === 'object') {
	        store.replaceState(merge({}, store.state, savedState));
	      }
	
	      subscriber(store)(function (mutation, state) {
	        if (filter(mutation)) {
	          setState(key, reducer(state, paths), storage);
	        }
	      });
	    };
	  }
	
	  return createPersistedState;
	});

/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(global, module) {'use strict';
	
	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };
	
	/**
	 * lodash (Custom Build) <https://lodash.com/>
	 * Build: `lodash modularize exports="npm" -o ./`
	 * Copyright jQuery Foundation and other contributors <https://jquery.org/>
	 * Released under MIT license <https://lodash.com/license>
	 * Based on Underscore.js 1.8.3 <http://underscorejs.org/LICENSE>
	 * Copyright Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
	 */
	
	/** Used as the size to enable large array optimizations. */
	var LARGE_ARRAY_SIZE = 200;
	
	/** Used to stand-in for `undefined` hash values. */
	var HASH_UNDEFINED = '__lodash_hash_undefined__';
	
	/** Used as references for various `Number` constants. */
	var MAX_SAFE_INTEGER = 9007199254740991;
	
	/** `Object#toString` result references. */
	var argsTag = '[object Arguments]',
	    arrayTag = '[object Array]',
	    boolTag = '[object Boolean]',
	    dateTag = '[object Date]',
	    errorTag = '[object Error]',
	    funcTag = '[object Function]',
	    genTag = '[object GeneratorFunction]',
	    mapTag = '[object Map]',
	    numberTag = '[object Number]',
	    objectTag = '[object Object]',
	    promiseTag = '[object Promise]',
	    regexpTag = '[object RegExp]',
	    setTag = '[object Set]',
	    stringTag = '[object String]',
	    symbolTag = '[object Symbol]',
	    weakMapTag = '[object WeakMap]';
	
	var arrayBufferTag = '[object ArrayBuffer]',
	    dataViewTag = '[object DataView]',
	    float32Tag = '[object Float32Array]',
	    float64Tag = '[object Float64Array]',
	    int8Tag = '[object Int8Array]',
	    int16Tag = '[object Int16Array]',
	    int32Tag = '[object Int32Array]',
	    uint8Tag = '[object Uint8Array]',
	    uint8ClampedTag = '[object Uint8ClampedArray]',
	    uint16Tag = '[object Uint16Array]',
	    uint32Tag = '[object Uint32Array]';
	
	/**
	 * Used to match `RegExp`
	 * [syntax characters](http://ecma-international.org/ecma-262/7.0/#sec-patterns).
	 */
	var reRegExpChar = /[\\^$.*+?()[\]{}|]/g;
	
	/** Used to match `RegExp` flags from their coerced string values. */
	var reFlags = /\w*$/;
	
	/** Used to detect host constructors (Safari). */
	var reIsHostCtor = /^\[object .+?Constructor\]$/;
	
	/** Used to detect unsigned integer values. */
	var reIsUint = /^(?:0|[1-9]\d*)$/;
	
	/** Used to identify `toStringTag` values of typed arrays. */
	var typedArrayTags = {};
	typedArrayTags[float32Tag] = typedArrayTags[float64Tag] = typedArrayTags[int8Tag] = typedArrayTags[int16Tag] = typedArrayTags[int32Tag] = typedArrayTags[uint8Tag] = typedArrayTags[uint8ClampedTag] = typedArrayTags[uint16Tag] = typedArrayTags[uint32Tag] = true;
	typedArrayTags[argsTag] = typedArrayTags[arrayTag] = typedArrayTags[arrayBufferTag] = typedArrayTags[boolTag] = typedArrayTags[dataViewTag] = typedArrayTags[dateTag] = typedArrayTags[errorTag] = typedArrayTags[funcTag] = typedArrayTags[mapTag] = typedArrayTags[numberTag] = typedArrayTags[objectTag] = typedArrayTags[regexpTag] = typedArrayTags[setTag] = typedArrayTags[stringTag] = typedArrayTags[weakMapTag] = false;
	
	/** Used to identify `toStringTag` values supported by `_.clone`. */
	var cloneableTags = {};
	cloneableTags[argsTag] = cloneableTags[arrayTag] = cloneableTags[arrayBufferTag] = cloneableTags[dataViewTag] = cloneableTags[boolTag] = cloneableTags[dateTag] = cloneableTags[float32Tag] = cloneableTags[float64Tag] = cloneableTags[int8Tag] = cloneableTags[int16Tag] = cloneableTags[int32Tag] = cloneableTags[mapTag] = cloneableTags[numberTag] = cloneableTags[objectTag] = cloneableTags[regexpTag] = cloneableTags[setTag] = cloneableTags[stringTag] = cloneableTags[symbolTag] = cloneableTags[uint8Tag] = cloneableTags[uint8ClampedTag] = cloneableTags[uint16Tag] = cloneableTags[uint32Tag] = true;
	cloneableTags[errorTag] = cloneableTags[funcTag] = cloneableTags[weakMapTag] = false;
	
	/** Detect free variable `global` from Node.js. */
	var freeGlobal = (typeof global === 'undefined' ? 'undefined' : _typeof(global)) == 'object' && global && global.Object === Object && global;
	
	/** Detect free variable `self`. */
	var freeSelf = (typeof self === 'undefined' ? 'undefined' : _typeof(self)) == 'object' && self && self.Object === Object && self;
	
	/** Used as a reference to the global object. */
	var root = freeGlobal || freeSelf || Function('return this')();
	
	/** Detect free variable `exports`. */
	var freeExports = ( false ? 'undefined' : _typeof(exports)) == 'object' && exports && !exports.nodeType && exports;
	
	/** Detect free variable `module`. */
	var freeModule = freeExports && ( false ? 'undefined' : _typeof(module)) == 'object' && module && !module.nodeType && module;
	
	/** Detect the popular CommonJS extension `module.exports`. */
	var moduleExports = freeModule && freeModule.exports === freeExports;
	
	/** Detect free variable `process` from Node.js. */
	var freeProcess = moduleExports && freeGlobal.process;
	
	/** Used to access faster Node.js helpers. */
	var nodeUtil = function () {
	  try {
	    return freeProcess && freeProcess.binding('util');
	  } catch (e) {}
	}();
	
	/* Node.js helper references. */
	var nodeIsTypedArray = nodeUtil && nodeUtil.isTypedArray;
	
	/**
	 * Adds the key-value `pair` to `map`.
	 *
	 * @private
	 * @param {Object} map The map to modify.
	 * @param {Array} pair The key-value pair to add.
	 * @returns {Object} Returns `map`.
	 */
	function addMapEntry(map, pair) {
	  // Don't return `map.set` because it's not chainable in IE 11.
	  map.set(pair[0], pair[1]);
	  return map;
	}
	
	/**
	 * Adds `value` to `set`.
	 *
	 * @private
	 * @param {Object} set The set to modify.
	 * @param {*} value The value to add.
	 * @returns {Object} Returns `set`.
	 */
	function addSetEntry(set, value) {
	  // Don't return `set.add` because it's not chainable in IE 11.
	  set.add(value);
	  return set;
	}
	
	/**
	 * A faster alternative to `Function#apply`, this function invokes `func`
	 * with the `this` binding of `thisArg` and the arguments of `args`.
	 *
	 * @private
	 * @param {Function} func The function to invoke.
	 * @param {*} thisArg The `this` binding of `func`.
	 * @param {Array} args The arguments to invoke `func` with.
	 * @returns {*} Returns the result of `func`.
	 */
	function apply(func, thisArg, args) {
	  switch (args.length) {
	    case 0:
	      return func.call(thisArg);
	    case 1:
	      return func.call(thisArg, args[0]);
	    case 2:
	      return func.call(thisArg, args[0], args[1]);
	    case 3:
	      return func.call(thisArg, args[0], args[1], args[2]);
	  }
	  return func.apply(thisArg, args);
	}
	
	/**
	 * A specialized version of `_.forEach` for arrays without support for
	 * iteratee shorthands.
	 *
	 * @private
	 * @param {Array} [array] The array to iterate over.
	 * @param {Function} iteratee The function invoked per iteration.
	 * @returns {Array} Returns `array`.
	 */
	function arrayEach(array, iteratee) {
	  var index = -1,
	      length = array ? array.length : 0;
	
	  while (++index < length) {
	    if (iteratee(array[index], index, array) === false) {
	      break;
	    }
	  }
	  return array;
	}
	
	/**
	 * Appends the elements of `values` to `array`.
	 *
	 * @private
	 * @param {Array} array The array to modify.
	 * @param {Array} values The values to append.
	 * @returns {Array} Returns `array`.
	 */
	function arrayPush(array, values) {
	  var index = -1,
	      length = values.length,
	      offset = array.length;
	
	  while (++index < length) {
	    array[offset + index] = values[index];
	  }
	  return array;
	}
	
	/**
	 * A specialized version of `_.reduce` for arrays without support for
	 * iteratee shorthands.
	 *
	 * @private
	 * @param {Array} [array] The array to iterate over.
	 * @param {Function} iteratee The function invoked per iteration.
	 * @param {*} [accumulator] The initial value.
	 * @param {boolean} [initAccum] Specify using the first element of `array` as
	 *  the initial value.
	 * @returns {*} Returns the accumulated value.
	 */
	function arrayReduce(array, iteratee, accumulator, initAccum) {
	  var index = -1,
	      length = array ? array.length : 0;
	
	  if (initAccum && length) {
	    accumulator = array[++index];
	  }
	  while (++index < length) {
	    accumulator = iteratee(accumulator, array[index], index, array);
	  }
	  return accumulator;
	}
	
	/**
	 * The base implementation of `_.times` without support for iteratee shorthands
	 * or max array length checks.
	 *
	 * @private
	 * @param {number} n The number of times to invoke `iteratee`.
	 * @param {Function} iteratee The function invoked per iteration.
	 * @returns {Array} Returns the array of results.
	 */
	function baseTimes(n, iteratee) {
	  var index = -1,
	      result = Array(n);
	
	  while (++index < n) {
	    result[index] = iteratee(index);
	  }
	  return result;
	}
	
	/**
	 * The base implementation of `_.unary` without support for storing metadata.
	 *
	 * @private
	 * @param {Function} func The function to cap arguments for.
	 * @returns {Function} Returns the new capped function.
	 */
	function baseUnary(func) {
	  return function (value) {
	    return func(value);
	  };
	}
	
	/**
	 * Gets the value at `key` of `object`.
	 *
	 * @private
	 * @param {Object} [object] The object to query.
	 * @param {string} key The key of the property to get.
	 * @returns {*} Returns the property value.
	 */
	function getValue(object, key) {
	  return object == null ? undefined : object[key];
	}
	
	/**
	 * Checks if `value` is a host object in IE < 9.
	 *
	 * @private
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is a host object, else `false`.
	 */
	function isHostObject(value) {
	  // Many host objects are `Object` objects that can coerce to strings
	  // despite having improperly defined `toString` methods.
	  var result = false;
	  if (value != null && typeof value.toString != 'function') {
	    try {
	      result = !!(value + '');
	    } catch (e) {}
	  }
	  return result;
	}
	
	/**
	 * Converts `map` to its key-value pairs.
	 *
	 * @private
	 * @param {Object} map The map to convert.
	 * @returns {Array} Returns the key-value pairs.
	 */
	function mapToArray(map) {
	  var index = -1,
	      result = Array(map.size);
	
	  map.forEach(function (value, key) {
	    result[++index] = [key, value];
	  });
	  return result;
	}
	
	/**
	 * Creates a unary function that invokes `func` with its argument transformed.
	 *
	 * @private
	 * @param {Function} func The function to wrap.
	 * @param {Function} transform The argument transform.
	 * @returns {Function} Returns the new function.
	 */
	function overArg(func, transform) {
	  return function (arg) {
	    return func(transform(arg));
	  };
	}
	
	/**
	 * Converts `set` to an array of its values.
	 *
	 * @private
	 * @param {Object} set The set to convert.
	 * @returns {Array} Returns the values.
	 */
	function setToArray(set) {
	  var index = -1,
	      result = Array(set.size);
	
	  set.forEach(function (value) {
	    result[++index] = value;
	  });
	  return result;
	}
	
	/** Used for built-in method references. */
	var arrayProto = Array.prototype,
	    funcProto = Function.prototype,
	    objectProto = Object.prototype;
	
	/** Used to detect overreaching core-js shims. */
	var coreJsData = root['__core-js_shared__'];
	
	/** Used to detect methods masquerading as native. */
	var maskSrcKey = function () {
	  var uid = /[^.]+$/.exec(coreJsData && coreJsData.keys && coreJsData.keys.IE_PROTO || '');
	  return uid ? 'Symbol(src)_1.' + uid : '';
	}();
	
	/** Used to resolve the decompiled source of functions. */
	var funcToString = funcProto.toString;
	
	/** Used to check objects for own properties. */
	var hasOwnProperty = objectProto.hasOwnProperty;
	
	/** Used to infer the `Object` constructor. */
	var objectCtorString = funcToString.call(Object);
	
	/**
	 * Used to resolve the
	 * [`toStringTag`](http://ecma-international.org/ecma-262/7.0/#sec-object.prototype.tostring)
	 * of values.
	 */
	var objectToString = objectProto.toString;
	
	/** Used to detect if a method is native. */
	var reIsNative = RegExp('^' + funcToString.call(hasOwnProperty).replace(reRegExpChar, '\\$&').replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g, '$1.*?') + '$');
	
	/** Built-in value references. */
	var Buffer = moduleExports ? root.Buffer : undefined,
	    _Symbol = root.Symbol,
	    Uint8Array = root.Uint8Array,
	    getPrototype = overArg(Object.getPrototypeOf, Object),
	    objectCreate = Object.create,
	    propertyIsEnumerable = objectProto.propertyIsEnumerable,
	    splice = arrayProto.splice;
	
	/* Built-in method references for those with the same name as other `lodash` methods. */
	var nativeGetSymbols = Object.getOwnPropertySymbols,
	    nativeIsBuffer = Buffer ? Buffer.isBuffer : undefined,
	    nativeKeys = overArg(Object.keys, Object),
	    nativeMax = Math.max;
	
	/* Built-in method references that are verified to be native. */
	var DataView = getNative(root, 'DataView'),
	    Map = getNative(root, 'Map'),
	    Promise = getNative(root, 'Promise'),
	    Set = getNative(root, 'Set'),
	    WeakMap = getNative(root, 'WeakMap'),
	    nativeCreate = getNative(Object, 'create');
	
	/** Used to detect maps, sets, and weakmaps. */
	var dataViewCtorString = toSource(DataView),
	    mapCtorString = toSource(Map),
	    promiseCtorString = toSource(Promise),
	    setCtorString = toSource(Set),
	    weakMapCtorString = toSource(WeakMap);
	
	/** Used to convert symbols to primitives and strings. */
	var symbolProto = _Symbol ? _Symbol.prototype : undefined,
	    symbolValueOf = symbolProto ? symbolProto.valueOf : undefined;
	
	/**
	 * Creates a hash object.
	 *
	 * @private
	 * @constructor
	 * @param {Array} [entries] The key-value pairs to cache.
	 */
	function Hash(entries) {
	  var index = -1,
	      length = entries ? entries.length : 0;
	
	  this.clear();
	  while (++index < length) {
	    var entry = entries[index];
	    this.set(entry[0], entry[1]);
	  }
	}
	
	/**
	 * Removes all key-value entries from the hash.
	 *
	 * @private
	 * @name clear
	 * @memberOf Hash
	 */
	function hashClear() {
	  this.__data__ = nativeCreate ? nativeCreate(null) : {};
	}
	
	/**
	 * Removes `key` and its value from the hash.
	 *
	 * @private
	 * @name delete
	 * @memberOf Hash
	 * @param {Object} hash The hash to modify.
	 * @param {string} key The key of the value to remove.
	 * @returns {boolean} Returns `true` if the entry was removed, else `false`.
	 */
	function hashDelete(key) {
	  return this.has(key) && delete this.__data__[key];
	}
	
	/**
	 * Gets the hash value for `key`.
	 *
	 * @private
	 * @name get
	 * @memberOf Hash
	 * @param {string} key The key of the value to get.
	 * @returns {*} Returns the entry value.
	 */
	function hashGet(key) {
	  var data = this.__data__;
	  if (nativeCreate) {
	    var result = data[key];
	    return result === HASH_UNDEFINED ? undefined : result;
	  }
	  return hasOwnProperty.call(data, key) ? data[key] : undefined;
	}
	
	/**
	 * Checks if a hash value for `key` exists.
	 *
	 * @private
	 * @name has
	 * @memberOf Hash
	 * @param {string} key The key of the entry to check.
	 * @returns {boolean} Returns `true` if an entry for `key` exists, else `false`.
	 */
	function hashHas(key) {
	  var data = this.__data__;
	  return nativeCreate ? data[key] !== undefined : hasOwnProperty.call(data, key);
	}
	
	/**
	 * Sets the hash `key` to `value`.
	 *
	 * @private
	 * @name set
	 * @memberOf Hash
	 * @param {string} key The key of the value to set.
	 * @param {*} value The value to set.
	 * @returns {Object} Returns the hash instance.
	 */
	function hashSet(key, value) {
	  var data = this.__data__;
	  data[key] = nativeCreate && value === undefined ? HASH_UNDEFINED : value;
	  return this;
	}
	
	// Add methods to `Hash`.
	Hash.prototype.clear = hashClear;
	Hash.prototype['delete'] = hashDelete;
	Hash.prototype.get = hashGet;
	Hash.prototype.has = hashHas;
	Hash.prototype.set = hashSet;
	
	/**
	 * Creates an list cache object.
	 *
	 * @private
	 * @constructor
	 * @param {Array} [entries] The key-value pairs to cache.
	 */
	function ListCache(entries) {
	  var index = -1,
	      length = entries ? entries.length : 0;
	
	  this.clear();
	  while (++index < length) {
	    var entry = entries[index];
	    this.set(entry[0], entry[1]);
	  }
	}
	
	/**
	 * Removes all key-value entries from the list cache.
	 *
	 * @private
	 * @name clear
	 * @memberOf ListCache
	 */
	function listCacheClear() {
	  this.__data__ = [];
	}
	
	/**
	 * Removes `key` and its value from the list cache.
	 *
	 * @private
	 * @name delete
	 * @memberOf ListCache
	 * @param {string} key The key of the value to remove.
	 * @returns {boolean} Returns `true` if the entry was removed, else `false`.
	 */
	function listCacheDelete(key) {
	  var data = this.__data__,
	      index = assocIndexOf(data, key);
	
	  if (index < 0) {
	    return false;
	  }
	  var lastIndex = data.length - 1;
	  if (index == lastIndex) {
	    data.pop();
	  } else {
	    splice.call(data, index, 1);
	  }
	  return true;
	}
	
	/**
	 * Gets the list cache value for `key`.
	 *
	 * @private
	 * @name get
	 * @memberOf ListCache
	 * @param {string} key The key of the value to get.
	 * @returns {*} Returns the entry value.
	 */
	function listCacheGet(key) {
	  var data = this.__data__,
	      index = assocIndexOf(data, key);
	
	  return index < 0 ? undefined : data[index][1];
	}
	
	/**
	 * Checks if a list cache value for `key` exists.
	 *
	 * @private
	 * @name has
	 * @memberOf ListCache
	 * @param {string} key The key of the entry to check.
	 * @returns {boolean} Returns `true` if an entry for `key` exists, else `false`.
	 */
	function listCacheHas(key) {
	  return assocIndexOf(this.__data__, key) > -1;
	}
	
	/**
	 * Sets the list cache `key` to `value`.
	 *
	 * @private
	 * @name set
	 * @memberOf ListCache
	 * @param {string} key The key of the value to set.
	 * @param {*} value The value to set.
	 * @returns {Object} Returns the list cache instance.
	 */
	function listCacheSet(key, value) {
	  var data = this.__data__,
	      index = assocIndexOf(data, key);
	
	  if (index < 0) {
	    data.push([key, value]);
	  } else {
	    data[index][1] = value;
	  }
	  return this;
	}
	
	// Add methods to `ListCache`.
	ListCache.prototype.clear = listCacheClear;
	ListCache.prototype['delete'] = listCacheDelete;
	ListCache.prototype.get = listCacheGet;
	ListCache.prototype.has = listCacheHas;
	ListCache.prototype.set = listCacheSet;
	
	/**
	 * Creates a map cache object to store key-value pairs.
	 *
	 * @private
	 * @constructor
	 * @param {Array} [entries] The key-value pairs to cache.
	 */
	function MapCache(entries) {
	  var index = -1,
	      length = entries ? entries.length : 0;
	
	  this.clear();
	  while (++index < length) {
	    var entry = entries[index];
	    this.set(entry[0], entry[1]);
	  }
	}
	
	/**
	 * Removes all key-value entries from the map.
	 *
	 * @private
	 * @name clear
	 * @memberOf MapCache
	 */
	function mapCacheClear() {
	  this.__data__ = {
	    'hash': new Hash(),
	    'map': new (Map || ListCache)(),
	    'string': new Hash()
	  };
	}
	
	/**
	 * Removes `key` and its value from the map.
	 *
	 * @private
	 * @name delete
	 * @memberOf MapCache
	 * @param {string} key The key of the value to remove.
	 * @returns {boolean} Returns `true` if the entry was removed, else `false`.
	 */
	function mapCacheDelete(key) {
	  return getMapData(this, key)['delete'](key);
	}
	
	/**
	 * Gets the map value for `key`.
	 *
	 * @private
	 * @name get
	 * @memberOf MapCache
	 * @param {string} key The key of the value to get.
	 * @returns {*} Returns the entry value.
	 */
	function mapCacheGet(key) {
	  return getMapData(this, key).get(key);
	}
	
	/**
	 * Checks if a map value for `key` exists.
	 *
	 * @private
	 * @name has
	 * @memberOf MapCache
	 * @param {string} key The key of the entry to check.
	 * @returns {boolean} Returns `true` if an entry for `key` exists, else `false`.
	 */
	function mapCacheHas(key) {
	  return getMapData(this, key).has(key);
	}
	
	/**
	 * Sets the map `key` to `value`.
	 *
	 * @private
	 * @name set
	 * @memberOf MapCache
	 * @param {string} key The key of the value to set.
	 * @param {*} value The value to set.
	 * @returns {Object} Returns the map cache instance.
	 */
	function mapCacheSet(key, value) {
	  getMapData(this, key).set(key, value);
	  return this;
	}
	
	// Add methods to `MapCache`.
	MapCache.prototype.clear = mapCacheClear;
	MapCache.prototype['delete'] = mapCacheDelete;
	MapCache.prototype.get = mapCacheGet;
	MapCache.prototype.has = mapCacheHas;
	MapCache.prototype.set = mapCacheSet;
	
	/**
	 * Creates a stack cache object to store key-value pairs.
	 *
	 * @private
	 * @constructor
	 * @param {Array} [entries] The key-value pairs to cache.
	 */
	function Stack(entries) {
	  this.__data__ = new ListCache(entries);
	}
	
	/**
	 * Removes all key-value entries from the stack.
	 *
	 * @private
	 * @name clear
	 * @memberOf Stack
	 */
	function stackClear() {
	  this.__data__ = new ListCache();
	}
	
	/**
	 * Removes `key` and its value from the stack.
	 *
	 * @private
	 * @name delete
	 * @memberOf Stack
	 * @param {string} key The key of the value to remove.
	 * @returns {boolean} Returns `true` if the entry was removed, else `false`.
	 */
	function stackDelete(key) {
	  return this.__data__['delete'](key);
	}
	
	/**
	 * Gets the stack value for `key`.
	 *
	 * @private
	 * @name get
	 * @memberOf Stack
	 * @param {string} key The key of the value to get.
	 * @returns {*} Returns the entry value.
	 */
	function stackGet(key) {
	  return this.__data__.get(key);
	}
	
	/**
	 * Checks if a stack value for `key` exists.
	 *
	 * @private
	 * @name has
	 * @memberOf Stack
	 * @param {string} key The key of the entry to check.
	 * @returns {boolean} Returns `true` if an entry for `key` exists, else `false`.
	 */
	function stackHas(key) {
	  return this.__data__.has(key);
	}
	
	/**
	 * Sets the stack `key` to `value`.
	 *
	 * @private
	 * @name set
	 * @memberOf Stack
	 * @param {string} key The key of the value to set.
	 * @param {*} value The value to set.
	 * @returns {Object} Returns the stack cache instance.
	 */
	function stackSet(key, value) {
	  var cache = this.__data__;
	  if (cache instanceof ListCache) {
	    var pairs = cache.__data__;
	    if (!Map || pairs.length < LARGE_ARRAY_SIZE - 1) {
	      pairs.push([key, value]);
	      return this;
	    }
	    cache = this.__data__ = new MapCache(pairs);
	  }
	  cache.set(key, value);
	  return this;
	}
	
	// Add methods to `Stack`.
	Stack.prototype.clear = stackClear;
	Stack.prototype['delete'] = stackDelete;
	Stack.prototype.get = stackGet;
	Stack.prototype.has = stackHas;
	Stack.prototype.set = stackSet;
	
	/**
	 * Creates an array of the enumerable property names of the array-like `value`.
	 *
	 * @private
	 * @param {*} value The value to query.
	 * @param {boolean} inherited Specify returning inherited property names.
	 * @returns {Array} Returns the array of property names.
	 */
	function arrayLikeKeys(value, inherited) {
	  // Safari 8.1 makes `arguments.callee` enumerable in strict mode.
	  // Safari 9 makes `arguments.length` enumerable in strict mode.
	  var result = isArray(value) || isArguments(value) ? baseTimes(value.length, String) : [];
	
	  var length = result.length,
	      skipIndexes = !!length;
	
	  for (var key in value) {
	    if ((inherited || hasOwnProperty.call(value, key)) && !(skipIndexes && (key == 'length' || isIndex(key, length)))) {
	      result.push(key);
	    }
	  }
	  return result;
	}
	
	/**
	 * This function is like `assignValue` except that it doesn't assign
	 * `undefined` values.
	 *
	 * @private
	 * @param {Object} object The object to modify.
	 * @param {string} key The key of the property to assign.
	 * @param {*} value The value to assign.
	 */
	function assignMergeValue(object, key, value) {
	  if (value !== undefined && !eq(object[key], value) || typeof key == 'number' && value === undefined && !(key in object)) {
	    object[key] = value;
	  }
	}
	
	/**
	 * Assigns `value` to `key` of `object` if the existing value is not equivalent
	 * using [`SameValueZero`](http://ecma-international.org/ecma-262/7.0/#sec-samevaluezero)
	 * for equality comparisons.
	 *
	 * @private
	 * @param {Object} object The object to modify.
	 * @param {string} key The key of the property to assign.
	 * @param {*} value The value to assign.
	 */
	function assignValue(object, key, value) {
	  var objValue = object[key];
	  if (!(hasOwnProperty.call(object, key) && eq(objValue, value)) || value === undefined && !(key in object)) {
	    object[key] = value;
	  }
	}
	
	/**
	 * Gets the index at which the `key` is found in `array` of key-value pairs.
	 *
	 * @private
	 * @param {Array} array The array to inspect.
	 * @param {*} key The key to search for.
	 * @returns {number} Returns the index of the matched value, else `-1`.
	 */
	function assocIndexOf(array, key) {
	  var length = array.length;
	  while (length--) {
	    if (eq(array[length][0], key)) {
	      return length;
	    }
	  }
	  return -1;
	}
	
	/**
	 * The base implementation of `_.assign` without support for multiple sources
	 * or `customizer` functions.
	 *
	 * @private
	 * @param {Object} object The destination object.
	 * @param {Object} source The source object.
	 * @returns {Object} Returns `object`.
	 */
	function baseAssign(object, source) {
	  return object && copyObject(source, keys(source), object);
	}
	
	/**
	 * The base implementation of `_.clone` and `_.cloneDeep` which tracks
	 * traversed objects.
	 *
	 * @private
	 * @param {*} value The value to clone.
	 * @param {boolean} [isDeep] Specify a deep clone.
	 * @param {boolean} [isFull] Specify a clone including symbols.
	 * @param {Function} [customizer] The function to customize cloning.
	 * @param {string} [key] The key of `value`.
	 * @param {Object} [object] The parent object of `value`.
	 * @param {Object} [stack] Tracks traversed objects and their clone counterparts.
	 * @returns {*} Returns the cloned value.
	 */
	function baseClone(value, isDeep, isFull, customizer, key, object, stack) {
	  var result;
	  if (customizer) {
	    result = object ? customizer(value, key, object, stack) : customizer(value);
	  }
	  if (result !== undefined) {
	    return result;
	  }
	  if (!isObject(value)) {
	    return value;
	  }
	  var isArr = isArray(value);
	  if (isArr) {
	    result = initCloneArray(value);
	    if (!isDeep) {
	      return copyArray(value, result);
	    }
	  } else {
	    var tag = getTag(value),
	        isFunc = tag == funcTag || tag == genTag;
	
	    if (isBuffer(value)) {
	      return cloneBuffer(value, isDeep);
	    }
	    if (tag == objectTag || tag == argsTag || isFunc && !object) {
	      if (isHostObject(value)) {
	        return object ? value : {};
	      }
	      result = initCloneObject(isFunc ? {} : value);
	      if (!isDeep) {
	        return copySymbols(value, baseAssign(result, value));
	      }
	    } else {
	      if (!cloneableTags[tag]) {
	        return object ? value : {};
	      }
	      result = initCloneByTag(value, tag, baseClone, isDeep);
	    }
	  }
	  // Check for circular references and return its corresponding clone.
	  stack || (stack = new Stack());
	  var stacked = stack.get(value);
	  if (stacked) {
	    return stacked;
	  }
	  stack.set(value, result);
	
	  if (!isArr) {
	    var props = isFull ? getAllKeys(value) : keys(value);
	  }
	  arrayEach(props || value, function (subValue, key) {
	    if (props) {
	      key = subValue;
	      subValue = value[key];
	    }
	    // Recursively populate clone (susceptible to call stack limits).
	    assignValue(result, key, baseClone(subValue, isDeep, isFull, customizer, key, value, stack));
	  });
	  return result;
	}
	
	/**
	 * The base implementation of `_.create` without support for assigning
	 * properties to the created object.
	 *
	 * @private
	 * @param {Object} prototype The object to inherit from.
	 * @returns {Object} Returns the new object.
	 */
	function baseCreate(proto) {
	  return isObject(proto) ? objectCreate(proto) : {};
	}
	
	/**
	 * The base implementation of `getAllKeys` and `getAllKeysIn` which uses
	 * `keysFunc` and `symbolsFunc` to get the enumerable property names and
	 * symbols of `object`.
	 *
	 * @private
	 * @param {Object} object The object to query.
	 * @param {Function} keysFunc The function to get the keys of `object`.
	 * @param {Function} symbolsFunc The function to get the symbols of `object`.
	 * @returns {Array} Returns the array of property names and symbols.
	 */
	function baseGetAllKeys(object, keysFunc, symbolsFunc) {
	  var result = keysFunc(object);
	  return isArray(object) ? result : arrayPush(result, symbolsFunc(object));
	}
	
	/**
	 * The base implementation of `getTag`.
	 *
	 * @private
	 * @param {*} value The value to query.
	 * @returns {string} Returns the `toStringTag`.
	 */
	function baseGetTag(value) {
	  return objectToString.call(value);
	}
	
	/**
	 * The base implementation of `_.isNative` without bad shim checks.
	 *
	 * @private
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is a native function,
	 *  else `false`.
	 */
	function baseIsNative(value) {
	  if (!isObject(value) || isMasked(value)) {
	    return false;
	  }
	  var pattern = isFunction(value) || isHostObject(value) ? reIsNative : reIsHostCtor;
	  return pattern.test(toSource(value));
	}
	
	/**
	 * The base implementation of `_.isTypedArray` without Node.js optimizations.
	 *
	 * @private
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is a typed array, else `false`.
	 */
	function baseIsTypedArray(value) {
	  return isObjectLike(value) && isLength(value.length) && !!typedArrayTags[objectToString.call(value)];
	}
	
	/**
	 * The base implementation of `_.keys` which doesn't treat sparse arrays as dense.
	 *
	 * @private
	 * @param {Object} object The object to query.
	 * @returns {Array} Returns the array of property names.
	 */
	function baseKeys(object) {
	  if (!isPrototype(object)) {
	    return nativeKeys(object);
	  }
	  var result = [];
	  for (var key in Object(object)) {
	    if (hasOwnProperty.call(object, key) && key != 'constructor') {
	      result.push(key);
	    }
	  }
	  return result;
	}
	
	/**
	 * The base implementation of `_.keysIn` which doesn't treat sparse arrays as dense.
	 *
	 * @private
	 * @param {Object} object The object to query.
	 * @returns {Array} Returns the array of property names.
	 */
	function baseKeysIn(object) {
	  if (!isObject(object)) {
	    return nativeKeysIn(object);
	  }
	  var isProto = isPrototype(object),
	      result = [];
	
	  for (var key in object) {
	    if (!(key == 'constructor' && (isProto || !hasOwnProperty.call(object, key)))) {
	      result.push(key);
	    }
	  }
	  return result;
	}
	
	/**
	 * The base implementation of `_.merge` without support for multiple sources.
	 *
	 * @private
	 * @param {Object} object The destination object.
	 * @param {Object} source The source object.
	 * @param {number} srcIndex The index of `source`.
	 * @param {Function} [customizer] The function to customize merged values.
	 * @param {Object} [stack] Tracks traversed source values and their merged
	 *  counterparts.
	 */
	function baseMerge(object, source, srcIndex, customizer, stack) {
	  if (object === source) {
	    return;
	  }
	  if (!(isArray(source) || isTypedArray(source))) {
	    var props = baseKeysIn(source);
	  }
	  arrayEach(props || source, function (srcValue, key) {
	    if (props) {
	      key = srcValue;
	      srcValue = source[key];
	    }
	    if (isObject(srcValue)) {
	      stack || (stack = new Stack());
	      baseMergeDeep(object, source, key, srcIndex, baseMerge, customizer, stack);
	    } else {
	      var newValue = customizer ? customizer(object[key], srcValue, key + '', object, source, stack) : undefined;
	
	      if (newValue === undefined) {
	        newValue = srcValue;
	      }
	      assignMergeValue(object, key, newValue);
	    }
	  });
	}
	
	/**
	 * A specialized version of `baseMerge` for arrays and objects which performs
	 * deep merges and tracks traversed objects enabling objects with circular
	 * references to be merged.
	 *
	 * @private
	 * @param {Object} object The destination object.
	 * @param {Object} source The source object.
	 * @param {string} key The key of the value to merge.
	 * @param {number} srcIndex The index of `source`.
	 * @param {Function} mergeFunc The function to merge values.
	 * @param {Function} [customizer] The function to customize assigned values.
	 * @param {Object} [stack] Tracks traversed source values and their merged
	 *  counterparts.
	 */
	function baseMergeDeep(object, source, key, srcIndex, mergeFunc, customizer, stack) {
	  var objValue = object[key],
	      srcValue = source[key],
	      stacked = stack.get(srcValue);
	
	  if (stacked) {
	    assignMergeValue(object, key, stacked);
	    return;
	  }
	  var newValue = customizer ? customizer(objValue, srcValue, key + '', object, source, stack) : undefined;
	
	  var isCommon = newValue === undefined;
	
	  if (isCommon) {
	    newValue = srcValue;
	    if (isArray(srcValue) || isTypedArray(srcValue)) {
	      if (isArray(objValue)) {
	        newValue = objValue;
	      } else if (isArrayLikeObject(objValue)) {
	        newValue = copyArray(objValue);
	      } else {
	        isCommon = false;
	        newValue = baseClone(srcValue, true);
	      }
	    } else if (isPlainObject(srcValue) || isArguments(srcValue)) {
	      if (isArguments(objValue)) {
	        newValue = toPlainObject(objValue);
	      } else if (!isObject(objValue) || srcIndex && isFunction(objValue)) {
	        isCommon = false;
	        newValue = baseClone(srcValue, true);
	      } else {
	        newValue = objValue;
	      }
	    } else {
	      isCommon = false;
	    }
	  }
	  if (isCommon) {
	    // Recursively merge objects and arrays (susceptible to call stack limits).
	    stack.set(srcValue, newValue);
	    mergeFunc(newValue, srcValue, srcIndex, customizer, stack);
	    stack['delete'](srcValue);
	  }
	  assignMergeValue(object, key, newValue);
	}
	
	/**
	 * The base implementation of `_.rest` which doesn't validate or coerce arguments.
	 *
	 * @private
	 * @param {Function} func The function to apply a rest parameter to.
	 * @param {number} [start=func.length-1] The start position of the rest parameter.
	 * @returns {Function} Returns the new function.
	 */
	function baseRest(func, start) {
	  start = nativeMax(start === undefined ? func.length - 1 : start, 0);
	  return function () {
	    var args = arguments,
	        index = -1,
	        length = nativeMax(args.length - start, 0),
	        array = Array(length);
	
	    while (++index < length) {
	      array[index] = args[start + index];
	    }
	    index = -1;
	    var otherArgs = Array(start + 1);
	    while (++index < start) {
	      otherArgs[index] = args[index];
	    }
	    otherArgs[start] = array;
	    return apply(func, this, otherArgs);
	  };
	}
	
	/**
	 * Creates a clone of  `buffer`.
	 *
	 * @private
	 * @param {Buffer} buffer The buffer to clone.
	 * @param {boolean} [isDeep] Specify a deep clone.
	 * @returns {Buffer} Returns the cloned buffer.
	 */
	function cloneBuffer(buffer, isDeep) {
	  if (isDeep) {
	    return buffer.slice();
	  }
	  var result = new buffer.constructor(buffer.length);
	  buffer.copy(result);
	  return result;
	}
	
	/**
	 * Creates a clone of `arrayBuffer`.
	 *
	 * @private
	 * @param {ArrayBuffer} arrayBuffer The array buffer to clone.
	 * @returns {ArrayBuffer} Returns the cloned array buffer.
	 */
	function cloneArrayBuffer(arrayBuffer) {
	  var result = new arrayBuffer.constructor(arrayBuffer.byteLength);
	  new Uint8Array(result).set(new Uint8Array(arrayBuffer));
	  return result;
	}
	
	/**
	 * Creates a clone of `dataView`.
	 *
	 * @private
	 * @param {Object} dataView The data view to clone.
	 * @param {boolean} [isDeep] Specify a deep clone.
	 * @returns {Object} Returns the cloned data view.
	 */
	function cloneDataView(dataView, isDeep) {
	  var buffer = isDeep ? cloneArrayBuffer(dataView.buffer) : dataView.buffer;
	  return new dataView.constructor(buffer, dataView.byteOffset, dataView.byteLength);
	}
	
	/**
	 * Creates a clone of `map`.
	 *
	 * @private
	 * @param {Object} map The map to clone.
	 * @param {Function} cloneFunc The function to clone values.
	 * @param {boolean} [isDeep] Specify a deep clone.
	 * @returns {Object} Returns the cloned map.
	 */
	function cloneMap(map, isDeep, cloneFunc) {
	  var array = isDeep ? cloneFunc(mapToArray(map), true) : mapToArray(map);
	  return arrayReduce(array, addMapEntry, new map.constructor());
	}
	
	/**
	 * Creates a clone of `regexp`.
	 *
	 * @private
	 * @param {Object} regexp The regexp to clone.
	 * @returns {Object} Returns the cloned regexp.
	 */
	function cloneRegExp(regexp) {
	  var result = new regexp.constructor(regexp.source, reFlags.exec(regexp));
	  result.lastIndex = regexp.lastIndex;
	  return result;
	}
	
	/**
	 * Creates a clone of `set`.
	 *
	 * @private
	 * @param {Object} set The set to clone.
	 * @param {Function} cloneFunc The function to clone values.
	 * @param {boolean} [isDeep] Specify a deep clone.
	 * @returns {Object} Returns the cloned set.
	 */
	function cloneSet(set, isDeep, cloneFunc) {
	  var array = isDeep ? cloneFunc(setToArray(set), true) : setToArray(set);
	  return arrayReduce(array, addSetEntry, new set.constructor());
	}
	
	/**
	 * Creates a clone of the `symbol` object.
	 *
	 * @private
	 * @param {Object} symbol The symbol object to clone.
	 * @returns {Object} Returns the cloned symbol object.
	 */
	function cloneSymbol(symbol) {
	  return symbolValueOf ? Object(symbolValueOf.call(symbol)) : {};
	}
	
	/**
	 * Creates a clone of `typedArray`.
	 *
	 * @private
	 * @param {Object} typedArray The typed array to clone.
	 * @param {boolean} [isDeep] Specify a deep clone.
	 * @returns {Object} Returns the cloned typed array.
	 */
	function cloneTypedArray(typedArray, isDeep) {
	  var buffer = isDeep ? cloneArrayBuffer(typedArray.buffer) : typedArray.buffer;
	  return new typedArray.constructor(buffer, typedArray.byteOffset, typedArray.length);
	}
	
	/**
	 * Copies the values of `source` to `array`.
	 *
	 * @private
	 * @param {Array} source The array to copy values from.
	 * @param {Array} [array=[]] The array to copy values to.
	 * @returns {Array} Returns `array`.
	 */
	function copyArray(source, array) {
	  var index = -1,
	      length = source.length;
	
	  array || (array = Array(length));
	  while (++index < length) {
	    array[index] = source[index];
	  }
	  return array;
	}
	
	/**
	 * Copies properties of `source` to `object`.
	 *
	 * @private
	 * @param {Object} source The object to copy properties from.
	 * @param {Array} props The property identifiers to copy.
	 * @param {Object} [object={}] The object to copy properties to.
	 * @param {Function} [customizer] The function to customize copied values.
	 * @returns {Object} Returns `object`.
	 */
	function copyObject(source, props, object, customizer) {
	  object || (object = {});
	
	  var index = -1,
	      length = props.length;
	
	  while (++index < length) {
	    var key = props[index];
	
	    var newValue = customizer ? customizer(object[key], source[key], key, object, source) : undefined;
	
	    assignValue(object, key, newValue === undefined ? source[key] : newValue);
	  }
	  return object;
	}
	
	/**
	 * Copies own symbol properties of `source` to `object`.
	 *
	 * @private
	 * @param {Object} source The object to copy symbols from.
	 * @param {Object} [object={}] The object to copy symbols to.
	 * @returns {Object} Returns `object`.
	 */
	function copySymbols(source, object) {
	  return copyObject(source, getSymbols(source), object);
	}
	
	/**
	 * Creates a function like `_.assign`.
	 *
	 * @private
	 * @param {Function} assigner The function to assign values.
	 * @returns {Function} Returns the new assigner function.
	 */
	function createAssigner(assigner) {
	  return baseRest(function (object, sources) {
	    var index = -1,
	        length = sources.length,
	        customizer = length > 1 ? sources[length - 1] : undefined,
	        guard = length > 2 ? sources[2] : undefined;
	
	    customizer = assigner.length > 3 && typeof customizer == 'function' ? (length--, customizer) : undefined;
	
	    if (guard && isIterateeCall(sources[0], sources[1], guard)) {
	      customizer = length < 3 ? undefined : customizer;
	      length = 1;
	    }
	    object = Object(object);
	    while (++index < length) {
	      var source = sources[index];
	      if (source) {
	        assigner(object, source, index, customizer);
	      }
	    }
	    return object;
	  });
	}
	
	/**
	 * Creates an array of own enumerable property names and symbols of `object`.
	 *
	 * @private
	 * @param {Object} object The object to query.
	 * @returns {Array} Returns the array of property names and symbols.
	 */
	function getAllKeys(object) {
	  return baseGetAllKeys(object, keys, getSymbols);
	}
	
	/**
	 * Gets the data for `map`.
	 *
	 * @private
	 * @param {Object} map The map to query.
	 * @param {string} key The reference key.
	 * @returns {*} Returns the map data.
	 */
	function getMapData(map, key) {
	  var data = map.__data__;
	  return isKeyable(key) ? data[typeof key == 'string' ? 'string' : 'hash'] : data.map;
	}
	
	/**
	 * Gets the native function at `key` of `object`.
	 *
	 * @private
	 * @param {Object} object The object to query.
	 * @param {string} key The key of the method to get.
	 * @returns {*} Returns the function if it's native, else `undefined`.
	 */
	function getNative(object, key) {
	  var value = getValue(object, key);
	  return baseIsNative(value) ? value : undefined;
	}
	
	/**
	 * Creates an array of the own enumerable symbol properties of `object`.
	 *
	 * @private
	 * @param {Object} object The object to query.
	 * @returns {Array} Returns the array of symbols.
	 */
	var getSymbols = nativeGetSymbols ? overArg(nativeGetSymbols, Object) : stubArray;
	
	/**
	 * Gets the `toStringTag` of `value`.
	 *
	 * @private
	 * @param {*} value The value to query.
	 * @returns {string} Returns the `toStringTag`.
	 */
	var getTag = baseGetTag;
	
	// Fallback for data views, maps, sets, and weak maps in IE 11,
	// for data views in Edge < 14, and promises in Node.js.
	if (DataView && getTag(new DataView(new ArrayBuffer(1))) != dataViewTag || Map && getTag(new Map()) != mapTag || Promise && getTag(Promise.resolve()) != promiseTag || Set && getTag(new Set()) != setTag || WeakMap && getTag(new WeakMap()) != weakMapTag) {
	  getTag = function getTag(value) {
	    var result = objectToString.call(value),
	        Ctor = result == objectTag ? value.constructor : undefined,
	        ctorString = Ctor ? toSource(Ctor) : undefined;
	
	    if (ctorString) {
	      switch (ctorString) {
	        case dataViewCtorString:
	          return dataViewTag;
	        case mapCtorString:
	          return mapTag;
	        case promiseCtorString:
	          return promiseTag;
	        case setCtorString:
	          return setTag;
	        case weakMapCtorString:
	          return weakMapTag;
	      }
	    }
	    return result;
	  };
	}
	
	/**
	 * Initializes an array clone.
	 *
	 * @private
	 * @param {Array} array The array to clone.
	 * @returns {Array} Returns the initialized clone.
	 */
	function initCloneArray(array) {
	  var length = array.length,
	      result = array.constructor(length);
	
	  // Add properties assigned by `RegExp#exec`.
	  if (length && typeof array[0] == 'string' && hasOwnProperty.call(array, 'index')) {
	    result.index = array.index;
	    result.input = array.input;
	  }
	  return result;
	}
	
	/**
	 * Initializes an object clone.
	 *
	 * @private
	 * @param {Object} object The object to clone.
	 * @returns {Object} Returns the initialized clone.
	 */
	function initCloneObject(object) {
	  return typeof object.constructor == 'function' && !isPrototype(object) ? baseCreate(getPrototype(object)) : {};
	}
	
	/**
	 * Initializes an object clone based on its `toStringTag`.
	 *
	 * **Note:** This function only supports cloning values with tags of
	 * `Boolean`, `Date`, `Error`, `Number`, `RegExp`, or `String`.
	 *
	 * @private
	 * @param {Object} object The object to clone.
	 * @param {string} tag The `toStringTag` of the object to clone.
	 * @param {Function} cloneFunc The function to clone values.
	 * @param {boolean} [isDeep] Specify a deep clone.
	 * @returns {Object} Returns the initialized clone.
	 */
	function initCloneByTag(object, tag, cloneFunc, isDeep) {
	  var Ctor = object.constructor;
	  switch (tag) {
	    case arrayBufferTag:
	      return cloneArrayBuffer(object);
	
	    case boolTag:
	    case dateTag:
	      return new Ctor(+object);
	
	    case dataViewTag:
	      return cloneDataView(object, isDeep);
	
	    case float32Tag:case float64Tag:
	    case int8Tag:case int16Tag:case int32Tag:
	    case uint8Tag:case uint8ClampedTag:case uint16Tag:case uint32Tag:
	      return cloneTypedArray(object, isDeep);
	
	    case mapTag:
	      return cloneMap(object, isDeep, cloneFunc);
	
	    case numberTag:
	    case stringTag:
	      return new Ctor(object);
	
	    case regexpTag:
	      return cloneRegExp(object);
	
	    case setTag:
	      return cloneSet(object, isDeep, cloneFunc);
	
	    case symbolTag:
	      return cloneSymbol(object);
	  }
	}
	
	/**
	 * Checks if `value` is a valid array-like index.
	 *
	 * @private
	 * @param {*} value The value to check.
	 * @param {number} [length=MAX_SAFE_INTEGER] The upper bounds of a valid index.
	 * @returns {boolean} Returns `true` if `value` is a valid index, else `false`.
	 */
	function isIndex(value, length) {
	  length = length == null ? MAX_SAFE_INTEGER : length;
	  return !!length && (typeof value == 'number' || reIsUint.test(value)) && value > -1 && value % 1 == 0 && value < length;
	}
	
	/**
	 * Checks if the given arguments are from an iteratee call.
	 *
	 * @private
	 * @param {*} value The potential iteratee value argument.
	 * @param {*} index The potential iteratee index or key argument.
	 * @param {*} object The potential iteratee object argument.
	 * @returns {boolean} Returns `true` if the arguments are from an iteratee call,
	 *  else `false`.
	 */
	function isIterateeCall(value, index, object) {
	  if (!isObject(object)) {
	    return false;
	  }
	  var type = typeof index === 'undefined' ? 'undefined' : _typeof(index);
	  if (type == 'number' ? isArrayLike(object) && isIndex(index, object.length) : type == 'string' && index in object) {
	    return eq(object[index], value);
	  }
	  return false;
	}
	
	/**
	 * Checks if `value` is suitable for use as unique object key.
	 *
	 * @private
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is suitable, else `false`.
	 */
	function isKeyable(value) {
	  var type = typeof value === 'undefined' ? 'undefined' : _typeof(value);
	  return type == 'string' || type == 'number' || type == 'symbol' || type == 'boolean' ? value !== '__proto__' : value === null;
	}
	
	/**
	 * Checks if `func` has its source masked.
	 *
	 * @private
	 * @param {Function} func The function to check.
	 * @returns {boolean} Returns `true` if `func` is masked, else `false`.
	 */
	function isMasked(func) {
	  return !!maskSrcKey && maskSrcKey in func;
	}
	
	/**
	 * Checks if `value` is likely a prototype object.
	 *
	 * @private
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is a prototype, else `false`.
	 */
	function isPrototype(value) {
	  var Ctor = value && value.constructor,
	      proto = typeof Ctor == 'function' && Ctor.prototype || objectProto;
	
	  return value === proto;
	}
	
	/**
	 * This function is like
	 * [`Object.keys`](http://ecma-international.org/ecma-262/7.0/#sec-object.keys)
	 * except that it includes inherited enumerable properties.
	 *
	 * @private
	 * @param {Object} object The object to query.
	 * @returns {Array} Returns the array of property names.
	 */
	function nativeKeysIn(object) {
	  var result = [];
	  if (object != null) {
	    for (var key in Object(object)) {
	      result.push(key);
	    }
	  }
	  return result;
	}
	
	/**
	 * Converts `func` to its source code.
	 *
	 * @private
	 * @param {Function} func The function to process.
	 * @returns {string} Returns the source code.
	 */
	function toSource(func) {
	  if (func != null) {
	    try {
	      return funcToString.call(func);
	    } catch (e) {}
	    try {
	      return func + '';
	    } catch (e) {}
	  }
	  return '';
	}
	
	/**
	 * Performs a
	 * [`SameValueZero`](http://ecma-international.org/ecma-262/7.0/#sec-samevaluezero)
	 * comparison between two values to determine if they are equivalent.
	 *
	 * @static
	 * @memberOf _
	 * @since 4.0.0
	 * @category Lang
	 * @param {*} value The value to compare.
	 * @param {*} other The other value to compare.
	 * @returns {boolean} Returns `true` if the values are equivalent, else `false`.
	 * @example
	 *
	 * var object = { 'a': 1 };
	 * var other = { 'a': 1 };
	 *
	 * _.eq(object, object);
	 * // => true
	 *
	 * _.eq(object, other);
	 * // => false
	 *
	 * _.eq('a', 'a');
	 * // => true
	 *
	 * _.eq('a', Object('a'));
	 * // => false
	 *
	 * _.eq(NaN, NaN);
	 * // => true
	 */
	function eq(value, other) {
	  return value === other || value !== value && other !== other;
	}
	
	/**
	 * Checks if `value` is likely an `arguments` object.
	 *
	 * @static
	 * @memberOf _
	 * @since 0.1.0
	 * @category Lang
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is an `arguments` object,
	 *  else `false`.
	 * @example
	 *
	 * _.isArguments(function() { return arguments; }());
	 * // => true
	 *
	 * _.isArguments([1, 2, 3]);
	 * // => false
	 */
	function isArguments(value) {
	  // Safari 8.1 makes `arguments.callee` enumerable in strict mode.
	  return isArrayLikeObject(value) && hasOwnProperty.call(value, 'callee') && (!propertyIsEnumerable.call(value, 'callee') || objectToString.call(value) == argsTag);
	}
	
	/**
	 * Checks if `value` is classified as an `Array` object.
	 *
	 * @static
	 * @memberOf _
	 * @since 0.1.0
	 * @category Lang
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is an array, else `false`.
	 * @example
	 *
	 * _.isArray([1, 2, 3]);
	 * // => true
	 *
	 * _.isArray(document.body.children);
	 * // => false
	 *
	 * _.isArray('abc');
	 * // => false
	 *
	 * _.isArray(_.noop);
	 * // => false
	 */
	var isArray = Array.isArray;
	
	/**
	 * Checks if `value` is array-like. A value is considered array-like if it's
	 * not a function and has a `value.length` that's an integer greater than or
	 * equal to `0` and less than or equal to `Number.MAX_SAFE_INTEGER`.
	 *
	 * @static
	 * @memberOf _
	 * @since 4.0.0
	 * @category Lang
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is array-like, else `false`.
	 * @example
	 *
	 * _.isArrayLike([1, 2, 3]);
	 * // => true
	 *
	 * _.isArrayLike(document.body.children);
	 * // => true
	 *
	 * _.isArrayLike('abc');
	 * // => true
	 *
	 * _.isArrayLike(_.noop);
	 * // => false
	 */
	function isArrayLike(value) {
	  return value != null && isLength(value.length) && !isFunction(value);
	}
	
	/**
	 * This method is like `_.isArrayLike` except that it also checks if `value`
	 * is an object.
	 *
	 * @static
	 * @memberOf _
	 * @since 4.0.0
	 * @category Lang
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is an array-like object,
	 *  else `false`.
	 * @example
	 *
	 * _.isArrayLikeObject([1, 2, 3]);
	 * // => true
	 *
	 * _.isArrayLikeObject(document.body.children);
	 * // => true
	 *
	 * _.isArrayLikeObject('abc');
	 * // => false
	 *
	 * _.isArrayLikeObject(_.noop);
	 * // => false
	 */
	function isArrayLikeObject(value) {
	  return isObjectLike(value) && isArrayLike(value);
	}
	
	/**
	 * Checks if `value` is a buffer.
	 *
	 * @static
	 * @memberOf _
	 * @since 4.3.0
	 * @category Lang
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is a buffer, else `false`.
	 * @example
	 *
	 * _.isBuffer(new Buffer(2));
	 * // => true
	 *
	 * _.isBuffer(new Uint8Array(2));
	 * // => false
	 */
	var isBuffer = nativeIsBuffer || stubFalse;
	
	/**
	 * Checks if `value` is classified as a `Function` object.
	 *
	 * @static
	 * @memberOf _
	 * @since 0.1.0
	 * @category Lang
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is a function, else `false`.
	 * @example
	 *
	 * _.isFunction(_);
	 * // => true
	 *
	 * _.isFunction(/abc/);
	 * // => false
	 */
	function isFunction(value) {
	  // The use of `Object#toString` avoids issues with the `typeof` operator
	  // in Safari 8-9 which returns 'object' for typed array and other constructors.
	  var tag = isObject(value) ? objectToString.call(value) : '';
	  return tag == funcTag || tag == genTag;
	}
	
	/**
	 * Checks if `value` is a valid array-like length.
	 *
	 * **Note:** This method is loosely based on
	 * [`ToLength`](http://ecma-international.org/ecma-262/7.0/#sec-tolength).
	 *
	 * @static
	 * @memberOf _
	 * @since 4.0.0
	 * @category Lang
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is a valid length, else `false`.
	 * @example
	 *
	 * _.isLength(3);
	 * // => true
	 *
	 * _.isLength(Number.MIN_VALUE);
	 * // => false
	 *
	 * _.isLength(Infinity);
	 * // => false
	 *
	 * _.isLength('3');
	 * // => false
	 */
	function isLength(value) {
	  return typeof value == 'number' && value > -1 && value % 1 == 0 && value <= MAX_SAFE_INTEGER;
	}
	
	/**
	 * Checks if `value` is the
	 * [language type](http://www.ecma-international.org/ecma-262/7.0/#sec-ecmascript-language-types)
	 * of `Object`. (e.g. arrays, functions, objects, regexes, `new Number(0)`, and `new String('')`)
	 *
	 * @static
	 * @memberOf _
	 * @since 0.1.0
	 * @category Lang
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is an object, else `false`.
	 * @example
	 *
	 * _.isObject({});
	 * // => true
	 *
	 * _.isObject([1, 2, 3]);
	 * // => true
	 *
	 * _.isObject(_.noop);
	 * // => true
	 *
	 * _.isObject(null);
	 * // => false
	 */
	function isObject(value) {
	  var type = typeof value === 'undefined' ? 'undefined' : _typeof(value);
	  return !!value && (type == 'object' || type == 'function');
	}
	
	/**
	 * Checks if `value` is object-like. A value is object-like if it's not `null`
	 * and has a `typeof` result of "object".
	 *
	 * @static
	 * @memberOf _
	 * @since 4.0.0
	 * @category Lang
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is object-like, else `false`.
	 * @example
	 *
	 * _.isObjectLike({});
	 * // => true
	 *
	 * _.isObjectLike([1, 2, 3]);
	 * // => true
	 *
	 * _.isObjectLike(_.noop);
	 * // => false
	 *
	 * _.isObjectLike(null);
	 * // => false
	 */
	function isObjectLike(value) {
	  return !!value && (typeof value === 'undefined' ? 'undefined' : _typeof(value)) == 'object';
	}
	
	/**
	 * Checks if `value` is a plain object, that is, an object created by the
	 * `Object` constructor or one with a `[[Prototype]]` of `null`.
	 *
	 * @static
	 * @memberOf _
	 * @since 0.8.0
	 * @category Lang
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is a plain object, else `false`.
	 * @example
	 *
	 * function Foo() {
	 *   this.a = 1;
	 * }
	 *
	 * _.isPlainObject(new Foo);
	 * // => false
	 *
	 * _.isPlainObject([1, 2, 3]);
	 * // => false
	 *
	 * _.isPlainObject({ 'x': 0, 'y': 0 });
	 * // => true
	 *
	 * _.isPlainObject(Object.create(null));
	 * // => true
	 */
	function isPlainObject(value) {
	  if (!isObjectLike(value) || objectToString.call(value) != objectTag || isHostObject(value)) {
	    return false;
	  }
	  var proto = getPrototype(value);
	  if (proto === null) {
	    return true;
	  }
	  var Ctor = hasOwnProperty.call(proto, 'constructor') && proto.constructor;
	  return typeof Ctor == 'function' && Ctor instanceof Ctor && funcToString.call(Ctor) == objectCtorString;
	}
	
	/**
	 * Checks if `value` is classified as a typed array.
	 *
	 * @static
	 * @memberOf _
	 * @since 3.0.0
	 * @category Lang
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is a typed array, else `false`.
	 * @example
	 *
	 * _.isTypedArray(new Uint8Array);
	 * // => true
	 *
	 * _.isTypedArray([]);
	 * // => false
	 */
	var isTypedArray = nodeIsTypedArray ? baseUnary(nodeIsTypedArray) : baseIsTypedArray;
	
	/**
	 * Converts `value` to a plain object flattening inherited enumerable string
	 * keyed properties of `value` to own properties of the plain object.
	 *
	 * @static
	 * @memberOf _
	 * @since 3.0.0
	 * @category Lang
	 * @param {*} value The value to convert.
	 * @returns {Object} Returns the converted plain object.
	 * @example
	 *
	 * function Foo() {
	 *   this.b = 2;
	 * }
	 *
	 * Foo.prototype.c = 3;
	 *
	 * _.assign({ 'a': 1 }, new Foo);
	 * // => { 'a': 1, 'b': 2 }
	 *
	 * _.assign({ 'a': 1 }, _.toPlainObject(new Foo));
	 * // => { 'a': 1, 'b': 2, 'c': 3 }
	 */
	function toPlainObject(value) {
	  return copyObject(value, keysIn(value));
	}
	
	/**
	 * Creates an array of the own enumerable property names of `object`.
	 *
	 * **Note:** Non-object values are coerced to objects. See the
	 * [ES spec](http://ecma-international.org/ecma-262/7.0/#sec-object.keys)
	 * for more details.
	 *
	 * @static
	 * @since 0.1.0
	 * @memberOf _
	 * @category Object
	 * @param {Object} object The object to query.
	 * @returns {Array} Returns the array of property names.
	 * @example
	 *
	 * function Foo() {
	 *   this.a = 1;
	 *   this.b = 2;
	 * }
	 *
	 * Foo.prototype.c = 3;
	 *
	 * _.keys(new Foo);
	 * // => ['a', 'b'] (iteration order is not guaranteed)
	 *
	 * _.keys('hi');
	 * // => ['0', '1']
	 */
	function keys(object) {
	  return isArrayLike(object) ? arrayLikeKeys(object) : baseKeys(object);
	}
	
	/**
	 * Creates an array of the own and inherited enumerable property names of `object`.
	 *
	 * **Note:** Non-object values are coerced to objects.
	 *
	 * @static
	 * @memberOf _
	 * @since 3.0.0
	 * @category Object
	 * @param {Object} object The object to query.
	 * @returns {Array} Returns the array of property names.
	 * @example
	 *
	 * function Foo() {
	 *   this.a = 1;
	 *   this.b = 2;
	 * }
	 *
	 * Foo.prototype.c = 3;
	 *
	 * _.keysIn(new Foo);
	 * // => ['a', 'b', 'c'] (iteration order is not guaranteed)
	 */
	function keysIn(object) {
	  return isArrayLike(object) ? arrayLikeKeys(object, true) : baseKeysIn(object);
	}
	
	/**
	 * This method is like `_.assign` except that it recursively merges own and
	 * inherited enumerable string keyed properties of source objects into the
	 * destination object. Source properties that resolve to `undefined` are
	 * skipped if a destination value exists. Array and plain object properties
	 * are merged recursively. Other objects and value types are overridden by
	 * assignment. Source objects are applied from left to right. Subsequent
	 * sources overwrite property assignments of previous sources.
	 *
	 * **Note:** This method mutates `object`.
	 *
	 * @static
	 * @memberOf _
	 * @since 0.5.0
	 * @category Object
	 * @param {Object} object The destination object.
	 * @param {...Object} [sources] The source objects.
	 * @returns {Object} Returns `object`.
	 * @example
	 *
	 * var object = {
	 *   'a': [{ 'b': 2 }, { 'd': 4 }]
	 * };
	 *
	 * var other = {
	 *   'a': [{ 'c': 3 }, { 'e': 5 }]
	 * };
	 *
	 * _.merge(object, other);
	 * // => { 'a': [{ 'b': 2, 'c': 3 }, { 'd': 4, 'e': 5 }] }
	 */
	var merge = createAssigner(function (object, source, srcIndex) {
	  baseMerge(object, source, srcIndex);
	});
	
	/**
	 * This method returns a new empty array.
	 *
	 * @static
	 * @memberOf _
	 * @since 4.13.0
	 * @category Util
	 * @returns {Array} Returns the new empty array.
	 * @example
	 *
	 * var arrays = _.times(2, _.stubArray);
	 *
	 * console.log(arrays);
	 * // => [[], []]
	 *
	 * console.log(arrays[0] === arrays[1]);
	 * // => false
	 */
	function stubArray() {
	  return [];
	}
	
	/**
	 * This method returns `false`.
	 *
	 * @static
	 * @memberOf _
	 * @since 4.13.0
	 * @category Util
	 * @returns {boolean} Returns `false`.
	 * @example
	 *
	 * _.times(2, _.stubFalse);
	 * // => [false, false]
	 */
	function stubFalse() {
	  return false;
	}
	
	module.exports = merge;
	/* WEBPACK VAR INJECTION */}.call(exports, (function() { return this; }()), __webpack_require__(8)(module)))

/***/ }),
/* 8 */
/***/ (function(module, exports) {

	"use strict";
	
	module.exports = function (module) {
		if (!module.webpackPolyfill) {
			module.deprecate = function () {};
			module.paths = [];
			// module.parent = undefined by default
			module.children = [];
			module.webpackPolyfill = 1;
		}
		return module;
	};

/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;/* WEBPACK VAR INJECTION */(function(module) {'use strict';
	
	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };
	
	(function (root, factory) {
	  'use strict';
	
	  /*istanbul ignore next:cant test*/
	
	  if (( false ? 'undefined' : _typeof(module)) === 'object' && _typeof(module.exports) === 'object') {
	    module.exports = factory();
	  } else if (true) {
	    // AMD. Register as an anonymous module.
	    !(__WEBPACK_AMD_DEFINE_ARRAY__ = [], __WEBPACK_AMD_DEFINE_FACTORY__ = (factory), __WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ? (__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
	  } else {
	    // Browser globals
	    root.objectPath = factory();
	  }
	})(undefined, function () {
	  'use strict';
	
	  var toStr = Object.prototype.toString;
	  function hasOwnProperty(obj, prop) {
	    if (obj == null) {
	      return false;
	    }
	    //to handle objects with null prototypes (too edge case?)
	    return Object.prototype.hasOwnProperty.call(obj, prop);
	  }
	
	  function isEmpty(value) {
	    if (!value) {
	      return true;
	    }
	    if (isArray(value) && value.length === 0) {
	      return true;
	    } else if (typeof value !== 'string') {
	      for (var i in value) {
	        if (hasOwnProperty(value, i)) {
	          return false;
	        }
	      }
	      return true;
	    }
	    return false;
	  }
	
	  function toString(type) {
	    return toStr.call(type);
	  }
	
	  function isObject(obj) {
	    return (typeof obj === 'undefined' ? 'undefined' : _typeof(obj)) === 'object' && toString(obj) === "[object Object]";
	  }
	
	  var isArray = Array.isArray || function (obj) {
	    /*istanbul ignore next:cant test*/
	    return toStr.call(obj) === '[object Array]';
	  };
	
	  function isBoolean(obj) {
	    return typeof obj === 'boolean' || toString(obj) === '[object Boolean]';
	  }
	
	  function getKey(key) {
	    var intKey = parseInt(key);
	    if (intKey.toString() === key) {
	      return intKey;
	    }
	    return key;
	  }
	
	  function factory(options) {
	    options = options || {};
	
	    var objectPath = function objectPath(obj) {
	      return Object.keys(objectPath).reduce(function (proxy, prop) {
	        if (prop === 'create') {
	          return proxy;
	        }
	
	        /*istanbul ignore else*/
	        if (typeof objectPath[prop] === 'function') {
	          proxy[prop] = objectPath[prop].bind(objectPath, obj);
	        }
	
	        return proxy;
	      }, {});
	    };
	
	    function hasShallowProperty(obj, prop) {
	      return options.includeInheritedProps || typeof prop === 'number' && Array.isArray(obj) || hasOwnProperty(obj, prop);
	    }
	
	    function getShallowProperty(obj, prop) {
	      if (hasShallowProperty(obj, prop)) {
	        return obj[prop];
	      }
	    }
	
	    function set(obj, path, value, doNotReplace) {
	      if (typeof path === 'number') {
	        path = [path];
	      }
	      if (!path || path.length === 0) {
	        return obj;
	      }
	      if (typeof path === 'string') {
	        return set(obj, path.split('.').map(getKey), value, doNotReplace);
	      }
	      var currentPath = path[0];
	      var currentValue = getShallowProperty(obj, currentPath);
	      if (path.length === 1) {
	        if (currentValue === void 0 || !doNotReplace) {
	          obj[currentPath] = value;
	        }
	        return currentValue;
	      }
	
	      if (currentValue === void 0) {
	        //check if we assume an array
	        if (typeof path[1] === 'number') {
	          obj[currentPath] = [];
	        } else {
	          obj[currentPath] = {};
	        }
	      }
	
	      return set(obj[currentPath], path.slice(1), value, doNotReplace);
	    }
	
	    objectPath.has = function (obj, path) {
	      if (typeof path === 'number') {
	        path = [path];
	      } else if (typeof path === 'string') {
	        path = path.split('.');
	      }
	
	      if (!path || path.length === 0) {
	        return !!obj;
	      }
	
	      for (var i = 0; i < path.length; i++) {
	        var j = getKey(path[i]);
	
	        if (typeof j === 'number' && isArray(obj) && j < obj.length || (options.includeInheritedProps ? j in Object(obj) : hasOwnProperty(obj, j))) {
	          obj = obj[j];
	        } else {
	          return false;
	        }
	      }
	
	      return true;
	    };
	
	    objectPath.ensureExists = function (obj, path, value) {
	      return set(obj, path, value, true);
	    };
	
	    objectPath.set = function (obj, path, value, doNotReplace) {
	      return set(obj, path, value, doNotReplace);
	    };
	
	    objectPath.insert = function (obj, path, value, at) {
	      var arr = objectPath.get(obj, path);
	      at = ~~at;
	      if (!isArray(arr)) {
	        arr = [];
	        objectPath.set(obj, path, arr);
	      }
	      arr.splice(at, 0, value);
	    };
	
	    objectPath.empty = function (obj, path) {
	      if (isEmpty(path)) {
	        return void 0;
	      }
	      if (obj == null) {
	        return void 0;
	      }
	
	      var value, i;
	      if (!(value = objectPath.get(obj, path))) {
	        return void 0;
	      }
	
	      if (typeof value === 'string') {
	        return objectPath.set(obj, path, '');
	      } else if (isBoolean(value)) {
	        return objectPath.set(obj, path, false);
	      } else if (typeof value === 'number') {
	        return objectPath.set(obj, path, 0);
	      } else if (isArray(value)) {
	        value.length = 0;
	      } else if (isObject(value)) {
	        for (i in value) {
	          if (hasShallowProperty(value, i)) {
	            delete value[i];
	          }
	        }
	      } else {
	        return objectPath.set(obj, path, null);
	      }
	    };
	
	    objectPath.push = function (obj, path /*, values */) {
	      var arr = objectPath.get(obj, path);
	      if (!isArray(arr)) {
	        arr = [];
	        objectPath.set(obj, path, arr);
	      }
	
	      arr.push.apply(arr, Array.prototype.slice.call(arguments, 2));
	    };
	
	    objectPath.coalesce = function (obj, paths, defaultValue) {
	      var value;
	
	      for (var i = 0, len = paths.length; i < len; i++) {
	        if ((value = objectPath.get(obj, paths[i])) !== void 0) {
	          return value;
	        }
	      }
	
	      return defaultValue;
	    };
	
	    objectPath.get = function (obj, path, defaultValue) {
	      if (typeof path === 'number') {
	        path = [path];
	      }
	      if (!path || path.length === 0) {
	        return obj;
	      }
	      if (obj == null) {
	        return defaultValue;
	      }
	      if (typeof path === 'string') {
	        return objectPath.get(obj, path.split('.'), defaultValue);
	      }
	
	      var currentPath = getKey(path[0]);
	      var nextObj = getShallowProperty(obj, currentPath);
	      if (nextObj === void 0) {
	        return defaultValue;
	      }
	
	      if (path.length === 1) {
	        return nextObj;
	      }
	
	      return objectPath.get(obj[currentPath], path.slice(1), defaultValue);
	    };
	
	    objectPath.del = function del(obj, path) {
	      if (typeof path === 'number') {
	        path = [path];
	      }
	
	      if (obj == null) {
	        return obj;
	      }
	
	      if (isEmpty(path)) {
	        return obj;
	      }
	      if (typeof path === 'string') {
	        return objectPath.del(obj, path.split('.'));
	      }
	
	      var currentPath = getKey(path[0]);
	      if (!hasShallowProperty(obj, currentPath)) {
	        return obj;
	      }
	
	      if (path.length === 1) {
	        if (isArray(obj)) {
	          obj.splice(currentPath, 1);
	        } else {
	          delete obj[currentPath];
	        }
	      } else {
	        return objectPath.del(obj[currentPath], path.slice(1));
	      }
	
	      return obj;
	    };
	
	    return objectPath;
	  }
	
	  var mod = factory();
	  mod.create = factory;
	  mod.withInheritedProps = factory({ includeInheritedProps: true });
	  return mod;
	});
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(8)(module)))

/***/ }),
/* 10 */
/***/ (function(module, exports) {

	"use strict";
	
	var config = {
	    cabinetURL: "http://nenaprasno-cabinet.webglyphs.ru",
	    apiUrl: "http://test.appercode.com/v1/notnap",
	    messages: {
	        confirmLogout: "Вы действительно хотите выйти? Все несохраненные данные будут утеряны.",
	        confirmSkipAuth: "Вы действительно пропустить этап авторизации? Вы не сможете просмотреть все результаты теста без учетной записи.",
	        successFormPost: "Благодарим вас! Данные были успешно отправлены.",
	        successFormPostRegistration: "Благодарим вас за регистрацию. Результаты тестирования будут высланы на ваш электронный адрес.",
	        successRegistration: "Благодарим вас за регистрацию.",
	        successPasswordChange: "Пароль успешно изменен",
	        successProfileSave: "Профиль пользователя успешно сохранен",
	        errorUserAlreadyExists: "Пользователь с таким именем уже существует. Пожалуйста, выберите другое имя, либо войдите.",
	        errorSendingFormResults: "Возникла ошибка при отправке результатов теста. Пожалуйста, попробуйте еще раз.",
	        errorLogin: "Ошибка авторизации. Проверьте ваше имя пользователя и пароль."
	    },
	    userProfileName: "FundUser",
	    APP_VK: '6307655',
	    APP_FB: '2087951274768979'
	};
	
	module.exports = config;

/***/ }),
/* 11 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	
	module.exports = __webpack_require__(12);

/***/ }),
/* 12 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	
	var utils = __webpack_require__(13);
	var bind = __webpack_require__(14);
	var Axios = __webpack_require__(15);
	var defaults = __webpack_require__(16);
	
	/**
	 * Create an instance of Axios
	 *
	 * @param {Object} defaultConfig The default config for the instance
	 * @return {Axios} A new instance of Axios
	 */
	function createInstance(defaultConfig) {
	  var context = new Axios(defaultConfig);
	  var instance = bind(Axios.prototype.request, context);
	
	  // Copy axios.prototype to instance
	  utils.extend(instance, Axios.prototype, context);
	
	  // Copy context to instance
	  utils.extend(instance, context);
	
	  return instance;
	}
	
	// Create the default instance to be exported
	var axios = createInstance(defaults);
	
	// Expose Axios class to allow class inheritance
	axios.Axios = Axios;
	
	// Factory for creating new instances
	axios.create = function create(instanceConfig) {
	  return createInstance(utils.merge(defaults, instanceConfig));
	};
	
	// Expose Cancel & CancelToken
	axios.Cancel = __webpack_require__(33);
	axios.CancelToken = __webpack_require__(34);
	axios.isCancel = __webpack_require__(30);
	
	// Expose all/spread
	axios.all = function all(promises) {
	  return Promise.all(promises);
	};
	axios.spread = __webpack_require__(35);
	
	module.exports = axios;
	
	// Allow use of default import syntax in TypeScript
	module.exports.default = axios;

/***/ }),
/* 13 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	
	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };
	
	var bind = __webpack_require__(14);
	
	/*global toString:true*/
	
	// utils is a library of generic helper functions non-specific to axios
	
	var toString = Object.prototype.toString;
	
	/**
	 * Determine if a value is an Array
	 *
	 * @param {Object} val The value to test
	 * @returns {boolean} True if value is an Array, otherwise false
	 */
	function isArray(val) {
	  return toString.call(val) === '[object Array]';
	}
	
	/**
	 * Determine if a value is an ArrayBuffer
	 *
	 * @param {Object} val The value to test
	 * @returns {boolean} True if value is an ArrayBuffer, otherwise false
	 */
	function isArrayBuffer(val) {
	  return toString.call(val) === '[object ArrayBuffer]';
	}
	
	/**
	 * Determine if a value is a FormData
	 *
	 * @param {Object} val The value to test
	 * @returns {boolean} True if value is an FormData, otherwise false
	 */
	function isFormData(val) {
	  return typeof FormData !== 'undefined' && val instanceof FormData;
	}
	
	/**
	 * Determine if a value is a view on an ArrayBuffer
	 *
	 * @param {Object} val The value to test
	 * @returns {boolean} True if value is a view on an ArrayBuffer, otherwise false
	 */
	function isArrayBufferView(val) {
	  var result;
	  if (typeof ArrayBuffer !== 'undefined' && ArrayBuffer.isView) {
	    result = ArrayBuffer.isView(val);
	  } else {
	    result = val && val.buffer && val.buffer instanceof ArrayBuffer;
	  }
	  return result;
	}
	
	/**
	 * Determine if a value is a String
	 *
	 * @param {Object} val The value to test
	 * @returns {boolean} True if value is a String, otherwise false
	 */
	function isString(val) {
	  return typeof val === 'string';
	}
	
	/**
	 * Determine if a value is a Number
	 *
	 * @param {Object} val The value to test
	 * @returns {boolean} True if value is a Number, otherwise false
	 */
	function isNumber(val) {
	  return typeof val === 'number';
	}
	
	/**
	 * Determine if a value is undefined
	 *
	 * @param {Object} val The value to test
	 * @returns {boolean} True if the value is undefined, otherwise false
	 */
	function isUndefined(val) {
	  return typeof val === 'undefined';
	}
	
	/**
	 * Determine if a value is an Object
	 *
	 * @param {Object} val The value to test
	 * @returns {boolean} True if value is an Object, otherwise false
	 */
	function isObject(val) {
	  return val !== null && (typeof val === 'undefined' ? 'undefined' : _typeof(val)) === 'object';
	}
	
	/**
	 * Determine if a value is a Date
	 *
	 * @param {Object} val The value to test
	 * @returns {boolean} True if value is a Date, otherwise false
	 */
	function isDate(val) {
	  return toString.call(val) === '[object Date]';
	}
	
	/**
	 * Determine if a value is a File
	 *
	 * @param {Object} val The value to test
	 * @returns {boolean} True if value is a File, otherwise false
	 */
	function isFile(val) {
	  return toString.call(val) === '[object File]';
	}
	
	/**
	 * Determine if a value is a Blob
	 *
	 * @param {Object} val The value to test
	 * @returns {boolean} True if value is a Blob, otherwise false
	 */
	function isBlob(val) {
	  return toString.call(val) === '[object Blob]';
	}
	
	/**
	 * Determine if a value is a Function
	 *
	 * @param {Object} val The value to test
	 * @returns {boolean} True if value is a Function, otherwise false
	 */
	function isFunction(val) {
	  return toString.call(val) === '[object Function]';
	}
	
	/**
	 * Determine if a value is a Stream
	 *
	 * @param {Object} val The value to test
	 * @returns {boolean} True if value is a Stream, otherwise false
	 */
	function isStream(val) {
	  return isObject(val) && isFunction(val.pipe);
	}
	
	/**
	 * Determine if a value is a URLSearchParams object
	 *
	 * @param {Object} val The value to test
	 * @returns {boolean} True if value is a URLSearchParams object, otherwise false
	 */
	function isURLSearchParams(val) {
	  return typeof URLSearchParams !== 'undefined' && val instanceof URLSearchParams;
	}
	
	/**
	 * Trim excess whitespace off the beginning and end of a string
	 *
	 * @param {String} str The String to trim
	 * @returns {String} The String freed of excess whitespace
	 */
	function trim(str) {
	  return str.replace(/^\s*/, '').replace(/\s*$/, '');
	}
	
	/**
	 * Determine if we're running in a standard browser environment
	 *
	 * This allows axios to run in a web worker, and react-native.
	 * Both environments support XMLHttpRequest, but not fully standard globals.
	 *
	 * web workers:
	 *  typeof window -> undefined
	 *  typeof document -> undefined
	 *
	 * react-native:
	 *  typeof document.createElement -> undefined
	 */
	function isStandardBrowserEnv() {
	  return typeof window !== 'undefined' && typeof document !== 'undefined' && typeof document.createElement === 'function';
	}
	
	/**
	 * Iterate over an Array or an Object invoking a function for each item.
	 *
	 * If `obj` is an Array callback will be called passing
	 * the value, index, and complete array for each item.
	 *
	 * If 'obj' is an Object callback will be called passing
	 * the value, key, and complete object for each property.
	 *
	 * @param {Object|Array} obj The object to iterate
	 * @param {Function} fn The callback to invoke for each item
	 */
	function forEach(obj, fn) {
	  // Don't bother if no value provided
	  if (obj === null || typeof obj === 'undefined') {
	    return;
	  }
	
	  // Force an array if not already something iterable
	  if ((typeof obj === 'undefined' ? 'undefined' : _typeof(obj)) !== 'object' && !isArray(obj)) {
	    /*eslint no-param-reassign:0*/
	    obj = [obj];
	  }
	
	  if (isArray(obj)) {
	    // Iterate over array values
	    for (var i = 0, l = obj.length; i < l; i++) {
	      fn.call(null, obj[i], i, obj);
	    }
	  } else {
	    // Iterate over object keys
	    for (var key in obj) {
	      if (Object.prototype.hasOwnProperty.call(obj, key)) {
	        fn.call(null, obj[key], key, obj);
	      }
	    }
	  }
	}
	
	/**
	 * Accepts varargs expecting each argument to be an object, then
	 * immutably merges the properties of each object and returns result.
	 *
	 * When multiple objects contain the same key the later object in
	 * the arguments list will take precedence.
	 *
	 * Example:
	 *
	 * ```js
	 * var result = merge({foo: 123}, {foo: 456});
	 * console.log(result.foo); // outputs 456
	 * ```
	 *
	 * @param {Object} obj1 Object to merge
	 * @returns {Object} Result of all merge properties
	 */
	function merge() /* obj1, obj2, obj3, ... */{
	  var result = {};
	  function assignValue(val, key) {
	    if (_typeof(result[key]) === 'object' && (typeof val === 'undefined' ? 'undefined' : _typeof(val)) === 'object') {
	      result[key] = merge(result[key], val);
	    } else {
	      result[key] = val;
	    }
	  }
	
	  for (var i = 0, l = arguments.length; i < l; i++) {
	    forEach(arguments[i], assignValue);
	  }
	  return result;
	}
	
	/**
	 * Extends object a by mutably adding to it the properties of object b.
	 *
	 * @param {Object} a The object to be extended
	 * @param {Object} b The object to copy properties from
	 * @param {Object} thisArg The object to bind function to
	 * @return {Object} The resulting value of object a
	 */
	function extend(a, b, thisArg) {
	  forEach(b, function assignValue(val, key) {
	    if (thisArg && typeof val === 'function') {
	      a[key] = bind(val, thisArg);
	    } else {
	      a[key] = val;
	    }
	  });
	  return a;
	}
	
	module.exports = {
	  isArray: isArray,
	  isArrayBuffer: isArrayBuffer,
	  isFormData: isFormData,
	  isArrayBufferView: isArrayBufferView,
	  isString: isString,
	  isNumber: isNumber,
	  isObject: isObject,
	  isUndefined: isUndefined,
	  isDate: isDate,
	  isFile: isFile,
	  isBlob: isBlob,
	  isFunction: isFunction,
	  isStream: isStream,
	  isURLSearchParams: isURLSearchParams,
	  isStandardBrowserEnv: isStandardBrowserEnv,
	  forEach: forEach,
	  merge: merge,
	  extend: extend,
	  trim: trim
	};

/***/ }),
/* 14 */
/***/ (function(module, exports) {

	'use strict';
	
	module.exports = function bind(fn, thisArg) {
	  return function wrap() {
	    var args = new Array(arguments.length);
	    for (var i = 0; i < args.length; i++) {
	      args[i] = arguments[i];
	    }
	    return fn.apply(thisArg, args);
	  };
	};

/***/ }),
/* 15 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	
	var defaults = __webpack_require__(16);
	var utils = __webpack_require__(13);
	var InterceptorManager = __webpack_require__(27);
	var dispatchRequest = __webpack_require__(28);
	var isAbsoluteURL = __webpack_require__(31);
	var combineURLs = __webpack_require__(32);
	
	/**
	 * Create a new instance of Axios
	 *
	 * @param {Object} instanceConfig The default config for the instance
	 */
	function Axios(instanceConfig) {
	  this.defaults = instanceConfig;
	  this.interceptors = {
	    request: new InterceptorManager(),
	    response: new InterceptorManager()
	  };
	}
	
	/**
	 * Dispatch a request
	 *
	 * @param {Object} config The config specific for this request (merged with this.defaults)
	 */
	Axios.prototype.request = function request(config) {
	  /*eslint no-param-reassign:0*/
	  // Allow for axios('example/url'[, config]) a la fetch API
	  if (typeof config === 'string') {
	    config = utils.merge({
	      url: arguments[0]
	    }, arguments[1]);
	  }
	
	  config = utils.merge(defaults, this.defaults, { method: 'get' }, config);
	
	  // Support baseURL config
	  if (config.baseURL && !isAbsoluteURL(config.url)) {
	    config.url = combineURLs(config.baseURL, config.url);
	  }
	
	  // Hook up interceptors middleware
	  var chain = [dispatchRequest, undefined];
	  var promise = Promise.resolve(config);
	
	  this.interceptors.request.forEach(function unshiftRequestInterceptors(interceptor) {
	    chain.unshift(interceptor.fulfilled, interceptor.rejected);
	  });
	
	  this.interceptors.response.forEach(function pushResponseInterceptors(interceptor) {
	    chain.push(interceptor.fulfilled, interceptor.rejected);
	  });
	
	  while (chain.length) {
	    promise = promise.then(chain.shift(), chain.shift());
	  }
	
	  return promise;
	};
	
	// Provide aliases for supported request methods
	utils.forEach(['delete', 'get', 'head'], function forEachMethodNoData(method) {
	  /*eslint func-names:0*/
	  Axios.prototype[method] = function (url, config) {
	    return this.request(utils.merge(config || {}, {
	      method: method,
	      url: url
	    }));
	  };
	});
	
	utils.forEach(['post', 'put', 'patch'], function forEachMethodWithData(method) {
	  /*eslint func-names:0*/
	  Axios.prototype[method] = function (url, data, config) {
	    return this.request(utils.merge(config || {}, {
	      method: method,
	      url: url,
	      data: data
	    }));
	  };
	});
	
	module.exports = Axios;

/***/ }),
/* 16 */
/***/ (function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(process) {'use strict';
	
	var utils = __webpack_require__(13);
	var normalizeHeaderName = __webpack_require__(17);
	
	var PROTECTION_PREFIX = /^\)\]\}',?\n/;
	var DEFAULT_CONTENT_TYPE = {
	  'Content-Type': 'application/x-www-form-urlencoded'
	};
	
	function setContentTypeIfUnset(headers, value) {
	  if (!utils.isUndefined(headers) && utils.isUndefined(headers['Content-Type'])) {
	    headers['Content-Type'] = value;
	  }
	}
	
	function getDefaultAdapter() {
	  var adapter;
	  if (typeof XMLHttpRequest !== 'undefined') {
	    // For browsers use XHR adapter
	    adapter = __webpack_require__(18);
	  } else if (typeof process !== 'undefined') {
	    // For node use HTTP adapter
	    adapter = __webpack_require__(18);
	  }
	  return adapter;
	}
	
	var defaults = {
	  adapter: getDefaultAdapter(),
	
	  transformRequest: [function transformRequest(data, headers) {
	    normalizeHeaderName(headers, 'Content-Type');
	    if (utils.isFormData(data) || utils.isArrayBuffer(data) || utils.isStream(data) || utils.isFile(data) || utils.isBlob(data)) {
	      return data;
	    }
	    if (utils.isArrayBufferView(data)) {
	      return data.buffer;
	    }
	    if (utils.isURLSearchParams(data)) {
	      setContentTypeIfUnset(headers, 'application/x-www-form-urlencoded;charset=utf-8');
	      return data.toString();
	    }
	    if (utils.isObject(data)) {
	      setContentTypeIfUnset(headers, 'application/json;charset=utf-8');
	      return JSON.stringify(data);
	    }
	    return data;
	  }],
	
	  transformResponse: [function transformResponse(data) {
	    /*eslint no-param-reassign:0*/
	    if (typeof data === 'string') {
	      data = data.replace(PROTECTION_PREFIX, '');
	      try {
	        data = JSON.parse(data);
	      } catch (e) {/* Ignore */}
	    }
	    return data;
	  }],
	
	  timeout: 0,
	
	  xsrfCookieName: 'XSRF-TOKEN',
	  xsrfHeaderName: 'X-XSRF-TOKEN',
	
	  maxContentLength: -1,
	
	  validateStatus: function validateStatus(status) {
	    return status >= 200 && status < 300;
	  }
	};
	
	defaults.headers = {
	  common: {
	    'Accept': 'application/json, text/plain, */*'
	  }
	};
	
	utils.forEach(['delete', 'get', 'head'], function forEachMehtodNoData(method) {
	  defaults.headers[method] = {};
	});
	
	utils.forEach(['post', 'put', 'patch'], function forEachMethodWithData(method) {
	  defaults.headers[method] = utils.merge(DEFAULT_CONTENT_TYPE);
	});
	
	module.exports = defaults;
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(4)))

/***/ }),
/* 17 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	
	var utils = __webpack_require__(13);
	
	module.exports = function normalizeHeaderName(headers, normalizedName) {
	  utils.forEach(headers, function processHeader(value, name) {
	    if (name !== normalizedName && name.toUpperCase() === normalizedName.toUpperCase()) {
	      headers[normalizedName] = value;
	      delete headers[name];
	    }
	  });
	};

/***/ }),
/* 18 */
/***/ (function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(process) {'use strict';
	
	var utils = __webpack_require__(13);
	var settle = __webpack_require__(19);
	var buildURL = __webpack_require__(22);
	var parseHeaders = __webpack_require__(23);
	var isURLSameOrigin = __webpack_require__(24);
	var createError = __webpack_require__(20);
	var btoa = typeof window !== 'undefined' && window.btoa && window.btoa.bind(window) || __webpack_require__(25);
	
	module.exports = function xhrAdapter(config) {
	  return new Promise(function dispatchXhrRequest(resolve, reject) {
	    var requestData = config.data;
	    var requestHeaders = config.headers;
	
	    if (utils.isFormData(requestData)) {
	      delete requestHeaders['Content-Type']; // Let the browser set it
	    }
	
	    var request = new XMLHttpRequest();
	    var loadEvent = 'onreadystatechange';
	    var xDomain = false;
	
	    // For IE 8/9 CORS support
	    // Only supports POST and GET calls and doesn't returns the response headers.
	    // DON'T do this for testing b/c XMLHttpRequest is mocked, not XDomainRequest.
	    if (process.env.NODE_ENV !== 'test' && typeof window !== 'undefined' && window.XDomainRequest && !('withCredentials' in request) && !isURLSameOrigin(config.url)) {
	      request = new window.XDomainRequest();
	      loadEvent = 'onload';
	      xDomain = true;
	      request.onprogress = function handleProgress() {};
	      request.ontimeout = function handleTimeout() {};
	    }
	
	    // HTTP basic authentication
	    if (config.auth) {
	      var username = config.auth.username || '';
	      var password = config.auth.password || '';
	      requestHeaders.Authorization = 'Basic ' + btoa(username + ':' + password);
	    }
	
	    request.open(config.method.toUpperCase(), buildURL(config.url, config.params, config.paramsSerializer), true);
	
	    // Set the request timeout in MS
	    request.timeout = config.timeout;
	
	    // Listen for ready state
	    request[loadEvent] = function handleLoad() {
	      if (!request || request.readyState !== 4 && !xDomain) {
	        return;
	      }
	
	      // The request errored out and we didn't get a response, this will be
	      // handled by onerror instead
	      // With one exception: request that using file: protocol, most browsers
	      // will return status as 0 even though it's a successful request
	      if (request.status === 0 && !(request.responseURL && request.responseURL.indexOf('file:') === 0)) {
	        return;
	      }
	
	      // Prepare the response
	      var responseHeaders = 'getAllResponseHeaders' in request ? parseHeaders(request.getAllResponseHeaders()) : null;
	      var responseData = !config.responseType || config.responseType === 'text' ? request.responseText : request.response;
	      var response = {
	        data: responseData,
	        // IE sends 1223 instead of 204 (https://github.com/mzabriskie/axios/issues/201)
	        status: request.status === 1223 ? 204 : request.status,
	        statusText: request.status === 1223 ? 'No Content' : request.statusText,
	        headers: responseHeaders,
	        config: config,
	        request: request
	      };
	
	      settle(resolve, reject, response);
	
	      // Clean up request
	      request = null;
	    };
	
	    // Handle low level network errors
	    request.onerror = function handleError() {
	      // Real errors are hidden from us by the browser
	      // onerror should only fire if it's a network error
	      reject(createError('Network Error', config));
	
	      // Clean up request
	      request = null;
	    };
	
	    // Handle timeout
	    request.ontimeout = function handleTimeout() {
	      reject(createError('timeout of ' + config.timeout + 'ms exceeded', config, 'ECONNABORTED'));
	
	      // Clean up request
	      request = null;
	    };
	
	    // Add xsrf header
	    // This is only done if running in a standard browser environment.
	    // Specifically not if we're in a web worker, or react-native.
	    if (utils.isStandardBrowserEnv()) {
	      var cookies = __webpack_require__(26);
	
	      // Add xsrf header
	      var xsrfValue = (config.withCredentials || isURLSameOrigin(config.url)) && config.xsrfCookieName ? cookies.read(config.xsrfCookieName) : undefined;
	
	      if (xsrfValue) {
	        requestHeaders[config.xsrfHeaderName] = xsrfValue;
	      }
	    }
	
	    // Add headers to the request
	    if ('setRequestHeader' in request) {
	      utils.forEach(requestHeaders, function setRequestHeader(val, key) {
	        if (typeof requestData === 'undefined' && key.toLowerCase() === 'content-type') {
	          // Remove Content-Type if data is undefined
	          delete requestHeaders[key];
	        } else {
	          // Otherwise add header to the request
	          request.setRequestHeader(key, val);
	        }
	      });
	    }
	
	    // Add withCredentials to request if needed
	    if (config.withCredentials) {
	      request.withCredentials = true;
	    }
	
	    // Add responseType to request if needed
	    if (config.responseType) {
	      try {
	        request.responseType = config.responseType;
	      } catch (e) {
	        if (request.responseType !== 'json') {
	          throw e;
	        }
	      }
	    }
	
	    // Handle progress if needed
	    if (typeof config.onDownloadProgress === 'function') {
	      request.addEventListener('progress', config.onDownloadProgress);
	    }
	
	    // Not all browsers support upload events
	    if (typeof config.onUploadProgress === 'function' && request.upload) {
	      request.upload.addEventListener('progress', config.onUploadProgress);
	    }
	
	    if (config.cancelToken) {
	      // Handle cancellation
	      config.cancelToken.promise.then(function onCanceled(cancel) {
	        if (!request) {
	          return;
	        }
	
	        request.abort();
	        reject(cancel);
	        // Clean up request
	        request = null;
	      });
	    }
	
	    if (requestData === undefined) {
	      requestData = null;
	    }
	
	    // Send the request
	    request.send(requestData);
	  });
	};
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(4)))

/***/ }),
/* 19 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	
	var createError = __webpack_require__(20);
	
	/**
	 * Resolve or reject a Promise based on response status.
	 *
	 * @param {Function} resolve A function that resolves the promise.
	 * @param {Function} reject A function that rejects the promise.
	 * @param {object} response The response.
	 */
	module.exports = function settle(resolve, reject, response) {
	  var validateStatus = response.config.validateStatus;
	  // Note: status is not exposed by XDomainRequest
	  if (!response.status || !validateStatus || validateStatus(response.status)) {
	    resolve(response);
	  } else {
	    reject(createError('Request failed with status code ' + response.status, response.config, null, response));
	  }
	};

/***/ }),
/* 20 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	
	var enhanceError = __webpack_require__(21);
	
	/**
	 * Create an Error with the specified message, config, error code, and response.
	 *
	 * @param {string} message The error message.
	 * @param {Object} config The config.
	 * @param {string} [code] The error code (for example, 'ECONNABORTED').
	 @ @param {Object} [response] The response.
	 * @returns {Error} The created error.
	 */
	module.exports = function createError(message, config, code, response) {
	  var error = new Error(message);
	  return enhanceError(error, config, code, response);
	};

/***/ }),
/* 21 */
/***/ (function(module, exports) {

	'use strict';
	
	/**
	 * Update an Error with the specified config, error code, and response.
	 *
	 * @param {Error} error The error to update.
	 * @param {Object} config The config.
	 * @param {string} [code] The error code (for example, 'ECONNABORTED').
	 @ @param {Object} [response] The response.
	 * @returns {Error} The error.
	 */
	
	module.exports = function enhanceError(error, config, code, response) {
	  error.config = config;
	  if (code) {
	    error.code = code;
	  }
	  error.response = response;
	  return error;
	};

/***/ }),
/* 22 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	
	var utils = __webpack_require__(13);
	
	function encode(val) {
	  return encodeURIComponent(val).replace(/%40/gi, '@').replace(/%3A/gi, ':').replace(/%24/g, '$').replace(/%2C/gi, ',').replace(/%20/g, '+').replace(/%5B/gi, '[').replace(/%5D/gi, ']');
	}
	
	/**
	 * Build a URL by appending params to the end
	 *
	 * @param {string} url The base of the url (e.g., http://www.google.com)
	 * @param {object} [params] The params to be appended
	 * @returns {string} The formatted url
	 */
	module.exports = function buildURL(url, params, paramsSerializer) {
	  /*eslint no-param-reassign:0*/
	  if (!params) {
	    return url;
	  }
	
	  var serializedParams;
	  if (paramsSerializer) {
	    serializedParams = paramsSerializer(params);
	  } else if (utils.isURLSearchParams(params)) {
	    serializedParams = params.toString();
	  } else {
	    var parts = [];
	
	    utils.forEach(params, function serialize(val, key) {
	      if (val === null || typeof val === 'undefined') {
	        return;
	      }
	
	      if (utils.isArray(val)) {
	        key = key + '[]';
	      }
	
	      if (!utils.isArray(val)) {
	        val = [val];
	      }
	
	      utils.forEach(val, function parseValue(v) {
	        if (utils.isDate(v)) {
	          v = v.toISOString();
	        } else if (utils.isObject(v)) {
	          v = JSON.stringify(v);
	        }
	        parts.push(encode(key) + '=' + encode(v));
	      });
	    });
	
	    serializedParams = parts.join('&');
	  }
	
	  if (serializedParams) {
	    url += (url.indexOf('?') === -1 ? '?' : '&') + serializedParams;
	  }
	
	  return url;
	};

/***/ }),
/* 23 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	
	var utils = __webpack_require__(13);
	
	/**
	 * Parse headers into an object
	 *
	 * ```
	 * Date: Wed, 27 Aug 2014 08:58:49 GMT
	 * Content-Type: application/json
	 * Connection: keep-alive
	 * Transfer-Encoding: chunked
	 * ```
	 *
	 * @param {String} headers Headers needing to be parsed
	 * @returns {Object} Headers parsed into an object
	 */
	module.exports = function parseHeaders(headers) {
	  var parsed = {};
	  var key;
	  var val;
	  var i;
	
	  if (!headers) {
	    return parsed;
	  }
	
	  utils.forEach(headers.split('\n'), function parser(line) {
	    i = line.indexOf(':');
	    key = utils.trim(line.substr(0, i)).toLowerCase();
	    val = utils.trim(line.substr(i + 1));
	
	    if (key) {
	      parsed[key] = parsed[key] ? parsed[key] + ', ' + val : val;
	    }
	  });
	
	  return parsed;
	};

/***/ }),
/* 24 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	
	var utils = __webpack_require__(13);
	
	module.exports = utils.isStandardBrowserEnv() ?
	
	// Standard browser envs have full support of the APIs needed to test
	// whether the request URL is of the same origin as current location.
	function standardBrowserEnv() {
	  var msie = /(msie|trident)/i.test(navigator.userAgent);
	  var urlParsingNode = document.createElement('a');
	  var originURL;
	
	  /**
	  * Parse a URL to discover it's components
	  *
	  * @param {String} url The URL to be parsed
	  * @returns {Object}
	  */
	  function resolveURL(url) {
	    var href = url;
	
	    if (msie) {
	      // IE needs attribute set twice to normalize properties
	      urlParsingNode.setAttribute('href', href);
	      href = urlParsingNode.href;
	    }
	
	    urlParsingNode.setAttribute('href', href);
	
	    // urlParsingNode provides the UrlUtils interface - http://url.spec.whatwg.org/#urlutils
	    return {
	      href: urlParsingNode.href,
	      protocol: urlParsingNode.protocol ? urlParsingNode.protocol.replace(/:$/, '') : '',
	      host: urlParsingNode.host,
	      search: urlParsingNode.search ? urlParsingNode.search.replace(/^\?/, '') : '',
	      hash: urlParsingNode.hash ? urlParsingNode.hash.replace(/^#/, '') : '',
	      hostname: urlParsingNode.hostname,
	      port: urlParsingNode.port,
	      pathname: urlParsingNode.pathname.charAt(0) === '/' ? urlParsingNode.pathname : '/' + urlParsingNode.pathname
	    };
	  }
	
	  originURL = resolveURL(window.location.href);
	
	  /**
	  * Determine if a URL shares the same origin as the current location
	  *
	  * @param {String} requestURL The URL to test
	  * @returns {boolean} True if URL shares the same origin, otherwise false
	  */
	  return function isURLSameOrigin(requestURL) {
	    var parsed = utils.isString(requestURL) ? resolveURL(requestURL) : requestURL;
	    return parsed.protocol === originURL.protocol && parsed.host === originURL.host;
	  };
	}() :
	
	// Non standard browser envs (web workers, react-native) lack needed support.
	function nonStandardBrowserEnv() {
	  return function isURLSameOrigin() {
	    return true;
	  };
	}();

/***/ }),
/* 25 */
/***/ (function(module, exports) {

	'use strict';
	
	// btoa polyfill for IE<10 courtesy https://github.com/davidchambers/Base64.js
	
	var chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=';
	
	function E() {
	  this.message = 'String contains an invalid character';
	}
	E.prototype = new Error();
	E.prototype.code = 5;
	E.prototype.name = 'InvalidCharacterError';
	
	function btoa(input) {
	  var str = String(input);
	  var output = '';
	  for (
	  // initialize result and counter
	  var block, charCode, idx = 0, map = chars;
	  // if the next str index does not exist:
	  //   change the mapping table to "="
	  //   check if d has no fractional digits
	  str.charAt(idx | 0) || (map = '=', idx % 1);
	  // "8 - idx % 1 * 8" generates the sequence 2, 4, 6, 8
	  output += map.charAt(63 & block >> 8 - idx % 1 * 8)) {
	    charCode = str.charCodeAt(idx += 3 / 4);
	    if (charCode > 0xFF) {
	      throw new E();
	    }
	    block = block << 8 | charCode;
	  }
	  return output;
	}
	
	module.exports = btoa;

/***/ }),
/* 26 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	
	var utils = __webpack_require__(13);
	
	module.exports = utils.isStandardBrowserEnv() ?
	
	// Standard browser envs support document.cookie
	function standardBrowserEnv() {
	  return {
	    write: function write(name, value, expires, path, domain, secure) {
	      var cookie = [];
	      cookie.push(name + '=' + encodeURIComponent(value));
	
	      if (utils.isNumber(expires)) {
	        cookie.push('expires=' + new Date(expires).toGMTString());
	      }
	
	      if (utils.isString(path)) {
	        cookie.push('path=' + path);
	      }
	
	      if (utils.isString(domain)) {
	        cookie.push('domain=' + domain);
	      }
	
	      if (secure === true) {
	        cookie.push('secure');
	      }
	
	      document.cookie = cookie.join('; ');
	    },
	
	    read: function read(name) {
	      var match = document.cookie.match(new RegExp('(^|;\\s*)(' + name + ')=([^;]*)'));
	      return match ? decodeURIComponent(match[3]) : null;
	    },
	
	    remove: function remove(name) {
	      this.write(name, '', Date.now() - 86400000);
	    }
	  };
	}() :
	
	// Non standard browser env (web workers, react-native) lack needed support.
	function nonStandardBrowserEnv() {
	  return {
	    write: function write() {},
	    read: function read() {
	      return null;
	    },
	    remove: function remove() {}
	  };
	}();

/***/ }),
/* 27 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	
	var utils = __webpack_require__(13);
	
	function InterceptorManager() {
	  this.handlers = [];
	}
	
	/**
	 * Add a new interceptor to the stack
	 *
	 * @param {Function} fulfilled The function to handle `then` for a `Promise`
	 * @param {Function} rejected The function to handle `reject` for a `Promise`
	 *
	 * @return {Number} An ID used to remove interceptor later
	 */
	InterceptorManager.prototype.use = function use(fulfilled, rejected) {
	  this.handlers.push({
	    fulfilled: fulfilled,
	    rejected: rejected
	  });
	  return this.handlers.length - 1;
	};
	
	/**
	 * Remove an interceptor from the stack
	 *
	 * @param {Number} id The ID that was returned by `use`
	 */
	InterceptorManager.prototype.eject = function eject(id) {
	  if (this.handlers[id]) {
	    this.handlers[id] = null;
	  }
	};
	
	/**
	 * Iterate over all the registered interceptors
	 *
	 * This method is particularly useful for skipping over any
	 * interceptors that may have become `null` calling `eject`.
	 *
	 * @param {Function} fn The function to call for each interceptor
	 */
	InterceptorManager.prototype.forEach = function forEach(fn) {
	  utils.forEach(this.handlers, function forEachHandler(h) {
	    if (h !== null) {
	      fn(h);
	    }
	  });
	};
	
	module.exports = InterceptorManager;

/***/ }),
/* 28 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	
	var utils = __webpack_require__(13);
	var transformData = __webpack_require__(29);
	var isCancel = __webpack_require__(30);
	var defaults = __webpack_require__(16);
	
	/**
	 * Throws a `Cancel` if cancellation has been requested.
	 */
	function throwIfCancellationRequested(config) {
	  if (config.cancelToken) {
	    config.cancelToken.throwIfRequested();
	  }
	}
	
	/**
	 * Dispatch a request to the server using the configured adapter.
	 *
	 * @param {object} config The config that is to be used for the request
	 * @returns {Promise} The Promise to be fulfilled
	 */
	module.exports = function dispatchRequest(config) {
	  throwIfCancellationRequested(config);
	
	  // Ensure headers exist
	  config.headers = config.headers || {};
	
	  // Transform request data
	  config.data = transformData(config.data, config.headers, config.transformRequest);
	
	  // Flatten headers
	  config.headers = utils.merge(config.headers.common || {}, config.headers[config.method] || {}, config.headers || {});
	
	  utils.forEach(['delete', 'get', 'head', 'post', 'put', 'patch', 'common'], function cleanHeaderConfig(method) {
	    delete config.headers[method];
	  });
	
	  var adapter = config.adapter || defaults.adapter;
	
	  return adapter(config).then(function onAdapterResolution(response) {
	    throwIfCancellationRequested(config);
	
	    // Transform response data
	    response.data = transformData(response.data, response.headers, config.transformResponse);
	
	    return response;
	  }, function onAdapterRejection(reason) {
	    if (!isCancel(reason)) {
	      throwIfCancellationRequested(config);
	
	      // Transform response data
	      if (reason && reason.response) {
	        reason.response.data = transformData(reason.response.data, reason.response.headers, config.transformResponse);
	      }
	    }
	
	    return Promise.reject(reason);
	  });
	};

/***/ }),
/* 29 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	
	var utils = __webpack_require__(13);
	
	/**
	 * Transform the data for a request or a response
	 *
	 * @param {Object|String} data The data to be transformed
	 * @param {Array} headers The headers for the request or response
	 * @param {Array|Function} fns A single function or Array of functions
	 * @returns {*} The resulting transformed data
	 */
	module.exports = function transformData(data, headers, fns) {
	  /*eslint no-param-reassign:0*/
	  utils.forEach(fns, function transform(fn) {
	    data = fn(data, headers);
	  });
	
	  return data;
	};

/***/ }),
/* 30 */
/***/ (function(module, exports) {

	'use strict';
	
	module.exports = function isCancel(value) {
	  return !!(value && value.__CANCEL__);
	};

/***/ }),
/* 31 */
/***/ (function(module, exports) {

	'use strict';
	
	/**
	 * Determines whether the specified URL is absolute
	 *
	 * @param {string} url The URL to test
	 * @returns {boolean} True if the specified URL is absolute, otherwise false
	 */
	
	module.exports = function isAbsoluteURL(url) {
	  // A URL is considered absolute if it begins with "<scheme>://" or "//" (protocol-relative URL).
	  // RFC 3986 defines scheme name as a sequence of characters beginning with a letter and followed
	  // by any combination of letters, digits, plus, period, or hyphen.
	  return (/^([a-z][a-z\d\+\-\.]*:)?\/\//i.test(url)
	  );
	};

/***/ }),
/* 32 */
/***/ (function(module, exports) {

	'use strict';
	
	/**
	 * Creates a new URL by combining the specified URLs
	 *
	 * @param {string} baseURL The base URL
	 * @param {string} relativeURL The relative URL
	 * @returns {string} The combined URL
	 */
	
	module.exports = function combineURLs(baseURL, relativeURL) {
	  return baseURL.replace(/\/+$/, '') + '/' + relativeURL.replace(/^\/+/, '');
	};

/***/ }),
/* 33 */
/***/ (function(module, exports) {

	'use strict';
	
	/**
	 * A `Cancel` is an object that is thrown when an operation is canceled.
	 *
	 * @class
	 * @param {string=} message The message.
	 */
	
	function Cancel(message) {
	  this.message = message;
	}
	
	Cancel.prototype.toString = function toString() {
	  return 'Cancel' + (this.message ? ': ' + this.message : '');
	};
	
	Cancel.prototype.__CANCEL__ = true;
	
	module.exports = Cancel;

/***/ }),
/* 34 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	
	var Cancel = __webpack_require__(33);
	
	/**
	 * A `CancelToken` is an object that can be used to request cancellation of an operation.
	 *
	 * @class
	 * @param {Function} executor The executor function.
	 */
	function CancelToken(executor) {
	  if (typeof executor !== 'function') {
	    throw new TypeError('executor must be a function.');
	  }
	
	  var resolvePromise;
	  this.promise = new Promise(function promiseExecutor(resolve) {
	    resolvePromise = resolve;
	  });
	
	  var token = this;
	  executor(function cancel(message) {
	    if (token.reason) {
	      // Cancellation has already been requested
	      return;
	    }
	
	    token.reason = new Cancel(message);
	    resolvePromise(token.reason);
	  });
	}
	
	/**
	 * Throws a `Cancel` if cancellation has been requested.
	 */
	CancelToken.prototype.throwIfRequested = function throwIfRequested() {
	  if (this.reason) {
	    throw this.reason;
	  }
	};
	
	/**
	 * Returns an object that contains a new `CancelToken` and a function that, when called,
	 * cancels the `CancelToken`.
	 */
	CancelToken.source = function source() {
	  var cancel;
	  var token = new CancelToken(function executor(c) {
	    cancel = c;
	  });
	  return {
	    token: token,
	    cancel: cancel
	  };
	};
	
	module.exports = CancelToken;

/***/ }),
/* 35 */
/***/ (function(module, exports) {

	'use strict';
	
	/**
	 * Syntactic sugar for invoking a function and expanding an array for arguments.
	 *
	 * Common use case would be to use `Function.prototype.apply`.
	 *
	 *  ```js
	 *  function f(x, y, z) {}
	 *  var args = [1, 2, 3];
	 *  f.apply(null, args);
	 *  ```
	 *
	 * With `spread` this example can be re-written.
	 *
	 *  ```js
	 *  spread(function(x, y, z) {})([1, 2, 3]);
	 *  ```
	 *
	 * @param {Function} callback
	 * @returns {Function}
	 */
	
	module.exports = function spread(callback) {
	  return function wrap(arr) {
	    return callback.apply(null, arr);
	  };
	};

/***/ }),
/* 36 */
/***/ (function(module, exports, __webpack_require__) {

	
	/* styles */
	__webpack_require__(37)
	
	var Component = __webpack_require__(42)(
	  /* script */
	  __webpack_require__(43),
	  /* template */
	  __webpack_require__(145),
	  /* scopeId */
	  "data-v-680d33ee",
	  /* cssModules */
	  null
	)
	Component.options.__file = "/Users/alexey/PhpstormProjects/nenaprasno-frontend/public/assets/screen/app/components/form-app.vue"
	if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key !== "__esModule"})) {console.error("named exports are not supported in *.vue files.")}
	if (Component.options.functional) {console.error("[vue-loader] form-app.vue: functional components are not supported with templates, they should use render functions.")}
	
	/* hot reload */
	if (false) {(function () {
	  var hotAPI = require("vue-hot-reload-api")
	  hotAPI.install(require("vue"), false)
	  if (!hotAPI.compatible) return
	  module.hot.accept()
	  if (!module.hot.data) {
	    hotAPI.createRecord("data-v-680d33ee", Component.options)
	  } else {
	    hotAPI.reload("data-v-680d33ee", Component.options)
	  }
	})()}
	
	module.exports = Component.exports


/***/ }),
/* 37 */
/***/ (function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag
	
	// load the styles
	var content = __webpack_require__(38);
	if(typeof content === 'string') content = [[module.id, content, '']];
	if(content.locals) module.exports = content.locals;
	// add the styles to the DOM
	var update = __webpack_require__(40)("36e5f87a", content, false);
	// Hot Module Replacement
	if(false) {
	 // When the styles change, update the <style> tags
	 if(!content.locals) {
	   module.hot.accept("!!../../node_modules/css-loader/index.js?sourceMap!../../node_modules/vue-loader/lib/style-rewriter.js?id=data-v-680d33ee&scoped=true!../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./form-app.vue", function() {
	     var newContent = require("!!../../node_modules/css-loader/index.js?sourceMap!../../node_modules/vue-loader/lib/style-rewriter.js?id=data-v-680d33ee&scoped=true!../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./form-app.vue");
	     if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
	     update(newContent);
	   });
	 }
	 // When the module is disposed, remove the <style> tags
	 module.hot.dispose(function() { update(); });
	}

/***/ }),
/* 38 */
/***/ (function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(39)();
	// imports
	
	
	// module
	exports.push([module.id, "\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n", "", {"version":3,"sources":[],"names":[],"mappings":"","file":"form-app.vue","sourceRoot":""}]);
	
	// exports


/***/ }),
/* 39 */
/***/ (function(module, exports) {

	"use strict";
	
	/*
		MIT License http://www.opensource.org/licenses/mit-license.php
		Author Tobias Koppers @sokra
	*/
	// css base code, injected by the css-loader
	module.exports = function () {
		var list = [];
	
		// return the list of modules as css string
		list.toString = function toString() {
			var result = [];
			for (var i = 0; i < this.length; i++) {
				var item = this[i];
				if (item[2]) {
					result.push("@media " + item[2] + "{" + item[1] + "}");
				} else {
					result.push(item[1]);
				}
			}
			return result.join("");
		};
	
		// import a list of modules into the list
		list.i = function (modules, mediaQuery) {
			if (typeof modules === "string") modules = [[null, modules, ""]];
			var alreadyImportedModules = {};
			for (var i = 0; i < this.length; i++) {
				var id = this[i][0];
				if (typeof id === "number") alreadyImportedModules[id] = true;
			}
			for (i = 0; i < modules.length; i++) {
				var item = modules[i];
				// skip already imported module
				// this implementation is not 100% perfect for weird media query combinations
				//  when a module is imported multiple times with different media queries.
				//  I hope this will never occur (Hey this way we have smaller bundles)
				if (typeof item[0] !== "number" || !alreadyImportedModules[item[0]]) {
					if (mediaQuery && !item[2]) {
						item[2] = mediaQuery;
					} else if (mediaQuery) {
						item[2] = "(" + item[2] + ") and (" + mediaQuery + ")";
					}
					list.push(item);
				}
			}
		};
		return list;
	};

/***/ }),
/* 40 */
/***/ (function(module, exports, __webpack_require__) {

	/*
	  MIT License http://www.opensource.org/licenses/mit-license.php
	  Author Tobias Koppers @sokra
	  Modified by Evan You @yyx990803
	*/
	
	var hasDocument = typeof document !== 'undefined'
	
	if (false) {
	  if (!hasDocument) {
	    throw new Error(
	    'vue-style-loader cannot be used in a non-browser environment. ' +
	    "Use { target: 'node' } in your Webpack config to indicate a server-rendering environment."
	  ) }
	}
	
	var listToStyles = __webpack_require__(41)
	
	/*
	type StyleObject = {
	  id: number;
	  parts: Array<StyleObjectPart>
	}
	
	type StyleObjectPart = {
	  css: string;
	  media: string;
	  sourceMap: ?string
	}
	*/
	
	var stylesInDom = {/*
	  [id: number]: {
	    id: number,
	    refs: number,
	    parts: Array<(obj?: StyleObjectPart) => void>
	  }
	*/}
	
	var head = hasDocument && (document.head || document.getElementsByTagName('head')[0])
	var singletonElement = null
	var singletonCounter = 0
	var isProduction = false
	var noop = function () {}
	
	// Force single-tag solution on IE6-9, which has a hard limit on the # of <style>
	// tags it will allow on a page
	var isOldIE = typeof navigator !== 'undefined' && /msie [6-9]\b/.test(navigator.userAgent.toLowerCase())
	
	module.exports = function (parentId, list, _isProduction) {
	  isProduction = _isProduction
	
	  var styles = listToStyles(parentId, list)
	  addStylesToDom(styles)
	
	  return function update (newList) {
	    var mayRemove = []
	    for (var i = 0; i < styles.length; i++) {
	      var item = styles[i]
	      var domStyle = stylesInDom[item.id]
	      domStyle.refs--
	      mayRemove.push(domStyle)
	    }
	    if (newList) {
	      styles = listToStyles(parentId, newList)
	      addStylesToDom(styles)
	    } else {
	      styles = []
	    }
	    for (var i = 0; i < mayRemove.length; i++) {
	      var domStyle = mayRemove[i]
	      if (domStyle.refs === 0) {
	        for (var j = 0; j < domStyle.parts.length; j++) {
	          domStyle.parts[j]()
	        }
	        delete stylesInDom[domStyle.id]
	      }
	    }
	  }
	}
	
	function addStylesToDom (styles /* Array<StyleObject> */) {
	  for (var i = 0; i < styles.length; i++) {
	    var item = styles[i]
	    var domStyle = stylesInDom[item.id]
	    if (domStyle) {
	      domStyle.refs++
	      for (var j = 0; j < domStyle.parts.length; j++) {
	        domStyle.parts[j](item.parts[j])
	      }
	      for (; j < item.parts.length; j++) {
	        domStyle.parts.push(addStyle(item.parts[j]))
	      }
	      if (domStyle.parts.length > item.parts.length) {
	        domStyle.parts.length = item.parts.length
	      }
	    } else {
	      var parts = []
	      for (var j = 0; j < item.parts.length; j++) {
	        parts.push(addStyle(item.parts[j]))
	      }
	      stylesInDom[item.id] = { id: item.id, refs: 1, parts: parts }
	    }
	  }
	}
	
	function createStyleElement () {
	  var styleElement = document.createElement('style')
	  styleElement.type = 'text/css'
	  head.appendChild(styleElement)
	  return styleElement
	}
	
	function addStyle (obj /* StyleObjectPart */) {
	  var update, remove
	  var styleElement = document.querySelector('style[data-vue-ssr-id~="' + obj.id + '"]')
	
	  if (styleElement) {
	    if (isProduction) {
	      // has SSR styles and in production mode.
	      // simply do nothing.
	      return noop
	    } else {
	      // has SSR styles but in dev mode.
	      // for some reason Chrome can't handle source map in server-rendered
	      // style tags - source maps in <style> only works if the style tag is
	      // created and inserted dynamically. So we remove the server rendered
	      // styles and inject new ones.
	      styleElement.parentNode.removeChild(styleElement)
	    }
	  }
	
	  if (isOldIE) {
	    // use singleton mode for IE9.
	    var styleIndex = singletonCounter++
	    styleElement = singletonElement || (singletonElement = createStyleElement())
	    update = applyToSingletonTag.bind(null, styleElement, styleIndex, false)
	    remove = applyToSingletonTag.bind(null, styleElement, styleIndex, true)
	  } else {
	    // use multi-style-tag mode in all other cases
	    styleElement = createStyleElement()
	    update = applyToTag.bind(null, styleElement)
	    remove = function () {
	      styleElement.parentNode.removeChild(styleElement)
	    }
	  }
	
	  update(obj)
	
	  return function updateStyle (newObj /* StyleObjectPart */) {
	    if (newObj) {
	      if (newObj.css === obj.css &&
	          newObj.media === obj.media &&
	          newObj.sourceMap === obj.sourceMap) {
	        return
	      }
	      update(obj = newObj)
	    } else {
	      remove()
	    }
	  }
	}
	
	var replaceText = (function () {
	  var textStore = []
	
	  return function (index, replacement) {
	    textStore[index] = replacement
	    return textStore.filter(Boolean).join('\n')
	  }
	})()
	
	function applyToSingletonTag (styleElement, index, remove, obj) {
	  var css = remove ? '' : obj.css
	
	  if (styleElement.styleSheet) {
	    styleElement.styleSheet.cssText = replaceText(index, css)
	  } else {
	    var cssNode = document.createTextNode(css)
	    var childNodes = styleElement.childNodes
	    if (childNodes[index]) styleElement.removeChild(childNodes[index])
	    if (childNodes.length) {
	      styleElement.insertBefore(cssNode, childNodes[index])
	    } else {
	      styleElement.appendChild(cssNode)
	    }
	  }
	}
	
	function applyToTag (styleElement, obj) {
	  var css = obj.css
	  var media = obj.media
	  var sourceMap = obj.sourceMap
	
	  if (media) {
	    styleElement.setAttribute('media', media)
	  }
	
	  if (sourceMap) {
	    // https://developer.chrome.com/devtools/docs/javascript-debugging
	    // this makes source maps inside style tags work properly in Chrome
	    css += '\n/*# sourceURL=' + sourceMap.sources[0] + ' */'
	    // http://stackoverflow.com/a/26603875
	    css += '\n/*# sourceMappingURL=data:application/json;base64,' + btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))) + ' */'
	  }
	
	  if (styleElement.styleSheet) {
	    styleElement.styleSheet.cssText = css
	  } else {
	    while (styleElement.firstChild) {
	      styleElement.removeChild(styleElement.firstChild)
	    }
	    styleElement.appendChild(document.createTextNode(css))
	  }
	}


/***/ }),
/* 41 */
/***/ (function(module, exports) {

	'use strict';
	
	/**
	 * Translates the list format produced by css-loader into something
	 * easier to manipulate.
	 */
	module.exports = function listToStyles(parentId, list) {
	  var styles = [];
	  var newStyles = {};
	  for (var i = 0; i < list.length; i++) {
	    var item = list[i];
	    var id = item[0];
	    var css = item[1];
	    var media = item[2];
	    var sourceMap = item[3];
	    var part = {
	      id: parentId + ':' + i,
	      css: css,
	      media: media,
	      sourceMap: sourceMap
	    };
	    if (!newStyles[id]) {
	      styles.push(newStyles[id] = { id: id, parts: [part] });
	    } else {
	      newStyles[id].parts.push(part);
	    }
	  }
	  return styles;
	};

/***/ }),
/* 42 */
/***/ (function(module, exports) {

	module.exports = function normalizeComponent (
	  rawScriptExports,
	  compiledTemplate,
	  scopeId,
	  cssModules
	) {
	  var esModule
	  var scriptExports = rawScriptExports = rawScriptExports || {}
	
	  // ES6 modules interop
	  var type = typeof rawScriptExports.default
	  if (type === 'object' || type === 'function') {
	    esModule = rawScriptExports
	    scriptExports = rawScriptExports.default
	  }
	
	  // Vue.extend constructor export interop
	  var options = typeof scriptExports === 'function'
	    ? scriptExports.options
	    : scriptExports
	
	  // render functions
	  if (compiledTemplate) {
	    options.render = compiledTemplate.render
	    options.staticRenderFns = compiledTemplate.staticRenderFns
	  }
	
	  // scopedId
	  if (scopeId) {
	    options._scopeId = scopeId
	  }
	
	  // inject cssModules
	  if (cssModules) {
	    var computed = options.computed || (options.computed = {})
	    Object.keys(cssModules).forEach(function (key) {
	      var module = cssModules[key]
	      computed[key] = function () { return module }
	    })
	  }
	
	  return {
	    esModule: esModule,
	    exports: scriptExports,
	    options: options
	  }
	}


/***/ }),
/* 43 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	
	var formBreadcrumbs = __webpack_require__(44),
	    formPart = __webpack_require__(49),
	    formResult = __webpack_require__(115),
	    formSubmitAuthModal = __webpack_require__(120),
	    formAuthModal = __webpack_require__(132),
	    formProfileModal = __webpack_require__(137),
	    formSuccessModal = __webpack_require__(142),
	    displayCondition = __webpack_require__(53);
	
	module.exports = {
	    props: ['form'],
	    components: {
	        'form-breadcrumbs': formBreadcrumbs,
	        'form-part': formPart,
	        'form-result': formResult,
	        'form-submit-auth-modal': formSubmitAuthModal,
	        'form-auth-modal': formAuthModal,
	        'form-profile-modal': formProfileModal,
	        'form-success-modal': formSuccessModal
	    },
	    computed: {
	        current: function current() {
	            return this.$store.state.current;
	        },
	        showSubmitAuthModal: function showSubmitAuthModal() {
	            return this.$store.state.showSubmitAuthModal;
	        },
	        showAuthModal: function showAuthModal() {
	            return this.$store.state.showAuthModal;
	        },
	        showProfileModal: function showProfileModal() {
	            return this.$store.state.showProfileModal;
	        },
	        showSuccessModal: function showSuccessModal() {
	            return this.$store.state.showSuccessModal;
	        }
	    },
	    methods: {
	        activeParts: function activeParts() {
	            //Method checks, if any parts displaying at this moment
	            var _this = this;
	            var results = [];
	
	            this.form.parts.forEach(function (part) {
	                results.push(displayCondition(part, _this.$store));
	            });
	
	            var remainingParts = results.splice(_this.current, results.length);
	
	            return !remainingParts.includes(true);
	        }
	    }
	};

/***/ }),
/* 44 */
/***/ (function(module, exports, __webpack_require__) {

	
	/* styles */
	__webpack_require__(45)
	
	var Component = __webpack_require__(42)(
	  /* script */
	  __webpack_require__(47),
	  /* template */
	  __webpack_require__(48),
	  /* scopeId */
	  "data-v-7af5161d",
	  /* cssModules */
	  null
	)
	Component.options.__file = "/Users/alexey/PhpstormProjects/nenaprasno-frontend/public/assets/screen/app/components/form-breadcrumbs.vue"
	if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key !== "__esModule"})) {console.error("named exports are not supported in *.vue files.")}
	if (Component.options.functional) {console.error("[vue-loader] form-breadcrumbs.vue: functional components are not supported with templates, they should use render functions.")}
	
	/* hot reload */
	if (false) {(function () {
	  var hotAPI = require("vue-hot-reload-api")
	  hotAPI.install(require("vue"), false)
	  if (!hotAPI.compatible) return
	  module.hot.accept()
	  if (!module.hot.data) {
	    hotAPI.createRecord("data-v-7af5161d", Component.options)
	  } else {
	    hotAPI.reload("data-v-7af5161d", Component.options)
	  }
	})()}
	
	module.exports = Component.exports


/***/ }),
/* 45 */
/***/ (function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag
	
	// load the styles
	var content = __webpack_require__(46);
	if(typeof content === 'string') content = [[module.id, content, '']];
	if(content.locals) module.exports = content.locals;
	// add the styles to the DOM
	var update = __webpack_require__(40)("33a9e946", content, false);
	// Hot Module Replacement
	if(false) {
	 // When the styles change, update the <style> tags
	 if(!content.locals) {
	   module.hot.accept("!!../../node_modules/css-loader/index.js?sourceMap!../../node_modules/vue-loader/lib/style-rewriter.js?id=data-v-7af5161d&scoped=true!../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./form-breadcrumbs.vue", function() {
	     var newContent = require("!!../../node_modules/css-loader/index.js?sourceMap!../../node_modules/vue-loader/lib/style-rewriter.js?id=data-v-7af5161d&scoped=true!../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./form-breadcrumbs.vue");
	     if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
	     update(newContent);
	   });
	 }
	 // When the module is disposed, remove the <style> tags
	 module.hot.dispose(function() { update(); });
	}

/***/ }),
/* 46 */
/***/ (function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(39)();
	// imports
	
	
	// module
	exports.push([module.id, "\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n", "", {"version":3,"sources":[],"names":[],"mappings":"","file":"form-breadcrumbs.vue","sourceRoot":""}]);
	
	// exports


/***/ }),
/* 47 */
/***/ (function(module, exports) {

	'use strict';
	
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	
	module.exports = {
	    data: function data() {
	        return {};
	    },
	
	    props: ['current', 'form'],
	    computed: {
	        breadcrumbs: function breadcrumbs() {
	            var breadcrumbs = [];
	
	            if (this.form.parts) {
	                this.form.parts.forEach(function (v) {
	                    breadcrumbs.push({
	                        "title": v.title,
	                        "class": v.class
	                    });
	                });
	            }
	
	            if (this.form.resultPart) {
	                breadcrumbs.push({
	                    "title": "Результаты",
	                    "class": "form-breadcrumbs-item-results"
	                });
	            }
	            return breadcrumbs;
	        }
	    }
	};

/***/ }),
/* 48 */
/***/ (function(module, exports, __webpack_require__) {

	module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
	  return _c('div', {
	    staticClass: "form-breadcrumbs"
	  }, [_c('div', {
	    staticClass: "form-breadcrumbs-list"
	  }, _vm._l((_vm.breadcrumbs), function(breadcrumb, index) {
	    return _c('div', {
	      staticClass: "form-breadcrumbs-item",
	      class: 'form-breadcrumb-item-' + index +
	        (index < _vm.current ? ' form-breadcrumbs-item-done ' : '') +
	        (index == _vm.current ? ' form-breadcrumbs-item-active ' : '') +
	        (index == _vm.current + 1 ? ' form-breadcrumbs-item-next ' : '') +
	        ' ' + breadcrumb.class
	    }, [_c('span', {
	      staticClass: "form-breadcrumbs-item-value"
	    }, [_vm._v("\n                " + _vm._s(breadcrumb.title) + "\n            ")])])
	  }))])
	},staticRenderFns: []}
	module.exports.render._withStripped = true
	if (false) {
	  module.hot.accept()
	  if (module.hot.data) {
	     require("vue-hot-reload-api").rerender("data-v-7af5161d", module.exports)
	  }
	}

/***/ }),
/* 49 */
/***/ (function(module, exports, __webpack_require__) {

	
	/* styles */
	__webpack_require__(50)
	
	var Component = __webpack_require__(42)(
	  /* script */
	  __webpack_require__(52),
	  /* template */
	  __webpack_require__(114),
	  /* scopeId */
	  "data-v-c51e4814",
	  /* cssModules */
	  null
	)
	Component.options.__file = "/Users/alexey/PhpstormProjects/nenaprasno-frontend/public/assets/screen/app/components/form-part.vue"
	if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key !== "__esModule"})) {console.error("named exports are not supported in *.vue files.")}
	if (Component.options.functional) {console.error("[vue-loader] form-part.vue: functional components are not supported with templates, they should use render functions.")}
	
	/* hot reload */
	if (false) {(function () {
	  var hotAPI = require("vue-hot-reload-api")
	  hotAPI.install(require("vue"), false)
	  if (!hotAPI.compatible) return
	  module.hot.accept()
	  if (!module.hot.data) {
	    hotAPI.createRecord("data-v-c51e4814", Component.options)
	  } else {
	    hotAPI.reload("data-v-c51e4814", Component.options)
	  }
	})()}
	
	module.exports = Component.exports


/***/ }),
/* 50 */
/***/ (function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag
	
	// load the styles
	var content = __webpack_require__(51);
	if(typeof content === 'string') content = [[module.id, content, '']];
	if(content.locals) module.exports = content.locals;
	// add the styles to the DOM
	var update = __webpack_require__(40)("070bd40f", content, false);
	// Hot Module Replacement
	if(false) {
	 // When the styles change, update the <style> tags
	 if(!content.locals) {
	   module.hot.accept("!!../../node_modules/css-loader/index.js?sourceMap!../../node_modules/vue-loader/lib/style-rewriter.js?id=data-v-c51e4814&scoped=true!../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./form-part.vue", function() {
	     var newContent = require("!!../../node_modules/css-loader/index.js?sourceMap!../../node_modules/vue-loader/lib/style-rewriter.js?id=data-v-c51e4814&scoped=true!../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./form-part.vue");
	     if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
	     update(newContent);
	   });
	 }
	 // When the module is disposed, remove the <style> tags
	 module.hot.dispose(function() { update(); });
	}

/***/ }),
/* 51 */
/***/ (function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(39)();
	// imports
	
	
	// module
	exports.push([module.id, "\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n", "", {"version":3,"sources":[],"names":[],"mappings":"","file":"form-part.vue","sourceRoot":""}]);
	
	// exports


/***/ }),
/* 52 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	
	var config = __webpack_require__(10),
	    displayCondition = __webpack_require__(53),
	    pageValidation = __webpack_require__(54),
	    formSubmit = __webpack_require__(55),
	    formSection = __webpack_require__(57);
	
	module.exports = {
	    props: ['part', 'index'],
	    components: {
	        'form-section': formSection
	    },
	    computed: {
	        current: function current() {
	            return this.$store.state.current;
	        },
	        totalParts: function totalParts() {
	            return this.$store.state.totalParts;
	        },
	        totalSections: function totalSections() {
	            return this.$store.state.totalSections;
	        },
	        display: function display() {
	            return displayCondition(this.part, this.$store);
	        }
	    },
	    methods: {
	        changeStep: function changeStep(action, validate) {
	            if (validate && pageValidation(this.part, this.$store) || validate == false) {
	                this.$store.dispatch('changeStep', action);
	                // Scrolling to top of next page
	                this.$root.$el.scrollIntoView(true);
	            } else {
	                console.log(this.part);
	            }
	        },
	        submitForm: function submitForm() {
	            if (pageValidation(this.part, this.$store)) {
	                var _this = this;
	
	                formSubmit(_this).then(function (response) {
	                    alert(config.messages.successFormPost);
	
	                    if (!_this.$store.state.user || _this.$store.state.user.isAnonymous) {
	                        _this.$store.commit('setSubmitAuthModal', true);
	                    }
	
	                    _this.$store.commit('setFormResponse', response.data);
	
	                    // Go to form result page
	                    _this.$store.dispatch('changeStep', 'next');
	
	                    if (!_this.$store.state.user.isAnonymous) {
	                        _this.$store.commit('setSuccessModal', true);
	
	                        setTimeout(function () {
	                            _this.$store.state.form = {};
	                            _this.$store.state.user = {};
	                            _this.$store.state.userProfile = {};
	                            window.sessionStorage.clear();
	                        }, 2000);
	
	                        setTimeout(function () {
	                            window.location.replace(config.cabinetURL);
	                        }, 5000);
	                    }
	                }).catch(function (error) {
	                    alert(config.messages.errorSendingFormResults);
	
	                    if (error.response) {
	                        // The request was made, but the server responded with a status code
	                        // that falls out of the range of 2xx
	                        console.log(error.response.data);
	                        console.log(error.response.status);
	                        console.log(error.response.headers);
	                    } else {
	                        // Something happened in setting up the request that triggered an Error
	                        console.log('Error', error.message);
	                    }
	                    console.log(error.config);
	                });
	            }
	        }
	    }
	};

/***/ }),
/* 53 */
/***/ (function(module, exports) {

	"use strict";
	
	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };
	
	function findInStore(id, $store) {
	    return $store.state.form.data.filter(function (v) {
	        return v.controlId == id;
	    })[0];
	}
	
	function displayCondition(el, $store) {
	    var result = true,
	        conditions = el.displayCondition,
	        displayResults = [];
	
	    if (conditions) {
	        Object.keys(conditions).forEach(function (conditionName) {
	            var conditionValue = conditions[conditionName];
	
	            // TODO: More complex conditions
	            switch (conditionName) {
	                case '$or':
	                    var $orResults = false;
	
	                    $store.state.form.data.forEach(function (c) {
	                        conditionValue.forEach(function (input) {
	                            var inputId = Object.keys(input)[0],
	                                inputVal = input[inputId];
	
	                            if (inputId == c.controlId && inputVal == c.value) {
	                                $orResults = true;
	                            }
	                        });
	                    });
	
	                    displayResults.push($orResults);
	
	                    break;
	
	                // There will be functions maybe
	                case '$func':
	                    //Temp
	                    displayResults.push(true);
	                    break;
	
	                // Simple conditions, like: "displayCondition":
	                //
	                // "control-id": 1
	                //
	                //--------------------------------
	                //
	                // "control-id": {
	                //    "$in": [1,2,3,4,5,6,7]
	                // }
	                //
	                //--------------------------------
	                //
	                // "control-id": {
	                //    "$nin": [1,2,3,4,5,6,7]
	                // }
	                //
	                default:
	                    var subResult = false;
	
	                    if ((typeof conditionValue === 'undefined' ? 'undefined' : _typeof(conditionValue)) == 'object') {
	                        switch (Object.keys(conditionValue)[0]) {
	                            case '$in':
	                                var $inResults = findInStore(conditionName, $store);
	                                if ($inResults) {
	                                    if (Array.isArray($inResults.value) && $inResults.value.length > 0) {
	                                        subResult = conditionValue['$in'].some(function (r) {
	                                            return $inResults.value.indexOf(r) > -1;
	                                        });
	                                    } else {
	                                        subResult = conditionValue['$in'].indexOf($inResults.value) >= 0;
	                                    }
	                                }
	                                break;
	
	                            case '$nin':
	                                var $ninResults = findInStore(conditionName, $store);
	                                if ($ninResults) {
	                                    if (Array.isArray($ninResults.value) && $ninResults.value.length > 0) {
	                                        subResult = conditionValue['$nin'].some(function (r) {
	                                            return $ninResults.value.indexOf(r) < 0;
	                                        });
	                                    } else {
	                                        subResult = conditionValue['$nin'].indexOf($ninResults.value) < 0;
	                                    }
	                                }
	                                break;
	
	                            // Greater than
	                            case '$gt':
	                                var $gtResults = findInStore(conditionName, $store);
	                                console.log('$gtResults', $gtResults);
	
	                                if ($gtResults) {
	                                    subResult = $gtResults.value > conditionValue['$gt'];
	                                }
	
	                                console.log(subResult);
	
	                                break;
	
	                            // Greater than or equal
	                            case '$gte':
	                                var $gteResults = findInStore(conditionName, $store);
	                                console.log('$gteResults', $gteResults);
	
	                                if ($gteResults) {
	                                    subResult = $gteResults.value >= conditionValue['$gte'];
	                                }
	
	                                console.log(subResult);
	
	                                break;
	
	                            // Less than
	                            case '$lt':
	                                var $ltResults = findInStore(conditionName, $store);
	                                console.log('$ltResults', $ltResults);
	
	                                if ($ltResults) {
	                                    subResult = $ltResults.value < conditionValue['$lt'];
	                                }
	
	                                console.log(subResult);
	
	                                break;
	
	                            // Less than or equal
	                            case '$lte':
	                                var $lteResults = findInStore(conditionName, $store);
	                                console.log('$lteResults', $lteResults);
	
	                                if ($lteResults) {
	                                    subResult = $lteResults.value <= conditionValue['$lte'];
	                                }
	
	                                console.log(subResult);
	
	                                break;
	
	                            // Contains all values
	                            case '$contains':
	                                var $containsResults = findInStore(conditionName, $store);
	                                console.log('$containsResults', $containsResults);
	
	                                if ($containsResults) {
	                                    if (Array.isArray($containsResults.value) && $containsResults.value.length > 0) {
	                                        subResult = conditionValue['$contains'].every(function (r) {
	                                            return $containsResults.value.indexOf(r) > -1;
	                                        });
	                                    } else {
	                                        subResult = conditionValue['$contains'].indexOf($containsResults.value) >= 0;
	                                    }
	                                }
	
	                                console.log(subResult);
	
	                                break;
	                        }
	                    } else {
	                        $store.state.form.data.forEach(function (c) {
	                            if (conditionName == c.controlId && conditionValue == c.value) {
	                                subResult = true;
	                            }
	                        });
	                    }
	
	                    displayResults.push(subResult);
	
	                    break;
	            }
	
	            if (displayResults.indexOf(false) < 0) {
	                console.log('Display results of element: "' + (el.title ? el.title : '') + '" ' + el.id + ' \u2014 %c' + displayResults, "font-weight: bold; color: green;");
	            } else {
	                console.log('Display results of element: "' + (el.title ? el.title : '') + '" ' + el.id + ' \u2014 %c' + displayResults, "font-weight: bold; color: red;");
	            }
	        });
	
	        result = displayResults.indexOf(false) === -1;
	    } else {
	        result = true;
	    }
	
	    return result;
	}
	
	module.exports = displayCondition;

/***/ }),
/* 54 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	
	var displayCondition = __webpack_require__(53);
	
	function pageValidation(page, $store) {
	    console.log('Validating page...');
	
	    var validateResult = true;
	    var firstUnvalidControl = void 0;
	
	    //TODO: make validation for sections
	    page.sections.forEach(function (section) {
	        if (displayCondition(section, $store)) {
	            section.groups.forEach(function (group) {
	                if (group.controls && displayCondition(group, $store)) {
	                    group.controls.forEach(function (control) {
	                        // Show errors on all page controls
	                        $store.commit('setControlShowErrors', {
	                            id: control.id,
	                            showErrors: true
	                        });
	
	                        var unvalidControl = $store.state.form.data.filter(function (v) {
	                            return v.controlId == control.id && !v.valid && v.display;
	                        });
	
	                        if (unvalidControl.length > 0) {
	                            console.log('Unvalid control:');
	                            console.dir(unvalidControl);
	                            validateResult = false;
	
	                            if (!firstUnvalidControl) {
	                                firstUnvalidControl = unvalidControl;
	                            }
	                        }
	                    });
	                }
	            });
	        }
	    });
	
	    console.log('Page validation result: %c' + validateResult,  true ? 'color: green;' : 'color: red;');
	
	    //Scroll to first unvalid control on page
	    if (firstUnvalidControl) {
	        console.log(document.getElementById(firstUnvalidControl[0].controlId));
	        document.getElementById(firstUnvalidControl[0].controlId).scrollIntoView(true);
	    }
	
	    return validateResult;
	}
	
	module.exports = pageValidation;

/***/ }),
/* 55 */
/***/ (function(module, exports, __webpack_require__) {

	"use strict";
	
	var config = __webpack_require__(10);
	var formAPI = __webpack_require__(56);
	
	function formSubmit(vm) {
	    //Prepare form results
	    var form = JSON.parse(JSON.stringify(vm.$store.state.form));
	
	    form.formId = vm.$root.formData.id;
	    form.userId = vm.$store.state.user.userId;
	
	    delete form.diseases;
	    delete form.medicalProcedures;
	    delete form.formResponse;
	
	    form.data.forEach(function (control) {
	        delete control.display;
	        delete control.errorMessages;
	        delete control.showErrors;
	        delete control.valid;
	
	        if (control.controlType === 'checkBoxList') {
	            if (control.value === null || control.value.length === 0) {
	                control.value = {
	                    value: [],
	                    $type: "decimal[]"
	                };
	            }
	        }
	
	        if (control.options) {
	            control.options = control.options.value;
	
	            control.options.forEach(function (option) {
	                delete option.class;
	                delete option.displayCondition;
	            });
	        }
	    });
	
	    form.resultData.forEach(function (control) {
	        delete control.display;
	        delete control.errorMessages;
	        delete control.showErrors;
	        delete control.valid;
	
	        if (control.controlType === 'checkBoxList') {
	            if (control.value === null || control.value.length === 0) {
	                control.value = {
	                    value: [],
	                    $type: "decimal[]"
	                };
	            }
	        }
	
	        if (control.options) {
	            control.options = control.options.value;
	
	            control.options.forEach(function (option) {
	                delete option.class;
	                delete option.displayCondition;
	            });
	        }
	    });
	
	    console.log("Form data submit: ");
	    console.log(JSON.stringify(form));
	
	    return formAPI.saveFormResults(JSON.stringify(form), vm.$store.state.user.sessionId);
	}
	
	module.exports = formSubmit;

/***/ }),
/* 56 */
/***/ (function(module, exports, __webpack_require__) {

	"use strict";
	
	var config = __webpack_require__(10);
	var axios = __webpack_require__(11);
	
	var instance = axios.create({
	    baseURL: config.apiUrl,
	    timeout: 10000,
	    headers: {
	        "Content-Type": "application/json",
	        "Accept": "application/json"
	    }
	});
	
	var form = {
	    getFormById: function getFormById(formId, token) {
	        return instance.get('/forms/' + formId, {
	            headers: {
	                "Content-Type": "application/json",
	                'X-Appercode-Session-Token': token
	            }
	        });
	    },
	    getDiseases: function getDiseases(token) {
	        return instance.get('/objects/Disease', {
	            headers: {
	                "Content-Type": "application/json",
	                'X-Appercode-Session-Token': token
	            }
	        });
	    },
	    getMedicalProcedures: function getMedicalProcedures(token) {
	        return instance.get('/objects/MedicalProcedure', {
	            headers: {
	                "Content-Type": "application/json",
	                'X-Appercode-Session-Token': token
	            }
	        });
	    },
	    saveFormResults: function saveFormResults(result, token) {
	        return instance.post('testResult/FormResponce?recommendation=true', result, {
	            headers: {
	                "Content-Type": "application/json",
	                'X-Appercode-Session-Token': token
	            }
	        });
	    }
	};
	
	module.exports = form;

/***/ }),
/* 57 */
/***/ (function(module, exports, __webpack_require__) {

	
	/* styles */
	__webpack_require__(58)
	
	var Component = __webpack_require__(42)(
	  /* script */
	  __webpack_require__(60),
	  /* template */
	  __webpack_require__(113),
	  /* scopeId */
	  "data-v-d5fb579c",
	  /* cssModules */
	  null
	)
	Component.options.__file = "/Users/alexey/PhpstormProjects/nenaprasno-frontend/public/assets/screen/app/components/form-section.vue"
	if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key !== "__esModule"})) {console.error("named exports are not supported in *.vue files.")}
	if (Component.options.functional) {console.error("[vue-loader] form-section.vue: functional components are not supported with templates, they should use render functions.")}
	
	/* hot reload */
	if (false) {(function () {
	  var hotAPI = require("vue-hot-reload-api")
	  hotAPI.install(require("vue"), false)
	  if (!hotAPI.compatible) return
	  module.hot.accept()
	  if (!module.hot.data) {
	    hotAPI.createRecord("data-v-d5fb579c", Component.options)
	  } else {
	    hotAPI.reload("data-v-d5fb579c", Component.options)
	  }
	})()}
	
	module.exports = Component.exports


/***/ }),
/* 58 */
/***/ (function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag
	
	// load the styles
	var content = __webpack_require__(59);
	if(typeof content === 'string') content = [[module.id, content, '']];
	if(content.locals) module.exports = content.locals;
	// add the styles to the DOM
	var update = __webpack_require__(40)("dda84f8e", content, false);
	// Hot Module Replacement
	if(false) {
	 // When the styles change, update the <style> tags
	 if(!content.locals) {
	   module.hot.accept("!!../../node_modules/css-loader/index.js?sourceMap!../../node_modules/vue-loader/lib/style-rewriter.js?id=data-v-d5fb579c&scoped=true!../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./form-section.vue", function() {
	     var newContent = require("!!../../node_modules/css-loader/index.js?sourceMap!../../node_modules/vue-loader/lib/style-rewriter.js?id=data-v-d5fb579c&scoped=true!../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./form-section.vue");
	     if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
	     update(newContent);
	   });
	 }
	 // When the module is disposed, remove the <style> tags
	 module.hot.dispose(function() { update(); });
	}

/***/ }),
/* 59 */
/***/ (function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(39)();
	// imports
	
	
	// module
	exports.push([module.id, "\n\n\n\n\n\n\n\n\n", "", {"version":3,"sources":[],"names":[],"mappings":"","file":"form-section.vue","sourceRoot":""}]);
	
	// exports


/***/ }),
/* 60 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	
	var displayCondition = __webpack_require__(53);
	var formGroup = __webpack_require__(61);
	
	module.exports = {
	    props: ['section', 'index'],
	    components: {
	        'form-group': formGroup
	    },
	    computed: {
	        display: function display() {
	            return displayCondition(this.section, this.$store);
	        }
	    }
	};

/***/ }),
/* 61 */
/***/ (function(module, exports, __webpack_require__) {

	
	/* styles */
	__webpack_require__(62)
	
	var Component = __webpack_require__(42)(
	  /* script */
	  __webpack_require__(64),
	  /* template */
	  __webpack_require__(112),
	  /* scopeId */
	  "data-v-26ba380c",
	  /* cssModules */
	  null
	)
	Component.options.__file = "/Users/alexey/PhpstormProjects/nenaprasno-frontend/public/assets/screen/app/components/form-group.vue"
	if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key !== "__esModule"})) {console.error("named exports are not supported in *.vue files.")}
	if (Component.options.functional) {console.error("[vue-loader] form-group.vue: functional components are not supported with templates, they should use render functions.")}
	
	/* hot reload */
	if (false) {(function () {
	  var hotAPI = require("vue-hot-reload-api")
	  hotAPI.install(require("vue"), false)
	  if (!hotAPI.compatible) return
	  module.hot.accept()
	  if (!module.hot.data) {
	    hotAPI.createRecord("data-v-26ba380c", Component.options)
	  } else {
	    hotAPI.reload("data-v-26ba380c", Component.options)
	  }
	})()}
	
	module.exports = Component.exports


/***/ }),
/* 62 */
/***/ (function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag
	
	// load the styles
	var content = __webpack_require__(63);
	if(typeof content === 'string') content = [[module.id, content, '']];
	if(content.locals) module.exports = content.locals;
	// add the styles to the DOM
	var update = __webpack_require__(40)("15a85d81", content, false);
	// Hot Module Replacement
	if(false) {
	 // When the styles change, update the <style> tags
	 if(!content.locals) {
	   module.hot.accept("!!../../node_modules/css-loader/index.js?sourceMap!../../node_modules/vue-loader/lib/style-rewriter.js?id=data-v-26ba380c&scoped=true!../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./form-group.vue", function() {
	     var newContent = require("!!../../node_modules/css-loader/index.js?sourceMap!../../node_modules/vue-loader/lib/style-rewriter.js?id=data-v-26ba380c&scoped=true!../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./form-group.vue");
	     if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
	     update(newContent);
	   });
	 }
	 // When the module is disposed, remove the <style> tags
	 module.hot.dispose(function() { update(); });
	}

/***/ }),
/* 63 */
/***/ (function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(39)();
	// imports
	
	
	// module
	exports.push([module.id, "\n\n\n\n\n\n\n\n\n", "", {"version":3,"sources":[],"names":[],"mappings":"","file":"form-group.vue","sourceRoot":""}]);
	
	// exports


/***/ }),
/* 64 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	
	var displayCondition = __webpack_require__(53);
	var formControl = __webpack_require__(65);
	
	module.exports = {
	    props: ['group', 'index'],
	    components: {
	        'form-control': formControl
	    },
	    computed: {
	        display: function display() {
	            return displayCondition(this.group, this.$store);
	        }
	    }
	};

/***/ }),
/* 65 */
/***/ (function(module, exports, __webpack_require__) {

	
	/* styles */
	__webpack_require__(66)
	
	var Component = __webpack_require__(42)(
	  /* script */
	  __webpack_require__(68),
	  /* template */
	  __webpack_require__(111),
	  /* scopeId */
	  "data-v-0c823eaa",
	  /* cssModules */
	  null
	)
	Component.options.__file = "/Users/alexey/PhpstormProjects/nenaprasno-frontend/public/assets/screen/app/components/form-control.vue"
	if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key !== "__esModule"})) {console.error("named exports are not supported in *.vue files.")}
	if (Component.options.functional) {console.error("[vue-loader] form-control.vue: functional components are not supported with templates, they should use render functions.")}
	
	/* hot reload */
	if (false) {(function () {
	  var hotAPI = require("vue-hot-reload-api")
	  hotAPI.install(require("vue"), false)
	  if (!hotAPI.compatible) return
	  module.hot.accept()
	  if (!module.hot.data) {
	    hotAPI.createRecord("data-v-0c823eaa", Component.options)
	  } else {
	    hotAPI.reload("data-v-0c823eaa", Component.options)
	  }
	})()}
	
	module.exports = Component.exports


/***/ }),
/* 66 */
/***/ (function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag
	
	// load the styles
	var content = __webpack_require__(67);
	if(typeof content === 'string') content = [[module.id, content, '']];
	if(content.locals) module.exports = content.locals;
	// add the styles to the DOM
	var update = __webpack_require__(40)("65fa6fa7", content, false);
	// Hot Module Replacement
	if(false) {
	 // When the styles change, update the <style> tags
	 if(!content.locals) {
	   module.hot.accept("!!../../node_modules/css-loader/index.js?sourceMap!../../node_modules/vue-loader/lib/style-rewriter.js?id=data-v-0c823eaa&scoped=true!../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./form-control.vue", function() {
	     var newContent = require("!!../../node_modules/css-loader/index.js?sourceMap!../../node_modules/vue-loader/lib/style-rewriter.js?id=data-v-0c823eaa&scoped=true!../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./form-control.vue");
	     if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
	     update(newContent);
	   });
	 }
	 // When the module is disposed, remove the <style> tags
	 module.hot.dispose(function() { update(); });
	}

/***/ }),
/* 67 */
/***/ (function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(39)();
	// imports
	
	
	// module
	exports.push([module.id, "\n\n\n\n\n\n\n\n", "", {"version":3,"sources":[],"names":[],"mappings":"","file":"form-control.vue","sourceRoot":""}]);
	
	// exports


/***/ }),
/* 68 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	
	var displayCondition = __webpack_require__(53),
	    controlValidation = __webpack_require__(69),
	    formRadioButtons = __webpack_require__(70),
	    formTextBlock = __webpack_require__(75),
	    formTextBox = __webpack_require__(80),
	    formNumberInput = __webpack_require__(85),
	    formDateTimePicker = __webpack_require__(90),
	    formCheckbox = __webpack_require__(95),
	    formCheckboxList = __webpack_require__(100),
	    formComboBox = __webpack_require__(105);
	
	module.exports = {
	    components: {
	        'form-radioButtons': formRadioButtons,
	        'form-textBlock': formTextBlock,
	        'form-textBox': formTextBox,
	        'form-numberInput': formNumberInput,
	        'form-dateTimePicker': formDateTimePicker,
	        'form-checkBox': formCheckbox,
	        'form-checkBoxList': formCheckboxList,
	        'form-comboBox': formComboBox
	    },
	    props: ['control', 'index'],
	    data: function data() {
	        return {
	            value: null,
	            valid: false
	        };
	    },
	
	    computed: {
	        showErrors: function showErrors() {
	            var _this = this;
	            return this.$store.state.form.data.filter(function (ctrl) {
	                return ctrl.controlId == _this.control.id;
	            })[0].showErrors;
	        },
	        display: function display() {
	            var _this = this;
	            var display = displayCondition(this.control, this.$store);
	            var ctrl = this.$store.state.form.data.filter(function (ctrl) {
	                return ctrl.controlId == _this.control.id;
	            });
	
	            _this.$store.commit('setControlDisplay', {
	                id: _this.control.id,
	                display: display
	            });
	
	            return display;
	        }
	    },
	    methods: {
	        fetchControl: function fetchControl() {
	            var _this = this;
	            var ctrl = this.$store.state.form.data.filter(function (ctrl) {
	                return ctrl.controlId == _this.control.id;
	            });
	
	            if (ctrl.length) {
	                _this.value = ctrl[0].value;
	                _this.valid = ctrl[0].valid;
	                _this.showErrors = ctrl[0].showErrors;
	            }
	        },
	        validate: function validate() {
	            this.valid = controlValidation(this);
	        }
	    },
	    watch: {
	        value: function value(val, oldVal) {
	            console.log(val, oldVal);
	            if (oldVal !== val) {
	                this.validate();
	
	                this.$store.commit('setControlValue', {
	                    id: this.control.id,
	                    value: val
	                });
	
	                this.showErrors = true;
	
	                this.$store.commit('setControlShowErrors', {
	                    id: this.control.id,
	                    showErrors: true
	                });
	            }
	        }
	    },
	    mounted: function mounted() {
	        this.fetchControl();
	        this.validate();
	    }
	};

/***/ }),
/* 69 */
/***/ (function(module, exports) {

	"use strict";
	
	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };
	
	function regexpValidate(re, val) {
	    var regExp = new RegExp(re);
	    return regExp.test(val);
	}
	
	function $value(controlId, component) {
	    return component.$store.state.form.data.filter(function (v) {
	        return v.controlId == controlId;
	    })[0].value;
	}
	
	function controlValidation(component) {
	    var result = false,
	        conditions = component.control.validateConditions,
	        conditionsResults = [],
	        errorMessages = [],
	        componentValue = component.value;
	
	    console.info("Control changed/mounted, validating \"%c" + component.control.id + "\"", "font-weight: bold;");
	
	    if (conditions) {
	        Object.keys(conditions).forEach(function (conditionIndex) {
	            var condition = conditions[conditionIndex],
	                conditionResult = void 0,
	                boolExp = condition.booleanExpression,
	                errorMessage = condition.errorMessage;
	
	            if (boolExp) {
	                Object.keys(boolExp).forEach(function (expr) {
	                    switch (expr) {
	                        //Lesser than
	                        case "$lt":
	                            console.log(componentValue, ' < ', boolExp[expr]);
	                            conditionResult = componentValue < boolExp[expr];
	                            break;
	
	                        //Lesser than or equal
	                        case "$lte":
	                            if (_typeof(boolExp[expr]) === 'object') {
	                                var val = $value(boolExp[expr]['$value'], component);
	                                conditionResult = componentValue <= val;
	                                console.log(componentValue, ' <= ', val);
	                            } else {
	                                conditionResult = componentValue <= boolExp[expr];
	                                console.log(componentValue, ' <= ', boolExp[expr]);
	                            }
	
	                            break;
	
	                        //Greater than
	                        case "$gt":
	                            console.log(componentValue, ' > ', boolExp[expr]);
	                            conditionResult = componentValue > boolExp[expr];
	                            break;
	
	                        //Greater than or equal
	                        case "$gte":
	                            if (_typeof(boolExp[expr]) === 'object') {
	                                var _val = $value(boolExp[expr]['$value'], component);
	                                conditionResult = componentValue <= _val;
	                                console.log(componentValue, ' <= ', _val);
	                            } else {
	                                console.log(componentValue, ' >= ', boolExp[expr]);
	                                conditionResult = componentValue >= boolExp[expr];
	                            }
	                            break;
	
	                        //Value is in array
	                        case "$in":
	                            conditionResult = boolExp[expr].includes(componentValue);
	                            console.log(componentValue + conditionResult ? " is in " : " not in " + boolExp[expr]);
	                            break;
	
	                        //Regular expression
	                        case "$regex":
	                            conditionResult = regexpValidate(boolExp[expr], componentValue);
	                            console.log('$regex: ' + conditionResult);
	                            break;
	                    }
	
	                    conditionsResults.push(conditionResult);
	
	                    if (!conditionResult && errorMessage) {
	                        errorMessages.push(errorMessage);
	                    }
	                });
	            }
	        });
	
	        result = conditionsResults.indexOf(false) === -1;
	
	        if (result) {
	            console.log("Results of validation: %c" + component.control.id + " \u2014 %c" + result, "font-weight: bold;", "color: green;");
	        } else {
	            console.log("Results of validation: %c" + component.control.id + " \u2014 %c" + result, "font-weight: bold;", "color: red;");
	            console.log("Error messages: %c" + component.control.id + " \u2014 " + errorMessages, "font-weight: bold");
	        }
	    } else {
	        result = true;
	    }
	
	    component.control.valid = result;
	    component.control.errorMessages = errorMessages;
	
	    var newControl = {
	        id: component.control.id,
	        valid: result
	    };
	
	    component.$store.commit('setControlValid', newControl);
	
	    return result;
	}
	
	module.exports = controlValidation;

/***/ }),
/* 70 */
/***/ (function(module, exports, __webpack_require__) {

	
	/* styles */
	__webpack_require__(71)
	
	var Component = __webpack_require__(42)(
	  /* script */
	  __webpack_require__(73),
	  /* template */
	  __webpack_require__(74),
	  /* scopeId */
	  "data-v-79311a2c",
	  /* cssModules */
	  null
	)
	Component.options.__file = "/Users/alexey/PhpstormProjects/nenaprasno-frontend/public/assets/screen/app/components/controls/form-radioButtons.vue"
	if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key !== "__esModule"})) {console.error("named exports are not supported in *.vue files.")}
	if (Component.options.functional) {console.error("[vue-loader] form-radioButtons.vue: functional components are not supported with templates, they should use render functions.")}
	
	/* hot reload */
	if (false) {(function () {
	  var hotAPI = require("vue-hot-reload-api")
	  hotAPI.install(require("vue"), false)
	  if (!hotAPI.compatible) return
	  module.hot.accept()
	  if (!module.hot.data) {
	    hotAPI.createRecord("data-v-79311a2c", Component.options)
	  } else {
	    hotAPI.reload("data-v-79311a2c", Component.options)
	  }
	})()}
	
	module.exports = Component.exports


/***/ }),
/* 71 */
/***/ (function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag
	
	// load the styles
	var content = __webpack_require__(72);
	if(typeof content === 'string') content = [[module.id, content, '']];
	if(content.locals) module.exports = content.locals;
	// add the styles to the DOM
	var update = __webpack_require__(40)("4730fc3f", content, false);
	// Hot Module Replacement
	if(false) {
	 // When the styles change, update the <style> tags
	 if(!content.locals) {
	   module.hot.accept("!!../../../node_modules/css-loader/index.js?sourceMap!../../../node_modules/vue-loader/lib/style-rewriter.js?id=data-v-79311a2c&scoped=true!../../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./form-radioButtons.vue", function() {
	     var newContent = require("!!../../../node_modules/css-loader/index.js?sourceMap!../../../node_modules/vue-loader/lib/style-rewriter.js?id=data-v-79311a2c&scoped=true!../../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./form-radioButtons.vue");
	     if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
	     update(newContent);
	   });
	 }
	 // When the module is disposed, remove the <style> tags
	 module.hot.dispose(function() { update(); });
	}

/***/ }),
/* 72 */
/***/ (function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(39)();
	// imports
	
	
	// module
	exports.push([module.id, "\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n", "", {"version":3,"sources":[],"names":[],"mappings":"","file":"form-radioButtons.vue","sourceRoot":""}]);
	
	// exports


/***/ }),
/* 73 */
/***/ (function(module, exports) {

	'use strict';
	
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	
	module.exports = {
	    props: ['control']
	};

/***/ }),
/* 74 */
/***/ (function(module, exports, __webpack_require__) {

	module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
	  return _c('div', {
	    staticClass: "form-control-radiobuttons",
	    class: (!_vm.control.valid && _vm.$parent.showErrors) ? 'has-danger' : '',
	    attrs: {
	      "id": _vm.control.id
	    }
	  }, [(_vm.control.title) ? _c('div', {
	    staticClass: "form-control-title"
	  }, [_vm._v(_vm._s(_vm.control.title))]) : _vm._e(), _vm._v(" "), _vm._l((_vm.control.options.value), function(option, index) {
	    return _c('div', {
	      staticClass: "form-control-radiobutton-item"
	    }, [_c('input', {
	      directives: [{
	        name: "model",
	        rawName: "v-model",
	        value: (_vm.$parent.value),
	        expression: "$parent.value"
	      }],
	      staticClass: "form-control-input",
	      attrs: {
	        "type": "radio",
	        "name": _vm.control.id,
	        "id": 'radiobutton-' + _vm.control.id + '-' + index
	      },
	      domProps: {
	        "value": option.value,
	        "checked": _vm._q(_vm.$parent.value, option.value)
	      },
	      on: {
	        "change": function($event) {
	          _vm.$set(_vm.$parent, "value", option.value)
	        }
	      }
	    }), _vm._v(" "), _c('label', {
	      staticClass: "form-control-label",
	      class: 'form-control-label-' + index + (_vm.$parent.value == option.value ? ' form-control-label-checked' : ''),
	      attrs: {
	        "for": 'radiobutton-' + _vm.control.id + '-' + index
	      }
	    }, [_vm._v("\n            " + _vm._s(option.title) + "\n        ")])])
	  }), _vm._v(" "), _vm._l((_vm.control.errorMessages), function(message) {
	    return (!_vm.control.valid && _vm.$parent.showErrors) ? _c('div', {
	      staticClass: "form-control-feedback"
	    }, [_vm._v("\n        " + _vm._s(message) + "\n    ")]) : _vm._e()
	  })], 2)
	},staticRenderFns: []}
	module.exports.render._withStripped = true
	if (false) {
	  module.hot.accept()
	  if (module.hot.data) {
	     require("vue-hot-reload-api").rerender("data-v-79311a2c", module.exports)
	  }
	}

/***/ }),
/* 75 */
/***/ (function(module, exports, __webpack_require__) {

	
	/* styles */
	__webpack_require__(76)
	
	var Component = __webpack_require__(42)(
	  /* script */
	  __webpack_require__(78),
	  /* template */
	  __webpack_require__(79),
	  /* scopeId */
	  "data-v-1145adac",
	  /* cssModules */
	  null
	)
	Component.options.__file = "/Users/alexey/PhpstormProjects/nenaprasno-frontend/public/assets/screen/app/components/controls/form-textBlock.vue"
	if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key !== "__esModule"})) {console.error("named exports are not supported in *.vue files.")}
	if (Component.options.functional) {console.error("[vue-loader] form-textBlock.vue: functional components are not supported with templates, they should use render functions.")}
	
	/* hot reload */
	if (false) {(function () {
	  var hotAPI = require("vue-hot-reload-api")
	  hotAPI.install(require("vue"), false)
	  if (!hotAPI.compatible) return
	  module.hot.accept()
	  if (!module.hot.data) {
	    hotAPI.createRecord("data-v-1145adac", Component.options)
	  } else {
	    hotAPI.reload("data-v-1145adac", Component.options)
	  }
	})()}
	
	module.exports = Component.exports


/***/ }),
/* 76 */
/***/ (function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag
	
	// load the styles
	var content = __webpack_require__(77);
	if(typeof content === 'string') content = [[module.id, content, '']];
	if(content.locals) module.exports = content.locals;
	// add the styles to the DOM
	var update = __webpack_require__(40)("395de36c", content, false);
	// Hot Module Replacement
	if(false) {
	 // When the styles change, update the <style> tags
	 if(!content.locals) {
	   module.hot.accept("!!../../../node_modules/css-loader/index.js?sourceMap!../../../node_modules/vue-loader/lib/style-rewriter.js?id=data-v-1145adac&scoped=true!../../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./form-textBlock.vue", function() {
	     var newContent = require("!!../../../node_modules/css-loader/index.js?sourceMap!../../../node_modules/vue-loader/lib/style-rewriter.js?id=data-v-1145adac&scoped=true!../../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./form-textBlock.vue");
	     if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
	     update(newContent);
	   });
	 }
	 // When the module is disposed, remove the <style> tags
	 module.hot.dispose(function() { update(); });
	}

/***/ }),
/* 77 */
/***/ (function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(39)();
	// imports
	
	
	// module
	exports.push([module.id, "\n\n\n\n\n\n\n\n\n", "", {"version":3,"sources":[],"names":[],"mappings":"","file":"form-textBlock.vue","sourceRoot":""}]);
	
	// exports


/***/ }),
/* 78 */
/***/ (function(module, exports) {

	'use strict';
	
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	
	module.exports = {
	    props: ['control'],
	    computed: {
	        text: function text() {
	            // Replace /n/r with <br> tags
	            return this.control.description ? this.control.description.replace(/(?:\r\n|\r|\n)/g, '<br />') : null;
	        }
	    }
	};

/***/ }),
/* 79 */
/***/ (function(module, exports, __webpack_require__) {

	module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
	  return _c('div', {
	    staticClass: "form-control-textblock"
	  }, [(_vm.control.title) ? _c('h3', [_vm._v(_vm._s(_vm.control.title))]) : _vm._e(), _vm._v(" "), _c('div', {
	    domProps: {
	      "innerHTML": _vm._s(_vm.text)
	    }
	  })])
	},staticRenderFns: []}
	module.exports.render._withStripped = true
	if (false) {
	  module.hot.accept()
	  if (module.hot.data) {
	     require("vue-hot-reload-api").rerender("data-v-1145adac", module.exports)
	  }
	}

/***/ }),
/* 80 */
/***/ (function(module, exports, __webpack_require__) {

	
	/* styles */
	__webpack_require__(81)
	
	var Component = __webpack_require__(42)(
	  /* script */
	  __webpack_require__(83),
	  /* template */
	  __webpack_require__(84),
	  /* scopeId */
	  "data-v-6ebc70a8",
	  /* cssModules */
	  null
	)
	Component.options.__file = "/Users/alexey/PhpstormProjects/nenaprasno-frontend/public/assets/screen/app/components/controls/form-textBox.vue"
	if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key !== "__esModule"})) {console.error("named exports are not supported in *.vue files.")}
	if (Component.options.functional) {console.error("[vue-loader] form-textBox.vue: functional components are not supported with templates, they should use render functions.")}
	
	/* hot reload */
	if (false) {(function () {
	  var hotAPI = require("vue-hot-reload-api")
	  hotAPI.install(require("vue"), false)
	  if (!hotAPI.compatible) return
	  module.hot.accept()
	  if (!module.hot.data) {
	    hotAPI.createRecord("data-v-6ebc70a8", Component.options)
	  } else {
	    hotAPI.reload("data-v-6ebc70a8", Component.options)
	  }
	})()}
	
	module.exports = Component.exports


/***/ }),
/* 81 */
/***/ (function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag
	
	// load the styles
	var content = __webpack_require__(82);
	if(typeof content === 'string') content = [[module.id, content, '']];
	if(content.locals) module.exports = content.locals;
	// add the styles to the DOM
	var update = __webpack_require__(40)("af6f821c", content, false);
	// Hot Module Replacement
	if(false) {
	 // When the styles change, update the <style> tags
	 if(!content.locals) {
	   module.hot.accept("!!../../../node_modules/css-loader/index.js?sourceMap!../../../node_modules/vue-loader/lib/style-rewriter.js?id=data-v-6ebc70a8&scoped=true!../../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./form-textBox.vue", function() {
	     var newContent = require("!!../../../node_modules/css-loader/index.js?sourceMap!../../../node_modules/vue-loader/lib/style-rewriter.js?id=data-v-6ebc70a8&scoped=true!../../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./form-textBox.vue");
	     if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
	     update(newContent);
	   });
	 }
	 // When the module is disposed, remove the <style> tags
	 module.hot.dispose(function() { update(); });
	}

/***/ }),
/* 82 */
/***/ (function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(39)();
	// imports
	
	
	// module
	exports.push([module.id, "\n\n\n\n\n\n\n\n\n\n\n\n", "", {"version":3,"sources":[],"names":[],"mappings":"","file":"form-textBox.vue","sourceRoot":""}]);
	
	// exports


/***/ }),
/* 83 */
/***/ (function(module, exports) {

	'use strict';
	
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	
	module.exports = {
	    props: ['control']
	};

/***/ }),
/* 84 */
/***/ (function(module, exports, __webpack_require__) {

	module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
	  return _c('div', {
	    staticClass: "form-control-textbox",
	    class: (!_vm.control.valid && _vm.control.showErrors) ? 'has-danger' : ''
	  }, [(_vm.control.title) ? _c('label', {
	    attrs: {
	      "for": _vm.control.id
	    }
	  }, [_vm._v(_vm._s(_vm.control.title))]) : _vm._e(), _vm._v(" "), _c('input', {
	    directives: [{
	      name: "model",
	      rawName: "v-model",
	      value: (_vm.$parent.value),
	      expression: "$parent.value"
	    }],
	    attrs: {
	      "id": _vm.control.id,
	      "type": "text",
	      "placeholder": _vm.control.placeholder
	    },
	    domProps: {
	      "value": (_vm.$parent.value)
	    },
	    on: {
	      "input": function($event) {
	        if ($event.target.composing) { return; }
	        _vm.$set(_vm.$parent, "value", $event.target.value)
	      }
	    }
	  }), _vm._v(" "), _vm._l((_vm.control.errorMessages), function(message) {
	    return (!_vm.control.valid && _vm.$parent.showErrors) ? _c('div', {
	      staticClass: "form-control-feedback"
	    }, [_vm._v("\n        " + _vm._s(message) + "\n    ")]) : _vm._e()
	  })], 2)
	},staticRenderFns: []}
	module.exports.render._withStripped = true
	if (false) {
	  module.hot.accept()
	  if (module.hot.data) {
	     require("vue-hot-reload-api").rerender("data-v-6ebc70a8", module.exports)
	  }
	}

/***/ }),
/* 85 */
/***/ (function(module, exports, __webpack_require__) {

	
	/* styles */
	__webpack_require__(86)
	
	var Component = __webpack_require__(42)(
	  /* script */
	  __webpack_require__(88),
	  /* template */
	  __webpack_require__(89),
	  /* scopeId */
	  "data-v-4f854a6a",
	  /* cssModules */
	  null
	)
	Component.options.__file = "/Users/alexey/PhpstormProjects/nenaprasno-frontend/public/assets/screen/app/components/controls/form-numberInput.vue"
	if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key !== "__esModule"})) {console.error("named exports are not supported in *.vue files.")}
	if (Component.options.functional) {console.error("[vue-loader] form-numberInput.vue: functional components are not supported with templates, they should use render functions.")}
	
	/* hot reload */
	if (false) {(function () {
	  var hotAPI = require("vue-hot-reload-api")
	  hotAPI.install(require("vue"), false)
	  if (!hotAPI.compatible) return
	  module.hot.accept()
	  if (!module.hot.data) {
	    hotAPI.createRecord("data-v-4f854a6a", Component.options)
	  } else {
	    hotAPI.reload("data-v-4f854a6a", Component.options)
	  }
	})()}
	
	module.exports = Component.exports


/***/ }),
/* 86 */
/***/ (function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag
	
	// load the styles
	var content = __webpack_require__(87);
	if(typeof content === 'string') content = [[module.id, content, '']];
	if(content.locals) module.exports = content.locals;
	// add the styles to the DOM
	var update = __webpack_require__(40)("3e3ed508", content, false);
	// Hot Module Replacement
	if(false) {
	 // When the styles change, update the <style> tags
	 if(!content.locals) {
	   module.hot.accept("!!../../../node_modules/css-loader/index.js?sourceMap!../../../node_modules/vue-loader/lib/style-rewriter.js?id=data-v-4f854a6a&scoped=true!../../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./form-numberInput.vue", function() {
	     var newContent = require("!!../../../node_modules/css-loader/index.js?sourceMap!../../../node_modules/vue-loader/lib/style-rewriter.js?id=data-v-4f854a6a&scoped=true!../../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./form-numberInput.vue");
	     if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
	     update(newContent);
	   });
	 }
	 // When the module is disposed, remove the <style> tags
	 module.hot.dispose(function() { update(); });
	}

/***/ }),
/* 87 */
/***/ (function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(39)();
	// imports
	
	
	// module
	exports.push([module.id, "\n\n\n\n\n\n\n\n\n\n\n\n", "", {"version":3,"sources":[],"names":[],"mappings":"","file":"form-numberInput.vue","sourceRoot":""}]);
	
	// exports


/***/ }),
/* 88 */
/***/ (function(module, exports) {

	'use strict';
	
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	
	module.exports = {
	    props: ['control']
	};

/***/ }),
/* 89 */
/***/ (function(module, exports, __webpack_require__) {

	module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
	  return _c('div', {
	    staticClass: "form-control-numberinput",
	    class: (!_vm.control.valid && _vm.$parent.showErrors) ? 'has-danger' : ''
	  }, [(_vm.control.title) ? _c('div', {
	    staticClass: "form-control-title"
	  }, [_vm._v(_vm._s(_vm.control.title))]) : _vm._e(), _vm._v(" "), _c('input', {
	    directives: [{
	      name: "model",
	      rawName: "v-model",
	      value: (_vm.$parent.value),
	      expression: "$parent.value"
	    }],
	    attrs: {
	      "id": _vm.control.id,
	      "type": "number",
	      "placeholder": _vm.control.placeholder
	    },
	    domProps: {
	      "value": (_vm.$parent.value)
	    },
	    on: {
	      "input": function($event) {
	        if ($event.target.composing) { return; }
	        _vm.$set(_vm.$parent, "value", $event.target.value)
	      }
	    }
	  }), _vm._v(" "), _vm._l((_vm.control.errorMessages), function(message) {
	    return (!_vm.control.valid && _vm.$parent.showErrors) ? _c('div', {
	      staticClass: "form-control-feedback"
	    }, [_vm._v("\n        " + _vm._s(message) + "\n    ")]) : _vm._e()
	  })], 2)
	},staticRenderFns: []}
	module.exports.render._withStripped = true
	if (false) {
	  module.hot.accept()
	  if (module.hot.data) {
	     require("vue-hot-reload-api").rerender("data-v-4f854a6a", module.exports)
	  }
	}

/***/ }),
/* 90 */
/***/ (function(module, exports, __webpack_require__) {

	
	/* styles */
	__webpack_require__(91)
	
	var Component = __webpack_require__(42)(
	  /* script */
	  __webpack_require__(93),
	  /* template */
	  __webpack_require__(94),
	  /* scopeId */
	  "data-v-4947d3a2",
	  /* cssModules */
	  null
	)
	Component.options.__file = "/Users/alexey/PhpstormProjects/nenaprasno-frontend/public/assets/screen/app/components/controls/form-dateTimePicker.vue"
	if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key !== "__esModule"})) {console.error("named exports are not supported in *.vue files.")}
	if (Component.options.functional) {console.error("[vue-loader] form-dateTimePicker.vue: functional components are not supported with templates, they should use render functions.")}
	
	/* hot reload */
	if (false) {(function () {
	  var hotAPI = require("vue-hot-reload-api")
	  hotAPI.install(require("vue"), false)
	  if (!hotAPI.compatible) return
	  module.hot.accept()
	  if (!module.hot.data) {
	    hotAPI.createRecord("data-v-4947d3a2", Component.options)
	  } else {
	    hotAPI.reload("data-v-4947d3a2", Component.options)
	  }
	})()}
	
	module.exports = Component.exports


/***/ }),
/* 91 */
/***/ (function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag
	
	// load the styles
	var content = __webpack_require__(92);
	if(typeof content === 'string') content = [[module.id, content, '']];
	if(content.locals) module.exports = content.locals;
	// add the styles to the DOM
	var update = __webpack_require__(40)("f37d5aba", content, false);
	// Hot Module Replacement
	if(false) {
	 // When the styles change, update the <style> tags
	 if(!content.locals) {
	   module.hot.accept("!!../../../node_modules/css-loader/index.js?sourceMap!../../../node_modules/vue-loader/lib/style-rewriter.js?id=data-v-4947d3a2&scoped=true!../../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./form-dateTimePicker.vue", function() {
	     var newContent = require("!!../../../node_modules/css-loader/index.js?sourceMap!../../../node_modules/vue-loader/lib/style-rewriter.js?id=data-v-4947d3a2&scoped=true!../../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./form-dateTimePicker.vue");
	     if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
	     update(newContent);
	   });
	 }
	 // When the module is disposed, remove the <style> tags
	 module.hot.dispose(function() { update(); });
	}

/***/ }),
/* 92 */
/***/ (function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(39)();
	// imports
	
	
	// module
	exports.push([module.id, "\n\n\n\n\n\n\n\n\n", "", {"version":3,"sources":[],"names":[],"mappings":"","file":"form-dateTimePicker.vue","sourceRoot":""}]);
	
	// exports


/***/ }),
/* 93 */
/***/ (function(module, exports) {

	'use strict';
	
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	
	module.exports = {
	    props: ['control']
	};

/***/ }),
/* 94 */
/***/ (function(module, exports, __webpack_require__) {

	module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
	  return _c('div', [(_vm.control.title) ? _c('label', {
	    attrs: {
	      "for": _vm.control.id
	    }
	  }, [_vm._v(_vm._s(_vm.control.title))]) : _vm._e(), _vm._v(" "), _c('input', {
	    directives: [{
	      name: "model",
	      rawName: "v-model",
	      value: (_vm.$parent.value),
	      expression: "$parent.value"
	    }],
	    staticClass: "form-control",
	    attrs: {
	      "id": _vm.control.id,
	      "type": "date"
	    },
	    domProps: {
	      "value": (_vm.$parent.value)
	    },
	    on: {
	      "input": function($event) {
	        if ($event.target.composing) { return; }
	        _vm.$set(_vm.$parent, "value", $event.target.value)
	      }
	    }
	  })])
	},staticRenderFns: []}
	module.exports.render._withStripped = true
	if (false) {
	  module.hot.accept()
	  if (module.hot.data) {
	     require("vue-hot-reload-api").rerender("data-v-4947d3a2", module.exports)
	  }
	}

/***/ }),
/* 95 */
/***/ (function(module, exports, __webpack_require__) {

	
	/* styles */
	__webpack_require__(96)
	
	var Component = __webpack_require__(42)(
	  /* script */
	  __webpack_require__(98),
	  /* template */
	  __webpack_require__(99),
	  /* scopeId */
	  "data-v-1439896e",
	  /* cssModules */
	  null
	)
	Component.options.__file = "/Users/alexey/PhpstormProjects/nenaprasno-frontend/public/assets/screen/app/components/controls/form-checkBox.vue"
	if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key !== "__esModule"})) {console.error("named exports are not supported in *.vue files.")}
	if (Component.options.functional) {console.error("[vue-loader] form-checkBox.vue: functional components are not supported with templates, they should use render functions.")}
	
	/* hot reload */
	if (false) {(function () {
	  var hotAPI = require("vue-hot-reload-api")
	  hotAPI.install(require("vue"), false)
	  if (!hotAPI.compatible) return
	  module.hot.accept()
	  if (!module.hot.data) {
	    hotAPI.createRecord("data-v-1439896e", Component.options)
	  } else {
	    hotAPI.reload("data-v-1439896e", Component.options)
	  }
	})()}
	
	module.exports = Component.exports


/***/ }),
/* 96 */
/***/ (function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag
	
	// load the styles
	var content = __webpack_require__(97);
	if(typeof content === 'string') content = [[module.id, content, '']];
	if(content.locals) module.exports = content.locals;
	// add the styles to the DOM
	var update = __webpack_require__(40)("52825e8c", content, false);
	// Hot Module Replacement
	if(false) {
	 // When the styles change, update the <style> tags
	 if(!content.locals) {
	   module.hot.accept("!!../../../node_modules/css-loader/index.js?sourceMap!../../../node_modules/vue-loader/lib/style-rewriter.js?id=data-v-1439896e&scoped=true!../../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./form-checkBox.vue", function() {
	     var newContent = require("!!../../../node_modules/css-loader/index.js?sourceMap!../../../node_modules/vue-loader/lib/style-rewriter.js?id=data-v-1439896e&scoped=true!../../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./form-checkBox.vue");
	     if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
	     update(newContent);
	   });
	 }
	 // When the module is disposed, remove the <style> tags
	 module.hot.dispose(function() { update(); });
	}

/***/ }),
/* 97 */
/***/ (function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(39)();
	// imports
	
	
	// module
	exports.push([module.id, "\n\n\n\n\n\n\n\n\n\n\n\n\n\n", "", {"version":3,"sources":[],"names":[],"mappings":"","file":"form-checkBox.vue","sourceRoot":""}]);
	
	// exports


/***/ }),
/* 98 */
/***/ (function(module, exports) {

	'use strict';
	
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	
	module.exports = {
	    props: ['control']
	};

/***/ }),
/* 99 */
/***/ (function(module, exports, __webpack_require__) {

	module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
	  return _c('div', {
	    staticClass: "form-control-checkbox",
	    class: (!_vm.control.valid && _vm.$parent.showErrors) ? 'has-danger' : '',
	    attrs: {
	      "id": _vm.control.id
	    }
	  }, [_c('input', {
	    directives: [{
	      name: "model",
	      rawName: "v-model",
	      value: (_vm.$parent.value),
	      expression: "$parent.value"
	    }],
	    attrs: {
	      "type": "checkbox",
	      "id": 'checkbox-' + _vm.control.id
	    },
	    domProps: {
	      "checked": Array.isArray(_vm.$parent.value) ? _vm._i(_vm.$parent.value, null) > -1 : (_vm.$parent.value)
	    },
	    on: {
	      "change": function($event) {
	        var $$a = _vm.$parent.value,
	          $$el = $event.target,
	          $$c = $$el.checked ? (true) : (false);
	        if (Array.isArray($$a)) {
	          var $$v = null,
	            $$i = _vm._i($$a, $$v);
	          if ($$el.checked) {
	            $$i < 0 && (_vm.$parent.value = $$a.concat([$$v]))
	          } else {
	            $$i > -1 && (_vm.$parent.value = $$a.slice(0, $$i).concat($$a.slice($$i + 1)))
	          }
	        } else {
	          _vm.$set(_vm.$parent, "value", $$c)
	        }
	      }
	    }
	  }), _vm._v(" "), _c('label', {
	    attrs: {
	      "for": 'checkbox-' + _vm.control.id
	    }
	  }, [_vm._v("\n        " + _vm._s(_vm.control.title) + "\n    ")]), _vm._v(" "), _vm._l((_vm.control.errorMessages), function(message) {
	    return (!_vm.control.valid && _vm.$parent.showErrors) ? _c('div', {
	      staticClass: "form-control-feedback"
	    }, [_vm._v("\n        " + _vm._s(message) + "\n    ")]) : _vm._e()
	  })], 2)
	},staticRenderFns: []}
	module.exports.render._withStripped = true
	if (false) {
	  module.hot.accept()
	  if (module.hot.data) {
	     require("vue-hot-reload-api").rerender("data-v-1439896e", module.exports)
	  }
	}

/***/ }),
/* 100 */
/***/ (function(module, exports, __webpack_require__) {

	
	/* styles */
	__webpack_require__(101)
	
	var Component = __webpack_require__(42)(
	  /* script */
	  __webpack_require__(103),
	  /* template */
	  __webpack_require__(104),
	  /* scopeId */
	  "data-v-0a051087",
	  /* cssModules */
	  null
	)
	Component.options.__file = "/Users/alexey/PhpstormProjects/nenaprasno-frontend/public/assets/screen/app/components/controls/form-checkBoxList.vue"
	if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key !== "__esModule"})) {console.error("named exports are not supported in *.vue files.")}
	if (Component.options.functional) {console.error("[vue-loader] form-checkBoxList.vue: functional components are not supported with templates, they should use render functions.")}
	
	/* hot reload */
	if (false) {(function () {
	  var hotAPI = require("vue-hot-reload-api")
	  hotAPI.install(require("vue"), false)
	  if (!hotAPI.compatible) return
	  module.hot.accept()
	  if (!module.hot.data) {
	    hotAPI.createRecord("data-v-0a051087", Component.options)
	  } else {
	    hotAPI.reload("data-v-0a051087", Component.options)
	  }
	})()}
	
	module.exports = Component.exports


/***/ }),
/* 101 */
/***/ (function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag
	
	// load the styles
	var content = __webpack_require__(102);
	if(typeof content === 'string') content = [[module.id, content, '']];
	if(content.locals) module.exports = content.locals;
	// add the styles to the DOM
	var update = __webpack_require__(40)("50152657", content, false);
	// Hot Module Replacement
	if(false) {
	 // When the styles change, update the <style> tags
	 if(!content.locals) {
	   module.hot.accept("!!../../../node_modules/css-loader/index.js?sourceMap!../../../node_modules/vue-loader/lib/style-rewriter.js?id=data-v-0a051087&scoped=true!../../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./form-checkBoxList.vue", function() {
	     var newContent = require("!!../../../node_modules/css-loader/index.js?sourceMap!../../../node_modules/vue-loader/lib/style-rewriter.js?id=data-v-0a051087&scoped=true!../../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./form-checkBoxList.vue");
	     if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
	     update(newContent);
	   });
	 }
	 // When the module is disposed, remove the <style> tags
	 module.hot.dispose(function() { update(); });
	}

/***/ }),
/* 102 */
/***/ (function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(39)();
	// imports
	
	
	// module
	exports.push([module.id, "\n\n\n\n\n\n\n\n\n\n\n\n\n", "", {"version":3,"sources":[],"names":[],"mappings":"","file":"form-checkBoxList.vue","sourceRoot":""}]);
	
	// exports


/***/ }),
/* 103 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	
	var displayCondition = __webpack_require__(53);
	
	module.exports = {
	    props: ['control', 'value'],
	    data: function data() {
	        return {
	            listValue: []
	        };
	    },
	
	    methods: {
	        display: function display(option) {
	            return displayCondition(option, this.$store);
	        },
	        valueChange: function valueChange() {
	            this.$parent.value = this.listValue;
	        }
	    },
	    watch: {
	        value: function value(val, oldVal) {
	            if (val !== oldVal) {
	                this.listValue = val;
	            }
	        }
	    }
	};

/***/ }),
/* 104 */
/***/ (function(module, exports, __webpack_require__) {

	module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
	  return _c('div', {
	    staticClass: "form-control-checkboxlist",
	    attrs: {
	      "id": _vm.control.id
	    }
	  }, _vm._l((_vm.control.options.value), function(option, index) {
	    return (_vm.display(option)) ? _c('div', {
	      staticClass: "form-control-checkboxlist-item"
	    }, [_c('input', {
	      directives: [{
	        name: "model",
	        rawName: "v-model",
	        value: (_vm.listValue),
	        expression: "listValue"
	      }],
	      attrs: {
	        "type": "checkbox",
	        "id": 'checkbox-' + _vm.control.id + '-' + index
	      },
	      domProps: {
	        "value": option.value,
	        "checked": Array.isArray(_vm.listValue) ? _vm._i(_vm.listValue, option.value) > -1 : (_vm.listValue)
	      },
	      on: {
	        "change": [function($event) {
	          var $$a = _vm.listValue,
	            $$el = $event.target,
	            $$c = $$el.checked ? (true) : (false);
	          if (Array.isArray($$a)) {
	            var $$v = option.value,
	              $$i = _vm._i($$a, $$v);
	            if ($$el.checked) {
	              $$i < 0 && (_vm.listValue = $$a.concat([$$v]))
	            } else {
	              $$i > -1 && (_vm.listValue = $$a.slice(0, $$i).concat($$a.slice($$i + 1)))
	            }
	          } else {
	            _vm.listValue = $$c
	          }
	        }, _vm.valueChange]
	      }
	    }), _vm._v(" "), _c('label', {
	      attrs: {
	        "for": 'checkbox-' + _vm.control.id + '-' + index
	      }
	    }, [_vm._v("\n            " + _vm._s(option.title) + "\n        ")])]) : _vm._e()
	  }))
	},staticRenderFns: []}
	module.exports.render._withStripped = true
	if (false) {
	  module.hot.accept()
	  if (module.hot.data) {
	     require("vue-hot-reload-api").rerender("data-v-0a051087", module.exports)
	  }
	}

/***/ }),
/* 105 */
/***/ (function(module, exports, __webpack_require__) {

	
	/* styles */
	__webpack_require__(106)
	
	var Component = __webpack_require__(42)(
	  /* script */
	  __webpack_require__(108),
	  /* template */
	  __webpack_require__(110),
	  /* scopeId */
	  "data-v-94a027fa",
	  /* cssModules */
	  null
	)
	Component.options.__file = "/Users/alexey/PhpstormProjects/nenaprasno-frontend/public/assets/screen/app/components/controls/form-comboBox.vue"
	if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key !== "__esModule"})) {console.error("named exports are not supported in *.vue files.")}
	if (Component.options.functional) {console.error("[vue-loader] form-comboBox.vue: functional components are not supported with templates, they should use render functions.")}
	
	/* hot reload */
	if (false) {(function () {
	  var hotAPI = require("vue-hot-reload-api")
	  hotAPI.install(require("vue"), false)
	  if (!hotAPI.compatible) return
	  module.hot.accept()
	  if (!module.hot.data) {
	    hotAPI.createRecord("data-v-94a027fa", Component.options)
	  } else {
	    hotAPI.reload("data-v-94a027fa", Component.options)
	  }
	})()}
	
	module.exports = Component.exports


/***/ }),
/* 106 */
/***/ (function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag
	
	// load the styles
	var content = __webpack_require__(107);
	if(typeof content === 'string') content = [[module.id, content, '']];
	if(content.locals) module.exports = content.locals;
	// add the styles to the DOM
	var update = __webpack_require__(40)("60095e91", content, false);
	// Hot Module Replacement
	if(false) {
	 // When the styles change, update the <style> tags
	 if(!content.locals) {
	   module.hot.accept("!!../../../node_modules/css-loader/index.js?sourceMap!../../../node_modules/vue-loader/lib/style-rewriter.js?id=data-v-94a027fa&scoped=true!../../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./form-comboBox.vue", function() {
	     var newContent = require("!!../../../node_modules/css-loader/index.js?sourceMap!../../../node_modules/vue-loader/lib/style-rewriter.js?id=data-v-94a027fa&scoped=true!../../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./form-comboBox.vue");
	     if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
	     update(newContent);
	   });
	 }
	 // When the module is disposed, remove the <style> tags
	 module.hot.dispose(function() { update(); });
	}

/***/ }),
/* 107 */
/***/ (function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(39)();
	// imports
	
	
	// module
	exports.push([module.id, "\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n", "", {"version":3,"sources":[],"names":[],"mappings":"","file":"form-comboBox.vue","sourceRoot":""}]);
	
	// exports


/***/ }),
/* 108 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	
	var _vueMultiselect = __webpack_require__(109);
	
	var _vueMultiselect2 = _interopRequireDefault(_vueMultiselect);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	var displayCondition = __webpack_require__(53); //
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	
	module.exports = {
	    components: {
	        multiselect: _vueMultiselect2.default
	    },
	    data: function data() {
	        return {
	            selected: null
	        };
	    },
	
	    computed: {
	        value: function value() {
	            return this.$parent.value;
	        }
	    },
	    props: ['control'],
	    methods: {
	        display: function display(option) {
	            return displayCondition(option, this.$store);
	        }
	    },
	    watch: {
	        value: function value(val, oldVal) {
	            if (val !== oldVal) {
	                this.selected = this.control.options.value.find(function (option) {
	                    return option.value === val;
	                });
	            }
	        },
	        selected: function selected(val, oldVal) {
	            this.$parent.value = val.value;
	        }
	    }
	};

/***/ }),
/* 109 */
/***/ (function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;/* WEBPACK VAR INJECTION */(function(module) {"use strict";
	
	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };
	
	!function (t, e) {
	  "object" == ( false ? "undefined" : _typeof(exports)) && "object" == ( false ? "undefined" : _typeof(module)) ? module.exports = e() :  true ? !(__WEBPACK_AMD_DEFINE_ARRAY__ = [], __WEBPACK_AMD_DEFINE_FACTORY__ = (e), __WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ? (__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__)) : "object" == (typeof exports === "undefined" ? "undefined" : _typeof(exports)) ? exports.VueMultiselect = e() : t.VueMultiselect = e();
	}(undefined, function () {
	  return function (t) {
	    function e(n) {
	      if (i[n]) return i[n].exports;var s = i[n] = { i: n, l: !1, exports: {} };return t[n].call(s.exports, s, s.exports, e), s.l = !0, s.exports;
	    }var i = {};return e.m = t, e.c = i, e.i = function (t) {
	      return t;
	    }, e.d = function (t, i, n) {
	      e.o(t, i) || Object.defineProperty(t, i, { configurable: !1, enumerable: !0, get: n });
	    }, e.n = function (t) {
	      var i = t && t.__esModule ? function () {
	        return t.default;
	      } : function () {
	        return t;
	      };return e.d(i, "a", i), i;
	    }, e.o = function (t, e) {
	      return Object.prototype.hasOwnProperty.call(t, e);
	    }, e.p = "/", e(e.s = 4);
	  }([function (t, e, i) {
	    "use strict";
	    function n(t, e, i) {
	      return e in t ? Object.defineProperty(t, e, { value: i, enumerable: !0, configurable: !0, writable: !0 }) : t[e] = i, t;
	    }function s(t) {
	      return 0 !== t && (!(!Array.isArray(t) || 0 !== t.length) || !t);
	    }function l(t, e) {
	      return void 0 === t && (t = "undefined"), null === t && (t = "null"), !1 === t && (t = "false"), -1 !== t.toString().toLowerCase().indexOf(e.trim());
	    }function o(t, e, i, n) {
	      return t.filter(function (t) {
	        return l(n(t, i), e);
	      });
	    }function r(t) {
	      return t.filter(function (t) {
	        return !t.$isLabel;
	      });
	    }function a(t, e) {
	      return function (i) {
	        return i.reduce(function (i, n) {
	          return n[t] && n[t].length ? (i.push({ $groupLabel: n[e], $isLabel: !0 }), i.concat(n[t])) : i;
	        }, []);
	      };
	    }function u(t, e, i, s, l) {
	      return function (r) {
	        return r.map(function (r) {
	          var a;if (!r[i]) return console.warn("Options passed to vue-multiselect do not contain groups, despite the config."), [];var u = o(r[i], t, e, l);return u.length ? (a = {}, n(a, s, r[s]), n(a, i, u), a) : [];
	        });
	      };
	    }Object.defineProperty(e, "__esModule", { value: !0 });var c = "function" == typeof Symbol && "symbol" == _typeof(Symbol.iterator) ? function (t) {
	      return typeof t === "undefined" ? "undefined" : _typeof(t);
	    } : function (t) {
	      return t && "function" == typeof Symbol && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t === "undefined" ? "undefined" : _typeof(t);
	    },
	        h = i(2),
	        p = function (t) {
	      return t && t.__esModule ? t : { default: t };
	    }(h),
	        d = function d() {
	      for (var t = arguments.length, e = Array(t), i = 0; i < t; i++) {
	        e[i] = arguments[i];
	      }return function (t) {
	        return e.reduce(function (t, e) {
	          return e(t);
	        }, t);
	      };
	    };e.default = { data: function data() {
	        return { search: "", isOpen: !1, prefferedOpenDirection: "below", optimizedHeight: this.maxHeight, internalValue: this.value || 0 === this.value ? (0, p.default)(Array.isArray(this.value) ? this.value : [this.value]) : [] };
	      }, props: { internalSearch: { type: Boolean, default: !0 }, options: { type: Array, required: !0 }, multiple: { type: Boolean, default: !1 }, value: { type: null, default: function _default() {
	            return [];
	          } }, trackBy: { type: String }, label: { type: String }, searchable: { type: Boolean, default: !0 }, clearOnSelect: { type: Boolean, default: !0 }, hideSelected: { type: Boolean, default: !1 }, placeholder: { type: String, default: "Select option" }, allowEmpty: { type: Boolean, default: !0 }, resetAfter: { type: Boolean, default: !1 }, closeOnSelect: { type: Boolean, default: !0 }, customLabel: { type: Function, default: function _default(t, e) {
	            return s(t) ? "" : e ? t[e] : t;
	          } }, taggable: { type: Boolean, default: !1 }, tagPlaceholder: { type: String, default: "Press enter to create a tag" }, max: { type: [Number, Boolean], default: !1 }, id: { default: null }, optionsLimit: { type: Number, default: 1e3 }, groupValues: { type: String }, groupLabel: { type: String }, blockKeys: { type: Array, default: function _default() {
	            return [];
	          } }, preserveSearch: { type: Boolean, default: !1 } }, mounted: function mounted() {
	        this.multiple || this.clearOnSelect || console.warn("[Vue-Multiselect warn]: ClearOnSelect and Multiple props can’t be both set to false."), !this.multiple && this.max && console.warn("[Vue-Multiselect warn]: Max prop should not be used when prop Multiple equals false.");
	      }, computed: { filteredOptions: function filteredOptions() {
	          var t = this.search || "",
	              e = t.toLowerCase(),
	              i = this.options.concat();return i = this.internalSearch ? this.groupValues ? this.filterAndFlat(i, e, this.label) : o(i, e, this.label, this.customLabel) : this.groupValues ? a(this.groupValues, this.groupLabel)(i) : i, i = this.hideSelected ? i.filter(this.isNotSelected) : i, this.taggable && e.length && !this.isExistingOption(e) && i.unshift({ isTag: !0, label: t }), i.slice(0, this.optionsLimit);
	        }, valueKeys: function valueKeys() {
	          var t = this;return this.trackBy ? this.internalValue.map(function (e) {
	            return e[t.trackBy];
	          }) : this.internalValue;
	        }, optionKeys: function optionKeys() {
	          var t = this;return (this.groupValues ? this.flatAndStrip(this.options) : this.options).map(function (e) {
	            return t.customLabel(e, t.label).toString().toLowerCase();
	          });
	        }, currentOptionLabel: function currentOptionLabel() {
	          return this.multiple ? this.searchable ? "" : this.placeholder : this.internalValue[0] ? this.getOptionLabel(this.internalValue[0]) : this.searchable ? "" : this.placeholder;
	        } }, watch: { internalValue: function internalValue(t, e) {
	          this.resetAfter && this.internalValue.length && (this.search = "", this.internalValue = []);
	        }, search: function search() {
	          this.$emit("search-change", this.search, this.id);
	        }, value: function value(t) {
	          this.internalValue = this.getInternalValue(t);
	        } }, methods: { getValue: function getValue() {
	          return this.multiple ? (0, p.default)(this.internalValue) : 0 === this.internalValue.length ? null : (0, p.default)(this.internalValue[0]);
	        }, getInternalValue: function getInternalValue(t) {
	          return null === t || void 0 === t ? [] : this.multiple ? (0, p.default)(t) : (0, p.default)([t]);
	        }, filterAndFlat: function filterAndFlat(t, e, i) {
	          return d(u(e, i, this.groupValues, this.groupLabel, this.customLabel), a(this.groupValues, this.groupLabel))(t);
	        }, flatAndStrip: function flatAndStrip(t) {
	          return d(a(this.groupValues, this.groupLabel), r)(t);
	        }, updateSearch: function updateSearch(t) {
	          this.search = t;
	        }, isExistingOption: function isExistingOption(t) {
	          return !!this.options && this.optionKeys.indexOf(t) > -1;
	        }, isSelected: function isSelected(t) {
	          var e = this.trackBy ? t[this.trackBy] : t;return this.valueKeys.indexOf(e) > -1;
	        }, isNotSelected: function isNotSelected(t) {
	          return !this.isSelected(t);
	        }, getOptionLabel: function getOptionLabel(t) {
	          if (s(t)) return "";if (t.isTag) return t.label;if (t.$isLabel) return t.$groupLabel;var e = this.customLabel(t, this.label);return s(e) ? "" : e;
	        }, select: function select(t, e) {
	          if (!(-1 !== this.blockKeys.indexOf(e) || this.disabled || t.$isLabel || t.$isDisabled) && (!this.max || !this.multiple || this.internalValue.length !== this.max) && ("Tab" !== e || this.pointerDirty)) {
	            if (t.isTag) this.$emit("tag", t.label, this.id), this.search = "", this.closeOnSelect && !this.multiple && this.deactivate();else {
	              if (this.isSelected(t)) return void ("Tab" !== e && this.removeElement(t));this.multiple ? this.internalValue.push(t) : this.internalValue = [t], this.$emit("select", (0, p.default)(t), this.id), this.$emit("input", this.getValue(), this.id), this.clearOnSelect && (this.search = "");
	            }this.closeOnSelect && this.deactivate();
	          }
	        }, removeElement: function removeElement(t) {
	          var e = !(arguments.length > 1 && void 0 !== arguments[1]) || arguments[1];if (!this.disabled) {
	            if (!this.allowEmpty && this.internalValue.length <= 1) return void this.deactivate();var i = "object" === (void 0 === t ? "undefined" : c(t)) ? this.valueKeys.indexOf(t[this.trackBy]) : this.valueKeys.indexOf(t);this.internalValue.splice(i, 1), this.$emit("remove", (0, p.default)(t), this.id), this.$emit("input", this.getValue(), this.id), this.closeOnSelect && e && this.deactivate();
	          }
	        }, removeLastElement: function removeLastElement() {
	          -1 === this.blockKeys.indexOf("Delete") && 0 === this.search.length && Array.isArray(this.internalValue) && this.removeElement(this.internalValue[this.internalValue.length - 1], !1);
	        }, activate: function activate() {
	          var t = this;this.isOpen || this.disabled || (this.adjustPosition(), this.groupValues && 0 === this.pointer && this.filteredOptions.length && (this.pointer = 1), this.isOpen = !0, this.searchable ? (this.preserveSearch || (this.search = ""), this.$nextTick(function () {
	            return t.$refs.search.focus();
	          })) : this.$el.focus(), this.$emit("open", this.id));
	        }, deactivate: function deactivate() {
	          this.isOpen && (this.isOpen = !1, this.searchable ? this.$refs.search.blur() : this.$el.blur(), this.preserveSearch || (this.search = ""), this.$emit("close", this.getValue(), this.id));
	        }, toggle: function toggle() {
	          this.isOpen ? this.deactivate() : this.activate();
	        }, adjustPosition: function adjustPosition() {
	          if ("undefined" != typeof window) {
	            var t = this.$el.getBoundingClientRect().top,
	                e = window.innerHeight - this.$el.getBoundingClientRect().bottom;e > this.maxHeight || e > t || "below" === this.openDirection || "bottom" === this.openDirection ? (this.prefferedOpenDirection = "below", this.optimizedHeight = Math.min(e - 40, this.maxHeight)) : (this.prefferedOpenDirection = "above", this.optimizedHeight = Math.min(t - 40, this.maxHeight));
	          }
	        } } };
	  }, function (t, e, i) {
	    "use strict";
	    Object.defineProperty(e, "__esModule", { value: !0 }), e.default = { data: function data() {
	        return { pointer: 0, pointerDirty: !1 };
	      }, props: { showPointer: { type: Boolean, default: !0 }, optionHeight: { type: Number, default: 40 } }, computed: { pointerPosition: function pointerPosition() {
	          return this.pointer * this.optionHeight;
	        }, visibleElements: function visibleElements() {
	          return this.optimizedHeight / this.optionHeight;
	        } }, watch: { filteredOptions: function filteredOptions() {
	          this.pointerAdjust();
	        }, isOpen: function isOpen() {
	          this.pointerDirty = !1;
	        } }, methods: { optionHighlight: function optionHighlight(t, e) {
	          return { "multiselect__option--highlight": t === this.pointer && this.showPointer, "multiselect__option--selected": this.isSelected(e) };
	        }, addPointerElement: function addPointerElement() {
	          var t = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : "Enter",
	              e = t.key;this.filteredOptions.length > 0 && this.select(this.filteredOptions[this.pointer], e), this.pointerReset();
	        }, pointerForward: function pointerForward() {
	          this.pointer < this.filteredOptions.length - 1 && (this.pointer++, this.$refs.list.scrollTop <= this.pointerPosition - (this.visibleElements - 1) * this.optionHeight && (this.$refs.list.scrollTop = this.pointerPosition - (this.visibleElements - 1) * this.optionHeight), this.filteredOptions[this.pointer].$isLabel && this.pointerForward()), this.pointerDirty = !0;
	        }, pointerBackward: function pointerBackward() {
	          this.pointer > 0 ? (this.pointer--, this.$refs.list.scrollTop >= this.pointerPosition && (this.$refs.list.scrollTop = this.pointerPosition), this.filteredOptions[this.pointer].$isLabel && this.pointerBackward()) : this.filteredOptions[0].$isLabel && this.pointerForward(), this.pointerDirty = !0;
	        }, pointerReset: function pointerReset() {
	          this.closeOnSelect && (this.pointer = 0, this.$refs.list && (this.$refs.list.scrollTop = 0));
	        }, pointerAdjust: function pointerAdjust() {
	          this.pointer >= this.filteredOptions.length - 1 && (this.pointer = this.filteredOptions.length ? this.filteredOptions.length - 1 : 0);
	        }, pointerSet: function pointerSet(t) {
	          this.pointer = t, this.pointerDirty = !0;
	        } } };
	  }, function (t, e, i) {
	    "use strict";
	    function n(t) {
	      if (Array.isArray(t)) return t.map(n);if (t && "object" === (void 0 === t ? "undefined" : s(t))) {
	        for (var e = {}, i = Object.keys(t), l = 0, o = i.length; l < o; l++) {
	          var r = i[l];e[r] = n(t[r]);
	        }return e;
	      }return t;
	    }Object.defineProperty(e, "__esModule", { value: !0 });var s = "function" == typeof Symbol && "symbol" == _typeof(Symbol.iterator) ? function (t) {
	      return typeof t === "undefined" ? "undefined" : _typeof(t);
	    } : function (t) {
	      return t && "function" == typeof Symbol && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t === "undefined" ? "undefined" : _typeof(t);
	    };e.default = n;
	  }, function (t, e, i) {
	    i(6);var n = i(7)(i(5), i(8), null, null);t.exports = n.exports;
	  }, function (t, e, i) {
	    "use strict";
	    function n(t) {
	      return t && t.__esModule ? t : { default: t };
	    }Object.defineProperty(e, "__esModule", { value: !0 }), e.deepClone = e.pointerMixin = e.multiselectMixin = e.Multiselect = void 0;var s = i(3),
	        l = n(s),
	        o = i(0),
	        r = n(o),
	        a = i(1),
	        u = n(a),
	        c = i(2),
	        h = n(c);e.default = l.default, e.Multiselect = l.default, e.multiselectMixin = r.default, e.pointerMixin = u.default, e.deepClone = h.default;
	  }, function (t, e, i) {
	    "use strict";
	    function n(t) {
	      return t && t.__esModule ? t : { default: t };
	    }Object.defineProperty(e, "__esModule", { value: !0 });var s = i(0),
	        l = n(s),
	        o = i(1),
	        r = n(o);e.default = { name: "vue-multiselect", mixins: [l.default, r.default], props: { name: { type: String, default: "" }, selectLabel: { type: String, default: "Press enter to select" }, selectedLabel: { type: String, default: "Selected" }, deselectLabel: { type: String, default: "Press enter to remove" }, showLabels: { type: Boolean, default: !0 }, limit: { type: Number, default: 99999 }, maxHeight: { type: Number, default: 300 }, limitText: { type: Function, default: function _default(t) {
	            return "and " + t + " more";
	          } }, loading: { type: Boolean, default: !1 }, disabled: { type: Boolean, default: !1 }, openDirection: { type: String, default: "" }, showNoResults: { type: Boolean, default: !0 }, tabindex: { type: Number, default: 0 } }, computed: { visibleValue: function visibleValue() {
	          return this.multiple ? this.internalValue.slice(0, this.limit) : [];
	        }, deselectLabelText: function deselectLabelText() {
	          return this.showLabels ? this.deselectLabel : "";
	        }, selectLabelText: function selectLabelText() {
	          return this.showLabels ? this.selectLabel : "";
	        }, selectedLabelText: function selectedLabelText() {
	          return this.showLabels ? this.selectedLabel : "";
	        }, inputStyle: function inputStyle() {
	          if (this.multiple && this.value && this.value.length) return this.isOpen ? { width: "auto" } : { display: "none" };
	        }, contentStyle: function contentStyle() {
	          return this.options.length ? { display: "inline-block" } : { display: "block" };
	        }, isAbove: function isAbove() {
	          return "above" === this.openDirection || "top" === this.openDirection || "below" !== this.openDirection && "bottom" !== this.openDirection && "above" === this.prefferedOpenDirection;
	        } } };
	  }, function (t, e) {}, function (t, e) {
	    t.exports = function (t, e, i, n) {
	      var s,
	          l = t = t || {},
	          o = _typeof(t.default);"object" !== o && "function" !== o || (s = t, l = t.default);var r = "function" == typeof l ? l.options : l;if (e && (r.render = e.render, r.staticRenderFns = e.staticRenderFns), i && (r._scopeId = i), n) {
	        var a = Object.create(r.computed || null);Object.keys(n).forEach(function (t) {
	          var e = n[t];a[t] = function () {
	            return e;
	          };
	        }), r.computed = a;
	      }return { esModule: s, exports: l, options: r };
	    };
	  }, function (t, e) {
	    t.exports = { render: function render() {
	        var t = this,
	            e = t.$createElement,
	            i = t._self._c || e;return i("div", { staticClass: "multiselect", class: { "multiselect--active": t.isOpen, "multiselect--disabled": t.disabled, "multiselect--above": t.isAbove }, attrs: { tabindex: t.tabindex }, on: { focus: function focus(e) {
	              t.activate();
	            }, blur: function blur(e) {
	              !t.searchable && t.deactivate();
	            }, keydown: [function (e) {
	              return "button" in e || !t._k(e.keyCode, "down", 40) ? e.target !== e.currentTarget ? null : (e.preventDefault(), void t.pointerForward()) : null;
	            }, function (e) {
	              return "button" in e || !t._k(e.keyCode, "up", 38) ? e.target !== e.currentTarget ? null : (e.preventDefault(), void t.pointerBackward()) : null;
	            }, function (e) {
	              return "button" in e || !t._k(e.keyCode, "enter", 13) || !t._k(e.keyCode, "tab", 9) ? (e.stopPropagation(), e.target !== e.currentTarget ? null : void t.addPointerElement(e)) : null;
	            }], keyup: function keyup(e) {
	              if (!("button" in e) && t._k(e.keyCode, "esc", 27)) return null;t.deactivate();
	            } } }, [t._t("caret", [i("div", { staticClass: "multiselect__select", on: { mousedown: function mousedown(e) {
	              e.preventDefault(), e.stopPropagation(), t.toggle();
	            } } })], { toggle: t.toggle }), t._v(" "), t._t("clear", null, { search: t.search }), t._v(" "), i("div", { ref: "tags", staticClass: "multiselect__tags" }, [i("div", { directives: [{ name: "show", rawName: "v-show", value: t.visibleValue.length > 0, expression: "visibleValue.length > 0" }], staticClass: "multiselect__tags-wrap" }, [t._l(t.visibleValue, function (e) {
	          return [t._t("tag", [i("span", { staticClass: "multiselect__tag" }, [i("span", { domProps: { textContent: t._s(t.getOptionLabel(e)) } }), t._v(" "), i("i", { staticClass: "multiselect__tag-icon", attrs: { "aria-hidden": "true", tabindex: "1" }, on: { keydown: function keydown(i) {
	                if (!("button" in i) && t._k(i.keyCode, "enter", 13)) return null;i.preventDefault(), t.removeElement(e);
	              }, mousedown: function mousedown(i) {
	                i.preventDefault(), t.removeElement(e);
	              } } })])], { option: e, search: t.search, remove: t.removeElement })];
	        })], 2), t._v(" "), t.internalValue && t.internalValue.length > t.limit ? [i("strong", { staticClass: "multiselect__strong", domProps: { textContent: t._s(t.limitText(t.internalValue.length - t.limit)) } })] : t._e(), t._v(" "), i("transition", { attrs: { name: "multiselect__loading" } }, [t._t("loading", [i("div", { directives: [{ name: "show", rawName: "v-show", value: t.loading, expression: "loading" }], staticClass: "multiselect__spinner" })])], 2), t._v(" "), t.searchable ? i("input", { ref: "search", staticClass: "multiselect__input", style: t.inputStyle, attrs: { name: t.name, id: t.id, type: "text", autocomplete: "off", placeholder: t.placeholder, disabled: t.disabled }, domProps: { value: t.isOpen ? t.search : t.currentOptionLabel }, on: { input: function input(e) {
	              t.updateSearch(e.target.value);
	            }, focus: function focus(e) {
	              e.preventDefault(), t.activate();
	            }, blur: function blur(e) {
	              e.preventDefault(), t.deactivate();
	            }, keyup: function keyup(e) {
	              if (!("button" in e) && t._k(e.keyCode, "esc", 27)) return null;t.deactivate();
	            }, keydown: [function (e) {
	              if (!("button" in e) && t._k(e.keyCode, "down", 40)) return null;e.preventDefault(), t.pointerForward();
	            }, function (e) {
	              if (!("button" in e) && t._k(e.keyCode, "up", 38)) return null;e.preventDefault(), t.pointerBackward();
	            }, function (e) {
	              return "button" in e || !t._k(e.keyCode, "enter", 13) ? (e.preventDefault(), e.stopPropagation(), e.target !== e.currentTarget ? null : void t.addPointerElement(e)) : null;
	            }, function (e) {
	              if (!("button" in e) && t._k(e.keyCode, "delete", [8, 46])) return null;e.stopPropagation(), t.removeLastElement();
	            }] } }) : t._e(), t._v(" "), t.searchable ? t._e() : i("span", { staticClass: "multiselect__single", domProps: { textContent: t._s(t.currentOptionLabel) }, on: { mousedown: function mousedown(e) {
	              e.preventDefault(), t.toggle(e);
	            } } })], 2), t._v(" "), i("transition", { attrs: { name: "multiselect" } }, [i("div", { directives: [{ name: "show", rawName: "v-show", value: t.isOpen, expression: "isOpen" }], ref: "list", staticClass: "multiselect__content-wrapper", style: { maxHeight: t.optimizedHeight + "px" }, on: { focus: t.activate, mousedown: function mousedown(t) {
	              t.preventDefault();
	            } } }, [i("ul", { staticClass: "multiselect__content", style: t.contentStyle }, [t._t("beforeList"), t._v(" "), t.multiple && t.max === t.internalValue.length ? i("li", [i("span", { staticClass: "multiselect__option" }, [t._t("maxElements", [t._v("Maximum of " + t._s(t.max) + " options selected. First remove a selected option to select another.")])], 2)]) : t._e(), t._v(" "), !t.max || t.internalValue.length < t.max ? t._l(t.filteredOptions, function (e, n) {
	          return i("li", { key: n, staticClass: "multiselect__element" }, [e && (e.$isLabel || e.$isDisabled) ? t._e() : i("span", { staticClass: "multiselect__option", class: t.optionHighlight(n, e), attrs: { "data-select": e && e.isTag ? t.tagPlaceholder : t.selectLabelText, "data-selected": t.selectedLabelText, "data-deselect": t.deselectLabelText }, on: { click: function click(i) {
	                i.stopPropagation(), t.select(e);
	              }, mouseenter: function mouseenter(e) {
	                if (e.target !== e.currentTarget) return null;t.pointerSet(n);
	              } } }, [t._t("option", [i("span", [t._v(t._s(t.getOptionLabel(e)))])], { option: e, search: t.search })], 2), t._v(" "), e && (e.$isLabel || e.$isDisabled) ? i("span", { staticClass: "multiselect__option multiselect__option--disabled", class: t.optionHighlight(n, e) }, [t._t("option", [i("span", [t._v(t._s(t.getOptionLabel(e)))])], { option: e, search: t.search })], 2) : t._e()]);
	        }) : t._e(), t._v(" "), i("li", { directives: [{ name: "show", rawName: "v-show", value: t.showNoResults && 0 === t.filteredOptions.length && t.search && !t.loading, expression: "showNoResults && (filteredOptions.length === 0 && search && !loading)" }] }, [i("span", { staticClass: "multiselect__option" }, [t._t("noResult", [t._v("No elements found. Consider changing the search query.")])], 2)]), t._v(" "), t._t("afterList")], 2)])])], 2);
	      }, staticRenderFns: [] };
	  }]);
	});
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(8)(module)))

/***/ }),
/* 110 */
/***/ (function(module, exports, __webpack_require__) {

	module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
	  return _c('div', {
	    staticClass: "form-control-combobox",
	    attrs: {
	      "id": _vm.control.id
	    }
	  }, [_c('div', {
	    staticClass: "form-control-combobox-select-wrapper"
	  }, [(_vm.control.class.includes('autocomplete')) ? _c('multiselect', {
	    attrs: {
	      "label": "title",
	      "track-by": "value",
	      "placeholder": _vm.control.placeholder,
	      "options": _vm.control.options.value
	    },
	    model: {
	      value: (_vm.selected),
	      callback: function($$v) {
	        _vm.selected = $$v
	      },
	      expression: "selected"
	    }
	  }, [_c('span', {
	    attrs: {
	      "slot": "noResult"
	    },
	    slot: "noResult"
	  }, [_vm._v("Ничего не найдено, попробуйте изменить запрос")])]) : _c('select', {
	    directives: [{
	      name: "model",
	      rawName: "v-model",
	      value: (_vm.$parent.value),
	      expression: "$parent.value"
	    }],
	    staticClass: "form-control-combobox-select",
	    on: {
	      "change": function($event) {
	        var $$selectedVal = Array.prototype.filter.call($event.target.options, function(o) {
	          return o.selected
	        }).map(function(o) {
	          var val = "_value" in o ? o._value : o.value;
	          return val
	        });
	        _vm.$set(_vm.$parent, "value", $event.target.multiple ? $$selectedVal : $$selectedVal[0])
	      }
	    }
	  }, _vm._l((_vm.control.options.value), function(option, index) {
	    return (_vm.display(option)) ? _c('option', {
	      domProps: {
	        "value": option.value
	      }
	    }, [_vm._v("\n                " + _vm._s(option.title) + "\n            ")]) : _vm._e()
	  }))], 1)])
	},staticRenderFns: []}
	module.exports.render._withStripped = true
	if (false) {
	  module.hot.accept()
	  if (module.hot.data) {
	     require("vue-hot-reload-api").rerender("data-v-94a027fa", module.exports)
	  }
	}

/***/ }),
/* 111 */
/***/ (function(module, exports, __webpack_require__) {

	module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
	  return (_vm.display) ? _c('div', {
	    staticClass: "form-control",
	    class: 'form-control-' + _vm.index + ' ' + (_vm.control.class ? _vm.control.class : '') + ' form-control-' + _vm.control.id
	  }, [_c('form-' + _vm.control.type, {
	    tag: "component",
	    attrs: {
	      "control": _vm.control,
	      "value": _vm.value
	    }
	  })], 1) : _vm._e()
	},staticRenderFns: []}
	module.exports.render._withStripped = true
	if (false) {
	  module.hot.accept()
	  if (module.hot.data) {
	     require("vue-hot-reload-api").rerender("data-v-0c823eaa", module.exports)
	  }
	}

/***/ }),
/* 112 */
/***/ (function(module, exports, __webpack_require__) {

	module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
	  return (_vm.display) ? _c('div', {
	    staticClass: "form-group",
	    class: 'form-group-' + _vm.index + ' ' + (_vm.group.class ? _vm.group.class : '')
	  }, [(_vm.group.title) ? _c('div', {
	    staticClass: "form-group-title"
	  }, [_vm._v(_vm._s(_vm.group.title))]) : _vm._e(), _vm._v(" "), _vm._l((_vm.group.controls), function(control, index) {
	    return _c('form-control', {
	      attrs: {
	        "control": control,
	        "index": index
	      }
	    })
	  })], 2) : _vm._e()
	},staticRenderFns: []}
	module.exports.render._withStripped = true
	if (false) {
	  module.hot.accept()
	  if (module.hot.data) {
	     require("vue-hot-reload-api").rerender("data-v-26ba380c", module.exports)
	  }
	}

/***/ }),
/* 113 */
/***/ (function(module, exports, __webpack_require__) {

	module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
	  return (_vm.display) ? _c('div', {
	    staticClass: "form-section",
	    class: 'form-section-' + _vm.index + ' ' + (_vm.section.class ? _vm.section.class : '')
	  }, [(_vm.section.title) ? _c('div', {
	    staticClass: "form-section-title"
	  }, [_vm._v(_vm._s(_vm.section.title))]) : _vm._e(), _vm._v(" "), _vm._l((_vm.section.groups), function(group, index) {
	    return _c('form-group', {
	      attrs: {
	        "group": group,
	        "index": index
	      }
	    })
	  })], 2) : _vm._e()
	},staticRenderFns: []}
	module.exports.render._withStripped = true
	if (false) {
	  module.hot.accept()
	  if (module.hot.data) {
	     require("vue-hot-reload-api").rerender("data-v-d5fb579c", module.exports)
	  }
	}

/***/ }),
/* 114 */
/***/ (function(module, exports, __webpack_require__) {

	module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
	  return (_vm.display) ? _c('div', {
	    staticClass: "form-part",
	    class: 'form-part-' + _vm.index + ' ' + (_vm.part.class ? _vm.part.class : '')
	  }, [_c('div', {
	    staticClass: "form-part-title"
	  }, [_vm._v("\n        " + _vm._s(_vm.part.title) + "\n    ")]), _vm._v(" "), (_vm.part.description) ? _c('div', {
	    staticClass: "form-part-desc"
	  }, [_vm._v(_vm._s(_vm.part.description))]) : _vm._e(), _vm._v(" "), _vm._l((_vm.part.sections), function(section, index) {
	    return _c('form-section', {
	      attrs: {
	        "section": section,
	        "index": index
	      }
	    })
	  }), _vm._v(" "), (_vm.current != 0 || _vm.current != _vm.totalParts - 1 || _vm.current === _vm.totalParts - 1) ? _c('div', {
	    staticClass: "form-part-buttons"
	  }, [(_vm.current != 0) ? _c('button', {
	    staticClass: "form-part-button form-part-button-prev",
	    on: {
	      "click": function($event) {
	        $event.preventDefault();
	        _vm.changeStep('prev', false)
	      }
	    }
	  }, [_vm._v("Назад")]) : _vm._e(), _vm._v(" "), (_vm.current != _vm.totalParts - 1) ? _c('button', {
	    staticClass: "form-part-button form-part-button-next",
	    on: {
	      "click": function($event) {
	        $event.preventDefault();
	        _vm.changeStep('next', true)
	      }
	    }
	  }, [_vm._v("Далее")]) : _vm._e(), _vm._v(" "), (_vm.current === _vm.totalParts - 1) ? _c('button', {
	    staticClass: "form-part-button form-part-button-send",
	    on: {
	      "click": function($event) {
	        $event.preventDefault();
	        _vm.submitForm($event)
	      }
	    }
	  }, [_vm._v("Отправить")]) : _vm._e()]) : _vm._e()], 2) : _vm._e()
	},staticRenderFns: []}
	module.exports.render._withStripped = true
	if (false) {
	  module.hot.accept()
	  if (module.hot.data) {
	     require("vue-hot-reload-api").rerender("data-v-c51e4814", module.exports)
	  }
	}

/***/ }),
/* 115 */
/***/ (function(module, exports, __webpack_require__) {

	
	/* styles */
	__webpack_require__(116)
	
	var Component = __webpack_require__(42)(
	  /* script */
	  __webpack_require__(118),
	  /* template */
	  __webpack_require__(119),
	  /* scopeId */
	  "data-v-44a60c60",
	  /* cssModules */
	  null
	)
	Component.options.__file = "/Users/alexey/PhpstormProjects/nenaprasno-frontend/public/assets/screen/app/components/form-result.vue"
	if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key !== "__esModule"})) {console.error("named exports are not supported in *.vue files.")}
	if (Component.options.functional) {console.error("[vue-loader] form-result.vue: functional components are not supported with templates, they should use render functions.")}
	
	/* hot reload */
	if (false) {(function () {
	  var hotAPI = require("vue-hot-reload-api")
	  hotAPI.install(require("vue"), false)
	  if (!hotAPI.compatible) return
	  module.hot.accept()
	  if (!module.hot.data) {
	    hotAPI.createRecord("data-v-44a60c60", Component.options)
	  } else {
	    hotAPI.reload("data-v-44a60c60", Component.options)
	  }
	})()}
	
	module.exports = Component.exports


/***/ }),
/* 116 */
/***/ (function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag
	
	// load the styles
	var content = __webpack_require__(117);
	if(typeof content === 'string') content = [[module.id, content, '']];
	if(content.locals) module.exports = content.locals;
	// add the styles to the DOM
	var update = __webpack_require__(40)("55efb950", content, false);
	// Hot Module Replacement
	if(false) {
	 // When the styles change, update the <style> tags
	 if(!content.locals) {
	   module.hot.accept("!!../../node_modules/css-loader/index.js?sourceMap!../../node_modules/vue-loader/lib/style-rewriter.js?id=data-v-44a60c60&scoped=true!../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./form-result.vue", function() {
	     var newContent = require("!!../../node_modules/css-loader/index.js?sourceMap!../../node_modules/vue-loader/lib/style-rewriter.js?id=data-v-44a60c60&scoped=true!../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./form-result.vue");
	     if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
	     update(newContent);
	   });
	 }
	 // When the module is disposed, remove the <style> tags
	 module.hot.dispose(function() { update(); });
	}

/***/ }),
/* 117 */
/***/ (function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(39)();
	// imports
	
	
	// module
	exports.push([module.id, "\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n", "", {"version":3,"sources":[],"names":[],"mappings":"","file":"form-result.vue","sourceRoot":""}]);
	
	// exports


/***/ }),
/* 118 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	
	var formAPI = __webpack_require__(56),
	    formSection = __webpack_require__(57),
	    displayCondition = __webpack_require__(53);
	
	module.exports = {
	    props: ['resultPart'],
	    components: {
	        'form-section': formSection
	    },
	    data: function data() {
	        return {
	            risks: [],
	            recommendations: []
	        };
	    },
	
	    computed: {
	        display: function display() {
	            return displayCondition(this.resultPart, this.$store);
	        },
	        results: function results() {
	            return this.$store.state.form.formResponse;
	        },
	        isAnonymous: function isAnonymous() {
	            return this.$store.state.user.isAnonymous;
	        }
	    },
	    methods: {
	        getDiseasesAndProcedures: function getDiseasesAndProcedures() {
	            var _this = this;
	            var token = this.$store.state.user.sessionId;
	
	            formAPI.getDiseases(token).then(function (response) {
	                _this.$store.commit('setDiseases', response.data);
	
	                formAPI.getMedicalProcedures(token).then(function (response) {
	                    _this.$store.commit('setMedicalProcedures', response.data);
	
	                    _this.clearFormResults();
	
	                    // Parse risks and recommendations
	                    _this.$store.state.form.formResponse.forEach(function (formResponseItem) {
	                        var risk = {
	                            id: formResponseItem.TestResult.id,
	                            diseaseId: formResponseItem.TestResult.diseaseId,
	                            levelOfRisk: formResponseItem.TestResult.levelOfRisk,
	                            name: _this.$store.state.form.diseases.find(function (disease) {
	                                if (disease.id == formResponseItem.TestResult.diseaseId) {
	                                    return true;
	                                }
	                            }).name
	                        };
	
	                        _this.risks.push(risk);
	
	                        formResponseItem.Recommendations.forEach(function (recommendation) {
	                            recommendation.name = _this.$store.state.form.medicalProcedures.find(function (medicalProcedure) {
	                                if (medicalProcedure.id == recommendation.medicalProcedureId) {
	                                    return true;
	                                }
	                            }).name;
	                            _this.recommendations.push(recommendation);
	                        });
	                    });
	                }).catch(function (error) {});
	            }).catch(function (error) {});
	        },
	        clearFormResults: function clearFormResults() {
	            var _this = this;
	
	            window.sessionStorage.removeItem('appercode-form-data-' + _this.$root.formData.id);
	        },
	        restartTest: function restartTest() {
	            this.clearFormResults();
	            window.location.reload();
	        }
	    },
	    mounted: function mounted() {
	        this.getDiseasesAndProcedures();
	    }
	};

/***/ }),
/* 119 */
/***/ (function(module, exports, __webpack_require__) {

	module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
	  return (_vm.display) ? _c('div', {
	    staticClass: "form-result"
	  }, [(_vm.resultPart.title) ? _c('div', {
	    staticClass: "form-result-title"
	  }, [_vm._v("\n        " + _vm._s(_vm.resultPart.title) + "\n    ")]) : _vm._e(), _vm._v(" "), (_vm.resultPart.description) ? _c('div', {
	    staticClass: "form-result-desc"
	  }, [_vm._v(_vm._s(_vm.resultPart.description))]) : _vm._e(), _vm._v(" "), _vm._l((_vm.resultPart.sections), function(section, index) {
	    return _c('form-section', {
	      attrs: {
	        "section": section,
	        "index": index
	      }
	    })
	  }), _vm._v(" "), (_vm.risks.length) ? _c('div', {
	    staticClass: "form-result-risks"
	  }, [_c('div', {
	    staticClass: "form-result-risks-title"
	  }, [_vm._v("Ваши риски")]), _vm._v(" "), _c('div', {
	    staticClass: "form-result-risks-row"
	  }, _vm._l((_vm.risks), function(risk, index) {
	    return _c('div', {
	      staticClass: "form-result-risks-item",
	      class: 'form-result-risks-item-' + index + ' form-result-risks-item-' + risk.levelOfRisk
	    }, [_c('div', {
	      staticClass: "form-result-risks-item-name"
	    }, [_vm._v("\n                    " + _vm._s(risk.name) + "\n                ")]), _vm._v(" "), _c('div', {
	      staticClass: "form-result-risks-item-level",
	      class: 'form-result-risks-item-level-' + risk.levelOfRisk
	    }, [(risk.levelOfRisk == 'low') ? _c('span', [_vm._v("низкий риск")]) : (risk.levelOfRisk == 'medium') ? _c('span', [_vm._v("средний риск")]) : (risk.levelOfRisk == 'high') ? _c('span', [_vm._v("высокий риск")]) : _vm._e()])])
	  }))]) : _vm._e(), _vm._v(" "), (_vm.recommendations.length) ? _c('div', {
	    staticClass: "form-result-recommendations"
	  }, [_c('div', {
	    staticClass: "form-result-recommendations-title"
	  }, [_vm._v("Рекомендации")]), _vm._v(" "), _c('div', {
	    staticClass: "form-result-recommendations-row"
	  }, _vm._l((_vm.recommendations), function(recommendation, index) {
	    return _c('div', {
	      staticClass: "form-result-recommendations-item",
	      class: 'form-result-recommendations-item-' + index
	    }, [_c('div', {
	      staticClass: "form-result-recommendations-item-name"
	    }, [_vm._v("\n                    " + _vm._s(recommendation.name) + "\n                ")]), _vm._v(" "), _vm._m(0, true)])
	  }))]) : _vm._e(), _vm._v(" "), _c('div', {
	    staticClass: "form-part-buttons"
	  }, [_c('button', {
	    staticClass: "form-part-button",
	    on: {
	      "click": function($event) {
	        $event.preventDefault();
	        _vm.restartTest($event)
	      }
	    }
	  }, [_vm._v("Повторить тестирование")])])], 2) : _vm._e()
	},staticRenderFns: [function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
	  return _c('div', {
	    staticClass: "form-result-recommendations-item-buttons",
	    staticStyle: {
	      "display": "none"
	    }
	  }, [_c('a', {
	    staticClass: "form-result-recommendations-item-button",
	    attrs: {
	      "href": "#"
	    }
	  }, [_vm._v("Записаться")])])
	}]}
	module.exports.render._withStripped = true
	if (false) {
	  module.hot.accept()
	  if (module.hot.data) {
	     require("vue-hot-reload-api").rerender("data-v-44a60c60", module.exports)
	  }
	}

/***/ }),
/* 120 */
/***/ (function(module, exports, __webpack_require__) {

	
	/* styles */
	__webpack_require__(121)
	
	var Component = __webpack_require__(42)(
	  /* script */
	  __webpack_require__(123),
	  /* template */
	  __webpack_require__(131),
	  /* scopeId */
	  null,
	  /* cssModules */
	  null
	)
	Component.options.__file = "/Users/alexey/PhpstormProjects/nenaprasno-frontend/public/assets/screen/app/components/form-submit-auth-modal.vue"
	if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key !== "__esModule"})) {console.error("named exports are not supported in *.vue files.")}
	if (Component.options.functional) {console.error("[vue-loader] form-submit-auth-modal.vue: functional components are not supported with templates, they should use render functions.")}
	
	/* hot reload */
	if (false) {(function () {
	  var hotAPI = require("vue-hot-reload-api")
	  hotAPI.install(require("vue"), false)
	  if (!hotAPI.compatible) return
	  module.hot.accept()
	  if (!module.hot.data) {
	    hotAPI.createRecord("data-v-117b13ac", Component.options)
	  } else {
	    hotAPI.reload("data-v-117b13ac", Component.options)
	  }
	})()}
	
	module.exports = Component.exports


/***/ }),
/* 121 */
/***/ (function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag
	
	// load the styles
	var content = __webpack_require__(122);
	if(typeof content === 'string') content = [[module.id, content, '']];
	if(content.locals) module.exports = content.locals;
	// add the styles to the DOM
	var update = __webpack_require__(40)("4d3dcbe2", content, false);
	// Hot Module Replacement
	if(false) {
	 // When the styles change, update the <style> tags
	 if(!content.locals) {
	   module.hot.accept("!!../../node_modules/css-loader/index.js?sourceMap!../../node_modules/vue-loader/lib/style-rewriter.js?id=data-v-117b13ac!../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./form-submit-auth-modal.vue", function() {
	     var newContent = require("!!../../node_modules/css-loader/index.js?sourceMap!../../node_modules/vue-loader/lib/style-rewriter.js?id=data-v-117b13ac!../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./form-submit-auth-modal.vue");
	     if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
	     update(newContent);
	   });
	 }
	 // When the module is disposed, remove the <style> tags
	 module.hot.dispose(function() { update(); });
	}

/***/ }),
/* 122 */
/***/ (function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(39)();
	// imports
	
	
	// module
	exports.push([module.id, "\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n", "", {"version":3,"sources":[],"names":[],"mappings":"","file":"form-submit-auth-modal.vue","sourceRoot":""}]);
	
	// exports


/***/ }),
/* 123 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	
	var config = __webpack_require__(10),
	    axios = __webpack_require__(11),
	    userModalLogin = __webpack_require__(124),
	    userModalRegistration = __webpack_require__(127),
	    SocialAuth = __webpack_require__(128);
	
	module.exports = {
	    components: {
	        'social-auth': SocialAuth
	    },
	    data: function data() {
	        return {
	            login: null,
	            password: null,
	            formType: "register",
	            progress: false,
	            error: null
	        };
	    },
	
	    computed: {},
	    methods: {
	        closeModal: function closeModal() {
	            this.login = null;
	            this.password = null;
	            this.progress = false;
	            this.$store.commit('setSubmitAuthModal', false);
	        },
	        confirmCloseModal: function confirmCloseModal(message) {
	            var closeConfirm = confirm(config.messages.confirmSkipAuth);
	            if (closeConfirm) {
	                this.closeModal();
	            }
	        },
	        submitRegister: function submitRegister() {
	            var _this = this;
	
	            userModalRegistration(this).then(function () {
	                _this.cabinetAuthAndRedirect();
	            });
	        },
	        submitLogin: function submitLogin() {
	            var _this2 = this;
	
	            userModalLogin(this).then(function () {
	                _this2.cabinetAuthAndRedirect();
	            });
	        },
	        cabinetAuthAndRedirect: function cabinetAuthAndRedirect() {
	            var _this3 = this;
	
	            axios.post(config.cabinetURL + '/loginByToken', JSON.stringify({ token: this.$store.state.user.refreshToken }), {
	                headers: {
	                    "Content-Type": "application/json"
	                },
	                withCredentials: true
	            }).then(function () {
	                _this3.$store.commit('setSuccessModal', true);
	
	                setTimeout(function () {
	                    _this3.$store.state.form = {};
	                    _this3.$store.state.user = {};
	                    _this3.$store.state.userProfile = {};
	                    window.sessionStorage.clear();
	                }, 2000);
	
	                setTimeout(function () {
	                    window.location.replace(config.cabinetURL);
	                }, 5000);
	            }).catch(function (e) {
	                console.log(e);
	            });
	        }
	    }
	};

/***/ }),
/* 124 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	
	var config = __webpack_require__(10);
	var userAPI = __webpack_require__(125);
	var getUserProfile = __webpack_require__(126);
	
	function userLogin(vm) {
	    return new Promise(function (resolve, reject) {
	        vm.progress = true;
	
	        var loginType = vm.$store.state.user.sessionId ? 'loginAndMerge' : 'login';
	
	        userAPI[loginType]({
	            username: vm.login,
	            password: vm.password,
	            generateRefreshToken: true
	        }, vm.$store.state.user.sessionId).then(function (response) {
	            if (response.data.userId) {
	                vm.$store.commit('setUser', response.data);
	                vm.$store.commit('setUsername', vm.login);
	                vm.progress = false;
	                vm.closeModal();
	
	                getUserProfile(vm);
	
	                resolve();
	            }
	        }).catch(function (error) {
	            if (error.response) {
	                // The request was made, but the server responded with a status code
	                // that falls out of the range of 2xx
	                console.log(error.response.data);
	                console.log(error.response.status);
	                console.log(error.response.headers);
	
	                vm.error = "Ошибка: " + error.response.status;
	            } else {
	                // Something happened in setting up the request that triggered an Error
	                vm.error = "Ошибка запроса";
	                console.log('Error', error.message);
	            }
	            console.log(error.config);
	
	            vm.progress = false;
	
	            reject(e);
	        });
	    });
	}
	
	module.exports = userLogin;

/***/ }),
/* 125 */
/***/ (function(module, exports, __webpack_require__) {

	"use strict";
	
	var config = __webpack_require__(10);
	var axios = __webpack_require__(11);
	
	var instance = axios.create({
	    baseURL: config.apiUrl,
	    timeout: 10000,
	    headers: {
	        "Content-Type": "application/json",
	        "Accept": "application/json"
	    }
	});
	
	var user = {
	    login: function login(credentials) {
	        return instance.post('/login', credentials, {
	            headers: {
	                "Content-Type": "application/json"
	            }
	        });
	    },
	    loginAnonymous: function loginAnonymous() {
	        return instance.post('/login/anonymous', {}, {
	            headers: {
	                "Content-Type": "application/json"
	            }
	        });
	    },
	    loginByToken: function loginByToken(token) {
	        return instance.post('/login/byToken', JSON.stringify(token), {
	            headers: {
	                "Content-Type": "application/json"
	            }
	        });
	    },
	    loginAndMerge: function loginAndMerge(credentials, token) {
	        return instance.post('/users/loginAndMerge', credentials, {
	            headers: {
	                "Content-Type": "application/json",
	                "X-Appercode-Session-Token": token
	            }
	        });
	    },
	    logout: function logout(token) {
	        return instance.get('/logout', {
	            headers: {
	                "Content-Type": "application/json",
	                "X-Appercode-Session-Token": token
	            }
	        });
	    },
	
	
	    /*
	     newUser {
	         username (string, optional)
	         password (string, optional)
	         roleId (string, optional)
	         language (string, optional)
	     }
	    */
	    register: function register(newUser) {
	        return instance.post('/users', newUser);
	    },
	    registerAndMerge: function registerAndMerge(newUser, token) {
	        return instance.post('/users/registerAndMerge', newUser, {
	            headers: {
	                "Content-Type": "application/json",
	                "X-Appercode-Session-Token": token
	            }
	        });
	    },
	    getProfiles: function getProfiles(token, userId) {
	        return instance.get('/users/' + userId + '/profiles', {
	            headers: {
	                "Content-Type": "application/json",
	                "X-Appercode-Session-Token": token
	            }
	        });
	    },
	    getProfile: function getProfile(token, schemaId) {
	        return instance.get('/objects/' + config.userProfileName + '/' + schemaId, {
	            headers: {
	                "Content-Type": "application/json",
	                "X-Appercode-Session-Token": token
	            }
	        });
	    },
	    assignProfile: function assignProfile(token, schemaName, profile) {
	        return instance.post('/objects/' + schemaName, profile, {
	            headers: {
	                "Content-Type": "application/json",
	                "X-Appercode-Session-Token": token
	            }
	        });
	    },
	    saveProfile: function saveProfile(token, schemaName, schemaId, profile) {
	        return instance.put('/objects/' + schemaName + '/' + schemaId, profile, {
	            headers: {
	                "Content-Type": "application/json",
	                "X-Appercode-Session-Token": token
	            }
	        });
	    },
	    changePassword: function changePassword(token, userId, passwords) {
	        return instance.put(config.apiUrl + '/users/' + userId + '/changePassword', passwords, {
	            headers: {
	                "Content-Type": "application/json",
	                "X-Appercode-Session-Token": token
	            }
	        });
	    }
	};
	
	module.exports = user;

/***/ }),
/* 126 */
/***/ (function(module, exports, __webpack_require__) {

	"use strict";
	
	var config = __webpack_require__(10);
	var userAPI = __webpack_require__(125);
	
	function getUserProfile(vm) {
	    var userId = vm.$store.state.user.userId || vm.$store.state.user.id,
	        token = vm.$store.state.user.sessionId;
	
	    userAPI.getProfiles(token, userId).then(function (response) {
	        console.log(response);
	
	        var fundProfile = response.data.find(function (profile) {
	            return profile.schemaId == config.userProfileName;
	        });
	
	        console.log(fundProfile);
	
	        if (fundProfile) {
	            userAPI.getProfile(token, fundProfile.itemId).then(function (result) {
	                console.log(result);
	
	                vm.$store.commit('setUserProfileData', result.data);
	            }).catch(function (error) {
	                //todo: process error
	                console.log(error);
	            });
	        } else {
	            userAPI.assignProfile(token, config.userProfileName, { userId: userId }).then(function (result) {
	                vm.$store.commit('setUserProfileData', result.data);
	            }).catch(function (error) {
	                //todo: process error
	            });
	        }
	    }).catch(function (error) {
	        console.log(error);
	    });
	}
	
	module.exports = getUserProfile;

/***/ }),
/* 127 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	
	var config = __webpack_require__(10);
	var userAPI = __webpack_require__(125);
	var getUserProfile = __webpack_require__(126);
	
	function login(vm, response) {
	    userAPI.login({
	        username: vm.login,
	        password: vm.password
	    }).then(function (response) {
	        vm.$store.commit('setUser', response.data);
	        vm.$store.commit('setUsername', vm.login);
	        vm.closeModal();
	        getUserProfile(vm);
	    });
	}
	
	function processError(vm, error) {
	    if (error.response) {
	        // The request was made, but the server responded with a status code
	        // that falls out of the range of 2xx
	        console.log(error.response.data);
	        console.log(error.response.status);
	        console.log(error.response.headers);
	
	        // User already exists
	        if (error.response.status == 409) {
	            vm.error = "Ошибка: " + config.messages.errorUserAlreadyExists;
	        } else if (error.response.status == 401) {
	            vm.error = "Ошибка авторизации. Пожалуйста, проверьте логин и пароль.";
	        } else if ([401, 403, 409].indexOf(error.response.status) > -1) {
	            vm.error = "Ошибка: " + error.response.data.message;
	        } else {
	            vm.error = "Ошибка: " + error.response.status;
	        }
	    } else {
	        // Something happened in setting up the request that triggered an Error
	        vm.error = "Ошибка запроса";
	        console.log('Error', error.message);
	    }
	    console.log(error.config);
	}
	
	function userRegistration(vm) {
	    return new Promise(function (resolve, reject) {
	        vm.progress = true;
	
	        if (vm.$store.state.user && vm.$store.state.user.sessionId) {
	            userAPI.registerAndMerge({
	                username: vm.login,
	                password: vm.password,
	                generateRefreshToken: true
	            }, vm.$store.state.user.sessionId).then(function (response) {
	                login(vm, response);
	                resolve();
	            }).catch(function (error) {
	                processError(vm, error);
	                vm.progress = false;
	                reject(error);
	            });
	        } else {
	            userAPI.register({
	                username: vm.login,
	                password: vm.password,
	                generateRefreshToken: true
	            }).then(function (response) {
	                login(vm, response);
	                resolve();
	            }).catch(function (error) {
	                processError(vm, error);
	                vm.progress = false;
	                reject(error);
	            });
	        }
	    });
	}
	
	module.exports = userRegistration;

/***/ }),
/* 128 */
/***/ (function(module, exports, __webpack_require__) {

	var Component = __webpack_require__(42)(
	  /* script */
	  __webpack_require__(129),
	  /* template */
	  __webpack_require__(130),
	  /* scopeId */
	  null,
	  /* cssModules */
	  null
	)
	Component.options.__file = "/Users/alexey/PhpstormProjects/nenaprasno-frontend/public/assets/screen/app/components/social-auth.vue"
	if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key !== "__esModule"})) {console.error("named exports are not supported in *.vue files.")}
	if (Component.options.functional) {console.error("[vue-loader] social-auth.vue: functional components are not supported with templates, they should use render functions.")}
	
	/* hot reload */
	if (false) {(function () {
	  var hotAPI = require("vue-hot-reload-api")
	  hotAPI.install(require("vue"), false)
	  if (!hotAPI.compatible) return
	  module.hot.accept()
	  if (!module.hot.data) {
	    hotAPI.createRecord("data-v-dd7b43bc", Component.options)
	  } else {
	    hotAPI.reload("data-v-dd7b43bc", Component.options)
	  }
	})()}
	
	module.exports = Component.exports


/***/ }),
/* 129 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	
	var config = __webpack_require__(10);
	var axios = __webpack_require__(11);
	
	module.exports = {
	    data: function data() {
	        return {};
	    },
	
	    computed: {
	        token: function token() {
	            return this.$store.state.user.refreshToken;
	        }
	    },
	    methods: {
	        placeScripts: function placeScripts() {
	            function placeJS(d, s, id, src) {
	                return new Promise(function (resolve, reject) {
	                    var js = void 0,
	                        fjs = d.getElementsByTagName(s)[0];
	                    if (d.getElementById(id)) {
	                        return;
	                    }
	                    js = d.createElement(s);js.id = id;
	                    js.src = src;
	                    js.onload = function () {
	                        resolve();
	                    };
	                    fjs.parentNode.insertBefore(js, fjs);
	                });
	            }
	
	            var fb = placeJS(document, 'script', 'facebook-jssdk', 'https://connect.facebook.net/ru_ru/sdk.js');
	            var vk = placeJS(document, 'script', 'vk-openapi', 'https://vk.com/js/api/openapi.js?151');
	
	            Promise.all([fb, vk]).then(function () {
	                VK.init({
	                    apiId: config.APP_VK
	                });
	
	                FB.init({
	                    appId: config.APP_FB,
	                    cookie: true,
	                    xfbml: true,
	                    version: 'v2.11'
	                });
	
	                FB.AppEvents.logPageView();
	            });
	        },
	        handleSocial: function handleSocial(networkName, userId) {
	            var url = config.cabinetURL + '/loginBySocial';
	
	            axios.post(url, {
	                userId: userId,
	                networkName: networkName,
	                sessionId: this.$store.state.user.sessionId,
	                refreshToken: this.$store.state.user.refreshToken
	            }, {
	                headers: {
	                    "Content-Type": "application/json"
	                },
	                withCredentials: true
	            }).then(function (res) {
	                if (res.data && res.data.type === 'success') {
	                    window.location.href = res.data.data;
	                }
	            }).catch(function (e) {
	                alert("Ошибка авторизации");
	                console.log(e);
	            });
	        },
	        loginFb: function loginFb() {
	            var _this = this;
	
	            FB.getLoginStatus(function (response) {
	                console.log(response);
	                if (response.authResponse) {
	                    _this.handleSocial('fb', response.authResponse.userID);
	                } else {
	                    FB.login(function (response) {
	                        if (response.authResponse) {
	                            _this.handleSocial('fb', response.authResponse.userID);
	                        } else {
	                            console.log('Пользователь передумал логиниться через ФБ');
	                        }
	                    }, {
	                        scope: 'email'
	                    });
	                }
	            }, {
	                scope: 'email,id'
	            });
	        },
	        loginVk: function loginVk() {
	            var _this2 = this;
	
	            VK.Auth.login(function (res) {
	                if (res.status === "connected" && res.hasOwnProperty('session')) {
	                    _this2.handleSocial('vk', res.session.user.id);
	                }
	            }, 4194304);
	        }
	    },
	    created: function created() {
	        this.placeScripts();
	    }
	};

/***/ }),
/* 130 */
/***/ (function(module, exports, __webpack_require__) {

	module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
	  return _c('div', {
	    staticClass: "social-auth"
	  }, [_c('div', {
	    staticClass: "social-auth-item"
	  }, [_c('a', {
	    staticClass: "social-auth-item-link social-auth-item-link-vk",
	    attrs: {
	      "href": "#"
	    },
	    on: {
	      "click": function($event) {
	        $event.preventDefault();
	        _vm.loginVk($event)
	      }
	    }
	  }, [_vm._v("\n            Вконтакте\n        ")])]), _vm._v(" "), _c('div', {
	    staticClass: "social-auth-item"
	  }, [_c('a', {
	    staticClass: "social-auth-item-link social-auth-item-link-fb",
	    attrs: {
	      "href": "#"
	    },
	    on: {
	      "click": function($event) {
	        $event.preventDefault();
	        _vm.loginFb($event)
	      }
	    }
	  }, [_vm._v("\n            Facebook\n        ")])])])
	},staticRenderFns: []}
	module.exports.render._withStripped = true
	if (false) {
	  module.hot.accept()
	  if (module.hot.data) {
	     require("vue-hot-reload-api").rerender("data-v-dd7b43bc", module.exports)
	  }
	}

/***/ }),
/* 131 */
/***/ (function(module, exports, __webpack_require__) {

	module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
	  return _c('div', {
	    staticClass: "modal-overlay"
	  }, [_c('div', {
	    staticClass: "form-auth-modal",
	    class: _vm.progress ? 'in-progress' : ''
	  }, [_c('div', {
	    staticClass: "form-auth-modal-padding"
	  }, [_c('a', {
	    staticClass: "form-auth-modal-close",
	    attrs: {
	      "href": "#"
	    },
	    on: {
	      "click": function($event) {
	        $event.preventDefault();
	        _vm.confirmCloseModal('Вы действительно не хотите отказаться от сохранения результатов теста на ваш Email?')
	      }
	    }
	  }), _vm._v(" "), _c('div', {
	    staticClass: "form-auth-modal-title"
	  }, [_vm._v("\n                Результат теста\n            ")]), _vm._v(" "), _c('div', {
	    staticClass: "form-auth-modal-subtitle"
	  }, [_vm._v("\n                Пожалуйста, зарегистрируйтесь и мы отправим вам полные результаты тестирования\n            ")]), _vm._v(" "), (_vm.formType == 'register') ? _c('div', [_c('form', {
	    staticClass: "form-auth-modal-form",
	    attrs: {
	      "autocomplete": "off"
	    },
	    on: {
	      "submit": function($event) {
	        $event.preventDefault();
	        _vm.submitRegister($event)
	      }
	    }
	  }, [_c('div', {
	    staticClass: "form-auth-modal-control"
	  }, [_c('label', {
	    staticClass: "form-auth-modal-label"
	  }, [_vm._v("\n                            E-mail\n                        ")]), _vm._v(" "), _c('input', {
	    directives: [{
	      name: "model",
	      rawName: "v-model",
	      value: (_vm.login),
	      expression: "login"
	    }],
	    staticClass: "form-auth-modal-input",
	    attrs: {
	      "type": "text",
	      "required": "",
	      "placeholder": "Введите e-mail адрес"
	    },
	    domProps: {
	      "value": (_vm.login)
	    },
	    on: {
	      "input": function($event) {
	        if ($event.target.composing) { return; }
	        _vm.login = $event.target.value
	      }
	    }
	  })]), _vm._v(" "), _c('div', {
	    staticClass: "form-auth-modal-control"
	  }, [_c('label', {
	    staticClass: "form-auth-modal-label"
	  }, [_vm._v("\n                            Пароль\n                        ")]), _vm._v(" "), _c('input', {
	    directives: [{
	      name: "model",
	      rawName: "v-model",
	      value: (_vm.password),
	      expression: "password"
	    }],
	    staticClass: "form-auth-modal-input",
	    attrs: {
	      "type": "password",
	      "required": "",
	      "placeholder": "Придумайте пароль"
	    },
	    domProps: {
	      "value": (_vm.password)
	    },
	    on: {
	      "input": function($event) {
	        if ($event.target.composing) { return; }
	        _vm.password = $event.target.value
	      }
	    }
	  })]), _vm._v(" "), _vm._m(0)]), _vm._v(" "), (_vm.error) ? _c('div', {
	    staticClass: "form-auth-modal-error"
	  }, [_vm._v("\n                    " + _vm._s(_vm.error) + "\n                ")]) : _vm._e(), _vm._v(" "), _c('div', {
	    staticClass: "form-auth-modal-sublinks"
	  }, [_c('a', {
	    attrs: {
	      "href": "#"
	    },
	    on: {
	      "click": function($event) {
	        $event.preventDefault();
	        _vm.formType = 'login'
	      }
	    }
	  }, [_vm._v("\n                        Уже зарегистрирован\n                    ")]), _vm._v(" "), _c('a', {
	    attrs: {
	      "href": "#"
	    },
	    on: {
	      "click": function($event) {
	        $event.preventDefault();
	        _vm.confirmCloseModal('Вы действительно не хотите отказаться от сохранения результатов теста на ваш Email?')
	      }
	    }
	  }, [_vm._v("\n                        Продолжить без регистрации\n                    ")])])]) : _vm._e(), _vm._v(" "), (_vm.formType == 'login') ? _c('div', [_c('form', {
	    staticClass: "form-auth-modal-form",
	    on: {
	      "submit": function($event) {
	        $event.preventDefault();
	        _vm.submitLogin($event)
	      }
	    }
	  }, [_c('div', {
	    staticClass: "form-auth-modal-control"
	  }, [_c('label', {
	    staticClass: "form-auth-modal-label"
	  }, [_vm._v("\n                            E-mail\n                        ")]), _vm._v(" "), _c('input', {
	    directives: [{
	      name: "model",
	      rawName: "v-model",
	      value: (_vm.login),
	      expression: "login"
	    }],
	    staticClass: "form-auth-modal-input",
	    attrs: {
	      "type": "text",
	      "required": "",
	      "placeholder": "Ваш e-mail адрес"
	    },
	    domProps: {
	      "value": (_vm.login)
	    },
	    on: {
	      "input": function($event) {
	        if ($event.target.composing) { return; }
	        _vm.login = $event.target.value
	      }
	    }
	  })]), _vm._v(" "), _c('div', {
	    staticClass: "form-auth-modal-control"
	  }, [_c('label', {
	    staticClass: "form-auth-modal-label"
	  }, [_vm._v("\n                            Пароль\n                        ")]), _vm._v(" "), _c('input', {
	    directives: [{
	      name: "model",
	      rawName: "v-model",
	      value: (_vm.password),
	      expression: "password"
	    }],
	    staticClass: "form-auth-modal-input",
	    attrs: {
	      "type": "password",
	      "required": "",
	      "placeholder": "Ваш пароль"
	    },
	    domProps: {
	      "value": (_vm.password)
	    },
	    on: {
	      "input": function($event) {
	        if ($event.target.composing) { return; }
	        _vm.password = $event.target.value
	      }
	    }
	  })]), _vm._v(" "), _c('div', {
	    staticClass: "form-auth-modal-control"
	  }, [_c('button', {
	    staticClass: "form-auth-modal-submit",
	    class: _vm.progress ? 'in-progress' : '',
	    attrs: {
	      "type": "submit"
	    }
	  }, [_vm._v("\n                            Войти\n                        ")])]), _vm._v(" "), (_vm.error) ? _c('div', {
	    staticClass: "form-auth-modal-error"
	  }, [_vm._v("\n                        " + _vm._s(_vm.error) + "\n                    ")]) : _vm._e(), _vm._v(" "), _c('div', {
	    staticClass: "form-auth-modal-sublinks"
	  }, [_c('a', {
	    attrs: {
	      "href": "#"
	    },
	    on: {
	      "click": function($event) {
	        $event.preventDefault();
	        _vm.formType = 'register'
	      }
	    }
	  }, [_vm._v("\n                            Зарегистрироваться\n                        ")]), _vm._v(" "), _c('a', {
	    attrs: {
	      "href": "#"
	    },
	    on: {
	      "click": function($event) {
	        $event.preventDefault();
	        _vm.confirmCloseModal('Вы действительно не хотите отказаться от сохранения результатов теста на ваш Email?')
	      }
	    }
	  }, [_vm._v("\n                            Продолжить без регистрации\n                        ")])])])]) : _vm._e()]), _vm._v(" "), _c('div', {
	    staticClass: "form-auth-modal-footer"
	  }, [_c('div', {
	    staticClass: "form-auth-modal-padding"
	  }, [_c('div', {
	    staticClass: "form-auth-modal-socials"
	  }, [_c('div', {
	    staticClass: "form-auth-modal-socials-title"
	  }, [_vm._v("\n                        Войти с помощью вашего аккаунта в соцсети\n                    ")]), _vm._v(" "), _c('social-auth')], 1)])])])])
	},staticRenderFns: [function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
	  return _c('div', {
	    staticClass: "form-auth-modal-control"
	  }, [_c('button', {
	    staticClass: "form-auth-modal-submit",
	    attrs: {
	      "type": "submit"
	    }
	  }, [_vm._v("\n                            Зарегистрироваться\n                        ")])])
	}]}
	module.exports.render._withStripped = true
	if (false) {
	  module.hot.accept()
	  if (module.hot.data) {
	     require("vue-hot-reload-api").rerender("data-v-117b13ac", module.exports)
	  }
	}

/***/ }),
/* 132 */
/***/ (function(module, exports, __webpack_require__) {

	
	/* styles */
	__webpack_require__(133)
	
	var Component = __webpack_require__(42)(
	  /* script */
	  __webpack_require__(135),
	  /* template */
	  __webpack_require__(136),
	  /* scopeId */
	  null,
	  /* cssModules */
	  null
	)
	Component.options.__file = "/Users/alexey/PhpstormProjects/nenaprasno-frontend/public/assets/screen/app/components/form-auth-modal.vue"
	if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key !== "__esModule"})) {console.error("named exports are not supported in *.vue files.")}
	if (Component.options.functional) {console.error("[vue-loader] form-auth-modal.vue: functional components are not supported with templates, they should use render functions.")}
	
	/* hot reload */
	if (false) {(function () {
	  var hotAPI = require("vue-hot-reload-api")
	  hotAPI.install(require("vue"), false)
	  if (!hotAPI.compatible) return
	  module.hot.accept()
	  if (!module.hot.data) {
	    hotAPI.createRecord("data-v-2a1390ea", Component.options)
	  } else {
	    hotAPI.reload("data-v-2a1390ea", Component.options)
	  }
	})()}
	
	module.exports = Component.exports


/***/ }),
/* 133 */
/***/ (function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag
	
	// load the styles
	var content = __webpack_require__(134);
	if(typeof content === 'string') content = [[module.id, content, '']];
	if(content.locals) module.exports = content.locals;
	// add the styles to the DOM
	var update = __webpack_require__(40)("e51dc550", content, false);
	// Hot Module Replacement
	if(false) {
	 // When the styles change, update the <style> tags
	 if(!content.locals) {
	   module.hot.accept("!!../../node_modules/css-loader/index.js?sourceMap!../../node_modules/vue-loader/lib/style-rewriter.js?id=data-v-2a1390ea!../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./form-auth-modal.vue", function() {
	     var newContent = require("!!../../node_modules/css-loader/index.js?sourceMap!../../node_modules/vue-loader/lib/style-rewriter.js?id=data-v-2a1390ea!../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./form-auth-modal.vue");
	     if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
	     update(newContent);
	   });
	 }
	 // When the module is disposed, remove the <style> tags
	 module.hot.dispose(function() { update(); });
	}

/***/ }),
/* 134 */
/***/ (function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(39)();
	// imports
	
	
	// module
	exports.push([module.id, "\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n", "", {"version":3,"sources":[],"names":[],"mappings":"","file":"form-auth-modal.vue","sourceRoot":""}]);
	
	// exports


/***/ }),
/* 135 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	
	var config = __webpack_require__(10),
	    userModalLogin = __webpack_require__(124),
	    userModalRegistration = __webpack_require__(127);
	
	module.exports = {
	    data: function data() {
	        return {
	            login: null,
	            password: null,
	            progress: false,
	            error: null
	        };
	    },
	
	    computed: {
	        formType: function formType() {
	            return this.$store.state.authModalType;
	        }
	    },
	    methods: {
	        closeModal: function closeModal() {
	            this.login = null;
	            this.password = null;
	            this.progress = false;
	            this.error = null;
	            this.$store.commit('setAuthModal', false);
	        },
	        submitRegister: function submitRegister() {
	            userModalRegistration(this);
	        },
	        submitLogin: function submitLogin() {
	            userModalLogin(this);
	        }
	    }
	};

/***/ }),
/* 136 */
/***/ (function(module, exports, __webpack_require__) {

	module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
	  return _c('div', {
	    staticClass: "modal-overlay",
	    on: {
	      "click": function($event) {
	        if ($event.target !== $event.currentTarget) { return null; }
	        _vm.closeModal($event)
	      }
	    }
	  }, [_c('div', {
	    staticClass: "form-auth-modal",
	    class: _vm.progress ? 'in-progress' : ''
	  }, [_c('a', {
	    staticClass: "form-auth-modal-close",
	    attrs: {
	      "href": "#"
	    },
	    on: {
	      "click": function($event) {
	        $event.preventDefault();
	        _vm.closeModal($event)
	      }
	    }
	  }), _vm._v(" "), (_vm.formType == 'register') ? _c('div', [_c('div', {
	    staticClass: "form-auth-modal-title"
	  }, [_vm._v("Регистрация")]), _vm._v(" "), _c('form', {
	    staticClass: "form-auth-modal-form",
	    attrs: {
	      "autocomplete": "off"
	    },
	    on: {
	      "submit": function($event) {
	        $event.preventDefault();
	        _vm.submitRegister($event)
	      }
	    }
	  }, [_c('input', {
	    directives: [{
	      name: "model",
	      rawName: "v-model",
	      value: (_vm.login),
	      expression: "login"
	    }],
	    staticClass: "form-auth-modal-input",
	    attrs: {
	      "type": "text",
	      "required": "",
	      "placeholder": "Придумайте логин"
	    },
	    domProps: {
	      "value": (_vm.login)
	    },
	    on: {
	      "input": function($event) {
	        if ($event.target.composing) { return; }
	        _vm.login = $event.target.value
	      }
	    }
	  }), _vm._v(" "), _c('input', {
	    directives: [{
	      name: "model",
	      rawName: "v-model",
	      value: (_vm.password),
	      expression: "password"
	    }],
	    staticClass: "form-auth-modal-input",
	    attrs: {
	      "type": "password",
	      "required": "",
	      "placeholder": "Придумайте пароль"
	    },
	    domProps: {
	      "value": (_vm.password)
	    },
	    on: {
	      "input": function($event) {
	        if ($event.target.composing) { return; }
	        _vm.password = $event.target.value
	      }
	    }
	  }), _vm._v(" "), _c('button', {
	    staticClass: "form-auth-modal-submit",
	    attrs: {
	      "type": "submit"
	    }
	  }, [_vm._v("Зарегистрироваться")])])]) : _vm._e(), _vm._v(" "), (_vm.formType == 'login') ? _c('div', [_c('div', {
	    staticClass: "form-auth-modal-title"
	  }, [_vm._v("Вход")]), _vm._v(" "), _c('form', {
	    staticClass: "form-auth-modal-form",
	    on: {
	      "submit": function($event) {
	        $event.preventDefault();
	        _vm.submitLogin($event)
	      }
	    }
	  }, [_c('input', {
	    directives: [{
	      name: "model",
	      rawName: "v-model",
	      value: (_vm.login),
	      expression: "login"
	    }],
	    staticClass: "form-auth-modal-input",
	    attrs: {
	      "type": "text",
	      "required": "",
	      "placeholder": "Ваш логин"
	    },
	    domProps: {
	      "value": (_vm.login)
	    },
	    on: {
	      "input": function($event) {
	        if ($event.target.composing) { return; }
	        _vm.login = $event.target.value
	      }
	    }
	  }), _vm._v(" "), _c('input', {
	    directives: [{
	      name: "model",
	      rawName: "v-model",
	      value: (_vm.password),
	      expression: "password"
	    }],
	    staticClass: "form-auth-modal-input",
	    attrs: {
	      "type": "password",
	      "required": "",
	      "placeholder": "Ваш пароль"
	    },
	    domProps: {
	      "value": (_vm.password)
	    },
	    on: {
	      "input": function($event) {
	        if ($event.target.composing) { return; }
	        _vm.password = $event.target.value
	      }
	    }
	  }), _vm._v(" "), _c('button', {
	    staticClass: "form-auth-modal-submit",
	    class: _vm.progress ? 'in-progress' : '',
	    attrs: {
	      "type": "submit"
	    }
	  }, [_vm._v("Войти")])])]) : _vm._e(), _vm._v(" "), (_vm.error) ? _c('div', {
	    staticClass: "form-auth-modal-error"
	  }, [_vm._v("\n            " + _vm._s(_vm.error) + "\n        ")]) : _vm._e()])])
	},staticRenderFns: []}
	module.exports.render._withStripped = true
	if (false) {
	  module.hot.accept()
	  if (module.hot.data) {
	     require("vue-hot-reload-api").rerender("data-v-2a1390ea", module.exports)
	  }
	}

/***/ }),
/* 137 */
/***/ (function(module, exports, __webpack_require__) {

	
	/* styles */
	__webpack_require__(138)
	
	var Component = __webpack_require__(42)(
	  /* script */
	  __webpack_require__(140),
	  /* template */
	  __webpack_require__(141),
	  /* scopeId */
	  null,
	  /* cssModules */
	  null
	)
	Component.options.__file = "/Users/alexey/PhpstormProjects/nenaprasno-frontend/public/assets/screen/app/components/form-profile-modal.vue"
	if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key !== "__esModule"})) {console.error("named exports are not supported in *.vue files.")}
	if (Component.options.functional) {console.error("[vue-loader] form-profile-modal.vue: functional components are not supported with templates, they should use render functions.")}
	
	/* hot reload */
	if (false) {(function () {
	  var hotAPI = require("vue-hot-reload-api")
	  hotAPI.install(require("vue"), false)
	  if (!hotAPI.compatible) return
	  module.hot.accept()
	  if (!module.hot.data) {
	    hotAPI.createRecord("data-v-140e5d16", Component.options)
	  } else {
	    hotAPI.reload("data-v-140e5d16", Component.options)
	  }
	})()}
	
	module.exports = Component.exports


/***/ }),
/* 138 */
/***/ (function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag
	
	// load the styles
	var content = __webpack_require__(139);
	if(typeof content === 'string') content = [[module.id, content, '']];
	if(content.locals) module.exports = content.locals;
	// add the styles to the DOM
	var update = __webpack_require__(40)("23f55d5a", content, false);
	// Hot Module Replacement
	if(false) {
	 // When the styles change, update the <style> tags
	 if(!content.locals) {
	   module.hot.accept("!!../../node_modules/css-loader/index.js?sourceMap!../../node_modules/vue-loader/lib/style-rewriter.js?id=data-v-140e5d16!../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./form-profile-modal.vue", function() {
	     var newContent = require("!!../../node_modules/css-loader/index.js?sourceMap!../../node_modules/vue-loader/lib/style-rewriter.js?id=data-v-140e5d16!../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./form-profile-modal.vue");
	     if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
	     update(newContent);
	   });
	 }
	 // When the module is disposed, remove the <style> tags
	 module.hot.dispose(function() { update(); });
	}

/***/ }),
/* 139 */
/***/ (function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(39)();
	// imports
	
	
	// module
	exports.push([module.id, "\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n", "", {"version":3,"sources":[],"names":[],"mappings":"","file":"form-profile-modal.vue","sourceRoot":""}]);
	
	// exports


/***/ }),
/* 140 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	
	var config = __webpack_require__(10),
	    userAPI = __webpack_require__(125),
	    getUserProfile = __webpack_require__(126);
	
	module.exports = {
	    data: function data() {
	        return {
	            user: {
	                name: '',
	                middlename: '',
	                surname: '',
	                sex: '',
	                phone: '',
	                email: ''
	            },
	            oldPassword: null,
	            newPassword: null,
	            submitProfileError: null,
	            submitPasswordError: null,
	            progress: false
	        };
	    },
	
	    computed: {
	        username: function username() {
	            return this.$store.state.userProfile.username;
	        }
	    },
	    methods: {
	        closeModal: function closeModal() {
	            getUserProfile(this);
	            this.progress = false;
	            this.submitProfileError = null;
	            this.submitPasswordError = null;
	            this.$store.commit('setProfileModal', false);
	        },
	        submitProfile: function submitProfile() {
	            var _this = this;
	
	            userAPI.saveProfile(_this.$store.state.user.sessionId, config.userProfileName, _this.$store.state.userProfile.data.id, {
	                name: _this.user.name,
	                patronymic: _this.user.middlename,
	                surname: _this.user.surname,
	                sex: _this.user.sex,
	                phone: _this.user.phone,
	                email: _this.user.email
	            }).then(function (response) {
	                alert(config.messages.successProfileSave);
	            }).catch(function (error) {
	                _this.progress = false;
	                _this.submitProfileError = "Ошибка сохранения профиля";
	                //todo: process error
	            });
	        },
	        submitPassword: function submitPassword() {
	            var _this = this;
	
	            _this.progress = true;
	
	            userAPI.changePassword(_this.$store.state.user.sessionId, _this.$store.state.user.userId, {
	                oldPassword: _this.oldPassword,
	                newPassword: _this.newPassword
	            }).then(function (response) {
	                console.log(response);
	                alert(config.messages.successPasswordChange);
	                _this.oldPassword = null;
	                _this.newPassword = null;
	
	                _this.progress = false;_this.progress = false;
	            }).catch(function (error) {
	                if (error.response) {
	                    // The request was made, but the server responded with a status code
	                    // that falls out of the range of 2xx
	                    console.log(error.response.data);
	                    console.log(error.response.status);
	                    console.log(error.response.headers);
	
	                    _this.submitPasswordError = "Ошибка: " + error.response.status;
	                } else {
	                    // Something happened in setting up the request that triggered an Error
	                    _this.submitPasswordError = "Ошибка запроса";
	                    console.log('Error', error.message);
	                }
	                console.log(error.config);
	
	                _this.progress = false;
	            });
	        }
	    },
	    mounted: function mounted() {
	        getUserProfile(this);
	
	        if (this.$store.state.userProfile.data) {
	            this.user.name = this.$store.state.userProfile.data.name || "";
	            this.user.middlename = this.$store.state.userProfile.data.patronymic || "";
	            this.user.surname = this.$store.state.userProfile.data.surname || "";
	            this.user.sex = this.$store.state.userProfile.data.sex == null ? true : this.$store.state.userProfile.data.sex;
	            this.user.phone = this.$store.state.userProfile.data.phone || "";
	            this.user.email = this.$store.state.userProfile.data.email || "";
	        }
	    }
	};

/***/ }),
/* 141 */
/***/ (function(module, exports, __webpack_require__) {

	module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
	  return _c('div', {
	    staticClass: "modal-overlay",
	    on: {
	      "click": function($event) {
	        if ($event.target !== $event.currentTarget) { return null; }
	        _vm.closeModal($event)
	      }
	    }
	  }, [_c('div', {
	    staticClass: "form-profile-modal",
	    class: _vm.progress ? 'in-progress' : ''
	  }, [_c('a', {
	    staticClass: "form-auth-modal-close",
	    attrs: {
	      "href": "#"
	    },
	    on: {
	      "click": function($event) {
	        $event.preventDefault();
	        _vm.closeModal($event)
	      }
	    }
	  }), _vm._v(" "), _c('div', {
	    staticClass: "form-profile-modal-padding"
	  }, [_c('div', {
	    staticClass: "form-profile-modal-title"
	  }, [_vm._v("Личный кабинет")]), _vm._v(" "), _c('form', {
	    staticClass: "form-profile-modal-form form-profile-modal-form-user",
	    attrs: {
	      "autocomplete": "off"
	    },
	    on: {
	      "submit": function($event) {
	        $event.preventDefault();
	        _vm.submitProfile($event)
	      }
	    }
	  }, [_c('div', {
	    staticClass: "form-profile-modal-row"
	  }, [_c('div', {
	    staticClass: "form-profile-modal-col"
	  }, [_c('label', {
	    staticClass: "form-profile-modal-label"
	  }, [_vm._v("\n                            Имя\n                            "), _c('input', {
	    directives: [{
	      name: "model",
	      rawName: "v-model",
	      value: (_vm.user.name),
	      expression: "user.name"
	    }],
	    staticClass: "form-profile-modal-input",
	    attrs: {
	      "type": "text"
	    },
	    domProps: {
	      "value": (_vm.user.name)
	    },
	    on: {
	      "input": function($event) {
	        if ($event.target.composing) { return; }
	        _vm.$set(_vm.user, "name", $event.target.value)
	      }
	    }
	  })])]), _vm._v(" "), _c('div', {
	    staticClass: "form-profile-modal-col"
	  }, [_c('label', {
	    staticClass: "form-profile-modal-label"
	  }, [_vm._v("\n                            Фамилия\n                            "), _c('input', {
	    directives: [{
	      name: "model",
	      rawName: "v-model",
	      value: (_vm.user.surname),
	      expression: "user.surname"
	    }],
	    staticClass: "form-profile-modal-input",
	    attrs: {
	      "type": "text"
	    },
	    domProps: {
	      "value": (_vm.user.surname)
	    },
	    on: {
	      "input": function($event) {
	        if ($event.target.composing) { return; }
	        _vm.$set(_vm.user, "surname", $event.target.value)
	      }
	    }
	  })])])]), _vm._v(" "), _c('div', {
	    staticClass: "form-profile-modal-row"
	  }, [_c('div', {
	    staticClass: "form-profile-modal-col"
	  }, [_c('label', {
	    staticClass: "form-profile-modal-label"
	  }, [_vm._v("\n                            Отчество\n                            "), _c('input', {
	    directives: [{
	      name: "model",
	      rawName: "v-model",
	      value: (_vm.user.middlename),
	      expression: "user.middlename"
	    }],
	    staticClass: "form-profile-modal-input",
	    attrs: {
	      "type": "text"
	    },
	    domProps: {
	      "value": (_vm.user.middlename)
	    },
	    on: {
	      "input": function($event) {
	        if ($event.target.composing) { return; }
	        _vm.$set(_vm.user, "middlename", $event.target.value)
	      }
	    }
	  })])]), _vm._v(" "), _c('div', {
	    staticClass: "form-profile-modal-col"
	  }, [_c('label', {
	    staticClass: "form-profile-modal-label"
	  }, [_vm._v("\n                            Пол\n                        ")]), _vm._v(" "), _c('div', {
	    staticClass: "form-control-radiobutton-item"
	  }, [_c('input', {
	    directives: [{
	      name: "model",
	      rawName: "v-model",
	      value: (_vm.user.sex),
	      expression: "user.sex"
	    }],
	    staticClass: "form-profile-modal-input",
	    attrs: {
	      "id": "form-profile-modal-sex-field-man",
	      "type": "radio",
	      "value": "true"
	    },
	    domProps: {
	      "checked": _vm._q(_vm.user.sex, "true")
	    },
	    on: {
	      "change": function($event) {
	        _vm.$set(_vm.user, "sex", "true")
	      }
	    }
	  }), _vm._v(" "), _c('label', {
	    attrs: {
	      "for": "form-profile-modal-sex-field-man"
	    }
	  }, [_vm._v("Мужчина")])]), _vm._v(" "), _c('div', {
	    staticClass: "form-control-radiobutton-item"
	  }, [_c('input', {
	    directives: [{
	      name: "model",
	      rawName: "v-model",
	      value: (_vm.user.sex),
	      expression: "user.sex"
	    }],
	    staticClass: "form-profile-modal-input",
	    attrs: {
	      "id": "form-profile-modal-sex-field-woman",
	      "type": "radio",
	      "value": "false"
	    },
	    domProps: {
	      "checked": _vm._q(_vm.user.sex, "false")
	    },
	    on: {
	      "change": function($event) {
	        _vm.$set(_vm.user, "sex", "false")
	      }
	    }
	  }), _vm._v(" "), _c('label', {
	    attrs: {
	      "for": "form-profile-modal-sex-field-woman"
	    }
	  }, [_vm._v("Ура, я женщина!")])])])]), _vm._v(" "), _c('div', {
	    staticClass: "form-profile-modal-row"
	  }, [_c('div', {
	    staticClass: "form-profile-modal-col"
	  }, [_c('label', {
	    staticClass: "form-profile-modal-label"
	  }, [_vm._v("\n                            Телефон\n                            "), _c('input', {
	    directives: [{
	      name: "model",
	      rawName: "v-model",
	      value: (_vm.user.phone),
	      expression: "user.phone"
	    }],
	    staticClass: "form-profile-modal-input",
	    attrs: {
	      "type": "text"
	    },
	    domProps: {
	      "value": (_vm.user.phone)
	    },
	    on: {
	      "input": function($event) {
	        if ($event.target.composing) { return; }
	        _vm.$set(_vm.user, "phone", $event.target.value)
	      }
	    }
	  })])]), _vm._v(" "), _c('div', {
	    staticClass: "form-profile-modal-col"
	  }, [_c('label', {
	    staticClass: "form-profile-modal-label"
	  }, [_vm._v("\n                            E-mail\n                            "), _c('input', {
	    directives: [{
	      name: "model",
	      rawName: "v-model",
	      value: (_vm.user.email),
	      expression: "user.email"
	    }],
	    staticClass: "form-profile-modal-input",
	    attrs: {
	      "type": "email"
	    },
	    domProps: {
	      "value": (_vm.user.email)
	    },
	    on: {
	      "input": function($event) {
	        if ($event.target.composing) { return; }
	        _vm.$set(_vm.user, "email", $event.target.value)
	      }
	    }
	  })])])]), _vm._v(" "), (_vm.submitProfileError) ? _c('div', {
	    staticClass: "form-profile-modal-error"
	  }, [_vm._v("\n                    " + _vm._s(_vm.submitProfileError) + "\n                ")]) : _vm._e(), _vm._v(" "), _c('button', {
	    staticClass: "form-profile-modal-submit",
	    class: _vm.progress ? 'in-progress' : '',
	    attrs: {
	      "type": "submit"
	    }
	  }, [_vm._v("Сохранить")])])]), _vm._v(" "), _c('div', {
	    staticClass: "form-profile-modal-padding"
	  }, [_c('div', {
	    staticClass: "form-profile-modal-title"
	  }, [_vm._v("Изменения пароля")]), _vm._v(" "), _c('form', {
	    staticClass: "form-profile-modal-form form-profile-modal-form-password",
	    attrs: {
	      "autocomplete": "off"
	    },
	    on: {
	      "submit": function($event) {
	        $event.preventDefault();
	        _vm.submitPassword($event)
	      }
	    }
	  }, [_c('div', {
	    staticClass: "form-profile-modal-row"
	  }, [_c('div', {
	    staticClass: "form-profile-modal-col-3"
	  }, [_c('label', {
	    staticClass: "form-profile-modal-label"
	  }, [_vm._v("\n                            Логин\n                            "), _c('input', {
	    directives: [{
	      name: "model",
	      rawName: "v-model",
	      value: (_vm.username),
	      expression: "username"
	    }],
	    staticClass: "form-profile-modal-input",
	    attrs: {
	      "type": "text",
	      "disabled": ""
	    },
	    domProps: {
	      "value": (_vm.username)
	    },
	    on: {
	      "input": function($event) {
	        if ($event.target.composing) { return; }
	        _vm.username = $event.target.value
	      }
	    }
	  })])]), _vm._v(" "), _c('div', {
	    staticClass: "form-profile-modal-col-3"
	  }, [_c('label', {
	    staticClass: "form-profile-modal-label"
	  }, [_vm._v("\n                            Текущий пароль\n                            "), _c('input', {
	    directives: [{
	      name: "model",
	      rawName: "v-model",
	      value: (_vm.oldPassword),
	      expression: "oldPassword"
	    }],
	    staticClass: "form-profile-modal-input",
	    attrs: {
	      "type": "text",
	      "required": ""
	    },
	    domProps: {
	      "value": (_vm.oldPassword)
	    },
	    on: {
	      "input": function($event) {
	        if ($event.target.composing) { return; }
	        _vm.oldPassword = $event.target.value
	      }
	    }
	  })])]), _vm._v(" "), _c('div', {
	    staticClass: "form-profile-modal-col-3"
	  }, [_c('label', {
	    staticClass: "form-profile-modal-label"
	  }, [_vm._v("\n                            Новый пароль\n                            "), _c('input', {
	    directives: [{
	      name: "model",
	      rawName: "v-model",
	      value: (_vm.newPassword),
	      expression: "newPassword"
	    }],
	    staticClass: "form-profile-modal-input",
	    attrs: {
	      "type": "text",
	      "required": ""
	    },
	    domProps: {
	      "value": (_vm.newPassword)
	    },
	    on: {
	      "input": function($event) {
	        if ($event.target.composing) { return; }
	        _vm.newPassword = $event.target.value
	      }
	    }
	  })])])]), _vm._v(" "), (_vm.submitPasswordError) ? _c('div', {
	    staticClass: "form-profile-modal-error"
	  }, [_vm._v("\n                    " + _vm._s(_vm.submitPasswordError) + "\n                ")]) : _vm._e(), _vm._v(" "), _c('button', {
	    staticClass: "form-profile-modal-submit",
	    class: _vm.progress ? 'in-progress' : '',
	    attrs: {
	      "type": "submit"
	    }
	  }, [_vm._v("Изменить пароль")])])])]), _vm._v("\n    ы\n")])
	},staticRenderFns: []}
	module.exports.render._withStripped = true
	if (false) {
	  module.hot.accept()
	  if (module.hot.data) {
	     require("vue-hot-reload-api").rerender("data-v-140e5d16", module.exports)
	  }
	}

/***/ }),
/* 142 */
/***/ (function(module, exports, __webpack_require__) {

	var Component = __webpack_require__(42)(
	  /* script */
	  __webpack_require__(143),
	  /* template */
	  __webpack_require__(144),
	  /* scopeId */
	  null,
	  /* cssModules */
	  null
	)
	Component.options.__file = "/Users/alexey/PhpstormProjects/nenaprasno-frontend/public/assets/screen/app/components/form-success-modal.vue"
	if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key !== "__esModule"})) {console.error("named exports are not supported in *.vue files.")}
	if (Component.options.functional) {console.error("[vue-loader] form-success-modal.vue: functional components are not supported with templates, they should use render functions.")}
	
	/* hot reload */
	if (false) {(function () {
	  var hotAPI = require("vue-hot-reload-api")
	  hotAPI.install(require("vue"), false)
	  if (!hotAPI.compatible) return
	  module.hot.accept()
	  if (!module.hot.data) {
	    hotAPI.createRecord("data-v-6f306af0", Component.options)
	  } else {
	    hotAPI.reload("data-v-6f306af0", Component.options)
	  }
	})()}
	
	module.exports = Component.exports


/***/ }),
/* 143 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	
	var config = __webpack_require__(10);
	
	module.exports = {
	    data: function data() {
	        return {
	            config: config
	        };
	    }
	};

/***/ }),
/* 144 */
/***/ (function(module, exports, __webpack_require__) {

	module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
	  return _c('div', {
	    staticClass: "modal-overlay"
	  }, [_c('div', {
	    staticClass: "form-success-modal"
	  }, [_c('div', {
	    staticClass: "form-success-modal-icon"
	  }), _vm._v(" "), _c('div', {
	    staticClass: "form-success-modal-title"
	  }, [_vm._v("\n            Спасибо\n        ")]), _vm._v(" "), _c('div', {
	    staticClass: "form-success-modal-desc"
	  }, [_vm._v("\n            Присоединяйтесь к проектам Фонда профилактики рака - нам нужна ваша поддержка!\n        ")]), _vm._v(" "), _c('a', {
	    staticClass: "form-success-modal-submit",
	    attrs: {
	      "href": _vm.config.cabinetURL
	    }
	  }, [_vm._v("В личный кабинет")])])])
	},staticRenderFns: []}
	module.exports.render._withStripped = true
	if (false) {
	  module.hot.accept()
	  if (module.hot.data) {
	     require("vue-hot-reload-api").rerender("data-v-6f306af0", module.exports)
	  }
	}

/***/ }),
/* 145 */
/***/ (function(module, exports, __webpack_require__) {

	module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
	  return _c('form', {
	    class: 'form-app form-app-' + _vm.form.id + ' form-app-current-' + _vm.current,
	    attrs: {
	      "action": "#",
	      "method": "POST",
	      "id": 'form-' + _vm.form.id
	    }
	  }, [_c('form-breadcrumbs', {
	    attrs: {
	      "current": _vm.current,
	      "form": _vm.form
	    }
	  }), _vm._v(" "), (_vm.form.title) ? _c('div', {
	    staticClass: "form-app-title"
	  }, [_vm._v("\n        " + _vm._s(_vm.form.title) + "\n    ")]) : _vm._e(), _vm._v(" "), _vm._l((_vm.form.parts), function(part, index) {
	    return (_vm.current === index) ? _c('form-part', {
	      attrs: {
	        "part": part,
	        "index": index
	      }
	    }) : _vm._e()
	  }), _vm._v(" "), (_vm.form.resultPart && _vm.activeParts()) ? _c('form-result', {
	    attrs: {
	      "resultPart": _vm.form.resultPart
	    }
	  }) : _vm._e(), _vm._v(" "), _c('transition', {
	    attrs: {
	      "name": "fade"
	    }
	  }, [(_vm.showSubmitAuthModal) ? _c('form-submit-auth-modal') : _vm._e()], 1), _vm._v(" "), _c('transition', {
	    attrs: {
	      "name": "fade"
	    }
	  }, [(_vm.showSuccessModal) ? _c('form-success-modal') : _vm._e()], 1), _vm._v(" "), _c('transition', {
	    attrs: {
	      "name": "fade"
	    }
	  }, [(_vm.showAuthModal) ? _c('form-auth-modal') : _vm._e()], 1), _vm._v(" "), _c('transition', {
	    attrs: {
	      "name": "fade"
	    }
	  }, [(_vm.showProfileModal) ? _c('form-profile-modal') : _vm._e()], 1)], 2)
	},staticRenderFns: []}
	module.exports.render._withStripped = true
	if (false) {
	  module.hot.accept()
	  if (module.hot.data) {
	     require("vue-hot-reload-api").rerender("data-v-680d33ee", module.exports)
	  }
	}

/***/ }),
/* 146 */
/***/ (function(module, exports, __webpack_require__) {

	
	/* styles */
	__webpack_require__(147)
	
	var Component = __webpack_require__(42)(
	  /* script */
	  __webpack_require__(149),
	  /* template */
	  __webpack_require__(150),
	  /* scopeId */
	  "data-v-5232eedb",
	  /* cssModules */
	  null
	)
	Component.options.__file = "/Users/alexey/PhpstormProjects/nenaprasno-frontend/public/assets/screen/app/components/form-userarea.vue"
	if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key !== "__esModule"})) {console.error("named exports are not supported in *.vue files.")}
	if (Component.options.functional) {console.error("[vue-loader] form-userarea.vue: functional components are not supported with templates, they should use render functions.")}
	
	/* hot reload */
	if (false) {(function () {
	  var hotAPI = require("vue-hot-reload-api")
	  hotAPI.install(require("vue"), false)
	  if (!hotAPI.compatible) return
	  module.hot.accept()
	  if (!module.hot.data) {
	    hotAPI.createRecord("data-v-5232eedb", Component.options)
	  } else {
	    hotAPI.reload("data-v-5232eedb", Component.options)
	  }
	})()}
	
	module.exports = Component.exports


/***/ }),
/* 147 */
/***/ (function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag
	
	// load the styles
	var content = __webpack_require__(148);
	if(typeof content === 'string') content = [[module.id, content, '']];
	if(content.locals) module.exports = content.locals;
	// add the styles to the DOM
	var update = __webpack_require__(40)("f8bca206", content, false);
	// Hot Module Replacement
	if(false) {
	 // When the styles change, update the <style> tags
	 if(!content.locals) {
	   module.hot.accept("!!../../node_modules/css-loader/index.js?sourceMap!../../node_modules/vue-loader/lib/style-rewriter.js?id=data-v-5232eedb&scoped=true!../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./form-userarea.vue", function() {
	     var newContent = require("!!../../node_modules/css-loader/index.js?sourceMap!../../node_modules/vue-loader/lib/style-rewriter.js?id=data-v-5232eedb&scoped=true!../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./form-userarea.vue");
	     if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
	     update(newContent);
	   });
	 }
	 // When the module is disposed, remove the <style> tags
	 module.hot.dispose(function() { update(); });
	}

/***/ }),
/* 148 */
/***/ (function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(39)();
	// imports
	
	
	// module
	exports.push([module.id, "\n\n\n\n\n\n\n\n\n\n\n\n\n\n", "", {"version":3,"sources":[],"names":[],"mappings":"","file":"form-userarea.vue","sourceRoot":""}]);
	
	// exports


/***/ }),
/* 149 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	
	var config = __webpack_require__(10);
	var userAPI = __webpack_require__(125);
	
	module.exports = {
	    data: function data() {
	        return {};
	    },
	
	    computed: {
	        isAnonymous: function isAnonymous() {
	            return this.$store.state.user.isAnonymous;
	        },
	        username: function username() {
	            return this.$store.state.userProfile.username;
	        }
	    },
	    methods: {
	        showLoginModal: function showLoginModal() {
	            this.$store.commit('setAuthModal', true);
	            this.$store.commit('setAuthModalType', 'login');
	        },
	        showRegisterModal: function showRegisterModal() {
	            this.$store.commit('setAuthModal', true);
	            this.$store.commit('setAuthModalType', 'register');
	        },
	        showProfileModal: function showProfileModal() {
	            this.$store.commit('setProfileModal', true);
	        },
	        logout: function logout() {
	            var submit = confirm(config.messages.confirmLogout);
	
	            if (submit) {
	                userAPI.logout(this.$store.state.user.sessionId).catch(function (error) {
	                    console.log(error);
	                });
	
	                this.$store.commit('setUser', {
	                    sessionId: null,
	                    refreshToken: null,
	                    userId: 0,
	                    isAnonymous: true,
	                    roleId: null
	                });
	                this.$store.commit('setUsername', null);
	                this.$store.commit('setUserProfileId', null);
	                this.$store.commit('setUserProfileData', null);
	            }
	        }
	    }
	};

/***/ }),
/* 150 */
/***/ (function(module, exports, __webpack_require__) {

	module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
	  return _c('div', {
	    staticClass: "form-userarea"
	  }, [(_vm.isAnonymous) ? _c('div', [_c('a', {
	    staticClass: "link-dotted",
	    attrs: {
	      "href": "#"
	    },
	    on: {
	      "click": function($event) {
	        $event.preventDefault();
	        _vm.showLoginModal($event)
	      }
	    }
	  }, [_vm._v("Вход")]), _vm._v("\n        /\n        "), _c('a', {
	    staticClass: "link-dotted",
	    attrs: {
	      "href": "#"
	    },
	    on: {
	      "click": function($event) {
	        $event.preventDefault();
	        _vm.showRegisterModal($event)
	      }
	    }
	  }, [_vm._v("Регистрация")])]) : _c('div', [_c('a', {
	    staticClass: "link-dotted",
	    attrs: {
	      "href": "#"
	    },
	    on: {
	      "click": function($event) {
	        $event.preventDefault();
	        _vm.showProfileModal($event)
	      }
	    }
	  }, [_vm._v(_vm._s(_vm.username))]), _vm._v(" "), _c('a', {
	    attrs: {
	      "href": "#"
	    },
	    on: {
	      "click": function($event) {
	        $event.preventDefault();
	        _vm.logout($event)
	      }
	    }
	  }, [_vm._v("×")])])])
	},staticRenderFns: []}
	module.exports.render._withStripped = true
	if (false) {
	  module.hot.accept()
	  if (module.hot.data) {
	     require("vue-hot-reload-api").rerender("data-v-5232eedb", module.exports)
	  }
	}

/***/ }),
/* 151 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	
	var Vuex = __webpack_require__(5);
	var userAPI = __webpack_require__(125);
	var formAPI = __webpack_require__(56);
	var objectAPI = __webpack_require__(152);
	
	// Helpers
	var fillUserFields = __webpack_require__(154);
	
	module.exports = new Vuex.Store({
	    state: {
	        form: {
	            formId: 0,
	            userId: 0,
	            isDeleted: false,
	            startDate: new Date(),
	            submitDate: new Date(),
	            createdAt: new Date(),
	            updatedAt: new Date(),
	            data: [],
	            resultData: [],
	            formResponse: null,
	            diseases: null,
	            medicalProcedures: null
	        },
	        totalParts: 0,
	        totalSections: 0,
	        current: 0,
	        showSubmitAuthModal: false,
	        showAuthModal: false,
	        showSuccessModal: false,
	        authModalType: 'login',
	        showProfileModal: false,
	        showResult: false,
	        user: {
	            sessionId: null,
	            refreshToken: null,
	            userId: 0,
	            isAnonymous: true,
	            roleId: null
	        },
	        userProfile: {
	            username: null,
	            data: {
	                id: null,
	                sex: null,
	                city: null,
	                regionId: null,
	                birthdate: null
	            }
	        },
	        regions: []
	    },
	    mutations: {
	        setTotalParts: function setTotalParts(state, n) {
	            state.totalParts = n;
	        },
	        setTotalSections: function setTotalSections(state, n) {
	            state.totalSections = n;
	        },
	        incCurrent: function incCurrent(state) {
	            state.current++;
	        },
	        decCurrent: function decCurrent(state) {
	            state.current--;
	        },
	        addControl: function addControl(state, control) {
	            var foundControls = state.form.data.filter(function (v) {
	                return v.controlId == control.controlId;
	            })[0];
	
	            if (!foundControls) {
	                state.form.data.push(control);
	            }
	        },
	        addResultControl: function addResultControl(state, control) {
	            var foundControls = state.form.resultData.filter(function (v) {
	                return v.controlId == control.controlId;
	            })[0];
	
	            if (!foundControls) {
	                state.form.resultData.push(control);
	            }
	        },
	        addRegions: function addRegions(state, regions) {
	            state.regions = regions;
	        },
	        setControlValue: function setControlValue(state, payload) {
	            state.form.data.forEach(function (c) {
	                if (payload.id == c.controlId) {
	                    c.value = payload.value;
	                    c.controlShown = true;
	                }
	            });
	        },
	        setControlShowErrors: function setControlShowErrors(state, payload) {
	            state.form.data.forEach(function (c) {
	                if (payload.id == c.controlId) {
	                    c.showErrors = payload.showErrors;
	                }
	            });
	        },
	        setControlDisplay: function setControlDisplay(state, payload) {
	            state.form.data.forEach(function (c) {
	                if (payload.id == c.controlId) {
	                    c.display = payload.display;
	
	                    if (payload.display) {
	                        c.controlShown = true;
	                    }
	                }
	            });
	        },
	        setControlValid: function setControlValid(state, payload) {
	            state.form.data.forEach(function (c) {
	                if (payload.id == c.controlId) {
	                    c.valid = payload.valid;
	                }
	            });
	        },
	        setUser: function setUser(state, payload) {
	            state.user = payload;
	        },
	        setUsername: function setUsername(state, payload) {
	            state.userProfile.username = payload;
	        },
	        setUserProfileId: function setUserProfileId(state, payload) {
	            state.userProfile.profileId = payload;
	        },
	        setUserProfileData: function setUserProfileData(state, payload) {
	            state.userProfile.data = payload;
	        },
	        setSubmitAuthModal: function setSubmitAuthModal(state, payload) {
	            state.showSubmitAuthModal = payload;
	        },
	        setAuthModal: function setAuthModal(state, payload) {
	            state.showAuthModal = payload;
	        },
	        setProfileModal: function setProfileModal(state, payload) {
	            state.showProfileModal = payload;
	        },
	        setAuthModalType: function setAuthModalType(state, payload) {
	            state.authModalType = payload;
	        },
	        setSuccessModal: function setSuccessModal(state, payload) {
	            state.showSuccessModal = payload;
	        },
	        setDiseases: function setDiseases(state, payload) {
	            state.form.diseases = payload;
	        },
	        setMedicalProcedures: function setMedicalProcedures(state, payload) {
	            state.form.medicalProcedures = payload;
	        },
	        setFormResponse: function setFormResponse(state, payload) {
	            state.form.formResponse = payload;
	        },
	        showResult: function showResult(state) {
	            state.showResult = true;
	        }
	    },
	    actions: {
	        loginAnonymous: function loginAnonymous(context) {
	            return new Promise(function (resolve, reject) {
	                userAPI.loginAnonymous().then(function (response) {
	                    context.commit('setUser', response.data);
	                    resolve();
	                }).catch(function (e) {
	                    reject(e);
	                });
	            });
	        },
	        loginByToken: function loginByToken(context) {
	            return new Promise(function (resolve, reject) {
	                userAPI.loginByToken(context.state.user.refreshToken).then(function (response) {
	                    context.commit('setUser', response.data);
	                    resolve();
	                }).catch(function (e) {
	                    reject(e);
	                });
	            });
	        },
	        fetchForm: function fetchForm(context, id) {
	            return new Promise(function (resolve, reject) {
	                formAPI.getFormById(id, context.state.user.sessionId).then(function (response) {
	                    resolve(response);
	                }).catch(function (e) {
	                    reject(e);
	                });
	            });
	        },
	        fetchUserProfile: function fetchUserProfile(context) {
	            return new Promise(function (resolve, reject) {
	                objectAPI.objectsBySchemaIdGet('UserProfiles', {
	                    where: {
	                        userId: context.state.user.userId
	                    }
	                }, context.state.user.sessionId).then(function (response) {
	                    context.commit('setUserProfileData', response.data[0]);
	                    resolve();
	                }).catch(function (e) {
	                    reject(e);
	                });
	            });
	        },
	        fetchRegions: function fetchRegions(context) {
	            return new Promise(function (resolve, reject) {
	                objectAPI.objectsBySchemaIdGet('Region', {}, context.state.user.sessionId).then(function (response) {
	                    context.commit('addRegions', response.data);
	                    resolve();
	                }).catch(function (e) {
	                    reject(e);
	                });
	            });
	        },
	        parseFormData: function parseFormData(context, formData) {
	            // Count Parts in Form
	            context.commit('setTotalParts', formData.parts.length);
	
	            // Count Sections in Form
	            var totalSections = 0;
	            formData.parts.forEach(function (part) {
	                Object.keys(part).forEach(function (key) {
	                    if (key == 'sections') {
	                        totalSections += part[key].length;
	                    }
	                });
	            });
	            context.commit('setTotalSections', totalSections);
	
	            // Parse & store all inputs
	            function parseParts(part) {
	                var isResultPart = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
	
	                part.sections.forEach(function (section) {
	                    section.groups.forEach(function (group) {
	                        if (group.controls) {
	                            group.controls.forEach(function (control) {
	                                var newControl = {
	                                    controlId: control.id,
	                                    controlClass: control.class,
	                                    controlTitle: control.title,
	                                    controlType: control.type,
	                                    display: false,
	                                    controlShown: false,
	                                    showErrors: false,
	                                    errorMessages: [],
	                                    value: null
	                                };
	
	                                if (control.options) {
	                                    newControl.options = control.options;
	                                }
	
	                                // Prefill user fields from cabinet
	                                fillUserFields(newControl, context);
	
	                                if (isResultPart) {
	                                    context.commit('addResultControl', newControl);
	                                } else {
	                                    context.commit('addControl', newControl);
	                                }
	                            });
	                        }
	                    });
	                });
	            }
	            formData.parts.forEach(function (part) {
	                parseParts(part);
	            });
	
	            parseParts(formData.resultPart, true);
	        },
	        changeStep: function changeStep(context, action) {
	            switch (action) {
	                case 'next':
	                    context.commit('incCurrent');
	                    context.commit('showResult');
	                    break;
	                case 'prev':
	                    context.commit('decCurrent');
	                    break;
	            }
	        },
	        showResult: function showResult() {
	            context.commit('showResult');
	        }
	    }
	});

/***/ }),
/* 152 */
/***/ (function(module, exports, __webpack_require__) {

	"use strict";
	
	var config = __webpack_require__(10);
	var axios = __webpack_require__(11);
	
	var instance = axios.create({
	    baseURL: config.apiUrl,
	    timeout: 10000,
	    headers: {
	        "Content-Type": "application/json",
	        "Accept": "application/json"
	    }
	});
	
	var object = {
	    objectsBySchemaIdGet: function objectsBySchemaIdGet(schemaId, params, token) {
	        return instance.get('/objects/' + schemaId, {
	            params: params,
	            headers: {
	                "Content-Type": "application/json",
	                "X-Appercode-Session-Token": token
	            }
	        });
	    },
	    objectsBySchemaIdPost: function objectsBySchemaIdPost(schemaId, newObj, token) {
	        return instance.post('/objects/' + schemaId, newObj, {
	            headers: {
	                "Content-Type": "application/json",
	                "X-Appercode-Session-Token": token
	            }
	        });
	    }
	};
	
	module.exports = object;

/***/ }),
/* 153 */
/***/ (function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_RESULT__;'use strict';
	
	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };
	
	/*!
	 * JavaScript Cookie v2.2.0
	 * https://github.com/js-cookie/js-cookie
	 *
	 * Copyright 2006, 2015 Klaus Hartl & Fagner Brack
	 * Released under the MIT license
	 */
	;(function (factory) {
		var registeredInModuleLoader = false;
		if (true) {
			!(__WEBPACK_AMD_DEFINE_FACTORY__ = (factory), __WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ? (__WEBPACK_AMD_DEFINE_FACTORY__.call(exports, __webpack_require__, exports, module)) : __WEBPACK_AMD_DEFINE_FACTORY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
			registeredInModuleLoader = true;
		}
		if (( false ? 'undefined' : _typeof(exports)) === 'object') {
			module.exports = factory();
			registeredInModuleLoader = true;
		}
		if (!registeredInModuleLoader) {
			var OldCookies = window.Cookies;
			var api = window.Cookies = factory();
			api.noConflict = function () {
				window.Cookies = OldCookies;
				return api;
			};
		}
	})(function () {
		function extend() {
			var i = 0;
			var result = {};
			for (; i < arguments.length; i++) {
				var attributes = arguments[i];
				for (var key in attributes) {
					result[key] = attributes[key];
				}
			}
			return result;
		}
	
		function init(converter) {
			function api(key, value, attributes) {
				var result;
				if (typeof document === 'undefined') {
					return;
				}
	
				// Write
	
				if (arguments.length > 1) {
					attributes = extend({
						path: '/'
					}, api.defaults, attributes);
	
					if (typeof attributes.expires === 'number') {
						var expires = new Date();
						expires.setMilliseconds(expires.getMilliseconds() + attributes.expires * 864e+5);
						attributes.expires = expires;
					}
	
					// We're using "expires" because "max-age" is not supported by IE
					attributes.expires = attributes.expires ? attributes.expires.toUTCString() : '';
	
					try {
						result = JSON.stringify(value);
						if (/^[\{\[]/.test(result)) {
							value = result;
						}
					} catch (e) {}
	
					if (!converter.write) {
						value = encodeURIComponent(String(value)).replace(/%(23|24|26|2B|3A|3C|3E|3D|2F|3F|40|5B|5D|5E|60|7B|7D|7C)/g, decodeURIComponent);
					} else {
						value = converter.write(value, key);
					}
	
					key = encodeURIComponent(String(key));
					key = key.replace(/%(23|24|26|2B|5E|60|7C)/g, decodeURIComponent);
					key = key.replace(/[\(\)]/g, escape);
	
					var stringifiedAttributes = '';
	
					for (var attributeName in attributes) {
						if (!attributes[attributeName]) {
							continue;
						}
						stringifiedAttributes += '; ' + attributeName;
						if (attributes[attributeName] === true) {
							continue;
						}
						stringifiedAttributes += '=' + attributes[attributeName];
					}
					return document.cookie = key + '=' + value + stringifiedAttributes;
				}
	
				// Read
	
				if (!key) {
					result = {};
				}
	
				// To prevent the for loop in the first place assign an empty array
				// in case there are no cookies at all. Also prevents odd result when
				// calling "get()"
				var cookies = document.cookie ? document.cookie.split('; ') : [];
				var rdecode = /(%[0-9A-Z]{2})+/g;
				var i = 0;
	
				for (; i < cookies.length; i++) {
					var parts = cookies[i].split('=');
					var cookie = parts.slice(1).join('=');
	
					if (!this.json && cookie.charAt(0) === '"') {
						cookie = cookie.slice(1, -1);
					}
	
					try {
						var name = parts[0].replace(rdecode, decodeURIComponent);
						cookie = converter.read ? converter.read(cookie, name) : converter(cookie, name) || cookie.replace(rdecode, decodeURIComponent);
	
						if (this.json) {
							try {
								cookie = JSON.parse(cookie);
							} catch (e) {}
						}
	
						if (key === name) {
							result = cookie;
							break;
						}
	
						if (!key) {
							result[name] = cookie;
						}
					} catch (e) {}
				}
	
				return result;
			}
	
			api.set = api;
			api.get = function (key) {
				return api.call(api, key);
			};
			api.getJSON = function () {
				return api.apply({
					json: true
				}, [].slice.call(arguments));
			};
			api.defaults = {};
	
			api.remove = function (key, attributes) {
				api(key, '', extend(attributes, {
					expires: -1
				}));
			};
	
			api.withConverter = init;
	
			return api;
		}
	
		return init(function () {});
	});

/***/ }),
/* 154 */
/***/ (function(module, exports) {

	"use strict";
	
	function fillUserFields(control, store) {
	    var sexFieldName = "t1-p1-s1-g1-c1";
	    var regionFieldName = "reg1";
	    var ageFieldName = "t1-p3-s2-g1-c1";
	
	    if (control.controlId === sexFieldName) {
	        store.commit('setControlValue', {
	            id: control.controlId,
	            value: store.state.userProfile.data.sex
	        });
	
	        console.log("Sex set as: " + control.value);
	    }
	    if (control.controlId === regionFieldName) {
	        if (store.state.userProfile.data.regionId) {
	            var foundRegion = store.state.regions.find(function (region) {
	                return region.id === store.state.userProfile.data.regionId;
	            });
	            store.commit('setControlValue', {
	                id: control.controlId,
	                value: foundRegion ? foundRegion.value : null
	            });
	
	            console.log("Region set as: " + foundRegion.title + " " + foundRegion.value);
	        }
	    }
	
	    if (control.controlId === ageFieldName) {
	        var bdate = store.state.userProfile.data.birthdate;
	        if (bdate) {
	            var ageDifMs = Date.now() - new Date(bdate).getTime();
	            var ageDate = new Date(ageDifMs); // miliseconds from epoch;
	            var age = Math.abs(ageDate.getUTCFullYear() - 1970);
	            store.commit('setControlValue', {
	                id: control.controlId,
	                value: age
	            });
	
	            console.log("Age set as: " + age);
	        }
	    }
	}
	
	module.exports = fillUserFields;

/***/ })
/******/ ]);
//# sourceMappingURL=app.js.map