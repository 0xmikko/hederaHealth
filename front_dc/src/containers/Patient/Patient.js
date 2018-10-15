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
import Finder from '../../components/Finder/Finder'
import DataLoader from "../DataWrappers/CaseListLoader"
import "./Patient.css"


class Patient extends React.Component {

    state = {
        strategy: {
            id: 42,
            target: 'Loose weight',
            efficiency: 88,
            isOpened: true
        },
        name: 'John Snow',
        actions: [
            {
                text: 'Take pill "Atarax"',
                done: true
            },
            {
                text: 'Do "ball" exercise',
                done: false,
                video: 'http://...'
            },
            {
                text: 'Add your weight',
                done: false,
                weight: 0
            },
        ]
    };

    handleActionDoneClick(idx){
        let actions = this.state.actions;
        actions[idx].done = !actions[idx].done;
        this.setState(state => ({
            actions: actions
        }));
        return false
    }

    handleActionChangeWeight(idx, e){
        let actions = this.state.actions;
        actions[idx].weight = e.target.value;
        this.setState(state => ({
            actions: actions
        }));
        return false
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
                        {this.state.name}
                    </div>
                </Col>
            </Row>
            <Row>
                <Col sm={6}>
                    <Button className="pull-right">Copy address</Button>
                </Col>
                <Col sm={6}>
                    <Button>Show QR code</Button>
                </Col>
            </Row>
            <Row>
                <Col sm={12}>
                    <div className='wrapper'>
                        <Row>
                            <Col sm={6}>
                                <h2>Strategy #{this.state.strategy.id}</h2>
                            </Col>
                            <Col sm={6}>
                                <a className="pull-right" href="#"><Glyphicon
                                    glyph="chevron-up"/></a>
                            </Col>
                        </Row>
                        <Row>
                            <Col sm={12}>
                                <ProgressBar now={60}/>
                            </Col>
                        </Row>
                        <Row>
                            <Col sm={6}>
                                <div className="target-wrapper">
                                    <b>Target: </b>
                                    <span>{this.state.strategy.target}</span>
                                </div>
                            </Col>
                            <Col sm={6}>
                                <div className="target-wrapper pull-right">
                                    <b>Efficiency: </b>
                                    <span>{this.state.strategy.efficiency}%</span>
                                </div>
                            </Col>
                        </Row>
                        <div className="action-list">
                            {this.state.actions.map((action, idx) => (
                                <div className='action-wrapper' key={idx}>
                                    <Row>
                                        <Col
                                            sm={6}>{action.text}
                                        </Col>
                                        <Col sm={6}>
                                            {(action.done) ? (
                                                <a onClick={() => this.handleActionDoneClick(idx)}
                                                   className='pull-right'>
                                                    <Glyphicon glyph='check'/>
                                                </a>
                                            ) : (
                                                <a onClick={() => this.handleActionDoneClick(idx)}
                                                   className='pull-right'>
                                                    <Glyphicon
                                                        glyph='unchecked'/>
                                                </a>
                                            )}
                                        </Col>
                                    </Row>
                                {(action.video !== undefined) && (
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
                                    </Row>)}
                                {(action.weight !== undefined) && (
                                    <Row style={{
                                        'marginTop': '20px'
                                    }}>
                                        <Col sm={12}>
                                            <FormControl
                                                disabled={action.done}
                                                type='text'
                                                value={action.value}
                                                placeholder='Enter your weight'
                                                onChange={(e) => this.handleActionChangeWeight(idx, e)}
                                            />
                                        </Col>
                                    </Row>)}
                                </div>
                            ))}
                        </div>
                    </div>
                </Col>
            </Row>
        </Grid>
    }
}

export default Patient;
