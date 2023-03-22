import { createContext, useState, useContext, useEffect } from "react";
import { auth } from "../FirebaseConfig";
import { User } from "firebase/auth";

const AuthContext = createContext("");

export function useAuthContext() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }: any) {
  const [user, setUser] = useState<User | null>();
  const [loading, setLoading] = useState(true);

  const value: any = {
    user,
    loading,
  };

  useEffect(() => {
    console.log("ss");
    const unsubscribed = auth.onAuthStateChanged((user) => {
      setUser(user);
      console.log(value);
    });
    return () => {
      unsubscribed();
    };
  }, []);

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}
