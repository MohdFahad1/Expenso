import { useContext, useEffect, useState } from "react";
import {
  Alert,
  KeyboardAvoidingView,
  Modal,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import axios from "axios";
import { useLocalSearchParams, useRouter } from "expo-router";
import { AuthContext } from "../../../context/AuthContext";
import ExpenseList from "../../components/ExpenseList";
import BackButton from "../../components/BackButton";
import ScreenWrapper from "../../components/ScreenWrapper";
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from "react-native-responsive-screen";
import EmojiPicker from "../../components/EmojiPicker";
import { deleteExpense } from "../../helpers/deleteExpense";

const BudgetDetailsScreen = () => {
  const { id, name } = useLocalSearchParams();
  const { user } = useContext(AuthContext);
  const router = useRouter();

  const [expenseName, setExpenseName] = useState("");
  const [amount, setAmount] = useState("");
  const [expenses, setExpenses] = useState([]);

  const [emoji, setEmoji] = useState(emoji || "💰");
  const [modalVisible, setModalVisible] = useState(false);
  const [budgetName, setBudgetName] = useState(name || "");
  const [budgetAmount, setBudgetAmount] = useState(amount || "");

  const fetchExpenses = async () => {
    try {
      const res = await axios.get(
        `http://192.168.1.19:5001/api/expense?budgetId=${id}`
      );
      setExpenses(res?.data?.expenses || []);
    } catch (error) {
      if (error.response?.status === 404) {
        console.log("No expenses found for this budget.");
        setExpenses([]);
      } else {
        console.log("Error fetching expenses:", error.message);
      }
    }
  };

  useEffect(() => {
    fetchExpenses();
    fetchSingleBudget();
  }, [id]);

  useEffect(() => {
    if (modalVisible) {
      setBudgetName(name || "");
      fetchSingleBudget();
    }
  }, [modalVisible]);

  const addExpense = async () => {
    if (!expenseName || !amount) {
      Alert.alert("Validation Error", "Please enter all fields.");
      return;
    }

    try {
      const res = await axios.post(
        "http://192.168.1.19:5001/api/expense/create",
        {
          userId: user?.id,
          budgetId: id,
          name: expenseName,
          amount: Number(amount),
        }
      );

      Alert.alert("Success", "Expense added successfully!");
      await fetchExpenses();
      setExpenseName("");
      setAmount("");
    } catch (error) {
      console.log("Error in creating expense:", error.message);
      Alert.alert("Error", "Please try again later.");
    }
  };

  const handleDelete = async (id) => {
    const res = await deleteExpense(id);
    if (res.success) {
      Alert.alert("Success", "Expense deleted successfully.");
      fetchExpenses();
    } else {
      Alert.alert("Error", "Failed to delete expense. Please try again.");
    }
  };

  const fetchSingleBudget = async () => {
    try {
      const res = await axios.get(
        `http://192.168.1.19:5001/api/budget?budgetId=${id}`
      );

      if (res.data.success) {
        const budget = res.data.budgetData;
        setBudgetName(budget.name);
        setBudgetAmount(budget.amount.toString());
        if (budget.emoji) {
          setEmoji(budget.emoji);
        }
      }
    } catch (error) {
      console.log("Failed to fetch budget details:", error.message);
      Alert.alert("Error", "Failed to fetch budget details");
    }
  };

  const updateBudget = async () => {
    if (!budgetName || !budgetAmount) {
      Alert.alert("Validation Error", "Please enter all fields.");
      return;
    }

    try {
      const res = await axios.put(
        `http://192.168.1.19:5001/api/budget/update`,
        {
          name: budgetName,
          amount: Number(budgetAmount),
          emoji,
          userId: user?.id,
          budgetId: id,
        }
      );

      Alert.alert("Success", "Budget updated successfully!");
      fetchSingleBudget();
      setModalVisible(false);
    } catch (error) {
      console.log("Error updating budget:", error.message);
      Alert.alert("Error", "Failed to update budget. Please try again.");
    }
  };

  const handleDeleteBudget = async () => {
    try {
      const res = await axios.delete(
        `http://192.168.1.19:5001/api/budget?budgetId=${id}`
      );
      if (res.data.success) {
        Alert.alert("Success", "Budget deleted successfully!");
        router.back();
      } else {
        Alert.alert("Error", "Failed to delete budget. Please try again.");
      }
    } catch (error) {
      console.log("Error deleting budget:", error.message);
      Alert.alert("Error", "Something went wrong.");
    }
  };

  return (
    <ScreenWrapper bg="#171717">
      <View
        style={{
          paddingHorizontal: 15,
        }}
      >
        <BackButton title={budgetName} />
      </View>
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      >
        <View>
          <View
            style={{
              backgroundColor: "#262626",
              padding: 12,
              borderRadius: 8,
              borderWidth: 1,
              borderColor: "#444",
              marginBottom: 20,
            }}
          >
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
                marginBottom: 16,
              }}
            >
              <Text
                style={{
                  fontSize: 19,
                  fontWeight: "bold",
                  color: "#fff",
                  textTransform: "capitalize",
                  width: "65%",
                }}
              >
                Budget Name: {budgetName}
              </Text>

              <View style={{ flexDirection: "column" }}>
                <Pressable
                  style={{
                    paddingVertical: 6,
                    paddingHorizontal: 12,
                    backgroundColor: "#4B5563",
                    borderRadius: 6,
                    marginBottom: 8,
                  }}
                  onPress={() => setModalVisible(true)}
                >
                  <Text style={{ color: "#fff", fontWeight: "600" }}>Edit</Text>
                </Pressable>

                <Pressable
                  style={{
                    paddingVertical: 6,
                    paddingHorizontal: 12,
                    backgroundColor: "#ef4444", // red for delete
                    borderRadius: 6,
                  }}
                  onPress={handleDeleteBudget}
                >
                  <Text style={{ color: "#fff", fontWeight: "600" }}>
                    Delete
                  </Text>
                </Pressable>
              </View>
            </View>
            <Text style={{ color: "#ccc", fontSize: 16 }}>
              Amount: ${" "}
              <Text style={{ color: "#fff" }}>
                {Number(budgetAmount).toLocaleString()}
              </Text>
            </Text>
            {emoji ? (
              <Text style={{ fontSize: 28, marginTop: 6 }}>{emoji}</Text>
            ) : null}
          </View>
        </View>

        <View>
          <Text style={styles.mainTitle}>Add New Expense</Text>

          <View>
            <Text style={styles.inputLabel}>Expense Name</Text>
            <TextInput
              placeholder="e.g. Home Decor"
              placeholderTextColor="#666"
              style={styles.input}
              value={expenseName}
              onChangeText={setExpenseName}
            />
          </View>

          <View style={styles.inputContainer}>
            <Text style={styles.inputLabel}>Expense Amount</Text>
            <TextInput
              placeholder="e.g. 5000"
              placeholderTextColor="#666"
              style={styles.input}
              keyboardType="numeric"
              value={amount}
              onChangeText={setAmount}
            />
          </View>

          <View style={styles.btn}>
            <Pressable style={styles.addBtn} onPress={addExpense}>
              <Text style={styles.addBtnText}>Add</Text>
            </Pressable>
          </View>
        </View>

        {/* Expenses List */}
        <View>
          <Text style={styles.expenseTitle}>Latest Expenses</Text>
          {expenses.length === 0 ? (
            <View style={styles.noExpenseContainer}>
              <Text style={styles.noExpense}>No expenses yet</Text>
            </View>
          ) : (
            <ExpenseList
              expenses={expenses}
              onDeleteExpense={handleDelete}
              scroll={false}
            />
          )}
        </View>

        {/* Modal */}
        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => setModalVisible(false)}
        >
          <View style={styles.modalOverlay}>
            <View style={styles.modalContainer}>
              <KeyboardAvoidingView>
                <Text style={styles.modalTitle}>Update Budget</Text>

                <EmojiPicker emoji={emoji} setEmoji={setEmoji} />

                <View>
                  <Text style={styles.inputBudgetName}>Budget Name</Text>
                  <TextInput
                    placeholder="e.g. Home Decor"
                    placeholderTextColor="#666666"
                    style={styles.input}
                    value={budgetName}
                    onChangeText={setBudgetName}
                  />
                </View>

                <View style={styles.inputContainer}>
                  <Text style={styles.inputBudgetName}>Budget Amount</Text>
                  <TextInput
                    placeholder="e.g. $5000"
                    placeholderTextColor="#666666"
                    style={styles.input}
                    keyboardType="numeric"
                    value={budgetAmount}
                    onChangeText={setBudgetAmount}
                  />
                </View>

                <View style={styles.btn}>
                  <Pressable
                    style={styles.modalCloseBtn}
                    onPress={() => setModalVisible(false)}
                  >
                    <Text style={styles.modalCloseBtnText}>Cancel</Text>
                  </Pressable>

                  <Pressable style={styles.modalAddBtn} onPress={updateBudget}>
                    <Text style={styles.modalAddBtnText}>Update</Text>
                  </Pressable>
                </View>
              </KeyboardAvoidingView>
            </View>
          </View>
        </Modal>
      </ScrollView>
    </ScreenWrapper>
  );
};

