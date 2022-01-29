import { View, Text } from 'react-native';
import React, { useEffect, useState } from 'react';
import { Modal, Avatar ,IconButton,Button} from 'react-native-paper';
import blockStyles from './styles';
import { useDispatch,useSelector } from 'react-redux';
import { blockAndRemove, clearBlockModal } from '../../../redux/actions';
import { addUserToBlockList } from '../../../services/user';
import { blockedUserPost } from '../../../redux/reducers/blockUserPost';

const BlockModal = () => {
    const show = useSelector(state => state.block);
    const dispatch = useDispatch();
    const [visible, setVisible] = useState(false);
    const [data,setdata] = useState(null);
    const [loading,setloading] = useState(false);

    useEffect(() => {
        setVisible(show.open)
        setdata(show.data)
        return ()=>{
            setloading(false)
        }
    }, [show.open]);
    
    const hideModal = () => {
        dispatch(clearBlockModal());    
    }

    const blockUser = ()=>{
        setloading(true);
        addUserToBlockList(show.data.uid).then(()=>{
            dispatch(blockAndRemove(show.data.uid));    
        }).then(dispatch(clearBlockModal()))
    }

    return (
          <Modal visible={visible} onDismiss={hideModal} contentContainerStyle={blockStyles.container}>
             <View style={{flexDirection:"row",alignItems:"center",justifyContent:"space-around"}}>
              <Avatar.Image size={35} source={{URL:data?.photoURL}} />
            <Text>{data?.displayName}</Text>
            <IconButton
                icon="close"
                size={20}
                onPress={() => hideModal()}
            />
            </View>
            
            <Text style={{textAlign:"center",marginVertical:20}}>Are you sure you want to block this user ?</Text>
            <Button icon="camera" loading={loading} contentStyle={{justifyContent:loading?"space-around":"center"}} mode="outlined" onPress={() => blockUser()}  style={{marginTop:15}}>
                {loading?'Blocking User':'Block'}
            </Button>
          </Modal>
    );
  };

export default BlockModal;
