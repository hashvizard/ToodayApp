import { StyleSheet, Text, View, KeyboardAvoidingView, Keyboard } from 'react-native'
import React, { useState, useMemo, useCallback, useRef, useEffect } from 'react'
import BottomSheet, { BottomSheetTextInput } from '@gorhom/bottom-sheet';
import videoStyles from '../../../styles/VideoStyles';
import { Button } from 'react-native-paper';

const UpdateModal = ({ data, showModal, changeModal }) => {

  // ref
  const bottomSheetRef = useRef(null);

  // variables
  const snapPoints = useMemo(() => ['40%'], []);

  // callbacks
  const handleSheetChanges = useCallback((index) => {
    console.log('handleSheetChanges', index);
  }, []);

  const adjustSize = () => bottomSheetRef.current.snapToIndex(0);

  const handleClosePress = () => bottomSheetRef.current.close();

  const showModals = () => bottomSheetRef.current.expand()
  useEffect(() => {
    console.log(showModal)
    if (showModal) {
      showModals()
    } else {
      handleClosePress()
    }

    return () => {

    }
  }, [showModal])


  useEffect(() => {
    const hideSubscription = Keyboard.addListener("keyboardDidHide", () => {
      adjustSize()
    });

    return () => {
      hideSubscription.remove();
    };
  }, []);

  return (
    <BottomSheet
      ref={bottomSheetRef}
      index={0}
      enablePanDownToClose={true}
      snapPoints={snapPoints}
      keyboardBehavior="interactive"
      onChange={handleSheetChanges}
    >
      <KeyboardAvoidingView
        behavior="padding"
        style={videoStyles.commentcontainer}
      >
        <Text style={{ padding: 10, color: "black", fontWeight: "bold" }}>Enter Your Name</Text>
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <BottomSheetTextInput
            autoFocus={true}
            style={styles.input} value={data} />
          <Text style={{ paddingHorizontal: 15 }}>22</Text>
        </View>
        <View style={{ marginTop: 20, flexDirection: "row", justifyContent: "flex-end" }}>
          <Button style={{ marginRight: 15 }} icon="check" mode="outlined" onPress={() => console.log('Pressed')}>
            Save
          </Button>
          <Button
            onPress={() => {Keyboard.dismiss();handleClosePress()}}
            icon="cancel" style={{ marginRight: 15 }} mode="outlined" >
            Cancel
          </Button>
        </View>
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
    borderBottomWidth: 2,
    borderColor: "green",
  },
});
