import { Button, Form, Input } from 'antd';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { auth, db } from '../../components/firebase';
import routerLinks from '../../components/routerLinks';
import './RegisterForm.scss'
import { notification } from 'antd';
import { doc, serverTimestamp, setDoc } from 'firebase/firestore';
import { PhoneInput } from 'react-international-phone';
import 'react-international-phone/style.css';



const RegisterForm = () => {

    const navigate = useNavigate()

    const [phone, setPhone] = useState('');
    const onFinish = async (values) => {
        const res = await createUserWithEmailAndPassword(auth, values.email, values.password)
        await setDoc(doc(db, "users", res.user.uid), {
            email: values.email,
            password: values.password, phoneNumber: phone, username: values.username,
            timeStamp: serverTimestamp()
        }).then((response) => {
            notification.success({
                message: 'success',
                description: ' successfully signed up ',
                duration: 4,
            });
            navigate(routerLinks.homePage)
        }).catch((e) => {

        })
    };
    const onFinishFailed = (errorInfo) => {
    };

    return (
        <div className='login_form'>
            <Form
                name="basic"
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
                <PhoneInput
                    initialCountry="eg"
                    value={phone}
                    onChange={(phone) => setPhone(phone)}
                    style={{ marginBottom: '24px', width: "100%" }}
                    placeholder="Enter Phone Number"
                />
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
                <Form.Item>
                    <div className='submit_btn_wrapper'>
                        <Button size='large' type="primary" htmlType="submit" >
                            Register
                        </Button>
                    </div>
                </Form.Item>
            </Form>
            <div>
                <span>Already have account  <Link to={routerLinks.loginPage}>Login Here</Link>  </span>
            </div>
        </div>

    );
}

export default RegisterForm