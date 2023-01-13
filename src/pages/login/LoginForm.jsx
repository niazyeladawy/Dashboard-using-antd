import { Button, Checkbox, Form, Input } from 'antd';
import { signInWithEmailAndPassword } from 'firebase/auth';
import React, { useContext } from 'react'
import { useNavigate } from 'react-router-dom';
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
    const {setUser} = useContext(UserContext);
    
    const navigate = useNavigate()
    const onFinish = (values) => {
        console.log('Success:', values);
        signInWithEmailAndPassword(auth, values.email, values.password)
            .then((userCredintials) => {
                setUser(userCredintials)
                console.log(userCredintials)
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
        console.log('Failed:', errorInfo);
    };
    return (
        <div className='login_form'>
            <Form
                name="basic"
                labelCol={{
                    span: 8,
                }}
                wrapperCol={{
                    span: 16,
                }}
                initialValues={{
                    remember: true,
                }}
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
                autoComplete="off"

            >
                <Form.Item
                    label="email"
                    name="email"
                    rules={[
                        {
                            required: true,
                            message: 'Please input your email!',
                        },
                    ]}
                >
                    <Input />
                </Form.Item>

                <Form.Item
                    label="Password"
                    name="password"
                    rules={[
                        {
                            required: true,
                            message: 'Please input your password!',
                        },
                    ]}
                >
                    <Input.Password />
                </Form.Item>

                <Form.Item
                    name="remember"
                    valuePropName="checked"
                    wrapperCol={{
                        offset: 8,
                        span: 16,
                    }}
                >
                    <Checkbox>Remember me</Checkbox>
                </Form.Item>

                <Form.Item
                    wrapperCol={{
                        offset: 8,
                        span: 16,
                    }}
                >
                    <Button type="primary" htmlType="submit">
                        Submit
                    </Button>
                </Form.Item>
            </Form>
        </div>

    );
}

export default LoginForm