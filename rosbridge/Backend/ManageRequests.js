const axios = require('axios');
const dotenv = require('dotenv').config();

const showRequests = async () => {
    try{
        const config = {
            header: {
                "Content-type": "application/json",
            }
        }
        
        const {data} = await axios.post(`${process.env.URL}/api/requests/getregisterrequests`, config);
        const requests = data.requests;
        
        console.log("\nREGISTER REQUESTS\n");
        if (requests.length == 0)
            return console.log("There are no requests!");

        requests.forEach((request, index) => {
            console.log(`${index+1}. Register Request: ${request}`);
        });
    
    }catch(err){
        console.log(err.message);
    }
}

const acceptRequest = async () => {
    try{

        if(!args[1])
            return console.log("Invalid command!\n");
        const username = args[1];

        const config = {
            header: {
                "Content-type": "application/json",
            }
        }

        await axios.post(`${process.env.URL}/api/requests/validaterequest`, {username}, config);
        console.log("User accepted successfully!");
    }catch(err){
        console.log(err.message);
    }
}

const rejectRequest = async () => {
    try{

        if(!args[1])
            return console.log("Invalid command!\n");
        const username = args[1];

        const config = {
            header: {
                "Content-type": "application/json",
            }
        }

        await axios.post(`${process.env.URL}/api/requests/rejectrequest`, {username}, config);
        console.log("User rejected successfully!");
    }catch(err){
        console.log(err.message);
    }
}

const invalidCommand = () => {
    console.log("Invalid Command!");
}

const handleOperation = async () => {
    switch(operation){
        case 'show':
            await showRequests();
            break;
        case 'accept':
            await acceptRequest();
            break;
        case 'reject':
            await rejectRequest();
            break;
        default:
            invalidCommand();
            break;
    }
}

const args = process.argv.splice(2);
const operation = args[0];

handleOperation()
    .then(() => process.exit(0))
    .catch(() => process.exit(1));