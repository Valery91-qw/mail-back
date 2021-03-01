const express = require( "express" );
const app = express();
const cors = require('cors')
const bodyParser = require('body-parser')
const nodemailer = require("nodemailer");// import nodemailer


let mail = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: "vakriv91@gmail.com", // generated ethereal user
        pass: "Glavryba139", // generated ethereal password
    },
});

app.use(cors())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

// define a route handler for the default home page
app.get( "/", ( req, res ) => {
    res.send( "Hello world!" );
} );

app.post( "/sendMessage", async function( req, res ) {

    let {name, email, message} = req.body
    let info = await mail.sendMail({
        from: 'my profile page',
        to: 'vakriv91@gmail.com',
        subject: 'Sending Email via Node.js',
        html: `<div>name : ${name}</div>
<div>email: ${email}</div>
<div>message: ${message}</div>`
    });

    res.send(req.body);
});
let port = process.env.PORT || 3010
// start the Express server
app.listen( port, () => {
    console.log( `server started at http://localhost:${ port }` );
} );
