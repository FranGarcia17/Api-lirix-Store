import {login, register} from "../controllers/user.controller.js"
import express from "express"

export const router = express.Router();

//Register User
router.post("/register", register);

//Login
router.post("/login", login);

