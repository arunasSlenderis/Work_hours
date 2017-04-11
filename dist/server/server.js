/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.l = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };

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

/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};

/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 69);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports) {

module.exports = require("express");

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

var freeGlobal = __webpack_require__(13);

/** Detect free variable `self`. */
var freeSelf = typeof self == 'object' && self && self.Object === Object && self;

/** Used as a reference to the global object. */
var root = freeGlobal || freeSelf || Function('return this')();

module.exports = root;


/***/ }),
/* 2 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_mongoose__ = __webpack_require__(9);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_mongoose___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_mongoose__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_bcrypt_nodejs__ = __webpack_require__(67);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_bcrypt_nodejs___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_bcrypt_nodejs__);



const userSchema = __WEBPACK_IMPORTED_MODULE_0_mongoose___default.a.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  lastName: {
    type: String,
    trim: true
  },
  email: {
    type: String,
    required: true,
    trim: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  userType: {
    type: String,
    default: "user",
    trim: true
  },
  projects: [
    {
      id: String,
      name: String,
      time: [
        {
          date: String,
          hoursWorked: Number
        }
      ]
    }
  ]
});


userSchema.methods.encryptPassword = password => {
  return __WEBPACK_IMPORTED_MODULE_1_bcrypt_nodejs___default.a.hashSync(password, __WEBPACK_IMPORTED_MODULE_1_bcrypt_nodejs___default.a.genSaltSync(5), null);
};

userSchema.methods.validPassword = function(password) {
  return __WEBPACK_IMPORTED_MODULE_1_bcrypt_nodejs___default.a.compareSync(password, this.password);
};

const User = __WEBPACK_IMPORTED_MODULE_0_mongoose___default.a.model("user", userSchema);

/* harmony default export */ __webpack_exports__["a"] = User;


/***/ }),
/* 3 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_jsonwebtoken__ = __webpack_require__(21);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_jsonwebtoken___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_jsonwebtoken__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__config_jwtConfig__ = __webpack_require__(20);
/* harmony export (immutable) */ __webpack_exports__["a"] = authenticate;




function authenticate(req, res, next) {
  const authHeader = req.headers["authorization"];
  let token;

  if(authHeader) token = authHeader.split(" ")[1];  //takes token after word Bearer

  if(token) {
    __WEBPACK_IMPORTED_MODULE_0_jsonwebtoken___default.a.verify(token, __WEBPACK_IMPORTED_MODULE_1__config_jwtConfig__["a" /* default */].jwtSecret, err => {
      if(err) {
        res.status(401).json({ error: "Failed to authenticate" });
      } else {
        next();
      }
    });
  } else {
    res.status(403).json({
      error: "No token provided"
    });
  }
}


/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

var baseIsNative = __webpack_require__(43),
    getValue = __webpack_require__(50);

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

module.exports = getNative;


/***/ }),
/* 5 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_mongoose__ = __webpack_require__(9);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_mongoose___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_mongoose__);


const projectSchema = __WEBPACK_IMPORTED_MODULE_0_mongoose___default.a.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
    unique: true
  },
  client: {
    type: String,
    trim: true
  },
  dueDate: {
    type: String,
    required: true,
    default: String(Date.now).substr(0, 10)
  },
  hoursWorked: {
    type: Number,
    required: true,
    default: 0
  }
});

const Project = __WEBPACK_IMPORTED_MODULE_0_mongoose___default.a.model("project", projectSchema);

/* harmony default export */ __webpack_exports__["a"] = Project;


/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

var Symbol = __webpack_require__(12),
    getRawTag = __webpack_require__(48),
    objectToString = __webpack_require__(54);

/** `Object#toString` result references. */
var nullTag = '[object Null]',
    undefinedTag = '[object Undefined]';

/** Built-in value references. */
var symToStringTag = Symbol ? Symbol.toStringTag : undefined;

/**
 * The base implementation of `getTag` without fallbacks for buggy environments.
 *
 * @private
 * @param {*} value The value to query.
 * @returns {string} Returns the `toStringTag`.
 */
function baseGetTag(value) {
  if (value == null) {
    return value === undefined ? undefinedTag : nullTag;
  }
  return (symToStringTag && symToStringTag in Object(value))
    ? getRawTag(value)
    : objectToString(value);
}

module.exports = baseGetTag;


/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

var baseKeys = __webpack_require__(45),
    getTag = __webpack_require__(49),
    isArguments = __webpack_require__(56),
    isArray = __webpack_require__(57),
    isArrayLike = __webpack_require__(58),
    isBuffer = __webpack_require__(59),
    isPrototype = __webpack_require__(14),
    isTypedArray = __webpack_require__(60);

/** `Object#toString` result references. */
var mapTag = '[object Map]',
    setTag = '[object Set]';

/** Used for built-in method references. */
var objectProto = Object.prototype;

/** Used to check objects for own properties. */
var hasOwnProperty = objectProto.hasOwnProperty;

/**
 * Checks if `value` is an empty object, collection, map, or set.
 *
 * Objects are considered empty if they have no own enumerable string keyed
 * properties.
 *
 * Array-like values such as `arguments` objects, arrays, buffers, strings, or
 * jQuery-like collections are considered empty if they have a `length` of `0`.
 * Similarly, maps and sets are considered empty if they have a `size` of `0`.
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is empty, else `false`.
 * @example
 *
 * _.isEmpty(null);
 * // => true
 *
 * _.isEmpty(true);
 * // => true
 *
 * _.isEmpty(1);
 * // => true
 *
 * _.isEmpty([1, 2, 3]);
 * // => false
 *
 * _.isEmpty({ 'a': 1 });
 * // => false
 */
function isEmpty(value) {
  if (value == null) {
    return true;
  }
  if (isArrayLike(value) &&
      (isArray(value) || typeof value == 'string' || typeof value.splice == 'function' ||
        isBuffer(value) || isTypedArray(value) || isArguments(value))) {
    return !value.length;
  }
  var tag = getTag(value);
  if (tag == mapTag || tag == setTag) {
    return !value.size;
  }
  if (isPrototype(value)) {
    return !baseKeys(value).length;
  }
  for (var key in value) {
    if (hasOwnProperty.call(value, key)) {
      return false;
    }
  }
  return true;
}

module.exports = isEmpty;


