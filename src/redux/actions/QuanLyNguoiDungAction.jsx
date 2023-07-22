import { quanlyNguoiDungService } from "../../services/QuanlyNguoiDung";
import { SET_THONG_TIN_DANG_NHAP } from "./types/QuanLyThongTinDangNhapType";
import {history} from '../../App';


export const dangNhapAction = (thongTinDangNhap) => {


    return async (dispatch) => {
        try {
            const result = await quanlyNguoiDungService.layThongTinDangNhap(thongTinDangNhap);
            if (result.status === 200) {
                dispatch({
                    type: SET_THONG_TIN_DANG_NHAP,
                    thongTinDangNhap: result.data.content
                });

                history.goBack();

            }
            
        } catch (error) {
            console.log('error: ' + error.response.data);
        };
    };
}