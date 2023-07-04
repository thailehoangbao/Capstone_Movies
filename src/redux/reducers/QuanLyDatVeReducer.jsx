import { DAT_VE } from "../actions/types/DatVeType";
import { GET_CHI_TIET_PHONG_VE } from "../actions/types/QuanLyDatVeType"




const stateDefault = {
    chiTietPhongVe: {

    },
    danhSachGheDangDat: []
}


export const QuanLyDatVeReducer = (state = stateDefault ,action) => {
    switch (action.type) {
        case GET_CHI_TIET_PHONG_VE:{
            state.chiTietPhongVe = action.chiTietPhongVe;
            return {...state}
        }
        case DAT_VE: {
            //Cập nhật danh sách ghế cập nhật
            let danhSachGheUpdate = [...state.danhSachGheDangDat];
            let index = danhSachGheUpdate.findIndex(gheDD => gheDD.maGhe === action.gheDuocChon.maGhe);
            if (index !== -1) { 
                danhSachGheUpdate.splice(index, 1);
                state.danhSachGheDangDat = danhSachGheUpdate;
            } else {
                danhSachGheUpdate.push(action.gheDuocChon);
            }
            state.danhSachGheDangDat = danhSachGheUpdate;
            console.log("danhSachGheUpdate",state.danhSachGheDangDat);

            return {...state}
        }
        default : return {...state}
    }
}