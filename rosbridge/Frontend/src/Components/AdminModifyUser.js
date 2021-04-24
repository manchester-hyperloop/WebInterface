import { Button, Checkbox, FormControl, FormControlLabel, FormGroup, FormLabel, makeStyles, TextField, Typography } from "@material-ui/core";
import DeleteIcon from '@material-ui/icons/DeleteForever';
import SaveIcon from '@material-ui/icons/Save';
import axios from 'axios';
import { useState } from "react";

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
    },
    error: {
        color: 'red'
    }
  }));

const AdminModifyUser = ({users, setUsers, user}) => {
    const styles = useStyles();
    const [newPassword, setNewPassword] = useState("");
    const [newUsername, setNewUsername] = useState(user["username"]);
    const [error, setError] = useState('');

    // Delete the user from the database
    const deleteUserRequest = async () => {
        const config = {
            header: {
                "Content-type": "application/json",
            }
        }

        try{
            const username = user['username'];
            await axios.post("/api/authentication/delete", {username}, config);
            setError('');
        }catch(error){
            console.log(error);
            setError("Failed to delete user");
            throw new Error("Failed to delete user");
        }
    }

    // Modify the user in the database
    const saveUserRequest = async () => {
        const config = {
            header: {
                "Content-type": "application/json",
            }
        }

        try{
            const username = user['username'];
            const newPermissions = user['permissions'];
            await axios.post("/api/authentication/modify", {username, newUsername, newPassword, newPermissions}, config);
            setError('');
        }catch(error){
            console.log(error);
            setError('Failed to modify user');
            throw new Error("Failed to modify user");
        }
    }

    // The event that triggers when the delete button is pressed
    const deleteUser = async () => {
        try{
            await deleteUserRequest();
        }catch(error){
            console.log(error);
        }
    }

    // The event that triggers when the permissions are modified
    const changePermission = (user, permission) => {
        var currentUsers = [...users];
        currentUsers[currentUsers.indexOf(user)]['permissions'][permission] = !currentUsers[currentUsers.indexOf(user)]['permissions'][permission];
        setUsers(currentUsers);
    }

    // The event that triggers when the save button is pressed
    const saveUserChanges = async () => {
        try{
            await saveUserRequest();

        }catch(error){
            console.log(error);
        }
    }

    return (
        <div>
            <Typography className={styles.error}>{ error }</Typography>
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
                    <TextField className={styles.TextInput} 
                        onChange={(e) => setNewUsername(e.target.value)} 
                        label="Username" 
                        defaultValue={user["username"]} 
                        size="small" 
                        />
                    <TextField 
                    className={styles.TextInput} 
                        onChange={(e) => setNewPassword(e.target.value)} 
                        type="password" 
                        label="New Password" 
                        defaultValue="" 
                        size="small" 
                        />
                </div>

                <Button 
                    className={styles.button}
                    variant="contained" 
                    color="primary"
                    startIcon={<SaveIcon/>}
                    type="submit"
                    onClick={saveUserChanges}
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
