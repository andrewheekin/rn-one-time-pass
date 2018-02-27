'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _firebaseAdmin = require('firebase-admin');

var _firebaseAdmin2 = _interopRequireDefault(_firebaseAdmin);

var _firebaseFunctions = require('firebase-functions');

var functions = _interopRequireWildcard(_firebaseFunctions);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const createUser = (() => {
  var _ref = (0, _asyncToGenerator3.default)(function* (req, res) {
    // verify request contains a phone number
    if (!req.body.phone) return res.status(422).send({ error: 'Bad Input', req });

    // remove all non-digit characters from phone number
    const phone = String(req.body.phone).replace(/[^\d]/g, '');

    // create a new user account using that phone number
    try {
      const user = yield _firebaseAdmin2.default.auth().createUser({ uid: phone });
      return res.send(user);
    } catch (error) {
      return res.status(422).send({ error });
    }
  });

  return function createUser(_x, _x2) {
    return _ref.apply(this, arguments);
  };
})();

exports.default = functions.https.onRequest(createUser);