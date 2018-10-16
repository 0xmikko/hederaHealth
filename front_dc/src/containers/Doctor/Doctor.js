import React from 'react'
import {
    Grid,
    Col,
    Row,
    Image,
    Button,
    Glyphicon,
    ProgressBar,
    FormControl,
    FormGroup,
    ControlLabel,
    Checkbox,
    Table
} from 'react-bootstrap'
import "./Doctor.css"
import {connect} from "react-redux";
import {getCase, updateCase} from "../../actions/hedera";


function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

class Strategy extends React.Component {
    render() {
        return (
            <div
                className={"strategy-item " + ((this.props.strategy.result !== undefined) ? "passed" : "")}>
                <Row>
                    <Col sm={6}>
                        <h2>Strategy #{this.props.strategy.id} <span
                            className="efficiency-label">[{this.props.strategy.efficiency}%]</span>
                        </h2>
                    </Col>
                    <Col sm={6}>
                        <a className="pull-right"
                           onClick={() => this.props.onToggleUI()}
                        ><Glyphicon
                            glyph={"chevron-" + ((this.props.strategy.isOpened) ? 'up' : 'down')}/></a>
                    </Col>
                </Row>
                {(this.props.strategy.result !== undefined) ? (
                    <div className="strategy-result">
                                        <span
                                            className={(this.props.strategy.isResultSuccess) ? "green" : "red"}>Result: +2.18</span>
                    </div>) : ''}
                {(this.props.strategy.isOpened) ? (
                    <div className="strategy-text">
                        {this.props.strategy.text}
                        <br/>
                        <br/>

                        Delay: {this.props.strategy.timeDelayInWeeks} weeks
                        <br/>
                        <br/>

                        {this.props.strategy.actions.map((action, idx) => (
                            <div key={idx}>
                                <b>{capitalizeFirstLetter(action.type)}</b>
                                <br/>
                                {(action.type === 'pill') ? ("Take \"" + action.text + "\" pill every day per 1 pill") : ''}
                                {(action.type === 'exercise') ? ("Do \"" + action.text + "\" exercise every day per 15 min") : ''}
                                {(action.type === 'record') ? ("Add your \"" + action.text + "\" every day") : ''}
                                <br/>
                                <br/>
                            </div>
                        ))}
                    </div>
                ) : ''}
                {(this.props.strategy.isOpened) ? (
                    <div className="strategy-subscribe">
                        <Button
                            onClick={() => this.props.onSubscribeStrategy()}>
                            Subscribe
                        </Button>
                    </div>
                ) : ''}
            </div>
        )
    }
}

class Measure extends React.Component {
    render() {
        return (
            <div className='measure-item'>
                <Row>
                    <Col sm={6}>
                        <Row>
                            <Col sm={6}>
                                {this.props.measure.name}{(this.props.isEnd && this.props.measure.isTarget) ? '*' : ''}:
                            </Col>
                            <Col sm={6}>
                                <FormControl
                                    value={this.props.measure.value}
                                    type='text'
                                    onChange={(e) => this.props.onChangeMeasure(e)}
                                    placeholder='Enter your weight'
                                />
                            </Col>
                        </Row>
                    </Col>
                    <Col sm={6}>
                        {(this.props.isEnd && this.props.measure.isTarget) ? (
                            <div>
                                {this.props.measure.value - this.props.measure.start}
                            </div>
                        ) : ''}
                        {(!this.props.isEnd) ? (<Checkbox
                            disabled={this.props.isTargetSet}
                            checked={this.props.measure.isTarget}
                            onClick={() => this.props.onToggleTarget()}
                        >
                            Is target measure
                        </Checkbox>) : ''}
                    </Col>
                </Row>
            </div>

        )
    }
}

class Doctor extends React.Component {
    componentWillMount() {
        this.props.getCase();
    }

    componentWillReceiveProps(nextProps) {
        this.setState(nextProps);
    }

    state = {
        patientTmpAddress: '',
        patient: {
            address: '',
            diagnosis: null
        },
    };

    handleGetStrategies() {
        return false;
    }

