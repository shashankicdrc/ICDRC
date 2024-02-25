const express = require("express");
const {OrganizationalComplaint}=require("..//..//models/OrganizationalComplaint")
const Organizationalrouter = express.Router();

Organizationalrouter.post("/", async (req, res) => {
  const { organization_name, phoneNumber, emailId, country, state,city, address,language, policy_company, policy_type, problem, problem_detail } = req.body;

  {
     
    try {
      let user = new OrganizationalComplaint({ organization_name, phoneNumber, emailId, country, state,city, address,language, policy_company, policy_type, problem, problem_detail });
      await user.save();
      res.send({
        message: " Organizational Complaint created",
        status: 1,
      });
    } catch (error) {
      res.send({
        message: error.message,
        status: 0,
      });
    }
  };
});

module.exports = { Organizationalrouter };