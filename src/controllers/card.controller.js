import express from "express";
import { Card } from "../models/card.model.js";
import { verifyToken } from "../middleware/authMiddleware.js";
import { User } from "../models/user.Model.js";

export const getCards = async (req, res) => {
  try {
    const cards = await Card.find({ user: req.user._id });
    res.status(200).json(cards);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Error try get Cards", error });
  }
};

export const createCard = async (req, res) => {
  const userId = req.user._id;

  try {
    const newCard = new Card({ ...req.body, user: userId });
    await newCard.save();

    // const user = await User.findById(userId);
    // user.cardSave.push(newCard);
    // await user.save();
    res.status(201).json(newCard);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Error" });
    //   console.error("Error al agregar tarjeta:", error);

    //   if (error.name === "ValidationError") {
    //     res
    //       .status(400)
    //       .json({ message: "Error de validación al agregar tarjeta", error });
    //   } else {
    //     res.status(500).json({ message: "Error try add new card", error });
    //   }
    // }
  }
};

export const updateCard = async (req, res) => {
  try {
    const card = await Card.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    );
    res.status(200).json(card);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Error try update Card", error });
  }
};

export const deleteCard = async (req, res) => {
  try {
    await Card.findByIdAndRemove(req.params.id);
    res.status(200).json({ message: "Card delete" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Error try delete card" });
  }
};
