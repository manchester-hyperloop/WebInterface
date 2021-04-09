import { Accordion, AccordionDetails, AccordionSummary, makeStyles, Typography } from "@material-ui/core";
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { useEffect, useState } from "react";
import AdminModifyUser from './AdminModifyUser';

const useStyles = makeStyles((theme) => ({
    heading: {
      fontSize: theme.typography.pxToRem(15),
      fontWeight: theme.typography.fontWeightRegular,
    },
  }));

const AdminUserManager = () => {
    const styles = useStyles();
    const [users, setUsers] = useState([]);

    // Fetch the users here
    useEffect(() => {
        setUsers([{
            'username': "User 1",
            'permissions': {'admin': false, 'read': true, 'write': false}
        },{
            'username': "User 2",
            'permissions': {'admin': true, 'read': true, 'write': false}
        },{
            'username': "User 3",
            'permissions': {'admin': false, 'read': true, 'write': true}
        },{
            'username': "User 4",
            'permissions': {'admin': true, 'read': true, 'write': true}
        },
    ])
    }, []);

    return (
        <div>
             {
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
            }
        </div>
    )
}

export default AdminUserManager;