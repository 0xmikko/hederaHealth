import React from 'react'
import { Grid } from 'react-bootstrap'
import Finder from '../../components/Finder/Finder'
import DataLoader from '../DataWrappers/OptionListLoader'


class Marketplace extends React.Component
{

  render (){

    return  <Grid>
                <DataLoader {...this.props}>
                        <Finder
                            type = 'MarketplaceOptionItem'
                            header = 'Initial Options Offering'
                        />
                </DataLoader>
            </Grid>
  }


}

export default Marketplace;