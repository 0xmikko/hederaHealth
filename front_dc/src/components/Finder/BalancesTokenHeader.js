import React from 'react'
import HelpTooltip from './../UI/Tooltip'

import './FinderTable.css'

export const OptionHeader = (props) => {

        return(
            <tr>
                <th width="30%">Project</th>
                <th width="12%" className="thCenter">Balance</th>

                <th width="10%" className="thCenter">Current price</th>
                <th width="10%" className="thCenter">24h Low price</th>
                <th width="10%" className="thCenter">24h High price</th>
                <th width="10%" className="thCenter">24h Avg. price</th>
                <th width="18%" className="thCenter">&nbsp;</th>
            </tr>
        );
    }


export default OptionHeader;