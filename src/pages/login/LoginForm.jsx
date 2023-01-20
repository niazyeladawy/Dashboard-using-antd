import { Button, Checkbox, Form, Input, Upload } from 'antd';
import { signInWithEmailAndPassword } from 'firebase/auth';
import React, { useContext, useState } from 'react'
import { json, Link, useNavigate } from 'react-router-dom';
import { auth } from '../../components/firebase';
import routerLinks from '../../components/routerLinks';
import AuthContext from '../../context/auth/AuthContext';
import AuthProvider from '../../context/auth/AuthProvider';
import './LoginForm.scss'
import { notification, Space } from 'antd';
import UserProvider from '../../context/auth/UserProvider';
import UserContext from '../../context/auth/UserProvider';


const LoginForm = () => {

    const { login } = useContext(AuthContext);
    const { setUser } = useContext(UserContext);
    const [remember, setRemember] = useState(false);

    const navigate = useNavigate()
    const onFinish = (values) => {
        console.log("valuesvaluesvalues", values)

        signInWithEmailAndPassword(auth, values.email, values.password)
            .then((userCredintials) => {
                localStorage.setItem('firebaseRemember', JSON.stringify(remember))
                setUser(userCredintials.user)
                login()
                navigate(routerLinks.homePage)

            }).catch((e) => {
                notification.error({
                    message: 'error',
                    description: 'invalid Credintials',
                    duration: 4,
                });
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
                    name="password"
                    rules={[
                        {
                            required: true,
                            message: 'Please input your password!',
                        },
                    ]}
                >
                    <Input.Password size="large" placeholder='Password' />
                </Form.Item>

                <Form.Item
                    name="remember"
                    valuePropName="checked"
                    wrapperCol={{
                        offset: 8,
                        span: 16,
                    }}
                >
                    <Checkbox checked={remember} onChange={(e) => setRemember(e.target.checked)}>Remember me</Checkbox>
                    <Link to={routerLinks.forgetPasswordPage}>Forget Password</Link>
                </Form.Item>
                <Form.Item
                    wrapperCol={{
                        offset: 8,
                        span: 16,
                    }}
                >
                    <div className='submit_btn_wrapper'>
                        <Button size='large' type="primary" htmlType="submit">
                            Login
                        </Button>
                    </div>

                    <div>
                        <span>Don't have accout yet <Link to={routerLinks.registerPage}>Register Here</Link>  </span>
                    </div>

                </Form.Item>
            </Form>
        </div>

    );
}

export default LoginForm