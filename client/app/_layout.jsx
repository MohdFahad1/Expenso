import { Stack } from "expo-router";
import { AuthProvider } from "../context/AuthContext";

const RootLayout = () => {
  return (
    <AuthProvider>
      <Stack
        screenOptions={{
          headerShown: false,
        }}
      >
        <Stack.Screen name="(welcome)/WelcomeScreen" />
        <Stack.Screen name="(auth)/Login" />
        <Stack.Screen name="(auth)/Register" />
        <Stack.Screen name="(tabs)/index" />
      </Stack>
    </AuthProvider>
  );
};

export default RootLayout;
