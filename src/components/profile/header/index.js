import { useNavigation } from '@react-navigation/native'
import React from 'react'
import { View, Text, TouchableOpacity } from 'react-native'
import { Avatar, Caption, Paragraph, Title } from 'react-native-paper'
import buttonStyles from '../../../styles/buttonStyles'
import styles from './styles'
import * as RootNavigation from '../../../../RootNavigation';

export default function ProfileHeader({ user }) {
    return (
        <View style={styles.container}>
            <View style={{ flexDirection: "row", alignItems: "center", marginBottom: 20 }}>
                <View style={{ width: "30%" }}>
                    <Avatar.Image size={80} source={{ uri: user?.profile }} />
                </View>
                <View style={{ width: "65%" }}>
                    <Title>{user?.name}</Title>
                    <Text>{user?.profession}</Text>
                    <Caption >{user?.bio}</Caption>
                </View>
            </View>
            <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between", width: "100%" }}>

                <TouchableOpacity
                    style={buttonStyles.grayOutlinedButton}
                    onPress={() => RootNavigation.navigate('profileReviews', { id: user?.id })}>
                    <Text style={{ color: 'white' }}>Write a Review</Text>
                </TouchableOpacity>

            </View>
            <View style={styles.counterContainer}>
                <View style={styles.counterItemContainer}>
                    <Text style={styles.counterNumberText}>{user?.posts}</Text>
                    <Text style={styles.counterLabelText}>Posts</Text>
                </View>
                <View style={styles.counterItemContainer}>
                    <Text style={styles.counterNumberText}>{user?.views}</Text>
                    <Text style={styles.counterLabelText}>Views</Text>
                </View>
                <View style={styles.counterItemContainer}>
                    <Text style={styles.counterNumberText}>{user?.reviews}</Text>
                    <Text style={styles.counterLabelText}>Reviews</Text>
                </View>
                <View style={styles.counterItemContainer}>
                    <Text style={styles.counterNumberText}>{user?.comments}</Text>
                    <Text style={styles.counterLabelText}>Comments</Text>
                </View>
            </View>
        </View>
    )
}
