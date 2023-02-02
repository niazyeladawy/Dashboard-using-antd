import { Table } from 'antd';
import { collection, getDocs } from 'firebase/firestore';
import React, { useContext, useEffect, useState } from 'react';
import { db } from '../../components/firebase';
import ProductsContext from '../../context/products/ProductsProvider';
import ProductsColumns from './productsColumns';

const ProductsTable = () => {

    const { fetchCount } = useContext(ProductsContext);

    const [loadingData, setloadingData] = useState(false);
    const [ProductsData, setProductsData] = useState();

    const getProducts = async () => {
        setloadingData(true)
        let ProductsData = []
        const querySnapshot = await getDocs(collection(db, "products"));

        querySnapshot.forEach((doc, idx) => {
            // doc.data() is never undefined for query doc snapshots
            const data = doc.data();
            data.id = doc.id;
            //data.date =   data.timeStamp.toDate().toLocaleString();
            ProductsData.push(data)


        });

        // ProductsData.sort(function(a, b) {
        //     // convert the date fields to Date objects
        //     var dateA = new Date(a.date), dateB = new Date(b.date);
        //     return dateB - dateA;
        // });


        let modifiedData = [];


        ProductsData.forEach((d , idx) => {
            modifiedData.push({
                key: d.id,
                name: d.name,
                price: d.price,
                id: d.id,
                short_desc: d.short_desc,
                img: d.img,
                rate: d.rate,
                tax: d.tax,
                discount: d.discount,
                detail_desc: d.detail_desc,
                date: d.date,
                idx : idx +1
            })
        })
        setloadingData(false)
        setProductsData(modifiedData)
    }


    useEffect(() => {
        getProducts()
    }, [fetchCount])

    return (
        <div className='w-100'>


            <Table tableLayout='fixed' scroll={{ x: true }} bordered dataSource={ProductsData} loading={loadingData} columns={ProductsColumns()} pagination={{
                position: ['bottomCenter'],
                pageSize: 5
            }} />
        </div>

    )
}

export default ProductsTable