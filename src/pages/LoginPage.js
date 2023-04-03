import { useState, useContext } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from '../context/auth.context';

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
            const response = await axios.post('http://localhost:5005/auth/login', requestBody)
            console.log('JWT token', response.data.authToken);
            storeToken(response.data.authToken);
            // Verify the token by sending a request 
            // to the server's JWT validation endpoint.
            authenticateUser();
            navigate('/locations')

        } catch (err) {
            console.log(err)
            setErrorMessage(err)
        }
    };

    return (
        <div className="LoginPage">
            <h1>Login</h1>

            <form onSubmit={handleLoginSubmit}>
                <label>Email:</label>
                <input
                    type="email"
                    name="email"
                    value={email}
                    onChange={handleEmail}
                />

                <label>Password:</label>
                <input
                    type="password"
                    name="password"
                    value={password}
                    onChange={handlePassword}
                />

                <button type="submit">Login</button>
            </form>
            {errorMessage && <p className="error-message">{errorMessage}</p>}

            <p>Don't have an account yet?</p>
            <Link to={"/signup"}> Sign Up</Link>
        </div>
    )
}

export default LoginPage;
