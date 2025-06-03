import { Pressable, StyleSheet, Text, TextInput, View } from "react-native";
import ScreenWrapper from "../components/ScreenWrapper";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";

import FontAwesome from "@expo/vector-icons/FontAwesome";
import Zocial from "@expo/vector-icons/Zocial";
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";

import { useRouter } from "expo-router";
import BackButton from "../components/BackButton";

const Login = () => {
  const router = useRouter();

  return (
    <ScreenWrapper bg="#121212">
      <View style={styles.container}>
        <BackButton />
        <Text style={styles.mainText}>Let's,</Text>
        <Text style={styles.mainText}>Get Started</Text>

        <Text style={styles.subText}>
          Create an account to track your expenses
        </Text>

        <View style={styles.inputContainer}>
          <View>
            <FontAwesome name="user" size={24} color="#e1e1e1" />
          </View>
          <TextInput
            placeholder="Enter your name"
            placeholderTextColor={"#e1e1e1"}
            style={styles.input}
          />
        </View>

        <View style={[styles.inputContainer, { marginVertical: 20 }]}>
          <View>
            <Zocial name="email" size={22} color="#e1e1e1" />
          </View>
          <TextInput
            placeholder="Enter your email"
            placeholderTextColor={"#e1e1e1"}
            style={styles.input}
          />
        </View>

        <View style={styles.inputContainer}>
          <View>
            <FontAwesome6 name="lock" size={22} color="#e1e1e1" />
          </View>
          <TextInput
            placeholder="Enter your password"
            placeholderTextColor={"#e1e1e1"}
            style={styles.input}
            secureTextEntry={true}
          />
        </View>

        <View style={styles.btnContainer}>
          <Pressable style={styles.btn}>
            <Text style={styles.btnText}>Register</Text>
          </Pressable>
        </View>

        <View style={styles.signUp}>
          <Text style={styles.signUpText}>Already have an account?</Text>
          <Pressable onPress={() => router.navigate("(auth)/Login")}>
            <Text style={styles.signUpBtn}>Login</Text>
          </Pressable>
        </View>
      </View>
    </ScreenWrapper>
  );
};

export default Login;

const styles = StyleSheet.create({
  container: {
    height: "100%",
    width: "100%",
    flex: 1,
    paddingHorizontal: wp(5),
  },
  mainText: {
    color: "#FFFFFF",
    fontSize: hp(3.5),
    fontWeight: "bold",
  },
  subText: {
    color: "#A7AFB6",
    fontSize: hp(2.1),
    fontWeight: "500",
    marginTop: 25,
    marginBottom: 15,
  },
  inputContainer: {
    borderWidth: 1,
    borderColor: "#e1e1e1",
    borderCurve: "continuous",
    borderRadius: 13,
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 6,
    paddingHorizontal: 20,
    gap: 10,
  },
  input: {
    width: "100%",
    color: "#e1e1e1",
    fontSize: hp(2),
    fontWeight: "500",
  },
  btnContainer: {
    alignItems: "center",
  },
  btn: {
    backgroundColor: "#A3E535",
    width: "100%",
    padding: 10,
    borderRadius: 13,
    marginTop: 20,
  },
  btnText: {
    textAlign: "center",
    color: "#121212",
    fontSize: hp(2.8),
    fontWeight: "600",
  },
  signUp: {
    flexDirection: "row",
    gap: 5,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 20,
  },
  signUpText: {
    color: "#e1e1e1",
    fontSize: hp(2),
    fontWeight: "500",
  },
  signUpBtn: {
    color: "#A3E535",
    fontWeight: "500",
  },
});
