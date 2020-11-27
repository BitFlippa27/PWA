import React from 'react';
import q from '../img/q.jpg';

const Pictures = () => {
    return (
        <div className="container">
        <div className="row">
            <div className="col-sm">
                <a target="_blank" href="q.jpg">
                    <img className="pictures" src={q} alt="Q1"></img>
                </a>
            </div>
            <div className="col-sm">
            <a target="_blank" href="q.jpg">
                    <img className="pictures" src={q} alt="Q1"></img>
                </a>
            </div>
            <div className="col-sm">
                <a target="_blank" href="q.jpg">
                    <img className="pictures" src={q} alt="Q1"></img>
                </a>
            </div>
        </div>
        </div>

    );
}

export default Pictures;
