
const Home = () => {
    document.title = "CSR Asset Tracker | Home";

    /*useEffect(() => {
        const interval = setInterval(() => {
            const database = getDatabase(app);
            const buzzer = ref(database, "data");
            get(buzzer).then(async (snapshot) => {
                if (snapshot.exists()){
                    const buzzerData = snapshot.val().buzzer;
                    const metalDetectorData = snapshot.val().detector;
                    if(metalDetectorData === 1){
                        if(buzzerData === 1){
                            console.log("working");
                            setMetal("Metal is detected in the Parcel, Please Check.");
                        }else {
                            setMetal("All Clear, No harm.");
                        }
                    }else{
                        setMetal('');
                    }
                }else {
                    console.log("No Detector Installed.");
                }
            });
        }, 2000);
        return () => clearInterval(interval);
    }, []);

    const startMetalDetection = () => {
        const database = getDatabase(app);
        const detector = ref(database, "data/detector");
        get(detector).then(async (snapshot) => {
            if (snapshot.exists()){
                const data = await snapshot.val();
                if(data === 1){
                    set(detector, 0);
                    setDetectorState("Detector is Off.");
                }else {
                    set(detector, 1);
                    setDetectorState("Detector is On.");
                }
            }else {
                console.log("No Detector Installed.");
            }
        }); 
    }*/

    return (
        <div>
            <center>
                <h1>Solar-Powered CSR Asset Tracking System</h1>
                <h2>Coal India Limited</h2>
                <div className="create" style={{
                    margin: '25px'
                }}>
                    <p style={{fontSize: 18, marginBottom: '20px'}}>
                        <b>
                        Prototype of a Solar-Powered IoT Device with the ability to 
                        connect to a smart network to be used in Geo Tagging of Physical Assets Created under CSR.
                        </b>
                    </p><br/>
                    <a href={'http://localhost:3000/real-time-track'} target="_blank" rel="noreferrer noopener" style={{
                            textDecoration: 'none',
                            fontWeight: 'bold',
                            color: '#f1356d',
                            fontSize: '40px'
                    }}>Track Your CSR Assets</a>
                    
                    {/*<button onClick={() => handleClick()} style={{margin: '5px'}}><h2>Sort Parcel</h2></button>
                    <button onClick={() => startMetalDetection()}><h2>Detect Metal</h2></button>
                    <h4 style={{
                        marginTop: '20px',
                        color: 'red'
                    }}>{detectorState}</h4>
                    <h2 style={{
                        color: 'green'
                    }}>{metal}</h2>*/}
                </div>
            </center>
        </div>   
    );
}

export default Home;