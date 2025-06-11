import React from "react";
import { Dimensions, FlatList, StyleSheet, Text, View } from "react-native";
import { PieChart } from "react-native-chart-kit";
import { heightPercentageToDP } from "react-native-responsive-screen";

const screenWidth = Dimensions.get("window").width;

const Chart = ({ expenses, budgets }) => {
  const chartData = budgets.map((budget) => {
    const expenseForBudget = expenses
      .filter((exp) => exp.budgetId === budget._id)
      .reduce((sum, exp) => sum + Number(exp.amount), 0);

    return {
      name: budget.name,
      expense: expenseForBudget,
      color: getThemeColorVariant(),
      legendFontColor: "#ffffff",
      legendFontSize: 14,
    };
  });

  return (
    <View style={styles.container}>
      {/* Pie Chart */}
      <View style={styles.chartWrapper}>
        <PieChart
          data={chartData}
          width={screenWidth * 0.55} // fixed width for chart
          height={260}
          chartConfig={{
            backgroundColor: "#171717",
            backgroundGradientFrom: "#171717",
            backgroundGradientTo: "#171717",
            color: (opacity = 1) => `rgba(163, 229, 53, ${opacity})`,
            labelColor: () => "#ffffff",
          }}
          accessor="expense"
          backgroundColor="transparent"
          paddingLeft="0"
          center={[0, 0]}
          hasLegend={false}
        />
      </View>

      {/* Legend */}
      <View style={styles.legendContainer}>
        <FlatList
          data={chartData}
          keyExtractor={(item, index) => index.toString()}
          showsVerticalScrollIndicator={true}
          renderItem={({ item }) => (
            <View style={styles.legendItem}>
              <View
                style={[styles.legendColor, { backgroundColor: item.color }]}
              />
              <Text style={styles.legendText}>{item.name}</Text>
            </View>
          )}
        />
      </View>
    </View>
  );
};

export default Chart;

const styles = StyleSheet.create({
  container: {
    marginTop: 20,
    paddingHorizontal: 16,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  chartWrapper: {
    width: screenWidth * 0.55, // fix width to 55% screen width
    alignItems: "center",
    justifyContent: "center",
  },
  legendContainer: {
    width: screenWidth * 0.35,
    paddingLeft: 16,
    maxHeight: heightPercentageToDP(25),
    borderWidth: 1,
    borderColor: "#e1e1e1",
  },
  legendItem: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 12,
  },
  legendColor: {
    width: 16,
    height: 16,
    borderRadius: 8,
    marginRight: 8,
  },
  legendText: {
    color: "#A3E535",
    fontSize: 16,
  },
});

const getThemeColorVariant = (() => {
  let hue = 74;
  let lightnessStep = 0;

  return () => {
    const saturation = 85;
    const baseLightness = 45;
    const lightness = baseLightness + ((lightnessStep * 10) % 40) - 20;
    const adjustedHue = (hue + lightnessStep * 5) % 360;
    lightnessStep++;

    return `hsl(${adjustedHue}, ${saturation}%, ${lightness}%)`;
  };
})();
