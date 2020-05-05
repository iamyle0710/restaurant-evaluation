import React from 'react';

import './SentimentRatio.css';

function SentimentRatio({ positiveCount, negativeCount}){

    const total = positiveCount + negativeCount;
    const positiveRatio = positiveCount / total * 100;
    const negativeRatio = negativeCount / total * 100;

    if(isNaN(total)){
        return null
    }
    return (
        <div id="sentimentRatio" className="sentimentRatio">
            <span className="positive ratio" style={{width : positiveRatio + "%"}}>{positiveRatio.toFixed(2) + "%"}</span>
            <span className="negative ratio" style={{width : negativeRatio + "%"}}>{negativeRatio.toFixed(2) + "%"}</span>
        </div>
    )
}

export default SentimentRatio