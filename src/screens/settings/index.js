import { Text, View, Image, ScrollView, Alert } from 'react-native'
import React, { useEffect, useState } from 'react'
import styles from './styles'
import { useSelector } from 'react-redux'
import { Caption, Divider, Headline, Paragraph, Subheading, Title } from 'react-native-paper'
import { List } from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import { Avatar } from 'react-native-paper';
import { TouchableOpacity } from 'react-native-gesture-handler'
import { useDispatch } from 'react-redux'
import { logOut } from '../../redux/actions/auth'
import * as RootNavigation from '../../../RootNavigation';
const SettingPage = (props) => {

  const user = useSelector(state => state.auth);

  const dispatch = useDispatch();

  const createTwoButtonAlert = () =>
    Alert.alert(
      "Log out",
      "Are you sure, you want to log out from tooday",
      [
        {
          text: "Cancel",
          onPress: () => console.log("Cancel Pressed"),
          style: "cancel"
        },
        { text: "Log-out", onPress: () => dispatch(logOut()).then(RootNavigation.navigate('auth')) }
      ]
    );
 
  return (
    <View style={styles.container} >
      {user.currentUser && <>
        <View style={{ padding: 20, alignItems: "center" }}>

          <TouchableOpacity onPress={() => props.navigation.navigate('profileEdit')} >
            <Avatar.Image
              size={100} source={{ uri: user.currentUser.profile }} />
          </TouchableOpacity>
          <View style={{ alignItems: 'center' }}>
            <Title style={{ marginTop: 15 }}>{user.currentUser.name}</Title>
            <Subheading>{user.currentUser.city}</Subheading>
          </View>

        </View>
        <Divider />
        <ScrollView >
          <View style={{ paddingTop: 25, paddingBottom: 10, backgroundColor: "#f7f7f7" }}>
            <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-around" }}>
              <View style={{ alignItems: "center" }}>
                <Icon name="eye" size={35} color="#5bc0de" />
                <Caption>Views</Caption>
                <Subheading>{user.currentUser.views}</Subheading>
              </View>
              <View style={{ alignItems: "center" }}>
                <Icon name="plus-circle" size={35} color="#d9534f" />
                <Caption>Posts</Caption>
                <Subheading>{user.currentUser.posts}</Subheading>
              </View>
              <View style={{ alignItems: "center" }}>
                <Icon name="comment" size={35} color="#f0ad4e" />
                <Caption>Comments</Caption>
                <Subheading>{user.currentUser.comments}</Subheading>
              </View>
            </View>
          </View>

          <Divider />

          <View style={{ padding: 15 }}>
            <List.Item
              left={props => <List.Icon  {...props} icon="pencil" color='#5cb85c' />}
              onPress={() => props.navigation.navigate('profileReviews', { id: user.currentUser.id })}
              title="Profile Reviews" />
            <List.Item
              description="All active posts that are live"
              onPress={() => props.navigation.navigate('profilePosts', { id: user.currentUser.id })}
              left={props => <List.Icon {...props} icon="video-vintage" color='#f0ad4e' />}
              title="My Posts" />
            <List.Item
              left={props => <List.Icon {...props} icon="eye" color='#5bc0de' />}
              onPress={() => props.navigation.navigate('viewedPosts', { id: user.currentUser.id })}
              description="Posts that has been viewed by you."
              title="Viewed Posts" />
            <List.Item
              left={props => <List.Icon {...props} icon="block-helper" color='#d9534f' />}
              description="Posts that has been liked by you"
              onPress={() => props.navigation.navigate('blocked', { id: user.currentUser.id })}
              title="Blocked Users" />
            <Divider />
            <List.Item
              left={props => <List.Icon {...props} icon="lock" color='#292b2c' />}
              description="About us, Privacy Policy, Terms & Condition"
              title="Help Center" />
            <List.Item
              titleStyle={{ color: '#d9534f' }}
              onPress={createTwoButtonAlert}
              left={props => <List.Icon {...props} color="#d9534f" icon="logout" />}
              title="Log Out" />
          </View>
        </ScrollView>
      </>}
    </View>
  )

}

export default SettingPage
