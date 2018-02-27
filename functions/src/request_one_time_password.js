import admin from 'firebase-admin';
import * as functions from 'firebase-functions';
import twilio from './twilio';

const requestOneTimePassword = async (req, res) => {
  // verify request contains a phone number
  if (!req.body.phone) return res.status(422).send({ error: 'Bad Input' });

  // remove all non-digit characters from phone number
  const phone = String(req.body.phone).replace(/[^\d]/g, '');

  try {
    await admin.auth().getUser(phone);
    const code = Math.floor(Math.random() * 8999 + 1000);
    return twilio.messages.create(
      {
        body: 'Your code is' + code,
        to: phone,
        from: '+14044766987',
      },
      err => {
        if (err) return res.status(422).send(err);

        admin
          .database()
          .ref(`users/${phone}`)
          .update({ code, codeValid: true }, () => {
            res.send({ success: true });
          });
      }
    );
  } catch (error) {
    return res.status(422).send({ error });
  }
};

export default functions.https.onRequest(requestOneTimePassword);
