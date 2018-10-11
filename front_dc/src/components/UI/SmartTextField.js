import React, { Component } from "react";
import { FormControl } from 'react-bootstrap'
import InlineField from './Field'

export class SmartTextFormControlField extends Component{
    state = {
        value: '',
        hint: '',
    }

    updateValue = (newValue) => this.setState({value: newValue});

    handleChange = (event) => {
        const value = event.target.value;  
        this.updateValue(value);
        this.validate(value);        
    }

    form_validate = () => {
        const value = this.state.value;  
        return this.validate(value);
    }

    validate = (value) => {

        let hint = 'Correct';
        let my_color = 'success'; 
        let validation_res;
    
        validation_res = this.validate_process(value);

        if (!validation_res['res'])
        {
            hint = validation_res.error_msg;
            my_color =  'warning';
        }

        this.setState({hint: hint,
                       validationState: my_color});

        return validation_res['res'];
    }

    validate_process = (value) => {
      
        const value_lenght = value.length;

        if ((value_lenght === 0))
        {
            return {
                    res: false,
                    error_msg: 'Could not be empty'};
        }
        return {
            res: true,
            error_msg: 'Ok'};

    }
    
    render()
    {
        return (
            <InlineField label={this.props.label}
                         hint_color = {this.state.color}
                         hint = {this.state.hint}
                         validationState={this.state.validationState}>
                    <FormControl
                        type="text"
                        value={this.state.value}
                        placeholder={this.props.placeholder}
                        onChange={this.handleChange}
                    />
            </InlineField>

        );
    }
}

export default SmartTextFormControlField;