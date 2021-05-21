// Load required packages
import User, { IUser } from "../models/user.model";
import express, { Request, Response } from "express";

// Create endpoint /api/users for POST
const postUsers = (req: Request, res: any) => {
  // Create a new instance of the Client model
  console.log("🚀 ~ file: user.controller.ts ~ line 11 ~ postUsers ~ req.body", req.body)
  var user = new User({
    username: req.body.username,
    password: req.body.password,
  });

  user.save(function (err) {
    if (err) res.send(err);
    res.json({ message: "New user added" });
  });
};

// Create endpoint /api/users for GET
const getUsers = (req: any, res: any) => {
  // Create a new instance of the Client model
  console.log("🚀 ~ file: user.controller.ts ~ line 28 ~ getUsers ~ getUsers", getUsers)
  User.find(function (err, users) {
    if (err) res.send(err);

    res.json(users);
  });
};

export default {
  getUsers: getUsers,
  postUsers: postUsers,
};
