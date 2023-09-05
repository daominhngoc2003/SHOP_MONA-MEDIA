import { Button, Pagination, Popconfirm, Space, Table, message } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { IProduct } from '../../../types/Product';
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";
import { Image } from 'antd';
import { ICategory } from '../../../types/Category';
import { deleteProduct, SearchProduct } from '../../../api/Product';
import { useContext, useEffect, useState } from 'react';
import { ProductContext } from '../../../provider/ProductProvider';
import { toast } from 'react-toastify';
import { getAllCategory } from '../../../api/Category';

//========================================================================================================
const ProductList = () => {
    const { state: products, dispatch } = useContext(ProductContext);
    const [categories, setCategory] = useState<ICategory[]>([]);
    const [currentPages, setCurrentPage] = useState(1);
    const [totalItems, setTotalItems] = useState(1);
    const [_keywords] = useState('');
    const dataProduct = products.products.docs;
    useEffect(() => {
        (async () => {
            try {
                const { data } = await SearchProduct(currentPages, _keywords);
                if (data) {
                    dispatch({ type: "product/getall", payload: data.products })
                    setTotalItems(data.pagination.totalItems);
                }
                else {
                    toast.error(data)
                }
            } catch (error: any) {
                toast.error(error.response.data.message);
            }
        })()
    }, [currentPages, _keywords])


    // XỬ LÝ KHI CHUYỂN TRANG
    const onHandlePageChange = (page: number) => {
        setCurrentPage(page);
    }

    // Hàm xử lý xóa
    const onHandleRemove = async (_id: string) => {
        try {
            const { data } = await deleteProduct(_id);
            if (data) {
                dispatch({ type: "product/delete", payload: data.product._id })
                toast.success(data.message);
            }
        } catch (error: any) {
            toast.error(error.response.data.message);
        }
    }
    //=====================================CATEGORY===============================
    // LẤY TẤT CẢ DỮ LIỆU danh mục
    useEffect(() => {
        (async () => {
            try {
                const { data } = await getAllCategory();
                if (data) {
                    setCategory(data.categories.docs)
                }
                else {
                    message.error(data.error.response.data.message)
                }

            } catch (error: any) {
                message.error(error.response.data.message);
            }
        })()
    }, [])

    // data table
    const columns: ColumnsType<IProduct> = [
        {
            title: 'Tên sản phẩm',
            dataIndex: 'product_name',
            key: 'name',
            render: (record) => {
                if (record?.length > 15) {
                    return record.slice(0, 15).concat("...");
                } else {
                    return record;
                }
            }
        },
        {
            title: 'Ảnh sản phẩm',
            dataIndex: 'product_images',
            key: 'images',
            render: (record) => {
                return (
                    <Image
                        width={150}
                        src={record?.url}
                    />
                )
            }
        },
        {
            title: 'Giá sản phẩm',
            dataIndex: 'product_price',
            key: 'price',
            sorter: (a, b) => a.product_price - b.product_price,
            render: (record) => `${(record / 1000).toLocaleString('vi-VN')} VND`
        },
        {
            title: 'Khuyến mãi',
            dataIndex: 'product_discount',
            key: 'discount',
            render: (value) => `${value}%`
        },
        {
            title: 'Số lượng',
            dataIndex: 'product_quantity',
            key: 'quantity',
            sorter: (a, b) => a.product_quantity - b.product_quantity,
        },
        {
            title: 'Mô tả',
            dataIndex: 'product_description_sort',
            key: 'description',
            render: (record) => {
                if (record?.length > 15) {
                    return record.slice(0, 15).concat("...");
                } else {
                    return record;
                }
            }
        },
        {
            title: 'Danh mục',
            dataIndex: 'categoryId',
            key: 'categoryId',
            render: (record) => {
                const catename = categories.find(cate => cate._id === record);
                return catename?.category_name;
            }
        },
        {
            title: 'Action',
            key: 'action',
            render: (record) => (
                <Space size="middle">
                    <Popconfirm
                        placement="top"
                        title={"Bạn muốn xóa?"}
                        onConfirm={() => onHandleRemove(record._id)}
                        okText="Yes"
                        cancelText="No"
                    >
                        <Button><DeleteOutlined style={{ fontSize: '20px', color: '#f5222d', outline: 'none' }} /></Button>
                    </Popconfirm>
                    <Button><Link to={`/admin/products/${record._id}/update`}><EditOutlined style={{ fontSize: '20px', color: '#08c' }} /></Link></Button>
                </Space>
            ),
        },
    ];

    return (
        <div>
            <h1 style={{ color: 'red', fontSize: '20px', textAlign: 'center' }}>Quản lý sản phẩm</h1>
            <Table columns={columns} dataSource={dataProduct} />
            <Pagination current={currentPages} total={totalItems} onChange={onHandlePageChange} />
        </div >
    )
}

export default ProductList