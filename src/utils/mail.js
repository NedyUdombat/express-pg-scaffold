import nodemailer from 'nodemailer';
import pug from 'pug';

const MAIL_USER = process.env.MAIL_USER;
const MAIL_HOST = process.env.MAIL_HOST;
const MAIL_PASS = process.env.MAIL_PASS;

const transport = {
  host: MAIL_HOST,
  auth: {
    user: MAIL_USER,
    pass: MAIL_PASS,
  },
};

const transporter = nodemailer.createTransport(transport);

/**
 *
 * @param {string} email
 * @param {string} username
 * @param {string} token
 * @returns {void}
 */
export const sendVerification = async (email, username, token) => {
  transporter.sendMail(
    {
      to: email,
      subject: 'Welcome - Moviedate.com',
      from: 'hello@moviedate.com',
      html: pug.renderFile(__dirname + '/../templates/verification.pug', {
        username,
        token,
      }),
    },
    function(err, info) {
      if (err) {
        console.log(err);
      } else {
        console.log('Mail sent\n' + JSON.stringify(info));
      }
    },
  );
};