export default BudgetDetailsScreen;

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 15,
    backgroundColor: "#171717",
  },
  scrollContent: {
    paddingHorizontal: 15,
  },
  title: {
    color: "#fff",
    fontSize: hp(2.5),
  },
  mainTitle: {
    fontSize: hp(2.5),
    color: "#e1e1e1",
    fontWeight: "bold",
    marginBottom: 20,
  },
  emojiSelectBox: {
    backgroundColor: "#3a3a3a",
    borderRadius: 10,
    height: hp(7),
    width: wp(14.5),
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 10,
  },
  emoji: {
    fontSize: hp(3.5),
  },
  inputLabel: {
    fontSize: hp(2.6),
    fontWeight: "500",
    marginBottom: 10,
    color: "#e3e3e3",
  },

  input: {
    borderWidth: 1,
    borderColor: "#666666",
    color: "#e1e1e1",
    borderRadius: 7,
    paddingHorizontal: 10,
  },

  inputContainer: {
    marginTop: 18,
  },

  btn: {
    flexDirection: "row",
    marginTop: 20,
  },

  addBtn: {
    fontSize: hp(2.2),
    backgroundColor: "#A3E535",
    paddingVertical: hp(2),
    borderRadius: 10,
    flex: 1,
    alignItems: "center",
  },

  addBtnText: {
    color: "#313131",
    borderRadius: 10,
    fontSize: hp(2.2),
    fontWeight: "500",
  },

  expenseTitle: {
    fontSize: hp(2.5),
    color: "#e1e1e1",
    fontWeight: "bold",
    marginTop: 20,
  },
  noExpense: {
    fontSize: hp(3),
    fontWeight: "600",
    color: "#e1e1e1",
  },

  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "flex-end",
  },
  modalContainer: {
    backgroundColor: "#262626",
    padding: 20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    maxHeight: hp(85),
  },
  modalTitle: {
    fontSize: hp(2.5),
    color: "#e1e1e1",
    fontWeight: "bold",
    marginBottom: 20,
  },
  modalCloseBtn: {
    marginTop: 20,
    backgroundColor: "#3a3a3a",
    paddingVertical: 10,
    alignItems: "center",
    borderRadius: 10,
  },
  emojiSelectBox: {
    backgroundColor: "#3a3a3a",
    borderRadius: 10,
    height: hp(7),
    width: wp(14.5),
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 10,
  },
  emoji: {
    fontSize: hp(3.5),
  },
  inputBudgetName: {
    fontSize: hp(2.6),
    fontWeight: "500",
    marginBottom: 10,
    color: "#e3e3e3",
  },

  input: {
    borderWidth: 1,
    borderColor: "#666666",
    color: "#e1e1e1",
    borderRadius: 7,
    paddingHorizontal: 10,
  },

  inputContainer: {
    marginTop: 18,
  },
  // btn: {
  //   flexDirection: "row",
  //   justifyContent: "flex-end",
  //   width: wp(88),
  //   marginTop: 20,
  // },

  modalCloseBtn: {
    backgroundColor: "#3a3a3a",
    paddingVertical: hp(2),
    borderRadius: 10,
    flex: 1,
    alignItems: "center",
  },

  modalCloseBtnText: {
    color: "#e1e1e1",
    fontSize: hp(2.2),
    fontWeight: "500",
  },

  modalAddBtn: {
    fontSize: hp(2.2),
    backgroundColor: "#A3E535",
    paddingVertical: hp(2),
    borderRadius: 10,
    marginLeft: 10,
    flex: 1,
    alignItems: "center",
  },
  modalAddBtnText: {
    color: "#313131",
    borderRadius: 10,
    fontSize: hp(2.2),
    fontWeight: "500",
  },
});
