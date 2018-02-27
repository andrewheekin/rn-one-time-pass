'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.verifyOneTimePassword = exports.requestOneTimePassword = exports.createUser = undefined;

var _firebaseAdmin = require('firebase-admin');

var _firebaseAdmin2 = _interopRequireDefault(_firebaseAdmin);

var _service_account = require('../service_account.json');

var _service_account2 = _interopRequireDefault(_service_account);

var _create_user = require('./create_user');

var _create_user2 = _interopRequireDefault(_create_user);

var _request_one_time_password = require('./request_one_time_password');

var _request_one_time_password2 = _interopRequireDefault(_request_one_time_password);

var _verify_one_time_password = require('./verify_one_time_password');

var _verify_one_time_password2 = _interopRequireDefault(_verify_one_time_password);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// exports.helloWorld = functions.https.onRequest((request, response) => {
//  response.send("Hello from Firebase!");
// });

_firebaseAdmin2.default.initializeApp({
  credential: _firebaseAdmin2.default.credential.cert(_service_account2.default),
  databaseURL: "https://udemy-one-time-pass.firebaseio.com"
});

exports.createUser = _create_user2.default;
exports.requestOneTimePassword = _request_one_time_password2.default;
exports.verifyOneTimePassword = _verify_one_time_password2.default;