const mongoose = require('mongoose');
const dotenv = require('dotenv').config();
const User = require('./Models/UserModel');

mongoose.connect(process.env.DB_CONNECT, 
    {useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true},
    (err) => {
        if(err) return console.error(err);
    });

const createUser = async (username, email, password) => {
    try{
        await User.create({
            "username": username,
            "email": email,
            "password": password,
            "permissions": {
                admin: true,
                read: false,
                write: false 
            }
    });}catch(err){ 
        console.log(err.message);
    };
}

var args = process.argv.slice(2);
const email = args[0]
const username = args[1];
const password = args[2];

createUser(username, email, password)
    .then(() => process.exit(0))
    .catch(() => process.exit(1));