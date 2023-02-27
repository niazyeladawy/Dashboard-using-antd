import { Modal } from 'antd'
import React, { useContext } from 'react'
import { useTranslation } from 'react-i18next';
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

    const {t} = useTranslation()

    return (
        <Modal title={selectedBuyer ? t('products_page.edpro'): t('products_page.add_btn')} footer={false} open={ProductsModalOpened} onOk={handleOk} onCancel={handleCancel}>
            <ProductsForm/>
        </Modal>
    )
}

export default ProductsModal