import React, { createContext, useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);

  useEffect(() => {
    const loadToken = async () => {
      console.log("[AuthProvider] Loading token from AsyncStorage...");
      try {
        const savedToken = await AsyncStorage.getItem("token");

        if (savedToken) {
          console.log("[AuthProvider] Token found:", savedToken);
          setToken(savedToken);
        } else {
          console.log("[AuthProvider] No token found");
        }
      } catch (error) {
        console.error("[AuthProvider] Error loading token:", error);
      }
    };

    loadToken();
  }, []);

  const login = async (userData, token) => {
    console.log("[AuthProvider] Logging in user:", userData);
    setUser(userData);
    setToken(token);
    try {
      await AsyncStorage.setItem("token", token);
      console.log("[AuthProvider] Token saved to AsyncStorage");
    } catch (error) {
      console.error("[AuthProvider] Error saving token:", error);
    }
  };

  const logout = async () => {
    console.log("[AuthProvider] Logging out user");
    setUser(null);
    setToken(null);
    try {
      await AsyncStorage.removeItem("token");
      console.log("[AuthProvider] Token removed from AsyncStorage");
    } catch (error) {
      console.error("[AuthProvider] Error removing token:", error);
    }
  };

  return (
    <AuthContext.Provider value={{ user, login, token, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
