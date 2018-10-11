import React from 'react'
import { Link } from 'react-router-dom'
import { Button } from 'react-bootstrap'
import { formatPrice } from "../../utils/formaters";


const BalancesOptionItem = (props) => {

    const project = props.projectData;
    const option = props.data;
    const href = '/options/' + option.optionTokenContractAddress.toString()

    // Search is moved to component level cause we have data for projects and for options
    // And have to search in this fields
    if (props.search !== undefined) {
        const search = props.search
        // If search criteria is set up return nothing if we could not it found
        if ((project.tokenName.toLowerCase().indexOf(search) === -1) &&
            (project.tokenSymbol.toLowerCase().indexOf(search) === -1) &&
            (project.projectName.toLowerCase().indexOf(search) === -1)) {
            return <React.Fragment/>
        }
    }

    return(
        <tr key={ option.optionTokenContractAddress } >

           <td align="left">
                <Link to={href}>
                    <strong>
                        { project.tokenSymbol }
                        &nbsp;
                        ({ project.projectName.toString().toUpperCase() })
                        </strong>
                </Link>
            </td>
            <td align="center">{ formatPrice(option.projectBalance, project.tokenDecimals) }</td>
            <td align="center">{ formatPrice(project.crowdsaleTokenPrice) }</td>
            <td align="center">{ formatPrice(project.crowdsaleTokenPrice) }</td>
            <td align="center">{ formatPrice(project.crowdsaleTokenPrice) }</td>
            <td align="center">{ formatPrice(project.crowdsaleTokenPrice) }</td>
            <td align="center">
                <Button bsSize={'xs'}
                        bsStyle={'info'}
                        onClick={ () =>  props.showModal("Transfer",
                                                        '',
                                                        option,
                                                        project)}

                >Transfer</Button>
            </td>

        </tr>
        );

}

export default BalancesOptionItem;
