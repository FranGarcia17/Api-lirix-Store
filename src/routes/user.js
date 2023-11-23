import {login, register, getProfile, getCartUser, addCardUser, addCart, removeItemCart} from "../controllers/user.controller.js"
import { verifyToken } from "../middleware/authMiddleware.js";
import express, { Router } from "express"

export const router = express.Router();

//Register User
router.post("/register", register);

//Login
router.post("/login", login);

//Get user Info
router.get("/profile", verifyToken, getProfile);

//Add app in cart User
router.post('/add', verifyToken, addCart);

//Get cart User
router.get('/cart', verifyToken, getCartUser);

//Delete app by id from cart
router.delete('/delete/:appId', verifyToken, removeItemCart);


//Mas o menos seguir esta logica como el del carrito
// router.get('cards', verifyToken, )

//Add card User
router.post('/add-cart', verifyToken, addCardUser);