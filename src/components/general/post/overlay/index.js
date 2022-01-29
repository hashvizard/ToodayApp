import React, { useEffect, useMemo, useState } from "react";
import { View, Text, Image, TouchableOpacity } from "react-native";
import videoStyles from '../../../../styles/VideoStyles';
import { getLikeById, updateLike } from "../../../../services/posts";
import { useDispatch, useSelector } from "react-redux";
import { throttle } from "throttle-debounce";
import { openReportModal, openBlockModal } from '../../../../redux/actions';
import { useNavigation } from '@react-navigation/core';
import { Avatar, IconButton, Paragraph, Title, Caption, Button } from 'react-native-paper';
import { changeDateForamt } from "../../../../helpers";

/**
 * Function that renders a component meant to be overlapped on
 * top of the post with the post info like user's display name and avatar
 * and the post's description
 *
 * @param {Object} user that created the post
 * @param {Object} post object
 */
export default function PostSingleOverlay({ user, post, minute, second, action }) {

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
    <View style={videoStyles.contianer}>
      <View style={videoStyles.profile_container}>
        <View >
          <TouchableOpacity
            onPress={() => navigation.navigate('feedProfile', { initialUserId: user?.uid })}
          >
            <View
              style={{ flexDirection: "row", alignItems: "center" }}>

              <Avatar.Image size={30} style={videoStyles.imageShadow} source={{ uri: user?.photoURL }} />

              <Caption style={{ ...videoStyles.darkTextShadow, marginLeft: 10 }}>
                {second != 0 ? minute == 0 ? `${second} sec remaining` : `${minute}:${second} min remaining` : null}
              </Caption>
            </View>
          </TouchableOpacity>
          <Title style={{ ...videoStyles.darkTextShadow }}>{user?.displayName}</Title>
          <Caption style={{ ...videoStyles.darkTextShadow }}>Posted {changeDateForamt(new Date(post.creation.seconds * 1000))} ago</Caption>
        </View>
        {/* Adding Video  Button*/}
        <IconButton
          icon="camera"
          color={"#f0ad4e"}
          size={35}
          animated={true}
          onPress={() => {
            navigation.navigate('Add')
          }}
        />
      </View>
      <Text
        onPress={() => setshow(!show)}
        style={{ ...videoStyles.darkTextShadow, alignSelf: "flex-start", color: "#5bc0de", display: post.description.length > 80 ? 'flex' : 'none' }}>
        {show ? 'See full description' : 'Show Less'}
      </Text>
      <Paragraph style={{ ...videoStyles.darkTextShadow }}>
        {post.description.length > 80 ?
          show ? `${post.description.substr(0, 80)}... ` : post.description
          : post.description}
      </Paragraph>
    </View>
    <View style={{ ...videoStyles.profile_container, paddingHorizontal: 7 }}>
      {/* Extra Fetures for Posts */}
      <IconButton
        icon={showReport ? 'close' : "dots-horizontal"}
        color={"lightgrey"}
        size={35}
        animated={true}
        onPress={() => setshowReport(!showReport)}
      />
      <Text style={{ ...videoStyles.darkTextShadow, color: "#f0ad4e" }}>{showReport ? 'Block' : currentLikeState.counter}</Text>
      {/* Total Post Likes  & Report Button */}
      <IconButton
        icon={showReport ? 'cancel' : "thumb-up"}
        color={currentLikeState.state && !showReport ? "#0275d8" : "lightgrey"}
        size={35}
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
      <Text style={{ ...videoStyles.darkTextShadow, color: "#f0ad4e" }}>{showReport ? 'Report' : post.commentsCount}</Text>
      {/* Total Post Comments & Block */}
      <IconButton
        icon={showReport ? "alert-circle-outline" : "comment"}
        color={"lightgrey"}
        size={35}
        animated={true}
        onPress={() => {
          if (showReport) {
            dispatch(openReportModal(true, post.id))
          } else {
            navigation.navigate('comment')
          }
        }}
      />
    </View>
  </>
  );
}