/***/ }),
/* 8 */
/***/ (function(module, exports) {

module.exports = require("validator");

/***/ }),
/* 9 */
/***/ (function(module, exports) {

module.exports = require("mongoose");

/***/ }),
/* 10 */
/***/ (function(module, exports) {

module.exports = require("passport");

/***/ }),
/* 11 */
/***/ (function(module, exports) {

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
  return value != null && typeof value == 'object';
}

module.exports = isObjectLike;


/***/ }),
/* 12 */
/***/ (function(module, exports, __webpack_require__) {

var root = __webpack_require__(1);

/** Built-in value references. */
var Symbol = root.Symbol;

module.exports = Symbol;


/***/ }),
/* 13 */
/***/ (function(module, exports) {

/** Detect free variable `global` from Node.js. */
var freeGlobal = typeof global == 'object' && global && global.Object === Object && global;

module.exports = freeGlobal;


/***/ }),
/* 14 */
/***/ (function(module, exports) {

/** Used for built-in method references. */
var objectProto = Object.prototype;

/**
 * Checks if `value` is likely a prototype object.
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a prototype, else `false`.
 */
function isPrototype(value) {
  var Ctor = value && value.constructor,
      proto = (typeof Ctor == 'function' && Ctor.prototype) || objectProto;

  return value === proto;
}

module.exports = isPrototype;


/***/ }),
/* 15 */
/***/ (function(module, exports) {

/** Used for built-in method references. */
var funcProto = Function.prototype;

/** Used to resolve the decompiled source of functions. */
var funcToString = funcProto.toString;

/**
 * Converts `func` to its source code.
 *
 * @private
 * @param {Function} func The function to convert.
 * @returns {string} Returns the source code.
 */
function toSource(func) {
  if (func != null) {
    try {
      return funcToString.call(func);
    } catch (e) {}
    try {
      return (func + '');
    } catch (e) {}
  }
  return '';
}

module.exports = toSource;


/***/ }),
/* 16 */
/***/ (function(module, exports, __webpack_require__) {

var baseGetTag = __webpack_require__(6),
    isObject = __webpack_require__(18);

/** `Object#toString` result references. */
var asyncTag = '[object AsyncFunction]',
    funcTag = '[object Function]',
    genTag = '[object GeneratorFunction]',
    proxyTag = '[object Proxy]';

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
  if (!isObject(value)) {
    return false;
  }
  // The use of `Object#toString` avoids issues with the `typeof` operator
  // in Safari 9 which returns 'object' for typed arrays and other constructors.
  var tag = baseGetTag(value);
  return tag == funcTag || tag == genTag || tag == asyncTag || tag == proxyTag;
}

module.exports = isFunction;


/***/ }),
/* 17 */
/***/ (function(module, exports) {

/** Used as references for various `Number` constants. */
var MAX_SAFE_INTEGER = 9007199254740991;

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
  return typeof value == 'number' &&
    value > -1 && value % 1 == 0 && value <= MAX_SAFE_INTEGER;
}

module.exports = isLength;


/***/ }),
/* 18 */
/***/ (function(module, exports) {

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
  var type = typeof value;
  return value != null && (type == 'object' || type == 'function');
}

module.exports = isObject;


/***/ }),
/* 19 */
/***/ (function(module, exports) {

module.exports = function(module) {
	if(!module.webpackPolyfill) {
		module.deprecate = function() {};
		module.paths = [];
		// module.parent = undefined by default
		if(!module.children) module.children = [];
		Object.defineProperty(module, "loaded", {
			enumerable: true,
			get: function() {
				return module.l;
			}
		});
		Object.defineProperty(module, "id", {
			enumerable: true,
			get: function() {
				return module.i;
			}
		});
		module.webpackPolyfill = 1;
	}
	return module;
};


/***/ }),
/* 20 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony default export */ __webpack_exports__["a"] = {
  jwtSecret: "lsjbslfas;ufwp9iwphje397yfnewrw[fNQEN[RUR438R]]"
};


/***/ }),
/* 21 */
/***/ (function(module, exports) {

module.exports = require("jsonwebtoken");

/***/ }),
/* 22 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_passport__ = __webpack_require__(10);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_passport___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_passport__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_passport_local__ = __webpack_require__(68);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_passport_local___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_passport_local__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__DB_models_User__ = __webpack_require__(2);





 // validation error handling
// let validationErrors;
// const isErrors = (errors) => {
//   const errorMessages = [];
//   if(errors) {
//     errors.forEach(error => errorMessages.push(error.msg));
//     return errorMessages;
//   }
//   return false;
// };

__WEBPACK_IMPORTED_MODULE_0_passport___default.a.serializeUser((user, done) => done(null, user.id));

__WEBPACK_IMPORTED_MODULE_0_passport___default.a.deserializeUser((id, done) => {
  __WEBPACK_IMPORTED_MODULE_2__DB_models_User__["a" /* default */].findById(id, (err, user) => done(err, user));
});

// passport.use("local.addUser", new Strategy({
//   usernameField: "email",
//   passwordField: "password",
//   passReqToCallback: true
// }, (req, email, password, done) => {
//   //validation
//   req.checkBody("name", "Name is required").notEmpty();
//   req.checkBody("name", "Name must contain only letters").isAlpha();
//   req.checkBody("lastName", "Last name is required").notEmpty();
//   req.checkBody("lastName", "Last name must contain only letters").isAlpha();
//   req.checkBody("email", "E-mail is required").notEmpty();
//   req.checkBody("email", "E-mail must be valid").isEmail();
//   req.checkBody("password", "Password is required").notEmpty();
//   req.checkBody("password2", "Passwords do not match").equals(password);
//
//   validationErrors = isErrors(req.validationErrors());
//   if(validationErrors) return done(null, false, validationErrors);
//
//   User.findOne({"email": email}, (err, user) => {
//     if(err) return done(err);
//
//     if(user) return done(null, false, { message: "User exists" });
//
//     const { name, lastName, userType } = req.body;
//     const newUser = new User();
//     newUser.name = name;
//     newUser.lastName = lastName;
//     newUser.email = email;
//     newUser.password = newUser.encryptPassword(password);
//     newUser.userType = userType;
//
//     newUser.save(err => {
//       if(err) return done(err);
//
//       return done(null, newUser);
//     });
//   });
// }));

__WEBPACK_IMPORTED_MODULE_0_passport___default.a.use("local.login", new __WEBPACK_IMPORTED_MODULE_1_passport_local__["Strategy"]({
  usernameField: "email",
  passwordField: "password",
  passReqToCallback: true
}, (req, email, password, done) => {
  __WEBPACK_IMPORTED_MODULE_2__DB_models_User__["a" /* default */].findOne({ "email": email }, (err, user) => {
    if(err) return done(err);

    if(!user) return done(null, false, { message: "User does not exist" });

    if(!user.validPassword(password))
      return done(null, false, { message: "Password is wrong" });

    return done(null, user);
  });
}));


/***/ }),
/* 23 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_express__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_express___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_express__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__DB_models_Project_js__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__middlewares_authenticate__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__shared_addProjectValidation__ = __webpack_require__(63);


const router = __WEBPACK_IMPORTED_MODULE_0_express___default.a.Router();





router.post("/", __WEBPACK_IMPORTED_MODULE_2__middlewares_authenticate__["a" /* default */], (req, res) => {
  const { errors, isValid } = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_3__shared_addProjectValidation__["a" /* default */])(req.body);
  if(isValid) {
    const dueDate = req.body.startDate.substr(0, 10);
    const { name, client } = req.body;

    __WEBPACK_IMPORTED_MODULE_1__DB_models_Project_js__["a" /* default */].findOne({ name }, (err, project) => {
      if(err) {
        res.json(err);
      }
      if(project) {
        res.status(400).json({
          success: false,
          fail: true,
          text: "Project with such name already exists"
        });
      } else {
        const newProject = new __WEBPACK_IMPORTED_MODULE_1__DB_models_Project_js__["a" /* default */]();

        newProject.name = name;
        newProject.client = client;
        newProject.dueDate = dueDate;

        newProject.save(err => {
          if(err) {
            res.status(400).json(err);
          } else {
            res.json({
              success: true,
              fail: false,
              text: "Project added successfully"
            });
          }
        });
      }
    });
  } else {
    res.status(400).json(errors);
  }
});

/* harmony default export */ __webpack_exports__["a"] = router;


