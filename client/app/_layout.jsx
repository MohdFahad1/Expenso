import { Stack } from "expo-router";

const RootLayout = () => {
  return (
    <Stack
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="(welcome)/WelcomeScreen" />
    </Stack>
  );
};

export default RootLayout;
