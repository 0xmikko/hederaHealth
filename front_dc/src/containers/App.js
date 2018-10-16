import React from "react";
import {connect} from 'react-redux'
import Layout from '../components/Layout/Layout';

class App extends React.Component {
    render() {

        return <Layout {...this.props}/>

    }
}

const mapStateToProps = (state) => ({})

const mapDispatchToProps = dispatch => {
    return {}
};


export default connect(mapStateToProps, mapDispatchToProps)(App);
