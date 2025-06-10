import { FlatList, Image, StyleSheet, Text, View } from "react-native";
import { useContext, useEffect, useState } from "react";
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

const Home = () => {
  const { user, token } = useContext(AuthContext);
  const router = useRouter();
  const [expenses, setExpenses] = useState([]);
  const [budgets, setBudgets] = useState([]);

  useEffect(() => {
    if (!token) {
      router.replace("(auth)/Login");
    }
    fetchExpenses();
    fetchBudgets();
  }, [token]);

  const fetchExpenses = async () => {
    try {
      const res = await axios.get(
        `http://192.168.1.19:5001/api/expense/all?userId=${user?.id}`
      );
      setExpenses(res?.data?.expenses);
    } catch (error) {
      console.log("ERROR: ", error.message);
    }
  };

  const fetchBudgets = async () => {
    try {
      const res = await axios.get(
        `http://192.168.1.19:5001/api/budget/all?userId=${user?.id}`
      );
      setBudgets(res?.data?.budgets);
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

  return (
    <ScreenWrapper bg="#171717">
      <View style={styles.container}>
        <View>
          <Text style={styles.greeting}>Hello,</Text>
          <Text style={styles.name}>{user?.name}</Text>
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
});
