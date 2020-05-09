import React from 'react';

import './SentimentRatio.css';

function SentimentRatio({ positiveCount, negativeCount, positiveReviews = [], negativeReviews = []}){

    const total = positiveCount + negativeCount;
    const positiveRatio = positiveCount / total * 100;
    const negativeRatio = negativeCount / total * 100;
    const positiveReviewTooltip = positiveReviews.join("\n");
    const negativeReviewTooltip = negativeReviews.join("\n");

    if(isNaN(total)){
        return null
    }
    return (
        <div id="sentimentRatio" className="sentimentRatio">
            <i className="fa fa-smile-o positive icon"></i>
            <span className="positive ratio" data-tooltip={positiveReviewTooltip} style={{width : positiveRatio + "%"}}>{positiveRatio.toFixed(2) + "%"}</span>
            <span className="negative ratio" data-tooltip={negativeReviewTooltip} style={{width : negativeRatio + "%"}}>{negativeRatio.toFixed(2) + "%"}</span>
            <i className="fa fa-frown-o negative icon"></i>
        </div>
    )
}

export default SentimentRatio