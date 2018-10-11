import React from 'react';
import { Redirect } from 'react-router-dom';
import { Grid, Row, Col, Panel, Button } from 'react-bootstrap';
import { checkVerificationToken, resendVerificationMail } from "../../actions/auth";
import { connect } from "react-redux";


export class VerifyEmail extends React.Component {

    resendHandler = (event) => {
        event.preventDefault()
        this.props.resend()
    }

    render()
    {
       if (this.props.token === undefined)
        return (
            <Grid>
              <Row style={{position: 'static'}}>
                <Col lg={12}>
                    <Panel>
                        <Panel.Body>

                    <h2 className="Panel-title" >
                      Please, verify your email
                    </h2>
                        <br />
                            You are in one step to open amazing oportunities with Tokenstarter platform. Please, check your mailbox, we've sent verificaion letter.<br />
                        <br />

                        <a href={null} onClick={this.resendHandler} >
                        <Button type="button" bsStyle='primary'>
                            <span style={{color: 'ffffff'}}> Resend activation code</span></Button>
                         </a>
                        </Panel.Body>
                </Panel>
               </Col>
            </Row>

     </Grid>);

        else {
           this.props.checkVerificationToken(this.props.token)
           return <Redirect to={'/verify-email'}/>
        }

    }

}


const mapDispatchToProps = (dispatch) => ({
    checkVerificationToken: (token) => dispatch(checkVerificationToken(token)),
    resend: () => dispatch(resendVerificationMail())

})

export default connect(undefined, mapDispatchToProps)(VerifyEmail);
