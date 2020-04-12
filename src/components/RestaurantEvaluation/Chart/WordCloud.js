import React from "react";
import ReactWordcloud from 'react-wordcloud';

const WordCloud = ({words}) => {


    if(!words || words.length === 0){
        return (
            <div className='d-flex flex-column nodata'>
                <i className="messageIcon fa fa-comments" aria-hidden="true"></i>
                <span className="message">No significant words extracted from reviews</span>
            </div>
        )
    }

    return (
        <div style={{ height: '150px', width: '100%' }}>
            <ReactWordcloud options={{
                deterministic: true,
                rotations: 3,
                rotationAngles: [0, 90],
                fontSizes: [16, 40],
            }} words={words}></ReactWordcloud>
        </div>
    )
}

export default WordCloud