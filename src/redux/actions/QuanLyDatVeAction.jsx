import { ThongTinDatVe } from "../../_core/models/ThongTinDatVe";
import { quanlyDatVeService } from "../../services/QuanLyDatVeService";
import { GET_CHI_TIET_PHONG_VE } from "./types/QuanLyDatVeType";
import {DAT_VE} from './types/DatVeType';



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
            const result = await quanlyDatVeService.datVe(thongTinDatVe);
            console.log("datVe",result);
            //Lấy dữ liệu xong đưa lên reducer
            if (result.status === 200) {
                dispatch({
                    type: DAT_VE,
                    thongTinDatVe: result.data.content
                });
            }
    
        } catch (error) {
            console.log('error:', error);
            console.log('error:', error.response?.data);
        };
    };
}