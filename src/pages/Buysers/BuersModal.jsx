import { Modal } from 'antd'
import React, { useContext } from 'react'
import { useTranslation } from 'react-i18next';
import BuyersContext from '../../context/buyers/BuersProvider';
import BuyersForm from './BuyersForm';

const BuersModal = () => {
    const { buyersModalOpened, setBuyersModalOpened, setSelectedBuyer , selectedBuyer } = useContext(BuyersContext);

    const handleOk = () => {
        setBuyersModalOpened(false);
        setSelectedBuyer(null)
    };
    const handleCancel = () => {
        setBuyersModalOpened(false);
        setSelectedBuyer(null)
    };

    const {t} = useTranslation()


    return (
        <Modal title={selectedBuyer ? t('buyers_page.edbuy') :  t('buyers_page.add_btn')} footer={false} open={buyersModalOpened} onOk={handleOk} onCancel={handleCancel}>
            <BuyersForm/>
        </Modal>
    )
}

export default BuersModal