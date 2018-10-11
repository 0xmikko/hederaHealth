import React from 'react'
import { Link } from 'react-router-dom'
import { toHumanDate, rateToPrice, formatPrice } from "../../utils/formaters";


const MarketplaceOptionItem = (props) =>

{

    const project = props.projectData;
    const option = props.data;
    const href = '/options/' + option.optionTokenContractAddress.toString()

    // Search is moved to component level cause we have data for projects and for options
    // And have to search in this fields
    if (props.search !== undefined) {
        const search = props.search
        // If search criteria is set up return nothing if we could not it found
        if ((option.optionTokenName.toLowerCase().indexOf(search) === -1) &&
            (option.optionTokenSymbol.toLowerCase().indexOf(search) === -1) &&
            (project.projectName.toLowerCase().indexOf(search) === -1)) {
            return <React.Fragment/>
        }
    }

    return(
        <tr key={ option.optionTokenContractAddress } >
            {
                <td align="center" width="80">
                 <img src={ project.icon }  width="80" />
                </td>
            }
            <td align="left">
                <Link to={href}>
                    <strong>
                        { project.projectName.toString().toUpperCase() }&nbsp;
                        ({ option.optionTokenSymbol })
                        </strong><br />
                </Link>
                { project.projectSnippet }
            </td>

            <td align="center">{ formatPrice(rateToPrice(option.optionPremiumRate)) }</td>
            <td align="center">{ formatPrice(rateToPrice(option.optionStrikePriceRate)) }</td>
            <td align="center">{ toHumanDate(option.optionExpiredAt) }</td>
            <td align="center">{ formatPrice(project.crowdsaleTokenPrice) }</td>
            <td align="center">{ toHumanDate(option.salesStartTime) }-{ toHumanDate(option.salesFinishTime)  }</td>

        </tr>
        );

}

export default MarketplaceOptionItem;
