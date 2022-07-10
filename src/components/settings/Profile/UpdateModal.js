import { StyleSheet, Text, View, KeyboardAvoidingView, Keyboard } from 'react-native'
import React, { useState, useMemo, useCallback, useRef, useEffect } from 'react'
import BottomSheet, { BottomSheetTextInput } from '@gorhom/bottom-sheet';
import videoStyles from '../../../styles/VideoStyles';
import { Button } from 'react-native-paper';
import { useDispatch, useSelector } from 'react-redux';
import { updateCity, updateName } from '../../../redux/actions';
import { IconButton, Colors } from 'react-native-paper';
import CityFinder from '../../../helpers/CityFinder';
import { updateUserBio, updateUserCity, updateUserName, updateUserprofession } from '../../../Apis/LaravelApis';
import { USER_STATE_CHANGE } from '../../../redux/constants';
const UpdateModal = ({ data, type, changeModal }) => {
  console.log(type);
  const user = useSelector(state => state.auth);

  const dispatch = useDispatch()

  const [name, setName] = useState(data);

  const [location, setLocation] = useState(data);

  const [notFound, setnotFound] = useState(false);

  const [save, setSave] = useState(false)
  // ref
  const bottomSheetRef = useRef(null);

  // variables
  const snapPoints = useMemo(() => ['30%'], []);

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


  const updateData = () => {

    switch (type) {
      case 'bio':
        updateBioData();
        break;
      case 'name':
        updateNameData();
        break;
      case 'location':
        updateCityData();
        break;
      case 'profession':
        updateProfessionData()
        break;
      default:
        break;
    }

  }

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

  const updateProfessionData = () => {
    setSave(true);
    dispatch(updateUserprofession({ profession: name }))
      .then(() => {
        let data = user.currentUser;
        data.profession = name;
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


  const updateBioData = () => {
    setSave(true);
    dispatch(updateUserBio({ bio: name }))
      .then(() => {
        let data = user.currentUser;
        data.bio = name;
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



  const ChangeName = (<>
    <Text style={{ padding: 10, color: "black", fontWeight: "bold" }}>Enter your name :</Text>
    <View style={{ flexDirection: "row", alignItems: "center" }}>
      <BottomSheetTextInput
        autoFocus={true}
        multiline
        maxLength={22}
        onChangeText={(text) => setName(text)}
        onSubmitEditing={() => updateData()}
        blurOnSubmit={true}
        style={{
          ...styles.input,
          borderBottomWidth: 2,
          borderColor: "green"
        }} value={name} />
      <Text style={{ paddingHorizontal: 15 }}>{name.length}</Text>
    </View>
  </>);

  const ChangeBio = (<View>
    <Text style={{ padding: 10, color: "black", fontWeight: "bold" }}>Tell us about yourself :</Text>
    <View style={{ flexDirection: "row", alignItems: "center" }}>
      <BottomSheetTextInput
        autoFocus={true}
        maxLength={150}
        onSubmitEditing={() => updateData()}
        blurOnSubmit={true}
        onChangeText={(text) => setName(text)}
        style={{
          ...styles.input,
          borderBottomWidth: 2,
          borderColor: "green"
        }} value={name} />
      <Text style={{ paddingHorizontal: 15 }}>{name?.length}</Text>
    </View>
  </View>);

  const ChangeProfession = (<>
    <Text style={{ padding: 10, color: "black", fontWeight: "bold" }}>Update your Profession:</Text>
    <View style={{ flexDirection: "row", alignItems: "center" }}>
      <BottomSheetTextInput
        autoFocus={true}
        maxLength={22}
        onSubmitEditing={() => updateData()}
        blurOnSubmit={true}
        onChangeText={(text) => setName(text)}
        style={{
          ...styles.input,
          borderBottomWidth: 2,
          borderColor: "green"
        }} value={name} />
      <Text style={{ paddingHorizontal: 15 }}>{name.length}</Text>
    </View>
  </>);

  const ChangeLocation = (<>
    <Text style={{ padding: 10, color: notFound ? "red" : "black", fontWeight: "bold" }}>{notFound ? "We are not available in your city !" : 'Update your current City'}</Text>
    <View style={{ flexDirection: "row", alignItems: "center", marginRight: 15 }}>
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
  </>);
  return (<>
    <BottomSheet
      ref={bottomSheetRef}
      handleStyle={{ backgroundColor: "#f0ad4e" }}
      index={0}
      snapPoints={snapPoints}
      keyboardBehavior="fillParent"
    >
     {/*  <KeyboardAvoidingView
        behavior="padding"
        style={videoStyles.commentcontainer}
      >
      */}
         {type == 'name' ? ChangeName : type == 'bio' ? ChangeBio : type == 'profession' ? ChangeProfession : ChangeLocation}

        <View style={{ padding: 15, width: "100%", flexDirection: "row", justifyContent: "space-between" }}>
          <Button
            color='#d9534f'
            onPress={() => { Keyboard.dismiss(); handleClosePress() }}
            icon="cancel" style={{ marginRight: 15 }} mode="text" >
            Cancel
          </Button>
          <Button style={{ marginRight: 15 }} loading={save} icon="check" mode="text"
            onPress={() => updateData()}>
            Save
          </Button>

        </View>
      {/* </KeyboardAvoidingView> */}
    </BottomSheet>
  </>
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
