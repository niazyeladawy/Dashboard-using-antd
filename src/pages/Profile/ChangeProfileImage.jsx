import { Button, Form, Input, Modal, notification, Upload } from 'antd'
import { collection, doc, getDoc, getDocs, serverTimestamp, setDoc } from 'firebase/firestore';
import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage';
import React, { useContext, useEffect, useState } from 'react'
import { db, storage } from '../../components/firebase';
import UserContext from '../../context/auth/UserProvider';
import './ChangeProfileImage.scss'

const ChangeProfileImage = () => {
    const { user, firestoreUser, setFirestoreUser } = useContext(UserContext);
    const [per, setPerc] = useState(null);
    const [userFirestoreData, setuserFirestoreData] = useState();
    const [isModalOpen, setIsModalOpen] = useState(false);

    const showModal = () => {
        setIsModalOpen(true);
    };
    const handleOk = () => {
        setIsModalOpen(false);
    };
    const handleCancel = () => {
        setIsModalOpen(false);
    };
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

    const onFinish = async () => {
        try {
            await setDoc(doc(db, "users", user.uid), {
                ...userFirestoreData,
                img: imageUrl,
                updatedAt: serverTimestamp()
            }).then((response) => {
                getUserData()
                setIsModalOpen(false)
                notification.success({
                    message: 'success',
                    description: ' successfully updated  prfile image ',
                    duration: 4,
                });
            }).catch((e) => {
                console.log(e);
            })

        } catch (error) {

        }

    };
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
                    setPerc(progress);

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


    useEffect(() => {
        const docRef = doc(db, 'users', user.uid)
        getDoc(docRef).then((doc) => {
            setuserFirestoreData(doc.data())

        }).catch((err) => {
            console.log(err)
        })
    }, []);

    return (
        <div className='ChangeProfileImage'>
            <Button onClick={showModal} type="primary" size='large'>Change Profile Image</Button>
            <Modal title="Change Profile Image" open={isModalOpen} cancelButtonProps={{ style: { display: 'none' } }}
                okButtonProps={{ style: { display: 'none' } }}
                onOk={handleOk} onCancel={handleCancel}>
                <Form
                    name="basic"
                    onFinish={onFinish}
                    onFinishFailed={onFinishFailed}
                    autoComplete="off"
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
                                    width: '94px',
                                    height: '94px',
                                    margin: '0 auto',
                                    borderRadius: "50%"
                                }}
                            />
                        ) : (
                            firestoreUser ? (<img
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

                    <Form.Item >
                        <div className='submit_btn_wrapper ' style={{ display: 'flex', justifyContent: "center", marginTop: "20px" }}>
                            <Button size='large' disabled={per !== null && per < 100} type="primary" htmlType="submit">
                                Submit
                            </Button>
                        </div>



                    </Form.Item>

                </Form>
            </Modal>
        </div>
    )
}

export default ChangeProfileImage