import axios from "axios";
import { jwtDecode } from "jwt-decode";
import { createContext, useContext, useState } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const login = async (username, password) => {
    const form = new URLSearchParams();
    form.append("username", username);
    form.append("password", password);

    const response = await axios.post(
      "http://localhost:8000/token", // или import.meta.env.VITE_API_BASE_URL + "/token"
      form,
      { headers: { "Content-Type": "application/x-www-form-urlencoded" } }
    );

    const data = response.data; // ← добави това!
    localStorage.setItem("token", data.access_token);
    setUser(jwtDecode(data.access_token));
  };

  return (
    <AuthContext.Provider value={{ user, login }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
