import React from 'react'
import {
    Grid,
    Col,
    Row,
    Image,
    Button,
    Glyphicon,
    ProgressBar,
    FormControl
} from 'react-bootstrap'
import "./Patient.css"
import {connect} from "react-redux";
import {getCase, updateCase} from "../../actions/hedera";

class Action extends React.Component {
    render() {
        return (
            <div className='action-wrapper'>
                <Row>
                    <Col
                        sm={6}>{this.props.action.text}
                    </Col>
                    <Col sm={6}>
                        <a onClick={() => this.props.handleActionDoneClick()}
                           className='pull-right'>
                            <Glyphicon
                                glyph={(this.props.action.done) ? 'check' : 'unchecked'}/>
                        </a>
                    </Col>
                </Row>
                {
                    (this.props.action.video !== undefined) && (
                        <Row style={{
                            'marginTop': '20px'

                        }}>
                            <Col sm={12} style={{
                                'textAlign': 'center'
                            }}>
                                <Image
                                    src="/images/video-placeholder.png"
                                    style={{
                                        'width': '100%',
                                    }}/>
                            </Col>
                        </Row>)
                }
                {
                    (this.props.action.weight !== undefined) && (
                        <Row style={{
                            'marginTop': '20px'
                        }}>
                            <Col sm={12}>
                                <FormControl
                                    disabled={this.props.action.done}
                                    type='text'
                                    value={this.props.action.value}
                                    placeholder='Enter your weight'
                                    onChange={(e) => this.props.handleActionChangeWeight(e)}
                                />
                            </Col>
                        </Row>)
                }
            </div>
        )
    }
}

class Patient extends React.Component {
    componentWillMount() {
        this.props.getCase();
    }

    componentWillReceiveProps(nextProps) {
        this.setState(nextProps);
    }

    state = {
        // patient: {
        //     address: '',
        //     diagnosis: null
        // },
        strategy: null,
        strategies: [],
        patientResults: [],
        // measures: [
        //     {
        //         name: 'Weight',
        //         value: 0,
        //         isTarget: false
        //     },
        //     {
        //         name: 'Growth',
        //         value: 0,
        //         isTarget: false
        //     }
        // ],
        // endMeasures: [
        //     {
        //         name: 'Weight',
        //         start: 100,
        //         value: 0,
        //         isTarget: true
        //     },
        //     {
        //         name: 'Growth',
        //         value: 0,
        //         isTarget: false
        //     }
        // ],
        // strategies: [
        //     {
        //         id: 41,
        //         text: 'Lorem ipsum dolor sit amet, consectetur\n' +
        //         'adipiscing elit. Nulla quam velit,\n' +
        //         'vulputate eu pharetra nec, mattis ac\n' +
        //         'neque.\n',
        //         target: 'Loose weight',
        //         result: 2.18,
        //         isResultSuccess: false,
        //         efficiency: 65,
        //         isOpened: false,
        //         timeDelayInWeeks: 3,
        //         actions: [
        //             {
        //                 id: 1,
        //                 text: 'Atarax',
        //                 type: 'pill'
        //             },
        //             {
        //                 id: 1,
        //                 text: 'Ball',
        //                 type: 'exercise',
        //                 video: 'http://...'
        //             },
        //         ]
        //     },
        //     {
        //         id: 42,
        //         text: 'Lorem ipsum dolor sit amet, consectetur\n' +
        //         'adipiscing elit. Nulla quam velit,\n' +
        //         'vulputate eu pharetra nec, mattis ac\n' +
        //         'neque.\n',
        //         target: 'Loose weight',
        //         efficiency: 85,
        //         isOpened: true,
        //         timeDelayInWeeks: 3,
        //         actions: [
        //             {
        //                 id: 1,
        //                 text: 'Atarax',
        //                 type: 'pill'
        //             },
        //             {
        //                 id: 1,
        //                 text: 'Ball',
        //                 type: 'exercise',
        //                 video: 'http://...'
        //             },
        //         ]
        //     }
        // ],
        // patientResults: [
        //     {
        //         date: '15.10.2018',
        //         pill: true,
        //         exercise: false,
        //         weight: 100,
        //     },
        //     {
        //         date: '16.10.2018',
        //         pill: true,
        //         exercise: true,
        //         weight: 100,
        //     },
        //     {
        //         date: '17.10.2018',
        //         pill: true,
        //         exercise: false,
        //         weight: 100,
        //     },
        //     {
        //         date: '18.10.2018',
        //         pill: true,
        //         exercise: true,
        //         weight: 100,
        //     },
        // ],
        // actions: [
        //     {
        //         date: '15.10.2018',
        //         text: 'Take pill "Atarax"',
        //         done: true
        //     },
        //     {
        //         date: '15.10.2018',
        //         text: 'Do "ball" exercise',
        //         done: false,
        //         video: 'http://...'
        //     },
        //     {
        //         date: '15.10.2018',
        //         text: 'Add your weight',
        //         done: false,
        //         weight: 0
        //     },
        // ]
    };

