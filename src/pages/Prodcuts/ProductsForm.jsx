import { Button, Form, Input, notification } from 'antd'
import React, { useContext, useEffect, useState } from 'react'
import { addDoc, collection, doc, serverTimestamp, updateDoc } from 'firebase/firestore';
import { db } from '../../components/firebase';
import UserContext from '../../context/auth/UserProvider';
import ProductsContext from '../../context/products/ProductsProvider';

const ProductsForm = () => {
    const [isLoading, setIsLoading] = useState(false);
    const { user } = useContext(UserContext);

    const { selectedBuyer, ProductsModalOpened, setProductsModalOpened, setFetchCount, fetchCount, setSelectedBuyer } = useContext(ProductsContext);
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
        const buyerRef = doc(db, "Products", id);
        await updateDoc(buyerRef, {
            ...values
        }).then(() => {
            setFetchCount(fetchCount + 1);
            setSelectedBuyer(null)
            setProductsModalOpened(false)
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
        await addDoc(collection(db, "Products"), {
            ...values,
            timeStamp: serverTimestamp()
        }).then((response) => {
            setFetchCount(fetchCount + 1);
            setSelectedBuyer(null)
            setProductsModalOpened(false)
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
                label="Name"
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
                label="Email"
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
                label="Income"
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
                    Submit
                </Button>
            </Form.Item>
        </Form>
    )
}

export default ProductsForm