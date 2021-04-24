const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const UserSchema = new mongoose.Schema({
    username: {type: String, unique: true, required: [true, "Please Enter a Username"]},
    email: {type: String, required: [true, "Please Enter an Email"], match: [/^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/, "Please Provide a Valid Email!"]},
    password: {type: String, required: [true, "Please Enter a Password"], minlength: 6, select: false},
    permissions: {
        admin: {type: Boolean, required: true, default: false},
        read: {type: Boolean, required: true, default: false},
        write: {type: Boolean, required: true, default: false},
    }
});

UserSchema.pre("save", async function(next) {
    if(!this.isModified("password"))
        return next();
    const salt = await bcrypt.genSalt(15);
    this.password = await bcrypt.hashSync(this.password, salt);
    return next();
});

UserSchema.methods.passwordMatch = async function(password){
    return await bcrypt.compare(password, this.password);
}

UserSchema.methods.getToken = async function(){
    return jwt.sign({ id: this._id }, process.env.JWT_SECRET, { expiresIn: '1000d' });
}

const User = mongoose.model("user", UserSchema);

module.exports = User;
