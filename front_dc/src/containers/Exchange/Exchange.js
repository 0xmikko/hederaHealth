import React from "react";
import { Panel, Grid, Row, Col, Button } from 'react-bootstrap'
import ReactDisqusComments from 'react-disqus-comments';

export class Exchange extends React.Component{
    render(){
        return(
            <Grid>
              <Row style={{position: 'static'}}>
                <Col lg={12}>
                    <Panel>
                        <Panel.Body>

                    <h2 className="Panel-title" >
                      Decentralized Token Option Exchange is under development
                    </h2>
                        <br />
                        <h4>Overview</h4>


                          Trading options has its own nuances and to figure out which features are needed and market fit, the Tokenstarter Option Exchange will be based on 0x protocol.
                            The Option Exchange will be integrated with core system by token option smart contract.
<br />
                        <br />
                        <h4>One business process</h4>
                            Tokenstarter goal is to become one window provider for invstments in token devrivatives<br />

                        <br />
                        <h4>Interested? Leave a comment</h4>
                            We hardly working to deliver the best, and you option is significant for us. If you are interested in Option Exchange,
                            please leave you comment below.
                            <br /><br />
                            Thank you! Together we could build outstanding product!
                            <br /><br />

                       <br /><br />

                         <ReactDisqusComments
                                shortname="tokenstarter-io"
                                identifier={"exchange" }
                                title="Exchange feedback"
                          />
                        </Panel.Body>
                </Panel>
               </Col>
            </Row>

     </Grid>

                    );
    }
}

export default Exchange;