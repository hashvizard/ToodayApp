import React, { useContext, useEffect, useState } from 'react'
import { View, Text, ScrollView } from 'react-native'
import { useSelector } from 'react-redux'
import styles from './style'
import ProfileNavBar from '../../components/profile/navbar'
import ProfileHeader from '../../components/profile/header'
import ProfilePostList from '../../components/profile/postList'
import { SafeAreaView } from 'react-native-safe-area-context'
import { CurrentUserProfileItemInViewContext } from '../../navigation/feed'
import { useUser } from '../../hooks/useUser'
import { getPostsByUserId } from '../../services/posts'
import { useFocusEffect } from '@react-navigation/native';

export default function ProfileScreen({ route }) {
    const initialUserId = useSelector(state => state.initialPost.userId);
    const [userPosts, setUserPosts] = useState([])

    let providerUserId = null
    if (CurrentUserProfileItemInViewContext != null) {
        providerUserId = useContext(CurrentUserProfileItemInViewContext)
    }

    const user = useUser(initialUserId ? initialUserId : providerUserId).data;


    useFocusEffect(
        React.useCallback(() => {
            if (user === undefined || user === null) {
                return;
            }
            getPostsByUserId(user.uid).then(setUserPosts)

            return () => {
                setUserPosts([])
            }
        }, [user])
    );

    if (user === undefined || user === null) {
        return <></>
    }
    return (
        <SafeAreaView style={styles.container}>
            <ScrollView
            stickyHeaderIndices={[0]}
            >
            <ProfileNavBar user={user} route={route} />
            <ProfileHeader user={user} />
            <ProfilePostList posts={userPosts} />
            </ScrollView>
        </SafeAreaView>
    )
}