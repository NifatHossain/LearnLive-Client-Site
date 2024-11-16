import React, { createContext, useEffect, useState } from 'react';
import { auth } from '../firebase/firebase.config';
import { createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile } from 'firebase/auth';
import { GoogleAuthProvider } from "firebase/auth";

export const AuthContext= createContext(null)
const provider = new GoogleAuthProvider;
const AuthProvider = ({children}) => {
    const [user,setUser]=useState(null)
    const [loading, setLoading]=useState(true)
    
    const signUp=(email,password)=>{
        setLoading(true)
        return createUserWithEmailAndPassword(auth, email, password)
    }
    const signIn=(email,password)=>{
        setLoading(true)
        return signInWithEmailAndPassword(auth, email, password)
    }
    const logOut=()=>{
        setLoading(true)
        return signOut(auth); 
    }
    const updateUserInfo=(userName,image)=>{
        return updateProfile(auth.currentUser, {
            displayName: userName, photoURL: image
          })
    }
    const googleSignIn=()=>{
        setLoading(true)
        return signInWithPopup(auth,provider);
    }
    useEffect(()=>{
        const unsubscribe= onAuthStateChanged(auth,(currentUser)=>{
            if(currentUser){
                setUser(currentUser)
            }
            else{
                setUser(null)
            }
            setLoading(false)
        })
        return ()=>{
            return unsubscribe()
        }
    },[])
    const userInfo={signUp,loading,signIn,logOut,updateUserInfo,googleSignIn,user}
    return (
        <AuthContext.Provider value={userInfo}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;