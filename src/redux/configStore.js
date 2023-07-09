import { applyMiddleware, combineReducers,createStore } from 'redux';
import thunk from "redux-thunk";
import { CarouselReducer } from './reducers/CaroselReducer';
import { QuanLyPhimReducer } from './reducers/QuanLyPhimReducer';
import { QuanLyHeThongRapReducer } from './reducers/QuanLyHeThongRapReducer';
import { QuanLyNguoiDungReducer } from './reducers/QuanLyNguoiDungReducer';
import { QuanLyDatVeReducer } from './reducers/QuanLyDatVeReducer';
import { LoadingReducer } from './reducers/LoandingReducer';


const rootReducer = combineReducers({
    //state ứng dụng
    CaroselReducer: CarouselReducer,
    QuanLyPhimReducer: QuanLyPhimReducer,
    QuanLyHeThongRapReducer: QuanLyHeThongRapReducer,
    QuanLyNguoiDungReducer: QuanLyNguoiDungReducer,
    QuanLyDatVeReducer: QuanLyDatVeReducer,
    LoadingReducer: LoadingReducer
});

export const store = createStore(rootReducer,applyMiddleware(thunk));

