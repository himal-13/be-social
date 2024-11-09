'use client'

import { auth } from "@/services/Firebase";
import { onAuthStateChanged, User } from "firebase/auth";
import React, { createContext, ReactNode, useContext, useEffect, useState } from "react";

interface userContextType{
    currentUser:User | null,
    loadCurrentUser:(user:User)=>void

}
interface props{
    children:ReactNode
}


export const userContext = createContext<userContextType | undefined>(undefined)

const UserContextProvider:React.FC<props>=({children})=>{
    const[currentUser, setCurrentUser] = useState<User |null>(null)
    
    function loadCurrentUser(user:User){
        setCurrentUser(user)

    }

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
          if (currentUser) {
            setCurrentUser(currentUser);
          } else {
            setCurrentUser(null);
          }
        });
    
        return () => unsubscribe();
      }, []);
    return(
        <userContext.Provider value={{currentUser,loadCurrentUser}}>
            {children}
        </userContext.Provider>
    )
}
export default UserContextProvider;

export const useUserContext = ():userContextType=>{
    const context = useContext(userContext)
    if(!context){
        throw new Error('somthing wrong in userContext ')
    }
    return context;
}
