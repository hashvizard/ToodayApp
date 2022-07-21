import React, { useEffect, useState } from 'react'
import NoDataFound from '../../components/FeedLoaders/NoDataFound';
import { useDispatch, useSelector } from 'react-redux';
import { activeFeedState, clearUploadedData, setFeedState, setIntialPost } from '../../redux/actions';
import { addPost, getAllPosts, getProfilePosts, updtaeViews } from '../../Apis/LaravelApis/postApi';
import GestureRecognizer from 'react-native-swipe-gestures';
import Header from '../../HomeScreen/Header';
import Footer from '../../HomeScreen/Footer';
import VideoPlayer from 'react-native-video-controls';
import { AppState, StatusBar, View } from 'react-native';
import { useIsFocused } from '@react-navigation/native';
import BlockModal from '../../components/modal/block'
import ReportModal from '../../components/modal/report'
import { useFocusEffect } from '@react-navigation/native';
import { ProcessingManager } from 'react-native-video-processing';
import { UploadVideos } from '../../helpers/UploadVideos';
import RNFetchBlob from 'react-native-fetch-blob'
import AsyncStorage from '@react-native-async-storage/async-storage';
import BackgroundService from 'react-native-background-actions';
import BackgroundJob from 'react-native-background-actions';

import Loader from '../../components/loader/Loader';
import * as RootNavigation from '../../../RootNavigation';
import { RNS3 } from 'react-native-aws3';
/** api url */
const ENV = require('../../../credentials');
const BASE_URL = ENV.BACKEND_URL;

//    let progress = '0%';
const veryIntensiveTask = async (taskDataArguments) => {
    console.log(taskDataArguments);

    const { data,user,token } = taskDataArguments;


    // Uploading video to s3 Bucket     
    const fileEXT = data.video.slice((data.video.lastIndexOf('.')) + 1);
    await RNS3.put(
        {
            uri: data.video,
            name: `${new Date().valueOf()}.${fileEXT}`,
            type: 'video/mp4'
        },
        {
            keyPrefix: `${ENV.KEY_PREFIX}/${user.city_id}/${user.id}/`,
            bucket: ENV.BUCKET,
            region: ENV.REGION,
            accessKey: ENV.ACCESS_KEY,
            secretKey: ENV.SECRET_KEY,
            successActionStatus: 201,
        },
    )
        .progress(async (progress) => {
            await BackgroundJob.updateNotification({ taskDesc: `Uploading : ${((progress.loaded / progress.total) * 100).toFixed(0)}%` });
            console.log(`${((progress.loaded / progress.total) * 100).toFixed(0)}%`);
        })
        .then((response) => {
            if (response.status !== 201) {
                console.log('Failed to upload image to S3');
            } else {
                let videoourl = response?.body?.postResponse?.location;
                console.log(response.body, "sdfg");
                uploadingData(videoourl, data, token)
            }
        }).catch(err => {
            console.log(err);
        })
};


