import React, { useEffect, useContext } from 'react';
import { Button, Form, Input, Select } from 'antd';
import type { FormInstance } from 'antd/es/form';
import { useNavigate, useParams } from 'react-router-dom';
import { UploadOutlined } from '@ant-design/icons';
import { Upload } from 'antd';
import { IUser } from '../../../types/User';
import { UpdateUser } from '../../../api/User';
import { toast } from 'react-toastify';
import { UserContext } from '../../../provider/UserProvider';
const layout = {
    labelCol: { span: 8 },
    wrapperCol: { span: 16 },
};

const tailLayout = {
    wrapperCol: { offset: 8, span: 16 },
};


const UserUpdate = () => {
    const formRef = React.useRef<FormInstance>(null);
    const { id } = useParams<{ id: string }>();
    const { Option } = Select;
    const { state, dispatch } = useContext(UserContext);
    const navigate = useNavigate();
    console.log(state);



    useEffect(() => {
        const concurren = state?.users?.find((user: IUser) => user._id === id);
        if (concurren) {
            formRef.current?.setFieldsValue(concurren);
        }
    }, [id, state?.users])

    const onFinish = async (user: any) => {
        try {
            // const { images, ...userFields } = user;
            // const image = user?.images?.fileList.map((image: UploadFile) => image.response?.urls[0])
            // const avatar = image[0].url;
            const userReq = { ...user, _id: id }
            const { data } = await UpdateUser(userReq)
            console.log(data);
            if (data) {
                dispatch({ type: "user/update", payload: data.user })
                toast.success(data.message);
                navigate("/admin/users")
            }
        } catch (error: any) {
            toast.error(error.response.data.message);
        }
    };
    return (
        <div>
            <Form
                {...layout}
                ref={formRef}
                name="control-ref"
                onFinish={onFinish}
                style={{ maxWidth: 900 }}
            >

                <Form.Item name="name" label="Tên sản phẩm" rules={[{ required: true, message: "Trường Tên không được để trống" }]}>
                    <Input />
                </Form.Item>
                <Form.Item name="email" label="Email" rules={[{ required: true, message: "Trường Email không được để trống" }]}>
                    <Input type='email' />
                </Form.Item>
                <Form.Item name="phone" label="Số điện thoại" rules={[{ required: true }, { pattern: /^[0-9]*$/, message: "Trường phone chỉ được nhập ký tự từ 0-9" }]}>
                    <Input type='text' />
                </Form.Item>
                <Form.Item name="address" label="Địa chỉ" rules={[{ required: true, message: "Trường Địa chỉ không được để trống" }]}>
                    <Input />
                </Form.Item>
                <Form.Item name="status" label="Trạng thái" rules={[{ required: true, message: "Trường Trạng thái không được để trống" }]}>
                    <Select
                        placeholder="Select a option and change input text above"
                        allowClear
                    >
                        <Option value="Active">Active</Option>
                        <Option value="Ban">Ban</Option>
                    </Select>
                </Form.Item>
                <Form.Item name="role" label="Chức vụ" rules={[{ required: true, message: "Trường Chức vụ không được để trống" }]}>
                    <Select
                        placeholder="Select a option and change input text above"
                        allowClear
                    >

                        <Option value="admin">Admin</Option>
                        <Option value="member">Member</Option>
                    </Select>
                </Form.Item>

                {/* IMAGE */}
                <Form.Item id="images" name="images" label="Ảnh" >
                    <Upload action="http://localhost:8080/api/images/upload" listType="picture" name='images' multiple>
                        <Button icon={<UploadOutlined />}>Choose images</Button>
                    </Upload>
                </Form.Item>

                <Form.Item {...tailLayout}>
                    <Button type="primary" htmlType="submit">
                        Submit
                    </Button>
                </Form.Item>
            </Form>
        </div>
    )
}

export default UserUpdate