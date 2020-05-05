import React from 'react';
import HBarChart from '../Chart/HBarChart';
import SentimentRatio from './SentimentRatio';

function SentimentAnalysis({ positiveWords, positiveCounts, negativeWords, negativeCounts}){

    return (
        <div>
            <div className="d-flex flex-row titleRow">
                <span className="cellName">Sentiment Analysis</span>
            </div>
            <div className="d-flex flex-row">
                <SentimentRatio positiveCount={positiveCounts} negativeCount={negativeCounts}></SentimentRatio>
            </div>
            <div className="d-flex flex-row" style={{height: "200px"}}>
                <HBarChart data={positiveWords} color="#ff8000" unit="%" xLabel="Percentage" yLabel="Words" title="Top Positive Words"></HBarChart>
                <HBarChart data={negativeWords} color="#cd5858" unit="%" xLabel="Percentage" yLabel="Words" title="Top Negative Words"></HBarChart>
            </div>
        </div>
       
    )
}


export default SentimentAnalysis; 