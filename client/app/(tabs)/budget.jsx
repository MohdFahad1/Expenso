import {
  FlatList,
  StyleSheet,
  Text,
  View,
  ActivityIndicator,
} from "react-native";
import { useContext, useEffect, useState } from "react";
import ScreenWrapper from "../components/ScreenWrapper";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import axios from "axios";
import { AuthContext } from "../../context/AuthContext";

const Budget = () => {
  const { user } = useContext(AuthContext);
  const [budgets, setBudgets] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchBudgets = async () => {
      setLoading(true);
      try {
        const res = await axios.get(
          `http://192.168.1.19:5001/api/budget/all?userId=${user?.id}`
        );
        setBudgets(res?.data?.budgets || []);
      } catch (error) {
        console.log("Error fetching budgets: ", error.message);
      } finally {
        setLoading(false);
      }
    };

    if (user?.id) {
      fetchBudgets();
    }
  }, [user]);

  const renderItem = ({ item }) => (
    <View style={styles.budgetCard}>
      <View style={styles.budgetDetails}>
        <View style={{ flexDirection: "row", gap: 10 }}>
          <View style={styles.emojiBox}>
            <Text style={styles.budgetEmoji}>{item.emoji}</Text>
          </View>
          <View>
            <Text style={styles.budgetTitle}>{item.name}</Text>
            <Text style={{ color: "#9CA3AF" }}>3 items</Text>
          </View>
        </View>
        <Text style={styles.budgetAmount}>${item.amount}</Text>
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
    </View>
  );

  return (
    <ScreenWrapper bg="#171717">
      <View style={styles.container}>
        <Text style={styles.mainText}>My Budgets</Text>

        {loading ? (
          <ActivityIndicator size="large" color="#A3E535" />
        ) : (
          <FlatList
            data={budgets}
            renderItem={renderItem}
            keyExtractor={(item) => item._id}
            contentContainerStyle={
              budgets.length === 0 ? styles.emptyContainer : styles.list
            }
            ListEmptyComponent={
              <Text style={styles.emptyText}>No budgets found.</Text>
            }
          />
        )}
      </View>
    </ScreenWrapper>
  );
};

export default Budget;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: wp(5),
    paddingTop: hp(2),
  },
  mainText: {
    color: "#e1e1e1",
    fontSize: hp(4),
    fontWeight: "bold",
    marginBottom: hp(2),
  },
  list: {
    paddingBottom: hp(2),
    gap: 12,
  },
  emptyContainer: {
    flexGrow: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  emptyText: {
    color: "#888",
    fontSize: hp(2),
    marginTop: 20,
    textAlign: "center",
  },
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
    borderRadius: "50%",
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
