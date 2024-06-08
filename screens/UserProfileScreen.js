import React, { useState, useEffect } from "react";
import { StatusBar } from "expo-status-bar";

import {
  View,
  Text,
  TextInput,
  Image,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Alert,
  ActivityIndicator,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { AntDesign } from "react-native-vector-icons";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { BarChart } from "react-native-chart-kit";
import { getHealthlogdata } from "../services/ALLAPIS";
import Dialog from "react-native-dialog";

export default function UserProfileScreen() {
  const navigation = useNavigation();

  const [storedData, setStoredData] = useState(null);
  const [data, setData] = useState(null);
  const [visible, setVisible] = useState(false);
  const [loading, setLoading] = useState(true);

  const showDialog = () => {
    setVisible(true);
  };

  const handleCancel = () => {
    setVisible(false);
  };

  const handleDelete = async () => {
    try {
      await AsyncStorage.removeItem("UserData");
      navigation.navigate("Login");
    } catch (e) {
      Alert.alert("Unable To Log Out");
    }

    setVisible(false);
  };

  useEffect(() => {
    setTimeout(() => getData(), 6000);
  }, []);

  const getData = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem("UserData");
      if (jsonValue != null) {
        const user = JSON.parse(jsonValue);
        setStoredData(user);
        fetchData(user);
      } else {
        Alert.alert("no user data found");
      }
    } catch (error) {
      Alert.alert("Error retrieving data:");
    }
  };

  const fetchData = async (user) => {
    try {
      // Replace this URL with the actual URL of your API
      let response = await getHealthlogdata(user._id);
      if (response.status == 200) {
        const labels = response.data.map((item) => item.predictedResult);
        const HR = response.data.map((item) => item.HR);
        const SysBP = response.data.map((item) => item.SysBP);
        const DiaBP = response.data.map((item) => item.DiaBP);

        setData({ labels, HR, SysBP, DiaBP });
        setLoading(false);
      } else {
        Alert.alert("unable to load data");
      }
    } catch (error) {
      Alert.alert("Error fetching data: ", error);
    }
  };

  return (
    <SafeAreaView style={{ backgroundColor: "white", flex: 1 }}>
      <Dialog.Container visible={visible}>
        <Dialog.Description>
          Do you want to Logout this account?
        </Dialog.Description>
        <Dialog.Button label="Cancel" onPress={handleCancel} />
        <Dialog.Button label="Log Out" onPress={handleDelete} />
      </Dialog.Container>
      <StatusBar barStyle="dark-content" />
      {loading == true ? (
        <>
          <View
            style={{
              flex: 1,
              alignItems: "center",
              justifyContent: "center",
              display: "flex",
            }}
          >
            <ActivityIndicator size="large" color="red" />
          </View>
        </>
      ) : (
        <>
          <View
            style={{
              width: "100%",
              height: "30%",
              backgroundColor: "white",
              borderBottomLeftRadius: 50,
              borderBottomRightRadius: 50,
              shadowOffset: { width: 30, height: 10 },
              shadowOpacity: 0.9,
              elevation: 5,
            }}
          >
            <View
              style={{
                marginTop: 10,
                height: "20%",
                flexDirection: "row",
                justifyContent: "space-between",
                borderBottomWidth: 2,
                borderBottomColor: "red",
              }}
            >
              <View />

              <Text style={{ fontSize: 20, fontWeight: 500 }}>
                User Profile Screen
              </Text>
              <TouchableOpacity
                style={{ marginRight: "2%" }}
                onPress={showDialog}
              >
                <AntDesign name="logout" size={28} color={"red"} />
              </TouchableOpacity>
            </View>

            <View
              style={{
                marginBottom: "10%",
                marginTop: "4%",
                marginHorizontal: "5%",
                justifyContent: "space-evenly",
                display: "flex",
                flex: 1,
              }}
            >
              <Text style={{ fontSize: 14, fontWeight: 300 }}>
                User Name : {storedData?.userName}
              </Text>

              <Text style={{ fontSize: 14, fontWeight: 300 }}>
                User Email : {storedData?.userEmail}
              </Text>
              <Text style={{ fontSize: 14, fontWeight: 300 }}>
                User Contact Number : {storedData?.userContactNumber}
              </Text>
            </View>
          </View>
          <ScrollView showsVerticalScrollIndicator={false}>
            {data && (
              <>
                <View
                  style={{
                    alignItems: "center",
                    margin: "3%",
                    backgroundColor: "white",
                    shadowColor: "red",
                    shadowOffset: { width: 30, height: 10 },
                    shadowOpacity: 0.9,
                    shadowRadius: 4,
                    elevation: 10,
                    borderRadius: 30,
                  }}
                >
                  <BarChart
                    data={{
                      labels: data.labels,
                      datasets: [
                        {
                          data: data.HR,
                        },
                      ],
                    }}
                    width={330}
                    height={260}
                    yAxisSuffix=" HR"
                    chartConfig={{
                      backgroundGradientFrom: "red",
                      backgroundGradientFromOpacity: 0.5,
                      backgroundGradientTo: "red",
                      backgroundGradientToOpacity: 0.8,
                      decimalPlaces: 0,
                      barPercentage: 0.8,
                      color: (opacity = 0) => `rgba(255, 255, 255, ${opacity})`,
                      style: {
                        borderRadius: 30,
                      },
                    }}
                    style={{
                      marginVertical: 8,
                      borderRadius: 30,
                    }}
                    // verticalLabelRotation={30}
                  />
                  <Text
                    style={{
                      position: "absolute",
                      left: "40%",
                      top: "77%",
                      fontSize: 16,
                      fontWeight: "300",
                      color: "white",
                      textAlign: "center",
                    }}
                  >
                    Heart Disease
                  </Text>

                  <Text
                    style={{
                      fontSize: 15,
                      fontWeight: 300,
                      marginVertical: 10,
                    }}
                  >
                    Heart Rate Graph
                  </Text>
                </View>

                <View
                  style={{
                    alignItems: "center",
                    margin: "3%",
                    backgroundColor: "white",
                    shadowColor: "red",
                    shadowOffset: { width: 30, height: 10 },
                    shadowOpacity: 0.9,
                    shadowRadius: 4,
                    elevation: 10,
                    borderRadius: 30,
                  }}
                >
                  <BarChart
                    data={{
                      labels: data.labels,
                      datasets: [
                        {
                          data: data.SysBP,
                        },
                      ],
                    }}
                    width={330}
                    height={260}
                    yAxisSuffix=" BP"
                    chartConfig={{
                      backgroundGradientFrom: "red",
                      backgroundGradientFromOpacity: 0.5,
                      backgroundGradientTo: "red",
                      backgroundGradientToOpacity: 0.8,
                      decimalPlaces: 0,
                      barPercentage: 0.8,
                      color: (opacity = 0) => `rgba(255, 255, 255, ${opacity})`,
                      style: {
                        borderRadius: 30,
                      },
                    }}
                    style={{
                      marginVertical: 8,
                      borderRadius: 30,
                    }}
                    // verticalLabelRotation={30}
                  />

                  <Text
                    style={{
                      position: "absolute",
                      left: "40%",
                      top: "77%",
                      fontSize: 16,
                      fontWeight: "300",
                      color: "white",
                      textAlign: "center",
                    }}
                  >
                    Heart Disease
                  </Text>

                  <Text
                    style={{
                      fontSize: 15,
                      fontWeight: 300,
                      marginVertical: 10,
                    }}
                  >
                    Systolic Blood Pressure Graph
                  </Text>
                </View>

                <View
                  style={{
                    alignItems: "center",
                    margin: "3%",
                    backgroundColor: "white",
                    shadowColor: "red",
                    shadowOffset: { width: 30, height: 10 },
                    shadowOpacity: 0.9,
                    shadowRadius: 4,
                    elevation: 10,
                    borderRadius: 30,
                  }}
                >
                  <BarChart
                    data={{
                      labels: data.labels,
                      datasets: [
                        {
                          data: data.DiaBP,
                        },
                      ],
                    }}
                    width={330}
                    height={260}
                    yAxisSuffix=" BP"
                    chartConfig={{
                      backgroundGradientFrom: "red",
                      backgroundGradientFromOpacity: 0.5,
                      backgroundGradientTo: "red",
                      backgroundGradientToOpacity: 0.8,
                      decimalPlaces: 0,
                      barPercentage: 0.8,
                      color: (opacity = 0) => `rgba(255, 255, 255, ${opacity})`,
                      style: {
                        borderRadius: 30,
                      },
                    }}
                    style={{
                      marginVertical: 8,
                      borderRadius: 30,
                    }}
                    // verticalLabelRotation={30}
                  />

<Text
                    style={{
                      position: "absolute",
                      left: "40%",
                      top: "77%",
                      fontSize: 16,
                      fontWeight: "300",
                      color: "white",
                      textAlign: "center",
                    }}
                  >
                    Heart Disease
                  </Text>

                  <Text
                    style={{
                      fontSize: 15,
                      fontWeight: 300,
                      marginVertical: 10,
                    }}
                  >
                    Dia Systolic Blood Pressure Graph
                  </Text>
                </View>
              </>
            )}
          </ScrollView>
        </>
      )}
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
    textAlign: "center",
    fontSize: 18,
    marginBottom: 10,
  },
});
