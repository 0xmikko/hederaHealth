import React from 'react'

const WalletWidget = (props) => {

    return <React.Fragment>
                Wallet type:&nbsp;
        {(props.wallet.type === WALLET_INT) ? 'Built-it' : 'Metamask'}
        <br />
                Account: &nbsp;

                { (props.wallet.type === WALLET_INT) ? props.wallet.accountInt : props.wallet.accountWeb3 }


           </React.Fragment>
}

export default WalletWidget;

