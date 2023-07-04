import {quanlyRapService } from './../../services/QuanLyRapService'
import { SET_CHI_TIET_PHIM, SET_HE_THONG_RAP_PHIM } from './types/QuanLyHeThongRapType';



export const layHeThongRapAction = () => {


    return async (dispatch) => {
        try {
            const result = await quanlyRapService.layThongTinHeThongRap();
            if ( result.status === 200 ) {
                dispatch({
                    type: SET_HE_THONG_RAP_PHIM,
                    heThongRapPhim: result.data.content
                });
            }
        } catch (error) {
            console.log('error: ' + error);
        };
    };
};


export const layThongTinChiTietPhimAction = (id) => {
    return async (dispatch) => {
        try {
            const result = await quanlyRapService.layThongTinLichChieuPhim(id);
            if (result.status === 200 ) {
                dispatch({
                    type: SET_CHI_TIET_PHIM,
                    filmDetail: result.data.content
                });
            }
        } catch (error) {
            console.log('error: ' + error);
        };
    };
}