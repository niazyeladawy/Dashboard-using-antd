import { Button, Checkbox, Form, Input } from 'antd';
import { createUserWithEmailAndPassword, sendPasswordResetEmail, signInWithEmailAndPassword } from 'firebase/auth';
import React, { useContext } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { auth } from '../../components/firebase';
import routerLinks from '../../components/routerLinks';
import AuthContext from '../../context/auth/AuthContext';
import AuthProvider from '../../context/auth/AuthProvider';
import './ForgetPasswordForm.scss'
import { notification, Space } from 'antd';
import UserProvider from '../../context/auth/UserProvider';
import UserContext from '../../context/auth/UserProvider';



const ForgetPasswordForm = () => {

    const navigate = useNavigate()

    const onFinish = (values) => {
        sendPasswordResetEmail(auth, values.email)
            .then(() => {
                notification.success({
                    message: 'success',
                    description: 'Password Reset send to your email',
                    duration: 4,
                });
                navigate(routerLinks.loginPage)
            })
            .catch((error) => {
                notification.error({
                    message: 'error',
                    description: 'try again later',
                    duration: 4,
                });
            });
    };
    const onFinishFailed = (errorInfo) => {

    };


    return (
        <div className='login_form'>
            <Form
                name="basic"
                wrapperCol={{
                    offset: 8,
                    span: 16,
                }}
                initialValues={{

                }}
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
                autoComplete="off"
                layout='vertical'
            >
                <Form.Item
                    name="email"
                    rules={[
                        {
                            required: true,
                            message: 'Please input your email!',
                        },
                        {
                            type: 'email',
                            message: 'The input is not valid E-mail!',
                        },
                    ]}
                >
                    <Input size="large" placeholder='Email' />
                </Form.Item>



                <Form.Item
                    wrapperCol={{
                        offset: 8,
                        span: 16,
                    }}
                >
                    <div className='submit_btn_wrapper'>
                        <Button size='large' type="primary" htmlType="submit">
                            Send Code
                        </Button>
                    </div>

                    <div>
                        <span>Already have account  <Link to={routerLinks.loginPage}>Login Here</Link>  </span>
                    </div>

                </Form.Item>
            </Form>
        </div>

    );
}

export default ForgetPasswordForm