import React, { useState } from 'react';
import {Input, Snippet} from "@nextui-org/react";
import {useNavigate} from 'react-router-dom';
import { useSignin } from "../hooks/useSignin";
import { useAuthContext } from '../hooks/useAuthContext';
import NotFound from './notFound';

export const Error = ({error}) => {
    return (
    <Snippet className="anim-snippet" variant="shadow" hideCopyButton hideSymbol style={{position:'fixed', right: 0, zIndex:'99999', margin:'15px', padding:'10px'}}>
        <div className='snippet-notification'>
        <svg class="crossmark" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 52 52">
            <circle class="crossmark_circle" cx="26" cy="26" r="25" fill="none"/>
            <path class="crossmark_check" fill="none" d="M14.1 14.1l23.8 23.8 m0,-23.8 l-23.8,23.8"/>
        </svg>
        <p>{error}</p>
        </div>
    </Snippet>
    );
}

const SignIn = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const { signin, error, isLoading } = useSignin();

    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();

        signin( email, password);
    };

    const { user } = useAuthContext();

    if(user)
        return <NotFound/>

    return (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center'}} className='mt-[15vh]'>
            {error && <Error error={error}/>}
            <form onSubmit={handleSubmit} 
            className='flex flex-col gap-3'
            style={{ border: '2px solid #DCDCDC', padding: '30px', borderRadius: '15px', width: '400px' }}>
                    <div className="flex w-full flex-wrap md:flex-nowrap md:mb-0 gap-4">
                        <Input label="Email" value={email} onChange={(e) => setEmail(e.target.value)} variant="bordered" />
                    </div>
                        <div>
                        <div className="flex w-full flex-wrap md:flex-nowrap md:mb-0 gap-4">
                        <Input label="Password" value={password} onChange={(e) => setPassword(e.target.value)} type="password" variant="bordered" />
                        </div>
                    </div>
                <button
                    type="submit"
                    style={{
                        width: '100%',
                        padding: '15px',
                        border: '2px solid #E4E4E7',
                        backgroundColor: '#fff',
                        color: '#000',
                        fontSize: '18px',
                        cursor: 'pointer',
                        transition: 'background-color 0.3s, color 0.3s'
                    }}
                    className='rounded-xl mt-5'
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
                <div style={{ marginTop: '0px', textAlign: 'center' }}>
                    <span>Don't have an account?
                        <p className='text-blue-400 cursor-pointer' onClick={() => navigate('/signup')}>
                            Sign Up
                        </p> 
                    </span>
                </div>
            </form>
        </div>
    );
};

export default SignIn;