import { View, Text } from 'react-native';
import React, { useEffect, useState } from 'react';
import { Modal, Avatar,  Button } from 'react-native-paper';
import blockStyles from './styles';
import { useDispatch, useSelector } from 'react-redux';
import { setFeedState } from '../../../redux/actions';
import { addBlockedUsers } from '../../../Apis/LaravelApis/userApi';

const BlockModal = ({ userData, state, hideModalNow,removeLoadedPost }) => {

    const user = useSelector(state => state.auth.currentUser);
    const dispatch = useDispatch();
    const [loading, setloading] = useState(false);


    useEffect(() => {
        return () => {
            setloading(false)
        }
    }, []);

    const hideModal = () => {
        dispatch(setFeedState(null));
        hideModalNow()
    }

    const blockUser = () => {
        setloading(true);
        let data = { blocker_user_id: user.id, blocked_user_id: userData.id }
        dispatch(addBlockedUsers(data)).then((data) => {
            if (data.status) {
                removeLoadedPost(userData.id);
                setloading(false);
            } else {
                setloading(false);
                hideModalNow();
            }
        }).catch(err => console.log(err))
    }

    return (
        <Modal visible={state} onDismiss={hideModal} contentContainerStyle={blockStyles.container}>
            <View style={{ flexDirection: "column", alignItems: "center", justifyContent: "space-around",marginTop:10 }}>
                <Avatar.Image size={40} source={{ uri: userData?.profile }} />
                <Text style={{ marginTop: 15, fontSize: 18, fontWeight: "bold",color:"white" }}>{userData?.name}</Text>
            </View>

            <Text style={{ textAlign: "center", marginVertical: 20 ,color:"white"}}>Are you sure you want to block this user ?</Text>
            <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-around" }}>
                <Button icon="close" color='#d9534f' contentStyle={{ justifyContent: loading ? "space-around" : "center" }} mode="text" onPress={() => hideModal()} style={{ marginTop: 15 }}>
                    Close
                </Button>
                <Button icon="cancel" loading={loading}  contentStyle={{ justifyContent: loading ? "space-around" : "center" }} mode="text" onPress={() => !loading && blockUser()} style={{ marginTop: 15 }}>
                    {loading ? 'Blocking User' : 'Block'}
                </Button>
            </View>
        </Modal>
    );
};

export default BlockModal;
