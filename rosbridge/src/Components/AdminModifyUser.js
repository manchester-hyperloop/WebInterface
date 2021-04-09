import { Button, Checkbox, FormControl, FormControlLabel, FormGroup, FormLabel, makeStyles, TextField } from "@material-ui/core";
import DeleteIcon from '@material-ui/icons/DeleteForever';
import SaveIcon from '@material-ui/icons/Save';

const useStyles = makeStyles((theme) => ({
    heading: {
      fontSize: theme.typography.pxToRem(15),
      fontWeight: theme.typography.fontWeightRegular,
    },
    formControl: {
        margin: theme.spacing(3),
      },
    formLabel: {
        '&:active': {
            color: "#6e2593",
        }
    },
    TextInput: {
        margin: theme.spacing(1),
    },
    button: {
        margin: theme.spacing(1),
    }
  }));

const AdminModifyUser = ({users, setUsers, user}) => {
    const styles = useStyles();

    // Change user's permissions
    const changePermission = (user, permission) => {
        var currentUsers = [...users];
        currentUsers[currentUsers.indexOf(user)]['permissions'][permission] = !currentUsers[currentUsers.indexOf(user)]['permissions'][permission];
        setUsers(currentUsers);
    }

    // Delete the user
    const deleteUser = () => {
        console.log("Delete user");
    }

    // Save the user changes
    const saveUserChanges = () => {
        console.log("Save User Changes");
    }

    return (
        <div>
            <FormControl component="fieldset" className={styles.formControl}>
                <FormLabel className={styles.formLabel} component="legend">Permissions</FormLabel>
                <FormGroup aria-label="position" row>
                    <FormControlLabel
                        control={<Checkbox color="primary" checked={user['permissions']['admin']} onChange={() => changePermission(user, 'admin')} name="admin" />}
                        label="Admin"
                    />
                    <FormControlLabel
                        control={<Checkbox color="primary" checked={user['permissions']['read']} onChange={() => changePermission(user, 'read')} name="read" />}
                        label="Read"
                    />
                    <FormControlLabel
                        control={<Checkbox color="primary" checked={user['permissions']['write']} onChange={() => changePermission(user, 'write')} name="write" />}
                        label="Write"
                    />
                </FormGroup>

                <div>
                    <TextField className={styles.TextInput} label="Username" defaultValue={user["username"]} size="small" />
                    <TextField className={styles.TextInput} label="New Password" defaultValue="" size="small" />
                </div>

                <Button 
                    className={styles.button}
                    variant="contained" 
                    color="primary"
                    startIcon={<SaveIcon/>}
                    type="submit"
                    onClick={() => saveUserChanges()}
                    >Save</Button>
                    
                <Button 
                    className={styles.button}
                    variant="contained" 
                    color="secondary"
                    startIcon={<DeleteIcon/>}
                    onClick={() => deleteUser()}
                    >Delete User</Button>
            </FormControl>
        </div>  
    );
}

export default AdminModifyUser;
