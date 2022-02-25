import React, { useEffect } from 'react'
import { View, Text, Image, TouchableOpacity } from 'react-native'
import { Avatar, IconButton, Title } from 'react-native-paper'
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
            <View style={{
                flexDirection: "row", alignItems: "center", justifyContent: "space-between", paddingHorizontal: 10,
                backgroundColor: "rgba(0,0,0,0.1)",
                margin: 15, paddingVertical: 3, borderRadius: 50
            }}>
                <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between", }}>
                <IconButton
                    icon={"magnify-scan"}
                    style={{ padding: 0, margin: 0 }}
                    size={25}
                    color="green"
                    animated={true}
                    onPress={() => {
                        props.profile ? RootNavigation.navigate('feedList') : RootNavigation.navigate('Add');

                    }}
                />
                    <Text style={{ color: "white", marginLeft: 10 }}>Search for users in your city..</Text>

                </View>

                <IconButton
                    icon={props.profile ? "home" : "camera"}
                    style={{ padding: 0, margin: 0 }}
                    size={25}
                    color="yellow"
                    animated={true}
                    onPress={() => {
                        props.profile ? RootNavigation.navigate('feedList') : RootNavigation.navigate('Add');

                    }}
                />

                {/*   <TouchableOpacity onPress={() => RootNavigation.navigate('Me')}>
                {props.profile ?
                <TouchableOpacity onPress={()=>props.navigation.goBack()}>
                    <Icon name='close' size={30} color="red" />
                </TouchableOpacity>
                    :
                    <Avatar.Image size={30} source={{ uri: User.currentUser.photoURL }} />
                }
            </TouchableOpacity> */}
            </View>
        </View>
    )
}

export default Navbar
