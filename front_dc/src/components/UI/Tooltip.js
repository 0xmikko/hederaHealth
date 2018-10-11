import React from 'react';
import { OverlayTrigger, Tooltip, Glyphicon } from 'react-bootstrap';

export default function LinkWithTooltip({ tooltip, id }) {
  return (
    <OverlayTrigger
      overlay={<Tooltip id={id}>{tooltip}</Tooltip>}
      placement="bottom"
      delayShow={300}
      delayHide={150}
    >
      <a href="#">
           <Glyphicon glyph={'question-sign'} style={{color: '#A0A0A0'}}/>
      </a>
    </OverlayTrigger>
  );
}

export function LinkWithNamedTooltip({ tip_id, id }) {

  const tips = {
    premium: "The premium is the price a investor pays the startup for an option.\n" +
            "The premium is paid up front at purchase and is not refundable",

    strike_price: "Price the token can be bought by the option buyer up till the expiration date.",
    expired_at: "Expiration date of an option contract is the last date on which the holder of the option may exercise it according to its terms",
    token_price: "Token price set up during crowdsale"
  }

  return <LinkWithTooltip
            tooltip={tips[tip_id]}
            id={id}/>
}