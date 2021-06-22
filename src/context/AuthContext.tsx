import { useState } from "react";
import { createContext } from "react";
import { auth, firebase } from "../services/firebase";

type AuthContextType = {
    user: User;
    SignInWithGoogle: () => void;
}

type User = {
    id: string;
    name: string;
    avatar: string;
}

const AuthContext = createContext({} as AuthContextType);
const [user, setUser] = useState<User>();

export function SignInWithGoogle () {
    const provider = new firebase.auth.GoogleAuthProvider();

    auth.signInWithPopup(provider).then(result => {
        if(result.user) {
            const { displayName, photoURL, uid } = result.user;

            if (!displayName || !photoURL) {
                throw new Error("Missing information from Google Account!");
            }
            
            setUser({ id: uid, name: displayName, avatar: photoURL });
        }
    });
}

export { AuthContext };