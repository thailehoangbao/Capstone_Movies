import React from 'react';
import {
    Button,
    Cascader,
    DatePicker,
    Form,
    Input,
    InputNumber,
    Radio,
    Select,
    Switch,
    TreeSelect,
} from 'antd';
import { useState } from 'react';
import { useFormik } from 'formik';
import moment from 'moment/moment';
import { useDispatch } from 'react-redux';
import { themPhimUploadHinhAction } from '../../../../redux/actions/QuanLyPhimAction';
import { GROUPID } from '../../../../utils/settings/config';

export default function AddNew(props) {
    const [imgSrc,setImgSrc] = useState('');
    const dispatch = useDispatch();
    const formik = useFormik({
        initialValues: {
            tenPhim : "",
            trailer : "",
            moTa : "",
            maNhom : 'GP00',
            ngayKhoiChieu : "",
            sapChieu : false,
            dangChieu : false,
            hot : false,
            danhGia : 0,
            hinhAnh : null
        },
onSubmit: (value) => {
    console.log("value: " + value);
    //tạo đối tượng formData
    let formData = new FormData();
    for ( let key in value ) {
        if (key !== 'hinhAnh' ) {
            formData.append( key, value[key]);
        } else {
            formData.append('hinhAnh',value.hinhAnh,value.hinhAnh.name);
        }
    }
    
    
    // goi API đưa form data
    dispatch(themPhimUploadHinhAction(formData));

}
    });

const handleChangeDatePicker = (values) => {
    let ngayKhoiChieu = moment(values).format("DD/MM/YYYY");
    formik.setFieldValue("ngayKhoiChieu",ngayKhoiChieu);
};


const handleChangeSwitch = (name) => {
    return (value) =>{formik.setFieldValue(name,value)}
}

const handleChangeInput = (name) => {
    return (value)=>{formik.setFieldValue(name,value)}
}

const handleChangeFile = (e) => {
    let file = e.target.files[0];
    if (file.type === 'image/png' || file.type === 'image/jpg' || file.type === 'image/gif' || file.type === 'image/jpeg') {
        // tạo đối tượng đọc file
        let reader = new FileReader();
        reader.readAsDataURL(file);// đọc file 
        reader.onload = (e) => {
            // console.log(e.target.result);// trả ra link
            setImgSrc(e.target.result);
        }
        formik.setFieldValue('hinhAnh',file);
    }
}

const [componentSize, setComponentSize] = useState('default');
const onFormLayoutChange = ({ size }) => {
    setComponentSize(size);
};




return (
    <Form
        onSubmitCapture={formik.handleSubmit}
        labelCol={{
            span: 4,
        }}
        wrapperCol={{
            span: 14,
        }}
        layout="horizontal"
        initialValues={{
            size: componentSize,
        }}
        onValuesChange={onFormLayoutChange}
        size={componentSize}
        style={{
            maxWidth: 600,
        }}
    >
        <h3 className='mb-3 font-bold'>Thêm mới phim</h3>
        <Form.Item label="Form Size" name="size">
            <Radio.Group>
                <Radio.Button value="small">Small</Radio.Button>
                <Radio.Button value="default">Default</Radio.Button>
                <Radio.Button value="large">Large</Radio.Button>
            </Radio.Group>
        </Form.Item>
        <Form.Item label="Tên Phim" >
            <Input name="tenPhim" onChange={formik.handleChange}/>
        </Form.Item>
        <Form.Item label="Trailer" >
            <Input name="trailer" onChange={formik.handleChange}/>
        </Form.Item>
        <Form.Item label="Mô Tả" >
            <Input name="moTa" onChange={formik.handleChange}/>
        </Form.Item>
        <Form.Item label="Ngày khởi chiếu"  >
            <DatePicker name="ngayKhoiChieu" onChange={handleChangeDatePicker} format='DD/MM/YYYY'/>
        </Form.Item>
        <Form.Item label="Đang Chiếu">
            <Switch  onChange={handleChangeSwitch('dangChieu')}/>
        </Form.Item>
        <Form.Item label="Sắp Chiếu">
            <Switch  onChange={handleChangeSwitch('sapChieu')}/>
        </Form.Item>
        <Form.Item label="Hot">
            <Switch  onChange={handleChangeSwitch('hot')}/>
        </Form.Item>
        <Form.Item label="Số Sao">
            <InputNumber onChange={handleChangeInput('danhGia')} min={1} max={10}/>
        </Form.Item>
        <Form.Item label="Hình Ảnh">
            <input type="file" onChange={handleChangeFile}/>
            <img src={imgSrc} style={{width:"150px",height:"150px"}} alt="..." className='mt-2'/>
        </Form.Item>
        <Form.Item label="Hành Động">
            <button className='p-2 bg-blue-600 text-white rounded-md' onChange={formik.handleSubmit}>Thêm Phim</button>
        </Form.Item>
    </Form>
);
}
