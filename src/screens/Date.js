import React, {useState} from 'react';
import {View,TouchableOpacity, Platform, StyleSheet, Text} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import 'react-native-gesture-handler';
import firestore from "@react-native-firebase/firestore";
import moment from "moment";


var ts;
var ts2;
var lat_long = new Array();


export default ({navigation}) => {
  const [date, setDate] = useState(new Date(1598051730000));
  const [mode, setMode] = useState('date');
  const [show, setShow] = useState(false);

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShow(Platform.OS === 'ios');
    setDate(currentDate);
    var month = moment(selectedDate).format("MM");
    var month_n = parseInt(month, 10);
    var day = moment(selectedDate).format("DD");
    var day_n = parseInt(day, 10);
    var year = moment(selectedDate).format("YYYY");
    var year_n = parseInt(year, 10);
    let datea = new Date(Date.UTC(year_n, month_n - 1, day_n, 0, 0, 0));
    ts = datea.getTime() / 1000;
    let datea2 = new Date(Date.UTC(year_n, month_n - 1, day_n, 23, 59, 59));
    ts2 = datea2.getTime() / 1000;

    console.log(ts,ts2);
    
    
  };

  const showMode = (currentMode) => {
    setShow(true);
    setMode(currentMode);
  };

  const showDatepicker = () => {
    showMode('date');
  };
  
  
  
  var do_laction_id=null;
  var pu_location_id = null;
  
  var control = 0;

  const accesFireBase = () => {
    console.log("....",ts,ts2)
    firestore()
      .collection("yellow_tripdata_2020-12")
      .where("trip_distance", ">", 0)
      .orderBy("trip_distance", "desc")
      .get()
      .then(querySnapshot => {
        querySnapshot.forEach(documentSnapshot => {
          if (documentSnapshot.data().tpep_pickup_datetime >= ts && documentSnapshot.data().tpep_pickup_datetime <= ts2 && control == 0) {
            console.log("girdi");
            do_laction_id = documentSnapshot.data().DOLocationID;
            pu_location_id = documentSnapshot.data().PULocationID;
            accesFireBase2(do_laction_id,pu_location_id);
            console.log(do_laction_id,pu_location_id,"Distance:",documentSnapshot.data().trip_distance);
            control++;
          }
        });
      });
     

  };

  const accesFireBase2 = (id1,id2) => {
    firestore()
      .collection("taxi_zones")
      .orderBy("LocationID", "asc")
      .get()
      .then(querySnapshot => {
        querySnapshot.forEach(documentSnapshot => {
                
            if(documentSnapshot.data().LocationID == id1){
                lat_long[0] = documentSnapshot.data().longitude;
                lat_long[1] = documentSnapshot.data().latitude;
    
            }
            if(documentSnapshot.data().LocationID == id2){
                lat_long[2] = documentSnapshot.data().longitude;
                lat_long[3] = documentSnapshot.data().latitude; 
                console.log(lat_long);            
            }

        });
      });

  };

  return (
    <View>
      <TouchableOpacity 
      style={styles.button1}
      onPress={showDatepicker}>
        <Text>TARİH SEÇ</Text>
      </TouchableOpacity>

      <TouchableOpacity 
      style={styles.button2}
      onPress={() =>
       navigation.navigate('Type3',{
          coordinates1: lat_long[0],
          coordinates2: lat_long[1],
          coordinates3: lat_long[2],
          coordinates4: lat_long[3],

       })
    }>
        <Text>Rota Oluştur</Text>
      </TouchableOpacity>

      <TouchableOpacity 
      style={styles.button3}
      onPress={accesFireBase}>
        <Text>Verileri Al</Text>
      </TouchableOpacity>

      {show && (
        <DateTimePicker
          testID="dateTimePicker"
          value={date}
          mode={mode}
          is24Hour={true}
          display="default"
          onChange={onChange}
        />
      )}
    </View>
  );
};


const styles = StyleSheet.create({

    button1: {
        alignItems: "center",
        backgroundColor: "#ff0000",
        padding: 10,
        width: 100,
        position: "absolute",
        top: 100,
        left: 150,
      },

      button2: {
        alignItems: "center",
        backgroundColor: "#ff0000",
        padding: 10,
        width: 100,
        position: "absolute",
        top: 400,
        left: 240,
      },

      button3: {
        alignItems: "center",
        backgroundColor: "#ff0000",
        padding: 10,
        width: 100,
        position: "absolute",
        top: 400,
        left: 55,
      },



});