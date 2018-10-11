import React from "react";
import { FormGroup,
         Form,
         FormControl,
         Col,
         Row,
         Panel,
         Table,
         } from 'react-bootstrap'

import ProjectDataLoader from '../../containers/DataWrappers/ProjectDataLoader'
import './Finder.css'

import MarketplaceOptionHeader from './MarketplaceOptionHeader'
import BalancesOptionHeader from './BalancesOptionHeader'
import BalancesTokenHeader from './BalancesTokenHeader'

import MarketplaceOptionItem from "./MarketplaceOptionItem"
import BalancesTokenItem from './BalancesTokenItem'
import BalancesOptionItem from './BalancesOptionItem'


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
            case 'BalancesTokenItem':
                headerItem = <BalancesTokenHeader/>
                break;

            case 'BalancesOptionItem':
                headerItem = <BalancesOptionHeader/>
                break;

            case 'MarketplaceOptionItem':
            default:
                headerItem = <MarketplaceOptionHeader/>
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
                                case 'BalancesTokenItem':
                                    finderItem = <BalancesTokenItem
                                                            data={dataRow}
                                                            key={dataRow.optionTokenContractAddress}
                                                            search={this.state.search}/>
                                    break;
                                case 'BalancesOptionItem':
                                    finderItem = <BalancesOptionItem
                                                            data={dataRow}
                                                            key={dataRow.optionTokenContractAddress}
                                                            search={this.state.search}/>
                                    break;
                                case 'MarketplaceOptionItem':
                                default:
                                    finderItem = <MarketplaceOptionItem
                                                            data={dataRow}
                                                            key={dataRow.optionTokenContractAddress}
                                                            search={this.state.search}/>
                                break;
                            }
                            return <ProjectDataLoader tokenContractAddress={dataRow.tokenContractAddress}
                                                      key={'PL' + dataRow.optionTokenContractAddress}
                                                      {...this.props}>
                                        { finderItem }
                                   </ProjectDataLoader>
                                    })}

                        </tbody>

                        </Table>
                     </Panel.Body>
                    </Panel>

        );
    }
}


export default Finder;
