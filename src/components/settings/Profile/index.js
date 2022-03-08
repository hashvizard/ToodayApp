import { Text, View } from 'react-native'
import React, { useState } from 'react'
import { Avatar, ActivityIndicator } from 'react-native-paper';
import { TouchableOpacity } from 'react-native-gesture-handler'
import { useSelector, useDispatch } from 'react-redux';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import * as ImagePicker from 'react-native-image-picker'
import { updateProfile } from '../../../redux/actions';
import styles from './styles'

const ProfileEdit = () => {
    const user = useSelector(state => state.auth);

    const dispatch = useDispatch()

    const [loading, setLoading] = useState(false);

    const pickFromGallery = async () => {
        let result = await ImagePicker.launchImageLibrary({
            mediaType: 'photo',
            includeBase64: true,
            allowsEditing: true,
        })
        if (result) {
            setLoading(true);
            dispatch(updateProfile(result.assets[0].base64))
                .then(() => setLoading(false))
                .catch((err) => { setLoading(false); console.log(err) })
        }
    }

    return (
        <View style={{ flex: 1 }}>
            <TouchableOpacity
                onPress={() => pickFromGallery()}
                style={styles.imageContainer} >
                <View
                    style={{ ...styles.loadingIndicator, display: loading ? "flex" : "none" }}>
                    <ActivityIndicator animating={true} color="red" />
                </View>

                <Avatar.Image
                    size={150} source={{ uri: user.currentUser.photoURL }} />
                <Icon
                    style={styles.icon}
                    name='camera' size={40} />
            </TouchableOpacity>
            <Text>index</Text>
        </View>
    )
}

export default ProfileEdit