import React, { Fragment } from 'react';
import './../../assets/Loading/Loading.css';
import { useSelector } from 'react-redux';

export default function LoadingPage() {

    const {isLoading} = useSelector(state => state.LoadingReducer);

    return (<Fragment>
        { isLoading === true ?
        <div className='flex justify-center items-center w-full' style={{position:"fixed",width:"100%",height:"100vh",top:"0",left:"0",background:"rgba(0,0,0,0.5)",zIndex:"10"}}>
            <div className="lds-roller"><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div>
        </div>
        : ''}
    </Fragment>)
}
