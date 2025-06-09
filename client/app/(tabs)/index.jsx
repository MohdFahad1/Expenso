import { Image, StyleSheet, Text, View } from "react-native";
import { useContext, useEffect } from "react";
import { AuthContext } from "../../context/AuthContext";
import { useRouter } from "expo-router";
import ScreenWrapper from "../components/ScreenWrapper";
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from "react-native-responsive-screen";

const Home = () => {
  const { user, token } = useContext(AuthContext);
  const router = useRouter();

  useEffect(() => {
    if (!token) {
      router.replace("(auth)/Login");
    }
  }, [token]);

  if (!token) {
    return null;
  }

  return (
    <ScreenWrapper bg="#171717">
      <View style={styles.container}>
        <View>
          <Text style={styles.greeting}>Hello,</Text>
          <Text style={styles.name}>{user?.name}</Text>
        </View>
        <View>
          <Image
            source={require("../../assets/images/card.png")}
            resizeMode="contain"
            style={styles.img}
          />
          <View>
            <Text>Total Balance</Text>
            <Text>$ 127.00</Text>
          </View>

          <View>
            <Text>Income</Text>
            <Text>$ 127.00</Text>
          </View>

          <View>
            <Text>Expense</Text>
            <Text>$ 427.00</Text>
          </View>
        </View>
      </View>
    </ScreenWrapper>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 15,
  },
  greeting: {
    fontSize: hp(2),
    color: "#9ca3af",
  },
  name: {
    fontSize: hp(3.5),
    fontWeight: "500",
    color: "#e3e3e3",
  },
  img: {
    height: hp(24),
    width: wp(92),
  },
});
