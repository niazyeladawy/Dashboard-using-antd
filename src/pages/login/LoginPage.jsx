import { Col, Row } from 'antd'
import React from 'react'
import LoginForm from './LoginForm'
import login_cover from '../../assets/imgs/login_cover.svg'
import './LoginPage.scss'

const LoginPage = () => {
    return (
        <div className='login_page'>
            <Row >
                <Col sm={24} md={12}>
                    <LoginForm />
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

export default LoginPage