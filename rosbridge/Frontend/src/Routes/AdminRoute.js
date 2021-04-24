import { useEffect, useState } from 'react';
import {Redirect, Route} from 'react-router-dom';
import axios from 'axios';

const PrivateRoute = ({component: Component, ...rest}) =>{
    const [validUser, setValidUser] = useState(true);

    // Check if the user is the valid
    const checkUser = async () => {
        const token = localStorage.getItem("authToken");
        if(!token){
            setValidUser(false);
            return false;
        }

        const config = {
            header: {
                "Content-type": "application/json",
            }
        }

        try{
            const {data} = await axios.post("/api/authentication/validate", {token}, config);
            
            if(data["success"] && (data["admin"] == true))
                setValidUser(true);
            else
                setValidUser(false);

        }catch(error){
            console.log(error);
            setValidUser(false);
        }
    }

    const check = async () => {
        await checkUser();
    }

    // Check if the user is valid when the page is loaded
    useEffect(() => {
        check();
    }, []);

    return (
        <Route 
            {...rest}
            render = {(props) => 
                (localStorage.getItem("authToken") && validUser) ? (
                    <Component{...props} />
                ) : (
                    <Redirect to="/"/>
                )
            }
        />
    );
};

export default PrivateRoute;
