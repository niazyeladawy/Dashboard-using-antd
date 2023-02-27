import { Button, Modal } from 'antd'
import React, { useState } from 'react'
import { useTranslation } from 'react-i18next';
import ProfileForm from '../../components/Profile Form/ProfileForm'
import UpdatePassword from './UpdatePassword';

const ProdilePage = () => {

    const [modalOpened, setModalOpened] = useState(false);

    const {t} = useTranslation() 

    return (
        <div>
            <ProfileForm />
            <Button size='large' type='primary' onClick={() => setModalOpened(true)} >{t('user.updatePassword')}</Button>
            {
                modalOpened &&
                <Modal title={t('user.updatePassword')} footer={false} open={modalOpened} onCancel={() => setModalOpened(false)}>
                    <UpdatePassword setModalOpened={setModalOpened} />
                </Modal>
            }
        </div>
    )
}

export default ProdilePage