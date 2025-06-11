import {
  FlatList,
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { useCallback, useContext, useEffect, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import { useRouter } from "expo-router";
import ScreenWrapper from "../components/ScreenWrapper";
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from "react-native-responsive-screen";
import axios from "axios";
import Feather from "@expo/vector-icons/Feather";
import Entypo from "@expo/vector-icons/Entypo";
import { useFocusEffect } from "@react-navigation/native";

const Home = () => {
  const { user, token } = useContext(AuthContext);
  const router = useRouter();
  const [expenses, setExpenses] = useState([]);
  const [budgets, setBudgets] = useState([]);
  const [topExpenses, setTopExpenses] = useState([]);
  const [topBudgets, setTopBudgets] = useState([]);

  useEffect(() => {
    if (!token) {
      router.replace("(auth)/Login");
    }
  }, [token]);

  useFocusEffect(
    useCallback(() => {
      if (token) {
        fetchExpenses();
        fetchBudgets();
      }
    }, [token])
  );

  const fetchExpenses = async () => {
    try {
      const res = await axios.get(
        `http://192.168.1.19:5001/api/expense/all?userId=${user?.id}`
      );
      const fetchedExpenses = res?.data?.expenses || [];
      setExpenses(fetchedExpenses);

      const top3 = [...fetchedExpenses]
        .sort((a, b) => Number(b.amount) - Number(a.amount))
        .slice(0, 3);
      setTopExpenses(top3);
    } catch (error) {
      console.log("ERROR: ", error.message);
    }
  };

  const fetchBudgets = async () => {
    try {
      const res = await axios.get(
        `http://192.168.1.19:5001/api/budget/all?userId=${user?.id}`
      );
      const fetchedBudgets = res?.data?.budgets || [];
      setBudgets(fetchedBudgets);

      const top3 = [...fetchedBudgets]
        .sort((a, b) => Number(b.amount) - Number(a.amount))
        .slice(0, 3);
      setTopBudgets(top3);
    } catch (error) {
      console.log("ERROR: ", error.message);
    }
  };

  const totalExpenseAmount = expenses.reduce(
    (sum, item) => sum + Number(item.amount),
    0
  );

  const totalBudgetAmount = budgets.reduce(
    (sum, item) => sum + Number(item.amount),
    0
  );

  const remainingAmount = totalBudgetAmount - totalExpenseAmount;

  if (!token) {
    return null;
  }

  const renderExpenseItem = ({ item }) => (
    <View style={styles.listItem}>
      <Text style={styles.itemName}>{item.name}</Text>
      <Text style={styles.itemExpenseAmount}>$ {item.amount}</Text>
    </View>
  );

  const renderBudgetItem = ({ item }) => (
    <View style={styles.listItem}>
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          gap: 10,
        }}
      >
        <View
          style={{
            backgroundColor: "#3a3a3a",
            borderRadius: 100,
            height: hp(5.5),
            width: wp(12),
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Text
            style={{
              fontSize: hp(2.5),
            }}
          >
            {item.emoji}
          </Text>
        </View>
        <Text style={styles.itemName}>{item.name}</Text>
      </View>
      <Text style={styles.itemBudgetAmount}>$ {item.amount}</Text>
    </View>
  );

  return (
    <ScreenWrapper bg="#171717">
      <ScrollView
        contentContainerStyle={styles.container}
        keyboardShouldPersistTaps="handled"
      >
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <View>
            <Text style={styles.greeting}>Hello,</Text>
            <Text style={styles.name}>{user?.name}</Text>
          </View>
          <View
            style={{
              alignItems: "center",
              justifyContent: "center",
              height: hp(5.5),
              width: wp(12),
              backgroundColor: "#292929",
              borderCurve: "continuous",
              borderRadius: 20,
            }}
          >
            <Feather name="bell" size={24} color="#d4d4d4" />
          </View>
        </View>

        <View style={styles.imgContainer}>
          <Image
            source={require("../../assets/images/card.png")}
            resizeMode="contain"
            style={styles.img}
          />

          <View style={styles.dots}>
            <Text>
              <Entypo name="dots-three-horizontal" size={24} color="black" />
            </Text>
          </View>
          <View style={styles.total}>
            <Text>Total Balance</Text>
            <Text style={styles.remainingAmount}>$ {remainingAmount}</Text>
          </View>

          <View style={styles.income}>
            <View style={styles.iconBox}>
              <Feather name="trending-up" size={20} color="green" />
            </View>
            <View>
              <Text>Income</Text>
              <Text style={styles.incomeAmount}>$ {totalBudgetAmount}</Text>
            </View>
          </View>

          <View style={styles.expense}>
            <View style={styles.iconBox}>
              <Feather name="trending-down" size={20} color="#dc143c" />
            </View>
            <View>
              <Text>Expense</Text>
              <Text style={styles.expenseAmount}>$ {totalExpenseAmount}</Text>
            </View>
          </View>
        </View>

        {topBudgets.length === 0 ? (
          <View
            style={{
              alignItems: "center",
              justifyContent: "center",
              flex: 1,
              height: hp(50),
            }}
          >
            <Text
              style={{
                fontSize: hp(3),
                color: "#e2e2e2",
              }}
            >
              Add your first budget
            </Text>
          </View>
        ) : (
          <>
            <View style={styles.listSection}>
              <View
                style={{
                  flexDirection: "row",
                  marginVertical: 8,
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
              >
                <Text style={styles.sectionTitle}>Top Budgets</Text>
                <Pressable
                  onPress={() => router.navigate("/budget")}
                  style={{
                    backgroundColor: "#262626",
                    alignItems: "center",
                    justifyContent: "center",
                    paddingHorizontal: 10,
                    paddingVertical: 8,
                    borderCurve: "continuous",
                    borderRadius: 20,
                  }}
                >
                  <Text
                    style={{
                      color: "#d3d3d3",
                    }}
                  >
                    See All
                  </Text>
                </Pressable>
              </View>
              <FlatList
                data={topBudgets}
                keyExtractor={(item) => item._id}
                renderItem={renderBudgetItem}
                scrollEnabled={false}
                contentContainerStyle={{ flexGrow: 1 }}
              />
            </View>

            <View style={styles.listSection}>
              <View
                style={{
                  flexDirection: "row",
                  marginVertical: 8,
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
              >
                <Text style={styles.sectionTitle}>Top Expenses</Text>
                <Pressable
                  onPress={() => router.navigate("/expense")}
                  style={{
                    backgroundColor: "#262626",
                    alignItems: "center",
                    justifyContent: "center",
                    paddingHorizontal: 10,
                    paddingVertical: 8,
                    borderCurve: "continuous",
                    borderRadius: 20,
                  }}
                >
                  <Text
                    style={{
                      color: "#d3d3d3",
                    }}
                  >
                    See All
                  </Text>
                </Pressable>
              </View>
              <FlatList
                data={topExpenses}
                keyExtractor={(item) => item._id}
                renderItem={renderExpenseItem}
                scrollEnabled={false}
              />
            </View>
          </>
        )}
      </ScrollView>
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
    marginBottom: 15,
  },
  img: {
    height: hp(24),
    width: wp(92),
  },
  imgContainer: {
    position: "relative",
  },
  dots: {
    position: "absolute",
    top: 10,
    right: 30,
  },
  total: {
    position: "absolute",
    left: 20,
    top: 10,
  },
  remainingAmount: {
    fontSize: hp(3.8),
    fontWeight: "600",
  },
  income: {
    position: "absolute",
    left: 20,
    bottom: hp(5),
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  incomeAmount: {
    color: "green",
    fontSize: hp(2.2),
  },
  expense: {
    position: "absolute",
    right: 30,
    bottom: hp(5),
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  expenseAmount: {
    color: "#dc143c",
    fontSize: hp(2.2),
  },
  iconBox: {
    backgroundColor: "#c9ced5",
    borderRadius: 20,
    height: hp(5),
    width: wp(10),
    justifyContent: "center",
    alignItems: "center",
  },
  sectionTitle: {
    color: "#e3e3e3",
    fontSize: hp(2.2),
    fontWeight: "500",
    marginTop: 10,
  },
  listItem: {
    backgroundColor: "#262626",
    paddingHorizontal: 10,
    paddingVertical: 15,
    borderCurve: "continuous",
    borderRadius: 12,
    marginVertical: 8,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  itemName: {
    color: "#e3e3e3",
    fontSize: hp(2.4),
    textTransform: "capitalize",
    fontWeight: "500",
  },
  itemBudgetAmount: {
    color: "green",
    fontSize: hp(2),
  },
  itemExpenseAmount: {
    color: "#dc143c",
    fontSize: hp(2),
  },
});
