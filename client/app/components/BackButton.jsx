import { View, Text, Pressable, StyleSheet } from "react-native";
import { useRouter } from "expo-router";
import Ionicons from "@expo/vector-icons/Ionicons";
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from "react-native-responsive-screen";

const BackButton = ({ title }) => {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <Pressable style={styles.backBtn} onPress={() => router.back()}>
        <Ionicons name="chevron-back" size={24} color="#e1e1e1" />
      </Pressable>
      {title && <Text style={styles.title}>{title}</Text>}
    </View>
  );
};

export default BackButton;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: hp(2),
  },
  backBtn: {
    backgroundColor: "#525252",
    width: 35,
    height: 35,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: hp(2.5),
    fontWeight: "500",
    color: "#e1e1e1",
    marginLeft: 10,
    width: wp(79),
    textTransform: "capitalize",
  },
});
