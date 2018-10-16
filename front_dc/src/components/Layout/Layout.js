import React from 'react';
import {Route, Switch} from 'react-router';
import Footer from './Footer'
import Patient from "../../containers/Patient/Patient";
import Doctor from "../../containers/Doctor/Doctor";

const layout = (props) => {

    let routes = <Switch>
        <Route path="/patient/" component={Patient}/>
        <Route path="/doctor/" component={Doctor}/>
    </Switch>;

    return (
        <React.Fragment>
            {routes}
            <Footer {...props}/>
        </React.Fragment>
    );


}

export default layout;
