import React from 'react'
import ForgetPasswordForm from './ForgetPasswordForm'
import login_cover from '../../assets/imgs/login_cover.svg'

const ForgetPasswordPage = () => {
    return (
        <div className='login_page'>
            <div className='container'>
                <div className='row'>
                    <div className='col-md-6'>
                        <ForgetPasswordForm />
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

export default ForgetPasswordPage