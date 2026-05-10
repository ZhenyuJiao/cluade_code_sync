import { createContext, useContext, useState } from 'react';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [token, setToken] = useState(localStorage.getItem('admin_token'));
  const [admin, setAdmin] = useState(() => {
    const stored = localStorage.getItem('admin_info');
    return stored ? JSON.parse(stored) : null;
  });

  const login = (token, adminInfo) => {
    localStorage.setItem('admin_token', token);
    localStorage.setItem('admin_info', JSON.stringify(adminInfo));
    setToken(token);
    setAdmin(adminInfo);
  };

  const logout = () => {
    localStorage.removeItem('admin_token');
    localStorage.removeItem('admin_info');
    setToken(null);
    setAdmin(null);
  };

  return (
    <AuthContext.Provider value={{ token, admin, login, logout, isLoggedIn: !!token }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
