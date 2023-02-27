import { DeleteOutlined, EditOutlined } from '@ant-design/icons';
import { Button, notification, Popconfirm, Tooltip } from 'antd';
import { deleteDoc, doc } from 'firebase/firestore';
import React, { useContext } from 'react';
import { useTranslation } from 'react-i18next';
import { db } from '../../components/firebase';
import BuyersContext from '../../context/buyers/BuersProvider';

const BuyersColumns = () => {
    const { buyersModalOpened, setBuyersModalOpened, setSelectedBuyer , setFetchCount  } = useContext(BuyersContext);

    const {t} = useTranslation()

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
            title: t('buyers_page.id'),
            dataIndex: 'id',

        },
        {
            title: t('buyers_page.name'),
            dataIndex: 'name',
        },

        {
            title: t('buyers_page.email'),
            dataIndex: 'email',
        },

        {
            title: t('buyers_page.income'),
            dataIndex: 'income',
        },
        {
            title: t('buyers_page.date'),
            dataIndex: 'date',
        },
        {
            title: t('buyers_page.actions'),
            dataIndex: 'actions',
            render: (_, record) => {
                return (
                    <>
                        <Tooltip title={t('buyers_page.edbuy')}>
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
                            title={t('buyers_page.confirm_delete')}
                            onConfirm={() => handleDelete(record.id)}
                            okText={t('yes')}
                            cancelText={t('no')}

                        >
                            <Tooltip title={t('buyers_page.delbuy')}>
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