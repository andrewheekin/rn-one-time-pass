import admin from 'firebase-admin';
import * as functions from 'firebase-functions';

const verifyOneTimePassword = async (req, res) => {
  if (!req.body.phone || !req.body.code) return res.status(422).send({ error: 'Phone and code must be provided' });

  const phone = String(req.body.phone).replace(/[^\d]/g, '');
  const code = parseInt(req.body.code);

  try {
    const userRecord = await admin.auth().getUser(phone);
    const ref = admin.database().ref(`users/${phone}`);
    return ref.on('value', async snapshot => {
      ref.off(); // kill snapshot reference
      const user = snapshot.val();
  
      if (user.code !== code || !user.codeValid) return res.status(422).send({ error: 'Code not valid' });
  
      ref.update({ codeValid: false });
      const token = await admin.auth().createCustomToken(phone);
      return res.send({ token });
    });
  } catch (error) {
    return res.status(422).send({ error });
  }
};

export default functions.https.onRequest(verifyOneTimePassword);