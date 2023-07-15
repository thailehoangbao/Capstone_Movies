import React, { useEffect } from 'react';
import {
    DatePicker,
    Form,
    Input,
    InputNumber,
    Radio,
    Switch,
} from 'antd';
import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import { useState } from 'react';
import { useFormik } from 'formik';
import { useDispatch, useSelector } from 'react-redux';
import { capNhatPhimAction, layThongTinPhimEditAction } from '../../../../redux/actions/QuanLyPhimAction';
import { GROUPID } from '../../../../utils/settings/config';
dayjs.extend(customParseFormat);
const { RangePicker } = DatePicker;

const dateFormat = 'YYYY/MM/DD';
const weekFormat = 'MM/DD';
const monthFormat = 'YYYY/MM';

/** Manually entering any of the following formats will perform date parsing */
const dateFormatList = ['DD/MM/YYYY', 'DD/MM/YY', 'DD-MM-YYYY', 'DD-MM-YY'];



export default function EditAdmin(props) {
    const [imgSrc, setImgSrc] = useState('');
    const dispatch = useDispatch();
    const { filmEdit } = useSelector(state => state.QuanLyPhimReducer);

    console.log(filmEdit,"filmEdit");
    useEffect(() => {
        const id = props.match.params.id;
        const action = layThongTinPhimEditAction(id);
        dispatch(action);
    }, []);


    const formik = useFormik({
        enableReinitialize: true,
        initialValues: {
            maPhim: filmEdit.maPhim,
            tenPhim: filmEdit.tenPhim,
            trailer: filmEdit.trailer,
            moTa: filmEdit.moTa,
            maNhom: GROUPID,
            ngayKhoiChieu: filmEdit.ngayKhoiChieu,
            sapChieu: filmEdit.sapChieu,
            dangChieu: filmEdit.dangChieu,
            hot: filmEdit.hot,
            danhGia: filmEdit.danhGia,
            hinhAnh: null
        },
        onSubmit: (value) => {
            console.log("value", value);
            //tạo đối tượng formData
            let formData = new FormData();
            for (let key in value) {
                if (key !== 'hinhAnh') {
                    formData.append(key, value[key]);
                } else {
                    if (value.hinhAnh !== null) {
                        formData.append('hinhAnh', value.hinhAnh, value.hinhAnh.name);
                    }
                }
            }
            dispatch(capNhatPhimAction(formData));

        }
    });

    const handleChangeDatePicker = (values) => {
        let ngayKhoiChieu = values;
        console.log("ngayKhoiChieuLayTuInput",ngayKhoiChieu)
        const date = new Date(ngayKhoiChieu);
        const day = date.getDate();
        const month = date.getMonth() + 1;
        const year = date.getFullYear();

        const formattedDate = `${day < 10 ? '0' + day : day}/${month < 10 ? '0' + month : month}/${year}`;
        console.log(formattedDate, "ngayKhoiChieu");
        formik.setFieldValue("ngayKhoiChieu", formattedDate);
    };


    const handleChangeSwitch = (name) => {
        return (value) => { formik.setFieldValue(name, value) }
    }

    const handleChangeInput = (name) => {
        return (value) => { formik.setFieldValue(name, value) }
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
            formik.setFieldValue('hinhAnh', file);
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
                <Input name="tenPhim" onChange={formik.handleChange} value={formik.values.tenPhim} />
            </Form.Item>
            <Form.Item label="Trailer" >
                <Input name="trailer" onChange={formik.handleChange} value={formik.values.trailer} />
            </Form.Item>
            <Form.Item label="Mô Tả">
                <Input name="moTa" onChange={formik.handleChange} value={formik.values.moTa} />
            </Form.Item>
            <Form.Item label="Ngày khởi chiếu" >
                <DatePicker
                    name="ngayKhoiChieu"
                    onChange={handleChangeDatePicker}
                    defaultValue={dayjs('01/01/2015', dateFormatList[0])}
                    format={dateFormatList}
                    value={dayjs(formik.values.ngayKhoiChieu, dateFormatList)}
                />
            </Form.Item>
            <Form.Item label="Đang Chiếu">
                <Switch onChange={handleChangeSwitch('dangChieu')} checked={formik.values.dangChieu} />
            </Form.Item>
            <Form.Item label="Sắp Chiếu">
                <Switch onChange={handleChangeSwitch('sapChieu')} checked={formik.values.sapChieu} />
            </Form.Item>
            <Form.Item label="Hot">
                <Switch onChange={handleChangeSwitch('hot')} checked={formik.values.hot} />
            </Form.Item>
            <Form.Item label="Số Sao">
                <InputNumber onChange={handleChangeInput('danhGia')} min={1} max={10} value={formik.values.danhGia} />
            </Form.Item>
            <Form.Item label="Hình Ảnh">
                <input type="file" onChange={handleChangeFile} defaultValue={formik.values.hinhAnh} />
                <img src={imgSrc === '' ? filmEdit.hinhAnh : imgSrc} style={{ width: "150px", height: "150px" }} alt="..." className='mt-2' />
            </Form.Item>
            <Form.Item label="Hành Động">
                <button className='p-2 bg-slate-500 text-white rounded-md' onChange={formik.handleSubmit}>Edit Phim</button>
            </Form.Item>
        </Form>
    );
}
