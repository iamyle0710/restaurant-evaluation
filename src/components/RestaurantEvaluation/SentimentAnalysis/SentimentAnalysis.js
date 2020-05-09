import React from 'react';
import HBarChart from '../Chart/HBarChart';
import SentimentRatio from './SentimentRatio';

function SentimentAnalysis({ positiveWords, positiveCounts, positiveReviews, negativeWords, negativeCounts, negativeReviews}){

    return (
        <div>
            <div className="d-flex flex-row titleRow">
                <span className="cellName">Sentiment Analysis</span>
            </div>
            <div className="d-flex flex-row">
                <SentimentRatio positiveCount={positiveCounts} positiveReviews={positiveReviews} negativeCount={negativeCounts} negativeReviews={negativeReviews}></SentimentRatio>
            </div>
            <div className="d-flex flex-row" style={{height: "200px"}}>
                <HBarChart data={positiveWords} colorClass="positive" unit="%" xLabel="Percentage" yLabel="Words" title="Top Positive Words"></HBarChart>
                <HBarChart data={negativeWords} colorClass="negative" unit="%" xLabel="Percentage" yLabel="Words" title="Top Negative Words"></HBarChart>
            </div>
        </div>
       
    )
}


export default SentimentAnalysis; 