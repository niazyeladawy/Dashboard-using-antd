import { Button, Form, Input, notification } from 'antd'
import { updatePassword } from 'firebase/auth';
import React, { useState } from 'react'
import { useTranslation } from 'react-i18next';
import { auth } from '../../components/firebase';

const UpdatePassword = ({setModalOpened}) => {

    const user = auth.currentUser;
    const [loading, setLoading] = useState(false);

    const {t} = useTranslation()


    const hadnleSubmit = async (values) => {
        try {
            setLoading(true)
            await updatePassword(user, values.newpassword);
            notification.success({
                message: 'success',
                description: ' successfully Updated password! ',
                duration: 4,
            });
            setLoading(false)
            setModalOpened(false);
        } catch (error) {
            notification.error({
                message: 'error',
                description: ' Error Updating password! ',
                duration: 4,
            })
            setLoading(false)

        }
    }

    return (
        <Form name='updatepassword' onFinish={hadnleSubmit} autoComplete="off" >
            <Form.Item
                name="newpassword"
                rules={[
                    {
                        required: true,
                        message: 'Please input your password!',
                    },
                ]}
            >
                <Input.Password size="large" placeholder={t('user.newPassword')} />
            </Form.Item>
            <Form.Item
                name="confirmnewpassword"
                dependencies={['newpassword']}
                hasFeedback
                rules={[
                    {
                        required: true,
                        message: 'Please confirm your password!',
                    },
                    ({ getFieldValue }) => ({
                        validator(_, value) {
                            if (!value || getFieldValue('newpassword') === value) {
                                return Promise.resolve();
                            }
                            return Promise.reject(new Error('The two passwords that you entered do not match!'));
                        },
                    }),
                ]}
            >
                <Input.Password size="large" placeholder={t('user.confirmnewPassword')} />
            </Form.Item>
            <Form.Item >
                <div className='submit_btn_wrapper'>
                    <Button loading={loading} size='large' type="primary" htmlType="submit">
                        
                        {t('submit')}
                    </Button>
                </div>
            </Form.Item>
        </Form>
    )
}

export default UpdatePassword