import { SET_THONG_TIN_DANG_KY } from "../actions/types/QuanLyDangKyType"

const stateDefault = {
    userRegister : {
        // email: "diamondriverside@gmail.com",
        // hoTen: "bảo thái",
        // maNhom: "GP00",
        // matKhau: "hoangbao94",
        // soDt: "123456789",
        // taiKhoan: "baobao12345678"
    }
}

export const QuanLyNguoiDungReducer = (state = stateDefault ,action) => {
    switch (action.type) {
        case SET_THONG_TIN_DANG_KY: {

            return {...state}
        }
            
    
        default: return {...state}
            
    }
}