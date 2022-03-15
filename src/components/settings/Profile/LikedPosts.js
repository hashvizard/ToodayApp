import React, {  useState } from 'react'
import { ScrollView } from 'react-native'
import { useFocusEffect } from '@react-navigation/native';
import { getLikedPostByUserId, getPostsByUserId } from '../../../services/posts';
import ProfilePostList from '../../profile/postList';
import videoStyles from '../../../styles/VideoStyles';

export default function LikedPosts({ route }) {
    
    const initialUserId = route.params.uid;
    const [userPosts, setUserPosts] = useState([])


    useFocusEffect(
        React.useCallback(() => {
            getLikedPostByUserId(initialUserId).then(setUserPosts)
            return () => {
                setUserPosts([])
            }
        }, [initialUserId])
    );

  
    return (<ScrollView style={videoStyles.spaceBottom}>
            <ProfilePostList posts={userPosts} />
            </ScrollView>)
}