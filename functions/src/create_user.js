import admin from 'firebase-admin';
import * as functions from "firebase-functions"

const createUser = async (req, res) => {
  // verify request contains a phone number
  if (!req.body.phone) return res.status(422).send({ error: 'Bad Input', req });

  // remove all non-digit characters from phone number
  const phone = String(req.body.phone).replace(/[^\d]/g, '');

  // create a new user account using that phone number
  try {
    const user = await admin.auth().createUser({ uid: phone });
    return res.send(user);
  } catch (error) {
    return res.status(422).send({ error });
  }
};

export default functions.https.onRequest(createUser);
