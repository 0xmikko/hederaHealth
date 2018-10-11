import React from 'react';
import { Row, Col, FormGroup, FormControl,
         InputGroup, Button} from 'react-bootstrap';
import { formatPrice } from "../../utils/formaters";


class Calc extends React.Component
{

  state = { qty: '0', total: 0, disabled: true }

  onOptionQTYHandler = (e) => {

    e.preventDefault();
    let value = e.target.value, disabled;
  
    if (value.length === 0) {
        this.setState({qty: '0', total: 0, disabled: true});
        return
      }

    if (value.indexOf('e') !== -1) return;

    const num = parseInt(value);
    if (isNaN(num)) return

    if (this.props.maxNumber === undefined) { disabled = (num) ? false : true; }
        else { disabled = ((num>0) && (num<=this.props.maxNumber)) ? false : true; }

    this.setState({
                  qty: num,
                  total: (num * this.props.price).toFixed(5),
                  disabled: disabled
                  });
  }

  render()
  {

    return (
        <form>
          <Row>
            <Col sm={4}>
              <FormGroup>
                <InputGroup>
                  <FormControl
                          type="text"
                          value={this.state.qty}
                          onChange={this.onOptionQTYHandler}
                          style={{textAlign: 'right'}} />
                  <InputGroup.Addon>{this.props.symbol}</InputGroup.Addon>
                </InputGroup>
              </FormGroup>
            </Col>

            <Col sm={1} style={{textAlign: 'center', verticalAlign: 'middle', lineHeight: '30px'}}>
              x
            </Col>
            <Col sm={3}>
              <FormGroup>
                <InputGroup>
                  <FormControl
                          type="text"
                          disabled
                          value={formatPrice(this.props.price)}
                          style={{textAlign: 'right'}} />
                  <InputGroup.Addon>ETH</InputGroup.Addon>
                </InputGroup>
              </FormGroup>
            </Col>
            <Col sm={1} style={{textAlign: 'center', verticalAlign: 'middle', lineHeight: '30px'}}>
              =
            </Col>
            <Col sm={3}>
              <FormGroup>
                <InputGroup>
                  <FormControl
                          type="text"
                          value={this.state.total}
                          style={{textAlign: 'right'}}
                          disabled/>
                  <InputGroup.Addon>ETH</InputGroup.Addon>
                </InputGroup>
              </FormGroup>
            </Col>

          </Row>
       <Row style={{marginTop: '20px', textAlign: 'center'}}>
         <Col sm={12} style={{align: 'center'}}>
            <Button
                onClick={() => this.props.onSubmitHandler(this.state.qty)}
                bsStyle="success"
                disabled={this.state.disabled}
                style={{minWidth: '200px'}}
                >
                { this.props.operation }
            </Button>
          </Col>

      </Row>
      </form>);
}
}


export default Calc;
