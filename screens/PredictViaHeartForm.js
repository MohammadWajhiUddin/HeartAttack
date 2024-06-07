import React, { useState, useEffect } from "react";
import { StatusBar } from "expo-status-bar";

import { View, Text, Alert, Image, ActivityIndicator } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { EnvelopeOpenIcon, PhoneIcon } from "react-native-heroicons/solid";
import { adduserhealthlogs } from "../services/ALLAPIS";

export default function PredictViaHeartForm({ route }) {
  const {
    dataresponse,
    Sex,
    age,
    SysBP,
    DiaBP,
    HR,
    weightKg,
    heightInCm,
    BMI,
  } = route.params;

  const navigation = useNavigation();

  const [storedData, setStoredData] = useState(null);
  const [predictedResult, setPredictedResult] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    getData();
    myFunction();
  }, []);

  function myFunction() {
    if (dataresponse == 0) {
      setPredictedResult(false);
    } else {
      setPredictedResult(true);
    }
  }

  const getData = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem("UserData");
      if (jsonValue != null) {
        const user = JSON.parse(jsonValue);
        setStoredData(user);
        submitForm(user);
      }
    } catch (error) {
      Alert.alert("Error retrieving data:");
    }
  };

  const submitForm = async (user) => {
    let payload = {
      user_id: user?._id,
      userName: user?.userName,
      predictedResult: predictedResult,
      Sex: Sex,
      age: age,
      SysBP: SysBP,
      DiaBP: DiaBP,
      HR: HR,
      Weight: weightKg,
      Height: heightInCm,
      BMI: BMI,
    };
    console.log("sssssssssssssssssss", payload);

    let response = await adduserhealthlogs(payload);
    if (response.status == 201) {
      setLoading(false);
    } else {
      Alert.alert(response.data);
      setLoading(false);
    }
  };

  return (
    <SafeAreaView className="bg-white flex-1">
      <StatusBar barStyle="dark-content" />

      {loading == false ? (
        <View style={{ flex: 1 }}>
          <View
            style={{
              flex: 0.4,
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            {predictedResult == false ? (
              <Image
                source={require("../assets/images/healthyheart.gif")}
                style={{ width: "100%", height: "100%" }}
              />
            ) : (
              <Image
                source={require("../assets/images/unhealthyheart.jpg")}
                style={{ width: "100%", height: "100%" }}
                resizeMode={"contain"}
              />
            )}
          </View>

          <View
            style={{
              flex: 0.37,
              backgroundColor: "white",
              marginHorizontal: "5%",
              borderRadius: 30,
              marginTop: "3%",
              borderRadius: 30,
              shadowColor: "red",
              shadowOffset: { width: 30, height: 10 },
              shadowOpacity: 0.9,
              shadowRadius: 4,
              elevation: 10,
            }}
          >
            <Text
              style={{ fontSize: 20, fontWeight: "500", textAlign: "center" }}
            >
              {storedData?.userName}
            </Text>

            <View
              style={{
                marginTop: "3%",
                paddingHorizontal: "3%",
                flexDirection: "row",
                justifyContent: "space-between",
              }}
            >
              <View style={{ flexDirection: "row" }}>
                <EnvelopeOpenIcon color="black" fill="black" size={16} />

                <Text
                  style={{ fontSize: 12, fontWeight: "300", marginLeft: 10 }}
                >
                  {storedData?.userEmail}
                </Text>
              </View>

              <View style={{ flexDirection: "row" }}>
                <PhoneIcon color="black" fill="black" size={16} />

                <Text
                  style={{ fontSize: 12, fontWeight: "300", marginLeft: 10 }}
                >
                  {storedData?.userContactNumber}
                </Text>
              </View>
            </View>

            <View
              style={{
                flex: 1,
                borderTopWidth: 3,
                borderColor: "red",
                marginTop: "10%",
              }}
            >
              <View
                style={{
                  marginHorizontal: "5%",
                  marginVertical: "4%",
                  flexDirection: "column",
                  justifyContent: "space-evenly",
                  display: "flex",
                  flex: 1,
                }}
              >
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                  }}
                >
                  <Text style={{ fontSize: 14, fontWeight: "300" }}>
                    Sex : {Sex}
                  </Text>
                  <Text style={{ fontSize: 14, fontWeight: "300" }}>
                    Age : {age}
                  </Text>
                </View>

                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                  }}
                >
                  <Text style={{ fontSize: 14, fontWeight: "300" }}>
                    Systolic Bp : {SysBP}
                  </Text>
                  <Text style={{ fontSize: 14, fontWeight: "300" }}>
                    Diastolic Bp : {DiaBP}
                  </Text>
                </View>

                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                  }}
                >
                  <Text style={{ fontSize: 14, fontWeight: "300" }}>
                    Heart Rate : {HR}
                  </Text>
                  <Text style={{ fontSize: 14, fontWeight: "300" }}>
                    Weight in kg : {weightKg}
                  </Text>
                </View>

                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                  }}
                >
                  <Text style={{ fontSize: 14, fontWeight: "300" }}>
                    Height : {heightInCm} '
                  </Text>
                  <Text style={{ fontSize: 14, fontWeight: "300" }}>
                    Body mass index (BMI) : {BMI}
                  </Text>
                </View>
              </View>
            </View>
          </View>

          {predictedResult == false ? (
            <View
              style={{
                flex: 0.23,
                backgroundColor: "white",
                marginHorizontal: "5%",
                borderRadius: 30,
                marginVertical: "5%",
                borderRadius: 30,
                shadowColor: "green",
                shadowOffset: { width: 30, height: 10 },
                shadowOpacity: 0.9,
                shadowRadius: 4,
                elevation: 10,
                alignItems: "center",
                justifyContent: "center",
                display: "flex",
              }}
            >
              <Text
                style={{
                  fontSize: 20,
                  fontWeight: "300",
                  textAlign: "center",
                  paddingHorizontal: 30,
                }}
              >
                Dear {storedData?.userName},there are no signs of any heart
                disease.
              </Text>
            </View>
          ) : (
            <View
              style={{
                flex: 0.23,
                backgroundColor: "white",
                marginHorizontal: "5%",
                borderRadius: 30,
                marginVertical: "5%",
                borderRadius: 30,
                shadowColor: "red",
                shadowOffset: { width: 30, height: 10 },
                shadowOpacity: 0.9,
                shadowRadius: 4,
                elevation: 10,
                alignItems: "center",
                justifyContent: "center",
                display: "flex",
              }}
            >
              <Text
                style={{
                  fontSize: 20,
                  fontWeight: "600",
                  textAlign: "center",
                  paddingHorizontal: 30,
                  color: "red",
                }}
              >
                Dear {storedData?.userName}, you need medical observations
              </Text>
            </View>
          )}
        </View>
      ) : (
        <ActivityIndicator
          size="large"
          color="white"
          style={{ marginTop: "12%" }}
        />
      )}
    </SafeAreaView>
  );
}
