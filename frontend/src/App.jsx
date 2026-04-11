import { useState } from "react";
import AuthPage from "./authPage/AuthPage";
import UserDashboard from "./authPage/UserDashboard";

function App() {
  const token = localStorage.getItem("token");
  return token ? <UserDashboard /> : <AuthPage />;
}

export default App;