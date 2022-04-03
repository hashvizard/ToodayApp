import { View, Text } from 'react-native'
import React, { useState, useMemo ,useEffect} from 'react'
import videoStyles from '../styles/VideoStyles'
import { IconButton, Paragraph, Subheading } from 'react-native-paper'
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { useDispatch, useSelector } from 'react-redux';
import { setFeedState, setIntialPost } from '../redux/actions';
import * as RootNavigation from '../../RootNavigation';


const Footer = ({post}) => {
    const dispatch=useDispatch();
    const feedState = useSelector(state => state.feedState);
    const [show, setshow] = useState(post?.description.length > 80 ? true : false)


    return (<View style={{ ...videoStyles.spaceBottom, borderColor: "red", width: "100%", position: "absolute", zIndex: 21 }}>

        <View style={{ alignItems: "flex-end", flexDirection: "row", justifyContent: "space-between" }}>
            <View style={{ flexDirection: "row", padding: 15, alignItems: "center", flexWrap: "wrap", zIndex: 0, width: "75%", }}>
                <FontAwesome name='map-marker' size={24} color="red" />
                <Subheading style={{ marginLeft: 15, color: 'white' }}>{post?.location}</Subheading>
                <Paragraph style={{ marginTop: 15, paddingTop: 0, color: 'white' }}>
                    {show ? `${post?.description.substr(0, 80)}... ` : post?.description}</Paragraph>
                <Text
                    onPress={() => setshow(!show)}
                    style={{ display: post?.description.length > 80 ? 'flex' : 'none', color: "#5bc0de", }}>
                    {show ? 'See full description' : 'Show Less'}
                </Text>
            </View>
            <View style={{ width: "25%", alignItems: "flex-end" }}>
                <IconButton
                    style={{ display: feedState.open != "BOTTOM" ? "flex" : "none" }}
                    icon="rotate-left"
                    color="white"
                    animated={true}
                    size={45}
                    onPress={() => dispatch(setFeedState("BOTTOM"))}
                />
                <View style={{ display: feedState.open == "BOTTOM" ? "flex" : "none" }}>
                    <IconButton
                        icon="cog"
                        size={40}
                        color="white"
                        animated={true}
                        onPress={() => RootNavigation.navigate('settings')}
                    />

                    <IconButton
                        icon="plus-circle"
                        animated={true}
                        color="white"
                        size={40}
                        onPress={() => RootNavigation.navigate('add')}
                    />
                    <IconButton
                        icon="bell-circle"
                        color="white"
                        animated={true}
                        size={40}
                        onPress={() => console.log('Pressed')}
                    />
                </View>
            </View>
        </View>

        <View style={{
            flexDirection: "row", justifyContent: "space-between", alignItems: "center",
            display: feedState.open == "BOTTOM" ? "flex" : "none"
        }}>
            <View style={{ flexDirection: "row", paddingHorizontal: 10, alignItems: "center", justifyContent: "space-between", width: "75%" }}>
                <IconButton
                    icon="eye"
                    color="#5bc0de"
                    animated={true}
                    size={34}
                />
                <Text style={{ color: "white" }}>{post?.views}</Text>
                <IconButton
                    icon="comment"
                    animated={true}
                    color="white"
                    size={34}
                    onPress={() => console.log('Pressed')}
                />
                <Text style={{ color: "white" }}>{post?.comments}</Text>
            </View>
            <View style={{ width: "25%", alignItems: "flex-end" }}>
                <IconButton
                    icon="rotate-right"
                    animated={true}
                    color="white"
                    size={40}
                    onPress={() => dispatch(setFeedState(null))}
                />
            </View>
        </View>
    </View>
    )
}

export default Footer