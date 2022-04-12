import React, { useEffect, useState } from 'react'
import NoDataFound from '../../components/FeedLoaders/NoDataFound';
import { useDispatch, useSelector } from 'react-redux';
import { activeFeedState, setFeedState, setIntialPost } from '../../redux/actions';
import { getAllPosts, getProfilePosts, updtaeViews } from '../../Apis/LaravelApis/postApi';
import GestureRecognizer from 'react-native-swipe-gestures';
import Header from '../../HomeScreen/Header';
import Footer from '../../HomeScreen/Footer';
import VideoPlayer from 'react-native-video-controls';
import { AppState } from 'react-native';
import { useIsFocused } from '@react-navigation/native';
import BlockModal from '../../components/modal/block'
import ReportModal from '../../components/modal/report'
import { useFocusEffect } from '@react-navigation/native';
import { ProcessingManager } from 'react-native-video-processing';
import { UploadVideos } from '../../helpers/UploadVideos';


export default function FeedScreen(props) {

    const isFocused = useIsFocused();
    const dispatch = useDispatch();
    const [posts, setPosts] = useState([])
    const [index, setIndex] = useState(0);
    const [loading, setLoading] = useState(true);
    const [nextPage, setnextPage] = useState(null);
    const [currentPost, setcurrentPost] = useState({});
    const [appState, setAppState] = useState(AppState.currentState);
    const user = useSelector(state => state.auth.currentUser);
    const [showblcoked, setShowblcoked] = useState(false);
    const [showReport, setshowReport] = useState(false);

    // Checking Feed State
    const FeedState = useSelector(state => state.feedState.active)

    useFocusEffect(
        React.useCallback(() => {
            // If user navigated from uploading Screen
            if (props.route.params?.data) {
                updateVideo(props.route.params?.data);
            }
            // If user navigated from comment Screen
            if (props.route?.params?.totalComments && posts.length != 0) {
                let newData = [...posts];
                newData[index].comments = props.route?.params?.totalComments;
                setPosts(newData);
            }
        }, [props.route.params])
    );

    const updateVideo = async (datas) => {
        let data = await getData(datas.video)
        let options = {
            taskName: 'Example',
            taskTitle: 'ExampleTask title',
            taskDesc: 'ExampleTask desc',
            user: user,
            postDescription: datas.description,
            path: data.path,
            thumbnail: data.thumbnail,
            location: datas.location,
            taskIcon: {
                name: 'ic_launcher',
                type: 'mipmap',
            },
            color: '#ff00ff',
            linkingURI: 'exampleScheme://chat/jane',
            parameters: {
                delay: 1000,
            },
        };

        /*   try {
              console.log('Trying to start background service');
              await UploadVideos(options);
              console.log('Successful start!');
          } catch (e) {
              console.log('Error', e);
          } */

    }


    const getData = async (path) => {
        const origin = await ProcessingManager.getVideoInfo(path);
        const result = await ProcessingManager.compress(path, {
            width: origin.size && origin.size.width / 3,
            height: origin.size && origin.size.height / 3,
            bitrateMultiplier: 3,
            removeAudio: false,
            minimumBitrate: 300000
        });
        const thumbnail = await ProcessingManager.getPreviewForSecond(result.source);
        return { path: result.source, thumbnail: thumbnail };
    }

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
        dispatch(getAllPosts('posts')).then((data) => {
            setPosts(data?.data?.data);
            setcurrentPost(data?.data?.data[0])
            setIndex(0)
            setnextPage(data?.data?.next_page_url)
            setLoading(false);
        }).catch(err => {
            console.log(err.message);
            setLoading(false);
        })
    }, [])


    const config = {
        velocityThreshold: 0.3,
        directionalOffsetThreshold: 80
    };

    const onSwipeUp = () => {

        if (index < posts.length - 1) {
            console.log(index, posts.length)
            setcurrentPost(posts[index + 1])
            console.log(posts[index + 1])
            setIndex(index + 1);
        }
        if ((posts.length - 4) == index && nextPage != null) {
            DataUpdater()
        }
    }

    const DataUpdater = async () => {
        await dispatch(getAllPosts(nextPage))
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

    if (loading || posts?.length == 0) {
        return (
            <React.Fragment>
                <NoDataFound val={false} />
            </React.Fragment>
        )
    }
    else if (!loading && posts?.length == 0) {
        return (
            <React.Fragment>
                <NoDataFound val={true} />
            </React.Fragment>
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
        let tempData = [...posts];
        let newData = tempData.filter(function (el) {
            return el.user.id != id;
        });
        if ((newData.length - 4) == index && nextPage != null) {
            dispatch(getAllPosts(nextPage)).then((data) => {
                let allData = [...newData, ...data?.data?.data];
                setPosts(allData);
                setnextPage(data?.data?.next_page_url)
                setShowblcoked(false);
                onSwipeUp();
            }).catch(err => {
                console.log(err.message);
            })
        } else {
            setShowblcoked(false);
            setPosts(newData);
            onSwipeUp();
        }
    }

    const removeReportedPost = (id) => {
        let tempData = [...posts];
        let newData = tempData.filter(function (el) {
            return el.id != id;
        });
        if ((newData.length - 4) == index && nextPage != null) {
            dispatch(getAllPosts(nextPage)).then((data) => {
                let allData = [...newData, ...data?.data?.data];
                setPosts(allData);
                setnextPage(data?.data?.next_page_url)
                setshowReport(false);
                onSwipeUp();
            }).catch(err => {
                console.log(err.message);
            })
        } else {
            setPosts(newData);
            onSwipeUp();
            setshowReport(false);
        }
    }

    return (<>
        <GestureRecognizer
            onSwipeUp={() => onSwipeUp()}
            onSwipeDown={() => onSwipeDown()}
            config={config}
            style={{ height: "100%", width: "100%", backgroundColor: "black" }}>
                <Header user={currentPost?.user} showBlock={() => setShowblcoked(true)} showReport={() => setshowReport(true)} />
            {/* {currentPost ?
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
                /> : null} */}
            <Footer post={currentPost} goBack={() => props.navigation.goBack()} />
        </GestureRecognizer>
        <BlockModal state={showblcoked} userData={currentPost?.user} hideModalNow={() => setShowblcoked(false)} removeLoadedPost={(id) => removePosts(id)} />
        <ReportModal id={currentPost?.id} showModal={showReport} hideModalNow={() => setshowReport(false)} removeReportedPost={(id) => removeReportedPost(id)} />
    </>)
}
