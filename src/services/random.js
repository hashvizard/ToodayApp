
import storage from '@react-native-firebase/storage'

export const saveMediaToStorage = (media, path, type) => new Promise((resolve, reject) => {
    const fileRef = storage().ref(path);
    if (type == 'image') {
        fileRef.putString(media, 'base64', { contentType: 'image/jpg' })
            .then(() => {
                fileRef.getDownloadURL()
                    .then((url) => {
                        resolve(url)
                    })
                    .catch((e) => reject(e));
            })
            .catch((e) => reject(e));
    }
    else {
        fileRef.putFile(media)
            .then(() => {
                fileRef.getDownloadURL()
                    .then((url) => {
                        resolve(url)
                    })
                    .catch((e) => reject(e));
            })
            .catch((e) => reject(e));
    }
})