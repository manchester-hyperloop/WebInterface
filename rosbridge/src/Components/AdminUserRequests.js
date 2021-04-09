import { Accordion, AccordionDetails, AccordionSummary, Button, makeStyles, Typography } from "@material-ui/core";
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import RejectIcon from '@material-ui/icons/Clear';
import CheckIcon from '@material-ui/icons/Check';
import { useEffect, useState } from "react";

const useStyles = makeStyles((theme) => ({
    heading: {
      fontSize: theme.typography.pxToRem(15),
      fontWeight: theme.typography.fontWeightRegular,
    },
    button: {
        margin: theme.spacing(1),
    }
  }));

const AdminUserRequests = () => {
    const styles = useStyles();
    const [requests, setRequests] = useState([])

    // Fetch the requests here
    useEffect(() => {
        setRequests(["Request 1", "Request 2", "Request 3", "Request 4",]);
    }, []);
    
    // The event that triggers when a request is accepted
    const acceptRequestEvent = (request) => {
        console.log("Request Accepted: " + request);
    }

    // The event that triggers when a request is rejected
    const rejectRequestEvent = (request) => {
        console.log("Request Rejected: " + request);
    }

    return (
        <div>
            {
                requests.map((request, index) => (
                    <Accordion key={request}>
                        <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        >
                        <Typography className={styles.heading}>{index+1}. {request}</Typography>
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
            }
        </div>
    )
}

export default AdminUserRequests;