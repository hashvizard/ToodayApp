import React, { useEffect, useMemo, useState } from "react";
import { View, Text, Image, TouchableOpacity } from "react-native";
import videoStyles from '../../../../styles/VideoStyles';
import { getLikeById, updateLike } from "../../../../services/posts";
import { useDispatch, useSelector } from "react-redux";
import { throttle } from "throttle-debounce";
import { openReportModal, openBlockModal } from '../../../../redux/actions';
import { useNavigation } from '@react-navigation/core';
import { Avatar, IconButton, Paragraph, Title, Caption, Button, Subheading, Headline } from 'react-native-paper';
import { changeDateForamt } from "../../../../helpers";
import * as RootNavigation from '../../../../../RootNavigation';
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
/**
 * Function that renders a component meant to be overlapped on
 * top of the post with the post info like user's display name and avatar
 * and the post's description
 *
 * @param {Object} user that created the post
 * @param {Object} post object
 */
export default function PostSingleOverlay({ user, post, minute, second, action, profile }) {

  const dispatch = useDispatch()
  const currentUser = useSelector((state) => state.auth.currentUser);
  const [show, setshow] = useState(post.description.length > 80 ? true : false)
  const [showReport, setshowReport] = useState(false); //to change value of 3-dots


  const navigation = useNavigation()
  const [currentLikeState, setCurrentLikeState] = useState({
    state: false,
    counter: post.likesCount,
  });

  useEffect(() => {
    getLikeById(post.id, currentUser.uid).then((res) => {
      setCurrentLikeState({
        ...currentLikeState,
        state: res,
      });
    });
  }, []);

  /**
   * Handles the like button action.
   *
   * In order to make the action more snappy the like action
   * is optimistic, meaning we don't wait for a response from the
   * server and always assume the write/delete action is successful
   */
  const handleUpdateLike = useMemo(
    () =>
      throttle(500, true, (currentLikeStateInst) => {
        setCurrentLikeState({
          state: !currentLikeStateInst.state,
          counter:
            currentLikeStateInst.counter +
            (currentLikeStateInst.state ? -1 : 1),
        });
        updateLike(post.id, currentUser.uid, currentLikeStateInst.state);
        action(currentLikeStateInst.state ? 'dislike' : 'like')
      }),
    []
  );

  return (<>
    <View style={{ alignSelf: "flex-end" }}>
      <View style={{ ...videoStyles.profile_container, }}>
        {/* Extra Fetures for Posts */}
        <IconButton
          icon={showReport ? 'close' : "dots-horizontal"}
          color={"white"}
          size={30}
          animated={true}
          onPress={() => setshowReport(!showReport)}
        />

        {/* Total Post Likes  & Report Button */}
        <IconButton
          icon={showReport ? 'cancel' : "thumb-up"}
          color={currentLikeState.state && !showReport ? "#0275d8" : "white"}
          size={30}
          animated={true}
          onPress={() => {
            if (showReport) {
              dispatch(openBlockModal(true, user))
            }
            else {
              handleUpdateLike(currentLikeState)
            }
          }}
        />
        <Text style={{ ...videoStyles.darkTextShadow, color: "white" }}>{showReport ? 'Block' : currentLikeState.counter}</Text>

        {/* Total Post Comments & Block */}
        <IconButton
          icon={showReport ? "alert-circle-outline" : "comment"}
          color={"white"}
          size={30}
          animated={true}
          onPress={() => {
            if (showReport) {
              dispatch(openReportModal(true, post.id))
            } else {
              navigation.navigate('comment')
            }
          }}
        />
        <Text style={{ ...videoStyles.darkTextShadow, color: "white" }}>{showReport ? 'Report' : post.commentsCount}</Text>
      </View>
    </View>
    <View style={videoStyles.contianer}>
      <Caption style={{ ...videoStyles.darkTextShadow, }}>
        {second != 0 ? minute == 0 ? `${second} sec remaining` : `${minute}:${second} min remaining` : null}
      </Caption>
      <View style={videoStyles.profile_container}>
        {/* Adding Video  Button*/}

        <View style={{ width: "100%" }}>
          <TouchableOpacity
            style={{ display: profile ? 'none' : "flex", flexGrow: 1, marginBottom: 15, justifyContent: "space-between" }}
            onPress={() => navigation.navigate('feedProfile', { initialUserId: user?.uid })}
          >
            <View
              style={{ flexDirection: "row", alignItems: "center", alignItems: "center", justifyContent: "space-between" }}>



              <Title style={{ color: "white", marginLeft: 10 }}>{user?.displayName}</Title>
              <Avatar.Image size={30} style={{}} source={{ uri: currentUser.photoURL  /*user?.photoURL*/ }} />

            </View>

          </TouchableOpacity>
          <View style={{ flexDirection: "row", width: "100%", justifyContent: "space-between", width: "100%" }}>
            <TouchableOpacity
              style={{ display: profile ? 'none' : "flex", ...videoStyles.containerContent, backgroundColor: 'rgba(255,255,255,0.025)', }}
              onPress={() => navigation.navigate('feedProfile', { initialUserId: user?.uid })}
            >
              <View
                style={{ flexDirection: "row", alignItems: "center" }}>
                <Icon name="map-marker" color={"lightgrey"} size={21} />


                <Subheading style={{ color: "white", paddingHorizontal: 10 }}>{post.location ? post.location : currentUser.City}</Subheading>
              </View>

            </TouchableOpacity>
          </View>
          <View style={{ flexDirection: "row", width: "100%", justifyContent: "space-between", width: "100%" }}>
            <TouchableOpacity
              style={{ display: profile ? 'none' : "flex", ...videoStyles.containerContent, backgroundColor: 'rgba(255,255,255,0.05)' }}
              onPress={() => navigation.navigate('feedProfile', { initialUserId: user?.uid })}
            >
              <View
                style={{ flexDirection: "row", alignItems: "center" }}>
                <Icon name="calendar" color={"lightgrey"} size={21} />
                {/* <Avatar.Image size={30} style={{ ...videoStyles.imageShadow, marginRight: 10 }} source={{ uri: currentUser.photoURL  /*user?.photoURL}} /> */}

                <Paragraph style={{ color: "white", paddingHorizontal: 15 }}>{changeDateForamt(new Date(post.creation.seconds * 1000))} ago</Paragraph>

              </View>
            </TouchableOpacity>
          </View>
        </View>

      </View>

      <Text
        onPress={() => setshow(!show)}
        style={{ ...videoStyles.darkTextShadow, alignSelf: "flex-start", color: "#5bc0de", display: post.description.length > 80 ? 'flex' : 'none' }}>
        {show ? 'See full description' : 'Show Less'}
      </Text>

      <TouchableOpacity
        style={{ display: profile ? 'none' : "flex", ...videoStyles.containerContent, backgroundColor: 'rgba(255,255,255,0.1)' }}
        onPress={() => navigation.navigate('feedProfile', { initialUserId: user?.uid })}
      >
        <View
          style={{ flexDirection: "row", alignItems: "center" }}>
          <Icon name="pencil" color={"lightgrey"} size={21} />
          {/* <Avatar.Image size={30} style={{ ...videoStyles.imageShadow, marginRight: 10 }} source={{ uri: currentUser.photoURL  /*user?.photoURL}} /> */}

          <Caption style={{ color: "white", paddingHorizontal: 15 }}>
            {post.description.length > 80 ?
              show ? `${post.description.substr(0, 80)}... ` : post.description
              : post.description}
          </Caption>

        </View>
      </TouchableOpacity>

    </View>

  </>
  );
}
