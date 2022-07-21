import React, { useEffect, useState, useCallback } from 'react';
import {
  View, Text,
  Image,
  FlatList,
  PermissionsAndroid, TouchableOpacity,
  Platform,
} from 'react-native';
import CameraRoll from '@react-native-community/cameraroll';
import styles from './styles';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
const Gallery = (props) => {

  const [data, setData] = useState([]);

  const [type, setType] = useState('small');

  const [assets, setAssets] = useState([]);
  const [albums, setAlbums] = useState([]);
  const [hasNextPage, setHasNextPage] = useState(true);
  const [endCursor, setEndCursor] = useState();


  const getPhotos = useCallback(
    async (after, oldData) => {
      if (!hasNextPage) {
        return;
      }
      try {
        CameraRoll.getPhotos({
          after,
          first: 20,
          assetType: 'Videos',
          include: ['filename', 'imageSize','fileSize'],
        })
          .then((res) => {
            if (oldData) {
              let datas = [...oldData, ...res.edges];
              setData(datas)
            } else {
              setData(res.edges)
            }
            setHasNextPage(res.page_info.has_next_page);
            setEndCursor(res.page_info.end_cursor);
          })
          .catch((error) => {
            console.log(error);
          });


      } catch (err) {
        console.log(err)
        logError(err);
      }
    },
    []
  );

  const askPermission = async () => {
    if (Platform.OS === 'android') {
      const result = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
        {
          title: 'Permission Explanation',
          message: 'ReactNativeForYou would like to access your photos!',
        },
      );
      if (result !== 'granted') {
        console.log('Access to pictures was denied');
        return;
      } else {
        getPhotos();
      }
    } else {
      getPhotos();
    }
  };


  useEffect(() => {
    askPermission();
    
  }, []);

  const onEndReached = useCallback(() => {
    if (hasNextPage) {
      getPhotos(endCursor, data);
    }
  }, [hasNextPage, endCursor, getPhotos]);

  const Header = (<TouchableOpacity onPress={() => props.navigation.navigate('gallery')} style={{ alignItems: "center", justifyContent: "center", ...styles.galleryVideos, marginLeft: 8 }}>
    <Icon name='plus-circle' color="#f7f7f7" size={50} />
  </TouchableOpacity>)


  return (
    <FlatList
      data={data}
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={{ backgroundColor: "transparent" }}
      horizontal={true}
      ListHeaderComponent={Header}
      renderItem={({ item }) => (
        <TouchableOpacity activeOpacity={0.5} onPress={() => {
            props.navigation.navigate('savePost', { source: item.node.image.uri, size:item.node.image.fileSize})
          }}>
          <Image
            style={styles.galleryVideos}
            source={{ uri: item.node.image.uri }}
          />
        </TouchableOpacity>
      )}
      keyExtractor={(item, index) => index}
      onEndReached={onEndReached}
    />
  );
};

export default Gallery;