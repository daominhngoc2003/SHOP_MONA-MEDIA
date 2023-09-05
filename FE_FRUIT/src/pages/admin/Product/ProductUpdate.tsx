import React, { useEffect, useContext, useState } from 'react';
import { Button, Form, Input, Select, Upload, UploadFile } from 'antd';
import type { FormInstance } from 'antd/es/form';
import { UploadOutlined } from '@ant-design/icons';
import { ICategory } from '../../../types/Category';
import { useParams } from 'react-router-dom';
import { getProductById, udpateProduct } from '../../../api/Product';
import { ProductContext } from '../../../provider/ProductProvider';
import { useNavigate } from 'react-router-dom';
import { toast } from "react-toastify";
import { getAllCategory } from '../../../api/Category';
const { Dragger } = Upload;
const layout = {
    labelCol: { span: 8 },
    wrapperCol: { span: 16 },
};

const tailLayout = {
    wrapperCol: { offset: 8, span: 16 },
};


const ProductUpdate = () => {
    const formRef = React.useRef<FormInstance>(null);
    const { TextArea } = Input;
    const { Option } = Select;
    const { state: product, dispatch } = useContext(ProductContext);
    const { products } = product
    const publicIdImage = products?.product_images?.publicId;

    const navigate = useNavigate();
    const [categories, setCategory] = useState<ICategory[]>([]);
    const { id } = useParams<{ id: string }>()
    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const { data } = await getProductById(id as any)
                dispatch({ type: "product/getDetail", payload: data.product })
                formRef.current?.setFieldsValue(data.product);
            } catch (error: any) {
                toast.error(error.response.data.message);
            }
        }
        fetchProduct();
    }, [dispatch, id])

    //=====================================CATEGORY===============================
    // LẤY TẤT CẢ DỮ LIỆU danh mục
    useEffect(() => {
        (async () => {
            try {
                const { data } = await getAllCategory();
                if (data) {
                    setCategory(data.categories.docs)
                }

            } catch (error: any) {
                toast.error(error.response.data.message);
            }
        })()
    }, [])


    const onFinish = async (product: any) => {
        try {
            const image = product?.product_images?.fileList?.map((image: UploadFile) => image.response)
            const product_images = image[0];

            const productUpdate = {
                _id: id,
                ...product,
                product_images
            }

            const { data } = await udpateProduct(productUpdate)

            if (data) {
                dispatch({ type: "product/update", payload: data.productUpdate })
                toast.success(data.message);
                navigate("/admin/products");
            }
        } catch (error: any) {
            toast.error(error?.response?.data?.message);
        }
    };

    return (
        <Form
            {...layout}
            ref={formRef}
            name="control-ref"
            onFinish={onFinish}
            style={{ maxWidth: 600 }}
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
            <Form.Item
                id="product_name"
                name="product_name"
                label="Tên sản phẩm"
                rules={[{
                    required: true,
                    message: 'Trường tên sản phẩm không được để trống'
                },
                {
                    min: 2,
                    message: 'Trường tên sản phẩm phải lớn hơn 2 ký tự'
                },
                {
                    max: 255,
                    message: 'Trường tên sản phẩm không được vượt quá 255 ký tự'
                }]}>
                <Input />
            </Form.Item>
            <Form.Item
                id="product_price"
                name="product_price"
                label="Giá sản phẩm"
                rules={[{ required: true, message: 'Trường giá không được để trống' }]}>
                <Input type='number' />
            </Form.Item>
            <Form.Item
                id="discount"
                name="product_discount"
                label="Giảm giá (%)" >
                <Input type='number' maxLength={5} />
            </Form.Item>
            <Form.Item
                id="quantity"
                name="product_quantity"
                label="Số lượng"
                rules={[{ required: true, message: 'Trường số lượng không được để trống' }]}>
                <Input type='number' />
            </Form.Item>
            <Form.Item id="description"
                name="product_description_long"
                label="Mô tả dài"
                rules={[{ required: true, message: 'Trường mô tả không được để trống' }, { min: 6, message: 'Trường mô tả phải lớn hơn 6 ký tự' }, { max: 255, message: 'Trường mô tả không được vượt quá 255 ký tự' }]}>
                <TextArea rows={4} placeholder="maxLength is 2" minLength={2} />
            </Form.Item>
            <Form.Item id="description"
                name="product_description_sort"
                label="Mô tả ngắn"
                rules={[{ required: true, message: 'Trường mô tả không được để trống' }, { min: 6, message: 'Trường mô tả phải lớn hơn 6 ký tự' }, { max: 255, message: 'Trường mô tả không được vượt quá 255 ký tự' }]}>
                <TextArea rows={4} placeholder="maxLength is 2" minLength={2} />
            </Form.Item>


            {/* IMAGE */}
            <Form.Item id="images"
                name="product_images"
                label="Ảnh"
                rules={[{ required: true, message: 'Trường ảnh không được để trống' }]}>
                <Dragger
                    action={`https://tclq6w-8080.csb.app/api/images/${publicIdImage}`}
                    listType="picture"
                    name='images'
                    method='put'
                    multiple>
                    <Button icon={<UploadOutlined />}>Choose images</Button>
                </Dragger>
            </Form.Item>

            <Form.Item {...tailLayout}>
                <Button type="primary" htmlType="submit">
                    Submit
                </Button>
            </Form.Item>
        </Form>
    );
};

export default ProductUpdate