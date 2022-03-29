import { useState } from "react";
import app from '../utils/firebase';
import QRCode from 'qrcode';
import { getDatabase, set, ref } from "firebase/database";
import uploadFile from "./uploadFile";


const generateRandomString = () => {
    let random_string = '';
    const char = 'abcdefghijklmnopqrstuvwxyz1234567890ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    let i;

    for(i = 0; i < 6; i++){
        random_string = random_string + char.charAt(Math.floor(Math.random()* char.length))
    }
    return random_string
}

const AddParcel = () => {
    document.title = "CSR Asset Tracker | Add Asset";

    const database = getDatabase(app);
    const [incharge, setIncharge ] = useState('');
	const [project, setProject] = useState('');
	const [location, setLocation ] = useState('');
    const [contact, setContact ] = useState('');
    const [amount, setAmount ] = useState('');
    const [images, setImages ] = useState(null);
	const [detail, setDetail ] = useState(null);
    const [codeurl, setcodeurl ] = useState('');
    const [newParcelKey, setnewParcelKey ] = useState('');
	const [upload, setupload ] = useState(false);

	const handleSubmit = (e) => {
		e.preventDefault();
		const parcel = { incharge, project, location, contact, amount };
		setupload(true);

        const ParcelKey = generateRandomString();
        set(ref(database, 'data/' + ParcelKey), parcel);
        parcel['id'] = ParcelKey;
        setnewParcelKey(ParcelKey);
        setDetail(parcel);
        setupload(false);
	}

    const generateCode = async () => {
        try {
            const parcelDetailUrl = "http://localhost:3000/get-detail/" + newParcelKey
            const response = await QRCode.toDataURL(parcelDetailUrl);
            setcodeurl(response);
			uploadFile(images, newParcelKey);
        }catch (error){
            console.log(error);
        }
    }

    return (
        <center>
            <h1>Add New CSR Asset Details</h1><br />
            <div className="create">
            <form onSubmit = { (e) => handleSubmit(e) } encType='multipart/form-data' >
                <label><b>Incharge Name: </b></label>
				<input
					type="text" 
			        required 
			        value={incharge}
			        onChange={(e) => setIncharge(e.target.value)}
				/>
				<label><b>Project Name: </b></label>
				<input
					type="text" 
			        required 
			        value={project}
			        onChange={(e) => setProject(e.target.value)}
				/>
                <label><b>Contact Number: </b></label>
				<input
					type="text" 
			        required 
			        value={contact}
			        onChange={(e) => setContact(e.target.value)}
				/>
                <label><b>CSR Project Location: </b></label>
				<textarea
					type="text" 
			        required 
			        value={location}
			        onChange={(e) => setLocation(e.target.value)}
				></textarea>
                <label><b>Amount Invested (in Cr.): </b></label>
				<input
					type="number" 
			        required 
			        value={amount}
			        onChange={(e) => setAmount(e.target.value)}
				/>
                <label><b>Add Site Images: </b></label>
				<input
					type="file" 
			        required
			        onChange={(e) => setImages(e.target.files[0])}
				/>
		        {!upload && <button>Add Parcel</button>}
		        {upload && <button disabled>Uploading</button>}
			</form>
            {detail ? (
                <button onClick={generateCode}>Generate Code</button>
            ) : null}<br />
            {codeurl ? (<a href={codeurl} download><img src={codeurl} alt="Code" /></a>) : null}
            </div>
        </center>
    );
}

export default AddParcel;