import { Space, Table, Popconfirm, Button, Pagination } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { IUser } from '../../../types/User';
import { Image } from 'antd';
import { Link } from 'react-router-dom';
import { useEffect, useContext, useState } from "react";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import { UserContext } from '../../../provider/UserProvider';
import { DeleteUser, SearchUser } from '../../../api/User';
import { toast } from 'react-toastify';
const UserList = () => {
    const { state: users, dispatch } = useContext(UserContext);
    const [currentPages, setCurrentPage] = useState(1);
    const [totalItems, setTotalItems] = useState(1);
    const [_keywords] = useState('');

    // XỬ LÝ KHI CHUYỂN TRANG
    const onHandlePageChange = (page: number) => {
        setCurrentPage(page);
    }
    console.log(users);

    useEffect(() => {
        (async () => {
            try {
                const { data } = await SearchUser(currentPages, _keywords);
                if (data) {
                    dispatch({ type: "user/getall", payload: data.userResponse })
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

    const onHandleRemove = async (_id: string) => {
        try {
            const { data } = await DeleteUser(_id);
            if (data) {
                dispatch({ type: "user/delete", payload: data.user._id })
                toast.success(data.message);
            }
        } catch (error: any) {
            toast.error(error)
        }
    }
    const columns: ColumnsType<IUser> = [
        {
            title: 'Tên người dùng',
            dataIndex: 'user_fullName',
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
            title: 'Ảnh',
            dataIndex: 'user_avatar',
            key: 'avatar',
            render: (record) => <Image width={100} src={record} />
        },
        {
            title: 'Email',
            dataIndex: 'user_email',
            key: 'email',
            // render: (record) => {
            //     if (record.length > 15) {
            //         return record.slice(0, 15).concat("...");
            //     } else {
            //         return record;
            //     }
            // }
        },
        {
            title: 'Số điện thoại',
            dataIndex: 'user_phone',
            key: 'phone',
        },
        {
            title: 'Địa chỉ',
            dataIndex: 'user_address',
            key: 'address',
            render: (record) => {
                if (record?.length > 20) {
                    return record.slice(0, 20).concat("...");
                } else {
                    return record;
                }
            }
        },
        {
            title: 'Chức vụ',
            dataIndex: 'user_role',
            key: 'role',
        },
        {
            title: 'Trạng thái',
            dataIndex: 'user_status',
            key: 'status',
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
                    <Button><Link to={`/admin/users/${record._id}/update`}><EditOutlined style={{ fontSize: '20px', color: '#08c' }} /></Link></Button>
                </Space>
            ),
        },
    ];

    return (
        <div>
            <Table columns={columns} dataSource={users?.users?.docs} />
            <Pagination current={currentPages} total={totalItems} onChange={onHandlePageChange} />
        </div>
    )
}

export default UserList