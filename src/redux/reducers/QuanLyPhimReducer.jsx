import { SET_CHI_TIET_PHIM } from "../actions/types/QuanLyHeThongRapType";
import { SET_DANH_SACH_PHIM, SET_FILM_DANG_CHIEU, SET_FILM_SAP_CHIEU } from "../actions/types/QuanLyPhimType";

const stateDefaults = {
    arrFilm : [
        {
            "maPhim" : 1282,
            "tenPhim" : "Ban tay diet quy",
            "biDanh" : "ban-tay-diet-quy",
            "trailer" : "https://www.youtube.com/watch?v=uqJ9u7GSaYM",
            "hinhAnh" : "https://vcdn1-giaitri.vnecdn.net/2022/12/02/transformers-7-1669949882-9751-1669950038.png?w=1200&h=0&q=100&dpr=1&fit=crop&s=qJBo1D7LLsaAZyEq9xBiWg",
            "moTa" : "Võ sĩ MMA Yong Hoo (Park Seo Joon) đi theo con đường trừ tà trục quỷ sau khi bỗng dưng sở hữu Bàn tay diệt quỷ. Đối đầu với anh là Giám mục bóng tối - tên quỷ Satan đội lốt người.",
            "maNhom" : "GP01",
            "ngayKhoiChieu" : "2019-07-29T00:00:00",
            "danhGia" : 5,
            "hot" : true,
            "dangChieu" :false,
            "sapChieu" : true
        }
    ],
    arrFilmDefaulft : [],


    filmDetail : {}
}

export const QuanLyPhimReducer = (state = stateDefaults,action ) => {
    switch (action.type) {
        case SET_DANH_SACH_PHIM: {
            state.arrFilm = action.arrFilm;
            state.arrFilmDefaulft = action.arrFilm;
            return {...state}
        }
        case SET_FILM_DANG_CHIEU: {
            state.arrFilm = state.arrFilmDefaulft.filter( (film,index) => film.dangChieu === action.dangChieu );
            console.log("123",state.arrFilm)
            return {...state}
        }
        case SET_FILM_SAP_CHIEU: {
            state.arrFilm = state.arrFilmDefaulft.filter( (film,index) => film.sapChieu === action.sapChieu );
            console.log("456",state.arrFilm)
            return {...state}
        }
        case SET_CHI_TIET_PHIM: {
            state.filmDetail = action.filmDetail;
        }

        default: return {...state}
    }
        
}