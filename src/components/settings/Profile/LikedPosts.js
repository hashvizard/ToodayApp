import React, {  useState } from 'react'
import { ScrollView } from 'react-native'
import { useFocusEffect } from '@react-navigation/native';
import { getLikedPostByUserId, getPostsByUserId } from '../../../services/posts';
import ProfilePostList from '../../profile/postList';
import videoStyles from '../../../styles/VideoStyles';
import { getUserPosts } from '../../../Apis/LaravelApis/postApi';
import {useDispatch} from 'react-redux'

export default function LikedPosts({ route }) {
    
    const initialUserId = route.params.id;
    const [userPosts, setUserPosts] = useState([])
    const dispatch = useDispatch();

    useFocusEffect(
        React.useCallback(() => {
            dispatch(getUserPosts(initialUserId)).then((data)=>{
            console.log(data);
            })
            .catch((err)=>{
                console.log(err);
            })
            return () => {
                setUserPosts([])
            }
        }, [initialUserId])
    );

  
    return (<>
    
    </>)
}