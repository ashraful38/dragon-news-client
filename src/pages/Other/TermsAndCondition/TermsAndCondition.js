import React from 'react';
import { Link } from 'react-router-dom';

const TermsAndCondition = () => {
    return (
        <div>
            <h3>Here is our Terms and conditions</h3>
            <p>Go back to: <Link to='/registration'>Register</Link></p>
            
        </div>
    );
};

export default TermsAndCondition;