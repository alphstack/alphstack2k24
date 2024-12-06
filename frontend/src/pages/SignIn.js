import React, { useState } from 'react';
import { useAuthContext } from '../hooks/useAuthContext';
import { useSignin } from "../hooks/useSignin";
import {notFound} from "../pages/notFound"

const SignIn = () => {
    const { user } = useAuthContext();

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const { signin, error, isLoading } = useSignin();

    const handleSubmit = async (e) => {
        e.preventDefault(); 

        signin(username, password);
    };

    if(user)
        return (<notFound/>)

    return (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', backgroundColor: '#fff', color: '#000' }}>
            <form
                onSubmit={handleSubmit} 
                style={{ border: '2px solid #000', padding: '30px', borderRadius: '5px', backgroundColor: '#fff', width: '400px' }}
            >
                <div style={{ marginBottom: '15px' }}>
                    <label htmlFor="emailOrUsername" style={{ fontSize: '18px' }}>Email or Username:</label>
                    <input
                        type="text"
                        id="emailOrUsername"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        style={{ width: '100%', padding: '15px', borderRadius: '5px', border: '2px solid #000', backgroundColor: '#fff', color: '#000', fontSize: '16px' }}
                    />
                </div>
                <div style={{ marginBottom: '15px' }}>
                    <label htmlFor="password" style={{ fontSize: '18px' }}>Password:</label>
                    <input
                        type="password"
                        id="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        style={{ width: '100%', padding: '15px', borderRadius: '5px', border: '2px solid #000', backgroundColor: '#fff', color: '#000', fontSize: '16px' }}
                    />
                </div>
                <button
                    type="submit"
                    style={{
                        width: '100%',
                        padding: '15px',
                        borderRadius: '5px',
                        border: '2px solid #000',
                        backgroundColor: '#fff',
                        color: '#000',
                        fontSize: '18px',
                        cursor: 'pointer',
                        transition: 'background-color 0.3s, color 0.3s'
                    }}
                    onMouseOver={(e) => {
                        e.target.style.backgroundColor = '#000';
                        e.target.style.color = '#fff';
                    }}
                    onMouseOut={(e) => {
                        e.target.style.backgroundColor = '#fff';
                        e.target.style.color = '#000';
                    }}
                >
                    Sign In
                </button>
            </form>
        </div>
    );
};

export default SignIn;
