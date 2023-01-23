import { Modal } from 'antd'
import React, { useContext } from 'react'
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

    return (
        <Modal title={selectedBuyer ? "Edit Buyer" :  "Add Buyer"} footer={false} open={buyersModalOpened} onOk={handleOk} onCancel={handleCancel}>
            <BuyersForm/>
        </Modal>
    )
}

export default BuersModal