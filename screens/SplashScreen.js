import { StatusBar } from "expo-status-bar";
import { Text, View, Image } from "react-native";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { useEffect } from "react";
import { useNavigation } from "@react-navigation/native";

export default function SplashScreen() {
  const navigation = useNavigation();
    useEffect(() => {

      setTimeout(() => navigation.navigate('Login'), 6000)
    },

      [])

  return (
    <View style={{flex:1}}>
      <StatusBar style="dark" />
      {/* logo image with rings */}
     
        <Image
          source={require("../assets/images/aa.gif")}
          style={{resizeMode:'cover',flex:1 }}
        />

      {/* title and punchline */}
    </View>
  );
}
