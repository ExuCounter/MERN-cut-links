import React, { useState, useEffect } from 'react';
import { useHttp } from '../hooks/http.hook';
import { useMessage } from '../hooks/message.hook'
import { useRoutes } from '../routes';

export const AuthPage = () => {
    const {loading, error, request, clearError} = useHttp();
    const message = useMessage();
    const [form, setForm] = useState({
        email: '',
        password: ''
    })

    useEffect(()=>{
        console.log('Error', error);
        message(error);
        clearError();
    }, [error, message])

    /* С помощью деструктуризации мы ищем элемент который изменился,
    и заменяем его значение на новое */

    const changeHandler = event => {
        setForm({...form, [event.target.name]: event.target.value})
    }

    const registerHandler = async () => {
        try {
            const data = await request('/api/auth/register', "POST", {...form})
            console.log('data', data)
        } catch (e) {

        }
    }

    const loginHandler = async () => {
        try {
            const data = await request('/api/auth/login', "POST", {...form})
            console.log('data', data);
        } catch (e) {

        }
    }

    return(
        <div className="row">
            <div className="col s6 offset-s3">
                <h1>Cut link</h1>
                <div className="card blue darken-1">
                <div className="card-content white-text">
                    <span className="card-title">Authorization</span>
                 </div>
                 <div className='card-action'>
                     <input 
                        id='email'
                        name='email'
                        placeholder="Email"
                        type="text"
                        className="validate"
                        onChange={changeHandler}
                         />
                     <input 
                        id='password'
                        name='password'
                        placeholder="Password"
                        type='password'
                        style={{marginBottom: '40px', display: 'block'}}
                        onChange={changeHandler}
                        />
                     <button 
                        className="btn yellow darken-4"
                        style={{marginRight: '10px'}}
                        disabled={loading}
                        onClick={loginHandler}
                            >Sign In
                     </button>
                     <button 
                        className="btn grey lighten-1 ml-2 black-text"
                        onClick={registerHandler}
                        disabled={loading}
                     >Sign Up</button>
                 </div>
            </div>
            </div>
        </div>
    )
}
