const fs = require("fs");
const ejs = require("ejs");

const NewRegrecipients = ["admin@icdrc.in", "info@icdrc.in"];

const policyTypeToEmail = {
  "Life Insurance": "lifeinsurance@icdrc.in",
  "Health Insurance": "kartikey090803@gmail.com",
  "Motor Insurance": "motorinsurance@icdrc.in",
  "Travel Insurance": "travelinsurance@icdrc.in",
  "Agriculture Insurance": "agricultureinsurance@icdrc.in",
  "Fire Insurance": "fileinsurance@icdrc.in",
  "Marine Insurance": "marineinsurance@icdrc.in",
  "Liability Insurance": "liabilityinsurance@icdrc.in",
  "Cyber Insurance": "cyberinsurance@icdrc.in",
  "Personal Accident Insurance": "personalaccidentinsurance@icdrc.in",
  "Property Insurance": "propertyinsurance@icdrc.in",
};

const getPolicyEmail = (type) => {
  return policyTypeToEmail[type];
};

const htmlTemplate = (templatePath, data) => {
  const emailTemplate = fs.readFileSync(templatePath, "utf-8");
  const renderedEmail = ejs.render(emailTemplate, data);
  return renderedEmail;
};

const MailFilePath = process.cwd() + "/utils/SendMail.js";

const NOREPLYEMAIL = "no_reply@icdrc.in";

const TeamPaymentEmail = ["admin@icdrc.in", "info@icdrc .in"];

module.exports = {
  TeamPaymentEmail,
  NewRegrecipients,
  NOREPLYEMAIL,
  policyTypeToEmail,
  getPolicyEmail,
  htmlTemplate,
  MailFilePath,
};
