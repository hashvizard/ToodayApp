import React, { createContext, useEffect, useState } from 'react'
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs'
import FeedScreen from '../../screens/feed'
import ProfileScreen from '../../screens/profile'
import CommentModal from '../../components/comment'

const { Screen, Navigator } = createMaterialTopTabNavigator()



const FeedNavigation = () => {

    return (
        <Navigator
            initialRouteName="feedList"
            backBehavior='initialRoute'
          
            tabBar={() => <></>}>
            <Screen
                name="feedProfile"
                component={ProfileScreen}
            />
            <Screen
                name="feedList"
                component={FeedScreen}
                initialParams={{ profile: false }} />
            <Screen
                name="comment"
                component={CommentModal}
            />

        </Navigator>
    )
}

export default FeedNavigation
