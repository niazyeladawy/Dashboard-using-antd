import React from 'react'
import login_cover from '../../assets/imgs/login_cover.svg'
import LoginForm from './LoginForm'
import './LoginPage.scss'

const LoginPage = () => {
    return (
        <div className='login_page'>
            <div className='container'>
                <div className='row'>
                    <div className='col-md-6'>
                        <LoginForm />
                    </div>
                    <div className='d-sm-none d-md-block col-md-6 '>
                        <div className='login_cover_img'>
                            <img src={login_cover} alt="" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default LoginPage