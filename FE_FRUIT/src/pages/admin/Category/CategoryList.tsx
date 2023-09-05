import { Pagination, Space, Table } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";
import { ICategory } from '../../../types/Category';
import { Button, Popconfirm } from 'antd';
import { useContext, useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { deleteCategory, getAllCategories } from '../../../api/Category';
import { CategoryContext } from '../../../provider/CategoryProvider';

const CategoryList = () => {
    const { state, dispatch } = useContext(CategoryContext);
    const [currentPages, setCurrentPage] = useState(1);
    const [totalItems, setTotalItems] = useState(1);
    const [_keywords] = useState('');

    //=====================================CATEGORY===============================
    // LẤY TẤT CẢ DỮ LIỆU danh mục
    useEffect(() => {
        (async () => {
            try {
                const { data } = await getAllCategories(currentPages, _keywords);
                if (data) {
                    dispatch({ type: "category/getall", payload: data.categories.docs })
                    setTotalItems(data.pagination.totalItems);
                }
                else {
                    toast.error(data.message)
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

    const onHandleRemove = async (_id: string) => {
        try {
            const { data } = await deleteCategory(_id);
            if (data) {
                dispatch({ type: "category/delete", payload: data.category._id })
                toast.success(data.message);
            }
        } catch (error: any) {
            toast.error(error)
        }
    }

    const columns: ColumnsType<ICategory> = [
        {
            title: 'Tên danh mục',
            dataIndex: 'category_name',
            key: 'name',
        },
        // {
        //     title: 'Ảnh',
        //     dataIndex: 'image',
        //     key: 'image',
        // },
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
                    <Link to={`/admin/categories/${record._id}/update`}><EditOutlined style={{ fontSize: '20px', color: '#08c' }} /></Link>
                </Space>
            ),
        },
    ];
    return (
        <div>
            <h1 style={{ color: 'red', fontSize: '20px', textAlign: 'center' }}>Quản lý danh mục</h1>
            <Table columns={columns} dataSource={state?.categories} rowKey="_id" />
            <Pagination current={currentPages} total={totalItems} onChange={onHandlePageChange} />
        </div>
    )
}

export default CategoryList