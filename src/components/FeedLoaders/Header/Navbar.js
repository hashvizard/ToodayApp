import React, { useEffect } from 'react'
import { View, Image, TouchableOpacity } from 'react-native'
import { Avatar, Title } from 'react-native-paper'
import videoStyles from '../../../styles/VideoStyles';
import { useSelector } from 'react-redux';
import * as RootNavigation from '../../../../RootNavigation'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const Navbar = (props) => {

    const User = useSelector(state => state.auth);
    const post = useSelector(state => state.initialPost);
    console.log(props)
    return (
        <View style={{ ...videoStyles.header }}>
            <View style={{ flexDirection: "row", alignItems: "center" }}>
                <Icon name='map-marker' size={30} color="red" />
                <Title style={{ ...videoStyles.darkTextShadow, marginLeft: 5, color: "grey" }}>{post.location ? post.location : User.currentUser.City}</Title>
            </View>
            <TouchableOpacity onPress={() => RootNavigation.navigate('Me')}>
                {props.profile ?
                <TouchableOpacity onPress={()=>props.navigation.goBack()}>
                    <Icon name='close' size={30} color="red" />
                </TouchableOpacity>
                    :
                    <Avatar.Image size={30} source={{ uri: User.currentUser.photoURL }} />
                }
            </TouchableOpacity>
        </View>
    )
}

export default Navbar
