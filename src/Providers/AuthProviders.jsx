import { createContext, useEffect, useState } from "react";
import {
  getAuth,
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  GithubAuthProvider,
  updateProfile,
} from "firebase/auth";
import app from "./firebase.config";

export const AuthContext = createContext(null);
const auth = getAuth(app);

const googleAuthProvider = new GoogleAuthProvider();
const githubAuthProvider = new GithubAuthProvider();

const AuthProviders = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // const createStudent = (auth) => {
  //   if (UserRole.role === undefined || UserRole.role === null) {
  //     // save user to database
  //     const name = auth.displayName;
  //     const email = auth.email;
  //     const role = "student";
  //     const user = {
  //       name,
  //       email,
  //       role,
  //     };

  //     fetch(`${api.apiUrl}/addUser`, {
  //       method: "POST",
  //       headers: {
  //         "content-type": "application/json",
  //       },
  //       body: JSON.stringify(user),
  //     })
  //       .then((res) => res.json())
  //       .then((data) => {
  //         //console.log(data);
  //       });
  //   }
  // };

  const createUser = (email, password) => {
    setLoading(true);
    return createUserWithEmailAndPassword(auth, email, password);
  };

  const profileUpdate = (data) => {
    console.log("**********data************", data);
    console.log("**********name************", data.displayName);
    updateProfile(auth.currentUser, {
      displayName: data.displayName,
      photoURL: data.photoUrl,
    })
      .then(() => {
        console.log("Done");
      })
      .catch((error) => {
        // An error occurred
        console.log("***********catch error***********", error);
        // ...
      });
  };

  const signIn = (email, password) => {
    setLoading(true);
    return signInWithEmailAndPassword(auth, email, password);
  };

  const signInWithGoogle = () => {
    setLoading(true);
    return signInWithPopup(auth, googleAuthProvider);
  };
  const signInWithGithub = () => {
    setLoading(true);
    return signInWithPopup(auth, githubAuthProvider);
  };

  const logOut = () => {
    return signOut(auth);
  };

  // observer user auth state
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      //createStudent(auth);
      setLoading(false);
    });

    // stop observing while unmounting
    return () => {
      return unsubscribe();
    };
  }, []);

  const authInfo = {
    user,
    loading,
    auth,
    createUser,
    profileUpdate,
    signIn,
    signInWithGoogle,
    signInWithGithub,
    logOut,
  };

  return (
    <AuthContext.Provider value={authInfo}>{children}</AuthContext.Provider>
  );
};

export default AuthProviders;
