
import { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup, Polyline } from 'react-leaflet';
import { getDatabase, ref, get } from "firebase/database";
import app from '../utils/firebase';
import L from 'leaflet';

const MapParcel = ({coorLat, coorLog}) => {
    const [parcelCoord, setparcelCoord] = useState({
        "lat": 0,
        "lng": 0
    });
    const locations = [
        {'name': "Sports Promotion", 'projectId': "8EFcAM", 'position': [28.651917649489388, 77.22564697265626]},
        {'name': "Relief Program", 'projectId': "GCw7Fh", 'position': [28.65022292178903, 77.24380016326906]},
        {'name': "Medical Clinic", 'projectId': "dHgRBl", 'position': [28.64095792629049, 77.23809242248535]},
        {'name': "General Store", 'projectId': "fcjP23", 'position': [28.641108583168954, 77.21354484558107]}
    ];
    const coorIcon = L.icon({
        iconUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png',
        iconSize: [20, 30],
        iconAnchor: [12.5, 41],
        popupAnchor: [0, 41]
    });
    const myCoorIcon = L.icon({
        iconUrl: 'static/marker.png',
        iconSize: [38, 50],
        iconAnchor: [12.5, 41],
        popupAnchor: [0, 41]
    });

    useEffect(() => {
        const interval = setInterval(() => {
            const database = getDatabase(app);
            get(ref(database, "data")).then((snapshot) => {
                if (snapshot.exists()) {
                    setparcelCoord({
                        "lat": snapshot.val().latitude,
                        "lng": snapshot.val().longitude
                    });  
                } else {
                    console.log("No data available");
                }
            }).catch((error) => {
                console.error(error);
            });
        }, 1500);
        return () => clearInterval(interval);
    }, [parcelCoord]);

    const polyline = [
        [coorLat, coorLog],
        [parcelCoord.lat, parcelCoord.lng],
    ]
    const fillBlueOptions = { fillColor: 'blue' };

    return (
        <MapContainer center={[coorLat, coorLog]} zoom={13} scrollWheelZoom={false}>
        <TileLayer
            attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {/*<Polyline pathOptions={fillBlueOptions} positions={polyline} />*/}
        <Marker position={[coorLat, coorLog]} icon={myCoorIcon}>
            <Popup>
                <center style={{margin: '10px', fontWeight: 'bold'}}>
                    Your <br /> Position.
                    <hr />
                </center>
            </Popup>
        </Marker>
        {
            locations.map((location) => (
                <Marker position={location.position} icon={coorIcon}>
                <Popup>
                    <center style={{fontWeight: 'bold'}}>
                        Project Name: {location.name}<br /> Details: <a href={`http://localhost:3000/get-detail/${location.projectId}`}>Link</a>.
                        <hr />
                    </center>
                </Popup>
            </Marker>))
        }
        </MapContainer>
    );
}

export default MapParcel;