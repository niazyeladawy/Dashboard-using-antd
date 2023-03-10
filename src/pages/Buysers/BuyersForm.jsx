import { Button, Form, Input, notification } from 'antd';
import { addDoc, collection, doc, serverTimestamp, updateDoc } from 'firebase/firestore';
import React, { useContext, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { db } from '../../components/firebase';
import UserContext from '../../context/auth/UserProvider';
import BuyersContext from '../../context/buyers/BuersProvider';

const BuyersForm = () => {
    const [isLoading, setIsLoading] = useState(false);
    const { user } = useContext(UserContext);
 
    const {t} = useTranslation();

    const { selectedBuyer, buyersModalOpened, setBuyersModalOpened, setFetchCount, fetchCount, setSelectedBuyer } = useContext(BuyersContext);
    const [id, setId] = useState();
    const onFinish = (values) => {
        if (selectedBuyer) {
            handleEditBuyer(id, values)
        }
        else {
            handleAddBuyer(values)
        }

    };
    

    const handleEditBuyer = async (id, values) => {
        setIsLoading(true)
        const buyerRef = doc(db, "buyers", id);
        await updateDoc(buyerRef, {
            ...values
        }).then(() => {
            setFetchCount(fetchCount + 1);
            setSelectedBuyer(null)
            setBuyersModalOpened(false)
            notification.success({
                message: 'success',
                description: ' successfully Updated!  ',
                duration: 4,
            })
            setIsLoading(false)
        }).catch((e) => {
            
            notification.error({
                message: 'error',
                description: ' error happended try again later ',
                duration: 4,
            })
            setIsLoading(false)
        })
    }

    const handleAddBuyer = async (values) => {
        setIsLoading(true)
        await addDoc(collection(db, "buyers"), {
            ...values,
            timeStamp: serverTimestamp()
        }).then((response) => {
            setFetchCount(fetchCount + 1);
            setSelectedBuyer(null)
            setBuyersModalOpened(false)
            notification.success({
                message: 'success',
                description: ' successfully Added!  ',
                duration: 4,
            })
            setIsLoading(false)
        }).catch((e) => {
            notification.error({
                message: 'error',
                description: ' error happended try again later ',
                duration: 4,
            })
            setIsLoading(false)
        })


    }

    const [form] = Form.useForm();

    useEffect(() => {
        if (selectedBuyer) {
            form.setFieldsValue(selectedBuyer);
            setId(selectedBuyer.id)
        }
    }, [selectedBuyer]);




    return (
        <Form
            requiredMark={false}
            form={form}
            name="nest-messages"
            onFinish={onFinish}
            style={{
                maxWidth: 600,
            }}
            layout='vertical'
        >
            <Form.Item
                name='name'
                label={t('buyers_page.name')}
                rules={[
                    {
                        required: true,
                    },
                ]}
            >
                <Input size='large' />
            </Form.Item>
            <Form.Item
                name='email'
                label={t('buyers_page.email')}
                rules={[
                    {
                        required: true,
                    },
                    {
                        type: 'email',
                    },
                ]}
            >
                <Input size='large' />
            </Form.Item>
            <Form.Item
                name='income'
                label={t('buyers_page.income')}
                rules={[
                    {
                        required: true,
                    },
                ]}
            >
                <Input size='large' type='number' />
            </Form.Item>
            <Form.Item style={{display:"flex" , justifyContent:"center"}}  >
                <Button size='large' loading={isLoading} disabled={isLoading} type="primary" htmlType="submit">
                   { t('submit')}
                </Button>
            </Form.Item>
        </Form>
    )
}

export default BuyersForm