/***/ }),
/* 24 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_express__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_express___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_express__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__DB_models_User__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__middlewares_authenticate__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__shared_addUserValidation__ = __webpack_require__(64);


const router = __WEBPACK_IMPORTED_MODULE_0_express___default.a.Router();





router.post("/", __WEBPACK_IMPORTED_MODULE_2__middlewares_authenticate__["a" /* default */], (req, res) => {
  const { errors, isValid } = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_3__shared_addUserValidation__["a" /* default */])(req.body);
  if(isValid) {
    const { name, lastName, email, password, admin } = req.body;

    __WEBPACK_IMPORTED_MODULE_1__DB_models_User__["a" /* default */].findOne({ email }, (err, user) => {
      if(err) {
        res.status(400).json(err);
      }
      if(user) {
        res.status(400).json({ success: false, fail: true, text: "User already exists" });
      } else {
        const newUser = new __WEBPACK_IMPORTED_MODULE_1__DB_models_User__["a" /* default */]();

        newUser.name = name;
        newUser.lastName = lastName;
        newUser.email = email;
        newUser.password = newUser.encryptPassword(password);
        newUser.userType = admin ? "admin" : "user";

        newUser.save(err => {
          if(err) {
            res.status(400).json(err);
          } else {
            res.json({ success: true, fail: false, text: "User added successfully" });
          }
        });
      }
    });

  } else {
    res.status(400).json(errors);
  }
});

/* harmony default export */ __webpack_exports__["a"] = router;


/***/ }),
/* 25 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_express__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_express___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_express__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__DB_models_Project__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__DB_models_User__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__middlewares_authenticate__ = __webpack_require__(3);






const router = __WEBPACK_IMPORTED_MODULE_0_express___default.a.Router();

router.get("/", __WEBPACK_IMPORTED_MODULE_3__middlewares_authenticate__["a" /* default */], (req, res) => {
  const hours = [];
  __WEBPACK_IMPORTED_MODULE_2__DB_models_User__["a" /* default */].findOne({ _id: req.query.id }, (err, user) => {
    if(err) {
      res.status(400).json(err);
    }
    if(user) {
      if(user.projects.length > 0) {
        const assignedProjects = [];

        user.projects.forEach((userProject, index, array) => { //do not search forEach project

          __WEBPACK_IMPORTED_MODULE_1__DB_models_Project__["a" /* default */].findOne({_id: userProject._id}, (err, project) => {
            if(err) {
              res.status(400).json(err);
            }
            // if(project) {
            if(userProject.time.length > 0) {
              userProject.time.forEach((timeObj, index, array) => {
                hours.push(timeObj.hoursWorked);

                if(index === array.length - 1) {
                  assignedProjects.push({
                    project,
                    additionalData: "pending"
                  });
                }
              });
            } else {
              assignedProjects.push({
                project,
                additionalData: 0
              });
            }

            if(index === array.length - 1) {
              res.json(assignedProjects);
            }
            // }
          });
        });
      } else {
        res.status(404).json({ message: "No projects assigned" });
      }
    }
  });
});

router.put("/updateWorkTime", __WEBPACK_IMPORTED_MODULE_3__middlewares_authenticate__["a" /* default */], (req, res) => {
  __WEBPACK_IMPORTED_MODULE_2__DB_models_User__["a" /* default */].findOne({_id: req.body.userID}, (err, user) => {
    if(err) {
      res.json(err);
    } else {
      const project = user.projects.find(project => {
        return project._id == req.body.projectID;
      });
      if(typeof project === "undefined") {
        res.status(404).json({ message: "This project is not assigned" });
      } else {
        const workDate = req.body.workTime.date.substr(0, 10);
        const hoursWorked = req.body.workTime.hours;
        const date = project.time.find(time => time.date === workDate);
        const projectIndex = user.projects.indexOf(project);

        if(typeof date === "undefined") {
          user.projects[projectIndex].time.push({
            date: workDate,
            hoursWorked
          });
        } else {
          const dateIndex = user.projects[projectIndex].time.indexOf(date);
          user.projects[projectIndex].time[dateIndex].hoursWorked += hoursWorked;
        }

        __WEBPACK_IMPORTED_MODULE_1__DB_models_Project__["a" /* default */].findById(req.body.projectID, (err, project) => {
          if(err) {
            res.json(err);
          } else {
            project.hoursWorked = user.projects[projectIndex].time.reduce(
              (acc, time) => {
                return acc + time.hoursWorked;
              }, 0
            );

            project.save();
          }
        });

        user.save((err) => {
          if(err) {
            res.json(err);
          } else {
            res.json(user.projects[projectIndex].time);
          }
        });
      }
    }
  });
});

router.put("/selected", __WEBPACK_IMPORTED_MODULE_3__middlewares_authenticate__["a" /* default */], (req, res) => {
  const { id, userID } = req.body;
  let hours = 0;
  __WEBPACK_IMPORTED_MODULE_2__DB_models_User__["a" /* default */].findOne({ _id: userID }, (err, user) => {
    if(err) {
      res.status(400).json(err);
    }
    if(!user) {
      res.status(404).json({ message: "User not found" });
    } else {
      const selectedProject = user.projects.find(project => {
        return String(project._id) === id;
      });
    selectedProject.time.forEach((project, index, array) => {
      hours += project.hoursWorked;

      if(index === array.length - 1) {
        res.json(hours);
      }
    });
    }
  });
});

/* harmony default export */ __webpack_exports__["a"] = router;


/***/ }),
/* 26 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_passport__ = __webpack_require__(10);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_passport___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_passport__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_express__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_express___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_express__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_jsonwebtoken__ = __webpack_require__(21);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_jsonwebtoken___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_jsonwebtoken__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__shared_loginValidation__ = __webpack_require__(65);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__config_jwtConfig__ = __webpack_require__(20);







const router = __WEBPACK_IMPORTED_MODULE_1_express___default.a.Router();

router.post("/", (req, res, next) => {
  const { errors, isValid } = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_3__shared_loginValidation__["a" /* default */])(req.body);

  if(isValid) {
    __WEBPACK_IMPORTED_MODULE_0_passport___default.a.authenticate("local.login", (err, user, info) => {
      if(err) return next(err);
      if(!user) return res.status(400).json(info);
      if(user) {
        // creating jwt token
        const token = __WEBPACK_IMPORTED_MODULE_2_jsonwebtoken___default.a.sign({
          id: user._id,
          username: user.email,
          userType: user.userType
        }, __WEBPACK_IMPORTED_MODULE_4__config_jwtConfig__["a" /* default */].jwtSecret);
        res.json({ token });
      }
    })(req, res, next);
  } else {
    res.status(400).json(errors);
  }
});

/* harmony default export */ __webpack_exports__["a"] = router;


/***/ }),
/* 27 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_express__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_express___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_express__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__DB_models_Project_js__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__DB_models_User_js__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__middlewares_authenticate__ = __webpack_require__(3);


const router = __WEBPACK_IMPORTED_MODULE_0_express___default.a.Router();





router.delete("/", __WEBPACK_IMPORTED_MODULE_3__middlewares_authenticate__["a" /* default */], (req, res) => {
  const { id } = req.body;
  if(!id) {
    res.status(400).json({ noProject: true, message: "Select project to delete" });
  } else {
    __WEBPACK_IMPORTED_MODULE_1__DB_models_Project_js__["a" /* default */].findOneAndRemove({ _id: id }, (err, project) => {
      if(err) {
        res.status(400).json(err);
      }
      __WEBPACK_IMPORTED_MODULE_2__DB_models_User_js__["a" /* default */].find({}, (err, users) => {
        if(err) {
          res.status(400).json(err);
        }
        users.forEach((user, index, array) => {
          const projectsToLeave = user.projects.filter(userProject => {
            return userProject.name !== project.name;
          });
          user.projects = projectsToLeave;
          user.save(err => {
            if(err) {
              res.status(400).json(err);
            }
          });
          if(index === array.length - 1) {
            res.json({ noProject: false, message: "Project deleted" });
          }
        });
      });
    });
  }
});

