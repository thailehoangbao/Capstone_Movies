import React, { useEffect, useState } from 'react';
import {
  Button,
  DatePicker,
  Form,
  InputNumber,
  Select,
} from 'antd';
import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import { quanlyRapService } from '../../../services/QuanLyRapService';
import { useFormik } from 'formik';
import moment from 'moment';
import { taoLichChieuAction } from '../../../redux/actions/QuanLyDatVeAction';
dayjs.extend(customParseFormat);
/** Manually entering any of the following formats will perform date parsing */

const dateFormatList = ['DD/MM/YYYY hh:mm:ss', 'DD/MM/YY hh:mm:ss', 'DD-MM-YYYY hh:mm:ss', 'DD-MM-YY hh:mm:ss'];

export default function Showtime(props) {

  const formik = useFormik({
    initialValues: {
      maPhim: props.match.params.id*1,
      ngayChieuGioChieu: '',
      maRap: '',
      giaVe: 0
    },
    onSubmit: (value) => {
      console.log(value, "value");
      taoLichChieuAction(value);
      console.log("Success")
    }
  });




  const [state, setState] = useState({
    heThongRap: [],
    cumRapChieu: []
  })

  useEffect(async () => {
    try {
      let result = await quanlyRapService.layThongTinTatCaHeThongRap();
      
      setState({
        ...state,
        heThongRap: result.data.content
      })

    } catch (error) {
      console.log('error', error)
    }
  }, [])


  const convertSelectHTR = () => {
    return state.heThongRap?.map((htr, index) => {

      return { label: htr.tenHeThongRap, value: htr.tenHeThongRap }
    })
  }

  const handleChangeHeThongRap = async (value) => {
    try {
      const result = await quanlyRapService.layThongTinCumRapTheoHeThongRap(value);
      setState({
        ...state,
        cumRapChieu: result.data.content
      }, () => {
        console.log(state.cumRapChieu);
      })
    } catch (error) {
      console.log('error', error);
    }
  };

  const convertChangeCumRap = () => {
    return state.cumRapChieu?.map((cumRap, index) => {

      return { label: cumRap.tenCumRap, value: cumRap.maCumRap }
    })
  };

  const handleChangeCumRap = (value) => {
    formik.setFieldValue('maRap', value);
  }

  const handleDatePicker = (value, dateString) => {
    console.log(value, dateString);
    formik.setFieldValue('ngayChieuGioChieu', dateString);
  };

  const onOk = (value, dateString) => {
    console.log(value, dateString);
    formik.setFieldValue('ngayChieuGioChieu', dateString);
  };

  const handleChangeInputNumber = (value) => {
    formik.setFieldValue('giaVe',value)
  }



  return (
    <>
      <Form onSubmitCapture={formik.handleSubmit} labelCol={{ span: 4 }} wrapperCol={{ span: 14 }} layout="horizontal" style={{ maxWidth: 600 }}>
        <h3 className='font-bold text-lg mb-2'>Tạo Lịch Chiếu</h3>
        <Form.Item label="Hệ Thống Rạp">
          <Select options={convertSelectHTR()}
            onChange={handleChangeHeThongRap}
            placeholder='Chọn Hệ Thống Rạp'
          />
        </Form.Item>

        <Form.Item label="Cụm Rạp">
          <Select
            options={convertChangeCumRap()}
            onChange={handleChangeCumRap}
            placeholder='Chọn Cụm Rạp'
          />
        </Form.Item>

        <Form.Item label="Ngày Chiếu Giờ Chiếu" name="ngayChieuGioChieu">
          <DatePicker
            showTime
            onChange={handleDatePicker}
            format="DD/MM/YYYY hh:mm:ss"
            // onOk={onOk}
          />
        </Form.Item>

        <Form.Item label="Giá Vé"  name='giaVe'>
          <InputNumber min={75000} max={150000} defaultValue={75000} onChange={handleChangeInputNumber} />
        </Form.Item>

        <Form.Item label="Action">
          <Button htmlType='submit' className='bg-blue-500 text-white'>Tạo Lịch Chiếu</Button>
        </Form.Item>
      </Form>
    </>
  );
}
