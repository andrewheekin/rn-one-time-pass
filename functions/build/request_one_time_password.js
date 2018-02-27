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

var _twilio = require('./twilio');

var _twilio2 = _interopRequireDefault(_twilio);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const requestOneTimePassword = (() => {
  var _ref = (0, _asyncToGenerator3.default)(function* (req, res) {
    // verify request contains a phone number
    if (!req.body.phone) return res.status(422).send({ error: 'Bad Input' });

    // remove all non-digit characters from phone number
    const phone = String(req.body.phone).replace(/[^\d]/g, '');

    try {
      yield _firebaseAdmin2.default.auth().getUser(phone);
      const code = Math.floor(Math.random() * 8999 + 1000);
      return _twilio2.default.messages.create({
        body: 'Your code is' + code,
        to: phone,
        from: '+14044766987'
      }, function (err) {
        if (err) return res.status(422).send(err);

        _firebaseAdmin2.default.database().ref(`users/${phone}`).update({ code, codeValid: true }, function () {
          res.send({ success: true });
        });
      });
    } catch (error) {
      return res.status(422).send({ error });
    }
  });

  return function requestOneTimePassword(_x, _x2) {
    return _ref.apply(this, arguments);
  };
})();

exports.default = functions.https.onRequest(requestOneTimePassword);