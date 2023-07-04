import React from 'react';
import './Film_flip.css';
import {PlayCircleOutlined} from '@ant-design/icons';
import { history } from '../../App';

export default function Film_Flip(props) {

    const { film } = props;



    return (
        <div className="flip-card mb-5" style={{ width: 200, height: 300 }}>
            <div className="flip-card-inner w-full">
                <div className="flip-card-front" >
                    <img src={film.hinhAnh} alt="Avatar" style={{ width: 200, height: 300 }} />
                </div>
                <div className="flip-card-back" style={{position:"relative",backgroundColor:"rgba(0,0,0,0.9)"}}>
                    <div style={{ position: "absolute", top: 0, left: 0 }}>
                        <img src={film.hinhAnh} alt="Avatar" style={{ width: 200, height: 200 }} />
                    </div>
                    <div className='w-full h-full' style={{position:"absolute",top:0,left:0,backgroundColor:"rgba(0,0,0,.5)",display:"flex",justifyContent:"center",alignItems:"center"}}>
                        <div >
                            <div className='rounded-full cursor-pointer'><PlayCircleOutlined style={{fontSize:"50px"}}/></div>
                            <div className='text-2xl mt-2 font-bold'>{film.tenPhim}</div>
                        </div>

                    </div>
                </div>
            </div>
            <div onClick={()=>{
                history.push(`/detail/${film.maPhim}`)
            }} className='text-center cursor-pointer py-2 text-success-50 font-bold bg-indigo-300 my-2 '>ĐẶT VÉ</div>
        </div>
    )
}
