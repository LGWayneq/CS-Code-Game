import React, { useEffect, useState } from 'react';


function getWindowDimensions() {
    const { innerWidth: width, innerHeight: height } = window;
    return {
        width,
        height
    };
}

export default function WindowDimensions() {
    const [windowDimensions, setWindowDimensions] = useState({ height: window.innerHeight, width: window.innerWidth });

    useEffect(() => {
        function handleResize() {
            setWindowDimensions(getWindowDimensions());
        }

        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    return windowDimensions;
}
