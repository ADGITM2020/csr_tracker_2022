import app from '../utils/firebase';
import { getStorage, ref, uploadBytesResumable } from "firebase/storage";

const uploadFile = (images, ParcelKey) => {
    const storage = getStorage(app);
    const metadata = {
        contentType: 'image/png'
    };
    /*for (let i = 0; i < images.length; i++) {
        const file_name = ParcelKey + "_" + images[i].name;
        const storageRef = ref(storage, `/images/${file_name}`);
        uploadBytesResumable(storageRef, images[i], metadata);
	}*/
    const storageRef = ref(storage, `/images/${ParcelKey}`);
    uploadBytesResumable(storageRef, images, metadata);
};

export default uploadFile;