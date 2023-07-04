import { quanlyNguoiDungService } from "../../services/QuanlyNguoiDung";
import { SET_THONG_TIN_DANG_KY } from "./types/QuanLyDangKyType";




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
            console.log(result);
        } catch (error) {
            console.log('error: ' + error);
        };
    };
}