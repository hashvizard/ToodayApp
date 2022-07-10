import BottomSheet, { BottomSheetFlatList } from '@gorhom/bottom-sheet'
import React, { useEffect, useRef, useCallback, useMemo, useState } from 'react'
import { View, Text } from 'react-native'
import { useDispatch, useSelector } from 'react-redux'
import { clearModal } from '../../../redux/actions/modal';
import { reportAndRemove } from '../../../redux/actions/report';
import { IconButton, Colors, RadioButton, Button, Divider } from 'react-native-paper';
import { REPORT } from '../../../constants'
import styles from './styles'
import { reportVideo } from '../../../Apis/LaravelApis/postApi';

const ReportModal = ({showModal,hideModalNow,id,removeReportedPost}) => {
  
    const bottomSheetRef = useRef(null)
    const dispatch = useDispatch();
    const currentUser = useSelector(state => state.auth.currentUser)
    const [loading, setloading] = useState(false)
    const [checked, setChecked] = React.useState(null);
    // variables

    const handleClosePress = useCallback(() => {
        bottomSheetRef.current?.close();
        hideModalNow()
    }, []);

    useEffect(() => {
        if (showModal && bottomSheetRef.current) {
            bottomSheetRef.current.expand()
        }else{
            handleClosePress();
        }
        return () => {
            setChecked(null)
            setloading(false)
        }
    }, [showModal])

  

    const handleReport = () => {
        setloading(true)
        let data = {reason:REPORT[checked],post_id:id,user_id:currentUser.id}
        dispatch(reportVideo(data)).then((data)=>{
            if(data.status){
                removeReportedPost(id);
            }else{
                handleClosePress();
            }
        }).catch((err)=>{
            handleClosePress();
            console.log(err);
        })
    }


    // render
    const renderSectionHeader = useCallback(
        ({ section }) => (
           <>
           <View style={styles.sectionHeaderContainer}>
                <Text style={{fontSize:18,fontWeight:"bold"}}>Report this Video</Text>
                <IconButton
                    icon="close"
                    color={Colors.red500}
                    size={30}
                    onPress={() => handleClosePress()}
                />
             
            </View>
           <Divider />
           </>
        ),
        []
    );

    const renderSectionFooter = useCallback(
        ({ section }) => (
            <View style={styles.sectionFooterContainer}>
                <Button style={{ width: "100%" }}
                    icon="bug"
                    disabled={checked == null ? true : false}
                    loading={loading}
                    color="#f0ad4e"
                    contentStyle={{ justifyContent: loading ? "space-around" : 'center' }}
                    mode="contained" onPress={() => handleReport()}>
                    {loading ? 'Reporting' : 'Report'}
                </Button>
            </View>
        ),
        [checked, loading]
    );

    const renderItem = useCallback(
        ({ item, index }) => (
            <View  style={styles.itemContainer}>
                <RadioButton
                    status={checked === index ? 'checked' : 'unchecked'}
                    onPress={() => setChecked(index)}
                />
                <Text onPress={() => setChecked(index)}>{item}</Text>
            </View>
        ),
        [checked]
    );
    return (
        <BottomSheet
            ref={bottomSheetRef}
            snapPoints={["50%"]}
            index={-1}
            onClose={handleClosePress}
            handleHeight={40}>
            <BottomSheetFlatList
                data={REPORT}
                stickyHeaderIndices={[0]}
                ListFooterComponent={renderSectionFooter}
                ListHeaderComponent={renderSectionHeader}
                keyExtractor={(i) => i}
                renderItem={renderItem}
            />
        </BottomSheet>
    )
}

export default ReportModal

