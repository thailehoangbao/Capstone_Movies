import axios from 'axios';
import { DOMAIN } from '../../utils/settings/config';
import { SET_CAROUSEL } from './types/CarouselType';
import {quanlyPhimService} from '../../services/QuanLyPhimService';

export const getCarouselAction = (thamso) => {
    return async (dispatch) => {
        try {
            const result = await quanlyPhimService.layDanhSachBanner();
            //Lấy dữ liệu xong đưa lên reducer
            dispatch({
                type: SET_CAROUSEL,
                arrImg: result.data.content
            });
    
    
        } catch (error) {
            console.log('error:', error);
        };
    };
};