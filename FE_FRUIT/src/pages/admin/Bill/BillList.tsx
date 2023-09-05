import { Pagination, Space, Table } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";
import { Button, Popconfirm } from 'antd';
import { useContext, useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { BillContext } from '../../../provider/BillReducer';
import { GetAllBill } from '../../../api/Bill';

const BillList = () => {
    const { state: bills, dispatch } = useContext(BillContext);
    console.log(bills);
    useEffect(() => {
        (async () => {
            try {
                const { data } = await GetAllBill();
                if (data) {
                    dispatch({ type: "bill/getAllBill", payload: data.bills })
                }
                else {
                    toast.error(data.message)
                }

            } catch (error: any) {
                toast.error(error.response.data.message);
            }
        })()
    }, [])

    const onHandleRemove = async (_id: string) => {
        // try {
        //     const { data } = await deleteCategory(_id);
        //     if (data) {
        //         dispatch({ type: "category/delete", payload: data.category._id })
        //         toast.success(data.message);
        //     }
        // } catch (error: any) {
        //     toast.error(error)
        // }
    }
    // <th scope="col" className="max-w-[5px] py-1">Id</th>
    //                         <th scope="col" className="max-w-[25px] py-1">Tên khách hàng</th>
    //                         <th scope="col" className="max-w-[25px] py-1">Số điện thoại</th>
    //                         <th scope="col" className="max-w-[40px] py-2">Địa chỉ giao hàng</th>
    //                         <th scope="col" className="max-w-[35px] py-2">Phương thức thanh toán</th>
    //                         <th scope="col" className="max-w-[25px] py-1">Trạng thái thanh toán</th>
    //                         <th scope="col" className="max-w-[30px] py-2">Trạng thái đơn hàng</th>
    <th scope="col" className="max-w-[20px] py-2">Hành động</th>

    const columns: ColumnsType<any> = [
        {
            title: 'Id',
            dataIndex: 'id',
            key: '_id',
        },
        {
            title: 'Tên khách hàng',
            dataIndex: 'userId',
            key: 'userId',
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
    console.log("tab", columns);

    return (
        <div>
            <h1 style={{ color: 'red', fontSize: '20px', textAlign: 'center' }}>Quản lý hóa đơn</h1>
            {/* <Table columns={columns} dataSource={bills} rowKey="_id" />
            <Pagination current={currentPages} total={totalItems} onChange={onHandlePageChange} /> */}
        </div>
    )
}

export default BillList