
import storage from '@react-native-firebase/storage'

export const saveMediaToStorage = (media, path) => new Promise((resolve, reject) => {
    const fileRef = storage().ref().child(path)
    fetch(media)
        .then(response => response.blob())
        .then(blob => fileRef.put(blob))
        .then(task => task.ref.getDownloadURL())
        .then(downloadUrl => resolve(downloadUrl))
        .catch((err) =>{console.log(err) ;reject(err)})
})