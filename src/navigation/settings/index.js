import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { createStackNavigator } from '@react-navigation/stack';
import SettingPage from '../../screens/settings'
import ProfileEdit from '../../components/settings/Profile';
import ReviewModal from '../../screens/profile/reviews';
import MyPosts from '../../components/settings/Profile/MyPosts';
import LikedPosts from '../../components/settings/Profile/LikedPosts';
import Blocked from '../../components/settings/Profile/Blocked';

const Stack = createStackNavigator()

const Settings = () => {
    return (
        <Stack.Navigator>
            <Stack.Screen name="settingPage" component={SettingPage} options={{ headerShown: true,title:"Settings" }} />
            <Stack.Screen name="profileEdit" component={ProfileEdit} options={{ headerShown: true , title:"Profile" }} />
            <Stack.Screen name="profileReviews" component={ReviewModal} options={{ headerShown: false }} />
            <Stack.Screen name="blocked" component={Blocked} options={{ headerShown: true , title:"Blocked users" }} />
            <Stack.Screen name="profilePosts" component={MyPosts} options={{ headerShown: true }} />
            <Stack.Screen name="likedPosts" component={LikedPosts} options={{ headerShown: true }} />
        </Stack.Navigator>
    )
}

export default Settings

const styles = StyleSheet.create({})