import { Text, View, Image, ScrollView } from 'react-native'
import React from 'react'
import styles from './styles'
import { useSelector } from 'react-redux'
import { Caption, Divider, Headline, Paragraph, Subheading } from 'react-native-paper'
import { List } from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import { Avatar } from 'react-native-paper';
import { TouchableOpacity } from 'react-native-gesture-handler'

const SettingPage = (props) => {

  const user = useSelector(state => state.auth);

  return (
    <View style={styles.container}>
      <View style={{ padding: 15 }}>
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <TouchableOpacity onPress={()=>props.navigation.navigate('profileEdit')} >
        <Avatar.Image
        size={70} source={{ uri: user.currentUser.photoURL }} />
         </TouchableOpacity>
          <View style={{ marginHorizontal: 20 }}>
            <Paragraph>{user.currentUser.displayName}</Paragraph>
            <Subheading>{user.currentUser.City}</Subheading>
          </View>
        </View>
      </View>
      <Divider />
      <View style={{ paddingVertical: 15 }}>
        <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-around" }}>
          <View style={{ alignItems: "center" }}>
            <Icon name="plus-circle" size={35} />
            <Caption>Posts</Caption>
            <Subheading>55</Subheading>
          </View>
          <View style={{ alignItems: "center" }}>
            <Icon name="heart-circle" size={35} />
            <Caption>Likes</Caption>
            <Subheading>55</Subheading>
          </View>
          <View style={{ alignItems: "center" }}>
            <Icon name="comment" size={35} />
            <Caption>Comments</Caption>
            <Subheading>55</Subheading>
          </View>
        </View>
      </View>

      <Divider />
      <ScrollView contentContainerStyle={{ padding: 15 }}>

        <List.Item
          left={props => <List.Icon {...props} icon="pencil" />}
          right={props => <Text style={{ alignSelf: "center", fontSize: 16, fontWeight: "bold" }}>0</Text>}
          title="Profile Reviews" />
        <List.Item
          description="All active posts that are live"
          left={props => <List.Icon {...props} icon="video-vintage" />}
          title="My Posts" />
        <List.Item
          left={props => <List.Icon {...props} icon="thumb-up" />}
          description="Posts that has been liked by you"
          title="Liked Posts" />
        <List.Item
          left={props => <List.Icon {...props} icon="block-helper" />}
          description="Posts that has been liked by you"
          right={props => <Text style={{ alignSelf: "center", fontSize: 16, fontWeight: "bold" }}>0</Text>}
          title="Blocked Users" />
        <Divider />
        <List.Item
          left={props => <List.Icon {...props} icon="lock" />}
          description="About us, Privacy Policy, Terms & Condition"
          title="Help Center" />
      </ScrollView>
    </View>
  )
}

export default SettingPage
