import React from 'react'
import { View, Text, TouchableOpacity } from 'react-native'
import styles from './styles'
import  Feather  from 'react-native-vector-icons/Feather'
import * as RootNavigation from '../../../../RootNavigation';

export default function ProfileNavBar({ user }) {
    return (
        <View style={styles.container}>
            <TouchableOpacity>
                <Feather name="search" size={20} />
            </TouchableOpacity>
            <Text style={styles.text}>{user?.name}</Text>
            <TouchableOpacity
            onPress={()=>RootNavigation.navigate('home')}
            >
                <Feather name="x" size={24} />
            </TouchableOpacity>
        </View>
    )
}
