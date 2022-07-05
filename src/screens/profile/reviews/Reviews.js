import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { Avatar } from 'react-native-paper';
import { changeDateForamt } from '../../../helpers';
import { useUser } from '../../../hooks/useUser';
import * as RootNavigation from '../../../../RootNavigation';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { useSelector } from 'react-redux';
import {Caption} from 'react-native-paper'

const Reviews = (props) => {
    const user = props.item.item;
    
    return (<View>
        <View style={[{
            overflow: "hidden",
            margin: 10,
            borderRadius: 15,
            flexWrap: "wrap"
        }]}>
            <View style={{ flexDirection: "row", alignItems: 'center' }}>
                <TouchableOpacity
                    onPress={() => {
                        if (props.id != user.users.id) RootNavigation.navigate('profileOther')
                        else props.navigation.goBack();
                    }}
                >
                    <Avatar.Image size={30} source={{ uri: user.users?.profile }} style={{ marginRight: 10 }} />
                </TouchableOpacity>
                <Caption textBreakStrategy='highQuality' style={styles.Text}>{user.review}</Caption>
            </View>
            <View style={{ flexDirection: "row", justifyContent: "flex-end", width: "100%", marginTop: 5 }}>
                <Text style={styles.TextTime}> {user?.users?.name} |  {changeDateForamt(new Date(user?.created_at))} ago</Text>
            </View>
        </View>
    </View>
    )
}

export default Reviews

const styles = StyleSheet.create({
    Text: {
        color: "white",
    },
    TextTime: {
        color: "grey",
        fontSize: 11,
        marginRight: 5
    }
})