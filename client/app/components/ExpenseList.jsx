import {
  Alert,
  FlatList,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";

const ExpenseList = ({ expenses, height, onDeleteExpense }) => {
  const renderItem = ({ item }) => {
    return (
      <View style={styles.row}>
        <Text style={styles.cellName}>{item.name}</Text>
        <Text style={styles.cellAmount}>${item.amount}</Text>
        <Pressable
          style={styles.cellAction}
          onPress={() => onDeleteExpense(item._id)}
        >
          <MaterialIcons name="delete" size={22} color="#ef4444" />
        </Pressable>
      </View>
    );
  };

  return (
    <View style={[styles.container, { height: height || hp(38.5) }]}>
      <View style={[styles.row, styles.header]}>
        <Text style={[styles.cellName, styles.headerText]}>Name</Text>
        <Text style={[styles.cellAmount, styles.headerText]}>Amount</Text>
        <Text style={[styles.cellAction, styles.headerText]}>Action</Text>
      </View>

      <FlatList
        data={expenses}
        showsVerticalScrollIndicator={false}
        renderItem={renderItem}
        keyExtractor={(item) => item._id}
        ListEmptyComponent={
          <Text style={styles.emptyText}>No expenses found.</Text>
        }
      />
    </View>
  );
};

export default ExpenseList;

const styles = StyleSheet.create({
  container: {
    marginTop: hp(2),
    borderRadius: 10,
  },
  row: {
    flexDirection: "row",
    paddingVertical: hp(2),
    borderBottomWidth: 1,
    borderColor: "#333",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 10,
  },
  header: {
    borderBottomWidth: 2,
    borderColor: "#A3E535",
    backgroundColor: "#444",
    paddingHorizontal: 10,
  },
  headerText: {
    fontWeight: "bold",
    color: "#e1e1e1",
    fontSize: hp(2.2),
  },
  cellName: {
    color: "#e1e1e1",
    fontSize: hp(2),
    textTransform: "capitalize",
    width: wp(20),
  },
  cellAmount: {
    color: "#A3E535",
    fontSize: hp(2),
  },
  cellAction: {
    alignItems: "center",
    justifyContent: "center",
  },
  emptyText: {
    color: "#9ca3af",
    textAlign: "center",
    marginTop: hp(2),
    fontSize: hp(2),
  },
});
