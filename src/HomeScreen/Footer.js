import { View, Text, Alert, ActivityIndicator, TouchableOpacity, } from 'react-native'
import React, { useState, useMemo, useEffect } from 'react'
import videoStyles from '../styles/VideoStyles'
import { Avatar, Caption, IconButton, Paragraph, Subheading, Title } from 'react-native-paper'
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { useDispatch, useSelector } from 'react-redux';
import { activeFeedState, setFeedState, setIntialPost } from '../redux/actions';
import * as RootNavigation from '../../RootNavigation';
import Feather from 'react-native-vector-icons/Feather';

const Footer = (props) => {
    console.log(props.post)
    const dispatch = useDispatch();
    const feedState = useSelector(state => state.feedState);
    const [show, setshow] = useState(props.post?.description?.length > 80 ? true : false)
    const ActiveFeed = useSelector(state => state.feedState.active);
    const currentuser = useSelector(state => state.auth.currentUser);

    const RenderFunction = () => {
        switch (ActiveFeed) {
            case 'feed':
                return FeedView;
            case 'profile':
                return otherProfileState;
            case 'View':
                return viewedPosts;
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

    // Showing This View for Viewed Posts
    const viewedPosts = (<>
        <View style={{ alignItems: "flex-end", flexDirection: "row", justifyContent: "space-between" }}>
            <View style={{ flexDirection: "row", padding: 15, alignItems: "center", flexWrap: "wrap", zIndex: 0, width: "100%", }}>
                {/* <Feather name='hash' size={21} color="red" /> */}
                {/* <FontAwesome name='map-marker' size={24} color="red" /> */}
                {/* <Caption style={{ marginLeft: 5, color: 'white' }}>{props.post?.location}</Caption> */}

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

      // Showing This View for Other Profile Posts
      const otherProfileState = (<>
        <View style={{ alignItems: "flex-end", flexDirection: "row", justifyContent: "space-between" }}>
            <View style={{ flexDirection: "row", padding: 15, alignItems: "center", flexWrap: "wrap", zIndex: 0, width: "100%", }}>
                <Feather name='hash' size={21} color="red" />
                {/* <FontAwesome name='map-marker' size={24} color="red" /> */}
                <Caption style={{ marginLeft: 5, color: 'white' }}>{props.post?.location}</Caption>

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
            <View style={{ flexDirection: "row", padding: 15, alignItems: "center", flexWrap: "wrap", zIndex: 0, width: "100%", }}>

                {/* <FontAwesome name='map-marker' size={24} color="red" /> */}
                <View style={{ width: "100%", alignItems: "center", flexDirection: "row", justifyContent: "space-between" }}>
                    <View style={{ flexDirection: "row", alignItems: "center" }}>
                        <Feather name='hash' size={21} color="red" />
                        <Caption style={{ marginLeft: 5, color: 'white' }}>{props?.post?.location}</Caption>
                    </View>
                    <View style={{ flexDirection: "row", alignItems: "center" }}>
                        <IconButton
                            icon="trash-can"
                            animated={true}
                            color="#d9534f"
                            size={25}
                            onPress={() => deleteAlert(props?.post.id)}
                        />
                        <IconButton
                            icon="pencil"
                            color="white"
                            animated={true}
                            size={25}
                            onPress={() => RootNavigation.navigate('editPost',
                                { source: props.post?.photoUrl, desc: props.post?.description, location: props.post?.location, id: props.post?.id })}
                        />
                    </View>

                </View>

                <Paragraph style={{ marginTop: 15, paddingTop: 0, color: 'white' }}>
                    {show ? `${props?.post?.description.substr(0, 80)}... ` : props?.post?.description}</Paragraph>
                <Text
                    onPress={() => setshow(!show)}
                    style={{ display: props?.post?.description.length > 80 ? 'flex' : 'none', color: "#5bc0de", }}>
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

    // Showing This View for Feed State
    const FeedView = (<>
        <View style={{ alignItems: "flex-end", flexDirection: "row", justifyContent: "space-between" }}>
            <View style={{ flexDirection: "column", padding: 20, alignItems: "flex-start", flexWrap: "wrap", zIndex: 0, width: "85%", }}>
                <View style={{ flexDirection: "row", display: props.uploading ? "flex" : "none", alignItems: "center", alignSelf: "flex-start", elevation: 10, padding: 10, marginLeft: -7, marginBottom: 15, borderRadius: 10, backgroundColor: "rgba(0,0,0,0.5)" }}>
                    <ActivityIndicator size="small" color='white' />
                    <Text style={{ color: "reds", marginLeft: 10 }}>Uploading {props.progress}</Text>
                </View>

                <Paragraph style={{ marginTop: 15, paddingTop: 0, color: 'white' }}>
                    {show ? `${props?.post?.description.substr(0, 80)}... ` : props?.post?.description}</Paragraph>
                <Text
                    onPress={() => setshow(!show)}
                    style={{ display: props?.post?.description.length > 80 ? 'flex' : 'none', color: "#5bc0de", }}>
                    {show ? 'See full description' : 'Show Less'}
                </Text>
                <View>
                    <TouchableOpacity onPress={() => {
                        currentuser.id == props.user?.id ? RootNavigation.navigate('settings', { myParam: undefined }) : RootNavigation.navigate('profileOther', { user: props.user });
                    }} style={{ flexDirection: "row", alignItems: "center", marginTop: 20 }}>
                        <Avatar.Image size={25} source={{ uri: props.user?.profile }} />
                        <Paragraph style={{ marginLeft: 15, flexWrap: "wrap", color: "white" }}>{props.user?.name}</Paragraph>
                    </TouchableOpacity>
                </View>
            </View>

            <View style={{ width: "15%", alignItems: "flex-end" }}>

                <IconButton
                    icon="plus-circle"
                    animated={true}
                    color="white"
                    size={40}
                    onPress={() => RootNavigation.navigate('add')}
                />
                <IconButton
                    style={{ display: feedState.open != "BOTTOM" ? "flex" : "none" }}
                    icon="chevron-up"
                    color="white"
                    animated={true}
                    size={40}
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
                    icon="chevron-down"
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