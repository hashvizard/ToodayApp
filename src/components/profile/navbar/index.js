import React from 'react'
import { View, Text, TouchableOpacity } from 'react-native'
import styles from './styles'
import  Feather  from 'react-native-vector-icons/Feather'
import * as RootNavigation from '../../../../RootNavigation';
import { useSelector } from 'react-redux';

export default function ProfileNavBar() {
    const user = useSelector(state=>state.auth.currentUser);
    return (
        <View style={styles.container}>
            <Text style={styles.text}>{user?.city}</Text>
            <TouchableOpacity
            onPress={()=>RootNavigation.navigate('home')}
            >
                <Feather name="x" size={24} />
            </TouchableOpacity>
        </View>
    )
}
