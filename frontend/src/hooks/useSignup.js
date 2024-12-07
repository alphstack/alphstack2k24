import {useState} from 'react';
import {useAuthContext} from './useAuthContext'
import {useNavigate} from 'react-router-dom';

export const useSignup = () =>{
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const {dispatch} = useAuthContext();

    const signup = async(username, email, password, confirmPassword) =>{
        setError(null);
        setIsLoading(false);

        const response = await fetch(`${process.env.REACT_APP_API}/api/user/signup`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({username, email, password, confirmPassword})
        })
        const json = await response.json();
        if(!response.ok){
            console.log(json.error);
            setIsLoading(false);
            setError(json.error);
            setTimeout(() =>{
                setError(null);
            }, 7000)
        }
        if(response.ok){
            localStorage.setItem('user', JSON.stringify(json));
            dispatch({type: 'LOGIN', payload: json});
            setIsLoading(false);
            navigate('/');
        }
    }

    return {signup, isLoading, error}
}
