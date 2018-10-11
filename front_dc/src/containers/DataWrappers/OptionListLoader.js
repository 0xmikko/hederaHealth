import React from 'react'
import { connect } from 'react-redux'

import * as status from '../../config'
import * as actionsOptions from '../../actions/options'
import * as reducers from '../../reducers/index'

import {WALLET_INT, WALLET_WEB3} from "../../actions/wallet";


class OptionListLoader extends React.Component
    {


    componentWillReceiveProps(nextProps) {
      if (nextProps.wallet.type !== this.props.wallet.type) this.updateOptionList()
    }

    updateOptionList = () =>
        {

        const balances = (this.props.balances === undefined) ? false : this.props.balances;

        switch(this.props.wallet.type) {
            case WALLET_INT:
                this.props.onInitListInt();
                break;

            case WALLET_WEB3:
                this.props.onInitListWeb3(this.props.web3, balances)
                break;
              }

        }

    componentDidMount() {
        this.updateOptionList()
    }

    render ()
        {
        let childrenWithProps = this.props.children, itemsList;

        itemsList = (this.props.wallet.type ===  WALLET_INT) ? this.props.itemsINTList : this.props.itemsWEB3List;

        if (itemsList !== undefined)
            {

            switch(itemsList.status)
                {
                  case status.STATUS_LOADING:
                    childrenWithProps =  <p>Loading</p>
                    break;

                  case status.STATUS_SUCCESS:
                    const { children } = this.props;

                    childrenWithProps = React.Children.map(children, child =>
                    React.cloneElement(child, { ...this.props,
                                                itemsList: itemsList }));
                    break;

                  default:
                    childrenWithProps =  <p>Loading</p>
                    break;

                }
            }

        return <React.Fragment>{ childrenWithProps}</React.Fragment>
      }


    }

const mapStateToProps = (state) => ({

  itemsINTList: reducers.getOptionsListInt(state),
  itemsWEB3List: reducers.getOptionsListWeb3(state)

})

const mapDispatchToProps = dispatch => {
  return {

      onInitListInt:   () => dispatch(actionsOptions.getOptionsListInt()),
      onInitListWeb3:  (web3, balances) => dispatch(actionsOptions.getOptionsListWeb3(web3, balances)),

  }
};


export default connect(mapStateToProps, mapDispatchToProps)(OptionListLoader);

