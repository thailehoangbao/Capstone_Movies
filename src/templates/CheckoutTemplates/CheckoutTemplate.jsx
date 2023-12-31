import { Fragment } from "react";
import { Route } from "react-router";
import { USER_LOGIN } from "../../utils/settings/config";
import { Redirect } from "react-router-dom/cjs/react-router-dom";


const CheckoutTemplate = (props) => {
    const { Component, ...restProps } = props;

    if (!localStorage.getItem(USER_LOGIN)) {
        return <Redirect to="/login"/>
    }


    return <Route {...restProps} render={(propsRoute) => {//path , exact, component
        return <Fragment >
            <Component {...propsRoute} />
        </Fragment>
    }} />




};
export default CheckoutTemplate;