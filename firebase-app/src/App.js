import logo from "./logo.svg";
import "./App.css";
import { useEffect, useState } from "react";

import { initializeApp } from "firebase/app";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signOut,
  signInWithEmailAndPassword,
} from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDu4omYlqAYawteU04w_PEws4jphvBJi7o",
  authDomain: "express-auth1.firebaseapp.com",
  projectId: "express-auth1",
  storageBucket: "express-auth1.appspot.com",
  messagingSenderId: "746346003470",
  appId: "1:746346003470:web:0fd116387167b828eed05f",
};
// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

function App() {
  const email = "yayakix@yahoo.com";
  const password = "password";

  const [currentUser, setCurrentUser] = useState();

  const value = {
    currentUser,
  };

  function register(email, password) {
    // If the new account was created, the user is signed in automatically.
    return createUserWithEmailAndPassword(auth, email, password);
  }

  function login(email, password) {
    return signInWithEmailAndPassword(auth, email, password);
  }

  // const onSignin = async () => {
  //   const userCreds = await signInWithEmailAndPassword(
  //     auth,
  //     "yayakix@yahoo.com",
  //     "password"
  //   );
  //   await auth.currentUser.getIdToken();
  //   console.log("test");
  // };

  useEffect(() => {
    const fetchData = async () => {
      try {
        await signInWithEmailAndPassword(auth, "yayakix@yahoo.com", "password");
        const user = auth.currentUser;
        const token = user && (await user.getIdToken());
        console.log("token", token);
        // token working here
        const payloadHeader = {
          headers: {
            "Content-Type": "application/json",
            authorization: `Bearer ${token}`,
          },
        };
        const res = await fetch("http://localhost:3002", payloadHeader);
        console.log("reeee", res);
      } catch (e) {
        console.log(e);
      }
    };
    fetchData();
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
        {/* <button type="submit" onClick={onSignin}>
          click
        </button> */}
      </header>
    </div>
  );
}

export default App;
