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
    console.log(User);
    console.log(props)
    return (
        <View style={{ ...videoStyles.header }}>
            <View style={{
                flexDirection: "row", alignItems: "center", justifyContent: "flex-end", paddingHorizontal: 10,
              
                margin: 15, paddingVertical: 3, borderRadius: 50
            }}>


               {/*  <IconButton
                    icon={props.profile ? "home" : "camera"}
                    style={{ padding: 0, margin: 0 }}
                    size={25}
                    color="yellow"
                    animated={true}
                    onPress={() => {
                        props.profile ? RootNavigation.navigate('feedList') : RootNavigation.navigate('Add');

                    }}
                />
 */}
                            
              

                <TouchableOpacity onPress={() => RootNavigation.navigate('settings')}>
                    {props.profile ?
                        <TouchableOpacity onPress={() => props.navigation.goBack()}>
                            <Icon name='close' size={30} color="red" />
                        </TouchableOpacity>
                        :
                        <Avatar.Image size={30} source={{ uri: User.currentUser.profile }} />
                    }
                </TouchableOpacity>
            </View>
        </View>
    )
}

export default Navbar
