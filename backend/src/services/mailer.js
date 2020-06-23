import nodemailer from 'nodemailer';

import config from '../config/mailer';

const transport = nodemailer.createTransport({
  service: 'Mailgun',
  auth: {
    user: config.MAILGUN_USER,
    pass: config.MAILGUN_PASS,
  },
  tls: {
    rejectUnauthorized: false,
  },
});

export default {
  sendEmail(from, to, subject, html) {
    return new Promise((resolve, reject) =>
      transport.sendMail({ from, subject, to, html }, (err, info) => {
        if (err) reject(err);
        resolve(info);
      })
    );
  },
};
