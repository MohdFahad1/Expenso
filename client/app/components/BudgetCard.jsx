import { Pressable, Text, View, StyleSheet } from "react-native";
import { useRouter } from "expo-router";
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from "react-native-responsive-screen";
import Entypo from "@expo/vector-icons/Entypo";

const BudgetCard = ({ budget }) => {
  const router = useRouter();

  const formattedDate = budget.createdAt
    ? new Date(budget.createdAt).toLocaleDateString(undefined, {
        year: "numeric",
        month: "short",
        day: "numeric",
      })
    : "";

  return (
    <Pressable
      style={styles.budgetCard}
      onPress={() =>
        router.push({
          pathname: `/budget/${budget._id}`,
          params: {
            name: budget.name,
          },
        })
      }
    >
      <View style={styles.budgetDetails}>
        <View style={{ flexDirection: "row", gap: 10 }}>
          <View style={styles.emojiBox}>
            <Text style={styles.budgetEmoji}>{budget.emoji}</Text>
          </View>
          <View>
            <Text style={styles.budgetTitle}>{budget.name}</Text>
            <Text style={styles.date}>{formattedDate}</Text>
          </View>
        </View>

        <View style={styles.btn}>
          <Text style={{ color: "#A3E535", marginTop: 5 }}>
            ${budget.amount}
          </Text>
          <Text
            style={{
              marginTop: 5,
            }}
          >
            <Entypo name="chevron-thin-right" size={20} color="#d3d3d3" />
          </Text>
        </View>
      </View>
    </Pressable>
  );
};

export default BudgetCard;

const styles = StyleSheet.create({
  budgetCard: {
    // backgroundColor: "#262626",
    paddingVertical: 8,
    // borderRadius: 10,
  },
  budgetDetails: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  budgetTitle: {
    color: "#e1e1e1",
    fontSize: hp(2.5),
    fontWeight: "600",
    textTransform: "capitalize",
  },
  budgetAmount: {
    color: "#A3E535",
    fontSize: hp(2.8),
    fontWeight: "bold",
  },
  emojiBox: {
    backgroundColor: "#3a3a3a",
    borderRadius: 100,
    height: hp(6.5),
    width: wp(14),
    justifyContent: "center",
    alignItems: "center",
  },
  budgetEmoji: {
    fontSize: hp(2.8),
  },
  line: {
    width: wp(81.5),
    height: hp(1),
    backgroundColor: "#CBD5E1",
    borderRadius: 50,
    marginTop: 8,
  },
  innerLine: {
    width: wp(40),
    height: hp(1),
    backgroundColor: "#A3E535",
    borderRadius: 50,
  },
  btn: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 2,
  },
  date: {
    color: "#9CA3AF",
    fontSize: hp(1.6),
  },
});
