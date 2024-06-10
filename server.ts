// const express = require("express");
import express, { Request, Response } from "express";

const app = express();
// const bodyParser = require("body-parser");

// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());

const port = 3000;

const users = [
  {
    id: 1,
    email: "blah",
    password: "password",
  },
  {
    id: 2,
    email: "bruh",
    password: "password",
  },
];

app.get("/", (req: Request, res: Response) => {
  res.send("Hello Worlld!");
});

app.post("/login", async (req: Request, res: Response) => {
  const reqUsername = req.body.email;
  const reqPassword = req.body.password;

  const foundUser = await users.find((user) => {
    return user.email === reqUsername && user.password === reqPassword;
  });
  console.log(foundUser);

  res.send(JSON.stringify(foundUser));
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
