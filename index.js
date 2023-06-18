require('dotenv').config();
require('./config/passport-config');
const express = require('express');
const app = express();
const passport = require('passport');
const session = require('express-session');
const formidableMiddleware = require('express-formidable');
const path = require("path");
const indexRouter = require('./routes/index.js');
const LocalStrategy = require("passport-local");
const db = require("./db/dbUsers");

const verify = async (login, password, done) => {
    console.log('verify')
    const respDb = db.findOne('login', login);
    if(!respDb.status){
        return done(null, false)
    }
    const checkPassword = await respDb.element.checkPassword(password);
    if(!checkPassword.status){
        return done(null, false)
    }
    return done(null, respDb.element)
};

const option = {
    usernameField: "login",
    passwordField: "password"
};

passport.use('local', new LocalStrategy(option, verify));
passport.serializeUser((user, cb)=>{
    process.nextTick(()=>{
        return cb(null, {
            id: user.id,
            login: user.login
        })
    })

});
passport.deserializeUser((id, cb)=>{
    process.nextTick(()=>{
        return cb(null, db.findOne('id', id))
    })

});
app.set('views', path.join(__dirname, './views'));
app.set("view engine", "ejs");
app.use(express.urlencoded());
app.use(formidableMiddleware());
app.use(
    session({
        secret: process.env.SECRET_KEY,
    })
)

app.use(passport.initialize());
app.use(passport.session());

app.use('/api', indexRouter);
app.use(express.static('public'))
const PORT = process.env.PORT||5050;

app.listen(PORT);

console.log(`Server started on port: ${PORT}`);
