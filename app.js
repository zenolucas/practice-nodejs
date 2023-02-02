// import dependencies
const express = require('express');
const cookieParser = require("cookie-parser");
const sessions = require('express-session');

// initialize the express app
const app = express();
const PORT = 4000;

// SET UP SESSION
const oneDay = 1000 * 60 * 60 * 24;
app.use(sessions({
    secret: "thisismysecrctekeyfhrgfgrfrty84fwir767",
    saveUninitialized:true,
    cookie: { maxAge: oneDay },
    resave: false
}));

// PARSE THE HTML FORM
// parsing the incoming data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//serving public file
app.use(express.static(__dirname));


// SET THE COOKIE-PARSER
// cookie parser middleware
app.use(cookieParser());


// SET THE AUTHENTICATION CREDENTIALS
//username and password
const myusername = 'user1'
const mypassword = 'mypassword'

// a variable to save a session
var session;


// ADD THE ENDPOINTS
// 1. http://localhost:4000/
app.get('/',(req,res) => {
    session=req.session;
    if(session.userid){
        res.send("Welcome User <a href=\'/logout'>click to logout</a>");
    }else
        res.sendFile('views/index.html',{root:__dirname})
});

// 2. http://localhost:4000/user
app.post('/user',(req,res) => {
    if(req.body.username == myusername && req.body.password == mypassword){
        session=req.session;
        session.userid=req.body.username;
        console.log(req.session)
        res.send(`Hey there, welcome <a href=\'/logout'>click to logout</a>`);
    }
    else{
        res.send('Invalid username or password');
    }
})

// http://localhost:4000/logout

app.get('/logout',(req,res) => {
    req.session.destroy();
    res.redirect('/');
});

// LISTEN TO THE PORT OF THE SERVER
app.listen(PORT, () => console.log(`Server Running at port ${PORT}`));