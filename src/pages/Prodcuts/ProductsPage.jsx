import { Button } from 'antd';
import React, { useContext } from 'react';
import ProductsContext from '../../context/products/ProductsProvider';

import ProductsModal from './ProductsModal';
import ProductsTable from './ProductsTable';



const ProductsPage = () => {

    const {ProductsModalOpened , setProductsModalOpened , selectedBuyer} = useContext(ProductsContext);
    
    
    return (
        <div>
            <Button onClick={()=>setProductsModalOpened(true)} style={{marginBottom:"10px"}} size='large' type='primary'>Add New Product</Button>
            <ProductsTable />
            {
                ProductsModalOpened && <ProductsModal/>
            }
        </div>
    )
}

export default ProductsPage