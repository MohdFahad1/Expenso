# Budget & Expense Tracker App

A full-featured, mobile application built with **React Native (Expo)** for frontend and **Node.js + Express.js + MongoDB** for the backend. This app helps users manage their budgets, track expenses, and gain financial insights in real-time.

# Demo Video


https://github.com/user-attachments/assets/d5f3e67a-43c1-48ea-9840-e60f1687ae8e


## 🚀 Features

- **Authentication**
  - Secure login and signup functionality using **JWT**
  - Tokens stored securely using **AsyncStorage**

- **Screens & Navigation**
  - Welcome, Login, and Signup screens
  - Tab-based navigation with:
    - **Home**: Overview of top 3 budgets, expenses, total budget, total expenses, and remaining balance
    - **Expenses**: List and manage all personal expenses
    - **Budgets**: Create and view all budgets
    - **Budget Details**: View, edit, delete budgets and associated expenses
    - **Profile**: Logout and user info

- **Create & Manage Budgets**
  - Add budgets via a React Native `<Modal />` sheet
  - Assign custom emojis to each budget using a **Custom Emoji Picker** built with **React Native Reanimated**

- **Expense Management**
  - Add, view, and delete expenses
  - Filter expenses by budget
  - Real-time updates across all budget metrics

## 🧰 Tech Stack

### Frontend
- React Native (Expo)
- React Native Reanimated
- Context API

### Backend
- Node.js
- Express.js
- MongoDB


