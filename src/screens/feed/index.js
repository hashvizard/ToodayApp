import React, { useEffect, useState } from 'react'
import NoDataFound from '../../components/FeedLoaders/NoDataFound';
import { useDispatch, useSelector } from 'react-redux';
import { setFeedState, setIntialPost } from '../../redux/actions';
import { getAllPosts, updateViews } from '../../Apis/LaravelApis/postApi';
import GestureRecognizer from 'react-native-swipe-gestures';
import Header from '../../HomeScreen/Header';
import Footer from '../../HomeScreen/Footer';
import VideoPlayer from 'react-native-video-controls';
import { AppState } from 'react-native';
import { useIsFocused } from '@react-navigation/native';
import BlockModal from '../../components/modal/block'
import ReportModal from '../../components/modal/report'
import { useFocusEffect } from '@react-navigation/native';

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

    useFocusEffect(
        React.useCallback(() => {
            if(props.route?.params?.totalComments && posts.length != 0){
            let newData = [...posts];
            newData[index].comments=props.route?.params?.totalComments;
            setPosts(newData);
            }
        }, [props.route?.params?.totalComments])
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
        dispatch(getAllPosts('posts')).then((data) => {
            setPosts(data?.data?.data);
            setcurrentPost(data?.data?.data[index])
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
        if (index < posts.length) {
            setcurrentPost(posts[index + 1])
            setIndex(index + 1);
            dispatch(setIntialPost(index + 1))
        }
        if ((posts.length - 4) == index && nextPage != null) {
            dispatch(getAllPosts(nextPage)).then((data) => {
                let newData = [...posts, ...data?.data?.data];
                setPosts(newData);
                setnextPage(data?.data?.next_page_url)
            }).catch(err => {
                console.log(err.message);
            })
        }
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
        dispatch(updateViews({ post_id: postData.id, user_id: user.id }))
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
            <Header user={currentPost?.user} showBlock={() => setShowblcoked(true)} showReport={() =>setshowReport(true)} />
              {/*  {currentPost ?
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
            <Footer post={currentPost} />
        </GestureRecognizer>
        <BlockModal state={showblcoked} userData={currentPost?.user} hideModalNow={() => setShowblcoked(false)} removeLoadedPost={(id) => removePosts(id)} />
        <ReportModal id={currentPost?.id} showModal={showReport} hideModalNow={() => setshowReport(false)} removeReportedPost={(id) => removeReportedPost(id)} />
    </>)
}
