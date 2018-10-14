import React from 'react'
import { connect } from 'react-redux'

import * as status from '../../config'
import * as actionsOptions from '../../actions/cases'
import * as reducers from '../../reducers/index'


class CaseListLoader extends React.Component
    {

    componentDidMount() {
        this.onInitList()
    }

    render ()
        {
        let childrenWithProps = this.props.children, itemsList;

        itemsList =  this.props.casesList;

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

  casesList: reducers.getCasesList(state),

})

const mapDispatchToProps = dispatch => {
  return {
      onInitList:   () => dispatch(actionsOptions.getCasesList()),
  }
};


export default connect(mapStateToProps, mapDispatchToProps)(CaseListLoader);

