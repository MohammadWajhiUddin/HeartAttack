import * as React from "react";
import { StatusBar } from "expo-status-bar";

import {
  View,
  Text,
  TextInput,
  Image,
  TouchableOpacity,
  ActivityIndicator,
  Alert,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { EnvelopeOpenIcon, LockClosedIcon } from "react-native-heroicons/solid";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";

import { loginUser } from "../services/ALLAPIS";

export default function Login() {
  const navigation = useNavigation();

  const [userEmail, onChangeuserEmail] = React.useState("");
  const [userPassword, onChangeuserPassword] = React.useState("");
  const [loading, setLoading] = React.useState(false);

  const handleLogin = async () => {
    setLoading(true);
    let payload = {
      userEmail: userEmail,
      userPassword: userPassword,
    };

    let response = await loginUser(payload);
    if (response.status == 201) {
      setLoading(false);
      Alert.alert("User Found Successfully");
      storeData(response.data.data);
    } else {
      Alert.alert(response.data);
      setLoading(false);
    }
  };
  const storeData = async (value) => {
    try {
      const jsonValue = JSON.stringify(value);
      await AsyncStorage.setItem("UserData", jsonValue);
      navigation.navigate("MyTabs");
    } catch (e) {
      Alert.alert("Error While Storing User Data", e);
    }
  };
  return (
    <SafeAreaView className=" flex-1">
      <StatusBar barStyle="dark-content" />

      <View
        style={{
          flex: 0.3,
          alignItems: "center",
          justifyContent: "center",
          display: "flex",
        }}
      >
        <View style={{ marginVertical: 30, marginHorizontal: 30 }}>
          <Image
            source={require("../assets/images/login.png")}
            style={{ width: 300, height: 300, resizeMode: "contain" }}
          />
        </View>
      </View>
      <View style={{ flex: 0.7 }}>
        <View
          style={{
            marginVertical: 20,
            marginHorizontal: 20,
            height: 450,
            width: "90%",
            backgroundColor: "#AA0000",
            borderRadius: 30,
            shadowColor: "red",
            shadowOffset: { width: 0, height: 10 },
            shadowOpacity: 0.2,
            shadowRadius: 4,
            elevation: 10,
          }}
        >
          <View
            style={{
              marginTop: 20,
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
              LOGIN
            </Text>
          </View>

          <View style={{ marginTop: 30, marginHorizontal: 20 }}>
            <View
              style={{
                flexDirection: "row",
                borderBottomColor: "white",
                borderBottomWidth: 2,
              }}
            >
              <EnvelopeOpenIcon color="white" fill="white" size={26} />

              <TextInput
                onChangeText={onChangeuserEmail}
                value={userEmail}
                placeholder="Enter Your Email"
                placeholderTextColor={"white"}
                style={{
                  paddingLeft: 10,
                  paddingBottom: 10,
                  fontSize: 18,
                  fontWeight: "500",
                  color: "white",
                  flex: 1,
                }}
              />
            </View>

            <View
              style={{
                flexDirection: "row",
                borderBottomColor: "white",
                borderBottomWidth: 2,
                marginTop: 50,
              }}
            >
              <LockClosedIcon color="white" fill="white" size={26} />

              <TextInput
                onChangeText={onChangeuserPassword}
                value={userPassword}
                placeholder="Enter Your Password"
                placeholderTextColor={"white"}
                style={{
                  paddingLeft: 10,
                  paddingBottom: 10,
                  fontSize: 18,
                  fontWeight: "500",
                  color: "white",
                  flex: 1,
                }}
              />
            </View>

            {loading == true ? (
              <ActivityIndicator
                size="large"
                color="white"
                style={{ marginTop: "12%" }}
              />
            ) : (
              <TouchableOpacity
                style={{
                  marginTop: 50,
                  width: "100%",
                  height: 50,
                  borderWidth: 2,
                  borderColor: "white",
                  borderRadius: 30,
                  alignItems: "center",
                  justifyContent: "center",
                  display: "flex",
                }}
                onPress={() => handleLogin()}
              >
                <Text
                  style={{
                    fontSize: 20,
                    color: "white",
                  }}
                >
                  Login
                </Text>
              </TouchableOpacity>
            )}

            <View
              style={{
                justifyContent: "center",
                display: "flex",
                alignItems: "center",
                marginTop: 90,
              }}
            >
              <Text style={{ fontSize: 16, fontWeight: "400", color: "white" }}>
                Dont have an account ?{" "}
                <Text
                  style={{ fontSize: 16, fontWeight: "800", color: "white" }}
                  onPress={() => navigation.navigate("SignupScreen")}
                >
                  {" "}
                  Signup
                </Text>
              </Text>
            </View>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
}
