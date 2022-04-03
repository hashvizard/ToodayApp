import React, { useState, useEffect, useRef, forwardRef, useImperativeHandle } from 'react'
import { Text, View, TouchableWithoutFeedback, ActivityIndicator, AppState, Image } from 'react-native';
import { Caption } from 'react-native-paper';
import LottieView from 'lottie-react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import videoStyles from '../../../styles/VideoStyles';
import MultiTap from 'react-native-multitap'
import Video from 'react-native-video'
import PostSingleOverlay from './overlay'
import { useUser } from '../../../hooks/useUser'
import { useIsFocused } from '@react-navigation/native';

import VideoPlayer from 'react-native-video-controls';
const PostSingle = forwardRef(({ item, profile }, parentRef) => {

    const [appState, setAppState] = useState(AppState.currentState);
    /* const user = useUser(item.creator).data */
    const ref = useRef(null);
    const isFocused = useIsFocused();

    useImperativeHandle(parentRef, () => ({
        play, unload, stop
    }));

  

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

    /****
     * Variable and Function for Action Control
     ****/

  

    const [video, setVideo] = useState(null);
    const [poster, setPoster] = useState(null);

    useEffect(() => {
        setVideo(item.media[0]);
        setPoster(item.media[1])
        return () => unload()
    }, [])


    // const like = require('../../../../Animations/like.json');
    // const dislike = require('../../../../Animations/dislike.json');
    // const [update, setupdate] = useState(true);
    // const [forward, setforward] = useState(10);
    // const [backword, setbackword] = useState(10);

    // useEffect(() => {
    //     setTimeout(() => {/* 
    //         setbackword(10);
    //         setforward(10); *//* 
    //         setactiveforwardseek(true);
    //         setactivebackwardseek(true) */
    //     }, 500);
    // }, [update])



    /****
     * Variable and Function for Video Player Control
     ****/

    const [paused, setpaused] = useState(false);



    const play = async () => {
        if (ref.current == null) {
            return;
        }
        try {
            setpaused(false);
        } catch (e) {
            console.log(e)
        }
    }





    const stop = async () => {
        if (ref.current == null)
            return;
        try {
            setpaused(true)
        } catch (e) {
            console.log(e)
        }
    }


    const unload = async () => {
        try {
            setVideo(null);
            setPoster(null)
        } catch (e) {
            console.log(e)
        }
    }

    /**** Seek Ends Here ****/

    return (<>

        {/* Animation for LIKE AND DISLIKE */}

        {/****
             * 
             * Performing Actions on Video Button 
             * Seek Forward - Backward - Play - Pause
             * 
             ****/}

        {/*     <View style={{ }}>
                <View style={{ ...videoStyles.containers }}> */}
        {/* Backward Button */}
        {/*     <View style={videoStyles.actionsContainer}>
                        <MultiTap
                            onSingleTap={() => setpaused(!paused)}
                            onDoubleTap={() => {
                                if (activebackwardseek) {
                                    setactivebackwardseek(false)
                                    setbackword(forward * 1)
                                    setupdate(!update)
                                }
                            }}
                            onTripleTap={() => {
                                if (activebackwardseek) {
                                    setactivebackwardseek(false)
                                    setbackword(forward * 2)
                                    setupdate(!update)
                                }
                            }}
                            onNTaps={(n) => {
                                if (activebackwardseek) {
                                    setactivebackwardseek(false)
                                    setbackword(forward * n)
                                    setupdate(!update)
                                }
                            }}
                            delay={1000}>
                            <View style={{
                                ...videoStyles.seek_buttons_container,
                                borderBottomRightRadius: 150,
                                borderTopRightRadius: 150,
                                backgroundColor: backword != 10 ? "rgba(255, 255, 255, 0.3)" : null
                            }}>
                                <View style={{ ...videoStyles.seek_button, display: backword == 10 ? 'none' : "flex" }}>
                                    <Icon name="chevron-double-left" size={21} />
                                    <Caption>{backword} S</Caption>
                                </View>
                            </View>
                        </MultiTap>
                    </View> */}
        {/* Pause and Play Button */}
        {/*   <TouchableWithoutFeedback onPress={() => setpaused(!paused)} >
                        <View style={{ ...videoStyles.actionsContainer, ...videoStyles.playPause }}>
                            {paused && !buffering && !action ? <Icon name='pause' size={30} color='white' style={{zIndex:15,position:"absolute"}} /> : null}
                            {buffering && !paused && !action ? <ActivityIndicator size="small" color="white" /> : null}
                        </View>
                    </TouchableWithoutFeedback> */}

        {/* Forward Button */}
        {/*    <View style={videoStyles.actionsContainer}>
                        <MultiTap
                            onSingleTap={() => setpaused(!paused)}
                            onDoubleTap={() => {
                                if (activeforwardseek) {
                                    setactiveforwardseek(false)
                                    setforward(forward * 1)
                                    setupdate(!update)
                                }
                            }}
                            onTripleTap={() => {
                                if (activeforwardseek) {
                                    setactiveforwardseek(false)
                                    setforward(forward * 2)
                                    setupdate(!update)
                                }
                            }}
                            onNTaps={(n) => {
                                if (activeforwardseek) {
                                    setactiveforwardseek(false)
                                    setforward(forward * n)
                                    setupdate(!update)
                                }
                            }}
                            delay={1000}>
                            <View
                                style={{
                                    ...videoStyles.seek_buttons_container,
                                    borderBottomLeftRadius: 150,
                                    borderTopLeftRadius: 150,
                                    backgroundColor: forward != 10 ? "rgba(255, 255, 255, 0.3)" : null
                                }}>
                                <View style={{ ...videoStyles.seek_button, display: forward == 10 ? 'none' : "flex" }}>
                                    <Icon name="chevron-double-right" size={21} />
                                    <Caption>{forward} S</Caption>
                                </View>
                            </View>
                        </MultiTap>
                    </View>
                </View>
            </View> */}
        {/* <PostSingleOverlay user={user} profile={profile} post={item} minute={duration.minute} second={duration.second} action={(val) => setAction(val)} /> */}

        {/*     <Image
        source={{uri:poster}} 
        style={{...videoStyles.backgroundVideo,borderWidth:2}}
        /> */}
z
        {/*  <Video
            ref={ref}
            source={{ uri: video }}
            // source={{ uri: video, cache: { size: 50, expiresIn: 3600 }}} 
            style={videoStyles.backgroundVideo}
            resizeMode='cover'
            paused={appState == 'active' ? (isFocused ? paused : true) : true}
            repeat={false}
            onProgress={(currentTime) => setDuration(currentTime)}
            onBuffer={(buffer) => setbuffering(buffer.isBuffering)}
            poster={poster}
            posterResizeMode='cover'
        /> */}


        <VideoPlayer
            ref={ref}
            source={{ uri: video, cache: { size: 50, expiresIn: 3600 }}} 
            controlTimeout={3000}
            repeat={true}
            paused={appState == 'active' ? (isFocused ? paused : true) : true}
            resizeMode='cover'
           /*  onShowControls={() => dispatch(setFeedState(null))} */
            seekColor="red"
            toggleResizeModeOnFullscreen={false}
            controlAnimationTiming={500}
            videoStyle={{ height: "100%", width: "100%" }}
            showOnStart={false}
            tapAnywhereToPause={true}
            style={{ ...videoStyles.screenHeight, width:"100%"}}
        />

    </>
    )
})


export default PostSingle