    handleToggleStrategy() {
        let strategies = this.state.strategies;
        strategies[this.state.strategy].isOpened = !strategies[this.state.strategy].isOpened;
        this.setState(state => ({
            strategies: strategies
        }));
        this.props.updateCase(this.state);
        return false;
    }

    handleActionDoneClick(idx) {
        let strategies = this.state.strategies;
        strategies[this.state.strategy].actions[idx].done = !strategies[this.state.strategy].actions[idx].done;
        let action = strategies[this.state.strategy].actions[idx];
        let patientResults = this.state.patientResults;
        let {id, text, type, ...rest} = action;
        patientResults.push({
            date: '15.10.2018',
            text: text,
            done: true,
            ...rest
        });
        let state = this.state;
        state.strategies = strategies;
        state.patientResults = patientResults;
        this.setState(state);
        this.props.updateCase(state);
        return false
    }

    handleActionChangeWeight(idx, e) {
        let strategies = this.state.strategies;
        strategies[this.state.strategy].actions[idx].weight = e.target.value;
        this.setState(state => ({
            strategies: strategies
        }));
        this.props.updateCase(this.state);
        return false
    }

    getStrategy() {
        return this.state.strategies[this.state.strategy];
    }

    render() {

        return <Grid>
            <Row>
                <Col sm={12}>
                    <Image src="/images/avatar.png" thumbnail style={{
                        'width': 300,
                        'display': 'block',
                        'margin': '20px auto 0'
                    }}/>
                </Col>
            </Row>
            <Row>
                <Col sm={12}>
                    <div className='username'>
                        {this.props.name}
                    </div>
                </Col>
            </Row>
            <div className="patient-controls">
                <Row>
                    <Col sm={6}>
                        <Button className="pull-right">Copy address</Button>
                    </Col>
                    <Col sm={6}>
                        <Button>Show QR code</Button>
                    </Col>
                </Row>
            </div>
            <Row>
                <Col sm={12}>
                    {(this.state.strategy !== null) && (
                        <div className='strategy-item'>
                            <Row>
                                <Col sm={6}>
                                    <h2>Strategy #{this.getStrategy().id}</h2>
                                </Col>
                                <Col sm={6}>
                                    <a className="pull-right"
                                       onClick={() => this.handleToggleStrategy()}
                                    ><Glyphicon
                                        glyph={"chevron-" + ((this.getStrategy().isOpened) ? 'up' : 'down')}/></a>
                                </Col>
                            </Row>
                            <Row>
                                <Col sm={12}>
                                    <ProgressBar now={60}/>
                                </Col>
                            </Row>
                            <div className="target-wrapper">
                                <Row>
                                    <Col sm={6}>
                                        <div className="target-label">
                                            <b>Target: </b>
                                            <span>{this.getStrategy().target}</span>
                                        </div>
                                    </Col>
                                    <Col sm={6}>
                                        <div
                                            className="target-label pull-right">
                                            <b>Efficiency: </b>
                                            <span>{this.getStrategy().efficiency}%</span>
                                        </div>
                                    </Col>
                                </Row>
                            </div>
                            {(this.getStrategy().isOpened) ? (
                                <div className="date-actions-wrapper">
                                    <h4>Today: 15.10.2018</h4>
                                    <div className="action-list">
                                        {this.getStrategy().actions.map((action, idx) => {
                                            return (
                                                <Action
                                                    action={action}
                                                    handleActionDoneClick={() => this.handleActionDoneClick(idx)}
                                                    handleActionChangeWeight={(e) => this.handleActionChangeWeight(idx, e)}
                                                    key={idx}/>
                                            )
                                        })}
                                    </div>
                                </div>
                            ) : ''}
                        </div>
                    )}
                </Col>
            </Row>
        </Grid>
    }
}

const mapStateToProps = (state) => {
    return {
        name: 'John Snow',
        ...state.hedera
    }
};

const mapDispatchToProps = (dispatch) => ({
    getCase: () => {
        dispatch(getCase('patient'))
    },
    updateCase: (data) => {
        dispatch(updateCase(data, 'patient'))
    }
})

export default connect(mapStateToProps, mapDispatchToProps)(Patient);
