import React, { useContext, useEffect, useState } from 'react';
import { Button, Form, Input, Select } from 'antd';
import type { FormInstance } from 'antd/es/form';
import { Upload, message } from 'antd';
import { UploadOutlined } from "@ant-design/icons";
import type { UploadFile } from 'antd/es/upload/interface';
import { addProduct } from '../../../api/Product';
import { ProductContext } from '../../../provider/ProductProvider';
import { useNavigate } from 'react-router-dom';
import { toast } from "react-toastify";
import { ICategory } from '../../../types/Category';
import { getAllCategory } from '../../../api/Category';
const layout = {
    labelCol: { span: 8 },
    wrapperCol: { span: 16 },
};

const tailLayout = {
    wrapperCol: { offset: 8, span: 16 },
};


///////////////////////////////////////

const ProductAdd = () => {
    const formRef = React.useRef<FormInstance>(null);
    const { TextArea } = Input;
    const { Option } = Select;
    const { dispatch } = useContext(ProductContext);
    const navigate = useNavigate();
    const [categories, setCategory] = useState<ICategory[]>([]);


    const onFinish = async (product: any) => {
        try {
            const image = product?.product_images?.fileList.map((image: UploadFile) => image.response?.urls[0])
            const product_images = image[0];
            const productReq = { ...product, product_images }
            const { data } = await addProduct(productReq)
            if (data) {
                dispatch({ type: "product/add", payload: data.product })
                toast.success(data.message);
                navigate("/admin/products")
            }
            // console.log(data);

        } catch (error: any) {
            toast.error(error?.response?.data?.message);
            console.log(error?.response?.data?.message);

        }
    };

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
                toast.error(error.response.data.message);
            }
        })()
    }, [])

    return (
        <div>
            <Form
                {...layout}
                ref={formRef}
                name="control-ref"
                onFinish={onFinish}
                style={{ maxWidth: 900 }}
            >
                <Form.Item name="categoryId" label="CategoryId" rules={[{ required: true }]}>
                    <Select
                        placeholder="Select a option and change input text above"
                        allowClear
                    >
                        {categories.map((cate, index) => {
                            return (
                                <Option key={index} value={cate._id}>{cate.category_name}</Option>
                            )
                        })}
                    </Select>
                </Form.Item>

                <Form.Item id="name" name="product_name" label="Tên sản phẩm" rules={[{ required: true, message: 'Trường tên sản phẩm không được để trống' }, { whitespace: true, message: 'Không được nhập space đầu tiên' }, { min: 3, message: 'Trường tên sản phẩm phải lớn hơn 3 ký tự' }, { max: 50, message: 'Trường tên sản phẩm không được vượt quá 50 ký tự' }]}>
                    <Input />
                </Form.Item>
                <Form.Item id="price" name="product_price" label="Giá sản phẩm" rules={[{ required: true, message: 'Trường giá không được để trống' }, { whitespace: true, message: 'Không được nhập space đầu tiên' }, { pattern: /^[0-9]+$/, message: 'Trường giảm giá chỉ cho phép nhập số từ 0-9' }]}>
                    <Input type='number' min={0} />
                </Form.Item>
                <Form.Item id="discount" name="product_discount" label="Giảm giá (%)" rules={[{ pattern: /^[0-9]+$/, message: 'Trường giảm giá chỉ cho phép nhập số từ 0-9' }, { whitespace: true, message: 'Không được nhập space đầu tiên' },]} >
                    <Input type='number' min={0} max={100} maxLength={2} />
                </Form.Item>
                <Form.Item id="quantity" name="product_quantity" label="Số lượng" rules={[{ required: true, message: 'Trường số lượng không được để trống' }, { pattern: /^[0-9]+$/, message: 'Trường giảm giá chỉ cho phép nhập số từ 0-9' }, { whitespace: true, message: 'Không được nhập space đầu tiên' }]}>
                    <Input type='number' min={0} />
                </Form.Item>
                <Form.Item id="description" name="product_description_long" label="Mô tả dài" rules={[{ required: true, message: 'Trường mô tả không được để trống' }, { min: 6, message: 'Trường mô tả phải lớn hơn 6 ký tự' }, { max: 255, message: 'Trường mô tả không được vượt quá 255 ký tự' }, { whitespace: true, message: 'Không được nhập space đầu tiên' },]}>
                    <TextArea rows={4} placeholder="maxLength is 2" minLength={2} />
                </Form.Item>
                <Form.Item id="description" name="product_description_sort" label="Mô tả ngắn" rules={[{ required: true, message: 'Trường mô tả không được để trống' }, { min: 6, message: 'Trường mô tả phải lớn hơn 6 ký tự' }, { max: 255, message: 'Trường mô tả không được vượt quá 255 ký tự' }, { whitespace: true, message: 'Không được nhập space đầu tiên' },]}>
                    <TextArea rows={4} placeholder="maxLength is 2" minLength={2} />
                </Form.Item>

                {/* IMAGE */}
                <Form.Item id="images" name="product_images" label="Ảnh" rules={[{ required: true, message: 'Trường ảnh không được để trống' }]}>
                    <Upload action="https://tclq6w-8080.csb.app/api/images/upload" listType="picture" name='images' multiple>
                        <Button icon={<UploadOutlined />}>Choose images</Button>
                    </Upload>
                </Form.Item>

                <Form.Item {...tailLayout}>
                    <Button type="primary" htmlType="submit">
                        Submit
                    </Button>
                </Form.Item>
            </Form>
        </div >
    )
}

export default ProductAdd