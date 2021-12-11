import React, { useState } from "react";
import {
  View,
  Platform,
  Text,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import firestore from "@react-native-firebase/firestore";
import moment from "moment";

let ts = new Array();
var trip_distance = null;
var trip_distance2 = null;
var trip_distance3 = null;
var trip_distance4 = null;
var trip_distance5 = null;
var date_time = null;
var date_time2 = null;
var date_time3 = null;
var date_time4 = null;
var date_time5 = null;



function useInput(number, ts1) {
  const [date, setDate] = useState(new Date());
  const [mode, setMode] = useState("date");
  const [show, setShow] = useState(false);

  const showMode = (currentMode) => {
    setShow(true);
    setMode(currentMode);
  };
  const showDatepicker = () => {
    showMode("date");
  };

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShow(Platform.OS === "ios");
    setDate(currentDate);
    var month = moment(selectedDate).format("MM");
    var month_n = parseInt(month, 10);
    var day = moment(selectedDate).format("DD");
    var day_n = parseInt(day, 10);
    var year = moment(selectedDate).format("YYYY");
    var year_n = parseInt(year, 10);

    if (number == 0) {
      let datea = new Date(Date.UTC(year_n, month_n - 1, day_n, 0, 0, 0));
      ts1[0] = datea.getTime() / 1000;
      console.log(ts1[0]);
    }
    if (number == 1) {
      let datea = new Date(Date.UTC(year_n, month_n - 1, day_n, 23, 59, 59));
      ts1[1] = datea.getTime() / 1000;
      console.log(ts1[1]);
    }
  };

  return {
    date,
    showDatepicker,
    show,
    mode,
    onChange,
  };
}

