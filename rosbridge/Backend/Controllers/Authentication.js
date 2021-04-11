const User = require('../Models/UserModel');
const Requests = require('../Models/RequestsModel');
const jwt = require('jsonwebtoken');

const getAuthToken = async (user, res) => {
    const token = await user.getToken();
    return res.status(200).json({token: token});
}

exports.login = async (req, res, next) => {
    const { username, password } = req.body;
    
    if(!username || !password)
        return res.status(400).json({error: "Invalid data!"});

    try{
        const userExists = await User.findOne({"username": username}).select("+password");
        
        if(!userExists)
            return res.status(400).json({error: "Wrong username or password!"});

        const userValid = await userExists.passwordMatch(password);
        
        if(!userValid)
            return res.status(404).json({error: "Wrong username/password!"});
        else
            return getAuthToken(userExists, res);
    }catch(err){
        return res.status(500).json({error: err.message});
    }
}

exports.register = async (req, res, next) => {
    const { username, email, password } = req.body;
    
    if(!username || !email || !password)
        return res.status(400).json({error: "Invalid data!"});
    
    try{
        const userExists = await User.findOne({"username": username});
        // Check if there is a register request with this username 
        const requestUsernameExists = await Requests.findOne({"username": username});

        if(userExists || requestUsernameExists)
            return res.status(400).json({error: "The username is already used!"});
        
        let token = jwt.sign({email, password}, process.env.JWT_SECRET, {expiresIn: '20d'});

        Requests.create({
            type: "register",
            username: username,
            token: token
        });

        return res.status(200).json({success: "Register request succesfully sent!"});
        
    }catch(error){
        return res.status(400).json({error: error.message});
    }
}

exports.deleteUser = async (req, res, next) => {
    const { username } = req.body;

    if(!username)
        return res.status(400).json({error: "Invalid Request!"});
    
    try{
        const userExists = await User.findOne({"username": username});
        
        if(!userExists)
            return res.status(400).json({error: "User does not exists!"});
        
        await User.deleteOne({"username": username});
        return res.status(200).json({success: "User succesfully deleted!"});
    }catch(error){
        res.status(400).json({error: error.message});
    }
}

exports.modifyUser = async (req, res, next) => {
    const { username, newPermissions, newUsername, newPassword } = req.body;
    
    if(!username)
        return res.status(400).json({error: "Invalid request!"});
    
    try{
        const userExists = await User.findOne({"username": username}).select("+password");
        if(!userExists)
            return res.status(400).json({error: "User does not exist!"});

        if(newPassword){
            userExists.password = newPassword;
            await userExists.save();
        }
        if(newUsername){
            await userExists.updateOne({"username": newUsername});
        }
        if(newPermissions){
            await userExists.updateOne({"permissions": newPermissions});
        }
        
        res.status(200).json({success: "User succesfully modified"});
    }catch(error){
        res.status(400).json({error: error.message});
    }
}

exports.checkIfUserValid = async (req, res, next) => {
    const {token} = req.body;
    
    if(!token)
        return res.status(400).json({error: "Invalid request!"});
    
    jwt.verify(token, process.env.JWT_SECRET, async function(err, decodedToken){
        if(err){
            return res.status(400).json({error: "Expired Link"});
        }

        const { id } = decodedToken;
        const userExists = await User.findOne({_id: id});
        return res.status(200).json({success: "Valid token!", admin: userExists.permissions["admin"]});
    });
}

exports.getAllUsers = async (req, res, next) => {
    try{
        const users = await User.find();
        
        var usersList = []
        
        users.forEach((request) => {
            usersList.push({
                "username": request['username'],
                "permissions": request['permissions']
            });
        });

        return res.status(200).json({users: usersList});
    }catch(error){
        res.status(400).json({error: error.message});
    }
}