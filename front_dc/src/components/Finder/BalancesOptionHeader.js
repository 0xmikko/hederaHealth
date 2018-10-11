import React from 'react'
import HelpTooltip, {LinkWithNamedTooltip} from './../UI/Tooltip'
import './FinderTable.css'

export const BalancesOptionHeader = (props) => {

        return(
            <tr>
                <th width="30%">Project</th>
                <th width="12%" className="thCenter">Balance</th>


                <th width="12%" className="thCenter">Strike price&nbsp;
                    <LinkWithNamedTooltip tip_id="strike_price" id="tooltip-2"/>
                </th>
                <th width="16%" className="thCenter">Expired at&nbsp;
                   <LinkWithNamedTooltip tip_id="expired_at" id="tooltip-3"/>
                </th>
                <th width="12%" className="thCenter">Option Price&nbsp;
                 <HelpTooltip tooltip="This price indicates possible price on derivatives exchange. Now it used for testing purposes only."
                             id="tooltip-4"/></th>
                <th width="18%">&nbsp;</th>
            </tr>
        );
    }


export default BalancesOptionHeader;