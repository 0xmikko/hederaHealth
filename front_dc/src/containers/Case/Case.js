import React from 'react'

import InfoPage from '../../components/Case/Case'

import CaseListLoader from "../DataWrappers/CaseListLoader"
import CaseDataLoader from "../DataWrappers/CaseDataLoader"


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

        return <CaseDataLoader tokenContractAddress={tokenContractAddress} {...this.props}>
                    <InfoPage
                    optionData={optionItem}
                    {...this.props}
                    />
                </CaseDataLoader>

    }
}


const wrapper = (props) =>
{

    return (
        <CaseListLoader {...props}>
                <OptionPage {...props} />
        </CaseListLoader>
    );
}


export default wrapper;
