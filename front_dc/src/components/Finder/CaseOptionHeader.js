import React from 'react'
import { LinkWithNamedTooltip } from './../UI/Tooltip'


export const CaseOptionHeader = (props) => {

    return(

            <tr>
                <th width="4%" style={{textAlign: 'left' }}></th>
                <th width="30%" style={{textAlign: 'left' }}>Project</th>


                <th width="12%" style={{textAlign: 'center'}}>Premium&nbsp;
                   <LinkWithNamedTooltip tip_id="premium" id="tooltip-1"/>


                </th>
                <th width="14%" style={{textAlign: 'center'}}>Strike price&nbsp;
                    <LinkWithNamedTooltip tip_id="strike_price" id="tooltip-2"/>
                </th>
                <th width="12%" style={{textAlign: 'center'}}>Expired at&nbsp;
                   <LinkWithNamedTooltip tip_id="expired_at" id="tooltip-3"/>
                </th>
                <th width="12%" style={{textAlign: 'center'}}>Token price&nbsp;
                    <LinkWithNamedTooltip tip_id="token_price" id="tooltip-4"/>
                </th>
                <th width="14%" style={{textAlign: 'center'}}>Sales dates&nbsp;

                </th>

            </tr>

        );
    }


export default CaseOptionHeader;
