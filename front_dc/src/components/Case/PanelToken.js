import React from 'react';
import { Panel, Col, Row } from 'react-bootstrap';
import {formatPrice} from "../../utils/formaters";

const TokenPanel = (props) =>
{
    let info_left = [{
        label: '',
        value: '',

    }]

    let info_right = [{
        label: '',
        value: '',

    }]

    if (props.projectData !== undefined)
    {
        info_left = [
            {
                label: 'Rating:', 
                value: props.projectData.projectRating
            },
            {
                label: 'Token:',
                value: props.projectData.tokenName,
            },
            {
                label: 'MVP:',
                value: (props.projectData.ProjectMVP === 1) ? "Avaible" : "Not avaible",
            },
            {
                label: 'Country:',
                value: props.projectData.projectCountry,
            },

        ];
        info_right = [

            {
                label: 'Crowdsale price:',
                value: formatPrice(props.projectData.crowdsaleTokenPrice),
            },
            {
                label: 'SoftCap:',
                value: props.projectData.crowdsaleSoftcap,
            },
            {
                label: 'HardCap:',
                value: props.projectData.crowdsaleHardcap,
            },
            {
                label: 'Whitepaper:',
                value: <a href={props.projectData.projectWhitepaperLink}>Read</a>,
            },



        ];

    }

     const data_block_left = info_left.map(d => {
            return <Row>
                        <Col sm={5}>
                            { d.label }
                        </Col>
                        <Col sm={6}>
                            { d.value }
                        </Col>

                    </Row>
        })

    const data_block_right = info_right.map(d => {
            return <Row>
                        <Col sm={5}>
                            { d.label }
                        </Col>
                        <Col sm={6}>
                            { d.value }
                        </Col>

                    </Row>
        })

    return <Row>
                <Col sm={6}>
                    { data_block_left }

                </Col>
                <Col sm={6}>
                    { data_block_right }

                </Col>
            </Row>
}

export default TokenPanel;