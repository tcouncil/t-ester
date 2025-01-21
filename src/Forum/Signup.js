import React, { useState } from 'react';
//import { useHistory } from "react-router-dom";
import axios from 'axios';
import { api } from "./config.js"

export default function Signup({ loggedIn = false, setLoggedIn, setUser }) {
    //const history = useHistory();

    const [inviteCode, setInviteCode] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [passwordConfirmation, setPasswordConfirmation] = useState('');
    const [email, setEmail] = useState('');

    const [errorMessage, setErrorMessage] = useState('');

    const handleInviteCode= (event) => setInviteCode(event.target.value);
    const handleUsernameChange = (event) => setUsername(event.target.value);
    const handlePasswordChange = (event) => setPassword(event.target.value);
    const handlePasswordConfirmation = (event) => setPasswordConfirmation(event.target.value);
    const handleEmailChange = (event) => setEmail(event.target.value);

    const handleErrorMessage = (error) => setErrorMessage(error);

    const handleSubmit = (event) => {
        event.preventDefault();
        setErrorMessage('');

        axios.post(`${api.usersEndPoint}/register`, {
            inviteCode: inviteCode,
            email: email,
            username: username,
            password: password,
            passwordConfirmation: passwordConfirmation
        })
            .then(response => {
                if (response.status === 201) {
                    setLoggedIn(state => state = true);
                    setUser(name => name = username);

                    // Reset Fields
                    setInviteCode('');
                    setUsername('');
                    setPassword('');
                    setPasswordConfirmation('');
                    setEmail('');

                    //history.push('/');
                } else {
                    handleErrorMessage(response.data.message);

                    // USERNAME
                    if (response.data.message === "Username already exists!") {
                        document.getElementById('username').classList.add('redBorder');
                    } else {
                        document.getElementById('username').classList.remove('redBorder');
                    }

                    // EMAIL
                    if (response.data.message === "Email already registered!") {
                        document.getElementById('email').classList.add('redBorder');
                    } else {
                        document.getElementById('email').classList.remove('redBorder');
                    }

                    // PASSWORDS
                    if (response.data.message === "Passwords Don't Match!") {
                        document.getElementById('password').classList.add('redBorder');
                        document.getElementById('password_confirmation').classList.add('redBorder');
                    } else {
                        document.getElementById('password').classList.remove('redBorder');
                        document.getElementById('password_confirmation').classList.remove('redBorder');
                    }
                }
            })
            .catch(error => {
                if (error) {
                    console.log(error);
                }
            });
    };

    return (
        <div className='App'>
            <div className='signup' style={loggedIn ? { display: 'none' } : {}}>
                <form className='signupForm' onSubmit={handleSubmit}>
                    <h3>Signup</h3>
                    <hr />
                    <label htmlFor="username">
                        <h4>Username</h4>
                        <input
                            id="username"
                            type="text"
                            name="username"
                            onChange={handleUsernameChange}
                            value={username}
                            required
                            placeholder='Enter Username'
                        />
                    </label><br />
                    <label htmlFor="email">
                        <h4>Your Email</h4>
                        <input
                            id="email"
                            type="email"
                            name="email"
                            onChange={handleEmailChange}
                            value={email}
                            required
                            placeholder='Enter Email'
                        />
                    </label><br />
                    <label htmlFor="password">
                        <h4>Password</h4>
                        <input
                            id="password"
                            type="password"
                            name="password"
                            onChange={handlePasswordChange}
                            value={password}
                            required
                            placeholder='Enter Password'
                        />
                    </label><br />
                    <label htmlFor="password_confirmation">
                        <h4>Confirm Password</h4>
                        <input
                            id="password_confirmation"
                            type="password"
                            name="password_confirmation"
                            onChange={handlePasswordConfirmation}
                            value={passwordConfirmation}
                            required
                            placeholder='Enter Password Again'
                        />
                    </label><br />
                    <label htmlFor="inviteCode">
                        <h4>Invitation Code</h4>
                        <input
                            id="inviteCode"
                            type="text"
                            name="inviteCode"
                            onChange={handleInviteCode}
                            value={inviteCode}
                            required
                            placeholder='Enter Invitation Code'
                        />
                    </label><br />

                    <button type="submit">Submit</button>
                </form>

            </div>
            {errorMessage ? <em id='signupErrorMessage'>{errorMessage}</em> : ''}
        </div>
    );
}