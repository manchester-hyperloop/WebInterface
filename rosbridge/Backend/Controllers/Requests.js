const User = require('../Models/UserModel');
const Requests = require('../Models/RequestsModel');
const jwt = require('jsonwebtoken');

exports.validateRequest = async (req, res, next) => {
    const {username} = req.body;
    
    if(!username)
        return res.status(400).json({error: "Invalid Request!"});

    requestExists = await Requests.findOne({"username": username});
    if(!requestExists)
        return res.status(400).json({error: "The request does not exist!"});
    
    const token = requestExists.token;
    
    jwt.verify(token, process.env.JWT_SECRET, async function(err, decodedToken){
        if(err)
            return res.status(400).json({error: "Expired Link"});
        
        const {email, password} = decodedToken;
        
        try{
            const user = await User.create({
                "username": username,
                "email": email,
                "password": password,
        });
        
        await Requests.deleteOne({"username": username});
        return getAuthToken(user, res);

    }catch(err)
    { return res.status(400).json({error: err.message})};
    });
}

exports.rejectRequest = async (req, res, next) => {
    const {username} = req.body;

    if(!username)
        return res.status(400).json({error: "Invalid Request!"});
    
    try{
        await Requests.deleteOne({"username": username});
        return res.status(200).json({success: "Request sucessfully rejected!"});
    }catch(error){
        return res.status(400).json({error: error.message});
    }
}

exports.getRegisterRequests = async (req, res, next) => {
    try{
        const requests = await Requests.find({type: "register"});
        
        var registerRequests = []
        
        requests.forEach((request) => {
            registerRequests.push(request['username']);
        });

        return res.status(200).json({requests: registerRequests});
    }catch(error){
        res.status(400).json({error: error.message});
    }
}

const getAuthToken = async (user, res) => {
    const token = await user.getToken();
    return res.status(200).json({token: token});
}