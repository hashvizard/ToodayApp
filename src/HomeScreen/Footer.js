import { View, Text, Alert } from 'react-native'
import React, { useState, useMemo, useEffect } from 'react'
import videoStyles from '../styles/VideoStyles'
import { IconButton, Paragraph, Subheading } from 'react-native-paper'
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { useDispatch, useSelector } from 'react-redux';
import { activeFeedState, setFeedState, setIntialPost } from '../redux/actions';
import * as RootNavigation from '../../RootNavigation';


const Footer = (props) => {
    console.log(props.post)
    const dispatch = useDispatch();
    const feedState = useSelector(state => state.feedState);
    const [show, setshow] = useState(props.post?.description?.length > 80 ? true : false)
    const ActiveFeed = useSelector(state => state.feedState.active);

    const RenderFunction = () => {
        switch (ActiveFeed) {
            case 'feed':
                return FeedView;
            case 'profile':
                return otherProfileState;
            case 'View':
                return otherProfileState;
            case 'UserPosts':
                return UserPostView;
            default:
                return null;
        }
    }

    const updateFeedState = () => {
        dispatch(activeFeedState('feed'))
        props?.goBack()
    }

    const deleteAlert = (id) =>
        Alert.alert(
            "Delete Post",
            "Are you sure you want to delete this post ?",
            [
                {
                    text: "Cancel",
                    onPress: () => console.log("Cancel Pressed"),
                    style: "cancel"
                },
                { text: "Confirm", onPress: () => props.deletePost(id) }
            ]
        );

    // Showing This View for Other Profile Posts
    const otherProfileState = (<>
        <View style={{ alignItems: "flex-end", flexDirection: "row", justifyContent: "space-between" }}>
            <View style={{ flexDirection: "row", padding: 15, alignItems: "center", flexWrap: "wrap", zIndex: 0, width: "100%", }}>
                <FontAwesome name='map-marker' size={24} color="red" />
                <Subheading style={{ marginLeft: 15, color: 'white' }}>{props.post?.location}</Subheading>
                <Paragraph style={{ marginTop: 15, paddingTop: 0, color: 'white' }}>
                    {show ? `${props.post?.description.substr(0, 80)}... ` : props.post?.description}</Paragraph>
                <Text
                    onPress={() => setshow(!show)}
                    style={{ display: props?.post?.description?.length > 80 ? 'flex' : 'none', color: "#5bc0de", }}>
                    {show ? 'See full description' : 'Show Less'}
                </Text>
            </View>
        </View>

        <View style={{
            flexDirection: "row", justifyContent: "space-between", alignItems: "center"
        }}>
            <View style={{ flexDirection: "row", paddingHorizontal: 10, alignItems: "center", justifyContent: "space-between", width: "75%" }}>
                <IconButton
                    icon="eye"
                    color="#5bc0de"
                    animated={true}
                    size={34}
                />
                <Text style={{ color: "white" }}>{props?.post?.views}</Text>
                <IconButton
                    icon="comment"
                    animated={true}
                    color="white"
                    size={34}
                    onPress={() => RootNavigation.navigate('comment', { id: props?.post.id })}
                />
                <Text style={{ color: "white" }}>{props?.post?.comments}</Text>
            </View>
            <View style={{ width: "25%", alignItems: "flex-end" }}>
                <IconButton
                    icon="close-circle"
                    animated={true}
                    color="white"
                    size={40}
                    onPress={() => updateFeedState()}
                />
            </View>
        </View>
    </>);

    // Showing This View for UserPostView
    const UserPostView = (<>
        <View style={{ alignItems: "flex-end", flexDirection: "row", justifyContent: "space-between" }}>
            <View style={{ flexDirection: "row", padding: 15, alignItems: "center", flexWrap: "wrap", zIndex: 0, width: "75%", }}>
                <FontAwesome name='map-marker' size={24} color="red" />
                <Subheading style={{ marginLeft: 15, color: 'white' }}>{props?.post?.location}</Subheading>
                <Paragraph style={{ marginTop: 15, paddingTop: 0, color: 'white' }}>
                    {show ? `${props?.post?.description.substr(0, 80)}... ` : props?.post?.description}</Paragraph>
                <Text
                    onPress={() => setshow(!show)}
                    style={{ display: props?.post?.description.length > 80 ? 'flex' : 'none', color: "#5bc0de", }}>
                    {show ? 'See full description' : 'Show Less'}
                </Text>
            </View>
            <View style={{ width: "25%", alignItems: "flex-end" }}>
                <View style={{}}>
                    <IconButton
                        icon="trash-can"
                        animated={true}
                        color="#d9534f"
                        size={40}
                        onPress={() => deleteAlert(props?.post.id)}
                    />
                    <IconButton
                        icon="pencil"
                        color="white"
                        animated={true}
                        size={40}
                        onPress={() => RootNavigation.navigate('editPost',
                        {source:props.post?.photoUrl,desc:props.post?.description,location:props.post?.location,id:props.post?.id})}
                    />
                </View>
            </View>
        </View>

        <View style={{
            flexDirection: "row", justifyContent: "space-between", alignItems: "center"
        }}>
            <View style={{ flexDirection: "row", paddingHorizontal: 10, alignItems: "center", justifyContent: "space-between", width: "75%" }}>
                <IconButton
                    icon="eye"
                    color="#5bc0de"
                    animated={true}
                    size={34}
                />
                <Text style={{ color: "white" }}>{props?.post?.views}</Text>
                <IconButton
                    icon="comment"
                    animated={true}
                    color="white"
                    size={34}
                    onPress={() => RootNavigation.navigate('comment', { id: props?.post.id })}
                />
                <Text style={{ color: "white" }}>{props?.post?.comments}</Text>
            </View>
            <View style={{ width: "25%", alignItems: "flex-end" }}>
                <IconButton
                    icon="close-circle"
                    animated={true}
                    color="white"
                    size={40}
                    onPress={() => updateFeedState()}
                />
            </View>
        </View>
    </>);

    // Showing This View for Feed State
    const FeedView = (<>
        <View style={{ alignItems: "flex-end", flexDirection: "row", justifyContent: "space-between" }}>
            <View style={{ flexDirection: "row", padding: 15, alignItems: "center", flexWrap: "wrap", zIndex: 0, width: "75%", }}>
                <FontAwesome name='map-marker' size={24} color="red" />
                <Subheading style={{ marginLeft: 15, color: 'white' }}>{props?.post?.location}</Subheading>
                <Paragraph style={{ marginTop: 15, paddingTop: 0, color: 'white' }}>
                    {show ? `${props?.post?.description.substr(0, 80)}... ` : props?.post?.description}</Paragraph>
                <Text
                    onPress={() => setshow(!show)}
                    style={{ display: props?.post?.description.length > 80 ? 'flex' : 'none', color: "#5bc0de", }}>
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
                <Text style={{ color: "white" }}>{props?.post?.views}</Text>
                <IconButton
                    icon="comment"
                    animated={true}
                    color="white"
                    size={34}
                    onPress={() => RootNavigation.navigate('comment', { id: props?.post.id })}
                />
                <Text style={{ color: "white" }}>{props?.post?.comments}</Text>
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
    </>);

    return (<View style={{ ...videoStyles.spaceBottom, borderColor: "red", width: "100%", position: "absolute", zIndex: 21 }}>
        {RenderFunction()}
    </View>
    )
}

export default Footer