import { Button, Modal } from 'antd'
import React, { useState } from 'react'
import ProfileForm from '../../components/Profile Form/ProfileForm'
import UpdatePassword from './UpdatePassword';

const ProdilePage = () => {

    const [modalOpened, setModalOpened] = useState(false);


    return (
        <div>
            <ProfileForm />
            <Button size='large' type='primary' onClick={() => setModalOpened(true)} >Update Password</Button>
            {
                modalOpened &&
                <Modal title='Update Password' footer={false} open={modalOpened} onCancel={() => setModalOpened(false)}>
                    <UpdatePassword setModalOpened={setModalOpened} />
                </Modal>
            }
        </div>
    )
}

export default ProdilePage