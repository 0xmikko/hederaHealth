import React from "react";
import { withRouter } from 'react-router';
import { connect } from 'react-redux'
import ReactGA from 'react-ga';
import Layout from '../components/Layout/Layout';

import {authErrors, isAuthenticated, isVerified, getProfile, getWallet, getMenuItem,
        getWeb3Instance, refreshTime} from '../reducers';
import {logout, requestProfile} from '../actions/auth';
import * as fromActions from "../actions/wallet";
import {Web3Dispatch} from "../actions/web3";
import InfoModal from "../components/UI/Modal"
import {sendDebugEvent} from "../actions/debug";

// Set to false to use on local machine without server data binding


class App extends React.Component {

  componentDidMount(){
      ReactGA.initialize('UA-108721320-1');
  }

  componentWillReceiveProps(nextProps) {

      if (nextProps.isAuthenticated)
        {
            // We send debug info about open page in two cases:
            // - User changle location
            // - User just log in
            if ((this.props.location.pathname !== nextProps.location.pathname) ||
                (nextProps.isAuthenticated !== this.props.isAuthenticated))
                {
                this.props.sendDebugEvent("LOCATION", nextProps.location.pathname);
                ReactGA.pageview(nextProps.location.pathname)
                }
            // Application set up profile if it wasn't set yet
            if ((nextProps.profile === undefined) || (nextProps.isVerified === undefined)) nextProps.onInit();

            // Choose default wallet
            if (nextProps.wallet.type === undefined) nextProps.switchToIntWallet();
        }
  }

  render (){

        return  <InfoModal {...this.props}>
                    <Layout {...this.props}
                        onSwitchedIntWallet = {this.props.switchToIntWallet }
                        onSwitchedWeb3Wallet = {this.props.switchToWeb3Wallet }
                        menuItem = {this.props.menuItem}
                    />
                </InfoModal>
    }
}

const mapStateToProps = (state) => ({
    errors:          authErrors(state),
    isAuthenticated: isAuthenticated(state),
    refreshTime:     refreshTime(state),
    isVerified:      isVerified(state),
    menuItem:        getMenuItem(state),
    profile:         getProfile(state),
    wallet:          getWallet(state),
    web3:            getWeb3Instance(state)
})

const mapDispatchToProps = dispatch => {
  return {
        onInit:                 () => dispatch(requestProfile()),
        sendDebugEvent:         (event, parameters) => dispatch(sendDebugEvent(event, parameters)),
        switchToIntWallet:      () => dispatch(fromActions.switchToIntWallet()),
        switchToWeb3Wallet:     () => dispatch(Web3Dispatch()),
        onLogout:               () => dispatch(logout())



  }
};


export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));

