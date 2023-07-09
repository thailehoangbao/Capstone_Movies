import { ThongTinDatVe } from "../../_core/models/ThongTinDatVe";
import { quanlyDatVeService } from "../../services/QuanLyDatVeService";
import { CHUYEN_TABS, GET_CHI_TIET_PHONG_VE } from "./types/QuanLyDatVeType";
import {DAT_VE, DAT_VE_HOAN_TAT} from './types/DatVeType';
import { LOADING_FALSE, LOADING_TRUE } from "./types/LoadingType";
import { DISPLAY_LOADING_ACTION, HIDE_LOADING_ACTION } from "./LoadingAction";



export const layDanhSachPhongVeAction = (maLichChieu) => {



    return async (dispatch) => {
        try {
            const result = await quanlyDatVeService.layChiTietPhongVe(maLichChieu);
            console.log("phongve",result);
            //Lấy dữ liệu xong đưa lên reducer
            if (result.status === 200) {
                dispatch({
                    type: GET_CHI_TIET_PHONG_VE,
                    chiTietPhongVe: result.data.content
                });
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

            dispatch(DISPLAY_LOADING_ACTION)


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
            await dispatch({type: DAT_VE_HOAN_TAT})

            await dispatch(HIDE_LOADING_ACTION)

            await dispatch({type: CHUYEN_TABS,number: '2'})
    
        } catch (error) {
            console.log('error:', error);
        };
    };
}