import React, { useState } from 'react';
import {Input} from "@nextui-org/react";

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
            <form onSubmit={handleSubmit} style={{ border: '2px solid #000', padding: '30px', borderRadius: '15px', backgroundColor: '#fff', width: '400px' }}>
            <div className="w-full flex flex-col ">
        
        <div className="flex w-full flex-wrap md:flex-nowrap mb-6 md:mb-0 gap-4">
          <Input label="Email" type="email" variant="bordered" />
        </div>
            </div>
                <div style={{ marginBottom: '15px' }}>
                    
                    <div className="flex w-full flex-wrap md:flex-nowrap mb-6 md:mb-0 gap-4">
          <Input label="Password" type="password" variant="bordered" />
        </div>
                </div>
                <div style={{ marginBottom: '15px' }}>
                    
                    <div className="flex w-full flex-wrap md:flex-nowrap mb-6 md:mb-0 gap-4">
          <Input label="Rewrite password" type="password" variant="bordered" />
        </div>
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
                    Sign Up
                </button>
                <div style={{ marginTop: '15px', textAlign: 'center' }}>
                    <span>Already have an account? Sign in</span>
                </div>
            </form>
        </div>
    );
};

export default SignUp;