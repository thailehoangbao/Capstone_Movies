import { SET_CAROUSEL } from "../actions/types/CarouselType";

const stateDefault = {
    arrImg: [
        {
            "maBanner" : 1,
            "maPhim" : 1283,
            "hinhAnh" : "https://vcdn1-giaitri.vnecdn.net/2022/12/02/transformers-7-1669949882-9751-1669950038.png?w=1200&h=0&q=100&dpr=1&fit=crop&s=qJBo1D7LLsaAZyEq9xBiWg"
        }
    ]
}


export const CarouselReducer = ( state = stateDefault, action ) => {



    switch ( action.type ) {
        case SET_CAROUSEL : {
            state.arrImg = action.arrImg;
            return {...state}
        }
        default : 
        return {...state}
    }
}