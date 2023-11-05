import express from "express";
import { User } from "../models/user.Model.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

export const register = async (req, res) => {
  try {
    const { username, email, password } = req.body;
    const existingUser = await User.findOne({ $or: [{username }, {email}] });
    if (existingUser) {
      return res.status(400).json({ message: "Username or email already exists" });
    }

    //Encrypting password
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({ username, email, password: hashedPassword });

    await newUser.save();
    res.status(201).json({ message: "User registered succesfully" });
  } catch (error) {
    console.log(error.message);
    return res.status(500).send({ message: error.message });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({ message: "username is invalid" });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res
        .status(400)
        .json({ message: "Username or password is incorrect" });
    }

    const token = jwt.sign({ id: user._id }, "secret");
    res.json({ token, userID: user._id, email, user});
  } catch (error) {
    console.log(error.message);
    return res.status(500).send({ message: "error message" });
  }
};

export const verifyToken = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (authHeader) {
    jwt.verify(authHeader, "secret", (err) => {
      if (err) {
        return res.sendStatus(403);
      }
      next();
    });
  }else {
    res.sendStatus(401);
  }
};
