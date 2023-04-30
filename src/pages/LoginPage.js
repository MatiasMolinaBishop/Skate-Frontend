import { useState, useContext } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from '../context/auth.context';
import '../pages/CSS/LoginPage.css'
import { motion } from 'framer-motion'

function LoginPage(props) {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [errorMessage, setErrorMessage] = useState(undefined);

    const navigate = useNavigate();

    const { storeToken, authenticateUser } = useContext(AuthContext);

    const handleEmail = (e) => setEmail(e.target.value);
    const handlePassword = (e) => setPassword(e.target.value);


    const handleLoginSubmit = async (e) => {

        e.preventDefault()
        const requestBody = { email, password }

        try {
            const response = await axios.post('https://we-love-boards.herokuapp.com/auth/login', requestBody)
            console.log('JWT token', response.data.authToken);
            storeToken(response.data.authToken);
            // Verify the token by sending a request 
            // to the server's JWT validation endpoint.
            authenticateUser();
            navigate('/profile')

        } catch (err) {
            //console.log(err)
            //setErrorMessage(err)
            const errorDescription = err.response.data.message;
            setErrorMessage(errorDescription);

        }
    };

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="session"
        >

            <div>
                <img className="left" src='https://images.unsplash.com/photo-1567410167229-7b4a4bae33d8?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NDd8fHNrYXRlfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=800&q=60' alt='login img' />
            </div>
            <div>
                <h1 className="h1-auth">We love <span className="span-auth">BOARDS</span></h1>
                <p className="p-auth">Welcome back! Log in to your account to view today's events and shred:</p>
                <form className="form-auth" onSubmit={handleLoginSubmit}>
                    <div className="floating-label">
                        <label className="label-auth">Email:</label>
                        <input
                            className="input-auth"
                            type="email"
                            name="email"
                            value={email}
                            onChange={handleEmail}
                        />
                    </div>
                    <div className="floating-label">

                        <label className="label-auth">Password:</label>
                        <input
                            className="input-auth"
                            type="password"
                            name="password"
                            value={password}
                            onChange={handlePassword}
                        />
                    </div>

                    <button className='button-auth' type="submit">Login</button>
                </form>

                {errorMessage && <p className="error-message">{errorMessage}</p>}

                <p className="p-auth">Don't have an account yet?</p>
                <Link className='link-forms' to={"/signup"}> Sign Up</Link>
            </div>
        </motion.div>
    )
}

export default LoginPage;
