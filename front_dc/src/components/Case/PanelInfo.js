import React from 'react';

const PanelInfo = (props) => {

    return <div dangerouslySetInnerHTML={{ __html: props.projectData.projectDescription }} />
}

export default PanelInfo;