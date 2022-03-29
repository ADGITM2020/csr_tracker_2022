import { useRef, useState } from "react";
import QrReader from "react-qr-reader";
import app from '../utils/firebase';
import { getDatabase, ref, get } from "firebase/database";

const TrackAsset = () => {
    document.title = "CSR Asset Tracker | Track Asset";
    const database = getDatabase(app);
    const qrRef = useRef(null);
    const [keyId, setKey] = useState('');
    const [err, setError] = useState('');
    const [url, setUrl] = useState('');

    const browseFile = () => {
        qrRef.current.openImageDialog();
    }
    const handleError = (error) => {
        setError("No Device Found. Please try again by refreshing your browser.");
        document.getElementById('right').style.display = 'none';
        document.getElementById('error').style.display = 'block';
        console.log(error);
    };

    const handleScan = (result) => {
        if(result){
            setUrl(result);
            const resultObj = result.split("/");
            const key = resultObj[4];
            get(ref(database, "data/" + key)).then(async (snapshot) => {
                if (snapshot.exists()) {
                    setKey(key);
                    return;
                } else {
                    const val = "Invalid Code";
                    setKey(val);
                }
            });
        }
    };

    return (
        <div className="sort">
            <center>
            <h1>Scan & Track Your Assets</h1>
            <button onClick={browseFile} style={{
                margin: '10px'
            }}>Browse from Computer</button>
            <div id="left" style={{display: 'none'}}>
            <QrReader 
                ref={qrRef}
                delay={300}
                style={{width: '30%'}}
                onError={handleError}
                onScan={handleScan}
                legacyMode
            />
            </div>
            <div id="error" style={{
                display: "none",
                marginTop: '50px',
            }}>
                <hr />
                {err && (<h2>{err}</h2>)}
            </div>
            <div id="right" style={{display: 'block'}}>
            <h2 style={{margin: '10px'}}>Scan from Device</h2>
            <QrReader
                delay={300}
                style={{width: '55%'}}
                onError={handleError}
                onScan={handleScan}
            />
            </div>
            <br />
            {keyId && (<h2>Scanned CSR Asset ID: <span style={{
                fontWeight: 'bold', 
                color: '#f1356d'
            }}>{keyId}</span></h2>)}
            {url && (<a href={url} target="_blank" rel="noreferrer noopener" style={{
                textDecoration: 'none',
                fontWeight: 'bold',
                color: '#f1356d'
            }}>View CSR Asset Details</a>)}
            </center>
        </div>
    );
}

export default TrackAsset;