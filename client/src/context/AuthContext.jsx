import { createContext, useContext, useEffect, useState } from 'react';
import api from '../services/api.js';

const AuthContext = createContext();
export const useAuth = () => useContext(AuthContext);

const parseSafe = (value) => {
  try { return JSON.parse(value); } catch (error) { return null; }
};

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => parseSafe(localStorage.getItem('user')));
  const [token, setToken] = useState(() => localStorage.getItem('token'));
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (token) {
      api.defaults.headers.common.Authorization = `Bearer ${token}`;
    } else {
      delete api.defaults.headers.common.Authorization;
    }
  }, [token]);

  const saveAuth = (data) => {
    localStorage.setItem('token', data.token);
    localStorage.setItem('user', JSON.stringify(data.user));
    setToken(data.token);
    setUser(data.user);
    api.defaults.headers.common.Authorization = `Bearer ${data.token}`;
  };

  const login = async (email, password) => {
    setLoading(true);
    try {
      const normalizedEmail = email.trim().toLowerCase();
      const { data } = await api.post('/auth/login', { email: normalizedEmail, password: password.trim() });
      saveAuth(data);
      return data;
    } finally {
      setLoading(false);
    }
  };

  const register = async (name, email, password) => {
    setLoading(true);
    try {
      const trimmedName = name.trim();
      const normalizedEmail = email.trim().toLowerCase();
      const { data } = await api.post('/auth/register', {
        name: trimmedName,
        email: normalizedEmail,
        password: password.trim(),
      });
      saveAuth(data);
      return data;
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setToken(null);
    setUser(null);
    delete api.defaults.headers.common.Authorization;
  };

  return (
    <AuthContext.Provider value={{ user, token, loading, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
}
