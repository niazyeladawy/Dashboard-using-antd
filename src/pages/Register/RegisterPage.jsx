import React from 'react'
import login_cover from '../../assets/imgs/login_cover.svg'
import RegisterForm from './RegisterForm'

const RegisterPage = () => {
    return (
        <div className='login_page'>
            <div className='container'>
                <div className='row'>
                    <div className='col-md-6'>
                    <RegisterForm />
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

export default RegisterPage