import React from 'react';
import { Link } from "react-router-dom";

const SubmitPair = () => {
    return (
        <div className="my-5 py-5">
            <Link
                to="/register/user"
                className="py-3 px-4 rounded-pill mr-5"
                style={{ color: "white", backgroundColor: "#006536", textDecoration:"none"}}
            >
            Start Trading Now    
            </Link>
        </div>
    );
};

export default SubmitPair;