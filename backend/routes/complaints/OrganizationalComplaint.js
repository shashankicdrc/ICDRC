const express = require("express");
const {
    OrganizationalComplaint,
} = require("..//..//models/OrganizationalComplaint");
const Organizationalrouter = express.Router();
var nodemailer = require("nodemailer");
const asyncError = require("../../middlewares/error");
const {
    htmlTemplate,
    MailFilePath,
    NewRegrecipients,
    NOREPLYEMAIL,
} = require("../../utils/Mail");
const { fork } = require("child_process");
const { pagination } = require("../../utils/pagination");
const { filterSort, parseFilters } = require('../../utils/filterSort');
const { AwsInstance } = require("twilio/lib/rest/accounts/v1/credential/aws");


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

var transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: "kartikey.chaudhary.webdesys@gmail.com",
        pass: "pulz gygf jlct ragt",
    },
});

Organizationalrouter.get('/organization_name', async (req, res) => {
    try {
        const data = await OrganizationalComplaint.find({}).select('organization_name')
        return res.status(200).json({ data })
    } catch (error) {
        res.send({
            message: error.message,
            status: 0,
        });

    }
})

Organizationalrouter.post("/", async (req, res) => {
    console.log("123");
    const {
        organization_name,
        mobile,
        email,
        country,
        state,
        city,
        address,
        policyCompany,
        policyType,
        problem,
        problemDetails,
        transactionId,
    } = req.body;

    {
        try {
            let user = await OrganizationalComplaint.create({
                organization_name,
                mobile,
                email,
                country,
                state,
                city,
                address,
                policyCompany,
                policyType,
                problem,
                problemDetails,
                transactionId,
            });
            res.status(200).json({ data: user });

            const caseData = {
                name: user.organization_name,
                email: user.email,
                mobile: user.mobile,
                date: user.createdAt.toLocaleString(),
            };
            const html = htmlTemplate(
                "template/organisational/NewRegTeam.html",
                caseData,
            );
            const NewMessage = {
                mailOptions: {
                    from: NOREPLYEMAIL,
                    to: [...NewRegrecipients],
                    subject:
                        "New Registration Form Submission on ICDRC Website for an Organisation",
                    html,
                },
            };

            const sendMail = fork(MailFilePath);
            sendMail.send(NewMessage);
            sendMail.on("message", (msg) => {
                if (msg.error) {
                    console.error(msg.error.response);
                } else if (msg.data) {
                    console.log(msg.data.response);
                }
            });
        } catch (error) {
            console.log("12345");
            res.send({
                message: error.message,
                status: 0,
            });
        }
    }
});

// Route to get all organizational complaints with details and timestamp
Organizationalrouter.get("/all", async (req, res) => {
    let { rowsPerPage, currentPage } = req.query;
    const { search } = new URL(req.url, `http://${req.headers.host}`);
    const { filters, Sorts } = filterSort(search);


    currentPage = Number(currentPage) || 1;
    rowsPerPage = Number(rowsPerPage) || 20

    const skip = pagination(currentPage, rowsPerPage);
    const filterQuery = parseFilters(filters)

    console.log(`organizational filterQuery`, filterQuery)

    const complaints = await OrganizationalComplaint.find(filterQuery)
        .skip(skip)
        .limit(rowsPerPage)
        .sort(Sorts)
        .exec();

    const totalItems = await OrganizationalComplaint.countDocuments(filterQuery)
        .sort(Sorts)
        .exec()

    return res.status(200).json({ data: complaints, totalResults: totalItems });

});

module.exports = { Organizationalrouter };
