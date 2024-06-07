import React, { useState, useEffect } from 'react';
import { StatusBar } from "expo-status-bar";

import {
  View,
  Text,
  Image,
  TouchableOpacity,
  
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import AsyncStorage from "@react-native-async-storage/async-storage";

import { useNavigation } from "@react-navigation/native";


export default function HomeScreen() {
  const navigation = useNavigation();





  return (
    
    <SafeAreaView style={{flex:1}}>
      <StatusBar barStyle="dark-content" />



      <View style={{ flex: 1 }}>
        <View
          style={{
            marginVertical: '5%',
            marginHorizontal: '5%',
            height: '95%',
            width: "90%",
            backgroundColor: "#AA0000",
            borderRadius: 30,
            shadowColor: "red",
            shadowOffset: { width: 30, height: 10 },
            shadowOpacity: 0.9,
            shadowRadius: 4,
            elevation: 10,
          }}
        >
          <View
            style={{
              marginTop: '5%',
              alignItems: "center",
              justifyContent: "center",
              display: "flex",
            }}
          >
            <Text
              style={{
                fontSize: 30,
                fontWeight: "bold",
                textDecorationLine: "underline",
                color: "white",
              }}
            >
              Check Your Heart
            </Text>
            <Text
              style={{
                fontSize: 30,
                fontWeight: "bold",
                textDecorationLine: "underline",
                color: "white",
              }}
            >
              Using
            </Text>


          </View>


          <View
            style={{
              marginTop: '7%',
              alignItems: "center",
              justifyContent: 'space-between',
              display: "flex",
              
            }}
          >
          <TouchableOpacity
          onPress={()=>navigation.navigate('UploadEcgScreen')}>
            <Image source={require('../assets/images/ecg.png')} style={{borderRadius:30}}/>
          </TouchableOpacity>


          <Text
              style={{
                fontSize: 30,
                fontWeight: "bold",
                textDecorationLine: "underline",
                color: "white",
                marginTop:'3%'
              }}
            >
              OR
            </Text>


            <TouchableOpacity
             onPress={()=>navigation.navigate('HeartConditionForm')}>
            <Image source={require('../assets/images/userform.png')} style={{borderRadius:30,marginTop:'6%'}}/>
          </TouchableOpacity>

              


          </View>

        
        </View>
      </View>
    </SafeAreaView>
  );
}
