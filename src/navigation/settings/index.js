import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { createStackNavigator } from '@react-navigation/stack';
import SettingPage from '../../screens/settings'
import ProfileEdit from '../../components/settings/Profile';

const Stack = createStackNavigator()

const Settings = () => {
    return (
        <Stack.Navigator>
            <Stack.Screen name="settingPage" component={SettingPage} options={{ headerShown: true }} />
            <Stack.Screen name="profileEdit" component={ProfileEdit} options={{ headerShown: true }} />
        </Stack.Navigator>
    )
}

export default Settings

const styles = StyleSheet.create({})