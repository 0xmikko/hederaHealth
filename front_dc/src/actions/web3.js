import Web3 from 'web3'
import {switchToIntWallet, switchToWeb3Wallet} from "./wallet";
import {getAccountWeb3} from "./wallet";
import * as actions from './actions'


function web3Initialized(results) {
  return {
    type: actions.WEB3_INITIALIZED,
    payload: results
  }
}


export const Web3Dispatch = () => {
    return dispatch => {
        let results
        let web3 = window.web3

        // Checking if Web3 has been injected by the browser (Mist/MetaMask)
        if (typeof web3 !== 'undefined') {
            // Use Mist/MetaMask's provider.


            let WWeb3 = new Web3(web3.currentProvider)

            WWeb3.version.getNetwork((err, netId) => {
                if (err) {
                        alert(err);
                        dispatch(switchToIntWallet())
                        return;
                      }
                      if (netId !== '42') {
                          alert('Tokenstarter alpha version works on Kovan network only. We detected that you ' +
                              ' use different network. Please, select Kovan network and than try to switch to Metamask wallet. \n' +
                              '\nFor more info check our help pages \n\n' +
                              'Thanks!');
                          dispatch(switchToIntWallet())

                      }
                    });

            results = {
                web3Instance: WWeb3
            }

            dispatch(switchToWeb3Wallet());
            dispatch(getAccountWeb3(WWeb3));
            return dispatch(web3Initialized(results))

        } else {

            alert('Metamask not found. You continue use internal wallet');
            return dispatch(switchToIntWallet())

        }
    }
}



export default Web3Dispatch;