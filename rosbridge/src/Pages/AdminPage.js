import { Container, makeStyles, Paper, Typography } from "@material-ui/core";
import { useEffect, useState } from "react";
import { useHistory } from "react-router";
import AdminUserRequests from "../Components/AdminUserRequests";
import AdminUserManager from "../Components/AdminUserManager";
import HyperloopTitleImage from '../Images/HyperloopTitle.png';

const useStyles = makeStyles((theme) =>
    {
        return{
        paper: {
            textAlign: "left",
        }
    }
});

const AdminPage = () => {
    const history = useHistory();
    const styles = useStyles();

    const [currentPage, setCurrentPage] = useState("");
    
    useEffect(() => {
        if(window.location.pathname !== '/admin/userrequests' && 
            window.location.pathname !== '/admin/usermanager')
        {
            history.push('/admin/userrequests');
        }
            setCurrentPage(window.location.pathname.split('/').pop());  
        
            return history.listen(() => { 
             setCurrentPage(window.location.pathname.split('/').pop());
            }) 
    },[history])

    return (
        <Container>
            <div style={{textAlign: "center"}}>
                <img alt="Hyperloop Title" src={HyperloopTitleImage}/>
            </div>

            <Typography variant="h4" gutterBottom>
                { currentPage === "userrequests" ? "User Requests" : "User Manager" }
            </Typography>

            <br/>

            <div style={{textAlign: "center"}}>
                <Paper elevation={3} className={styles.paper}>
                    {
                        currentPage === "userrequests" ?
                            <AdminUserRequests/>
                            :
                            <AdminUserManager/>
                    }
                </Paper>
            </div>
            <br/>
        </Container>
    );
}

export default AdminPage;