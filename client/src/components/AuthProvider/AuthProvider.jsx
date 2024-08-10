import { AuthContext } from "./useAuth";
import { useEffect, useState } from "react";

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);

  const login = async () => {
    setUser(null);
  };

  const logout = () => {
    localStorage.removeItem("authToken");
    setUser(null);
  };

  useEffect(() => {
    const token = localStorage.getItem("authToken");
    if (token) {
      // fetch user data
    }
  }, []);

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export default AuthProvider;
