import express from "express";
import {
  fromHouse,
  getAllApps,
  getAppById,
  lastWeek,
  mostRatings,
  newDevelopers,
  registerApp,
} from "../controllers/app.controller.js";

export const router = express.Router();

//GET all apps
router.get("/apps", getAllApps);

//GET single app
router.get("/app/:id", getAppById);

//POST CREATE O REGISTE AP
router.post("/app", registerApp);

// CATEGORIES QUERYS

//GET APPS LAST WEEK
router.get("/lastweek", lastWeek);

//GET APPS MOST RATING
router.get("/mostrating", mostRatings);

//GET APPS NEW DEVELOPERS
router.get("/newdevelopers", newDevelopers);

//GET APPS FROM HOUSE
router.get("/fromhouse", fromHouse);
