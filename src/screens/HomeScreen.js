import React, { Component } from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import 'react-native-gesture-handler';



export default class HomeScreen extends Component {

    render() {
        return (


            <View style={styles.container}>
               
                <TouchableOpacity
                    style={styles.button1}
                    onPress={() =>
                        this.props.navigation.navigate('Type1')
                    }
                >
                    <Text>Tip1</Text>

                </TouchableOpacity>
                <TouchableOpacity
                    style={styles.button2}
                    onPress={() =>
                        this.props.navigation.navigate('Type2')
                    }
                >
                    <Text>Tip2</Text>

                </TouchableOpacity>
                <TouchableOpacity
                    style={styles.button3}
                    onPress={() =>
                        this.props.navigation.navigate('Date')
                    }
                >
                    <Text>Tip3</Text>

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

    button1: {
        alignItems: "center",
        backgroundColor: "#ff0000",
        padding: 10,
        width: 170,
        position: 'absolute',
        top: 220,
    
      },
      button2: {
        alignItems: "center",
        backgroundColor: "#ff0000",
        padding: 10,
        width: 170,
    
      },
      button3: {
        alignItems: "center",
        backgroundColor: "#ff0000",
        padding: 10,
        width: 170,
        top: 30,
    
      },

});