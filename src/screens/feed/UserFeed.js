import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { activeFeedState, setFeedState, setIntialPost } from '../../redux/actions';
import { getAllPosts, getProfilePosts, getUserPosts, getViewedPosts, removePost, updtaeViews } from '../../Apis/LaravelApis/postApi';
import GestureRecognizer from 'react-native-swipe-gestures';
import Footer from '../../HomeScreen/Footer';
import VideoPlayer from 'react-native-video-controls';
import { ActivityIndicator, AppState, View, Alert } from 'react-native';
import { useIsFocused } from '@react-navigation/native';
import { useFocusEffect } from '@react-navigation/native';
import * as RootNavigation from '../../../RootNavigation'
export default function UserFeed(props) {

    const isFocused = useIsFocused();
    const dispatch = useDispatch();
    const [posts, setPosts] = useState([])
    const [index, setIndex] = useState(0);
    const [nextPage, setnextPage] = useState(null);
    const [currentPost, setcurrentPost] = useState({});
    const [appState, setAppState] = useState(AppState.currentState);
    const user = useSelector(state => state.auth.currentUser);

    useFocusEffect(
        React.useCallback(() => {
            if (props.route?.params?.totalComments && posts.length != 0) {
                let newData = [...posts];
                newData[index].comments = props.route?.params?.totalComments;
                setPosts(newData);
            }
            if (props.route?.params?.videodata) {
                let newData = [...posts];
                newData[index].description = props.route?.params?.videodata?.description;
                newData[index].location = props.route?.params?.videodata?.location;
                setPosts(newData);
            }

        }, [props.route.params])
    );


    useEffect(() => {
        const appStateListener = AppState.addEventListener(
            'change',
            nextAppState => {
                setAppState(nextAppState);
            },
        );
        return () => {
            appStateListener?.remove();
        };
    }, []);

    useEffect(() => {
        dispatch(activeFeedState('UserPosts'))
        setPosts(props.route.params?.videos)
        setnextPage(props.route.params?.nextpage)
        setIndex(props.route.params?.currentIndex)
        setcurrentPost(props.route.params?.videos[props.route.params?.currentIndex])
    }, [])


    const config = {
        velocityThreshold: 0.3,
        directionalOffsetThreshold: 80
    };


    const deleteUp = (data) => {
        if (index <= data.length) {
            if (index > 0) {
                setcurrentPost(data[index - 1])
                setIndex(index - 1)
            } else {
                setcurrentPost(data[index])
            }
            setPosts(data);
        }
        if ((data.length - 4) == index && nextPage != null) {
            DataUpdater()
        }
    }

    const onSwipeUp = () => {
        if (index < posts.length - 1) {
            setcurrentPost(posts[index + 1])
            setIndex(index + 1);
        }
        if ((posts.length - 4) == index && nextPage != null) {
            DataUpdater()
        }
    }

    const DataUpdater = async () => {
        await dispatch(getUserPosts(nextPage))
            .then((data) => {
                let newData = [...posts, ...data?.data?.data];
                setPosts(newData);
                setnextPage(data?.data?.next_page_url)
            }).catch(err => {
                console.log(err.message);
            })
    }

    const onSwipeDown = () => {
        if (index > 0) {
            setcurrentPost(posts[index - 1])
            setIndex(index - 1);
            dispatch(setIntialPost(index - 1))
        }
    }

    if (posts?.length == 0) {
        return (
            <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
                <ActivityIndicator size="small" color={"black"} />
            </View>
        )
    }

    const updateViewsData = (postData) => {
        dispatch(updtaeViews({ post_id: postData.id, user_id: user.id }))
        let allPosts = [...posts];
        const position = allPosts.findIndex(object => {
            return object.id === postData.id;
        });
        allPosts[position].views = allPosts[position].views + 1;
        setPosts(allPosts);
        onSwipeUp();
    }


    const removePosts = (id) => {
        dispatch(removePost(id)).then((data) => {
            if (data?.status) {
                let tempData = [...posts];
                let newData = tempData.filter(function (el) {
                    return el.id != id;
                });

                if ((newData?.length) == 0) {
                    RootNavigation.navigate('profilePosts', {
                        from: "UserPosts",
                        videos: newData,
                        nextpage: nextPage,
                    })
                } else {
                    deleteUp(newData);
                }
            }
        }).catch(err => {
            console.log(err)
        })
    }



    return (<>
        <GestureRecognizer
            onSwipeUp={() => onSwipeUp()}
            onSwipeDown={() => onSwipeDown()}
            config={config}
            style={{ height: "100%", width: "100%", backgroundColor: "black" }}>
            {currentPost ?
                <VideoPlayer
                    controlAnimationTiming={300}
                    showOnStart={false}
                    onShowControls={() => dispatch(setFeedState(null))}
                    seekColor={"red"}
                    controlTimeout={3000}
                    source={{ uri: currentPost?.videoUrl, cache: { size: 50, expiresIn: 3600 } }}
                    style={{ height: "100%", width: "100%" }}
                    resizeMode='cover'
                    paused={appState == 'active' ? (isFocused ? false : true) : true}
                    repeat={false}
                    tapAnywhereToPause={true}
                    onEnd={() => updateViewsData(currentPost)}
                /> : null}
            <Footer post={currentPost}
                goBack={() => {
                    RootNavigation.navigate('profilePosts', {
                        from: "UserPosts",
                        videos: posts,
                        nextpage: nextPage,
                    })
                }}
                deletePost={(id) => removePosts(id)} />
        </GestureRecognizer>
    </>)
}
