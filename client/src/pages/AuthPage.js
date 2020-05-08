import React, { useState } from 'react';

export const AuthPage = () => {

    const [form, setForm] = useState({
        email: '',
        password: ''
    })

    /* С помощью деструктуризации мы ищем элемент который изменился,
    и заменяем его значение на новое */

    const changeHandler = event => {
        setForm({...form, [event.target.name]: event.target.value})
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
                        class="validate"
                        onChange='changeHandler'
                         />
                     <input 
                        id='password'
                        name='password'
                        placeholder="Password"
                        type='password'
                        style={{marginBottom: '40px', display: 'block'}}
                        />
                     <button className="btn yellow darken-4" style={{marginRight: '10px'}}>Sign In</button>
                     <button className="btn grey lighten-1 ml-2 black-text">Sign Up</button>
                 </div>
            </div>
            </div>
        </div>
    )
}
