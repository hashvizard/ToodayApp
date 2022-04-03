import {  AppState } from 'react-native'
import React, { useState, useEffect, useRef } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { useIsFocused } from '@react-navigation/native';
import VideoPlayer from 'react-native-video-controls';
import { setFeedState } from '../redux/actions';

const Body = ({ currentPost }) => {
  
    const isFocused = useIsFocused();
    const dispatch = useDispatch();
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

 

    return (<>
        {currentPost ?
            <VideoPlayer
                controlAnimationTiming={300}
                showOnStart={false}
                onShowControls={()=>dispatch(setFeedState(null))}
                seekColor={"red"}
                controlTimeout={3000}
                source={{ uri: currentPost?.videoUrl, cache: { size: 50, expiresIn: 3600 } }}
                style={{ height: "100%", width: "100%" }}
                resizeMode='cover'
                paused={appState == 'active' ? (isFocused ? false : true) : true}
                repeat={false}
                tapAnywhereToPause={true}
                onEnd={() => console.log(currentPost)}
            /> : null}
    </>)
}
export default Body
