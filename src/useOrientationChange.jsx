import { useEffect, useState } from 'react';
const useOrientationChange = (callback) => {
    useEffect(() => {
        const handleOrientationChange = () => { callback(window.orientation); };
        window.addEventListener('orientationchange', handleOrientationChange);
        return () => { window.removeEventListener('orientationchange', handleOrientationChange); };
    }, [callback]);
};
export default useOrientationChange;