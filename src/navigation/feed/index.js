import React, { createContext, useEffect, useState } from 'react'
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs'
import FeedScreen from '../../screens/feed'
import ProfileScreen from '../../screens/profile'
import CommentModal from '../../components/comment'

const { Screen, Navigator } = createMaterialTopTabNavigator()

export const CurrentUserProfileItemInViewContext = createContext(null)

const FeedNavigation = () => {
    const [currentUserProfileItemInView, setCurrentUserProfileItemInView] = useState(null)
    return (
        <CurrentUserProfileItemInViewContext.Provider value={currentUserProfileItemInView}>
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
                initialParams={{ setCurrentUserProfileItemInView, profile: false }} />
                
            <Screen
                name="comment"
                component={CommentModal}
            />
            

        </Navigator>
        </CurrentUserProfileItemInViewContext.Provider>
    )
}

export default FeedNavigation
