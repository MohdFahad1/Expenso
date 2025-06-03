import { Image, Pressable, StyleSheet, Text, View } from "react-native";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";

const WelcomeScreen = () => {
  return (
    <View style={styles.container}>
      <View style={styles.imgContainer}>
        <Image
          source={require("../../assets/images/welcome.png")}
          style={styles.img}
        />
      </View>

      <Pressable style={styles.signIn}>
        <Text style={styles.signInText}>Sign In</Text>
      </Pressable>

      <View style={styles.textContent}>
        <Text style={styles.mainHeading}>
          Always take control of your finances
        </Text>
        <Text style={styles.subHeading}>
          Finances must be arranged to set a better lifestyle in the future.
        </Text>
        <View style={styles.btnContainer}>
          <Pressable style={styles.btn}>
            <Text style={styles.btnText}>Get Started</Text>
          </Pressable>
        </View>
      </View>
    </View>
  );
};

export default WelcomeScreen;

const styles = StyleSheet.create({
  container: {
    height: "100%",
    width: "100%",
    backgroundColor: "#121212",
    flex: 1,
    justifyContent: "space-between",
    alignItems: "center",
    position: "relative",
  },
  imgContainer: {
    alignItems: "center",
    marginTop: hp(10),
    height: hp(56),
    justifyContent: "center",
  },
  img: {
    width: wp(100),
    height: "100%",
    resizeMode: "contain",
  },

  signIn: {
    position: "absolute",
    top: hp(7),
    right: 20,
  },
  signInText: {
    color: "#FFFFFF",
    fontSize: hp(2.3),
    fontWeight: "600",
  },
  textContent: {
    paddingBottom: hp(10),
  },
  mainHeading: {
    color: "#FFFFFF",
    textAlign: "center",
    fontSize: hp(3.5),
    fontWeight: "bold",
    paddingHorizontal: hp(6.5),
  },
  subHeading: {
    color: "#A7AFB6",
    textAlign: "center",
    fontSize: hp(2.2),
    fontWeight: "500",
    marginVertical: 20,
  },
  btnContainer: {
    alignItems: "center",
  },
  btn: {
    backgroundColor: "#A3E535",
    width: wp(80),
    padding: 10,
    borderRadius: 13,
  },
  btnText: {
    textAlign: "center",
    color: "#121212",
    fontSize: hp(2.8),
    fontWeight: "600",
  },
});
