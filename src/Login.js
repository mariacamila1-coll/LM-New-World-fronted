import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './Login.css';

function Login({ setIsAuthenticated }) {
    const [loginEmail, setLoginEmail] = useState('');
    const [loginPassword, setLoginPassword] = useState('');
    const [registerEmail, setRegisterEmail] = useState('');
    const [registerPassword, setRegisterPassword] = useState('');
    const [username, setUsername] = useState('');
    
    const navigate = useNavigate();

    const handleSubmitLogin = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:5000/api/login', { email: loginEmail, password: loginPassword });
            alert(response.data.message || 'Login successful');
            setIsAuthenticated(true);
            navigate('/prensa');
        } catch (error) {
            console.error(error);
            alert(error.response?.data?.error || 'An error occurred during login');
        }
    };

    const handleSubmitRegister = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:5000/api/register', { username, email: registerEmail, password: registerPassword });
            alert(response.data.message || 'Registration successful');
        } catch (error) {
            console.error(error);
            alert(error.response?.data?.error || 'An error occurred during registration');
        }
    };

    return (
        <div className="login-container">
            <div className="login-form-container">
                <h2>Login</h2>
                <form onSubmit={handleSubmitLogin}>
                    <input 
                        type="email" 
                        placeholder="Email" 
                        value={loginEmail}
                        onChange={(e) => setLoginEmail(e.target.value)} 
                        required 
                    />
                    <input 
                        type="password" 
                        placeholder="Password" 
                        value={loginPassword}
                        onChange={(e) => setLoginPassword(e.target.value)} 
                        required 
                    />
                    <button type="submit" className="login-button2">Login</button>
                </form>
            </div>
    
            <div className="register-form-container">
                <h2>Register</h2>
                <form onSubmit={handleSubmitRegister}>
                    <input 
                        type="text" 
                        placeholder="Username" 
                        value={username}
                        onChange={(e) => setUsername(e.target.value)} 
                        required 
                    />
                    <input 
                        type="email" 
                        placeholder="Email" 
                        value={registerEmail}
                        onChange={(e) => setRegisterEmail(e.target.value)} 
                        required 
                    />
                    <input 
                        type="password" 
                        placeholder="Password" 
                        value={registerPassword}
                        onChange={(e) => setRegisterPassword(e.target.value)} 
                        required 
                    />
                    <button type="submit" className="register-button2">Register</button>
                </form>
            </div>
        </div>
    );
}

export default Login;
