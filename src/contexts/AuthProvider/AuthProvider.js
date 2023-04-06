import React, { createContext, useEffect, useState } from 'react';
import {createUserWithEmailAndPassword, getAuth, onAuthStateChanged, sendEmailVerification, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile} from 'firebase/auth';
import app from '../../firebase/firebase.config';


export const AuthContext = createContext();
const auth = getAuth(app);

const AuthProvider = ({children}) => {

    const [user , setUser] = useState(null);
    const [loading , setLoading]= useState(true);


   

    const providerLogin = (provider)=>{
        setLoading(true);
        return signInWithPopup(auth , provider);

    }

    const createUser = (email , password)=>{
        setLoading(true);
        return createUserWithEmailAndPassword(auth , email ,password);
    }

    const signIn =(email , password)=>{
        setLoading(true);
        return signInWithEmailAndPassword(auth , email, password)
    }

    const updateUserProfile = (profile) =>{
        return updateProfile(auth.currentUser , profile);
    }

    const varifyEmail =()=>{
        return sendEmailVerification(auth.currentUser);
    }

    const logOut =()=>{
        setLoading(true);
        return signOut(auth);
    }

    useEffect( ()=>{
        const  unsubcribe = onAuthStateChanged( auth , (currentUser) =>{
            console.log('user inside state change' , currentUser);
           // setUser(currentUser);

            //jodi email varification kori aii conditon dite hobe
            if(currentUser === null || currentUser.emailVerified){
                setUser(currentUser);
            }
            setLoading(false);
        });

        
        
        return () =>{
            unsubcribe();
        }
    },[])

    const authInfo = {user , providerLogin , logOut , createUser , signIn , loading ,updateUserProfile , varifyEmail ,  setLoading};

    return (
        <AuthContext.Provider value={authInfo}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;