import { AuthContext } from "./useAuth";
import { useEffect, useState } from "react";
import { loginApi } from "../../lib/auth";

const fetchUserData = async () => {
  const response = await axiosInstance.get('/me');
  return response.data;
};

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);


  const login = async (credentials) => {
    // const data = await loginApi(credentials);
    setUser(null);
  };

  const logout = () => {
    localStorage.removeItem('authToken');
    setUser(null);
  };

  useEffect(() => {
    const token = localStorage.getItem('authToken');
    if (token) {
      fetchUserData().then(userData => setUser(userData));
    }
  }, []);


  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export default AuthProvider;