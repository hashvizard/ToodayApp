import { StyleSheet, Text, View, KeyboardAvoidingView, Keyboard } from 'react-native'
import React, { useState, useMemo, useCallback, useRef, useEffect } from 'react'
import BottomSheet, { BottomSheetTextInput } from '@gorhom/bottom-sheet';
import videoStyles from '../../../styles/VideoStyles';
import { Button } from 'react-native-paper';
import { useDispatch } from 'react-redux';
import { updateCity, updateName } from '../../../redux/actions';
import { IconButton, Colors } from 'react-native-paper';
import CityFinder from '../../../helpers/CityFinder';
const UpdateModal = ({ data, type, changeModal }) => {

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
    dispatch(updateName(name))
      .then(() => {
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
        setSave(false);
        Keyboard.dismiss();
        handleClosePress();
      })
      .catch((err) => { setSave(false); console.log(err) })
  }

  const ChangeName = (<>
    <Text style={{ padding: 10, color: "black", fontWeight: "bold" }}>Enter Your Name</Text>
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
    <View style={{ marginTop: 20, flexDirection: "row", justifyContent: "flex-end" }}>
      <Button
        onPress={() => { Keyboard.dismiss(); handleClosePress() }}
        icon="cancel" style={{ marginRight: 15 }} mode="outlined" >
        Cancel
      </Button>
      <Button style={{ marginRight: 15 }} loading={save} icon="check" mode="outlined"
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
      index={0}
      enablePanDownToClose={true}
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
