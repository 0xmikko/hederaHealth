import React from 'react'
import { Grid, Col, Row } from 'react-bootstrap'
import Finder from '../../components/Finder/Finder'
import DataLoader from "../DataWrappers/CaseListLoader"



class Patient extends React.Component
{

  render (){

    return <Grid>
      <Row>
        <Col sm={12}>
            <DataLoader {...this.props} balances={true}>
                <Finder
                    type = 'BalancesOptionItem'
                    header = 'My Options'
                />
                <Finder
                    type = 'BalancesTokenItem'
                    header = 'My Tokens'
                />
           </DataLoader>
        </Col>
    </Row>
    </Grid>
  }


}

export default Patient;
