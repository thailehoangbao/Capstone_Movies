import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { Provider } from 'react-redux';
import {store} from './redux/configStore';
//css slick carousel
import "slick-carousel/slick/slick-theme.css"; 
import "slick-carousel/slick/slick.css"
import { DOMAIN } from './utils/settings/config';
// Cấu hình realtime  signalR
import * as signalR from '@aspnet/signalr'

// Đoạn code server lắng nghe
export const connection = new signalR.HubConnectionBuilder().withUrl(`${DOMAIN}/DatVeHub`).configureLogging(signalR.LogLevel.Information).build();


connection.start().then(() => {
    const root = ReactDOM.createRoot(document.getElementById('root'));
    root.render(
        <Provider store={store}>
            <App />
        </Provider>
    );
    
}).catch(errors => {
    console.log(errors);
})

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
