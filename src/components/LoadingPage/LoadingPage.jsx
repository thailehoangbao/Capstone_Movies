import React from 'react';
import './../../assets/Loading/Loading.css';

export default function LoadingPage() {
    return (
        <div className='flex justify-center align-middle w-full mt-40' style={{height:"300px"}}>
            <div className="lds-roller"><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div>
        </div>
    )
}
