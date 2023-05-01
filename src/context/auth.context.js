import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const AuthContext = React.createContext();

function AuthProviderWrapper(props) {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [user, setUser] = useState(null);

    const navigate = useNavigate();


    const storeToken = (token) => {       //  <==  ADD
        localStorage.setItem('authToken', token);
    }

    const authenticateUser = () => {           //  <==  ADD  
        // Get the stored token from the localStorage
        const storedToken = localStorage.getItem('authToken');

        // If the token exists in the localStorage
        if (storedToken) {
            // We must send the JWT token in the request's "Authorization" Headers
            axios.get(
                `https://we-love-boards.herokuapp.com/auth/verify`,
                { headers: { Authorization: `Bearer ${storedToken}` } }
            )
                .then((response) => {
                    // If the server verifies that JWT token is valid  
                    const user = response.data;
                    // Update state variables        
                    setIsLoggedIn(true);
                    setIsLoading(false);
                    setUser(user);
                    navigate('/')
                })
                .catch((error) => {
                    // If the server sends an error response (invalid token) 
                    // Update state variables         
                    setIsLoggedIn(false);
                    setIsLoading(false);
                    setUser(null);
                    navigate('/login')
                });

        } else {
            // If the token is not available (or is removed)
            setIsLoggedIn(false);
            setIsLoading(false);
            setUser(null);
            navigate('/login')
        }
    }

    const removeToken = () => {
        // Upon logout, remove the token from the localStorage
        localStorage.removeItem("authToken");
    }


    const logOutUser = () => {
        // To log out the user, remove the token
        removeToken();
        // and update the state variables    
        authenticateUser();
        navigate('/login')
    }

    useEffect(() => {
        authenticateUser();
    }, []);


    /* 
      Functions for handling the authentication status (isLoggedIn, isLoading, user)
      will be added here later in the next step
    */

    return (
        <AuthContext.Provider value={{ isLoggedIn, isLoading, user, storeToken, authenticateUser, logOutUser }}>
            {props.children}
        </AuthContext.Provider>
    )
}

export { AuthProviderWrapper, AuthContext };
