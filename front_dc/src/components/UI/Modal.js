import React from 'react'
import { Modal } from 'react-bootstrap'
import asyncComponent from '../../hoc/asyncComponent'

import HelpPage from "../Modals/0_Help"
import InvestorsPage from "../Modals/Investors"
import Balances from "../Modals/Balances"
import Execute from "../Dialogs/Execute"

import './Modal.css'
import { resetIsPopup } from "../../actions/debug";
import { withRouter } from "react-router";
import { connect } from "react-redux";
import { isPopup } from "../../reducers";
import {sendDebugEvent} from "../../actions/debug";


const WelcomePage = asyncComponent(() => {
    return import('../Modals/Welcome');
});

const WalletPage = asyncComponent(() => {
    return import('../Modals/Wallet');
});

const Benefits = asyncComponent(() => {
    return import('../Modals/Benefits');
});

const InteractiveHelp = asyncComponent(() => {
    return import('../Modals/InteractiveHelp');
});

const Transfer = asyncComponent(() => {
    return import('../Dialogs/Transfer');
});

const Marketplace = asyncComponent(() => {
    return import('../Modals/Marketplace');
});

const OptionPage = asyncComponent(() => {
    return import('../Modals/OptionPage');
});



class InfoModal extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.handleShow = this.handleShow.bind(this);
    this.handleClose = this.handleClose.bind(this);

    this.state = {
        show: false,
        page: undefined,
        size: 'large',
        optionData: undefined,
        projectData: undefined
    };
  }

  componentWillReceiveProps(nextProps) {

      if ((nextProps.isPopup !== this.props.isPopup) && (nextProps.isPopup !== undefined)) {
          console.log('AAA2', nextProps.isPopup)
          this.handleShow(nextProps.isPopup)
          this.props.resetIsPopup()

      }
  }

  handleClose() {
    this.setState({ show: false });
  }

  handleShow(page, size='large', optionData=undefined, projectData=undefined) {
    this.setState({ page: page,
                    show: true,
                    size: size,
                    optionData: optionData,
                    projectData: projectData});
    this.props.sendDebugEvent("MODAL", page)
  }

  render() {

    let page;
    const childrenWithProps = React.Children.map(this.props.children, child =>
                    React.cloneElement(child, { ...this.props,
                                                showModal: this.handleShow,
                                                hideModal: this.handleClose}));

    switch (this.state.page)
    {
        case '0_Help':
            page = <HelpPage
                showModal={this.handleShow}
                closeModal = {this.handleClose}
            />
            break;

        case 'InteractiveHelp':
            page = <InteractiveHelp
                showModal={this.handleShow}
                closeModal = {this.handleClose}
                {...this.props}
            />
            break;

        case 'Welcome':
        default:
            page = <WelcomePage  showModal={this.handleShow}
                closeModal = {this.handleClose}
            />
            break;

        case 'Wallet':
            page = <WalletPage  showModal={this.handleShow}
                closeModal = {this.handleClose}
                {...this.props}
            />
        break;

        case 'Investors':
            page = <InvestorsPage  showModal={this.handleShow}
                closeModal = {this.handleClose}
            />
        break;

        case 'Benefits':
            page = <Benefits  showModal={this.handleShow}
                closeModal = {this.handleClose}
            />
        break;

        case 'Execute':
            page = <Execute
                            showModal={this.handleShow}
                            closeModal = {this.handleClose}
                            {...this.props}
                            optionData = { this.state.optionData }
                            projectData = { this.state.projectData }
            />
        break;

        case 'Transfer':
            page = <Transfer
                            showModal={this.handleShow}
                            closeModal = { this.handleClose }
                            { ...this.props }
                            optionData = { this.state.optionData }
                            projectData = { this.state.projectData }
            />
        break;

        case 'Marketplace':
            page = <Marketplace
                            showModal={this.handleShow}
                            closeModal = { this.handleClose }
                            { ...this.props }
            />
        break;

        case 'OptionPage':
            page = <OptionPage
                            showModal={this.handleShow}
                            closeModal = { this.handleClose }
                            { ...this.props }
            />
        break;

        case 'Balances':
            page = <Balances
                            showModal={this.handleShow}
                            closeModal = { this.handleClose }
                            { ...this.props }
            />
        break;

    }

    return (
        <React.Fragment>

            { childrenWithProps }
            <Modal show={this.state.show}
                   onHide={this.handleClose}
                   bsSize={this.state.size}

            >
                { page }
            </Modal>

        </React.Fragment>
    );
  }
}

const mapStateToProps = (state) => ({
        isPopup:  isPopup(state)

})

const mapDispatchToProps = dispatch => {
  return {
        sendDebugEvent:         (event, parameters) => dispatch(sendDebugEvent(event, parameters)),
        resetIsPopup:           () => dispatch(resetIsPopup())
  }
};


export default withRouter(connect(mapStateToProps, mapDispatchToProps)(InfoModal));