import React from 'react'
import { View, Image, TouchableOpacity } from 'react-native'
import { Avatar, Title } from 'react-native-paper'
import videoStyles from '../../../styles/VideoStyles';
import { useSelector } from 'react-redux';
import * as RootNavigation from '../../../../RootNavigation'
const Navbar = () => {
   
    const User = useSelector(state => state.auth);
   
    return (
        <View style={{ ...videoStyles.header }}>
            <View style={{ flexDirection: "row", alignItems: "center" }}>
                <Image source={require('../../../../assets/logo.png')} style={videoStyles.imageShadow} />
                <Title style={{ ...videoStyles.darkTextShadow, marginLeft: 10 }}>{User.currentUser.City}</Title>
            </View>
            <TouchableOpacity onPress={()=>RootNavigation.navigate('Me') }>
            <Avatar.Image size={30} source={{ uri: User.currentUser.photoURL }} />
            </TouchableOpacity>
        </View>
    )
}

export default Navbar
