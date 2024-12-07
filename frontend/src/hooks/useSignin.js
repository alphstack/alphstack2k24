import {useState} from 'react';
import {useAuthContext} from './useAuthContext'
import {useNavigate} from 'react-router-dom';

export const useSignin = () =>{
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const {dispatch} = useAuthContext();

    const signin = async(username, password) =>{
        setError(null);
        setIsLoading(false);

        const response = await fetch(`${process.env.REACT_APP_API}/api/user/signin`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({username, password})
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

    return {signin, isLoading, error}
}