router.put("/", __WEBPACK_IMPORTED_MODULE_3__middlewares_authenticate__["a" /* default */], (req, res) => {
  const { projectID, projectName, client, startDate } = req.body;
  const dueDate = startDate.substr(0, 10);

  __WEBPACK_IMPORTED_MODULE_1__DB_models_Project_js__["a" /* default */].findOne({ _id: projectID }, (err, project) => {
    if(err) {
      res.status(400).json(err);
      return;
    }
    if(!project) {
      res.status(404).json({ message: "Project not found" });
    } else {
      project.name = projectName;
      project.client = client;
      project.dueDate = dueDate;

      __WEBPACK_IMPORTED_MODULE_2__DB_models_User_js__["a" /* default */].find({}, (err, users) => {
        if(err) {
          res.status(400).json(err);
        }
        if(!users) {
          res.status(404).json({ message: "No users have been found" });
        } else {
          users.forEach((user, index, array) => {
            user.projects.forEach(project => {
              if(String(project._id) === projectID) {
                project.name = projectName;
                user.save();
              }
            });

            if(index === array.length - 1) {
              project.save(err => {
                if(err) {
                  res.status(400).json(err);
                } else {
                  res.json({ message: "Project has been updated" });
                }
              });
            }
          });
        }
      });


    }
  });
});

/* harmony default export */ __webpack_exports__["a"] = router;


/***/ }),
/* 28 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_express__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_express___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_express__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__DB_models_Project__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__DB_models_User__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__middlewares_authenticate__ = __webpack_require__(3);






const router = __WEBPACK_IMPORTED_MODULE_0_express___default.a.Router();

router.get("/", __WEBPACK_IMPORTED_MODULE_3__middlewares_authenticate__["a" /* default */], (req, res) => {
  __WEBPACK_IMPORTED_MODULE_1__DB_models_Project__["a" /* default */].find({}, (err,projects) => {
    if(err) {
      res.status(400).json(err);
    }
    if(!projects) {
      res.status(404).json("Projects not found");
    } else {
      res.json(projects);
    }
  });
});

router.put("/", __WEBPACK_IMPORTED_MODULE_3__middlewares_authenticate__["a" /* default */], (req, res) => {
  const projectID = req.body.id;
  let hours = 0;

  __WEBPACK_IMPORTED_MODULE_2__DB_models_User__["a" /* default */].find({}, (err, users) => { //finds all users
    if(err) {
      res.status(400).json(err);
    }
    if(!users) {
      res.status(404).json({ message: "No user has been found" });
    } else {  //users found (happens all the time)
      users.forEach((user, index, array) => {
        const projectBeingChecked = user.projects.find(userProject => {
          return String(userProject._id) === projectID;
        });
        if(projectBeingChecked) {
          projectBeingChecked.time.forEach(hour => {
            hours += hour.hoursWorked;
          });
        }

        if(index === array.length - 1){
          __WEBPACK_IMPORTED_MODULE_1__DB_models_Project__["a" /* default */].findOne({ _id: projectID }, (err, project) => {
            if(err) {
              res.status(400).json(err);
            }
            if(!project) {
              res.status(404).json({ message: "no projects have been found" });
            } else {
              project.hoursWorked = hours;
              project.save(err => {
                if(err) {
                  res.status(400).json(err);
                } else {
                  res.json(hours);
                }
              });
            }
          });
        }
      });
    }

  });

});

/* harmony default export */ __webpack_exports__["a"] = router;

/*Messy not working correctly*/

// const allProjects = [];
// const userProjects = [];
// const uniqueProjects = [];
// const semiUniq = [];
// const hours = [];
// let projectFromDB;
// Project.find({}, (err, projects) => {
//   if(err) {
//     res.status(400).json(err);
//   }
//   if(!projects) {
//     res.status(404).json({ message: "No projects has been found" });
//   } else {
//     projects.forEach((project, index, array) => {
//       allProjects.push(project._id);    //putting all database project ids to array
//       if(index === array.length - 1) {
//         User.find({}, (err, users) => {
//           if(err) {
//             res.status(400).json(err);
//           }
//           if(!users) {
//             res.status(404).json({ message: "No users has been found" });
//           } else {
//             users.forEach((user, index, array) => {
//               user.projects.forEach(project => {
//                 allProjects.forEach(dbProjectID => {
//                   if(String(dbProjectID) === String(project._id)) {
//                     if(project.time.length > 0) {
//                       project.time.forEach((item, index, array) => {
//                         hours.push(item.hoursWorked);
//                         if(index === array.length - 1) {
//                           console.log(hours);
//                           userProjects.push({
//                             id: dbProjectID,
//                             hours: hours.reduce((acc, hour) => acc + hour, 0)
//                           }); //adding matched user and db projects ids to another array with worked time
//                         }
//                       });
//                     } else {
//                       userProjects.push({
//                         id: dbProjectID,
//                         hours: 0
//                       });
//                     }
//
//                   }
//                 });
//               });
//               if(index === array.length - 1) {
//                 allProjects.forEach((projectID, index, array) => {
//                   semiUniq.push(userProjects.filter(userProject => {
//                     return String(projectID) === String(userProject.id);
//                   }));
//                   if(index === array.length - 1) {
//                     semiUniq.forEach((semi, index, array) => {
//                       if(semi.length > 0) {
//                         uniqueProjects.push({
//                           id: semi[0].id,
//                           hours: semi.reduce((acc, item) => acc += item.hours, 0) //calculating worked time and adding to yet another array also with uniq project id
//                         });
//                       }
//                       if(index === array.length - 1) {
//                         uniqueProjects.forEach((project, index, array) => {
//                           projectFromDB = projects.find(dbProject => {
//                             return project.id === dbProject._id;
//                           });
//                           projectFromDB.hoursWorked = project.hours;
//                           projectFromDB.save(err => {
//                             if(err) {
//                               res.status(400).json(err);
//                             } else {
//                               res.status(200).send();
//                             }
//                           });
//                         });
//                       }
//                     });
//                   }
//                 });
//               }
//             });
//           }
//         });
//       }
//     });
//   }
// });


/***/ }),
/* 29 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_express__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_express___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_express__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__DB_models_User__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__middlewares_authenticate__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__middlewares_isAdmin__ = __webpack_require__(62);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__shared_updateUserValidation__ = __webpack_require__(66);







const router = __WEBPACK_IMPORTED_MODULE_0_express___default.a.Router();

router.get("/", __WEBPACK_IMPORTED_MODULE_2__middlewares_authenticate__["a" /* default */], (req, res) => {
  __WEBPACK_IMPORTED_MODULE_1__DB_models_User__["a" /* default */].find({}, (err, users) => {
    if(err) {
      res.json(err);
    }

    if(!users) {
      res.status(404).send();
    } else {
      res.status(200).json(users);
    }
  });
});

router.put("/updateUser", __WEBPACK_IMPORTED_MODULE_2__middlewares_authenticate__["a" /* default */], (req, res) => {
  const { errors, isValid } = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_4__shared_updateUserValidation__["a" /* default */])(req.body);

  if(isValid) {
    __WEBPACK_IMPORTED_MODULE_1__DB_models_User__["a" /* default */].findOne({ _id: req.body.userId }, (err, user) => {
      if(err) {
        res.status(400).json(err);
      }
      if(!user) {
        res.status(404).send();
      } else {
        user.name = req.body.firstName;
        user.lastName = req.body.lastName;
        user.email = req.body.email;
        user.userType = req.body.checkedUser ? "user" : "admin";
        user.save(err => {
          if(err) {
            res.status(404).json(err);
          }
          res.json(user);
        });
      }
    });
  } else {
    res.status(400).json(errors);
  }

});