const uploadingData = async (videourl, postdata, token) => {
    console.log(videourl);
    // Uploading data in database with thumbnail                
    await RNFetchBlob.fetch('POST', `${BASE_URL}posts`, {
        Authorization: 'Bearer ' + token,
        'Content-Type': "multipart/form-data",
    },
        [
            { name: 'photoUrl', filename: 'tooday.png', data: postdata.thumbnail },
            { name: 'location', data: postdata.location },
            { name: 'videoUrl', data: videourl },
            { name: 'description', data: postdata.description },
        ]).uploadProgress({ interval: 1000 }, (written, total) => {
            let aprogress = `${((written / total) * 100).toFixed(0)}%`;
            console.log(aprogress)
        })
        .then((response) => response.json())
        .then((RetrivedData) => {
            console.log("finally", RetrivedData);
            // iOS will also run everything here in the background until .stop() is called
            BackgroundService.stop();
        })
        .catch((err) => {
            console, log(err);
            BackgroundService.stop();

        })

};

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
    const [uploading, setuploading] = useState(false);
    // const [progress, setprogress] = useState('0%');
    const [newPostLoader, setnewPostLoader] = useState(false);
    // Checking Feed State
    const FeedState = useSelector(state => state.feedState.active)
    const upload = useSelector(state => state.upload)

    useFocusEffect(
        React.useCallback(() => {
            // If user navigated from uploading Screen
            if (upload.description && upload.location && upload.video && upload.thumbnail) {
                console.log("I am in")
                let data = upload;
                dispatch(clearUploadedData())
                updateVideo(data);
            }
            // If user navigated from comment Screen
            if (props.route?.params?.totalComments && posts.length != 0) {
                let newData = [...posts];
                newData[index].comments = props.route?.params?.totalComments;
                setPosts(newData);
            }
        }, [upload, props.route?.params?.totalComments])
    );

    const updateVideo = async (data) => {
        let token = await AsyncStorage.getItem('tooday_user_token');
        const options = {
            taskName: 'uploadingVideo',
            taskTitle: data.location,
            taskDesc: data.description,
            taskIcon: {
                name: 'ic_notification',
                type: 'mipmap',
            },
            color: '#ff00ff',
            progressBar: {
                max: 0,
                value: 0,
                indeterminate: true
            },
            // linkingURI: 'yourSchemeHere://chat/jane', // See Deep Linking for more info
            parameters: {
                data: data,
                user:user,
                token: token
            },
        };

        await BackgroundService.start(veryIntensiveTask, options);

        await BackgroundService.updateNotification({ taskDesc: data.description }); // Only Android, iOS will ignore this call

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
            setcurrentPost(posts[index + 1])
            setIndex(index + 1);
        }
        if ((posts.length - 4) == index && nextPage != null) {
            DataUpdater()
        }
    }

    const DataUpdater = async () => {
        setnewPostLoader(true);
        await dispatch(getAllPosts(nextPage))
            .then((data) => {
                let newData = [...posts, ...data?.data?.data];
                setPosts(newData);
                setnextPage(data?.data?.next_page_url)
                setnewPostLoader(false);
            }).catch(err => {
                console.log(err.message);
                setnewPostLoader(false);
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
        <StatusBar barStyle='light-content' translucent={true} />
        <GestureRecognizer
            onSwipeUp={() => onSwipeUp()}
            onSwipeDown={() => onSwipeDown()}
            config={config}
            style={{ height: "100%", width: "100%", backgroundColor: "black" }}>
            <Header user={currentPost?.user} post={currentPost} showBlock={() => setShowblcoked(true)} showReport={() => setshowReport(true)} />
            {currentPost ?
                <VideoPlayer
                    controlAnimationTiming={300}
                    showOnStart={false}
                    onShowControls={() => dispatch(setFeedState(null))}
                    seekColor={"red"}
                    controlTimeout={2000}
                    source={{ uri: currentPost?.videoUrl, cache: { size: 50, expiresIn: 3600 } }}
                    style={{ height: "100%", width: "100%" }}
                    resizeMode='cover'
                    paused={appState == 'active' ? (isFocused ? false : true) : true}
                    repeat={false}
                    tapAnywhereToPause={true}
                    onEnd={() => updateViewsData(currentPost)}
                /> : null}
            <Footer user={currentPost?.user} progress={0} uploading={uploading} post={currentPost} goBack={() => props.navigation.goBack()} />
        </GestureRecognizer>
        <Loader loader={newPostLoader} />
        <BlockModal state={showblcoked} userData={currentPost?.user} hideModalNow={() => setShowblcoked(false)} removeLoadedPost={(id) => removePosts(id)} />
        <ReportModal id={currentPost?.id} showModal={showReport} hideModalNow={() => setshowReport(false)} removeReportedPost={(id) => removeReportedPost(id)} />
    </>)
}
