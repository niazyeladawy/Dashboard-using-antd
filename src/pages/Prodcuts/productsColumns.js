import { async } from '@firebase/util'
import { Button, notification, Popconfirm, Space, Tooltip } from 'antd'
import Column from 'antd/es/table/Column'
import React, { useContext } from 'react'
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';
import { deleteDoc, doc } from 'firebase/firestore';
import { db } from '../../components/firebase';
import ProductsContext from '../../context/products/ProductsProvider';
import ReactShowMoreText from 'react-show-more-text';

const ProductsColumns = () => {
    const { ProductsModalOpened, setProductsModalOpened, setSelectedBuyer, setFetchCount } = useContext(ProductsContext);

    const handleEdit = (record) => {

        setSelectedBuyer(record)
        setProductsModalOpened(true)
    }

    const handleDelete = async (id) => {
        await deleteDoc(doc(db, "Products", id)).then(() => {
            notification.success({
                message: 'success',
                description: ' successfully Deleted!  ',
                duration: 4,
            })
            setFetchCount((prev) => prev + 1)
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
            title: '#',
            dataIndex: 'idx',
            ellipsis: true,
            fixed: "left"
        },
        {
            title: 'name',
            dataIndex: 'name',
            width: "500px",
            ellipsis: true,
            fixed: "left"
        },
        {
            title: 'price',
            dataIndex: 'price',
            width: "500px",
            render: (_, record) => {
                return <>{record.price} $</>
            },
            ellipsis: true,
        },
        {
            title: 'short description',
            dataIndex: 'short_desc',
            width: "500px",
            ellipsis: true,
        },

        {
            title: 'image',
            dataIndex: 'img',
            width: "500px",
            render: (_, record) => {
                return <> <img src={record.img} style={{ width: "250px", objectFit: "contain", height: '150px' }} alt="" /> </>
            }
        },
        {
            title: 'rate',
            dataIndex: 'rate',
            width: "500px",
        },

        {
            title: 'long description',
            dataIndex: 'detail_desc',
            width: "30%",
            render: (_, record) => {
                return <div style={{width:"280px"}}>
                    <ReactShowMoreText lines={3}
                        more="Show more"
                        less="Show less"
                        className="content-css"
                        anchorClass="show-more-less-clickable"
                        expanded={false}
                        width={280}

                        truncatedEndingComponent={"... "}>
                        {record.detail_desc}
                    </ReactShowMoreText>
                </div>
            }

        },

        {
            title: 'tax',
            dataIndex: 'tax',
            width: "500px",
            render: (_, record) => {
                return <> {record.tax} % </>
            }
            , ellipsis: true,
        },
        {
            title: 'discount',
            dataIndex: 'discount',
            width: "500px",
            render: (_, record) => {
                return <> {record.discount} % </>
            }
            , ellipsis: true,
        },
        {
            title: 'date',
            dataIndex: 'date',
            width: "500px",
            ellipsis: true,
        },

        {
            title: 'actions',
            dataIndex: 'actions',
            width: "500px",
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
            ,
            ellipsis: true,
            fixed: "right"
        }

    ];
}

export default ProductsColumns