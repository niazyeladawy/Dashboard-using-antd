import { Col, Row } from 'antd'
import React from 'react'
import ForgetPasswordForm from './ForgetPasswordForm'
import login_cover from '../../assets/imgs/login_cover.svg'

const ForgetPasswordPage = () => {
    return (
        <div className='login_page'>
            <Row >
                <Col sm={24} md={12}>
                    <ForgetPasswordForm />
                </Col>
                <Col sm={24} md={12}>
                    <div className='login_cover_img'>
                        <img src={login_cover} alt="" />
                    </div>
                </Col>
            </Row>

        </div>
    )
}

export default ForgetPasswordPage