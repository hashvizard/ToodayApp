import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { createStackNavigator } from '@react-navigation/stack';
import { userAuthStateListener } from '../../redux/actions';
import HomeScreen from '../home';
import SavePostScreen from '../../screens/savePost';
import EditProfileScreen from '../../screens/profile/edit';
import ReviewModal from '../../screens/profile/reviews';
import EditProfileFieldScreen from '../../screens/profile/edit/field';
import ReportModal from '../../components/modal/report';
import ProfileScreen from '../../screens/profile';
import FeedScreen from '../../screens/feed';
import UserLogin from '../../components/auth/login';
import UserCity from '../../components/auth/city';
import Error from '../../components/error';
import BlockModal from '../../components/modal/block';
import CommentModal from '../../components/comment';
import Settings from '../settings';


const Stack = createStackNavigator()


export default function Route() {

    const currentUserObj = useSelector(state => state.auth);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(userAuthStateListener());
    }, [])

    if (!currentUserObj.loaded) {
        return (<></>)
    }
   

    return (<>
            <Stack.Navigator>
                {currentUserObj.currentUser == null ?
                    <Stack.Screen name="auth" component={UserLogin} options={{ headerShown: false }} />
                    : (currentUserObj.currentUser != null ? !currentUserObj.currentUser.hasOwnProperty('City') : null) ?
                        <Stack.Screen name="city" component={UserCity} options={{ headerShown: false }} />
                        :
                        <>
                            <Stack.Screen name="home" component={HomeScreen} options={{ headerShown: false }} />
                            <Stack.Screen name="savePost" component={SavePostScreen} options={{ headerShown: false }} />
                            <Stack.Screen name="userPosts" component={FeedScreen} options={{ headerShown: false }} />
                            <Stack.Screen name="profileOther" component={ProfileScreen} options={{ headerShown: false }} />
                            <Stack.Screen name="profileComment" component={ReviewModal} options={{ headerShown: false }} />
                            <Stack.Screen name="editProfile" component={EditProfileScreen} options={{ headerShown: false }} />
                            <Stack.Screen name="editProfileField" component={EditProfileFieldScreen} options={{ headerShown: false }} />
                            <Stack.Screen name="comment" component={CommentModal} options={{ headerShown: false }} />
                            <Stack.Screen name="settings" component={Settings} options={{ headerShown: false }} />
                        </>
                }
                <Stack.Screen name="Error" component={Error} options={{ headerShown: false }} />
            </Stack.Navigator>
            <ReportModal />
            <BlockModal />
            </>
    )
}
