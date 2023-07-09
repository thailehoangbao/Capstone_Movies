import { history } from "../../App";
import { quanlyNguoiDungService } from "../../services/QuanlyNguoiDung";
import { SET_THONG_TIN_DANG_KY } from "./types/QuanLyDangKyType";
import { SET_THONG_TIN_NGUOI_DUNG } from "./types/QuanLyNguoiDung";




export const dangKyAction = (thongTinDangKy) => {


    return async (dispatch) => {
        try {
            const result = await quanlyNguoiDungService.layThongTinDangKy(thongTinDangKy);
            if (result.data.status === 200) {
                dispatch({
                    type: SET_THONG_TIN_DANG_KY,
                    thongTinDangKy: result.data.content
                });
            }
            history.goBack();
        } catch (error) {
            console.log('error: ' + error);
        };
    };
}


export const layThongTinNguoiDungAction = () => {


    return async (dispatch) => {
        try {
            const result = await quanlyNguoiDungService.layThongTinNguoiDung();
            if (result.status === 200) {
                dispatch({
                    type: SET_THONG_TIN_NGUOI_DUNG,
                    thongTinNguoiDung: result.data.content
                });
            }
            console.log(result);
        } catch (error) {
            console.log('error: ' + error);
        };
    };
}