    handleAddPatientByAddress() {
        let patient = this.state.patient;
        patient['address'] = this.state.patientTmpAddress;
        let state = this.state;
        state.patient = patient;
        this.setState(state);
        return false;
    }

    handleCloseCase() {
        this.props.updateCase(this.state);
        return false;
    }

    handleRepeatCase() {
        return false;
    }

    handleAddrelevantCase() {
        return false;
    }

    handleToggleStrategy(idx) {
        let strategies = this.state.strategies;
        strategies[idx].isOpened = !strategies[idx].isOpened;
        this.setState(state => ({
            strategies: strategies
        }));
        this.props.updateCase(this.state);
        return false
    }

    handlePatientAddressChange(e) {
        let s = e.target.value;
        let state = this.state;
        state.patientTmpAddress = s;
        this.setState(state);
        return false
    }

    handleToggleMeasureTarget(idx) {
        let measures = this.state.measures;
        measures[idx].isTarget = !measures[idx].isTarget;
        this.setState(state => ({
            measures: measures
        }));
        return false;
    }

    handleMeasureChange(idx, e) {
        let measures = this.state.measures;
        measures[idx].value = e.target.value;
        this.setState(state => ({
            measures: measures
        }))
        return false;
    }

    handleEndMeasureChange(idx, e) {
        let measures = this.state.endMeasures;
        measures[idx].value = e.target.value;
        this.setState(state => ({
            endMeasures: measures
        }))
        return false;
    }

    handleDiagnosisChange(e) {
        let patient = this.state.patient;
        patient.diagnosis = e.target.value;
        this.setState(state => ({
            patient: patient
        }))
        return false;
    }

    hasTargetSet(idx) {
        return this.state.measures.some((v, i) => {
            return v.isTarget && (i !== idx);
        })
    }

    handleToggleShowStrategies() {
        this.setState({
            showStrategies: !this.state.showStrategies
        });
    }

    subscribeStrategy(idx) {
        let state = this.state;
        state.strategy = idx;
        this.setState(state);
        state.patientResults = [0, 1, 2, 3].map((i) => {
            return {
                "date": 15+i + ".10.2018",
                "pill": false,
                "exercise": false,
                "weight": 0
            }

        });
        state.endMeasures = state.measures.map(m => {
            if (m.isTarget){
                m.start = m.value;
            }
            return m
        });
        this.props.updateCase(state);
        return false;
    }

