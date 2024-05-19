const fs = require("fs");
const ejs = require("ejs");

const NewRegrecipients = ["admin@icdrc.in", "info@icdrc.in"];

const policyType = [
  "Life Insurance",
  "Health Insurance",
  "Motor Insurance",
  "Travel Insurance",
  "Crop Insurance",
  "Fire Insurance",
  "Marine Insurance",
  "Liability Insurance",
  "Cyber Insurance",
  "Personal Accident Insurance",
  "Property Insurance",
  "Event Insurance",
  "Professional Indemnity Insurance",
];

const policyTypeToEmail = {
  "Life Insurance": "lifeinsurance@icdrc.in",
  "Health Insurance": "kartikey090803@gmail.com",
  "Motor Insurance": "motorinsurance@icdrc.in",
  "Travel Insurance": "travelinsurance@icdrc.in",
  "Crop Insurance": "crop@icdrc.in",
  "Fire Insurance": "fireinsurance@icdrc.in",
  "Marine Insurance": "marineinsurance@icdrc.in",
  "Liability Insurance": "liabilityinsurance@icdrc.in",
  "Cyber Insurance": "cyberinsurance@icdrc.in",
  "Personal Accident Insurance": "personalaccidentinsurance@icdrc.in",
  "Property Insurance": "propertyinsurance@icdrc.in",
  "Professional Indemnity Insurance": "professionalindemnityinsurance@icdrc.in",
  "Event Insurance": "eventinsurance@icdrc.in",
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
