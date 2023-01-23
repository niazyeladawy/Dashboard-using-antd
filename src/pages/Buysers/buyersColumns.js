import { async } from '@firebase/util'
import { Button, notification, Popconfirm, Space, Tooltip } from 'antd'
import Column from 'antd/es/table/Column'
import React, { useContext } from 'react'
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';
import BuyersContext from '../../context/buyers/BuersProvider';
import { deleteDoc, doc } from 'firebase/firestore';
import { db } from '../../components/firebase';

const BuyersColumns = () => {
    const { buyersModalOpened, setBuyersModalOpened, setSelectedBuyer , setFetchCount  } = useContext(BuyersContext);

    const handleEdit = (record) => {
       
        setSelectedBuyer(record)
        setBuyersModalOpened(true)
    }

    const handleDelete = async (id) => {
        await deleteDoc(doc(db, "buyers", id)).then(() => {
            notification.success({
                message: 'success',
                description: ' successfully Deleted!  ',
                duration: 4,
            })
            setFetchCount((prev) => prev +1)
        }).catch((e) => {
            notification.error({
                message: 'error',
                description: '  error while deleting!  ',
                duration: 4,
            })
        })

    }

    return [
        {
            title: 'id',
            dataIndex: 'id',

        },
        {
            title: 'name',
            dataIndex: 'name',
        },

        {
            title: 'email',
            dataIndex: 'email',
        },

        {
            title: 'income',
            dataIndex: 'income',
        },
        {
            title: 'date',
            dataIndex: 'date',
        },
        {
            title: 'actions',
            dataIndex: 'actions',
            render: (_, record) => {
                return (
                    <>
                        <Tooltip title="edit buyer ">
                            <Button
                                className="edit-btn"
                                onClick={(key) => handleEdit(record)}
                                size="large"
                                type="dashed"
                                shape="circle"
                                icon={<EditOutlined />}
                            />
                        </Tooltip>
                        <Popconfirm
                            title="Are you sure you want to delete this buyer?"
                            onConfirm={() => handleDelete(record.id)}
                            okText="Yes"
                            cancelText="No"

                        >
                            <Tooltip title="delete buyer ">
                                <Button
                                    style={{ marginLeft: '5px' }}
                                    className="delete-btn"
                                    size="large"
                                    type="dashed"
                                    shape="circle"
                                    icon={<DeleteOutlined />}
                                />
                            </Tooltip>
                        </Popconfirm>
                    </>

                );
            }
        }

    ];
}

export default BuyersColumns