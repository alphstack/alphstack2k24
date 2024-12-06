import React, { useState } from 'react';
import {Button} from "@nextui-org/react";

const SignUp = () => {
    const [emailOrUsername, setEmailOrUsername] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const handleEmailOrUsernameChange = (e) => {
        setEmailOrUsername(e.target.value);
    };

    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
    };

    const handleConfirmPasswordChange = (e) => {
        setConfirmPassword(e.target.value);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
    };

    return (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', backgroundColor: '#fff', color: '#000' }}>
            <form onSubmit={handleSubmit} style={{ border: '2px solid #000', padding: '30px', borderRadius: '5px', backgroundColor: '#fff', width: '400px' }}>
                <div style={{ marginBottom: '15px' }}>
                    <label htmlFor="emailOrUsername" style={{ fontSize: '18px' }}>Email or Username:</label>
                    <input
                        type="text"
                        id="emailOrUsername"
                        value={emailOrUsername}
                        onChange={handleEmailOrUsernameChange}
                        style={{ width: '100%', padding: '15px', borderRadius: '5px', border: '2px solid #000', backgroundColor: '#fff', color: '#000', fontSize: '16px' }}
                    />
                </div>
                <div style={{ marginBottom: '15px' }}>
                    <label htmlFor="password" style={{ fontSize: '18px' }}>Password:</label>
                    <input
                        type="password"
                        id="password"
                        value={password}
                        onChange={handlePasswordChange}
                        style={{ width: '100%', padding: '15px', borderRadius: '5px', border: '2px solid #000', backgroundColor: '#fff', color: '#000', fontSize: '16px' }}
                    />
                </div>
                <div style={{ marginBottom: '15px' }}>
                    <label htmlFor="confirmPassword" style={{ fontSize: '18px' }}>Confirm Password:</label>
                    <input
                        type="password"
                        id="confirmPassword"
                        value={confirmPassword}
                        onChange={handleConfirmPasswordChange}
                        style={{ width: '100%', padding: '15px', borderRadius: '5px', border: '2px solid #000', backgroundColor: '#fff', color: '#000', fontSize: '16px' }}
                    />
                </div>
                <Button color="primary" variant="ghost">
                    Sign Up
                </Button>
                <div style={{ marginTop: '15px', textAlign: 'center' }}>
                    <span>Already have an account? <p class="text-red">Sign in</p></span>
                </div>
            </form>
        </div>
    );
};

export default SignUp;