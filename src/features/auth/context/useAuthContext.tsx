import { createContext, ReactNode, useContext, useEffect, useState } from "react";
import { SuccessReturn } from "../api/authApi";
import avatar from "/public/images/avatar.jpg";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { useSeccessModal } from "../../../modals/seccess/hooks/useSeccessModal";
import { getUserById, saveUserToFirestore, updateUserField } from "../../../firebase/db/users";


export type User = {
    userEmail : string;
    userName : string;
    userPhoneNumber : string;
    userId : string | "none";
    role: "admin" | "user" | "anon";
    authStatus : "identify" | "not_identify";
    photoUrl : string;
}


type AuthContextType = {
    user: User;
    setUserAsIdentify : () => void;
    setUserAsNotIdentify : () => void;
    setUserData : (email: string, name: string, number: string) => void;
    setUserFullData: (newUser: Partial<User>) => void;
    setUserDataFromResponce: (result : SuccessReturn) => void;
    addUserToDataBase : (user: User) => void;
}


const AuthContext = createContext<AuthContextType | null>( null );


export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within AuthProvider");
  return context;
}

const defaultUserData : User = {
        role: "anon",
        authStatus : "not_identify",
        userEmail : "",
        userName : "user_92348", 
        userPhoneNumber : "",
        userId: "none",
        photoUrl: avatar,
    };

export const AuthProvider = ({children} : {children : ReactNode}) => {
    const {showSeccess, SeccessModalComponent} = useSeccessModal();
    let [authState, setAuthState] = useState<User>(defaultUserData);

    const setUserAsIdentify = () => {
        setAuthState((prev) => ({...prev, authStatus: "identify"}) );
    }

    const setUserAsNotIdentify = () => {
        setAuthState((prev) => ({...prev, authStatus: "not_identify"}) );
        setUserFullData(defaultUserData);
    }

    const setUserData = (email: string, name: string, number: string) => {
      setAuthState((prev) => ({...prev, userEmail: email, userName: name, userPhoneNumber: number}));
      if (authState.userId !== "none") {
        updateUserField(authState.userId, name, email, number);
      }
    }

    const setUserFullData = (newUser: Partial<User>) => {
        setAuthState(prev => ({ ...prev, ...newUser }));
    }

    const setUserDataFromResponce = async (result : SuccessReturn) => {
        const responceUser = result.body.user;
        const user = await getUserById(responceUser.uid);
        let userData;

        if(user){
            userData = {...user};
        }else{
            userData = {
                userEmail: responceUser.email,
                userName: responceUser.displayName ? responceUser.displayName : "no_name",
                userPhoneNumber: "",
                userId: responceUser.uid,
                role: "user",
                authStatus: "identify",
                photoUrl : avatar,
                //responceUser.photoURL,
            } as User;
            addUserToDataBase(userData);
        }

        setUserFullData(userData);
    }

    const addUserToDataBase = (user : User) => {
        saveUserToFirestore(user);
    }

    useEffect(() => {
        const auth = getAuth();
        const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
          if (firebaseUser) {
            const userFromDB = await getUserById(firebaseUser.uid);
            if (userFromDB) {
              setUserFullData(userFromDB);
            } else {
              // fallback, якщо немає користувача в DB
              setUserFullData({
                userEmail: firebaseUser.email || "",
                userName: firebaseUser.displayName || "no_name",
                userId: firebaseUser.uid,
                authStatus: "identify",
                role: "user",
                photoUrl: avatar,
              });
            }
            showSeccess("Раді вас знову бачити!");
          } else {
            setUserFullData(defaultUserData);
          }
        });

        return () => unsubscribe();
    }, []);


    return(
        <AuthContext.Provider value={{
            user: authState,
            setUserAsIdentify,
            setUserAsNotIdentify,
            setUserData,
            setUserFullData,
            setUserDataFromResponce,
            addUserToDataBase,
        }}>
            <SeccessModalComponent/>
            {children}
        </AuthContext.Provider>
    );
}



































