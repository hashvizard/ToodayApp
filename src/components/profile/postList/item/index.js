import { useNavigation } from '@react-navigation/core';
import React from 'react'
import { View, Text, Image, TouchableOpacity } from 'react-native'
import styles from './styles';

export default function ProfilePostListItem({ item, goHome, index }) {

    return (
        <TouchableOpacity
            style={styles.container}
            onPress={() => goHome(index)}
        >
            <Image style={styles.image} source={{ uri: item.photoUrl }} />
        </TouchableOpacity>
    )
}
