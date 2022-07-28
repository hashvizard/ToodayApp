import React from 'react'
import { View,TouchableOpacity } from 'react-native'
import { Avatar} from 'react-native-paper'
import videoStyles from '../../../styles/VideoStyles';
import { useSelector } from 'react-redux';
import * as RootNavigation from '../../../../RootNavigation'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const Navbar = (props) => {

    const User = useSelector(state => state.auth);
  
    return (
        <View style={{ ...videoStyles.header }}>
            <View style={{
                flexDirection: "row", alignItems: "center", justifyContent: "flex-end", paddingHorizontal: 10,
              
                margin: 15, paddingVertical: 3, borderRadius: 50
            }}>

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
