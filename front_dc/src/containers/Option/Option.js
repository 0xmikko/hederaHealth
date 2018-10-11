import React from 'react'

import InfoPage from '../../components/Option/Option'

import OptionListLoader from "../DataWrappers/OptionListLoader"
import ProjectDataLoader from "../DataWrappers/ProjectDataLoader"


class OptionPage extends React.Component {

    render() {

        if (this.props.optionAddress === undefined) return <p>Choose project</p>;


        const items = Object.values(this.props.itemsList.data)
        let optionItem

        try {
            optionItem = items.filter(el => (el.optionTokenContractAddress === this.props.optionAddress))[0]
        }
        catch (e) {
            return <p>Internal Error</p>
        }

        if (optionItem === undefined) return <p>Loading</p>

        const tokenContractAddress = optionItem.tokenContractAddress;

        return <ProjectDataLoader tokenContractAddress={tokenContractAddress} {...this.props}>
                    <InfoPage
                    optionData={optionItem}
                    wallet={this.props.wallet}
                    {...this.props}
                    />
                </ProjectDataLoader>

    }
}


const wrapper = (props) =>
{

    return (
        <OptionListLoader {...props}>
                <OptionPage {...props} />
        </OptionListLoader>
    );
}


export default wrapper;
