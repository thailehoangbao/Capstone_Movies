import React, { Fragment, useEffect } from 'react';
import style from './Checkout.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { datVeWebRocketAction, layDanhSachPhongVeAction, quanLyDatVeAction } from '../../redux/actions/QuanLyDatVeAction';
import { CloseCircleOutlined, UserOutlined, RollbackOutlined } from '@ant-design/icons';
import _ from 'lodash';
import { ThongTinDatVe } from '../../_core/models/ThongTinDatVe';
import { Tabs } from 'antd';
import TabPane from 'antd/es/tabs/TabPane';
import { layThongTinNguoiDungAction } from '../../redux/actions/QuanLyNguoiDungDangKyAction';
import moment from 'moment';
import { history } from '../../App';
import { CHUYEN_TABS } from '../../redux/actions/types/QuanLyDatVeType';
import { connection } from '../../index'



function Checkout(props) {

    const { Component, ...restProps } = props;
    const dispatch = useDispatch();

    const { chiTietPhongVe, danhSachGheDangDat, danhSachGheKhachDat } = useSelector(state => state.QuanLyDatVeReducer);

    const { userLogin } = useSelector(state => state.QuanLyNguoiDungReducer);

    useEffect(() => {
        let { id } = props.match.params;
        const action = layDanhSachPhongVeAction(id);

        dispatch(action);
        //load danh sách ghế đã đặt từ backend trả về
        connection.on('loadDanhSachGheKhachDaDat', (dsGheKhachDat) => {
            console.log("dsGheKhachDat", dsGheKhachDat);
        })
    }, []);

    const { thongTinPhim, danhSachGhe } = chiTietPhongVe;



    const renderSeats = () => {

        return danhSachGhe?.map((ghe, index) => {
            let gheDaDat = ghe.daDat === true ? 'gheDaDat' : '';
            let gheDangDat = '';
            let viTriDangChon = danhSachGheDangDat.findIndex(gheDD => gheDD.maGhe === ghe.maGhe);
            let gheDaDuocDat = '';


            //kiểm tra từng ghế render xem có phải ghế khách đặt hay kg
            let gheKhachDat = '';
            let vitriGheKhachDat = danhSachGheKhachDat.findIndex(gheKD => gheKD.maGhe === ghe.maGhe);
            if (vitriGheKhachDat !== -1) {
                gheKhachDat = 'gheKhachDangDat';
            }


            if (userLogin.taiKhoan === ghe.taiKhoanNguoiDat) {
                gheDaDuocDat = 'gheDaDuocDat';
            }


            if (viTriDangChon !== -1) {
                gheDangDat = 'gheDangDat'
            } else {
                gheDangDat = '';
            }

            const iconCloseCircleOutlined = (ghe) => {
                if (gheDaDuocDat || gheKhachDat !== '') {
                    return <UserOutlined style={{ marginBottom: 5 }} />
                } else {
                    if (ghe.daDat === true) {
                        return < CloseCircleOutlined style={{ marginBottom: 5 }} />
                    }
                    return ghe.stt
                }
            }

            return (
                <Fragment key={index}>
                    {ghe.loaiGhe === "Vip" ?
                        <button onClick={() => {
                            const action = datVeWebRocketAction(ghe, props.match.params.id);
                            dispatch(action);
                        }} disabled={ghe.daDat || gheKhachDat !== ''} className={`${style['gheVip']} ${style['ghe']} ${style[`${gheDaDat}`]} ${style[`${gheDangDat}`]} ${style[`${gheDaDuocDat}`]} ${style[`${gheKhachDat}`]}`} key={index}>
                            {iconCloseCircleOutlined(ghe)}
                        </button> :
                        <button onClick={() => {
                            const action = datVeWebRocketAction(ghe, props.match.params.id);
                            dispatch(action);
                        }} disabled={ghe.daDat || gheKhachDat !== ''} className={`${style['ghe']} ${style[`${gheDaDat}`]} ${style[`${gheDangDat}`]} ${style[`${gheDaDuocDat}`]} ${style[`${gheKhachDat}`]}`} key={index}>
                            {iconCloseCircleOutlined(ghe)}
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
                    <div className='mt-5 flex justify-center'>
                        <table className='min-w-full divide-y divide-gray-300 text-center'>
                            <thead>
                                <tr>
                                    <th>Ghế Thường</th>
                                    <th>Ghế VIP</th>
                                    <th>Ghế Đã Đặt</th>
                                    <th>Ghế Bạn Đã Chọn</th>
                                    <th>Ghế Đang Chọn</th>
                                    <th>Ghế Khách Đang Đặt</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>
                                        <button className={`${style['ghe']}`}>00</button>
                                    </td>
                                    <td>
                                        <button className={`${style['ghe']} ${style['gheVip']}`}>00</button>
                                    </td>
                                    <td>
                                        <button className={`${style['ghe']} ${style['gheDaDat']}`}>< CloseCircleOutlined style={{ marginBottom: 5 }} /></button>
                                    </td>
                                    <td>
                                        <button className={`${style['ghe']} ${style['gheDaDuocDat']}`}><UserOutlined style={{ marginBottom: 5 }} /></button>
                                    </td>
                                    <td>
                                        <button className={`${style['ghe']} ${style['gheDangDat']}`}>00</button>
                                    </td>
                                    <td>
                                        <button className={`${style['ghe']} ${style['gheKhachDangDat']}`}><UserOutlined style={{ marginBottom: 5 }} /></button>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
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
                            {_.sortBy(danhSachGheDangDat, ['stt']).map((gheDD, index) => {
                                return <span className='text-green-600 px-2' key={index}>{gheDD.stt}</span>
                            })}
                        </div>
                    </div>
                    <hr />
                    <div className='text-left py-2'>
                        <span className='text-red-600 mr-2'>Tổng Tiền : </span>
                        <span className='text-lg text-green-500'>{danhSachGheDangDat.reduce((sum, gheDD, index) => {
                            return sum += gheDD.giaVe * 1;
                        }, 0).toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}</span>
                    </div>
                    <hr />
                    <div className='mt-4'>Tài Khoản: {userLogin.taiKhoan}</div>
                    <div className='mt-4'>Email:  {userLogin.email}</div>
                    <hr />
                    <div className='flex flex-col justify-end mb-0 items-center'>
                        <button onClick={() => {
                            const thongTinDatVe = new ThongTinDatVe();
                            thongTinDatVe.maLichChieu = props.match.params.id * 1;
                            thongTinDatVe.danhSachVe = danhSachGheDangDat;

                            const request = {
                                maLichChieu: thongTinDatVe.maLichChieu,
                                danhSachVe: thongTinDatVe.danhSachVe
                            }
                            dispatch(quanLyDatVeAction(request));
                        }} className='bg-green-500 text-white py-2 w-full rounded-md cursor-pointer' >
                            ĐẶT VÉ
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}


export default function (props) {
    const { tabActive } = useSelector(state => state.QuanLyDatVeReducer);
    const dispatch = useDispatch();
    return <div>
        <Tabs defaultActiveKey='1' activeKey={tabActive} onChange={(key) => {
            dispatch({
                type: CHUYEN_TABS,
                number: key
            })
        }}>
            <TabPane tab='01 THÔNG TIN RẠP CHIẾU' key={1} label={`Tabs 1`}>
                <Checkout {...props} />
            </TabPane>
            <TabPane tab='02 LỊCH SỬ ĐẶT VÉ' key={2} label={`Tabs 2`} >
                <LichSuDatVe {...props} />
            </TabPane>
        </Tabs>
    </div>
}


function LichSuDatVe(props) {
    const dispatch = useDispatch();
    const { thongTinNguoiDung } = useSelector(state => state.QuanLyNguoiDungReducer);
    const { userLogin } = useSelector(state => state.QuanLyNguoiDungReducer);
    console.log("thongTinNguoiDung thành công", thongTinNguoiDung)


    useEffect(() => {
        dispatch(layThongTinNguoiDungAction());
    }, [])


    const renderTicketItems = () => {
        return thongTinNguoiDung.thongTinDatVe?.map((phim, index) => {

            const seats = _.first(phim.danhSachGhe)


            return <div className="p-2 lg:w-1/3 md:w-1/2 w-full" key={index}>
                <div className="h-full flex items-center border-gray-200 border p-3 rounded-lg">
                    <img alt="team" className="w-16 h-16 bg-gray-100 object-cover object-center flex-shrink-0 rounded-full mr-4" src={phim.hinhAnh} />
                    <div className="flex-grow">
                        <h2 className="text-gray-900 title-font font-medium">{phim.tenPhim}</h2>
                        <p className="text-gray-500 font-thin text-xs">Thời gian đặt: {moment(phim.ngayDat).format('hh:mm A DD/MM/YYYY')}</p>
                        <p className='text-gray-500 font-thin text-xs'>Địa điểm: {seats.tenCumRap} - {seats.tenHeThongRap}</p>
                        <p className='text-gray-500 font-thin text-xs'>Ghế: {phim.danhSachGhe?.slice(0, 4).map((soGhe, index) => {
                            return <span key={index} className='p-1 text-red-600'>{`[${soGhe.tenGhe}]`}</span>
                        })} <span className='text-blue-600 cursor-pointer' onClick={() => {
                            history.push(`/`);
                        }}><RollbackOutlined /></span> </p>
                    </div>
                </div>
            </div>
        })
    }

    return (<section className="text-gray-600 body-font">
        <div className="container px-5 py-24 mx-auto">
            <div className="flex flex-col text-center w-full mb-20">
                <h1 className="sm:text-3xl text-xl font-medium title-font mb-4 text-purple-600">LỊCH SỬ ĐẶT VÉ KHÁCH HÀNG</h1>
                <p className="lg:w-2/3 mx-auto leading-relaxed text-base font-thin">Thông tin địa điểm thời gian của bạn ở dưới nhé!</p>
            </div>
            <div className="flex flex-wrap -m-2">
                {renderTicketItems()}
            </div>
        </div>
    </section>
    )
}