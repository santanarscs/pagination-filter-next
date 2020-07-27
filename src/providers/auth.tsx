import React, { createContext, useState, useCallback, useContext, useEffect } from 'react';
import api from '../services/api';

interface User {
  id: string;
  name: string;
  email: string;
}

interface AuthState {
  token: string;
  user: User;
}

interface SignInCredentials {
  email: string;
  password: string;
}
interface AuthContextData {
  user: User;
  signIn(credentials: SignInCredentials): Promise<void>;
  signOut(): void;
}
const AuthContext = createContext<AuthContextData>({} as AuthContextData)

const AuthProvider: React.FC = ({children}) => {
  const [data, setData] = useState<AuthState>({} as AuthState)
  useEffect(() => {
    setData(() => {
      const token = localStorage.getItem("@Boutique-user:token");
      const user = localStorage.getItem("@Boutique-user:user");
      if(token  && user) {
        api.defaults.headers.authorization = `Berar ${token}`;
        return { token, user: JSON.parse(user)}
      }
      return {} as AuthState;
    })
  }, [])

  const signIn = useCallback(async ({ email, password }: SignInCredentials) => {
    const response = await api.post<AuthState>('sessions', {
      email,
      password,
    });
    const { token, user } = response.data;

    localStorage.setItem('@Boutique-user:token', token);
    localStorage.setItem('@Boutique-user:user', JSON.stringify(user));
    api.defaults.headers.authorization = `Berar ${token}`;
    setData({ token, user });
  }, []);

  const signOut = useCallback(() => {
    localStorage.removeItem('@Boutique-user:token');
    localStorage.removeItem('@Boutique-user:user');
    setData({} as AuthState);
  }, []);
  return (
    <>
      <AuthContext.Provider
        value={{ user: data.user, signIn, signOut }}
      >
        {children}
      </AuthContext.Provider>
    </>
  );
}
function useAuth(): AuthContextData {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
export { AuthProvider, useAuth };
