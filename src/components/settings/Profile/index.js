import { View } from 'react-native'
import React, { useState, useEffect } from 'react'
import { Avatar, ActivityIndicator } from 'react-native-paper';
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler'
import { useSelector, useDispatch } from 'react-redux';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import * as ImagePicker from 'react-native-image-picker'
import { updateProfile } from '../../../redux/actions';
import { List, Button } from 'react-native-paper';
import styles from './styles'
import UpdateModal from './UpdateModal';
import { USER_STATE_CHANGE } from '../../../redux/constants';

const ProfileEdit = (props) => {
    const user = useSelector(state => state.auth);

    const dispatch = useDispatch()

    const [loading, setLoading] = useState(false);

    const [showModal, setshowModal] = useState({ 'type': '', 'show': false });


    useEffect(() => { }, [showModal])


    const pickFromGallery = async () => {
        let result = await ImagePicker.launchImageLibrary({
            mediaType: 'photo',
            includeBase64: true,
            allowsEditing: true,
        })
        if(result.didCancel){
            setLoading(false);
        }
        else if (result) {
            setLoading(true);
            dispatch(updateProfile(result.assets[0].base64))
                .then((image) => {
                    let data = user.currentUser;
                    data.profile = image;
                    dispatch({
                        type: USER_STATE_CHANGE,
                        currentUser: data,
                        loaded: true
                    })
                    setLoading(false)
                })
                .catch((err) => { setLoading(false); console.log(err) })
        }
    }

    return (<>
        <ScrollView style={{ flex: 1, backgroundColor: "white"}}>
            <View
                style={styles.imageContainer} >
                <Avatar.Image
                    size={100} source={{ uri: user.currentUser.profile }}
                />
                <Button icon="camera-plus" onPress={() => pickFromGallery()} loading={loading} mode="text" >
                   {loading?"Updating":"Add Profile"}
                </Button>
            </View>
            <View >
                <List.Item
                    style={{ padding: 15 }}
                    title="Name"
                    onPress={() => setshowModal({ 'type': 'name', 'show': true })}
                    description={user.currentUser.name}
                    right={props => <List.Icon {...props} color="#5bc0de" icon="pencil" />}
                    left={props => <List.Icon {...props} color="#5cb85c" icon="account" />}
                />
                <List.Item
                    style={{ padding: 15 }}
                    title="Location"
                    onPress={() => setshowModal({ 'type': 'location', 'show': true })}
                    description={user.currentUser.city}
                    right={props => <List.Icon {...props} color="#5bc0de" icon="pencil" />}
                    left={props => <List.Icon {...props} color="#d9534f" icon="map-marker" />}
                />
            </View>
        </ScrollView>
        {showModal.show ?
            <UpdateModal data={showModal.type == 'name' ? user.currentUser.name : user.currentUser.city}
                type={showModal.type} changeModal={() => setshowModal({ 'type': '', 'show': false })} />
            : null
        }
    </>
    )
}

export default ProfileEdit


