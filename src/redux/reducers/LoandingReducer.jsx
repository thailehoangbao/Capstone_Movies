import { LOADING_FALSE, LOADING_TRUE } from "../actions/types/LoadingType"

const stateDefault = {
    isLoading : false
}


export const LoadingReducer = ( state = stateDefault, action ) => {



    switch ( action.type ) {
        case  LOADING_TRUE: {
            state.isLoading = true;
            return {...state}
        }

        case  LOADING_FALSE: {
            state.isLoading = false;
            return {...state}
        }
        default : return {...state}
    }
}