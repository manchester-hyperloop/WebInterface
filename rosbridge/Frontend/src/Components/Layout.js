import { Container, makeStyles } from '@material-ui/core';
import { useState, useEffect } from 'react';
import AdminSidebar from './AdminSidebar';
import axios from 'axios';

const drawerBigWidth = 300;
const drawerSmallWidth = 50;
const marginWindowWidth = 1200;

const useStyles = makeStyles({
  mainContainer: {
    display: 'flex',
  }
}); 

const Layout = ({children}) => {
  const styles = useStyles();
  const [isScreenMaximized, setIsScreenMaximized] = useState(true);
  const [windowSize, setWindowSize] = useState([window.innerWidth, window.innerHeight]);
  const [userAdmin, setUserAdmin] = useState(true);

  // The function that triggers when the window is resized
  const handleWindowResize = () => {
    setWindowSize([window.innerWidth, window.innerHeight]);
  }

  // Check if the user is the valid
  const checkUserAdmin = async () => {
    const token = localStorage.getItem("authToken");
    if(!token){
        setUserAdmin(false);
        return false;
    }

    const config = {
        header: {
            "Content-type": "application/json",
        }
    }

    try{
        const {data} = await axios.post("/api/authentication/validate", {token}, config);
        
        if(data["success"] && (data["admin"] === true))
          setUserAdmin(true);
        else
          setUserAdmin(false);

    }catch(error){
        console.log(error);
        setUserAdmin(false);
    }
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

  // Check if the user is admin when the page loads
  useEffect(() => {
    checkUserAdmin();
  }, [])

  return (
    
    <div className={styles.mainContainer} >
      {window.location.pathname.split('/')[1] === 'admin' && userAdmin ?
      <div>
        <div>
          <AdminSidebar isScreenMaximized = {isScreenMaximized} drawerBigWidth = {drawerBigWidth} drawerSmallWidth = {drawerSmallWidth}/>
        </div>

        <Container style={{marginLeft: isScreenMaximized ? drawerBigWidth : drawerSmallWidth}}>
          {children}
        </Container>
      </div>
      :

      <div style={{width: '100%'}}>
        {children}
      </div>
    }
    </div>
  );
}

export default Layout;