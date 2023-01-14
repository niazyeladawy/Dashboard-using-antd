import { Button, Checkbox, Form, Input, InputNumber } from 'antd';
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { auth } from '../../components/firebase';
import routerLinks from '../../components/routerLinks';
import './RegisterForm.scss'
import { notification } from 'antd';


const RegisterForm = () => {



    const navigate = useNavigate()
    const onFinish = (values) => {
        console.log(values.username)
        createUserWithEmailAndPassword(auth, values.email, values.password)

            .then((userCredintials) => {
                const user = userCredintials.user;
                notification.success({
                    message: 'success',
                    description: ' successfully signed up ',
                    duration: 4,
                });
                updateProfile(user, { displayName: values.username, phoneNumber:values.phoneNumber })

                navigate(routerLinks.loginPage)

            }).catch((e) => {
                console.log(e.code);
                console.log(e.message);
                if (e.code === 'auth/email-already-in-use') {
                    notification.error({
                        message: 'error',
                        description: 'Email already in use',
                        duration: 4,
                    });
                }
                else {

                    notification.error({
                        message: 'error',
                        description: 'invalid',
                        duration: 4,
                    });
                }
            })


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
                    name="username"
                    rules={[
                        {
                            required: true,
                            message: 'Please input your username!',
                        },

                    ]}
                >
                    <Input size="large" placeholder='username' />
                </Form.Item>

                <Form.Item
                    name="phoneNumber"
                    rules={[
                        {
                            required: true,
                            message: 'Please input your phone number!',
                        },
                        {
                            type: 'number',
                            message: 'The input is not a valid number!',
                        },
                    ]}
                >
                    <InputNumber size="large" placeholder='Phone number' />
                </Form.Item>

                <Form.Item
                    name="password"
                    rules={[
                        {
                            required: true,
                            message: 'Please input your password!',
                        },
                        {
                            min: 8,
                            message: '  Password weak',
                        },
                    ]}
                >
                    <Input.Password size="large" placeholder='Password' />
                </Form.Item>


                <Form.Item
                    wrapperCol={{
                        offset: 8,
                        span: 16,
                    }}
                >
                    <div className='submit_btn_wrapper'>
                        <Button size='large' type="primary" htmlType="submit">
                            Register
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

export default RegisterForm