router.delete("/deleteUser", __WEBPACK_IMPORTED_MODULE_2__middlewares_authenticate__["a" /* default */], (req, res) => {
  __WEBPACK_IMPORTED_MODULE_1__DB_models_User__["a" /* default */].findOneAndRemove({ _id: req.body.userId }, err => {
    if(err) {
      res.json(err);
    } else {
      res.status(200).send();
    }
  });
});

router.put("/assignProjects", __WEBPACK_IMPORTED_MODULE_2__middlewares_authenticate__["a" /* default */], (req, res) => {
  __WEBPACK_IMPORTED_MODULE_1__DB_models_User__["a" /* default */].findOne({ _id: req.body.userId }, (err, user) => {
    if(err) {
      res.json(err);
    }
    if(!user) {
      res.status(404).send();
    } else {
      if(user.projects.length < 1) {
        user.projects = req.body.projects;
      } else {
        if(req.body.projects.length < user.projects.length) {
          user.projects.forEach(userProject => {
            let existingProject = req.body.projects.find(project => {
              return userProject._id == project._id;
            });

            if(!existingProject) {
              let index = user.projects.indexOf(userProject);
              user.projects.splice(index, 1);
            }
          });
        } else {
          req.body.projects.forEach(project => {
            let existingProject = user.projects.find(userProject => {
              return project._id == userProject._id;
            });

            if(!existingProject) {
              user.projects.push(project);
            }

          });
        }
      }
      user.save(err => {
        if(err) {
          res.json(err);
        } else {
          res.json(user);
        }
      });
    }
  });
});

/* harmony default export */ __webpack_exports__["a"] = router;


/***/ }),
/* 30 */
/***/ (function(module, exports) {

module.exports = require("body-parser");

/***/ }),
/* 31 */
/***/ (function(module, exports) {

module.exports = require("compression");

/***/ }),
/* 32 */
/***/ (function(module, exports) {

module.exports = require("connect-mongo");

/***/ }),
/* 33 */
/***/ (function(module, exports) {

module.exports = require("cookie-parser");

/***/ }),
/* 34 */
/***/ (function(module, exports) {

module.exports = require("express-session");

/***/ }),
/* 35 */
/***/ (function(module, exports) {

module.exports = require("express-validator");

/***/ }),
/* 36 */
/***/ (function(module, exports) {

module.exports = require("path");

/***/ }),
/* 37 */
/***/ (function(module, exports, __webpack_require__) {

var getNative = __webpack_require__(4),
    root = __webpack_require__(1);

/* Built-in method references that are verified to be native. */
var DataView = getNative(root, 'DataView');

module.exports = DataView;


/***/ }),
/* 38 */
/***/ (function(module, exports, __webpack_require__) {

var getNative = __webpack_require__(4),
    root = __webpack_require__(1);

/* Built-in method references that are verified to be native. */
var Map = getNative(root, 'Map');

module.exports = Map;


/***/ }),
/* 39 */
/***/ (function(module, exports, __webpack_require__) {

var getNative = __webpack_require__(4),
    root = __webpack_require__(1);

/* Built-in method references that are verified to be native. */
var Promise = getNative(root, 'Promise');

module.exports = Promise;


/***/ }),
/* 40 */
/***/ (function(module, exports, __webpack_require__) {

var getNative = __webpack_require__(4),
    root = __webpack_require__(1);

/* Built-in method references that are verified to be native. */
var Set = getNative(root, 'Set');

module.exports = Set;


/***/ }),
/* 41 */
/***/ (function(module, exports, __webpack_require__) {

var getNative = __webpack_require__(4),
    root = __webpack_require__(1);

/* Built-in method references that are verified to be native. */
var WeakMap = getNative(root, 'WeakMap');

module.exports = WeakMap;


/***/ }),
/* 42 */
/***/ (function(module, exports, __webpack_require__) {

var baseGetTag = __webpack_require__(6),
    isObjectLike = __webpack_require__(11);

/** `Object#toString` result references. */
var argsTag = '[object Arguments]';

/**
 * The base implementation of `_.isArguments`.
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is an `arguments` object,
 */
function baseIsArguments(value) {
  return isObjectLike(value) && baseGetTag(value) == argsTag;
}

module.exports = baseIsArguments;


/***/ }),
/* 43 */
/***/ (function(module, exports, __webpack_require__) {

var isFunction = __webpack_require__(16),
    isMasked = __webpack_require__(51),
    isObject = __webpack_require__(18),
    toSource = __webpack_require__(15);

/**
 * Used to match `RegExp`
 * [syntax characters](http://ecma-international.org/ecma-262/7.0/#sec-patterns).
 */
var reRegExpChar = /[\\^$.*+?()[\]{}|]/g;

/** Used to detect host constructors (Safari). */
var reIsHostCtor = /^\[object .+?Constructor\]$/;

/** Used for built-in method references. */
var funcProto = Function.prototype,
    objectProto = Object.prototype;

/** Used to resolve the decompiled source of functions. */
var funcToString = funcProto.toString;

/** Used to check objects for own properties. */
var hasOwnProperty = objectProto.hasOwnProperty;

/** Used to detect if a method is native. */
var reIsNative = RegExp('^' +
  funcToString.call(hasOwnProperty).replace(reRegExpChar, '\\$&')
  .replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g, '$1.*?') + '$'
);

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
  var pattern = isFunction(value) ? reIsNative : reIsHostCtor;
  return pattern.test(toSource(value));
}

module.exports = baseIsNative;


