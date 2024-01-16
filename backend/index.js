const express = require('express');
const dotenv = require('dotenv')
const cors = require('cors')
const bodyParser = require('body-parser')
const connectDB = require('./utils/connectDB');

// importing routes
const registerAdmin = require('./routes/auth/registerAdmin')
const loginAdmin = require('./routes/auth/loginAdmin')
const createChatData = require('./routes/chatbot/chatBotData')
const contact = require('./routes/contact/contact')
const partner = require('./routes/partner/partner')
const newsletter = require('./routes/newsletter/newsletter')
const blogs = require('./routes/blogs/blogs')
const caseStudy = require('./routes/caseStudy/caseStudy')
const Media = require('./routes/Media/Media')

//  Initializing app
const app = express();

// using middlewares
dotenv.config();
app.use(cors());
app.use(express.json());
app.use(bodyParser.json());

// Default Get Request
app.get('/', async (req, res) => {
    res.send("ICDRC - Webdesys")
})

// Main Routes
// register admin
app.use('/api/registeradmin', registerAdmin)
// login admin
app.use('/api/loginadmin', loginAdmin)
// create chat bot message, get and delete chat data
app.use('/api/createchatdata', createChatData)
// handle contact messages routes
app.use('/api/handlecontact', contact)
// handle partner form 
app.use('/api/handlepartner', partner)
// handle subscribed emails
app.use('/api/handlenewsletter', newsletter)
// handle blogs
app.use('/api/handleblogs', blogs)
// handle Case study
app.use('/api/handlecasestudy', caseStudy)
// handle media
app.use('/api/handlemedia',Media)


// APP LISTENING AND DB
const PORT = process.env.PORT || 5000;
connectDB().then(() => {
    app.listen(PORT, () => {
        console.log("Server running on port:", PORT)
    })
})

