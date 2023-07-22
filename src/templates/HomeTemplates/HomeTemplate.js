import { Fragment } from "react";
import { Route } from "react-router";
import Header from "./Layout/Header/Header";
import Footer from "./Layout/Footer/Footer";


export const Hometemplate = (props) => {
    const {Component,...restProps} = props;


    return <Route {...restProps} render={(propsRoute) => {//path , exact, component
        return <Fragment >
            <Header {...propsRoute}/>

            <Component {...propsRoute}/>

            <Footer {...propsRoute}/>
        </Fragment>
    }} />
};
