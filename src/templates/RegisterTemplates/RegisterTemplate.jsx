import { Fragment } from "react";
import { Route } from "react-router";


export const RegisterTemplate = (props) => {
    const { Component, ...restProps } = props;



    return <Route {...restProps} render={(propsRoute) => {//path , exact, component
        return <Fragment >
            <Component {...restProps}/>
        </Fragment>
    }} />
};
