import { Button, Form, Input } from 'antd';
import {  sendPasswordResetEmail } from 'firebase/auth';
import { Link, useNavigate } from 'react-router-dom';
import { auth } from '../../components/firebase';
import routerLinks from '../../components/routerLinks';
import './ForgetPasswordForm.scss'
import { notification } from 'antd';

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



                <Form.Item>
                    <div className='submit_btn_wrapper'>
                        <Button size='large' type="primary" htmlType="submit">
                            Send Code
                        </Button>
                    </div>
                </Form.Item>
            </Form>
            <div className='text-center'>
                <span>Remembered Password <Link to={routerLinks.loginPage}>Login Here</Link>  </span>
            </div>
        </div>

    );
}

export default ForgetPasswordForm