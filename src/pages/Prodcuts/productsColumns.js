import { DeleteOutlined, EditOutlined } from '@ant-design/icons';
import { Button, notification, Popconfirm, Tooltip } from 'antd';
import { deleteDoc, doc } from 'firebase/firestore';
import React, { useContext } from 'react';
import { useTranslation } from 'react-i18next';
import ReactShowMoreText from 'react-show-more-text';
import { db } from '../../components/firebase';
import ProductsContext from '../../context/products/ProductsProvider';

const ProductsColumns = () => {
    const { ProductsModalOpened, setProductsModalOpened, setSelectedProducts, setFetchCount } = useContext(ProductsContext);
    const {t} = useTranslation()

    const handleEdit = (record) => {

        setSelectedProducts(record)
        setProductsModalOpened(true)
    }

    const handleDelete = async (id) => {
        await deleteDoc(doc(db, "products", id)).then(() => {
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
            title: t('products_page.name'),
            dataIndex: 'name',
            width: "500px",
            ellipsis: true,
            fixed: "left"
        },
        {
            title: t('products_page.price'),
            dataIndex: 'price',
            width: "500px",
            render: (_, record) => {
                return <>{record.price} $</>
            },
            ellipsis: true,
        },
        {
            title: t('products_page.short_description'),
            dataIndex: 'short_desc',
            width: "500px",
            ellipsis: true,
        },

        {
            title: t('products_page.image'),
            dataIndex: 'img',
            width: "500px",
            render: (_, record) => {
                return <> <img src={record.img} style={{ width: "250px", objectFit: "contain", height: '150px' }} alt="" /> </>
            }
        },
        {
            title: t('products_page.rate'),
            dataIndex: 'rate',
            width: "500px",
        },

        {
            title: t('products_page.long_description'),
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
            title: t('products_page.tax'),
            dataIndex: 'tax',
            width: "500px",
            render: (_, record) => {
                return <> {record.tax} % </>
            }
            , ellipsis: true,
        },
        {
            title:  t('products_page.discount'),
            dataIndex: 'discount',
            width: "500px",
            render: (_, record) => {
                return <> {record.discount} % </>
            }
            , ellipsis: true,
        },
        {
            title: t('products_page.date'),
            dataIndex: 'date',
            width: "500px",
            ellipsis: true,
        },

        {
            title:t('products_page.actions'),
            dataIndex: 'actions',
            width: "500px",
            render: (_, record) => {
                return (
                    <>
                        <Tooltip title={t('products_page.edpro')}>
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
                            title={t('products_page.confirm_delete')}
                            onConfirm={() => handleDelete(record.id)}
                            okText={t('yes')}
                            cancelText={t('no')}

                        >
                            <Tooltip title={t('products_page.delpro')}>
                                <Button
                                    style={{ margin: '0 8px' }}
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