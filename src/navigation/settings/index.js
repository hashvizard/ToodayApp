import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { createStackNavigator } from '@react-navigation/stack';
import SettingPage from '../../screens/settings'
import ProfileEdit from '../../components/settings/Profile';
import ReviewModal from '../../screens/profile/reviews';
import ViewedPosts from '../../components/settings/Profile/ViewedPosts';
import Blocked from '../../components/settings/Profile/Blocked';
import UserPosts from '../../components/common/UserPosts';

const Stack = createStackNavigator()

const Settings = () => {
    return (
        <Stack.Navigator>
            <Stack.Screen name="settingPage" component={SettingPage} options={{ headerShown: true,title:"Settings" }} />
            <Stack.Screen name="profileEdit" component={ProfileEdit} options={{ headerShown: true , title:"Profile" }} />
            <Stack.Screen name="profileReviews" component={ReviewModal} options={{ headerShown: false }} />
            <Stack.Screen name="blocked" component={Blocked} options={{ headerShown: true , title:"Blocked users" }} />
            <Stack.Screen name="profilePosts" component={UserPosts} options={{ headerShown: true , title:"My Posts" }} />
            <Stack.Screen name="viewedPosts" component={ViewedPosts} options={{ headerShown: true, title:"Viewed" }} />
        </Stack.Navigator>
    )
}

export default Settings

const styles = StyleSheet.create({})