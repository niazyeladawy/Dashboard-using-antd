import { Button, Form, Input, InputNumber, notification, Progress, Spin, Upload } from 'antd'
import { doc, getDoc, serverTimestamp, setDoc, updateDoc } from 'firebase/firestore';
import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage';
import React, { useContext, useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next';
import { PhoneInput } from 'react-international-phone';
import UserContext from '../../context/auth/UserProvider';
import { db, storage } from '../firebase';

import './profileform.scss'

const ProfileForm = () => {

    const {t} = useTranslation()

    const { user, firestoreUser, setFirestoreUser } = useContext(UserContext);
    const [per, setPerc] = useState(null);
    const [userFirestoreData, setuserFirestoreData] = useState();
    const [dataLoading, setdataLoading] = useState(false);
    const [phone, setPhone] = useState('');


    const [file, setFile] = useState("");
    const [imageUrl, setImageUrl] = useState("");

    const getUserData = async () => {
        const docRef = doc(db, "users", user.uid);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
            setFirestoreUser(docSnap.data())
        } else {
            // doc.data() will be undefined in this case
        }
    }

    const onFinish = async (values) => {
        const cleanValues = Object.keys(values).reduce((acc, key) => {
            if (values[key] !== undefined) {
                acc[key] = values[key];
            }
            return acc;
        }, {});
        try {
            await updateDoc(doc(db, "users", user.uid), {
                ...userFirestoreData,
                ...cleanValues,
                img: imageUrl ? imageUrl : firestoreUser?.img,
                phoneNumber: phone ? phone : firestoreUser?.phoneNumber,
                updatedAt: serverTimestamp()
            });

            getUserData();

            notification.success({
                message: 'success',
                description: 'Successfully updated profile',
                duration: 4,
            });
        } catch (e) {
            console.error(e);
            notification.error({
                message: 'error',
                description: 'Failed to update profile',
                duration: 4,
            });
        }

    };


    useEffect(() => {
        const uploadFile = () => {
            const name = new Date().getTime() + file.name;
            const storageRef = ref(storage, name);
            const uploadTask = uploadBytesResumable(storageRef, file);

            uploadTask.on('state_changed',
                (snapshot) => {
                    const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;

                    setPerc(progress.toFixed());

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

    const [form] = Form.useForm()

    useEffect(() => {
        const docRef = doc(db, 'users', user.uid)
        setdataLoading(true);
        getDoc(docRef).then((doc) => {
            setuserFirestoreData(doc.data());
            form.setFieldsValue(doc.data());

            if (doc.data().phoneNumber) {
                setPhone(doc.data().phoneNumber)
            }
            setdataLoading(false);
        }).catch((err) => {
            setdataLoading(false);
        })
    }, [user.uid]);




    return (
        <div className='row'>


            <div className='profile_img d-flex  my-2'>
                {dataLoading ? <div className='d-flex justify-content-center align-items-center w-100 '><Spin size='large' /></div> : <div className='col-md-6'>
                    <Form
                        form={form}
                        className='w-100'
                        name="profile"
                        onFinish={onFinish}
                        autoComplete="off"
                        layout='vertical'
                    >

                        <Upload
                            listType="picture-card"
                            className="avatar-uploader rounded-circle"
                            showUploadList={false}
                            onChange={(e) => setFile(e.file.originFileObj)}

                        >
                            {imageUrl ? (
                                <img
                                    src={imageUrl}
                                    alt="avatar"
                                    style={{
                                        width: '94px',
                                        height: '94px',
                                        margin: '0 auto',
                                        borderRadius: "50%"
                                    }}
                                />
                            ) : (
                                firestoreUser?.img ? (<img
                                    src={firestoreUser.img}
                                    alt="avatar"
                                    style={{
                                        width: '94px',
                                        height: '94px',
                                        margin: '0 auto',
                                        borderRadius: "50%"
                                    }}
                                />) : "upload"
                            )}
                        </Upload>
                        {file && <Progress percent={per ? per : ""} />}

                        <Form.Item name="username" label={<span style={{ fontSize: '18px' }}>{t('user.username')}</span>}>
                            <Input type='text' className='w-100' size='large' />
                        </Form.Item>

                        <Form.Item name="email" label={<span style={{ fontSize: '18px' }}>{t('user.email')}</span>}>
                            <Input type='text' className='w-100' size='large' />
                        </Form.Item>

                        <Form.Item name="age" label={<span style={{ fontSize: '18px' }}>{t('user.age')}</span>}>
                            <InputNumber className='w-100' size='large' min={1} max={120} />
                        </Form.Item>


                        <PhoneInput
                            initialCountry="eg"
                            value={phone}
                            onChange={(phone) => setPhone(phone)}
                            style={{ marginBottom: '24px', width: "100%" }}
                            placeholder={t('user.phoneNumber')}
                        />

                        <Form.Item >
                            <div className='submit_btn_wrapper ' style={{ display: 'flex', justifyContent: "center", marginTop: "20px" }}>
                                <Button size='large' disabled={per !== null && per < 100} type="primary" htmlType="submit">
                                    Submit
                                </Button>
                            </div>



                        </Form.Item>

                    </Form>
                </div>}
            </div>
        </div>
    )
}

export default ProfileForm