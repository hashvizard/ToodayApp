import React from 'react'
import { createStackNavigator } from '@react-navigation/stack';
import CameraScreen from '../../screens/camera';
import ProfileScreen from '../../screens/profile';
import SearchScreen from '../../screens/search';
import FeedNavigation from '../feed';
import auth from '@react-native-firebase/auth';

const Stack = createStackNavigator()

export default function HomeScreen() {
    return (
        <Stack.Navigator
            initialRouteName={"feed"}
            screenOptions={{
                headerShown: false
            }}>
            <Stack.Screen
                name="feed"
                component={FeedNavigation}

            />
            <Stack.Screen
                name="Discover"
                component={SearchScreen}

            />
            <Stack.Screen
                name="Add"
                component={CameraScreen}

            />
            <Stack.Screen
                name="Me"
                component={ProfileScreen}
                initialParams={{ initialUserId: auth().currentUser.uid }}
            />
        </Stack.Navigator>
    )
}
