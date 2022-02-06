import React, { useState, useEffect, useRef,forwardRef, useImperativeHandle } from 'react'
import { Text, View, TouchableWithoutFeedback, ActivityIndicator, AppState } from 'react-native';
import { Caption } from 'react-native-paper';
import LottieView from 'lottie-react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import videoStyles from '../../../styles/VideoStyles';
import MultiTap from 'react-native-multitap'
import Video from 'react-native-video'
import PostSingleOverlay from './overlay'
import { useUser } from '../../../hooks/useUser'
import { useIsFocused } from '@react-navigation/native';


const PostSingle = forwardRef(({ item }, parentRef) => {
 
    const user = useUser(item.creator).data
    const ref = useRef(null);
    const isFocused = useIsFocused();

    useImperativeHandle(parentRef, () => ({
        play, unload, stop
    }));

    const [appState, setAppState] = useState(AppState.currentState);

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

    const [action, setAction] = useState(null);


    const [video, setVideo] = useState(null);
    const [poster, setPoster] = useState(null);

    useEffect(() => {
        setVideo(item.media[0]);
        setPoster(item.media[1])
        return () => unload()
    }, [])


    const like = require('../../../../Animations/like.json');
    const dislike = require('../../../../Animations/dislike.json');
    const [update, setupdate] = useState(true);
    const [forward, setforward] = useState(10);
    const [activeforwardseek, setactiveforwardseek] = useState(true);
    const [activebackwardseek, setactivebackwardseek] = useState(true);
    const [backword, setbackword] = useState(10);

    useEffect(() => {
        setTimeout(() => {
            setbackword(10);
            setforward(10);
            setactiveforwardseek(true);
            setactivebackwardseek(true)
        }, 500);
    }, [update])



    /****
     * Variable and Function for Video Player Control
     ****/

    const [paused, setpaused] = useState(true);
    const [currentPosition, setcurrentPosition] = useState(0);
    const [duration, setduration] = useState({ minute: 0, second: 0 });
    const [buffering, setbuffering] = useState(null)



    const play = async () => {
        if (ref.current == null) {
            return;
        }
        try {
            setcurrentPosition(0);
            await ref.current.seek(0);
            setpaused(false);
        } catch (e) {
            console.log(e)
        }
    }


    // Seeking Forward
    useEffect(() => {
        const SeekForward = async () => {
            if (forward != 10) {
                await ref.current.seek(Math.abs(currentPosition + forward));
            }
        }
        SeekForward();
    }, [forward])

    // Seeking Backward
    useEffect(() => {
        const SeekBackward = async () => {
            if (backword != 10) {
                await ref.current.seek(Math.abs(currentPosition - backword));
            }
        }
        SeekBackward();
    }, [backword])


    const setDuration = async (position) => {
        setcurrentPosition(Math.floor(position.currentTime));
        let total_duration = Math.floor(position.seekableDuration);
        let current_duration = Math.floor(position.currentTime);
        let remaning_seconds = total_duration - current_duration;
        var minutes = Math.floor(remaning_seconds / 60);
        var seconds = remaning_seconds - minutes * 60;
        setduration({ minute: minutes, second: seconds });
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
        <View style={videoStyles.Video_Details_Container}>
            {/* Animation for LIKE AND DISLIKE */}
            {action ?
                <View style={videoStyles.like_and_dislike}>
                    <LottieView
                        source={action == 'like' || null ? like : dislike}
                        colorFilters={[{
                            keypath: "button",
                            color: "black"
                        }, {
                            keypath: "Sending Loader",
                            color: "#F00000"
                        }]}
                        renderMode='AUTOMATIC'
                        style={{
                            width: 120,
                            height: 120
                        }}
                        autoPlay={true}
                        loop={true}
                        onLayout={() => {
                            setTimeout(() => { setAction(null) }, 2000);
                        }}
                    />
                </View>
                : null
            }
            {/****
             * 
             * Performing Actions on Video Button 
             * Seek Forward - Backward - Play - Pause
             * 
             ****/}

            <View style={{ flexGrow: 1, flex: 1 }}>
                <View style={{ ...videoStyles.containers }}>
                    {/* Backward Button */}
                    <View style={videoStyles.actionsContainer}>
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
                    </View>
                    {/* Pause and Play Button */}
                    <TouchableWithoutFeedback onPress={() => setpaused(!paused)} >
                        <View style={{ ...videoStyles.actionsContainer, ...videoStyles.playPause }}>
                            {paused && !buffering && !action ? <Icon name='pause' size={30} color='rgba(0,0,0,0.5)' /> : null}
                            {buffering && !paused && !action ? <ActivityIndicator size="small" color="white" /> : null}
                        </View>
                    </TouchableWithoutFeedback>

                    {/* Forward Button */}
                    <View style={videoStyles.actionsContainer}>
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
            </View>
            <PostSingleOverlay user={user} post={item} minute={duration.minute} second={duration.second} action={(val) => setAction(val)} />
        </View>

     {/*    <Video
            ref={ref}
            source={{ uri: video, cache: { size: 50, expiresIn: 3600 }}} 
            style={videoStyles.backgroundVideo}
            resizeMode='cover'
            paused={appState == 'active' ? (isFocused ? paused : true) : true}
            repeat={true}
            onProgress={(currentTime) => setDuration(currentTime)}
            onBuffer={(buffer) => setbuffering(buffer.isBuffering)}
            poster={poster}
            posterResizeMode='cover'
        /> */}
    </>
    )
})


export default PostSingle


