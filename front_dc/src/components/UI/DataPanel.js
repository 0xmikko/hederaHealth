import React from 'react';
import { Panel, Col, Row } from 'react-bootstrap';

const DataPanel = (props) =>{

    let data_block = '';

    if (props.data !== undefined){
        data_block = props.data.map(d => {
            return <Row>
                        <Col sm={5}>
                            { d.label }
                        </Col>
                        <Col sm={6}>
                            { d.value }
                        </Col>

                    </Row>
        })
    }

    let header, label;
    if (props.header !== undefined) header = <Panel.Heading  style={{height: '40px',
                                                                    backgroundColor: '#121D30',
                                                                    verticalAlign: 'top'

                                                                    }}>

        <h5 className="Panel-title" style={{color: '#FFFFFF', marginTop: 0, marginBottom: '10px'}}>  { props.header } </h5>
    </Panel.Heading>

    if (props.label !== undefined) label = <h4 style={{marginTop: '0px'}}>{props.label}</h4>
    return (

        <Panel >
            { header }
            <Panel.Body>
                { label }
                {data_block}
                {props.children}
            </Panel.Body>
        </Panel>
    );

}

export default DataPanel;