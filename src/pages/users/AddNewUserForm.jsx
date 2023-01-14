import { Button, Form, Input, InputNumber, Upload } from 'antd';
import React, { useEffect, useState } from 'react'
import { addDoc, collection, doc, serverTimestamp, setDoc } from "firebase/firestore";
import { auth, db, storage } from '../../components/firebase';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { getDownloadURL, ref, uploadBytes, uploadBytesResumable } from "firebase/storage";
import { UploadOutlined } from '@ant-design/icons';

const AddNewUserForm = () => {
    const onFinish = async ({ address, country, displayName, email,
        password, phone, username, upload }) => {


        try {
            const res = await createUserWithEmailAndPassword(auth, email, password)
            await setDoc(doc(db, "users", res.user.uid), {
                address, country, displayName, email,
                password, phone, username,img:imageUrl,
                timeStamp: serverTimestamp()
            }).then((response) => {
                console.log(response.id)
            }).catch((e) => {
                console.log(e);
            })

        } catch (error) {

        }

    };
    const [file, setFile] = useState("");
    const [imageUrl, setImageUrl] = useState("");


    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };

    useEffect(() => {
        const uploadFile = () => {
            const name = new Date().getTime() + file.name;
            const storageRef = ref(storage, name);
            const uploadTask = uploadBytesResumable(storageRef, file);

            uploadTask.on('state_changed',
                (snapshot) => {
                    const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                    console.log('Upload is ' + progress + '% done');
                    switch (snapshot.state) {
                        case 'paused':
                            console.log('Upload is paused');
                            break;
                        case 'running':
                            console.log('Upload is running');
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
                        console.log('File available at', downloadURL);
                        setImageUrl(downloadURL)
                    });
                }

            )
        }

        file && uploadFile()
    }, [file]);

    

    return (
        <div>
            <Form
                name="basic"

                initialValues={{
                    remember: true,
                }}
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
                autoComplete="off"
            >

                <input
                    type="file"
                    id="file"
                    onChange={(e) => setFile(e.target.files[0])}

                />
                <Form.Item
                    name="username"
                    rules={[
                        {
                            required: true,
                            message: 'Please input your username!',
                        },
                    ]}
                >
                    <Input size='large' placeholder="username" />
                </Form.Item>
                <Form.Item
                    name="displayName"
                    rules={[
                        {
                            required: true,
                            message: 'Please input your displayName!',
                        },
                    ]}
                >
                    <Input size='large' placeholder="displayName" />
                </Form.Item>
                <Form.Item
                    name="email"
                    rules={[
                        {
                            required: true,
                            message: 'Please input your email!',
                        },
                    ]}
                >
                    <Input size='large' placeholder="email" />
                </Form.Item>
                <Form.Item
                    name="phone"
                    rules={[{ required: true, message: 'Please input your phone number!', }, {
                        pattern: /^[+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[-\s./0-9]*$/,
                        message: 'The input is not a valid phone number!',
                    },
                    ]}
                >
                    <Input size='large' placeholder="Phone Number" />
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
                    <Input.Password size='large' placeholder="password" />
                </Form.Item>
                <Form.Item
                    name="address"
                    rules={[
                        {
                            required: true,
                            message: 'Please input your address!',
                        },
                    ]}
                >
                    <Input size='large' placeholder="address" />
                </Form.Item>
                <Form.Item
                    name="country"
                    rules={[
                        {
                            required: true,
                            message: 'Please input your country!',
                        },
                    ]}
                >
                    <Input size='large' placeholder="country" />
                </Form.Item>



                <Form.Item
                    wrapperCol={{
                        offset: 8,
                        span: 16,
                    }}
                >
                    <Button type="primary" htmlType="submit" disabled={!imageUrl}>
                        Submit
                    </Button>
                </Form.Item>
            </Form>
        </div>
    )
}

export default AddNewUserForm