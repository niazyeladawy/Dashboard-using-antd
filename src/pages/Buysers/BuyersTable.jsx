import { Space, Table, Tag } from 'antd';
import Column from 'antd/es/table/Column';
import ColumnGroup from 'antd/es/table/ColumnGroup';
import { collection, doc, getDoc, getDocs } from 'firebase/firestore';
import React, { useEffect, useState } from 'react'
import { db } from '../../components/firebase';
const data = [
    {
        key: '1',
        name: 'John',
        income: 11184,
        id: 32,
        email: 'New York No. 1 Lake Park',
    },
    {
        key: '2',
        name: 'Jim',
        income: 11184,
        id: 42,
        email: 'London No. 1 Lake Park',
    },
    {
        key: '3',
        name: 'Joe',
        income: 11184,
        id: 32,
        email: 'Sidney No. 1 Lake Park',
    },
];
const BuyersTable = () => {

    const [loadingData, setloadingData] = useState(false);
    const [buyersData, setbuyersData] = useState();

    const getBuyers = async () => {
        setloadingData(true)
        let buyersData = []
        const querySnapshot = await getDocs(collection(db, "buyers"));

        querySnapshot.forEach((doc) => {
            // doc.data() is never undefined for query doc snapshots
            buyersData.push(doc.data())

        });

        let modifiedData = [];

        buyersData.forEach((d) => {
            modifiedData.push({
                key: d.id,
                name: d.name,
                income: d.income,
                id: d.id,
                email: d.email,
            })
        })
        setloadingData(false)
        setbuyersData(modifiedData)
    }


    useEffect(() => {
        getBuyers()
    }, [])

    return (
        <Table dataSource={buyersData} loading={loadingData}>

            <Column title="Id" dataIndex="id" key="id" />
            <Column title="Name" dataIndex="name" key="name" />
            <Column title="Email" dataIndex="email" key="email" />
            <Column title="Income" dataIndex="income" key="income" />

            <Column
                title="Action"
                key="action"
                render={(_, record) => (
                    <Space size="middle">
                        <a>Invite {record.lastName}</a>
                        <a>Delete</a>
                    </Space>
                )}
            />
        </Table>
    )
}

export default BuyersTable