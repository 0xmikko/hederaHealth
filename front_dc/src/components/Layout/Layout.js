import React from 'react';
import { Route, Switch, Redirect } from 'react-router';
import Menu from '../Menu/Menu'
import Footer from './Footer'
import Login from "../../containers/Auth/Login";
import SignUp from "../../containers/Auth/SignUp";
import VerifyEmail from "../../containers/Auth/Verification"
import Page404 from "../HelpPage/404";
import Exchange from "../../containers/Exchange/Exchange";
import Option from "../../containers/Option/Option";
import Marketplace from "../../containers/Marketplace/Marketplace";
import Landing from "../../containers/Landing/Landing";
import Wallet from "../../containers/Balances/Balances";
import Notifications from "../Notifications/Notifications"

const layout = ( props ) => {

    let routes;

    if ((props.isAuthenticated) && (props.isVerified === undefined)) return <p>Loading...</p>
    if (!props.isAuthenticated) {
        routes = <Switch>
            <Route path="/login/" component={Login}/>
            <Route path="/signup/" component={SignUp}/>
            <Route path="/verify-email/:token"
                    component={(props2) =>
                    <VerifyEmail {...props} token = {props2.match.params.token}/>}/>

            {/*<Route exact path="/" component={Landing}/>*/}
            <Route component={Login}/>
        </Switch>
    }
    else {
        if (props.isVerified === undefined) return <p>Loading...</p>
        if (!props.isVerified){
            routes = <Switch>
                 <Route path="/verify-email/" component={VerifyEmail}/>
                 <Route path="/verify-email/:token" component={(props2) => <VerifyEmail {...props}
                                                                                token = {props2.match.params.token}/>}/>
                 <Route path='*' render={() => (<Redirect to="/verify-email"/>)}/>
            </Switch>
        }
        else
        {
            routes = <Switch {...props}>

                        {/* Investors menu */}
                        <Route path="/balances/" component={() => <Wallet {...props} />}/>
                        <Route exact path="/options/" component={() => <Marketplace {...props} />}/>
                        <Route exact path="/options/:id" component={(props2) => <Option {...props}
                                                                                        optionAddress = {props2.match.params.id}/>}/>
                        <Route path="/exchange/" component={Exchange}/>

                        {/* Default action & Page 404 */}
                        <Route exact path="/" render={() => (<Redirect to="/options"/>)}/>
                        <Route exact path="/login" render={() => (<Redirect to="/options"/>)}/>
                        <Route path="/verify-email" render={() => (<Redirect to="/options"/>)}/>
                        <Route path='*' component={Page404}/>
            </Switch>
        }
    }


    return  (
        <React.Fragment>

                <Menu {...props} />

                  {routes}
                    {/*<div className="container">
                        <br />


                    </div>*/}

                    <Footer {...props}/>

                <Notifications/>
        </React.Fragment>

       );


}

export default layout;
