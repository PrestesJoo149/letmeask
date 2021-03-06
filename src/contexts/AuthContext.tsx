import { createContext, ReactNode, useEffect, useState } from "react";
import { firebase,auth } from "../services/firebase";

type User = {
    id: string;
    name: string;
    avatar: string;
  }
  
  type AuthContextType = {
    user: User | undefined;
    singInWithGoogle: () => Promise<void>;
  
  }
  type AuthContextProviderProps = {
      children: ReactNode;
  }
  
export const AuthContext = createContext({} as AuthContextType);

export function AuthContextProvider(props: AuthContextProviderProps ){
    const [user, setUser] = useState<User>();


    useEffect(() => {

     const unsubscribe =  auth.onAuthStateChanged(user => {
          if (user) {
            const { displayName, photoURL, uid } = user
    
            if (!displayName || !photoURL) {
              throw new Error('Deu erro viado');
            }
    
            setUser({
              id: uid,
              name: displayName,
              avatar: photoURL
            })
    
          }
        })

        return () => {
            unsubscribe();
        }
      }, [])
    
      async function singInWithGoogle() {
        const provider = new firebase.auth.GoogleAuthProvider();
    
        const result = await auth.signInWithPopup(provider);
    
        console.log(result);
        if (result.user) {
          const { displayName, photoURL, uid } = result.user
    
          if (!displayName || !photoURL) {
            throw new Error('Deu erro viado');
          }
    
          setUser({
            id: uid,
            name: displayName,
            avatar: photoURL
          })
        }
    
      }
    return(
        <AuthContext.Provider value={{ user, singInWithGoogle }}>
            {props.children}
        </AuthContext.Provider>
    )
}