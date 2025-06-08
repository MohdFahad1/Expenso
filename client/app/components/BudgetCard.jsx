import { Pressable, Text, View, StyleSheet } from "react-native";
import { useRouter } from "expo-router";
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from "react-native-responsive-screen";

const BudgetCard = ({ budget }) => {
  const router = useRouter();

  console.log("BUDET DTA:", budget.name);

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
            <Text style={{ color: "#9CA3AF" }}>3 items</Text>
          </View>
        </View>
        <Text style={styles.budgetAmount}>${budget.amount}</Text>
      </View>

      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          marginTop: 15,
        }}
      >
        <Text style={{ color: "#6B7280" }}>$1020 Spent</Text>
        <Text style={{ color: "#6B7280" }}>$2020 Remaining</Text>
      </View>

      <View style={styles.line}>
        <View style={styles.innerLine}></View>
      </View>
    </Pressable>
  );
};

export default BudgetCard;

const styles = StyleSheet.create({
  budgetCard: {
    backgroundColor: "#262626",
    padding: 16,
    borderRadius: 10,
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
});
