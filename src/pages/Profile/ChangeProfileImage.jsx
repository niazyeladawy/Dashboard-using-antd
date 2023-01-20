import { Button, Form, Modal } from 'antd'
import { doc, serverTimestamp, setDoc } from 'firebase/firestore';
import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage';
import React, { useContext, useEffect, useState } from 'react'
import { db, storage } from '../../components/firebase';
import UserContext from '../../context/auth/UserProvider';
import ChangeImageForm from './ChangeImageForm';
const ChangeProfileImage = () => {
    const { user } = useContext(UserContext);

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

    const onFinish = async ({ }) => {
        try {
            await setDoc(doc(db, "users", user.uid), {
                img: imageUrl,
                timeStamp: serverTimestamp()
            }).then((response) => {
                console.log(response.id)
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
        <>
            <Button onClick={showModal} type="primary" size='large'>Change Profile Image</Button>
            <Modal title="Basic Modal" open={isModalOpen} cancelButtonProps={{ style: { display: 'none' } }}
                okButtonProps={{ style: { display: 'none' } }}
                onOk={handleOk} onCancel={handleCancel}>
                <Form
                    name="basic"
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
                        wrapperCol={{
                            offset: 8,
                            span: 16,
                        }}
                    >
                        <div className='submit_btn_wrapper'>
                            <Button size='large' type="primary" htmlType="submit">
                                Submit
                            </Button>
                        </div>

                        

                    </Form.Item>

                </Form>
            </Modal>
        </>
    )
}

export default ChangeProfileImage