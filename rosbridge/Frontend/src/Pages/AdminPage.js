import { Container, makeStyles, Paper, Typography } from "@material-ui/core";
import { useEffect, useState } from "react";
import { useHistory } from "react-router";
import AdminUserRequests from "../Components/AdminUserRequests";
import AdminUserManager from "../Components/AdminUserManager";
import HyperloopTitleImage from '../Images/HyperloopTitle.png';
import AdminSidebar from '../Components/AdminSidebar';

const drawerBigWidth = 300;
const drawerSmallWidth = 50;
const marginWindowWidth = 1200;

const useStyles = makeStyles((theme) =>
    {
        return{
        paper: {
            textAlign: "left",
        },
        mainContainer: {
            display: 'flex',
        }
    }
});

const AdminPage = () => {
    const history = useHistory();
    const styles = useStyles();

    const [currentPage, setCurrentPage] = useState("");
    const [isScreenMaximized, setIsScreenMaximized] = useState(true);
    const [windowSize, setWindowSize] = useState([window.innerWidth, window.innerHeight]);
    
    // The function that triggers when the window is resized
    const handleWindowResize = () => {
        setWindowSize([window.innerWidth, window.innerHeight]);
    }

    // Load resize event when the page is loaded
    useEffect(() => {
        window.addEventListener("resize", handleWindowResize);
        handleWindowResize();
        return () => window.removeEventListener("resize", handleWindowResize);
    },[]);

    // When the window is resized, check if it is less than the margin value
    useEffect(() => {
        if(windowSize[0] > marginWindowWidth)
        setIsScreenMaximized(true);
        else
        setIsScreenMaximized(false);
    },[windowSize]);
    
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
        <div className={styles.mainContainer} >
            <div>
                <div>
                <AdminSidebar isScreenMaximized = {isScreenMaximized} drawerBigWidth = {drawerBigWidth} drawerSmallWidth = {drawerSmallWidth}/>
                </div>
            </div>

            <div style={{width: '100%', marginLeft: isScreenMaximized ? drawerBigWidth : drawerSmallWidth}}>
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
            </div>
        </div>
    );
}

export default AdminPage;