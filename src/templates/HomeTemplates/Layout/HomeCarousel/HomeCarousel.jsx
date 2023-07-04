import React, { useEffect } from 'react'
import { Carousel } from 'antd';
import { useSelector, useDispatch } from 'react-redux';
import {getCarouselAction} from '../../../../redux/actions/CarouselActions';



export default function HomeCarousel(props) {

    const imgBanner = useSelector(state => state.CaroselReducer.arrImg);

    const dispatch = useDispatch();

    // Cách thường dùng  
    // Khi giao diện render xong sẽ gọi hàm useEffect
    // useEffect(async () => {
    //     try {
    //         const result = await axios({
    //             url: 'https://movieapi.cyberlearn.vn/api/QuanLyPhim/LayDanhSachBanner',
    //             method: 'GET'
    //         })
    //         //Lấy dữ liệu xong đưa lên reducer
    //         console.log(result);  
    //         dispatch({
    //             type: 'SET_CAROUSEL',
    //             arrImg: result.data.content
    //         })  
    //     } catch (error) {
    //         console.log('error:', error);
    //     };

    // },[]); // muốn lần đầu gọi thôi k phải lần nào render cũng gọi thì để tham số thứ 2 là []

    // Cách 2 sử dụng redux -thunk 

    useEffect(() => {

        // // async (dispatch) => {


        // //     try {
        // //         const result = await axios({
        // //             url: 'https://movieapi.cyberlearn.vn/api/QuanLyPhim/LayDanhSachBanner',
        // //             method: 'GET'
        // //         })
        // //         //Lấy dữ liệu xong đưa lên reducer
        // //         dispatch({
        // //             type: 'SET_CAROUSEL',
        // //             arrImg: result.data.content
        // //         });


        // //     } catch (error) {
        // //         console.log('error:', error);
        // //     };


        // };


        //dispatch chỉ nhận vào 
        // 1 .action {type:'',data:'data}
        // 2 .Phải cài middleware: callBackFunction( dispatch )

        // const action = getCarouselAction();
        
        dispatch(getCarouselAction());


    }, []);



    const contentStyle = {
        height: '600px',
        color: '#fff',
        lineHeight: '160px',
        textAlign: 'center',
        background: '#364d79',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        backgroundSize: '100%'
    };


    const renderImg = (img) => {
        return imgBanner.map((item, index) => {
            return (
                <div key={index}>
                    <div style={{ ...contentStyle, backgroundImage: `url(${item.hinhAnh})` }} >
                        <img src={item.hinhAnh} className='w-full h-full opacity-0' alt="123" />
                    </div>
                </div>
            )
        })
    }

    return (
        <Carousel effect="fade">
            {renderImg()}
        </Carousel>
    )
}
