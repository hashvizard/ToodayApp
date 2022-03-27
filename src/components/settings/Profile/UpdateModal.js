import { StyleSheet, Text, View, KeyboardAvoidingView, Keyboard } from 'react-native'
import React, { useState, useMemo, useCallback, useRef, useEffect } from 'react'
import BottomSheet, { BottomSheetTextInput } from '@gorhom/bottom-sheet';
import videoStyles from '../../../styles/VideoStyles';
import { Button } from 'react-native-paper';
import { useDispatch, useSelector } from 'react-redux';
import { updateCity, updateName } from '../../../redux/actions';
import { IconButton, Colors } from 'react-native-paper';
import CityFinder from '../../../helpers/CityFinder';
import { updateUserCity, updateUserName } from '../../../Apis/LaravelApis';
import { USER_STATE_CHANGE } from '../../../redux/constants';
const UpdateModal = ({ data, type, changeModal }) => {

  const user = useSelector(state => state.auth);

  const dispatch = useDispatch()

  const [name, setName] = useState(data);

  const [location, setLocation] = useState(data);

  const [notFound, setnotFound] = useState(false);

  const [save, setSave] = useState(false)
  // ref
  const bottomSheetRef = useRef(null);

  // variables
  const snapPoints = useMemo(() => ['40%'], []);

  const adjustSize = () => bottomSheetRef.current.snapToIndex(0);

  const handleClosePress = () => changeModal();



  useEffect(() => {
    const hideSubscription = Keyboard.addListener("keyboardDidHide", () => {
      adjustSize()
    });

    return () => {
      hideSubscription.remove();
    };
  }, []);


  const updateNameData = () => {
    setSave(true);
    dispatch(updateUserName({ name: name }))
      .then(() => {
        let data = user.currentUser;
        data.name = name;
        dispatch({
          type: USER_STATE_CHANGE,
          currentUser: data,
          loaded: true
        })
        setSave(false);
        Keyboard.dismiss();
        handleClosePress();
      })
      .catch((err) => { setSave(false); console.log(err) })
  }

  const updateCityData = () => {
    setSave(true);
    dispatch(updateCity(location))
      .then(() => {
        dispatch(updateUserCity({ city: location })).then((cityData) => {
          let data = user.currentUser;
          data.city_id = cityData.data[0].id;
          data.city = cityData.data[0].city;

          dispatch({ type: USER_STATE_CHANGE, currentUser: data, loaded: true })
          setSave(false);
          Keyboard.dismiss();
          handleClosePress();
        }).catch(err => {
          setSave(false);
          console.log(err)
        })
      })
      .catch((err) => { setSave(false); console.log(err) })
  }

  const ChangeName = (<>
    <Text style={{ padding: 10, color: "black", fontWeight: "bold" }}>Enter your name :</Text>
    <View style={{ flexDirection: "row", alignItems: "center" }}>
      <BottomSheetTextInput
        autoFocus={true}
        maxLength={22}
        onChangeText={(text) => setName(text)}
        style={{
          ...styles.input,
          borderBottomWidth: 2,
          borderColor: "green"
        }} value={name} />
      <Text style={{ paddingHorizontal: 15 }}>{name.length}</Text>
    </View>
    <View style={{ marginTop: 20, marginHorizontal: 15, flexDirection: "row", justifyContent: "space-between" }}>
      <Button
        color='#d9534f'
        onPress={() => { Keyboard.dismiss(); handleClosePress() }}
        icon="cancel" style={{ marginRight: 15 }} mode="text" >
        Cancel
      </Button>
      <Button style={{ marginRight: 15 }} loading={save} icon="check" mode="text"
        onPress={() => updateNameData()}>
        Save
      </Button>
    </View>
  </>);

  const ChangeLocation = (<>
    <Text style={{ padding: 10, color: notFound ? "red" : "black", fontWeight: "bold" }}>{notFound ? "We are not available in your city !" : 'Update your current City'}</Text>
    <View style={{ flexDirection: "row", alignItems: "center" }}>
      <BottomSheetTextInput
        autoFocus={true}
        maxLength={22}
        editable={false}
        style={styles.input} value={location} />
      <CityFinder city={(city) => {
        if (city) {
          setnotFound(false);
          setLocation(city)
        } else {
          setnotFound(true);
        }
      }} />
    </View>
    <View style={{ marginTop: 20, marginHorizontal: 15, flexDirection: "row", justifyContent: "space-between" }}>
      <Button
        color='#d9534f'
        onPress={() => { Keyboard.dismiss(); handleClosePress() }}
        icon="cancel" mode="outlined" >
        Cancel
      </Button>
      <Button loading={save} icon="check" mode="outlined"
        onPress={() => updateCityData()}>
        Save
      </Button>

    </View>
  </>);
  return (
    <BottomSheet
      ref={bottomSheetRef}
      handleStyle={{ backgroundColor: "#f0ad4e" }}
      index={0}
      snapPoints={snapPoints}

      keyboardBehavior="interactive"
    >
      <KeyboardAvoidingView
        behavior="padding"
        style={videoStyles.commentcontainer}
      >
        {type == 'name' ? ChangeName : ChangeLocation}
      </KeyboardAvoidingView>
    </BottomSheet>
  )
}

export default UpdateModal

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    backgroundColor: 'grey',
  },
  contentContainer: {
    flex: 1,
    alignItems: 'center',
  },
  input: {
    marginTop: 10,
    marginBottom: 10,
    flex: 1,
    fontSize: 16,
    lineHeight: 20,
    margin: 8,
    padding: 8,
  },
});