/***/ }),
/* 44 */
/***/ (function(module, exports, __webpack_require__) {

var baseGetTag = __webpack_require__(6),
    isLength = __webpack_require__(17),
    isObjectLike = __webpack_require__(11);

/** `Object#toString` result references. */
var argsTag = '[object Arguments]',
    arrayTag = '[object Array]',
    boolTag = '[object Boolean]',
    dateTag = '[object Date]',
    errorTag = '[object Error]',
    funcTag = '[object Function]',
    mapTag = '[object Map]',
    numberTag = '[object Number]',
    objectTag = '[object Object]',
    regexpTag = '[object RegExp]',
    setTag = '[object Set]',
    stringTag = '[object String]',
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

/** Used to identify `toStringTag` values of typed arrays. */
var typedArrayTags = {};
typedArrayTags[float32Tag] = typedArrayTags[float64Tag] =
typedArrayTags[int8Tag] = typedArrayTags[int16Tag] =
typedArrayTags[int32Tag] = typedArrayTags[uint8Tag] =
typedArrayTags[uint8ClampedTag] = typedArrayTags[uint16Tag] =
typedArrayTags[uint32Tag] = true;
typedArrayTags[argsTag] = typedArrayTags[arrayTag] =
typedArrayTags[arrayBufferTag] = typedArrayTags[boolTag] =
typedArrayTags[dataViewTag] = typedArrayTags[dateTag] =
typedArrayTags[errorTag] = typedArrayTags[funcTag] =
typedArrayTags[mapTag] = typedArrayTags[numberTag] =
typedArrayTags[objectTag] = typedArrayTags[regexpTag] =
typedArrayTags[setTag] = typedArrayTags[stringTag] =
typedArrayTags[weakMapTag] = false;

/**
 * The base implementation of `_.isTypedArray` without Node.js optimizations.
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a typed array, else `false`.
 */
function baseIsTypedArray(value) {
  return isObjectLike(value) &&
    isLength(value.length) && !!typedArrayTags[baseGetTag(value)];
}

module.exports = baseIsTypedArray;


/***/ }),
/* 45 */
/***/ (function(module, exports, __webpack_require__) {

var isPrototype = __webpack_require__(14),
    nativeKeys = __webpack_require__(52);

/** Used for built-in method references. */
var objectProto = Object.prototype;

/** Used to check objects for own properties. */
var hasOwnProperty = objectProto.hasOwnProperty;

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

module.exports = baseKeys;


/***/ }),
/* 46 */
/***/ (function(module, exports) {

/**
 * The base implementation of `_.unary` without support for storing metadata.
 *
 * @private
 * @param {Function} func The function to cap arguments for.
 * @returns {Function} Returns the new capped function.
 */
function baseUnary(func) {
  return function(value) {
    return func(value);
  };
}

module.exports = baseUnary;


/***/ }),
/* 47 */
/***/ (function(module, exports, __webpack_require__) {

var root = __webpack_require__(1);

/** Used to detect overreaching core-js shims. */
var coreJsData = root['__core-js_shared__'];

module.exports = coreJsData;


/***/ }),
/* 48 */
/***/ (function(module, exports, __webpack_require__) {

var Symbol = __webpack_require__(12);

/** Used for built-in method references. */
var objectProto = Object.prototype;

/** Used to check objects for own properties. */
var hasOwnProperty = objectProto.hasOwnProperty;

/**
 * Used to resolve the
 * [`toStringTag`](http://ecma-international.org/ecma-262/7.0/#sec-object.prototype.tostring)
 * of values.
 */
var nativeObjectToString = objectProto.toString;

/** Built-in value references. */
var symToStringTag = Symbol ? Symbol.toStringTag : undefined;

/**
 * A specialized version of `baseGetTag` which ignores `Symbol.toStringTag` values.
 *
 * @private
 * @param {*} value The value to query.
 * @returns {string} Returns the raw `toStringTag`.
 */
function getRawTag(value) {
  var isOwn = hasOwnProperty.call(value, symToStringTag),
      tag = value[symToStringTag];

  try {
    value[symToStringTag] = undefined;
    var unmasked = true;
  } catch (e) {}

  var result = nativeObjectToString.call(value);
  if (unmasked) {
    if (isOwn) {
      value[symToStringTag] = tag;
    } else {
      delete value[symToStringTag];
    }
  }
  return result;
}

module.exports = getRawTag;


/***/ }),
/* 49 */
/***/ (function(module, exports, __webpack_require__) {

var DataView = __webpack_require__(37),
    Map = __webpack_require__(38),
    Promise = __webpack_require__(39),
    Set = __webpack_require__(40),
    WeakMap = __webpack_require__(41),
    baseGetTag = __webpack_require__(6),
    toSource = __webpack_require__(15);

/** `Object#toString` result references. */
var mapTag = '[object Map]',
    objectTag = '[object Object]',
    promiseTag = '[object Promise]',
    setTag = '[object Set]',
    weakMapTag = '[object WeakMap]';

var dataViewTag = '[object DataView]';

/** Used to detect maps, sets, and weakmaps. */
var dataViewCtorString = toSource(DataView),
    mapCtorString = toSource(Map),
    promiseCtorString = toSource(Promise),
    setCtorString = toSource(Set),
    weakMapCtorString = toSource(WeakMap);

/**
 * Gets the `toStringTag` of `value`.
 *
 * @private
 * @param {*} value The value to query.
 * @returns {string} Returns the `toStringTag`.
 */
var getTag = baseGetTag;

// Fallback for data views, maps, sets, and weak maps in IE 11 and promises in Node.js < 6.
if ((DataView && getTag(new DataView(new ArrayBuffer(1))) != dataViewTag) ||
    (Map && getTag(new Map) != mapTag) ||
    (Promise && getTag(Promise.resolve()) != promiseTag) ||
    (Set && getTag(new Set) != setTag) ||
    (WeakMap && getTag(new WeakMap) != weakMapTag)) {
  getTag = function(value) {
    var result = baseGetTag(value),
        Ctor = result == objectTag ? value.constructor : undefined,
        ctorString = Ctor ? toSource(Ctor) : '';

    if (ctorString) {
      switch (ctorString) {
        case dataViewCtorString: return dataViewTag;
        case mapCtorString: return mapTag;
        case promiseCtorString: return promiseTag;
        case setCtorString: return setTag;
        case weakMapCtorString: return weakMapTag;
      }
    }
    return result;
  };
}

module.exports = getTag;


/***/ }),
/* 50 */
/***/ (function(module, exports) {

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

module.exports = getValue;


/***/ }),
/* 51 */
/***/ (function(module, exports, __webpack_require__) {

var coreJsData = __webpack_require__(47);

/** Used to detect methods masquerading as native. */
var maskSrcKey = (function() {
  var uid = /[^.]+$/.exec(coreJsData && coreJsData.keys && coreJsData.keys.IE_PROTO || '');
  return uid ? ('Symbol(src)_1.' + uid) : '';
}());

/**
 * Checks if `func` has its source masked.
 *
 * @private
 * @param {Function} func The function to check.
 * @returns {boolean} Returns `true` if `func` is masked, else `false`.
 */
function isMasked(func) {
  return !!maskSrcKey && (maskSrcKey in func);
}

module.exports = isMasked;


/***/ }),
/* 52 */
/***/ (function(module, exports, __webpack_require__) {

var overArg = __webpack_require__(55);

/* Built-in method references for those with the same name as other `lodash` methods. */
var nativeKeys = overArg(Object.keys, Object);

module.exports = nativeKeys;


/***/ }),
/* 53 */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(module) {var freeGlobal = __webpack_require__(13);

/** Detect free variable `exports`. */
var freeExports = typeof exports == 'object' && exports && !exports.nodeType && exports;

/** Detect free variable `module`. */
var freeModule = freeExports && typeof module == 'object' && module && !module.nodeType && module;

/** Detect the popular CommonJS extension `module.exports`. */
var moduleExports = freeModule && freeModule.exports === freeExports;

/** Detect free variable `process` from Node.js. */
var freeProcess = moduleExports && freeGlobal.process;

/** Used to access faster Node.js helpers. */
var nodeUtil = (function() {
  try {
    return freeProcess && freeProcess.binding && freeProcess.binding('util');
  } catch (e) {}
}());

module.exports = nodeUtil;

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(19)(module)))

