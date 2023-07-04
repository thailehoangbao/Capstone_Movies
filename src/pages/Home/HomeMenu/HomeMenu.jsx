import React, { Fragment, useEffect, useState } from 'react';
import { Radio, Space, Tabs } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import TabPane from 'antd/es/tabs/TabPane';
import { divide } from 'lodash';
import { NavLink } from 'react-router-dom/cjs/react-router-dom';
import moment from 'moment/moment';



export default function HomeMenu(props) {

    const [tabPosition, setTabPosition] = useState('left');
    const changeTabPosition = (e) => {
        setTabPosition(e.target.value);
    };

    const renderHeThongRap = () => {
        console.log(props.heThongRapPhim)
        return props.heThongRapPhim.map((heThongRap, index) => {
            let tabPosition = 'left';
            return (<TabPane tab={<img src={heThongRap.logo} className='rounded-full w-10'></img>} key={index}>
                <Tabs tabPosition={tabPosition}>
                    {heThongRap.lstCumRap.map((CumRap, index) => {
                        return (
                            <TabPane tab={
                                <div style={{ width: "300px" }} className='flex'>
                                    <img src={CumRap.hinhAnh} className='rounded-full w-10'></img>
                                    <div className='ml-2 text-left'>
                                        {CumRap.tenCumRap}
                                        <p className='text-red-700'>Xem chi tiết</p>
                                    </div>
                                </div>

                            } key={index}>
                                {CumRap.danhSachPhim?.slice(0,10).map((phim, index) => {
                                    return <Fragment key={index}  >
                                        <div style={{ display: "flex" }} className='my-2'>
                                            <div style={{ display: "flex" }}>
                                                <img style={{ height: 84, width: 84 }} src={phim.hinhAnh} alt={phim.tenPhim} onError={(e) => {e.target.src = 'https://w7.pngwing.com/pngs/595/505/png-transparent-computer-icons-error-closeup-miscellaneous-text-logo.png'; e.target.onError = null;}} />
                                                <div>
                                                    <h1 className='ml-2 font text-xl text-red-600'>{phim.tenPhim}</h1>
                                                    <p className='text-gray-600 ml-2 mt-1'>{CumRap.diaChi}</p>
                                                    <div className='grid grid-cols-6 gap-1 ml-1'>
                                                        {phim.lstLichChieuTheoPhim?.slice(0,10).map((lichChieu, index) => {
                                                            return <NavLink to={`/checkout/${lichChieu.maLichChieu}`} key={index} className="p-1 text-orange-600">
                                                                {moment(lichChieu.ngayChieuGioChieu).format('hh:mm A')}
                                                            </NavLink>
                                                        })}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <hr />
                                    </Fragment>
                                })}
                            </TabPane>
                        )
                    })}

                </Tabs>
            </TabPane>
            )
        })
    }


    return (<>
        <Tabs tabPosition={tabPosition}>
            {renderHeThongRap()}
        </Tabs>
    </>)
}
