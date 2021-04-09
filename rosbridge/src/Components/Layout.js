import { Container, makeStyles } from '@material-ui/core';
import { useState, useEffect } from 'react';
import AdminSidebar from './AdminSidebar';

const drawerBigWidth = 300;
const drawerSmallWidth = 50;
const marginWindowWidth = 1000;

const useStyles = makeStyles({
  mainContainer: {
    display: 'flex',
  }
}); 

const Layout = ({children}) => {
  const styles = useStyles();
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

  return (
    <Container className={styles.mainContainer}>
      {window.location.pathname.split('/')[1] === 'admin' &&
        <div>
          <AdminSidebar isScreenMaximized = {isScreenMaximized} drawerBigWidth = {drawerBigWidth} drawerSmallWidth = {drawerSmallWidth}/>
        </div>
      }

      <Container style={{marginLeft: isScreenMaximized ? drawerBigWidth : drawerSmallWidth}}>
        {children}
      </Container>
    </Container>
  );
}

export default Layout;