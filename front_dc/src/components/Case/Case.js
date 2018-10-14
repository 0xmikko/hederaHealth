import React from 'react';
import {Panel, Grid } from 'react-bootstrap';

import Header from './Header';
import PanelMenu from './PanelMenu';
//import PanelBuy from './PanelBuy';

class infoPage extends React.Component {
    constructor(props) {
        super(props)
        this.BuyRef = React.createRef();
    }

    scroll = () =>
    {
        this.BuyRef.current.scrollIntoView({block: 'end', behavior: 'smooth'});
    }

    render() {

        if ((this.props.optionData !== undefined) && (this.props.projectData !== undefined)) {
            return (

                <Panel style={{border: '0px'}}>
                    <Header
                        optionData={this.props.optionData}
                        projectData={this.props.projectData}
                        buyRef={ this.scroll }
                        />

                    <Panel.Body style={{padding: 0}}>
                        <Grid>
                            <PanelMenu
                                optionData={this.props.optionData}
                                projectData={this.props.projectData}
                                />

                            <div ref={this.BuyRef}>
                                {/*} <PanelBuy
                                optionData={this.props.optionData}
                                projectData={this.props.projectData}
                                {...this.props}
                                ref={this.BuyRef}

                            />*/}</div>
                        </Grid>
                    </Panel.Body>
                </Panel>

            );
        }
        return <p>Loading...</p>
    }
}


export default infoPage;

