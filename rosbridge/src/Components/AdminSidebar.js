import { Drawer, List, ListItem, ListItemIcon, ListItemText, makeStyles } from "@material-ui/core"
import UserManagerIcon from '@material-ui/icons/People';
import RequestsIcon from '@material-ui/icons/Call';
import { useHistory } from "react-router";

const AdminSidebar = ({isScreenMaximized, drawerBigWidth, drawerSmallWidth}) => {
    const history = useHistory();

    const menuItems = [
        { 
          text: 'User Requests', 
          icon: <RequestsIcon style={{color: "#FEDA01"}} />, 
          path: "/admin/userrequests"
        },
        { 
          text: 'User Manager', 
          icon: <UserManagerIcon style={{color: "#FEDA01"}} />, 
          path: "/admin/usermanager"
        },
      ];

    const useStyles = makeStyles((theme) => {
        return {
            paperBigScreen: {
                width: drawerBigWidth,
                backgroundImage: "linear-gradient(to right bottom, #8700b7, #8211b0, #7c1ba9, #7721a2, #72269b, #6f2593, #6c238b, #682283, #651b79, #61146f, #5d0d65, #59055c)",
            },
            paperSmallScreen: {
                width: drawerSmallWidth,
                backgroundImage: "linear-gradient(to right bottom, #8700b7, #8211b0, #7c1ba9, #7721a2, #72269b, #6f2593, #6c238b, #682283, #651b79, #61146f, #5d0d65, #59055c)",
                overflowX: 'hidden'
            },
            list: {
                color: '#FEDA01'
            },
            sidebarElement: {
                marginTop: theme.spacing(20),
            }
        }
    });

    const styles = useStyles();
    
    return (
        <div>
            <Drawer
                variant = "permanent"
                anchor = "left"
                classes = {{ 
                    paper: isScreenMaximized ? styles.paperBigScreen : styles.paperSmallScreen 
                }}
                >
                <div>
                <List className={styles.list}>
                    {menuItems.map((item) => (
                        <ListItem 
                            onClick={() => history.push(item.path)}
                            button 
                            key={item.text} 
                            className={ styles.sidebarElement }
                            >
                        <ListItemIcon>{item.icon}</ListItemIcon>
                        {   isScreenMaximized &&
                            <ListItemText primary={item.text} />
                        }
                        </ListItem>
                    ))}
                </List>
                </div>
            </Drawer>
            
        </div>
    )
}

export default AdminSidebar;