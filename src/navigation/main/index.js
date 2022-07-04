import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { createStackNavigator } from '@react-navigation/stack';
import { userAuthStateListener } from '../../redux/actions';
import SavePostScreen from '../../screens/savePost';
import EditProfileScreen from '../../screens/profile/edit';
import ReviewModal from '../../screens/profile/reviews';
import EditProfileFieldScreen from '../../screens/profile/edit/field';
import ProfileScreen from '../../screens/profile';
import FeedScreen from '../../screens/feed';
import UserLogin from '../../components/auth/login';
import UserCity from '../../components/auth/city';
import Error from '../../components/error';
import CommentModal from '../../components/comment';
import Settings from '../settings';
import UserInfo from '../../components/auth/userInfo';
import SplashScreen from '../../components/splash';
import CameraScreen from '../../screens/camera';
import Gallery from '../../screens/camera/Gallery';
import GalleryView from '../../screens/camera/GalleryView';
import ProfileFeed from '../../screens/feed/ProfileFeed';
import ViewedFeed from '../../screens/feed/ViewedFeed';
import UserFeed from '../../screens/feed/UserFeed';
import EditPost from '../../screens/editPost';
import { IconButton } from 'react-native-paper';
import * as RootNavigation from '../../../RootNavigation';
const Stack = createStackNavigator()


export default function Route() {

    const currentUserObj = useSelector(state => state.auth);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(userAuthStateListener());
    }, [])

    if (!currentUserObj?.loaded || currentUserObj?.updates) {
        return (<>
            <SplashScreen />
        </>)
    }

    return (<>
        <Stack.Navigator>
            {currentUserObj?.currentUser === null ?
                <Stack.Screen name="auth" component={UserLogin} options={{ headerShown: false }} />
                : currentUserObj?.currentUser?.city_id === null ?
                    <Stack.Screen name="userInfo" component={UserInfo} options={{ headerShown: true, title: "Select your city" }} />
                    :
                    <>
                        <Stack.Screen name="home" component={FeedScreen} options={{ headerShown: false }} />
                        <Stack.Screen name="profileFeed" component={ProfileFeed} options={{ headerShown: false }} />
                        <Stack.Screen name="ViewedFeed" component={ViewedFeed} options={{ headerShown: false }} />
                        <Stack.Screen name="UserFeeds" component={UserFeed} options={{ headerShown: false }} />
                        <Stack.Screen name="savePost" component={SavePostScreen} options={{ headerShown: false, title: "Description" }} />
                        <Stack.Screen name="editPost" component={EditPost} options={{ headerShown: false, title: "Edit Post" }} />
                        <Stack.Screen name="userPosts" component={FeedScreen} options={{ headerShown: false }} />
                        <Stack.Screen name="profileOther" component={ProfileScreen} options={{ headerShown: false }} />
                        <Stack.Screen name="profileReviews" component={ReviewModal} options={{ headerShown: false }} />
                        <Stack.Screen name="profileComment" component={ReviewModal} options={{ headerShown: false }} />
                        <Stack.Screen name="editProfile" component={EditProfileScreen} options={{ headerShown: false }} />
                        <Stack.Screen name="editProfileField" component={EditProfileFieldScreen} options={{ headerShown: false }} />
                        <Stack.Screen name="comment" component={CommentModal} options={{ headerShown: false }} />
                        <Stack.Screen name="add" component={CameraScreen} options={{ headerShown: false }} />
                        <Stack.Screen name="gallery" component={GalleryView} options={{ headerShown: true, title: "Collection" ,
                         headerRight: () => (
                            <IconButton
                            icon="camera"
                            color="#5bc0de"
                            size={30}
                            onPress={() => RootNavigation.navigate('add') }
                            />
                          ),}} 
                        
                        />
                        <Stack.Screen name="settings" component={Settings} options={{ headerShown: false }} />
                    </>
            }
            <Stack.Screen name="Error" component={Error} options={{ headerShown: false }} />
        </Stack.Navigator>
    </>
    )
}