/***/ }),
/* 54 */
/***/ (function(module, exports) {

/** Used for built-in method references. */
var objectProto = Object.prototype;

/**
 * Used to resolve the
 * [`toStringTag`](http://ecma-international.org/ecma-262/7.0/#sec-object.prototype.tostring)
 * of values.
 */
var nativeObjectToString = objectProto.toString;

/**
 * Converts `value` to a string using `Object.prototype.toString`.
 *
 * @private
 * @param {*} value The value to convert.
 * @returns {string} Returns the converted string.
 */
function objectToString(value) {
  return nativeObjectToString.call(value);
}

module.exports = objectToString;


/***/ }),
/* 55 */
/***/ (function(module, exports) {

/**
 * Creates a unary function that invokes `func` with its argument transformed.
 *
 * @private
 * @param {Function} func The function to wrap.
 * @param {Function} transform The argument transform.
 * @returns {Function} Returns the new function.
 */
function overArg(func, transform) {
  return function(arg) {
    return func(transform(arg));
  };
}

module.exports = overArg;


/***/ }),
/* 56 */
/***/ (function(module, exports, __webpack_require__) {

var baseIsArguments = __webpack_require__(42),
    isObjectLike = __webpack_require__(11);

/** Used for built-in method references. */
var objectProto = Object.prototype;

/** Used to check objects for own properties. */
var hasOwnProperty = objectProto.hasOwnProperty;

/** Built-in value references. */
var propertyIsEnumerable = objectProto.propertyIsEnumerable;

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
var isArguments = baseIsArguments(function() { return arguments; }()) ? baseIsArguments : function(value) {
  return isObjectLike(value) && hasOwnProperty.call(value, 'callee') &&
    !propertyIsEnumerable.call(value, 'callee');
};

module.exports = isArguments;


/***/ }),
/* 57 */
/***/ (function(module, exports) {

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

module.exports = isArray;


/***/ }),
/* 58 */
/***/ (function(module, exports, __webpack_require__) {

var isFunction = __webpack_require__(16),
    isLength = __webpack_require__(17);

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

module.exports = isArrayLike;


/***/ }),
/* 59 */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(module) {var root = __webpack_require__(1),
    stubFalse = __webpack_require__(61);

/** Detect free variable `exports`. */
var freeExports = typeof exports == 'object' && exports && !exports.nodeType && exports;

/** Detect free variable `module`. */
var freeModule = freeExports && typeof module == 'object' && module && !module.nodeType && module;

/** Detect the popular CommonJS extension `module.exports`. */
var moduleExports = freeModule && freeModule.exports === freeExports;

/** Built-in value references. */
var Buffer = moduleExports ? root.Buffer : undefined;

/* Built-in method references for those with the same name as other `lodash` methods. */
var nativeIsBuffer = Buffer ? Buffer.isBuffer : undefined;

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

module.exports = isBuffer;

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(19)(module)))

/***/ }),
/* 60 */
/***/ (function(module, exports, __webpack_require__) {

var baseIsTypedArray = __webpack_require__(44),
    baseUnary = __webpack_require__(46),
    nodeUtil = __webpack_require__(53);

/* Node.js helper references. */
var nodeIsTypedArray = nodeUtil && nodeUtil.isTypedArray;

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

module.exports = isTypedArray;


/***/ }),
/* 61 */
/***/ (function(module, exports) {

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

module.exports = stubFalse;


/***/ }),
/* 62 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__DB_models_User__ = __webpack_require__(2);
/* unused harmony export default */


function isAdmin(req, res, next) {
  __WEBPACK_IMPORTED_MODULE_0__DB_models_User__["a" /* default */].findOne({ _id: req.body.userID }, (err, user) => {
    if(err) {
      res.status(400).json(err);
    }
    if(user) {
      if(user.userType === "admin") {
        next();
      } else {
        res.status(404).json({ message: "You need to be an admin to access" });
      }
    }
  });
}


/***/ }),
/* 63 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_validator__ = __webpack_require__(8);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_validator___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_validator__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_lodash_isEmpty__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_lodash_isEmpty___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_lodash_isEmpty__);
/* harmony export (immutable) */ __webpack_exports__["a"] = validateInput;



function validateInput(data) {
  const errors = {};
  const regex = new RegExp("^[a-zA-Z0-9 ]+$");
  const spacesOnly = /^\s+$/;

  if(__WEBPACK_IMPORTED_MODULE_0_validator___default.a.isEmpty(data.name)) {
    errors.name = "Name is required";
  } else {
    if(!regex.test(data.name) || spacesOnly.test(data.name)) {
      errors.name = "Name must contain only letters and numbers";
    }
  }

  if(__WEBPACK_IMPORTED_MODULE_0_validator___default.a.isEmpty(data.client)) {
    errors.client = "Client name is required";
  } else {
    if(!regex.test(data.client) || spacesOnly.test(data.client)) {
      errors.client = "Client Name must contain only letters and numbers";
    }
  }


  return {
    errors,
    isValid: __WEBPACK_IMPORTED_MODULE_1_lodash_isEmpty___default()(errors)
  };
}


/***/ }),
/* 64 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_validator__ = __webpack_require__(8);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_validator___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_validator__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_lodash_isEmpty__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_lodash_isEmpty___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_lodash_isEmpty__);
/* harmony export (immutable) */ __webpack_exports__["a"] = validateInput;



function validateInput(data) {
  const errors = {};

  if(__WEBPACK_IMPORTED_MODULE_0_validator___default.a.isEmpty(data.name)) {
    errors.name = "First name is required";
  }
  if(__WEBPACK_IMPORTED_MODULE_0_validator___default.a.isEmpty(data.lastName)) {
    errors.lastName = "Last name is required";
  }
  if(__WEBPACK_IMPORTED_MODULE_0_validator___default.a.isEmpty(data.email)) {
    errors.email = "E-mail is required";
  }
  if(__WEBPACK_IMPORTED_MODULE_0_validator___default.a.isEmpty(data.password)) {
    errors.password = "Password is required";
  }
  if(__WEBPACK_IMPORTED_MODULE_0_validator___default.a.isEmpty(data.passwordAgain)) {
    errors.passwordAgain = "Password confirmation is required";
  }
  if(!__WEBPACK_IMPORTED_MODULE_0_validator___default.a.equals(data.password, data.passwordAgain)) {
    errors.passwordAgain = "Passwords do not match";
  }

  return {
    errors,
    isValid: __WEBPACK_IMPORTED_MODULE_1_lodash_isEmpty___default()(errors)
  };
}


/***/ }),
/* 65 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_validator__ = __webpack_require__(8);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_validator___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_validator__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_lodash_isEmpty__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_lodash_isEmpty___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_lodash_isEmpty__);
/* harmony export (immutable) */ __webpack_exports__["a"] = validateInput;



function validateInput(data) {
  const errors = {};
  
  if(__WEBPACK_IMPORTED_MODULE_0_validator___default.a.isEmpty(data.email)) {
    errors.email = "E-mail is required";
  }
  if(__WEBPACK_IMPORTED_MODULE_0_validator___default.a.isEmpty(data.password)) {
    errors.password = "Password is required";
  }

  return {
    errors,
    isValid: __WEBPACK_IMPORTED_MODULE_1_lodash_isEmpty___default()(errors)
  };
}


/***/ }),
/* 66 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_validator__ = __webpack_require__(8);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_validator___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_validator__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_lodash_isEmpty__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_lodash_isEmpty___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_lodash_isEmpty__);
/* harmony export (immutable) */ __webpack_exports__["a"] = validateInput;



function validateInput(data) {
  const errors = {};
  // const regex = new RegExp("^[a-zA-Z ]+$");

  if(__WEBPACK_IMPORTED_MODULE_0_validator___default.a.isEmpty(data.firstName)) {
    errors.name = "Name is required";
  } else {
    if(!__WEBPACK_IMPORTED_MODULE_0_validator___default.a.isAlpha(data.firstName)) {
      errors.name = "Name must contain only letters";
    }
  }

  if(__WEBPACK_IMPORTED_MODULE_0_validator___default.a.isEmpty(data.lastName)) {
    errors.lastName = "Last name is required";
  } else {
    if(!__WEBPACK_IMPORTED_MODULE_0_validator___default.a.isAlpha(data.lastName)) {
      errors.lastName = "Last name must contain only letters";
    }
  }

  if(__WEBPACK_IMPORTED_MODULE_0_validator___default.a.isEmpty(data.email)) {
    errors.email = "E-mail is required";
  } else {
    if(!__WEBPACK_IMPORTED_MODULE_0_validator___default.a.isEmail(data.email)) {
      errors.email = "E-mail must be valid";
    }
  }


  return {
    errors,
    isValid: __WEBPACK_IMPORTED_MODULE_1_lodash_isEmpty___default()(errors)
  };
}


