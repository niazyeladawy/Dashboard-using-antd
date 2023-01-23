import { Button, Form, Input, notification } from 'antd'
import React, { useContext, useEffect, useState } from 'react'
import BuyersContext from '../../context/buyers/BuersProvider';
import { addDoc, collection, doc, serverTimestamp, updateDoc } from 'firebase/firestore';
import { db } from '../../components/firebase';
import UserContext from '../../context/auth/UserProvider';

const BuyersForm = () => {
    const [isLoading, setIsLoading] = useState(false);
    const { user } = useContext(UserContext);

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
    console.log("no", user);

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
            console.log(e)
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
            form={form}
            name="nest-messages"
            onFinish={onFinish}
            style={{
                maxWidth: 600,
            }}
        >
            <Form.Item
                name='name'
                label="name"
                rules={[
                    {
                        required: true,
                    },
                ]}
            >
                <Input />
            </Form.Item>
            <Form.Item
                name='email'
                label="email"
                rules={[
                    {
                        required: true,
                    },
                    {
                        type: 'email',
                    },
                ]}
            >
                <Input />
            </Form.Item>
            <Form.Item
                name='income'
                label="income"
                rules={[
                    {
                        required: true,
                    },
                ]}
            >
                <Input type='number' />
            </Form.Item>
            <Form.Item  >
                <Button loading={isLoading} disabled={isLoading} type="primary" htmlType="submit">
                    Submit
                </Button>
            </Form.Item>
        </Form>
    )
}

export default BuyersForm