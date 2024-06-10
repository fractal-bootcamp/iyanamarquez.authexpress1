// const express = require("express");
import bodyParser from "body-parser";
import express, { Request, Response } from "express";

// Import the functions you need from the SDKs you need
import path from "path";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
import { initializeApp } from "firebase/app";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signOut,
  signInWithEmailAndPassword,
} from "firebase/auth";

// TODO: Replace the following with your app's Firebase project configuration
// See: https://firebase.google.com/docs/web/learn-more#config-object
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

// Express stuff
const expressApp = express();
// const bodyParser = require("body-parser");

expressApp.use(bodyParser.json());
expressApp.use(bodyParser.urlencoded({ extended: true }));
expressApp.use(express.json());

const port = 3000;

// / GET home page
expressApp.get("/", (req: Request, res: Response) => {
  if (getAuth().currentUser) {
    res.sendFile(path.join(__dirname, "/pages/index.html"));
  } else {
    res.sendFile(path.join(__dirname, "/pages/login.html"));
  }
});

expressApp.get("/check", (req: Request, res: Response) => {
  if (getAuth().currentUser) {
    res.send("you are signed in");
  } else {
    res.send("you are not signed in");
  }
});

// GET SIGNUP page
expressApp.get("/signup", (req: Request, res: Response) => {
  if (getAuth().currentUser) {
    res.sendFile(path.join(__dirname, "/pages/loggedin.html"));
  } else {
    res.sendFile(path.join(__dirname, "/pages/signup.html"));
  }
});

// GET lOGIN page
expressApp.get("/login", (req: Request, res: Response) => {
  if (getAuth().currentUser) {
    res.send("you ARE logged in");
  } else {
    res.sendFile(path.join(__dirname, "/pages/login.html"));
  }
});

expressApp.get("/logout", (req: Request, res: Response) => {
  if (getAuth().currentUser) {
    res.sendFile(path.join(__dirname, "/pages/logout.html"));
  } else {
    res.send("you are logged OUT");
  }
});
// GET SUCCESS page
expressApp.get("/success", (req: Request, res: Response) => {
  console.log(getAuth().currentUser);
  if (getAuth().currentUser) {
    res.sendFile(path.join(__dirname, "/pages/loggedin.html"));
  } else {
    res.sendFile(path.join(__dirname, "/pages/failed.html"));
  }
});

// POST to SIGNUP page (create new user)
expressApp.post("/signup", async (req, res) => {
  if (getAuth().currentUser) {
    res.sendFile(path.join(__dirname, "/pages/success.html"));
  } else {
    try {
      const { email, password } = req.body;

      createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential: any) => {
          // Signed in
          var user = userCredential.user;
          console.log(user);
          res.sendFile(path.join(__dirname, "/pages/success.html"));
        })
        .catch((error: any) => {
          var errorCode = error.code;
          var errorMessage = error.message;
          console.log(errorCode, errorMessage);
          console.log(error);
          res.send(errorCode);
        });
    } catch (e) {
      res.send("signup failed");
    }
  }
});

// POST to LOGIN page (sign in exisiting user)
expressApp.post("/login", async (req, res) => {
  // if i have a cookie that says i'm ALREADY loggedin
  // then redirect me, do not force me to enter my email and password
  try {
    const { email, password } = req.body;
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential: any) => {
        // Signed in
        var user = userCredential.user;
        console.log(user);
        res.redirect("/login");
      })
      .catch((error: any) => {
        var errorCode = error.code;
        var errorMessage = error.message;
        console.log(error);
        res.send("login failed");
      });
  } catch (e) {
    res.send("login failed");
  }
});

// POST to LOGOUT (sign out user)
expressApp.post("/logout", async (req, res) => {
  signOut(auth)
    .then(() => {
      getAuth().currentUser;
      res.send("logged out");
    })
    .catch((error) => {
      // An error happened.
      res.send("logout error");
    });
});

expressApp.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