/***/ }),
/* 67 */
/***/ (function(module, exports) {

module.exports = require("bcrypt-nodejs");

/***/ }),
/* 68 */
/***/ (function(module, exports) {

module.exports = require("passport-local");

/***/ }),
/* 69 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(__dirname) {Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_express__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_express___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_express__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_body_parser__ = __webpack_require__(30);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_body_parser___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_body_parser__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_express_session__ = __webpack_require__(34);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_express_session___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_express_session__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_cookie_parser__ = __webpack_require__(33);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_cookie_parser___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_cookie_parser__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_express_validator__ = __webpack_require__(35);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_express_validator___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_express_validator__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_mongoose__ = __webpack_require__(9);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_mongoose___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_5_mongoose__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_connect_mongo__ = __webpack_require__(32);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_connect_mongo___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_6_connect_mongo__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7_passport__ = __webpack_require__(10);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7_passport___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_7_passport__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8_path__ = __webpack_require__(36);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8_path___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_8_path__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9_compression__ = __webpack_require__(31);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9_compression___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_9_compression__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__server_routes_addUser__ = __webpack_require__(24);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__server_routes_addProject__ = __webpack_require__(23);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12__server_routes_login__ = __webpack_require__(26);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_13__server_routes_dashboard__ = __webpack_require__(25);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_14__server_routes_projects__ = __webpack_require__(28);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_15__server_routes_usersList__ = __webpack_require__(29);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_16__server_routes_manageProjects__ = __webpack_require__(27);
//npm modules


// import logger from "morgan";



 //for production
 //for production
// import flash from "connect-flash";


// import webpack from "webpack";
// import webpackDevMiddleware from "webpack-dev-middleware";
// import webpackHotMiddleware from "webpack-hot-middleware";

// import fs from "fs";


//local modules
// import webpackConfig from "./webpack.config";








const app = __WEBPACK_IMPORTED_MODULE_0_express___default()();
// const compiler = webpack(webpackConfig);

app.use(__WEBPACK_IMPORTED_MODULE_1_body_parser___default.a.json());
app.use(__WEBPACK_IMPORTED_MODULE_1_body_parser___default.a.urlencoded({ extended: true }));

app.use("/api/dashboard", __WEBPACK_IMPORTED_MODULE_13__server_routes_dashboard__["a" /* default */]); //GET
app.use("/api/projects", __WEBPACK_IMPORTED_MODULE_14__server_routes_projects__["a" /* default */]); //GET

// if(process.env.NODE_ENV.trim() == "development") {
//   app.use(webpackDevMiddleware(compiler, {
//     hot: true,
//     noInfo: true,
//     stats: {
//       colors: true
//     }
//   }));
//   app.use(webpackHotMiddleware(compiler));
//
//   // for different routes than "/" to be able to reload page and not get error
//   app.get("/*", function (req, res, next) {
//     const filename = path.join(compiler.outputPath, "index.html");
//     compiler.outputFileSystem.readFile(filename, function(err, result){
//       if (err) {
//         return next(err);
//       }
//       if(req.url === "/api/dashboard" || req.url === "/api/usersList") return next();
//
//       res.set("content-type","text/html");
//       res.send(result);
//       res.end();
//     });
//   });
//
//   app.use(logger("dev"));
// }

if(process.env.NODE_ENV.trim() == "production") {
  app.use(__WEBPACK_IMPORTED_MODULE_9_compression___default()());
  app.use(__WEBPACK_IMPORTED_MODULE_0_express___default.a.static(__WEBPACK_IMPORTED_MODULE_8_path___default.a.join(__dirname, "dist")));

  // app.get("/*", function (req, res, next) {
  //   const filename = path.join(__dirname, "index.html");
  //   console.log("FILENAME: ",filename);
  //   console.log("DIRNAME: ",__dirname);
  //
  //   fs.readFile(filename, function(err, result){
  //     if (err) {
  //       return next(err);
  //     }
  //     if(req.url === "/api/dashboard" || req.url === "/api/usersList") return next();
  //
  //     res.set("content-type","text/html");
  //     res.send(result);
  //     res.end();
  //   });
  // });
}

__WEBPACK_IMPORTED_MODULE_5_mongoose___default.a.Promise = global.Promise;
// mongoose.connect("mongodb://localhost/workRecords"); DEV
__WEBPACK_IMPORTED_MODULE_5_mongoose___default.a.connect("mongodb://heroku_64qm85gh:ha8thplldf7djjlpbkrqf6r5pv@ds159050.mlab.com:59050/heroku_64qm85gh", err => {
  if(!err) {
    console.log("Mongo connected");
  }
}); //prod

const MongoStore = __WEBPACK_IMPORTED_MODULE_6_connect_mongo___default()(__WEBPACK_IMPORTED_MODULE_2_express_session___default.a); //for production

const PORT = process.env.PORT || 3001;

__webpack_require__(22);

app.use(__WEBPACK_IMPORTED_MODULE_4_express_validator___default()());

app.use(__WEBPACK_IMPORTED_MODULE_3_cookie_parser___default()());
app.use(__WEBPACK_IMPORTED_MODULE_2_express_session___default()({
  secret: "80crnpnfqyo8nynqbfpn9UNEFNPUSDBQ[A]",
  saveUninitialized: false,
  resave: false,
  store: new MongoStore({ mongooseConnection: __WEBPACK_IMPORTED_MODULE_5_mongoose___default.a.connection }) //for production
}));
// app.use(flash());
app.use(__WEBPACK_IMPORTED_MODULE_7_passport___default.a.initialize());
app.use(__WEBPACK_IMPORTED_MODULE_7_passport___default.a.session());

//routes
app.use("/api/addUser", __WEBPACK_IMPORTED_MODULE_10__server_routes_addUser__["a" /* default */]); //POST
app.use("/api/addProject", __WEBPACK_IMPORTED_MODULE_11__server_routes_addProject__["a" /* default */]); //POST
app.use("/api/login", __WEBPACK_IMPORTED_MODULE_12__server_routes_login__["a" /* default */]); //POST
app.use("/api/usersList", __WEBPACK_IMPORTED_MODULE_15__server_routes_usersList__["a" /* default */]); //GET
app.use("/api/usersList/updateUser", __WEBPACK_IMPORTED_MODULE_15__server_routes_usersList__["a" /* default */]); //PUT
app.use("/api/usersList/deleteUser", __WEBPACK_IMPORTED_MODULE_15__server_routes_usersList__["a" /* default */]); //DELETE
app.use("/api/manageProjects/deleteProject", __WEBPACK_IMPORTED_MODULE_16__server_routes_manageProjects__["a" /* default */]); //DELETE
app.use("/api/manageProjects/updateProject", __WEBPACK_IMPORTED_MODULE_16__server_routes_manageProjects__["a" /* default */]); //PUT
app.use("/api/usersList/assignProjects", __WEBPACK_IMPORTED_MODULE_15__server_routes_usersList__["a" /* default */]); //PUT
app.use("/api/updateHours", __WEBPACK_IMPORTED_MODULE_14__server_routes_projects__["a" /* default */]); //PUT

app.use("/api/dashboard/updateWorkTime", __WEBPACK_IMPORTED_MODULE_13__server_routes_dashboard__["a" /* default */]); //PUT

app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT} in ${process.env.NODE_ENV}mode`);
});

/* WEBPACK VAR INJECTION */}.call(__webpack_exports__, "/"))

/***/ })
/******/ ]);