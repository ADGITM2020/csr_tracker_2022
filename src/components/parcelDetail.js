import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { getDatabase, ref, get, set } from "firebase/database";
import GetImageUrl from "./getImageUrl";
import app from '../utils/firebase';

const ParcelDetail = () => {
    document.title = "CSR Asset Tracker | Asset Details";
    const { keyId } = useParams();
    const [status, setStatus] = useState(true);
    const [image_url, setImageUrl] = useState('');
    const [error, setError] = useState(null);
    const [data, setData] = useState(null);
    /*const [url, setUrl] = useState("");*/
    /*const [coordinate, setCoordinate] = useState({
        "lat": 28.6471675,
        "lng": 77.2307066
    });*/

    /*if ("geolocation" in navigator) {
        navigator.geolocation.getCurrentPosition(function(position) {
            setCoordinate({
                "lat": position.coords.latitude,
                "lng": position.coords.longitude
            });
        /*const temp_url = `http://localhost:3000/real-time-track/${coordinate.lat}-${coordinate.lng}`;
        setUrl(temp_url);
        });
    } else {
        console.log("Not Available");
    }*/

    const getImage = () => {
        const database = getDatabase(app);
        set(ref(database, 'data/trigger'), keyId);
        var temp_url = GetImageUrl(keyId);
        setImageUrl(temp_url);
    }

    useEffect(() => {
        const database = getDatabase(app);
        get(ref(database, "data/" + keyId)).then((snapshot) => {
            if (snapshot.exists()) {
                setStatus(false);
                setError(null);
                setData(snapshot.val());
            } else {
                setStatus(false);
                setError(null);
                console.log("No data available");
            }
        }).catch((error) => {
            setStatus(false);
            setError(error.message);
            console.error(error);
        });
    }, [keyId])
    
    return (
        <div className="blog-details">
            <center>
                <h1>Asset Details</h1>
                <br />
            </center>
            {error && <div>Error...</div>}
            {status && <div>Loading...</div>}
            {data && (
                <article>
                    <center>
                        <div className="detail">
                            <h2><b>CST Project ID: </b> </h2><h1>{keyId}</h1>
                            <hr style={{clear: 'both'}} />
                            <h2><b>Incharge Name: </b></h2><h1>{data.incharge}</h1>
                            <hr style={{clear: 'both'}} />
                            <h2><b>Project Name: </b></h2><h1>{data.project}</h1>
                            <hr style={{clear: 'both'}} />
                            <h2><b>Project Location: </b></h2><h1>{data.location}</h1>
                            <hr style={{clear: 'both'}} />
                            <h2><b>Amount Invested (in Cr): </b></h2><h1>{data.amount} Crore</h1>
                            <hr style={{clear: 'both'}} />
                            <h2><b>Location Contact Number: </b></h2><h1>{data.contact}</h1>
                        </div><br />
                        {!image_url && (<button onClick={getImage}>Fetch Realtime Snapshot.</button>)}
                        {image_url && (<button onClick={getImage}>Fetch Realtime Snapshot.</button>)}<br/><br/>
                        {image_url && (<img src={image_url} alt = "asset_image" width="162px" height="162px" />)}
                    </center>
                </article>
            )}
		</div>
    );
}

export default ParcelDetail;
