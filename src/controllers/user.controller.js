import express from "express";
import { User } from "../models/user.Model.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

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

// export const getProfile = (req, res) => {
//   const token = req.headers.authorization;
//   const token1 = token.split(' ')[1];

//   if (!token) {
//     return res.status(401).json({ message: "Token no proporcionado" });
//   }

//   //Verificar y decodificar el Token
//   jwt.verify(token1, "secret", (err, decoded) => {
//     if (err) {
//       return res.status(401).json({ message: "Token Invalido", token });
//     }

//     const user = await User.findById(decoded.userID);

//     if(!user) {
//       return res.status(401).json({message: "Usuario no encontrado"});
//     }
//     //Obtener informacion del usuario desde la base de datos
//     // User.findById(decoded.userID, (err, user) => {
//     //   if (err || !user) {
//     //     return res.status(401).json({ message: "Usuario no encontrado" });
//     //   }

//       //enviar informacion del usuario en la respuesta
//       res.json({ user: { id: user._id, username: user.username, email: user.email, password: user.password } });
//     // });
//   });
// };

export const getProfile = async (req, res) => {
  const token = req.headers.authorization;

  if(!token) {
    return res.status(401).json({message: "Token no proporcionado"});
  }

  const token1 = token.split(' ')[1];

  try {
    const decoded = jwt.verify(token1, "secret");

    //
    const user = await User.findById(decoded.id);

    if(!user) {
      return res.status(401).json({message: "Usuario no encontrado"});
    }

    res.json({user : {id: user._id, username: user.username, email: user.email, savedApps: user.savedApps, password: user.password}});
  } catch (err) {
    console.log(err);
    return res.status(401).json({ message: "Token Invalid"});
  }
};

export const verifyToken = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (authHeader) {
    const token = authHeader.split(' ')[1]; //Extraer el token de la cabecera
    jwt.verify(token, "secret", (err) => {
      if (err) {
        return res.sendStatus(401);
      }
      next();
    });
  } else {
    res.sendStatus(401);
  }
};
