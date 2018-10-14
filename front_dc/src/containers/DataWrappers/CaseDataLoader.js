import React from 'react'
import { connect } from 'react-redux'

//import * as actions from '../../actions/projects'
import * as reducers from '../../reducers/index';
import * as status from '../../config'


class CaseDataLoader extends React.Component
{

    state = { project: undefined }

    componentDidMount() {
     const tokenContractAddress = this.props.tokenContractAddress;
     this.props.getProjectData(tokenContractAddress)
    }

    componentWillReceiveProps(nextProps) {

        const tokenContractAddress = nextProps.tokenContractAddress;

        if ((nextProps.projects !== undefined) &&
            (nextProps.projects[tokenContractAddress] !== undefined) &&
            (nextProps.projects[tokenContractAddress].status !== status.STATUS_UPDATE_NEEDED)) {

            this.setState({project: nextProps.projects[tokenContractAddress] })
        }
    }


    render ()
        {
            if (this.state.project === undefined) return <tr><td>"Loading project data..."</td></tr>

        let childrenWithProps = "Loading...";
        const project = this.state.project.data;

         switch(this.state.project.status)
         {
            default:
            case status.STATUS_UPDATE_NEEDED:
            case status.STATUS_LOADING:
                return <tr><td>"Loading project data..."</td></tr>

            case status.STATUS_FAILURE:
                return <tr><td>"Server error..."</td></tr>

            case status.STATUS_SUCCESS:
                const { children } = this.props;

                childrenWithProps = React.Children.map(children, child =>
                React.cloneElement(child, { ...this.props,
                                            projectData: project }));
                break;

        }

        return <React.Fragment>{ childrenWithProps }</React.Fragment>
      }

}

const mapStateToProps = (state) => ({

  //projects: reducers.getProjectData(state),

})

const mapDispatchToProps = dispatch => {
  return {

     // getProjectData: (address) => dispatch(actions.getProjectData(address)),

  }
};

export default connect(mapStateToProps, mapDispatchToProps)(CaseDataLoader);
