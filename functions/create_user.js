const admin = require('firebase-admin');

module.exports = (req, res) => {
  // verify request contains a phone number
  if (!req.body.phone) return res.status(422).send({ error: 'Bad Input', req });

  // remove all non-digit characters from phone number
  const phone = String(req.body.phone).replace(/[^\d]/g, '');

  // create a new user account using that phone number
  admin.auth().createUser({ uid: phone }).then(user => res.send(user)).catch(error => res.status(422).send({ error }));

  // respond to the create user request saying the user was made
};