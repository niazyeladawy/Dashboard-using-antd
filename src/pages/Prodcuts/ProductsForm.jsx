import { Button, Form, Input, InputNumber, notification, Upload } from 'antd';
import TextArea from 'antd/es/input/TextArea';
import { addDoc, collection, doc, serverTimestamp, updateDoc } from 'firebase/firestore';
import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage';
import React, { useContext, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { db, productsRef } from '../../components/firebase';
import UserContext from '../../context/auth/UserProvider';
import ProductsContext from '../../context/products/ProductsProvider';
import './productsForm.scss';

const ProductsForm = () => {
    const [isLoading, setIsLoading] = useState(false);
    const { user } = useContext(UserContext);

    const { selectedProducts, ProductsModalOpened, setProductsModalOpened, setFetchCount, fetchCount, setSelectedProducts } = useContext(ProductsContext);
    const [id, setId] = useState();
    const onFinish = (values) => {
        if (selectedProducts) {
            handleEditProducts(id, values)
        }
        else {
            handleAddProducts(values)
        }

    };


    const handleEditProducts = async (id, values) => {
        setIsLoading(true)
        const ProductsRef = doc(db, "products", id);
        await updateDoc(ProductsRef, {
            ...values,
            img: imageUrl,
            updatedAt: serverTimestamp()
        }).then(() => {
            setFetchCount(fetchCount + 1);
            setSelectedProducts(null)
            setProductsModalOpened(false)
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

    const handleAddProducts = async (values) => {
        setIsLoading(true)
        await addDoc(collection(db, "products"), {
            ...values,
            img: imageUrl,
            timeStamp: serverTimestamp(),
        }).then((response) => {
            setFetchCount(fetchCount + 1);
            setSelectedProducts(null)
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
        if (selectedProducts) {
            form.setFieldsValue(selectedProducts);
            setImageUrl(selectedProducts.img)
            setId(selectedProducts.id)
        }
    }, [selectedProducts]);

    const [imageUrl, setImageUrl] = useState("");
    const [file, setFile] = useState("");
    const [per, setPerc] = useState(null);

    useEffect(() => {
        const uploadFile = () => {
            const name = new Date().getTime() + file.name;
            const storageRef = ref(productsRef, name);
            const uploadTask = uploadBytesResumable(storageRef, file);

            uploadTask.on('state_changed',
                (snapshot) => {
                    const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;

                    setPerc(progress);

                    switch (snapshot.state) {
                        case 'paused':

                            break;
                        case 'running':

                            break;
                    }
                },
                (error) => {
                    // Handle unsuccessful uploads
                },
                () => {
                    // Handle successful uploads on complete
                    // For instance, get the download URL: https://firebasestorage.googleapis.com/...
                    getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {

                        setImageUrl(downloadURL)
                    });
                }

            )
        }

        file && uploadFile()
    }, [file]);
    const {t} = useTranslation()
    
    return (
        <Form
            className='ProductsForm'
            requiredMark={false}
            form={form}
            name="nest-messages"
            onFinish={onFinish}
            style={{
                maxWidth: 800,
            }}
            layout='vertical'
        >
            <Upload
                name="avatar"
                listType="picture-card"
                className="avatar-uploader"
                showUploadList={false}
                onChange={(e) => setFile(e.file.originFileObj)}

            >
                {imageUrl ? (
                    <img
                        src={imageUrl}
                        alt="avatar"
                        style={{
                            width: '100%',
                            height: '100%',
                            margin: '0 auto',
                        }}
                    />
                ) : t('upload')
                }
            </Upload>

            <Form.Item
                name='name'
                label={t('products_page.name')}
                rules={[
                    {
                        required: true,
                    },
                ]}
            >
                <Input size='large' />
            </Form.Item>

            <Form.Item
                name='price'
                label={t('products_page.price')}
                rules={[
                    {
                        required: true,
                    },
                ]}
            >

                <Input size='large' type='number' />
            </Form.Item>
            <Form.Item
                name='short_desc'
                label={t('products_page.short_description')}
                rules={[
                    {
                        required: true,
                    },
                ]}
            >
                <Input size='large' />
            </Form.Item>
            <Form.Item
                name='detail_desc'
                label={t('products_page.long_description')}
                rules={[
                    {
                        required: true,
                    },
                ]}
            >
                <TextArea rows={4} />
            </Form.Item>
            <Form.Item
                name='rate'
                label={t('products_page.rate')}
                
                rules={[
                    {
                        required: true,
                    },
                ]}
            >

                <InputNumber min="0" max='5'  size='large' className='w-100' />
            </Form.Item>
            <Form.Item
                name='tax'
                label={t('products_page.tax')}
                rules={[
                    {
                        required: true,
                    },
                ]}
            >

                <InputNumber min="0" max='100'  size='large' className='w-100' />
            </Form.Item>
            <Form.Item
                name='discount'
                label={t('products_page.discount')}
                rules={[
                    {
                        required: true,
                    },
                ]}
            >

            <InputNumber min="0" max='100'  size='large' className='w-100' />
            </Form.Item>
            <Form.Item style={{ display: "flex", justifyContent: "center" }}  >
                <Button size='large' loading={isLoading} disabled={(per !== null && per < 100) || isLoading} type="primary" htmlType="submit">
                    {t('submit')}
                </Button>
            </Form.Item>
        </Form>
    )
}

export default ProductsForm