import React, { Fragment, useEffect } from 'react';
import style from './Checkout.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { layDanhSachPhongVeAction, quanLyDatVeAction } from '../../redux/actions/QuanLyDatVeAction';
import { CloseCircleOutlined } from '@ant-design/icons';
import { DAT_VE } from '../../redux/actions/types/DatVeType';
import _ from 'lodash';
import { ThongTinDatVe } from '../../_core/models/ThongTinDatVe';


export default function Checkout(props) {

    const { Component, ...restProps } = props;
    const dispatch = useDispatch();

    const { chiTietPhongVe, danhSachGheDangDat } = useSelector(state => state.QuanLyDatVeReducer);

    useEffect(() => {
        let { id } = props.match.params;
        const action = layDanhSachPhongVeAction(id);


        dispatch(action);
    }, []);

    const { thongTinPhim, danhSachGhe } = chiTietPhongVe;



    const renderSeats = () => {
        
        return danhSachGhe?.map((ghe, index) => {
            let gheDaDat = ghe.daDat === true ? 'gheDaDat' : '';
            let gheDangDat = '';
            let viTriDangChon = danhSachGheDangDat.findIndex(gheDD => gheDD.maGhe === ghe.maGhe);
            if ( viTriDangChon !== -1) {
                gheDangDat = 'gheDangDat'
            } else {
                gheDangDat = '';
            }
            return (
                <Fragment key={index}>
                    {ghe.loaiGhe === "Vip" ?
                        <button onClick={() => {
                            dispatch({
                                type: DAT_VE,
                                gheDuocChon: ghe
                            })
                        }} disabled={ghe.daDat} className={`${style['gheVip']} ${style['ghe']} ${style[`${gheDaDat}`]} ${style[`${gheDangDat}`]}`} key={index}>
                            {ghe.daDat === true ? <CloseCircleOutlined style={{ marginBottom: 5 }} /> : ghe.stt}
                        </button> :
                        <button
                            onClick={() => {
                                dispatch({
                                    type: DAT_VE,
                                    gheDuocChon: ghe
                                })
                            }} disabled={ghe.daDat} className={`${style['ghe']} ${style[`${gheDaDat}`]} ${style[`${gheDangDat}`]}`} key={index}>
                            {ghe.daDat === true ? <CloseCircleOutlined style={{ marginBottom: 5 }} /> : ghe.stt}
                        </button>}
                    {(index + 1) % 16 === 0 ? <br /> : ''}
                </Fragment>
            )
        })
    }



    return (
        <div className='min-h-screen p-0'>
            <div className='grid grid-cols-12'>
                <div className='col-span-9'>
                    <div className='flex flex-col justify-center mt-5'>
                        <div className='bg-black' style={{ height: "8px", width: "98%" }}>

                        </div>
                        <div className={`${style['hinh_thang']} text-center`}>
                            <h3 className='text-red-700'>Màn Hình</h3>
                        </div>
                        <div className='container'>
                            {renderSeats()}
                        </div>
                    </div>
                </div>
                <div className='col-span-3 mt-20'>
                    <hr />
                    <h3 className='text-xl text-center text-red-600 py-2'>{thongTinPhim?.tenPhim}</h3>
                    <p>Tên Rạp : {thongTinPhim?.tenCumRap}</p>
                    <p>Địa chỉ : {thongTinPhim?.diaChi}</p>
                    <p>Ngày chiếu : {thongTinPhim?.ngayChieu}</p>
                    <p className='pb-2'>Giờ Chiếu : {thongTinPhim?.gioChieu}</p>
                    <hr />
                    <div className='w-full py-2'>
                        <div className='flex flex-wrap'>
                            <span className='text-red-600'>Ghế :</span>
                            {_.sortBy(danhSachGheDangDat,['stt']).map((gheDD,index)=>{
                                return <span className='text-green-600 px-2' key={index}>{gheDD.stt}</span>
                            })}
                        </div>
                    </div>
                    <hr />
                    <div className='text-left py-2'>
                            <span className='text-red-600 mr-2'>Tổng Tiền : </span>
                            <span className='text-lg text-green-500'>{danhSachGheDangDat.reduce((sum,gheDD,index) => {
                                return sum += gheDD.giaVe*1;
                            },0).toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}</span>
                    </div>
                    <hr />
                    <div className='mt-4'>Email:  .........</div>
                    <div className='mt-4'>SDT:  .........</div>
                    <hr />
                    <div className='flex flex-col justify-end mb-0 items-center'>
                        <button onClick={() => {
                            const thongTinDatVe = new ThongTinDatVe();
                            thongTinDatVe.maLichChieu = props.match.params.id*1;
                            thongTinDatVe.danhSachVe = danhSachGheDangDat;
                            console.log(thongTinDatVe);
                            dispatch(quanLyDatVeAction(thongTinDatVe));
                        }}  className='bg-green-500 text-white py-2 w-full rounded-md cursor-pointer' >
                            ĐẶT VÉ
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}
