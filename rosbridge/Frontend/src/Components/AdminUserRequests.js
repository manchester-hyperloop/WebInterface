import { Accordion, AccordionDetails, AccordionSummary, Button, makeStyles, Typography } from "@material-ui/core";
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import RejectIcon from '@material-ui/icons/Clear';
import CheckIcon from '@material-ui/icons/Check';
import { useEffect, useState } from "react";
import axios from 'axios';

const useStyles = makeStyles((theme) => ({
    heading: {
      fontSize: theme.typography.pxToRem(15),
      fontWeight: theme.typography.fontWeightRegular,
    },
    button: {
        margin: theme.spacing(1),
    },
    noRequestsText: {
        margin: theme.spacing(1)
    }
  }));

const AdminUserRequests = () => {
    const styles = useStyles();
    const [requests, setRequests] = useState([])

    // Get all the requests from the database
    const fetchRequests = async () => {
        const config = {
            header: {
                "Content-type": "application/json",
            }
        }

        try{
            const {data} = await axios.post("/api/requests/getregisterrequests",config);
            setRequests(data.requests);
        }catch(error){
            console.log(error);
        }
    }

    // Accepts the user request
    const acceptUserRequest = async (username) => {
        const config = {
            header: {
                "Content-type": "application/json",
            }
        }

        try{
            await axios.post("/api/requests/validaterequest", {username}, config);
        }catch(error){
            console.log(error);
            throw new Error("Failed to accept user request!");
        }
    }

    // Rejects the user request
    const rejectUserRequest = async (username) => {
        const config = {
            header: {
                "Content-type": "application/json",
            }
        }

        try{
            await axios.post("/api/requests/rejectrequest", {username}, config);
        }catch(error){
            console.log(error);
            throw new Error("Failed to reject user request!");
        }
    }

    // Fetch the requests here
    useEffect(() => {
        fetchRequests();
    }, []);
    
    // The event that triggers when a request is accepted
    const acceptRequestEvent = async (username) => {
        try{
            await acceptUserRequest(username);

            var auxiliaryRequestsList = [...requests];

            var index = auxiliaryRequestsList.indexOf(username);
            if (index !== -1) {
                auxiliaryRequestsList.splice(index, 1);
            }
            setRequests(auxiliaryRequestsList);
        }catch(error){
            console.log(error);
        }
    }

    // The event that triggers when a request is rejected
    const rejectRequestEvent = async (username) => {
        try{
            await rejectUserRequest(username);

            var auxiliaryRequestsList = [...requests];

            var index = auxiliaryRequestsList.indexOf(username);
            if (index !== -1) {
                auxiliaryRequestsList.splice(index, 1);
            }
            setRequests(auxiliaryRequestsList);
        }catch(error){
            console.log(error);
        }
    }

    return (
        <div>
            {   requests.length > 0 ?
                requests.map((request, index) => (
                    <Accordion key={request}>
                        <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        >
                        <Typography className={styles.heading}>{index+1}. User {request} made a register request!</Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                            <Button
                                className={styles.button}
                                style={{backgroundColor: '#32CD32', color: 'white'}}
                                variant="contained"
                                startIcon={<CheckIcon/>}
                                onClick={() => acceptRequestEvent(request)}
                                >Accept</Button>
                            <Button 
                                className={styles.button}
                                variant="contained" 
                                color="secondary"
                                startIcon={<RejectIcon/>}
                                onClick={() => rejectRequestEvent(request)}
                                >Reject</Button>
                        </AccordionDetails>
                    </Accordion>
                ))
                :
                <Typography className={styles.noRequestsText} variant="h4" gutterBottom>
                    There are no user requests
                </Typography>
            }
        </div>
    )
}

export default AdminUserRequests;