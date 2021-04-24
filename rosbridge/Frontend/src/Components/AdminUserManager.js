import { Accordion, AccordionDetails, AccordionSummary, makeStyles, Typography } from "@material-ui/core";
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { useEffect, useState } from "react";
import AdminModifyUser from './AdminModifyUser';
import axios from 'axios';

const useStyles = makeStyles((theme) => ({
    heading: {
      fontSize: theme.typography.pxToRem(15),
      fontWeight: theme.typography.fontWeightRegular,
    },
  }));

const AdminUserManager = () => {
    const styles = useStyles();
    const [users, setUsers] = useState([]);

    // Get all users from the database
    const fetchUsers = async () => {
        const config = {
            header: {
                "Content-type": "application/json",
            }
        }

        try{
            const {data} = await axios.post("/api/authentication/getusers",config);
            setUsers(data.users);
        }catch(error){
            console.log(error);
        }
    }

    // Fetch the users here
    useEffect(() => {
        fetchUsers();
    }, []);

    return (
        <div>
             {
                users.length > 0 ?
                users.map((user, index) => (
                    <Accordion key={index}>
                        <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        >
                        <Typography className={styles.heading}>{index+1}. {user['username']}</Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                            <AdminModifyUser user={user} setUsers={setUsers} users={users}/>
                        </AccordionDetails>
                    </Accordion>
                ))
                :
                <Typography className={styles.noRequestsText} variant="h4" gutterBottom>
                    There are no users
                </Typography>
            }
        </div>
    )
}

export default AdminUserManager;