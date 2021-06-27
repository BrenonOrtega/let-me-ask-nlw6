import { ReactNode, useEffect, useState } from "react";
import { createContext } from "react";
import { auth, firebase } from "../services/firebase";

type User = {
  id?: string;
  name?: string;
  avatar?: string;
};

type AuthContextType = {
  user: User | undefined;
  signInWithGoogle: () => Promise<void>;
};

type AuthContextProviderProps = {
  children: ReactNode;
};

const authContextDefaultValues: AuthContextType = {
  user: { id: "", avatar: "", name: "" },
  signInWithGoogle: async () => {},
};

export const AuthContext = createContext(({} = authContextDefaultValues));

export function AuthContextProvider(props: AuthContextProviderProps) {
  const [user, setUser] = useState<User>();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        const { displayName, photoURL, uid } = user;
        if (!displayName || !photoURL) {
          throw new Error("Missing information from Google account.");
        }

        setUser({
          id: uid,
          avatar: photoURL,
          name: displayName,
        });
      }
    });

    return () => {
      unsubscribe();
    };
  }, []);

  async function signInWithGoogle() {
    const provider = new firebase.auth.GoogleAuthProvider();
    const result = await auth.signInWithPopup(provider);

    if (result.user) {
      const { displayName, photoURL, uid } = result.user;

      if (!displayName || !photoURL) {
        throw new Error("Missing information from Google Account!");
      }

      setUser({ id: uid, name: displayName, avatar: photoURL });
    }
  }

  return (
    <AuthContext.Provider value={{ user, signInWithGoogle }}>
      {props.children}
    </AuthContext.Provider>
  );
}
