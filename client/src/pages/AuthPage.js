import React, { useState } from 'react';
import { useHttp } from '../hooks/http.hook';

export const AuthPage = () => {

    const {loading, error, request} = useHttp();

    const [form, setForm] = useState({
        email: '',
        password: ''
    })

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
