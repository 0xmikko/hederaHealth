import React from "react";
import { FormGroup,
         Form,
         FormControl,
         Col,
         Row,
         Panel,
         Table,
         } from 'react-bootstrap'

import './Finder.css'

import CaseOptionHeader from './CaseOptionHeader'
import CaseOptionItem from "./CaseOptionItem"
import CaseDataLoader from "../../containers/DataWrappers/CaseDataLoader"

export class Finder extends React.Component{

    state = {
        table_data: '',
        search: '',
    }

    searchHandler(e){
        e.preventDefault();
        const value = e.target.value.toLowerCase();
        this.setState({search: value});
    }


    render(){

      const items = Object.values(this.props.itemsList.data)
      let headerItem, finderItem;
      let type= (this.props.type === undefined) ? 'MarketplaceOptionItem' : this.props.type ;

      switch(type)
        {
            case 'CaseOptionHeader':

            default:
                headerItem = <CaseOptionHeader/>
            break;
        }

      return(

            <Panel>
              {/*<Panel.Heading style={{
                                height: '56px',
                                backgroundColor: '#FFFFFF',
                                verticalAlign: 'top',

                            }}>

                    </Panel.Heading>*/}
                    <Panel.Body>
                    <Row style={{marginBottom: '15px'}}>
                      <Col sm={8}>
                        <h2 className="Panel-title" >
                          {this.props.header}
                        </h2>
                        </Col>
                        <Col sm={4} style={{textAlign: 'right'}}>
                          <Form inline >
                            <FormGroup align="right" >
                              <FormControl
                                type="text"
                                id='search'
                                placeholder="Search"
                                style={{backgroundColor: '#FFFFFF', width: '100%', marginTop: '8px'}}
                                onKeyUp={(e)=>this.searchHandler(e)}
                                >

                             </FormControl>
                            </FormGroup>

                            </Form>
                        </Col>
                        </Row>
                      <Table responsive striped hover>
                        <thead>
                            { headerItem }
                        </thead>
                        <tbody>
                          { items.map(dataRow => {

                            switch(type)
                            {

                                case 'CaseOptionItem':
                                default:
                                    finderItem = <CaseOptionItem
                                                            data={dataRow}
                                                            key={dataRow.optionTokenContractAddress}
                                                            search={this.state.search}/>
                                break;
                            }
                            return <CaseDataLoader tokenContractAddress={dataRow.tokenContractAddress}
                                                      key={'PL' + dataRow.optionTokenContractAddress}
                                                      {...this.props}>
                                        { finderItem }
                                   </CaseDataLoader>
                                    })}

                        </tbody>

                        </Table>
                     </Panel.Body>
                    </Panel>

        );
    }
}


export default Finder;
