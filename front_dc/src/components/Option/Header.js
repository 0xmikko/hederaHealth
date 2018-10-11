import React from 'react';
import { Panel, Grid, Row, Col, Button } from 'react-bootstrap';
import "./Option.css"

const Header = (props) => {

    return <Panel.Heading
                style={{backgroundColor: props.projectData.projectColor}}
                className="panelHeader">

                <Grid className={'cont_grid'}>
                    <br />
                    <Row>
                        <Col sm={10}>

                            <h3 style={{
                                marginTop: '10px',
                                marginBottom: '0px',
                                color: '#FFFFFF'
                            }}>
                                {props.projectData.projectName + ' (' + props.optionData.optionTokenSymbol + ')'}
                            </h3>
                            <h2 style={{
                                marginTop: '0px',
                                marginBottom: '30px',
                                color: '#FFFFFF'}}>
                                {props.projectData.projectSnippet}
                            </h2>
                            <Button style={{marginTop: '0px', marginBottom: '40px', minWidth: '100px'}}
                                    onClick={() => props.buyRef()}> BUY </Button>
                        </Col>
                        <Col sm={2}>
                            <img src={props.projectData.icon} style={{maxWidth: '120px', marginTop: '10px'}}/>
                        </Col>
                    </Row>

                </Grid>
            </Panel.Heading>
};

export default Header;
