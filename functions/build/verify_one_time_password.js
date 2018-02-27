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

const verifyOneTimePassword = (() => {
  var _ref = (0, _asyncToGenerator3.default)(function* (req, res) {
    if (!req.body.phone || !req.body.code) return res.status(422).send({ error: 'Phone and code must be provided' });

    const phone = String(req.body.phone).replace(/[^\d]/g, '');
    const code = parseInt(req.body.code);

    try {
      const userRecord = yield _firebaseAdmin2.default.auth().getUser(phone);
      const ref = _firebaseAdmin2.default.database().ref(`users/${phone}`);
      return ref.on('value', (() => {
        var _ref2 = (0, _asyncToGenerator3.default)(function* (snapshot) {
          ref.off(); // kill snapshot reference
          const user = snapshot.val();

          if (user.code !== code || !user.codeValid) return res.status(422).send({ error: 'Code not valid' });

          ref.update({ codeValid: false });
          const token = yield _firebaseAdmin2.default.auth().createCustomToken(phone);
          return res.send({ token });
        });

        return function (_x3) {
          return _ref2.apply(this, arguments);
        };
      })());
    } catch (error) {
      return res.status(422).send({ error });
    }
  });

  return function verifyOneTimePassword(_x, _x2) {
    return _ref.apply(this, arguments);
  };
})();

exports.default = functions.https.onRequest(verifyOneTimePassword);