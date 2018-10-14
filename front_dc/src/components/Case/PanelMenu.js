import React from 'react';
import { Col, Row, Tab, Nav, NavItem } from 'react-bootstrap';

import PanelInfo from './PanelInfo'
import PanelNews from './PanelNews'
import PanelToken from './PanelToken'
import { toHumanDate, rateToPrice, formatPrice } from "../../utils/formaters";
import { LinkWithNamedTooltip } from "../UI/Tooltip";

const menu = ( props ) => {
    return (<Row >

      <Col sm={12}>
        <Tab.Container id="uncontrolled-tab-example"
          defaultActiveKey="Overview">

            <Row className="clearfix">
                <Col sm={12}>
                  <Nav bsStyle="tabs" style={{spacing:0, padding: 0, border: 0}} >
                    <NavItem eventKey="Overview">Overview</NavItem>
                    <NavItem eventKey="News">News</NavItem>
                  </Nav>
                </Col>
                <Col sm={12}>
                  <Tab.Content animation>
                    <Tab.Pane eventKey="Overview">
                         <Row style={{ border: 0,
                          backgroundColor: '#F0F0F0', margin: 0, marginTop: '20px'}}>

                            <Col sm={3} align="center">
                                <h4>Premium&nbsp;
                                   <LinkWithNamedTooltip tip_id="premium" id="tooltip-1"/>
                                </h4>
                                <h2 style={{textAling: 'right'}}>{
                                    formatPrice(rateToPrice(props.optionData.optionPremiumRate, 18))}
                                </h2>
                            </Col>

                            <Col sm={3} align="center">
                                <h4>Strike Price&nbsp;
                                    <LinkWithNamedTooltip tip_id="strike_price" id="tooltip-2"/>
                                </h4>


                                <h2 style={{textAling: 'right'}}>
                                    {formatPrice(rateToPrice(props.optionData.optionStrikePriceRate, 18))}
                                </h2>
                            </Col>

                            <Col sm={3} align="center">
                                <h4>Expired at&nbsp;
                                    <LinkWithNamedTooltip tip_id="expired_at" id="tooltip-3"/>
                                </h4>
                                <h2 style={{textAling: 'right'}}>{toHumanDate(props.optionData.optionExpiredAt)}</h2>
                            </Col>

                            <Col sm={3} align="center">
                                <h4>Token Price&nbsp;
                                     <LinkWithNamedTooltip tip_id="token_price" id="tooltip-4"/>
                                </h4>
                                <h2 style={{textAling: 'right'}}>
                                    { formatPrice(props.projectData.crowdsaleTokenPrice)}</h2>
                            </Col>

                        </Row>
                        <Row>
                            <Col sm={12}>
                        <br />
                                <h2>Overview</h2>
                            <PanelInfo optionData={props.optionData}
                                                        projectData = {props.projectData}/>
                                 <br />
                                <h2>Crowdsale details</h2>
                                 <PanelToken optionData={props.optionData}
                                                        projectData = {props.projectData}/>

                                <br /><br />
                        </Col>
                        </Row>
                    </Tab.Pane>
                    <Tab.Pane eventKey="Description"></Tab.Pane>
                    <Tab.Pane eventKey="News"><PanelNews data={props.data} /></Tab.Pane>

                  </Tab.Content>
                </Col>
              </Row>
        </Tab.Container>
      </Col>
      <Col sm={1}></Col>
      </Row>

      );
}


export default menu;
