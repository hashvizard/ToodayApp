import { StyleSheet, Text, View, FlatList, ActivityIndicator } from 'react-native'
import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { List, Avatar, IconButton } from 'react-native-paper';
import { changeDateForamt } from '../../../helpers';
import { getBlockedUsers, removeBlockedUsers } from '../../../Apis/LaravelApis/userApi';

const Blocked = (props) => {

  const dispatch = useDispatch();
  const [data, setdata] = useState([]);
  const [activity, setactivity] = useState({ id: null, status: false });


  useEffect(() => {

    dispatch(getBlockedUsers()).then(val => {
      if (val.status) setdata(val.data)
    }).catch(err => {
      console.log(err.message)
    })

    return () => {

    }
  }, [])

  const RemoveItem = (id, index) => {
    setactivity({ id: id, status: true });
    dispatch(removeBlockedUsers(id)).then((val) => {
      let dataInstance = [...data];
      dataInstance.splice(index, 1);
      setdata(dataInstance);
      setactivity({ id: null, status: false });
    }).catch((err) => {
      console.log(err.message)
      setactivity({ id: null, status: false });
    })

  }

  const renderItem = ({ item, index }) => {
    return (
      <List.Item
        title={item.users.name}
        description={`User was blocked ${changeDateForamt(new Date(item?.created_at))} ago`}
        left={props => <Avatar.Image size={35} style={{ alignSelf: "center", marginRight: 10 }} source={{ uri: item.users.profile }} />}
        right={props => {
          return (
            <>{
              activity.id == item.id && activity.status ?
                <ActivityIndicator size='small' />
                :
                <IconButton icon="trash-can" color='#d9534f' size={20} onPress={() => RemoveItem(item.id, index)} />
            }</>
          )
        }}
      />
    )
  }
  return (
    <View style={{ flex: 1, backgroundColor: "white", padding: 10 }}>
      <FlatList
        data={data}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
      />
    </View>
  )
}

export default Blocked

const styles = StyleSheet.create({})