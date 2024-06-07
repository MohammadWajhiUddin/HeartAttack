import React, { useState, useEffect } from 'react';
import { StatusBar } from "expo-status-bar";

import { View, Text, TextInput, Image, TouchableOpacity ,StyleSheet} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { LineChart, BarChart } from 'react-native-chart-kit';
import axios from 'axios';

export default function UserProfileScreen() {
  const navigation = useNavigation();

  const [storedData, setStoredData] = useState('');
  const [data, setData] = useState(null);

  
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

  const fetchData = async () => {
    try {
      // Replace this URL with the actual URL of your API
      const response = await axios.get('https://hearbackend.vercel.app/HeartAttackDB/Users/getHealthlogdata/66636f7ec72730e5cf83f14d');
      const labels = response.data.map(item => item.age);
      const values = response.data.map(item => item.HR);
      setData({ labels, values });
    } catch (error) {
      console.error('Error fetching data: ', error);
    }
  };
  useEffect(() => {
    getData();
    fetchData();
  }, []);


  
 



  return (
    <SafeAreaView style={{backgroundColor:'white',flex:1}}>
      <StatusBar barStyle="dark-content" />

     <View style={{marginHorizontal:'8%'}}>
     {data && (
        <>
          <Text style={styles.chartLabel}>Heart Rate Chart</Text>
          <LineChart
            data={{
              labels: data.labels,
              datasets: [
                {
                  data: data.values,
                },
              ],
            }}
            width={300}
            height={220}
            chartConfig={{
              backgroundGradientFrom: "red",
              backgroundGradientFromOpacity: 0.5,
              backgroundGradientTo: "red",
              backgroundGradientToOpacity: 0.8,
              color: (opacity = 9) => `rgba(255, 255, 255, ${opacity})`,
              style: {
                borderRadius: 16,
              },
              decimalPlaces: 0,

              propsForDots: {
                r: "5",
                strokeWidth: "2",
                stroke: "#ffa726"
              }
            }}
            bezier
            style={{
              marginVertical: 2,
              borderRadius: 16,
            }}
            verticalLabelRotation={30}

          />

          {/* <Text style={styles.chartLabel}>Bar Chart</Text> */}
          <BarChart
            data={{
              labels: data.labels,
              datasets: [
                {
                  data: data.values,
                },
              ],
            }}
            width={300}
            height={220}
            yAxisLabel=""
            chartConfig={{
              backgroundGradientFrom: "red",
              backgroundGradientFromOpacity: 0.5,
              backgroundGradientTo: "red",
              backgroundGradientToOpacity: 0.8,
              decimalPlaces: 0,
              barPercentage: 0.8,
              color: (opacity = 0) => `rgba(255, 255, 255, ${opacity})`,
              style: {
                borderRadius: 16,
              }
           
            }}
            style={{
              marginVertical: 8,
              borderRadius: 16,
            }}
            verticalLabelRotation={30}

          />
        </>
      )}
     </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 50,
    paddingHorizontal: 20,
  },
  chartLabel: {
    textAlign: 'center',
    fontSize: 18,
    marginBottom: 10,
  },
});