import { Paper, Button, TextField, Typography, Container, makeStyles } from '@material-ui/core';
import { useEffect, useState } from 'react';
import axios from 'axios';

const useStyles = makeStyles((theme) => ({
    form: {
        width: '100%',
    },
    submit: {
        margin: theme.spacing(5, 0, 2),
    },
    paperContainer: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        paddingLeft: theme.spacing(1),
        paddingRight: theme.spacing(1),
    },
    TextField: {
        marginTop: theme.spacing(2)
    },
    mainContainer: {
        backgroundImage: "linear-gradient(to right bottom, #8700b7, #8211b0, #7c1ba9, #7721a2, #72269b, #6f2593, #6c238b, #682283, #651b79, #61146f, #5d0d65, #59055c)",
        width: '100%',
        height: '100vh'
    },
    error: {
        color: 'red'
    },
    success: {
        color: 'green'
    }
}));

const RegisterPage = ({history}) => {
    const styles = useStyles();
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [email, setEmail] = useState("");
    const [verifyPassword, setVerifyPassword] = useState("");
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");

    useEffect(() => {
        if(localStorage.getItem("authToken"))
           history.push("/");
    }, []);

    const Register = async (e) => {
        e.preventDefault();
        
        if(password !== verifyPassword){
            setPassword("");
            setVerifyPassword("");
            setTimeout(() => {
                setError("");
            }, 5000);
            return setError("Passwords don't match");
        }

        const config = {
            header: {
                "Content-type": "application/json"
            }
        }

        try{
            await axios.post("api/authentication/register", {username,email,password},config);
            
            setSuccess("Registration request succesfully sent!");
            setUsername('');
            setEmail('');
            setPassword('');
            setVerifyPassword('');
        }catch(error){
            setError(error.response.data.error);
            setTimeout(() => {
                setError("");
            }, 5000);
        }
    }

    return (
        <div className={styles.mainContainer}>
        <Container component="main" maxWidth="xs">
        <br/>
        <br/>
        <Paper className={styles.paperContainer}>
            <br/>
            <Typography component="h2" variant="h4">
                Register
            </Typography>
            <Typography className={styles.error} component="p" variant="p">
                {error}
            </Typography>
            <Typography className={styles.success} component="p" variant="p">
                {success}
            </Typography>

            <form className={styles.form} onSubmit={Register}>
            <TextField
                className={styles.TextField}
                variant="outlined"
                required
                fullWidth
                label="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
            />
            <TextField
                className={styles.TextField}
                variant="outlined"
                required
                fullWidth
                label="E-mail"
                value={email}
                type="email"
                onChange={(e) => setEmail(e.target.value)}
            />
            <TextField
                className={styles.TextField}
                variant="outlined"
                required
                fullWidth
                label="Password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
            />
            <TextField
                className={styles.TextField}
                variant="outlined"
                required
                fullWidth
                label="Verify Password"
                type="password"
                value={verifyPassword}
                onChange={(e) => setVerifyPassword(e.target.value)}
            />
            <Button
                fullWidth
                variant="contained"
                color="primary"
                className={styles.submit}
                type="submit"
            >
                Register
            </Button>
            
            </form>
        </Paper>
        </Container>
        </div>
    );
}

export default RegisterPage;