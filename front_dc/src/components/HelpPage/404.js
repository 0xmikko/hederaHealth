import React from 'react';
import { Link } from 'react-router-dom';

const Page404 = () => {
    return (<React.Fragment>
                <h1> Page not Found </h1><br />
                <p>You can open <Link to='/options/'>Marketpalce</Link></p>
            </React.Fragment>
            );



}

export default Page404;