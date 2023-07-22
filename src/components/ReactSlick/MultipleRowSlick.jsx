import React, { Component } from "react";
import Slider from "react-slick";
import styleSlickRow from './MultipleSlick.module.css'
import Film from "../Films/Film";
import Film_Flip from "../Films/Film_Flip";
import { useDispatch } from "react-redux";
import { SET_FILM_DANG_CHIEU, SET_FILM_SAP_CHIEU } from "../../redux/actions/types/QuanLyPhimType";


function SampleNextArrow(props) {
    const { className, style, onClick } = props;
    return (
        <div
            className={`${className} ${styleSlickRow['slick-next']}`}
            style={{ ...style, display: "block" }}
            onClick={onClick}
        >
        </div>
    );
}

function SamplePrevArrow(props) {
    const { className, style, onClick } = props;
    return (
        <div
            className={`${className} ${styleSlickRow['slick-prev']}`}
            style={{ ...style, display: "block",left:"-50px"}}
            onClick={onClick}
        >
        </div>
    );
}





const MultipleRowSlick = (props) => {
    const dispatch = useDispatch();

    const renderArrFilm = () => {


        return props.arrFilm.slice(0,12).map((film, index) => {
            return (
                <div key={index} className={`${styleSlickRow['width-item']} mt-3`}>
                    <Film_Flip film={film} />
                </div>
            )
        })
    }

    const phimDangChieu = (t) => {
        let activeClassDC = t === true? 'active-btn-film' : "noneactive-btn-film";
        return activeClassDC;
    }

    const phimSapChieu = (f) => {
        let noneActiveClassDC = f === true? 'active-btn-film' : "noneactive-btn-film";
        return noneActiveClassDC;
    }


    const settings = {
        className: "center variable-width",
        centerMode: true,
        infinite: true,
        centerPadding: "180px",
        slidesToShow: 3,
        speed: 500,
        rows: 1,
        slidesPerRow: 2,
        variableWidth: true,
        nextArrow: <SampleNextArrow />,
        preArrow: <SamplePrevArrow />
    };

    return (
        <div className="my-5">
            <button type="button" className={`${phimDangChieu()} px-4 py-2 font-semibold border bg-slate-800 rounded dark:border-gray-100 text-white`} onClick={()=>{
                const action = {
                    type: SET_FILM_DANG_CHIEU,
                    dangChieu: true
                }
                dispatch(action);
                phimDangChieu(true);
            }}>ĐANG CHIẾU</button>
            <button type="button" className={`${phimSapChieu()} px-4 py-2 font-semibold border rounded dark:border-gray-100 dark:text-gray-100 ml-2`} onClick={()=>{
                const action = {
                    type: SET_FILM_SAP_CHIEU,
                    sapChieu: false
                }
                dispatch(action);
                phimSapChieu(false);
            }}>SẮP CHIẾU</button>
            <Slider {...settings}>
                {renderArrFilm()}
            </Slider>
        </div>
    );

}

export default MultipleRowSlick;