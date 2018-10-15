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
                        <h2>Strategy #41 <span
                            className="efficiency-label">[{this.props.strategy.efficiency}%]</span>
                        </h2>
                    </Col>
                    <Col sm={6}>
                        {(this.props.strategy.isOpened) ? (
                            <a className="pull-right"
                               onClick={() => this.props.onToggleUI()}
                            ><Glyphicon
                                glyph="chevron-up"/></a>
                        ) : (
                            <a className="pull-right"
                               onClick={() => this.props.onToggleUI()}
                            ><Glyphicon
                                glyph="chevron-down"/></a>
                        )}
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
                                <br/>
                                <br/>
                            </div>
                        ))}
                    </div>
                ) : ''}
                {(this.props.strategy.isOpened) ? (
                    <div className="strategy-subscribe">
                        <Button>
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
                            checkbox={(this.props.measure.isTarget) ? ('true') : ('false')}
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
    state = {
        patient: {
            address: '',
            diagnosis: null
        },
        measures: [
            {
                name: 'Weight',
                value: 0,
                isTarget: false
            },
            {
                name: 'Growth',
                value: 0,
                isTarget: false
            }
        ],
        endMeasures: [
            {
                name: 'Weight',
                start: 100,
                value: 0,
                isTarget: true
            },
            {
                name: 'Growth',
                value: 0,
                isTarget: false
            }
        ],
        strategies: [
            {
                id: 41,
                text: 'Lorem ipsum dolor sit amet, consectetur\n' +
                'adipiscing elit. Nulla quam velit,\n' +
                'vulputate eu pharetra nec, mattis ac\n' +
                'neque.\n',
                result: 2.18,
                isResultSuccess: false,
                efficiency: 65,
                isOpened: false,
                timeDelayInWeeks: 3,
                actions: [
                    {
                        id: 1,
                        text: 'Atarax',
                        type: 'pill'
                    },
                    {
                        id: 1,
                        text: 'Ball',
                        type: 'exercise',
                        video: 'http://...'
                    },
                ]
            },
            {
                id: 42,
                text: 'Lorem ipsum dolor sit amet, consectetur\n' +
                'adipiscing elit. Nulla quam velit,\n' +
                'vulputate eu pharetra nec, mattis ac\n' +
                'neque.\n',
                efficiency: 85,
                isOpened: true,
                timeDelayInWeeks: 3,
                actions: [
                    {
                        id: 1,
                        text: 'Atarax',
                        type: 'pill'
                    },
                    {
                        id: 1,
                        text: 'Ball',
                        type: 'exercise',
                        video: 'http://...'
                    },
                ]
            }
        ],
        patientResults: [
            {
                date: '15.10.2018',
                pill: true,
                exercise: false
            },
            {
                date: '16.10.2018',
                pill: true,
                exercise: true
            },
            {
                date: '17.10.2018',
                pill: true,
                exercise: false
            },
            {
                date: '18.10.2018',
                pill: true,
                exercise: true
            },
        ]
    };

    handleGetStrategies() {
        return false;
    }

    handleAddPatientByAddress() {
        return false;
    }

    handleCloseCase() {
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
        return false
    }

    handlePatientAddressChange(e) {
        let s = e.target.value;
        this.setState(state => ({
            patient: {
                address: s
            }
        }));
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
                                            <FormControl
                                                type='text'
                                                value={this.state.patient.address}
                                                onChange={(e) => this.handlePatientAddressChange(e)}
                                                placeholder='Enter patient address'
                                            />
                                        </Col>
                                    </Row>
                                </Col>
                                <Col sm={6}>
                                    <Button
                                        onClick={() => this.handleAddPatientByAddress()}>
                                        Add patient by address
                                    </Button>
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
                            {this.state.measures.map((m, i) => (
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
                            <div className="strategy-btn">
                                <Button
                                    onClick={() => this.handleGetStrategies()}>Get
                                    strategies</Button>
                            </div>
                            {this.state.strategies.map((s, i) => (
                                <Strategy
                                    key={i}
                                    strategy={s}
                                    onToggleUI={() => this.handleToggleStrategy(i)}
                                />
                            ))}
                        </div>
                        <div className="patient-result-wrapper">
                            <h2>Patient results:</h2>
                            <div className="patient-result-table">
                                <Table condensed>
                                    <thead>
                                    <tr>
                                        <th>Date</th>
                                        <th>Pill "Atarax"</th>
                                        <th>"Ball" excercise</th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    {this.state.patientResults.map((rec, i) => (
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
                                        </tr>
                                    ))}
                                    </tbody>
                                </Table>
                            </div>
                        </div>
                        <div className="end-measures-wrapper">
                            <div className='measures-header'>
                                <h4>Measures on 19.10.2018</h4>
                            </div>
                            <div className='measures-wrapper'>
                                {this.state.endMeasures.map((m, i) => (
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
                        <div className="case-actions">
                            <Button onClick={() => this.handleCloseCase()}>Close
                                case</Button>
                            <Button onClick={() => this.handleRepeatCase()}>Repeat
                                case</Button>
                            <Button
                                onClick={() => this.handleAddrelevantCase()}>Add
                                relevant case</Button>
                        </div>
                    </div>
                </div>
            </Grid>
        )
    }
}

export default Doctor;