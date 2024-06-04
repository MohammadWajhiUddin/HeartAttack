import React, { useState, useEffect } from 'react';
import { StatusBar } from "expo-status-bar";

import { View, Text, TextInput, Image, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function UserProfileScreen() {
  const navigation = useNavigation();

  const [storedData, setStoredData] = useState('');

  useEffect(() => {
    getData();
  }, []);


  
  const getData = async () => {
    try {
      const value = await AsyncStorage.getItem('UserData');
      if (value !== null) {
        setStoredData(value);
      }
    } catch (error) {
      console.error('Error retrieving data:', error);
    }

  };

  console.log(storedData)


  return (
    <SafeAreaView style={{backgroundColor:'white',flex:1}}>
      <StatusBar barStyle="dark-content" />


      <View style={{ flex: 0.3 }}>
        <Text>s</Text>
      </View>


      <View style={{ flex: 0.7   }}>
        <Text>s</Text>
      </View>
    </SafeAreaView>
  );
}
