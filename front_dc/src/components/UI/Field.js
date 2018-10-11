import React from 'react';
import { FormGroup, FormControl, ControlLabel, HelpBlock, Col } from 'react-bootstrap';


const InlineField = (props) => {
         return <FormGroup validationState={props.validationState}>
                <Col sm={2}>
                <ControlLabel>
                    { props.label }
                    </ControlLabel>
                </Col>
                <Col sm={9}>
                    { props.children }
                <FormControl.Feedback />
                <HelpBlock style={props.hint_color}>{ props.hint }</HelpBlock>

                </Col>
            </FormGroup>
}

export default InlineField;