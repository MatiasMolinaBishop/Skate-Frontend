// src/pages/SignupPage.js

import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

function SignupPage(props) {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [name, setName] = useState("");
    const [errorMessage, setErrorMessage] = useState(undefined);

    const navigate = useNavigate();

    const handleEmail = (e) => setEmail(e.target.value);
    const handlePassword = (e) => setPassword(e.target.value);
    const handleName = (e) => setName(e.target.value);

    // https://images.unsplash.com/photo-1454391304352-2bf4678b1a7a?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8OXx8c3VyZnxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=800&q=60


    const handleSignupSubmit = async (e) => {
        e.preventDefault()

        try {
            const requestBody = { email, password, name }
            await axios.post('http://localhost:5005/auth/signup', requestBody)
            navigate('/login');
        } catch (err) {
            console.log(err)
            setErrorMessage(err)
        }
    };


    return (
        <div className="session">

            <div>
                <img className="left" src='https://images.unsplash.com/photo-1602523034374-7f96778436ce?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTR8fHBhbG0lMjB0cmVlc3xlbnwwfHwwfHw%3D&auto=format&fit=crop&w=800&q=60' alt='login img' />
            </div>
            <div>
                <h1 className="h1-auth">Join Our Community</h1>
                <p className="p-auth">Meet people through event meetups and share your passion for boards:</p>
                <form className="form-auth" onSubmit={handleSignupSubmit}>
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
                    <div className="floating-label">

                        <label className="label-auth">Name:</label>
                        <input
                            className="input-auth"
                            type="text"
                            name="name"
                            value={name}
                            onChange={handleName}
                        />
                    </div>

                    <button className='button-auth' type="submit">Sign Up</button>
                </form>

                {errorMessage && <p className="error-message">{errorMessage}</p>}

                <p className="p-auth">Already have account?</p>
                <Link className='link-forms' to={"/login"}> Login</Link>
            </div>
        </div>
    )
}

export default SignupPage;