    render() {
        return (
            <Grid>
                <div className='doctor-wrapper'>
                    <div className="doctor-label">
                        <Row>
                            <Col sm={6}>
                                <h2>House M.D.</h2>
                            </Col>
                            <Col sm={6}>
                                <Button bsStyle='success'
                                        className="pull-right">+
                                    Add new case</Button>
                            </Col>
                        </Row>
                    </div>
                    <div className='patient-wrapper'>
                        <div className='patient-label'>
                            <Row>
                                <Col sm={6}>
                                    <Row>
                                        <Col sm={6}>
                                            <div>Patient:</div>
                                        </Col>
                                        <Col sm={6}>
                                            {(this.state.patient.address) ?
                                                (
                                                    <div>{this.state.patient.address}</div>
                                                ) :
                                                (
                                                    <FormControl
                                                        type='text'
                                                        value={this.state.patientTmpAddress}
                                                        onChange={(e) => this.handlePatientAddressChange(e)}
                                                        placeholder='Enter patient address'
                                                    />
                                                )
                                            }
                                        </Col>
                                    </Row>
                                </Col>
                                <Col sm={6}>
                                    {!this.state.patient.address && <Button
                                        onClick={() => this.handleAddPatientByAddress()}>
                                        Add patient by address
                                    </Button>}
                                </Col>
                            </Row>
                        </div>
                        <div className='patient-label'>
                            <Row>
                                <Col sm={6}>
                                    <Row>
                                        <Col sm={6}>
                                            <div>Diagnosis:</div>
                                        </Col>
                                        <Col sm={6}>
                                            <FormControl componentClass="select"
                                                         value={this.state.patient.diagnosis || ''}
                                                         onChange={(e) => this.handleDiagnosisChange(e)}
                                                         placeholder="Select diagnosis">
                                                <option value="">
                                                    Select diagnosis
                                                </option>
                                                <option value="loose-weight">
                                                    Loose weight
                                                </option>
                                                <option value="flu">
                                                    Flu
                                                </option>
                                            </FormControl>
                                        </Col>
                                    </Row>
                                </Col>
                                <Col sm={6}>
                                </Col>
                            </Row>
                        </div>
                        <div className='measures-header'>
                            <h4>Measures on 15.10.2018</h4>
                        </div>
                        <div className='measures-wrapper'>
                            {(this.state.measures) && this.state.measures.map((m, i) => (
                                <Measure
                                    key={i}
                                    isEnd={false}
                                    isTargetSet={this.hasTargetSet(i)}
                                    measure={m}
                                    onChangeMeasure={(e) => this.handleMeasureChange(i, e)}
                                    onToggleTarget={() => this.handleToggleMeasureTarget(i)}
                                />
                            ))}
                        </div>
                        <div className='strategies-wrapper'>
                            {(this.state.strategy === null) &&
                            <div className="strategy-btn">
                                <Button
                                    onClick={() => this.handleToggleShowStrategies()}>Get
                                    strategies</Button>
                            </div>
                            }
                            {(this.state.strategies && this.state.showStrategies) && this.state.strategies.map((s, i) => (
                                <Strategy
                                    key={i}
                                    onSubscribeStrategy={() => this.subscribeStrategy(i)}
                                    strategy={s}
                                    onToggleUI={() => this.handleToggleStrategy(i)}
                                />
                            ))}
                        </div>
                        {(this.state.strategy) &&
                        <div className="patient-result-wrapper">
                            <h2>Patient results:</h2>
                            <div className="patient-result-table">
                                <Table condensed>
                                    <thead>
                                    <tr>
                                        <th>Date</th>
                                        <th>Pill "Atarax"</th>
                                        <th>"Ball" excercise</th>
                                        <th>Weight</th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    {(this.state.patientResults) && this.state.patientResults.map((rec, i) => (
                                        <tr key={i}>
                                            <td>{rec.date}</td>
                                            <td>
                                                <Checkbox checked={rec.pill}
                                                          disabled={true}/>
                                            </td>
                                            <td>
                                                <Checkbox checked={rec.exercise}
                                                          disabled={true}/>
                                            </td>
                                            <td>
                                                {rec.weight || ''}
                                            </td>
                                        </tr>
                                    ))}
                                    </tbody>
                                </Table>
                            </div>
                        </div>
                        }
                        {(this.state.strategy) &&
                        <div className="end-measures-wrapper">
                            <div className='measures-header'>
                                <h4>Measures on 19.10.2018</h4>
                            </div>
                            <div className='measures-wrapper'>
                                {(this.state.endMeasures) && this.state.endMeasures.map((m, i) => (
                                    <Measure
                                        key={i}
                                        isEnd={true}
                                        isTargetSet={false}
                                        measure={m}
                                        onChangeMeasure={(e) => this.handleEndMeasureChange(i, e)}
                                        onToggleTarget={null}
                                    />
                                ))}
                            </div>
                        </div>
                        }
                        {(this.state.strategy) && <div className="case-actions">
                            <Button onClick={() => this.handleCloseCase()}>Close
                                case</Button>
                            <Button onClick={() => this.handleRepeatCase()}>Repeat
                                case</Button>
                            <Button
                                onClick={() => this.handleAddrelevantCase()}>Add
                                relevant case</Button>
                        </div>
                        }
                    </div>
                </div>
            </Grid>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        ...{
            showStrategies: state.hedera.strategy !== null,
            patientTmpAddress: ''
        },
        ...state.hedera
    }
};

const mapDispatchToProps = (dispatch) => ({
    getCase: () => {
        dispatch(getCase('doctor'))
    },
    updateCase: (data) => {
        dispatch(updateCase(data, 'doctor'))
    }
})

export default connect(mapStateToProps, mapDispatchToProps)(Doctor);

// export default Doctor;