export default () => {
  var total_date = new Array();
  var r_total_date = new Array();
  var total_distance = new Array();
  var i = 0;
  var control = 0;

  const accesFireBase = () => {
    console.log(ts[0], ts[1]);
    firestore()
      .collection("yellow_tripdata_2020-12")
      .where("trip_distance", ">", 0)
      .orderBy("trip_distance", "asc")
      .get()
      .then(querySnapshot => {
        querySnapshot.forEach(documentSnapshot => {

          if (documentSnapshot.data().tpep_pickup_datetime >= ts[0] && documentSnapshot.data().tpep_pickup_datetime <= ts[1] && control < 5) {
            total_distance[i] = documentSnapshot.data().trip_distance;
            total_date[i] = documentSnapshot.data().tpep_pickup_datetime;
            r_total_date[i] = moment(new Date(total_date[i] * 1000)).format("MM/DD/YYYY");
            i++;
            control++;
          }
        });

        trip_distance = total_distance[0];
        trip_distance2 = total_distance[1];
        trip_distance3 = total_distance[2];
        trip_distance4 = total_distance[3];
        trip_distance5 = total_distance[4];
        date_time = r_total_date[0];
        date_time2 = r_total_date[1];
        date_time3 = r_total_date[2];
        date_time4 = r_total_date[3];
        date_time5 = r_total_date[4];
        console.log(trip_distance, date_time, trip_distance2, date_time2);
      });
  };

  const input = useInput(0, ts);
  const input2 = useInput(1, ts);

  return (
    <View>
      
      <Text style={styles.text}>İki Tarih Arasında Seyahat Edilen En Az Mesafeli 5 Yolculuk</Text>
      <Text style={styles.text2}>Mesafeler</Text>
      <Text style={styles.text3}>{trip_distance}</Text>
      <Text style={styles.text4}>{trip_distance2}</Text>
      <Text style={styles.text5}>{trip_distance3}</Text>
      <Text style={styles.text6}>{trip_distance4}</Text>
      <Text style={styles.text7}>{trip_distance5}</Text>
      <Text style={styles.text8}>{date_time}</Text>
      <Text style={styles.text9}>{date_time2}</Text>
      <Text style={styles.text10}>{date_time3}</Text>
      <Text style={styles.text11}>{date_time4}</Text>
      <Text style={styles.text12}>{date_time5}</Text>
      <Text style={styles.text13}>Tarihler</Text>
      <TouchableOpacity 
      style={styles.button2}
      onPress={input.showDatepicker}>
        <Text>1.TARİH</Text>
      </TouchableOpacity>

      {input.show && (
        <DateTimePicker
          testID="dateTimePicker"
          value={input.date}
          mode={input.mode}
          is24Hour={true}
          display="default"
          onChange={input.onChange}
        />
      )}


      <TouchableOpacity 
      style={styles.button3}
      onPress={input2.showDatepicker}>
        <Text>2.TARİH</Text>
      </TouchableOpacity>

      {input2.show && (
        <DateTimePicker
          testID="dateTimePicker2"
          value={input2.date}
          mode={input2.mode}
          is24Hour={true}
          display="default"
          onChange={input2.onChange}
        />
      )}

      <TouchableOpacity 
      style={styles.button1}
      onPress={accesFireBase}>
        <Text>Verileri Göster</Text>
      </TouchableOpacity>
    </View>
  );
};
const styles = StyleSheet.create({
  text: {
    alignItems: "center",
    padding: 10,
    width: 400,
    position: "absolute",
    top: 60,
    left:0,
  },
  button1: {
    alignItems: "center",
    backgroundColor: "#ff0000",
    padding: 10,
    width: 170,
    position: "absolute",
    top: 500,
    left: 110,
  },
  button2: {
    alignItems: "center",
    backgroundColor: "#ff0000",
    padding: 10,
    width: 100,
    position: "absolute",
    top: 400,
    left: 40,
  },
  button3: {
    alignItems: "center",
    backgroundColor: "#ff0000",
    padding: 10,
    width: 100,
    position: "absolute",
    top: 400,
    left: 250,
  },
  text2: {
    alignItems: "center",
    padding: 10,
    width: 350,
    position: "absolute",
    top: 100,
    left: 50,
  },
  text3: {
    alignItems: "center",
    padding: 10,
    width: 350,
    position: "absolute",
    top: 120,
    left: 60,
  },
  text4: {
    alignItems: "center",
    padding: 10,
    width: 350,
    position: "absolute",
    top: 140,
    left: 60,
  },
  text5: {
    alignItems: "center",
    padding: 10,
    width: 350,
    position: "absolute",
    top: 160,
    left: 60,
  },
  text6: {
    alignItems: "center",
    padding: 10,
    width: 350,
    position: "absolute",
    top: 180,
    left: 60,
  },
  text7: {
    alignItems: "center",
    padding: 10,
    width: 350,
    position: "absolute",
    top: 200,
    left: 60,
  },
  text8: {
    alignItems: "center",
    padding: 10,
    width: 350,
    position: "absolute",
    top: 120,
    left: 235,
  },
  text9: {
    alignItems: "center",
    padding: 10,
    width: 350,
    position: "absolute",
    top: 140,
    left: 235,
  },
  text10: {
    alignItems: "center",
    padding: 10,
    width: 350,
    position: "absolute",
    top: 160,
    left: 235,
  },
  text11: {
    alignItems: "center",
    padding: 10,
    width: 350,
    position: "absolute",
    top: 180,
    left: 235,
  },
  text12: {
    alignItems: "center",
    padding: 10,
    width: 350,
    position: "absolute",
    top: 200,
    left: 235,
  },
  text13: {
    alignItems: "center",
    padding: 10,
    width: 350,
    position: "absolute",
    top: 100,
    left: 250,
  },
  text14: {
    alignItems: "center",
    backgroundColor: "#ff0000",
    padding: 10,
    width: 100,
    position: "absolute",
    top: 350,
    left: 40,
  },
  text15: {
    alignItems: "center",
    backgroundColor: "#ff0000",
    padding: 10,
    width: 100,
    position: "absolute",
    top: 350,
    left: 250,
  },
});
