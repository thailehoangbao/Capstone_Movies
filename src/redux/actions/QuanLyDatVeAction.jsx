import { ThongTinDatVe } from "../../_core/models/ThongTinDatVe";
import { quanlyDatVeService } from "../../services/QuanLyDatVeService";
import { CHUYEN_TABS, GET_CHI_TIET_PHONG_VE } from "./types/QuanLyDatVeType";
import { DAT_VE, DAT_VE_HOAN_TAT } from './types/DatVeType';
import { LOADING_FALSE, LOADING_TRUE } from "./types/LoadingType";
import { DISPLAY_LOADING_ACTION, HIDE_LOADING_ACTION } from "./LoadingAction";
import { connection } from "../..";



export const layDanhSachPhongVeAction = (maLichChieu) => {



    return async (dispatch) => {
        try {

            dispatch(DISPLAY_LOADING_ACTION);


            const result = await quanlyDatVeService.layChiTietPhongVe(maLichChieu);
            //Lấy dữ liệu xong đưa lên reducer
            if (result.status === 200) {
                dispatch({
                    type: GET_CHI_TIET_PHONG_VE,
                    chiTietPhongVe: result.data.content
                });
                await dispatch(HIDE_LOADING_ACTION);
            }
        } catch (error) {
            console.log('error:', error);
            console.log('error:', error.response?.data);
        };
    };
}


export const quanLyDatVeAction = (thongTinDatVe) => {

    return async (dispatch) => {
        try {

            dispatch(DISPLAY_LOADING_ACTION);


            const result = await quanlyDatVeService.datVe(thongTinDatVe);
            // console.log("datVe123",result);
            // //Lấy dữ liệu xong đưa lên reducer
            // if (result.status === 200) {
            //     dispatch({
            //         type: DAT_VE,
            //         thongTinDatVe: result.data.content
            //     });
            // }
            //Đặt vé thành công gọi Api load lại trang 
            await dispatch(layDanhSachPhongVeAction(thongTinDatVe.maLichChieu))

            //Clear danh sách ghế đang đặt
            await dispatch({ type: DAT_VE_HOAN_TAT })

            await dispatch(HIDE_LOADING_ACTION);

            await dispatch({ type: CHUYEN_TABS, number: '2' })

        } catch (error) {
            console.log('error:', error);
        };
    };
}


export const taoLichChieuAction = (thongTinLichChieu) => {

    return async (dispatch) => {
        try {
            const result = await quanlyDatVeService.taoLichChieu(thongTinLichChieu);
            console.log("Success LichChieu", result);
            //Lấy dữ liệu xong đưa lên reducer

        } catch (error) {
            console.log('error:', error);
            console.log('error:', error.response?.data);
        };
    };
};

export const datVeWebRocketAction = (ghe,maLichChieu) => {

    //Do sử dụng redux thunk nên có 2 tham số trả ra là dispatch và getState ( giúp chúng ta lấy dữ liệu từ store reducer)
    return async (dispatch,getState) => {
        try {
            //Dua thong tin ghế len reducers
            await dispatch({
                type: DAT_VE,
                gheDuocChon: ghe
            })

            //Call api về backend
            // Cách lấy reducers từ store 
            let danhSachGheDangDat = getState().QuanLyDatVeReducer.danhSachGheDangDat;
            let taiKhoan = getState().QuanLyNguoiDungReducer.userLogin.taiKhoan;
            console.log("danhSachGheDangDat",danhSachGheDangDat);
            console.log("taiKhoan",taiKhoan);
            console.log("maLichChieu",maLichChieu);
            //Biến mảng thành chuỗi
            danhSachGheDangDat = JSON.stringify(danhSachGheDangDat);
            console.log("danhSachGheDangDat - 2",danhSachGheDangDat);
            //Call Api của signalR 
            // connection.invoke('datGhe',taiKhoan,danhSachGheDangDat,maLichChieu);

        } catch (error) {
            console.log("errors :", error);
        }
    }
}