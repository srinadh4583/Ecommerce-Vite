import React from 'react'
import '../App.css'

function Loader() {
    return (
        <div className='center'>
            <div className="cube-loader">
                <div className="cube-top"></div>
                <div className="cube-wrapper">
                    {[0, 1, 2, 3].map((index) => (
                        <span key={index} style={{ '--i': index }} className="cube-span"></span>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default Loader