import React from 'react';
import { connect } from "react-redux";
import { Modal } from 'react-bootstrap'
import { toHumanDate, FormatAddress, rateToPrice } from "../../utils/formaters";

import Calc from "../UI/Calc"

import * as actions from "../../actions/cases";

class TransferModal extends React.Component {

  onSubmitHandler = (qty) =>
  {
    this.props.closeModal();
  }

  render() {

    return (
        <React.Fragment>
            <Modal.Header closeButton style={{margin: 0, padding: 0}}>
                <Modal.Title>Transfer tokens</Modal.Title>
            </Modal.Header>
            <Modal.Body>
               Transfer is under development


            </Modal.Body>
        </React.Fragment>

    );
  }
}


const mapStateToProps = (state) => ({


})


const mapDispatchToProps = dispatch => {
  return {


  }
};


export default connect(mapStateToProps, mapDispatchToProps)(TransferModal);
