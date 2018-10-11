import React, { Component } from "react";
import { Form, FormGroup, FormControl, Label, HelpBlock,Col, Panel, Button } from 'react-bootstrap';
import { SmartTextFormControlField } from '../UI/SmartTextField';
import { EthAddressField } from '../UI/EthAddressField'



class IcoForm extends Component{

    form_data = [
        {
            id: 'name',
            type: 'TextFormControlField',
            label: 'Startup name*',
            placeholder: 'Your project name',
        },
        {
            id: 'description',
            type: 'TextFormControlField',
            label: 'Short description (up to 20 words)*',
            placeholder: 'Your project descritpion',
        },
        {
            id: 'webpage',
            type: 'TextFormControlField',
            label: 'Webpage',
            placeholder: 'Webpage',
        },
        {
            id: 'whitepaper',
            type: 'TextFormControlField',
            label: 'White paper link',
            placeholder: 'Link to published whitepaper',
        },
        {
            id: 'country',
            type: 'TextFormControlField',
            label: 'country',
            placeholder: 'Country',
        },
        {
            id: 'eth_address',
            type: 'EthAddressField',
            label: 'Token contract',
            placeholder: 'Token contract address',
        },
    ]


    data =
        {
            ico_name: 'Tokenstarter',
            ico_description: 'The best',
            eth_address: '0x1234567890123456789012345678901234567890'
        }
    

    handleSubmit = (event) =>
    {
        event.preventDefault();
        let error_counter = 0;
        this.form_data.map(field => {
            if (!this.refs[field.id].form_validate()) error_counter++;
        });

        return error_counter;

    }
    

    render(){
        return (

                 <Panel>
                    <Panel.Heading style={{backgroundColor: '#DEDEDE',
                        minheight: '50px'}}>
                    

                    <h3 className="Panel-title" style={{color: '#555555'}}>Set up your project</h3>
                    </Panel.Heading>
                    <Panel.Body>
                
                        <Form horizontal>
                            {this.form_data.map(field =>
                                {
                                    switch(field.type)
                                    {
                                        case 'TextFormControlField':
                                            return (<SmartTextFormControlField
                                                        key = {field.id}
                                                        label={field.label}
                                                        placeholder = {field.placeholder}
                                                        />)
                                        break;

                                        case 'EthAddressField':
                                            return(<EthAddressField id = {field.id} label={field.label}/>)
                                        break;

                                    }

                                })}

                            <Button onClick={this.handleSubmit}>Next</Button>

                        </Form>

                         

                </Panel.Body>
          </Panel>

       
    );      
    }
}


export default IcoForm;