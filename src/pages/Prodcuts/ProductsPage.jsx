import { Button } from 'antd';
import React, { useContext } from 'react';
import { useTranslation } from 'react-i18next';
import ProductsContext from '../../context/products/ProductsProvider';

import ProductsModal from './ProductsModal';
import ProductsTable from './ProductsTable';



const ProductsPage = () => {

    const {t} = useTranslation() 

    const {ProductsModalOpened , setProductsModalOpened , selectedBuyer} = useContext(ProductsContext);
    
    
    return (
        <div>
            <Button onClick={()=>setProductsModalOpened(true)} style={{marginBottom:"10px"}} size='large' type='primary'>{t('products_page.add_btn')}</Button>
            <ProductsTable />
            {
                ProductsModalOpened && <ProductsModal/>
            }
        </div>
    )
}

export default ProductsPage