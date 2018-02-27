import admin from 'firebase-admin';
import serviceAccount from '../service_account.json';
import createUser from './create_user';
import requestOneTimePassword from './request_one_time_password';
import verifyOneTimePassword from './verify_one_time_password';

// exports.helloWorld = functions.https.onRequest((request, response) => {
//  response.send("Hello from Firebase!");
// });

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://udemy-one-time-pass.firebaseio.com"
});

export { createUser, requestOneTimePassword, verifyOneTimePassword };
