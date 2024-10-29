import React, {useState, useEffect, useRef} from 'react';

function CameraCard(){
    const [hasPermission, setHasPermission] = useState(null);
    const videoRef = useRef(null);

    const handlePermissions = async () => {
        try{
            const stream = await navigator.mediaDevices.getUserMedia({video: true});
            setHasPermission(true);
            videoRef.current.srcObject = stream;
        } catch (error) {
            console.error('Error accessing camera:', error);
            setHasPermission(false);
        }
    };

    useEffect(() => {
        handlePermissions();
    }, []);


    return(
        <>
        <div className='col-3 card'>
            <div className='card-body'>
                {hasPermission === null ? (
                    <p>Requesting camera permission...</p>
                ) : hasPermission ? (
                    <video ref={videoRef} autoPlay playsInline />
                ) : (
                    <video ref={videoRef} autoPlay playsInline />
                    //<button onClick={handlePermissions}>Allow Camera</button>
                    
                )}
            </div>
        </div>
        </>
    )
}

export default CameraCard;