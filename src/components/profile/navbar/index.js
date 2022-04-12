import React from 'react'
import { View, Text, TouchableOpacity } from 'react-native'
import styles from './styles'
import Feather from 'react-native-vector-icons/Feather'
import * as RootNavigation from '../../../../RootNavigation';
import { useDispatch, useSelector } from 'react-redux';
import { activeFeedState } from '../../../redux/actions';

export default function ProfileNavBar() {
    const user = useSelector(state => state.auth.currentUser);
    const feedstate = useSelector(state => state.feedState.active);
    
    const NavigateBack = ()=>{
        switch (feedstate) {
            case 'View':
                RootNavigation.navigate('ViewedFeed');
                break;
            default:

                RootNavigation.navigate('home');
        }
    }

    return (
        <View style={styles.container}>
            <Text style={styles.text}>{user?.city}</Text>
            <TouchableOpacity
                onPress={() => NavigateBack()}>
                <Feather name="x" size={24} />
            </TouchableOpacity>
        </View>
    )
}
