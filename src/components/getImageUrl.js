import app from '../utils/firebase';
import { getStorage, ref } from "firebase/storage";

const GetImageUrl = (keyId) => {
    const storage = getStorage(app);
    const httpsReference = ref(storage, `images/${keyId}.png`);
    const image_url = `https://firebasestorage.googleapis.com/v0/b/csr-project-ba9c3.appspot.com/o/images%2F${keyId}?alt=media&token=${httpsReference.downloadTokens}`
    return image_url;
}

export default GetImageUrl;