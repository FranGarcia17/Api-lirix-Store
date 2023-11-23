import express from "express";
import { createCard, deleteCard, getCards, updateCard} from "../controllers/card.controller.js";
import { verifyToken } from "../middleware/authMiddleware.js";

export const router = express.Router();

//get all cards of user
router.get('/cards', verifyToken, getCards);

//create new card
router.post('/cards', verifyToken, createCard);

// Update card
router.put('/cards/:id', verifyToken, updateCard);

// Delete card
router.delete('/cards/:id', verifyToken, deleteCard);