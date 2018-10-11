import React, { Component } from "react";
import { SmartTextFormControlField } from './SmartTextField';
import web3 from 'web3'

export class EthAddressField extends SmartTextFormControlField{

    validate_process = (value) => {

        let value_lenght = value.length;

        if (web3.utils.isAddress(value))
            {
              return { res: true,
                        error_msg: 'Ok'};
            }


        return {
                    res: false,
                    error_msg: 'Incorrect ETH address'};




    }


    
}

export default EthAddressField;