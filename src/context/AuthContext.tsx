import {
  createContext,
  useState,
  useContext,
  useEffect,
  ReactNode,
} from "react";
// import { auth } from "../FirebaseConfig";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import type { User } from "firebase/auth";

export type GlobalAuthState = {
  user: User | null | undefined;
};

const initialState: GlobalAuthState = {
  user: undefined,
};

const AuthContext = createContext<GlobalAuthState>(initialState);

type Props = { children: ReactNode };

export const AuthProvider = ({ children }: Props) => {
  const [user, setUser] = useState<GlobalAuthState>(initialState);
  // const [loading, setLoading] = useState(true);

  useEffect(() => {
    try {
      const auth = getAuth();
      return onAuthStateChanged(auth, (user) => {
        setUser({ user });
      });
    } catch (error) {
      setUser(initialState);
      throw error;
    }
  }, []);

  return <AuthContext.Provider value={user}>{children}</AuthContext.Provider>;
};

export const useAuthContext = () => useContext(AuthContext);
