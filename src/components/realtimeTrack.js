import { useState } from 'react';
import MapParcel from './mapParcel';

const RealtimeTrack = () => {
    document.title = "CSR Asset Tracker | Realtime Tracking";
    const [coordinate, setCoordinate] = useState({
        "lat": 28.6471675,
        "lng": 77.2307066
    });
    
    if ("geolocation" in navigator) {
        navigator.geolocation.getCurrentPosition(function(position) {
            setCoordinate({
                "lat": position.coords.latitude,
                "lng": position.coords.longitude
            });
        });
    } else {
        console.log("Not Available");
    }

    return (
        <div className="map" style={{width: '100%'}}>
            <MapParcel coorLat={coordinate.lat} coorLog={coordinate.lng} />
        </div>
    );
}

export default RealtimeTrack;