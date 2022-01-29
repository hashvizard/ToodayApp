import BottomSheet, { BottomSheetFlatList } from '@gorhom/bottom-sheet'
import React, { useEffect, useRef, useCallback, useMemo, useState } from 'react'
import { View, Text } from 'react-native'
import { useDispatch, useSelector } from 'react-redux'
import { clearModal } from '../../../redux/actions/modal';
import { reportAndRemove } from '../../../redux/actions/report';
import { IconButton, Colors, RadioButton, Button } from 'react-native-paper';
import { REPORT } from '../../../constants'
import { reportVideo } from '../../../services/posts'
import styles from './styles'

const ReportModal = () => {
    const modalState = useSelector(state => state.modal);
    const bottomSheetRef = useRef(null)
    const dispatch = useDispatch();
    const currentUser = useSelector(state => state.auth.currentUser)
    const [loading, setloading] = useState(false)
    const [checked, setChecked] = React.useState(null);
    const [id, setid] = useState(null);
    // variables


    useEffect(() => {
        if (modalState.open && bottomSheetRef.current) {
            setid(modalState.data)
            bottomSheetRef.current.expand()
        }
        return () => {
            setChecked(null)
            setloading(false)
            dispatch(clearModal())
        }
    }, [modalState])

    const handleClosePress = useCallback(() => {
        dispatch(clearModal())
        bottomSheetRef.current?.close();
    }, []);

    const handleReport = () => {
        setloading(true)
        reportVideo(id, checked, currentUser.uid, REPORT[checked])
            .then(() => {
                setChecked(null)
                setloading(false)
                handleClosePress()
                dispatch(clearModal())
                dispatch(reportAndRemove(id))
            })
    }


    // render
    const renderSectionHeader = useCallback(
        ({ section }) => (
            <View style={styles.sectionHeaderContainer}>
                <Text>Report this Video</Text>
                <IconButton
                    icon="close"
                    color={Colors.red500}
                    size={20}
                    onPress={() => handleClosePress()}
                />
            </View>
        ),
        []
    );

    const renderSectionFooter = useCallback(
        ({ section }) => (
            <View style={styles.sectionFooterContainer}>
                <Button style={{ width: "100%" }}
                    icon="camera"
                    disabled={checked == null ? true : false}
                    loading={loading}
                    contentStyle={{ justifyContent: loading ? "space-between" : 'center' }}
                    mode="contained" onPress={() => handleReport()}>
                    {loading ? 'Reporting' : 'Report'}
                </Button>
            </View>
        ),
        [checked, loading]
    );

    const renderItem = useCallback(
        ({ item, index }) => (
            <View style={styles.itemContainer}>
                <RadioButton
                    status={checked === index ? 'checked' : 'unchecked'}
                    onPress={() => setChecked(index)}
                />
                <Text>{item}</Text>
            </View>
        ),
        [checked]
    );
    return (
        <BottomSheet
            ref={bottomSheetRef}
            snapPoints={["70%"]}
            index={-1}
            onClose={handleClosePress}
            handleHeight={40}
            enablePanDownToClose>
            <BottomSheetFlatList
                data={REPORT}
                stickyHeaderIndices={[0]}
                ListFooterComponent={renderSectionFooter}
                style={{ marginBottom: 50 }}
                ListHeaderComponent={renderSectionHeader}
                keyExtractor={(i) => i}
                renderItem={renderItem}
            />
        </BottomSheet>

    )
}

export default ReportModal

