const senderName = "tsh.io";
const emailSenderMail = "serverless.bootcamp.mailer@gmail.com";
const from = `${senderName} <${emailSenderMail}>`
const emailSubject = "Register";
const emailBody = "Congratz you registered";
const emailBodyHtml = "<p>Congratz you registered</p>";

export default { senderName, emailSenderMail, emailSubject, emailBody, emailBodyHtml, from };
