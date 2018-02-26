const admin = require('firebase-admin');
const twilio = require('./twilio');

module.exports = (req, res) => {
  // verify request contains a phone number
  if (!req.body.phone) return res.status(422).send({ error: 'Bad Input' });

  // remove all non-digit characters from phone number
  const phone = String(req.body.phone).replace(/[^\d]/g, '');

  admin.auth().getUser(phone).then(userRecord => {
    const code = Math.floor(Math.random() * 8999 + 1000);
    return twilio.messages.create({
      body: 'Your code is' + code,
      to: phone,
      from: '+14044766987'
    }, err => {
      if (err) return res.status(422).send(err);

      admin.database().ref('users/' + phone).update({ code, codeValid: true }, () => {
        res.send({ success: true });
      });
    });
  }).catch(error => res.status(422).send({ error }));
};