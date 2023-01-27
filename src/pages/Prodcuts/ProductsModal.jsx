import { Modal } from 'antd'
import React, { useContext } from 'react'
import ProductsContext from '../../context/products/ProductsProvider';
import ProductsForm from './ProductsForm';

const ProductsModal = () => {
    const { ProductsModalOpened, setProductsModalOpened, setSelectedBuyer , selectedBuyer } = useContext(ProductsContext);

    const handleOk = () => {
        setProductsModalOpened(false);
        setSelectedBuyer(null)
    };
    const handleCancel = () => {
        setProductsModalOpened(false);
        setSelectedBuyer(null)
    };

    return (
        <Modal title={selectedBuyer ? "Edit Buyer" :  "Add Buyer"} footer={false} open={ProductsModalOpened} onOk={handleOk} onCancel={handleCancel}>
            <ProductsForm/>
        </Modal>
    )
}

export default ProductsModal