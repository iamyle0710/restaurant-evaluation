import React, {useRef, useEffect, useState} from 'react';

import './Footprint.css';

function Footprint({data}){
    const ref = useRef(null);
    const percentage = +(((data[0] / data[1]) * 100).toFixed(2));
    const [aspect, setAspect] = useState({size: 20, side: 120});

    function handleResize(e) {
        console.log(ref.current);
        const side = Math.min(ref.current.offsetWidth, ref.current.offsetHeight);
        const size = Math.floor(Math.sqrt(side)) + 15;
        setAspect({size : size, side: side});
        console.log(size, side)
    }

    useEffect(() => {
        window.addEventListener("resize", handleResize);
        return () => {
            window.removeEventListener("resize", handleResize);
        }
    });

    return (
        <React.Fragment>
            <div ref={ref} className="percentageContainer">
                <div className="percentage" style={{width : aspect.side, height: aspect.side}}>
                    <div className="indicator" style={{height: percentage + "%"}}></div>
                    <span style={{color : "#434141", fontSize: aspect.size}}>{percentage} %</span>
                </div>
                {/* <div style={{fontSize:"10px", color : "##a6a6a6", paddingTop: "10px" }}>{data[0]} customers monthly </div> */}

            </div>
        </React.Fragment>
    )
}



export default Footprint;