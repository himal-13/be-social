'use client'

import { auth, db } from "@/services/Firebase";
import { onAuthStateChanged, User } from "firebase/auth";
import { collection, getDoc, getDocs, query, where } from "firebase/firestore";
import React, { createContext, ReactNode, useContext, useEffect, useState } from "react";

interface userContextType{
    currentUser:User | null,
    loadCurrentUser:(user:User)=>void,
    user:UserType |null

}
interface props{
    children:ReactNode
}
interface UserType{
    name:string,
    userName:string,
    email:string,
    dob:string

}


export const userContext = createContext<userContextType | undefined>(undefined)

const UserContextProvider:React.FC<props>=({children})=>{
    const[currentUser, setCurrentUser] = useState<User |null>(null)
    const[user,setUser] = useState<UserType| null>(null)
    
    
    function loadCurrentUser(user:User){
        setCurrentUser(user)
        fetchUser(currentUser?.email??'')

    }

    const fetchUser= async(email:string)=>{
        const querySnapShot = await getDocs(query(collection(db,'user'),where('email',"==",email)))
        if(!querySnapShot.empty){
            setUser(querySnapShot.docs[0].data()as UserType)
        }

    }

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
          if (currentUser) {
            setCurrentUser(currentUser);
            currentUser && fetchUser(currentUser.email??'')
          } else {
            setCurrentUser(null);
          }
        });
    
        return () => unsubscribe();
      }, []);
    return(
        <userContext.Provider value={{currentUser,loadCurrentUser,user}}>
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
