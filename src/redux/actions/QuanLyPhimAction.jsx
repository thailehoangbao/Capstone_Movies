import { quanlyPhimService } from "../../services/QuanLyPhimService";
import { CAP_NHAT_PHIM, SET_DANH_SACH_PHIM, THEM_PHIM_UPLOAD_HINH, THONG_TIN_PHIM_EDIT } from "./types/QuanLyPhimType";


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

export const themPhimUploadHinhAction = (formData) => {



    return async (dispatch) => {
        try {
            const result = await quanlyPhimService.themPhimUpHinhAnh(formData);
            console.log("thanh cong",result);
            //Lấy dữ liệu xong đưa lên reducer
            dispatch({
                type: THEM_PHIM_UPLOAD_HINH,
                payload: result.data.content
            });
    
    
        } catch (error) {
            console.log('error:', error);
        };
    };
}

export const layThongTinPhimEditAction = (id) => {



    return async (dispatch) => {
        try {
            const result = await quanlyPhimService.layThongTinPhimEdit(id);
            
            //Lấy dữ liệu xong đưa lên reducer
            if ( result.status === 200 ) {
                dispatch({
                    type: THONG_TIN_PHIM_EDIT,
                    thongTinPhimEdit: result.data.content
                });
            };
    
    
        } catch (error) {
            console.log('error:', error);
        };
    };
}

export const capNhatPhimAction = (formData) => {

    return async (dispatch) => {
        try {
            const result = await quanlyPhimService.capNhatPhimUpdate(formData);
            console.log(result);
            //Lấy dữ liệu xong đưa lên reducer
            if ( result.status === 200 ) {
                dispatch({
                    type: CAP_NHAT_PHIM,
                    phimCapNhat: result.data.content
                });
            };
    
    
        } catch (error) {
            console.log('error:', error);
        };
    };
}


export const xoaPhimAction = (maPhim) => {

    return async (dispatch) => {
        try {
            const result = await quanlyPhimService.xoaPhimAdmin(maPhim);
            console.log("xoaPhim",result);
            //Lấy dữ liệu xong đưa lên reducer
            alert('Xóa Phim Thành Công !');
            // Sau khi xóa load lại danh sách phim
            dispatch(layDanhSachPhimAction());
    
        } catch (error) {
            console.log('error:', error);
        };
    };
}