import React from 'react';
import WelcomePage from '../Modals/Welcome'
import WalletPage from '../Modals/Balances'
import MarketplacePage from '../Modals/Marketplace'
import ExchangePage from "../Modals/Exchange"

export default (props) => {

    switch(props.menuItem) {
        case 'options':
            return <MarketplacePage {...props}/>

        case 'exchange':
            return <ExchangePage {...props}/>

        case 'balances':
            return <WalletPage {...props}/>

        default:
            return <WelcomePage {...props}/>
}

}