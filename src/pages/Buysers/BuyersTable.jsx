import { Space, Table, Tag } from 'antd';
import Column from 'antd/es/table/Column';
import ColumnGroup from 'antd/es/table/ColumnGroup';
import { collection, doc, getDoc, getDocs } from 'firebase/firestore';
import React, { useContext, useEffect, useState } from 'react'
import { db } from '../../components/firebase';
import BuyersContext from '../../context/buyers/BuersProvider';
import BuyersColumns from './buyersColumns';

const BuyersTable = () => {

    const { fetchCount } = useContext(BuyersContext);

    const [loadingData, setloadingData] = useState(false);
    const [buyersData, setbuyersData] = useState();

     const getBuyers = async () => {
        setloadingData(true)
        let buyersData = []
        const querySnapshot = await getDocs(collection(db, "buyers"));

        querySnapshot.forEach((doc, idx) => {
            // doc.data() is never undefined for query doc snapshots
            const data = doc.data();
            data.id = doc.id;       
            data.date =   data.timeStamp.toDate().toLocaleString();
            buyersData.push(data)
            console.log("data",data.timeStamp.toDate().toLocaleString())

        });

        buyersData.sort(function(a, b) {
            // convert the date fields to Date objects
            var dateA = new Date(a.date), dateB = new Date(b.date);
            return dateB - dateA;
        });
        

        let modifiedData = [];


        buyersData.forEach((d) => {
            modifiedData.push({
                key: d.id,
                name: d.name,
                income: d.income,
                id: d.id,
                email: d.email,
                date : d.date
            })
        })
        setloadingData(false)
        setbuyersData(modifiedData)
    }

    
    useEffect(() => {
        getBuyers()
    }, [fetchCount])

    return (
        <Table bordered dataSource={buyersData} loading={loadingData} columns={BuyersColumns()} pagination={{
            position: ['bottomCenter'],
            pageSize:10
        }} />


       
    )
}

export default BuyersTable