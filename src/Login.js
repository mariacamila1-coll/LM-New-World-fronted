import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Login({ setIsAuthenticated }) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [username, setUsername] = useState('');
    const [isRegistering, setIsRegistering] = useState(false);
    const navigate = useNavigate(); // Para redireccionar después del login

    const handleSubmit = async (e) => {
        e.preventDefault();
        const endpoint = isRegistering ? '/api/register' : '/api/login';
        const data = isRegistering ? { username, email, password } : { email, password };

        try {
            const response = await axios.post(`http://localhost:5000${endpoint}`, data);
            alert(response.data.message);
            if (!isRegistering) {
                setIsAuthenticated(true); // Establecer autenticación
                navigate('/prensa'); // Redirigir a Prensa
            }
        } catch (error) {
            alert(error.response?.data?.error || 'An error occurred');
        }
    };

    return (
        <div>
            <h2>{isRegistering ? 'Register' : 'Login'}</h2>
            <form onSubmit={handleSubmit}>
                {isRegistering && (
                    <input 
                        type="text" 
                        placeholder="Username" 
                        value={username}
                        onChange={(e) => setUsername(e.target.value)} 
                        required 
                    />
                )}
                <input 
                    type="email" 
                    placeholder="Email" 
                    value={email}
                    onChange={(e) => setEmail(e.target.value)} 
                    required 
                />
                <input 
                    type="password" 
                    placeholder="Password" 
                    value={password}
                    onChange={(e) => setPassword(e.target.value)} 
                    required 
                />
                <button type="submit">{isRegistering ? 'Register' : 'Login'}</button>
            </form>
            <button onClick={() => setIsRegistering(!isRegistering)}>
                {isRegistering ? 'Switch to Login' : 'Switch to Register'}
            </button>
        </div>
    );
}

export default Login;
