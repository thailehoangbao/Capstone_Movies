import { quanlyPhimService } from "../../services/QuanLyPhimService";
import { SET_DANH_SACH_PHIM } from "./types/QuanLyPhimType";


export const layDanhSachPhimAction = () => {



    return async (dispatch) => {
        try {
            const result = await quanlyPhimService.layDanhSachPhim();
            //Lấy dữ liệu xong đưa lên reducer
            dispatch({
                type: SET_DANH_SACH_PHIM,
                arrFilm: result.data.content
            });
    
    
        } catch (error) {
            console.log('error:', error);
        };
    };
}