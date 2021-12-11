import React, { Component } from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import firestore from '@react-native-firebase/firestore';
import moment from "moment";



export default class Type1 extends Component {

    state = {
       
        trip_distance:null,
        trip_distance2:null,
        trip_distance3:null,
        trip_distance4:null,
        trip_distance5:null,
        date_time:null,
        date_time2:null,
        date_time3:null,
        date_time4:null,
        date_time5:null,

    };


    accesFireBase = () => {

        var data = new Array();
        var date = new Array();
        var result_date = new Array();
        var i = 0;
        firestore()
            .collection('yellow_tripdata_2020-12')
            .orderBy('trip_distance', 'desc')
            .limit(5)
            .get()
            .then(querySnapshot => {

                querySnapshot.forEach(documentSnapshot => {
                    console.log('Distance: ', documentSnapshot.id, documentSnapshot.data().trip_distance,documentSnapshot.data().tpep_pickup_datetime);
                    data[i] = documentSnapshot.data().trip_distance;
                    date[i] = documentSnapshot.data().tpep_pickup_datetime;
                    result_date[i] =  moment(new Date(date[i] * 1000)).format('MM/DD/YYYY');
                    console.log(data[i]);
                    i++;
                });
                console.log("Distanceaaaaaaaaaaaaa:",data[0])
                this.setState({trip_distance:data[0]})
                this.setState({trip_distance2:data[1]})
                this.setState({trip_distance3:data[2]})
                this.setState({trip_distance4:data[3]})
                this.setState({trip_distance5:data[4]})
                this.setState({date_time:result_date[0]})
                this.setState({date_time2:result_date[1]})
                this.setState({date_time3:result_date[2]})
                this.setState({date_time4:result_date[3]})
                this.setState({date_time5:result_date[4]})


            });
         
             
    }
    
    
    render() {


        return (

            <View style={styles.container}>

                <Text style={styles.text}>En Uzun Mesafeli 5 Yolculuktaki Gün ve Mesafeler </Text>
                <Text style={styles.text2}>Mesafeler</Text>
                <Text style={styles.text3}>{this.state.trip_distance}</Text>
                <Text style={styles.text4}>{this.state.trip_distance2}</Text>
                <Text style={styles.text5}>{this.state.trip_distance3}</Text>
                <Text style={styles.text6}>{this.state.trip_distance4}</Text>
                <Text style={styles.text7}>{this.state.trip_distance5}</Text>
                <Text style={styles.text8}>{this.state.date_time}</Text>
                <Text style={styles.text9}>{this.state.date_time2}</Text>
                <Text style={styles.text10}>{this.state.date_time3}</Text>
                <Text style={styles.text11}>{this.state.date_time4}</Text>
                <Text style={styles.text12}>{this.state.date_time5}</Text>
                <Text style={styles.text13}>Tarihler</Text>
                <TouchableOpacity
                    style={styles.button1}
                    onPress={this.accesFireBase}
                >
                    <Text>Verileri Göster</Text>

                </TouchableOpacity>
            </View>


        );

    }

}



const styles = StyleSheet.create({

    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5FCFF',

    },
    text: {

        alignItems: "center",
        padding: 10,
        width: 350,
        position: 'absolute',
        top: 60,
        left: 30,

    },
    button1: {

        alignItems: "center",
        backgroundColor: "#ff0000",
        padding: 10,
        width: 170,
        position: 'absolute',
        top: 500,
        left: 100,

    },
    text2: {

        alignItems: "center",
        padding: 10,
        width: 350,
        position: 'absolute',
        top: 100,
        left: 50,

    },
    text3: {

        alignItems: "center",
        padding: 10,
        width: 350,
        position: 'absolute',
        top: 120,
        left: 60,

    },
    text4: {

        alignItems: "center",
        padding: 10,
        width: 350,
        position: 'absolute',
        top: 140,
        left: 60,

    },
    text5: {

        alignItems: "center",
        padding: 10,
        width: 350,
        position: 'absolute',
        top: 160,
        left: 60,

    },
    text6: {

        alignItems: "center",
        padding: 10,
        width: 350,
        position: 'absolute',
        top: 180,
        left: 60,

    },
    text7: {

        alignItems: "center",
        padding: 10,
        width: 350,
        position: 'absolute',
        top: 200,
        left: 60,

    },
    text8: {

        alignItems: "center",
        padding: 10,
        width: 350,
        position: 'absolute',
        top: 120,
        left: 235,

    },
    text9: {

        alignItems: "center",
        padding: 10,
        width: 350,
        position: 'absolute',
        top: 140,
        left: 235,

    },
    text10: {

        alignItems: "center",
        padding: 10,
        width: 350,
        position: 'absolute',
        top: 160,
        left: 235,

    },
    text11: {

        alignItems: "center",
        padding: 10,
        width: 350,
        position: 'absolute',
        top: 180,
        left: 235,

    },
    text12: {

        alignItems: "center",
        padding: 10,
        width: 350,
        position: 'absolute',
        top: 200,
        left: 235,

    },
    text13: {

        alignItems: "center",
        padding: 10,
        width: 350,
        position: 'absolute',
        top: 100,
        left: 250,

    },
   
});