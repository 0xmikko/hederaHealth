import React from 'react'
import { FormGroup, HelpBlock, Label, FormControl } from 'react-bootstrap';

export default ({name, label, error, type, ...rest}) => {
  const id = `id_${name}`,
        input_type = type?type:"text"
  return (
    <FormGroup color={error?"danger":""}>
      {label?<Label htmlFor={id}>{label}</Label>: ""}
      <FormControl type={input_type} name={name} 
             id={id} className={error?"is-invalid":""}
             {...rest} />
      {error?
         <HelpBlock className="invalid-feedback">
           {error}
         </HelpBlock>
         : ""
      }
    </FormGroup>
  )
}