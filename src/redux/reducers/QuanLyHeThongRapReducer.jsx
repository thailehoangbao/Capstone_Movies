import { SET_HE_THONG_RAP_PHIM } from "../actions/types/QuanLyHeThongRapType";


const stateDefaults =  {
    heThongRapPhim : [],
}



export const QuanLyHeThongRapReducer = (state = stateDefaults, action  ) => { 
    switch (action.type) {
        case SET_HE_THONG_RAP_PHIM: {
            state.heThongRapPhim = action.heThongRapPhim;
            
            
            return {...state}
        } 
            
            
    
        default: return {...state}
            
    }
}