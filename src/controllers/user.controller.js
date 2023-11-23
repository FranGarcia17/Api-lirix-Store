import express from "express";
import { User } from "../models/user.Model.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { Card } from "../models/card.model.js";

export const register = async (req, res) => {
  try {
    const { username, email, password } = req.body;
    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return res
        .status(400)
        .json({ message: "Username or email already exists" });
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
  debugger;
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

    const token = jwt.sign({ id: user._id }, "secret", { expiresIn: "1d" });
    res.json({ token, userID: user._id, email, user });
  } catch (error) {
    console.log(error.message);
    return res.status(500).send({ message: "error message" });
  }
};

export const getProfile = async (req, res) => {
  const token = req.headers.authorization;

  if (!token) {
    return res.status(401).json({ message: "Token no proporcionado" });
  }

  const token1 = token.split(" ")[1];

  try {
    const decoded = jwt.verify(token1, "secret");

    //
    const user = await User.findById(decoded.id)
    .populate({
      path: "cart", 
      model: "App",
    })
    .populate({
      path: "cardSave",
      model: "Card"
    });

    if (!user) {
      return res.status(401).json({ message: "Usuario no encontrado" });
    }

    res.json({
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
        password: user.password,
        cardSave: user.cardSave,
        cart: user.cart
      }
    });
  } catch (err) {
    console.log(err);
    return res.status(401).json({ message: "Token Invalid" });
  }
};

export const addCart = async (req, res) => {
  const {appId} = req.body;

  try {
    const user = await User.findByIdAndUpdate(
      req.user._id,
      { $addToSet: {cart : appId}},
      {new: true}
    );
    res.json(user);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Error al agregar aplicacion al carrito", error});
  }
};

export const removeItemCart = async (req, res) => {
  const {appId} = req.params;

  try {
    const user = await User.findByIdAndUpdate(
      req.user._id,
      { $pull: {cart: appId}},
      { new: true}
    );

    if(!user) {
      return res.status(404).json({ message: "User not found"});
    }

    res.json(user);
  } catch(error) {
    console.log(error);
    res.status(500).json({message: "Error", error});
  }
};

export const getCartUser = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    res.json({ cart: user.cart });
  } catch (error) {
    console.log("Error", error);
    res.status(500).json({ message: "Error", errorr });
  }
};

export const addCardUser = async (req, res) => {
  const userId = req.user._id;

  try {
    const newCard = new Card({ ...req.body, user: userId });
    await newCard.save();

    res.status(201).json(newCard);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Error" });
  }
};


