import { useState, useEffect, createContext, useContext } from "react";
import { User } from "../../shared/models";

interface AuthData {
  user?: User;
  loaded: boolean;
  logout: (callback: () => void) => void;
}

const useProvideAuth = (): AuthData => {
  const [user, setUser] = useState<User | undefined>();
  const [loaded, setLoaded] = useState<boolean>(false); // hack: use this in private routes to prevent route flickering

  async function fetchUser() {
    try {
      const response = await fetch("/api/user");
      if (response.status === 200) {
        const user = await response.json();
        setUser(user);
      }
    } catch (e) {
      console.error("User fetching failed: ", e);
    }
    setLoaded(true);
  }

  async function logout(callback: () => void) {
    try {
      const response = await fetch("/api/user/logout");
      console.log("Logout response ", response);
      if (response.status === 200) {
        setUser(undefined);
        callback();
      }
    } catch (e) {
      console.error("User logout failed: ", e);
    }
  }

  useEffect(() => {
    fetchUser();
  }, []);

  return { user, loaded, logout };
};

const AuthContext = createContext<AuthData>({} as AuthData);

export const useAuth = () => {
  return useContext(AuthContext);
};

export const ProvideAuth: React.FC = ({ children }) => {
  const auth = useProvideAuth();
  return <AuthContext.Provider value={auth}>{children}</AuthContext.Provider>;
};
