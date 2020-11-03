const sgMail = require("@sendgrid/mail");

export async function sendEmail(to: string, html: string) {
  sgMail.setApiKey(process.env.SENDGRID_API_KEY);
  const msg = {
    to, // Change to your recipient
    from: "ali.dahdouh@gmail.com", // Change to your verified sender
    subject: "9Gag Clone | Reset your password",
    text: "and easy to do anywhere, even with Node.js",
    html,
  };

  return sgMail
    .send(msg)
    .then(() => console.log("Email sent!!"))
    .catch((err: object) => console.error(err));
}
