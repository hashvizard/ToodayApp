import { View } from 'react-native'
import React, { useState, useEffect } from 'react'
import { Avatar, ActivityIndicator } from 'react-native-paper';
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler'
import { useSelector, useDispatch } from 'react-redux';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import * as ImagePicker from 'react-native-image-picker'
import { updateProfile } from '../../../redux/actions';
import { List } from 'react-native-paper';
import styles from './styles'
import UpdateModal from './UpdateModal';

const ProfileEdit = (props) => {
    const user = useSelector(state => state.auth);

    const dispatch = useDispatch()

    const [loading, setLoading] = useState(false);

    const [showModal, setshowModal] = useState({'type':'','show':false});


    useEffect(() => { }, [showModal])


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

    return (<>
        <ScrollView style={{ flex: 1 }}>
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
            <View >
                <List.Item
                style={{padding:15}}
                    title="Name"
                    onPress={() => setshowModal({'type':'name','show':true})}
                    description={user.currentUser.displayName}
                    right={props => <List.Icon {...props} icon="pencil" />}
                    left={props => <List.Icon {...props} icon="account" />}
                />
                <List.Item
                style={{padding:15}}
                    title="Location"
                    onPress={() => setshowModal({'type':'location','show':true})}
                    description={user.currentUser.City}
                    right={props => <List.Icon {...props} icon="pencil" />}
                    left={props => <List.Icon {...props} icon="map-marker" />}
                />
            </View>
        </ScrollView>
        {showModal.show ?
            <UpdateModal data={showModal.type == 'name' ?user.currentUser.displayName:user.currentUser.City} 
            type={showModal.type}  changeModal={() => setshowModal({'type':'','show':false})} />
            :null
        }
    </>
    )
}

export default ProfileEdit


