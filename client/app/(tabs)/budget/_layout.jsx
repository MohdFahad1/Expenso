import { Stack } from "expo-router";

export default function BudgetStack() {
  return (
    <Stack
      screenOptions={{
        headerShown: false,
        headerStyle: { backgroundColor: "#171717" },
        headerTintColor: "#fff",
      }}
    />
  );
}
