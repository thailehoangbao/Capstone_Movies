import { TOKEN, USER_LOGIN } from "../../utils/settings/config";
import { SET_THONG_TIN_DANG_NHAP } from "../actions/types/QuanLyThongTinDangNhapType";
import { history } from "../../App";
import { SET_THONG_TIN_NGUOI_DUNG } from "../actions/types/QuanLyNguoiDung";

let user = {};
if (localStorage.getItem(USER_LOGIN)) {
    user = JSON.parse(localStorage.getItem(USER_LOGIN));
}


const stateDefault = {
    userLogin : user,

    thongTinNguoiDung: {

    }
}

export const QuanLyNguoiDungReducer = (state = stateDefault ,action) => {
    switch (action.type) {
        case SET_THONG_TIN_DANG_NHAP: {
            const {thongTinDangNhap} = action;
            console.log("thongtinDN",thongTinDangNhap);
            localStorage.setItem(USER_LOGIN,JSON.stringify(thongTinDangNhap));
            localStorage.setItem(TOKEN,JSON.stringify(thongTinDangNhap.accessToken));
            history.goBack();
            return {...state,userLogin:thongTinDangNhap}
        }
            
        case SET_THONG_TIN_NGUOI_DUNG: {
            state.thongTinNguoiDung = action.thongTinNguoiDung;


            return {...state}
        }
        default: return {...state}
            
    }
}