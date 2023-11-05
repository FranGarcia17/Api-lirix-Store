import express from "express";
import { App } from "../models/app.Model.js";
import { User } from "../models/user.Model.js";
import mongoose, { mongo } from "mongoose";

export const getAllApps = async (req, res) => {
  try {
    const apps = await App.find({});

    return res.status(200).json({
      count: apps.length,
      data: apps,
    });
  } catch (error) {
    console.log(error.message);
    res.status(500).send({ message: error.message });
  }
};

export const getAppById = async (req, res) => {
  try {
    const { id } = req.params;

    const app = await App.findById(id);

    return res.status(200).json(app);
  } catch (error) {
    console.log(error.message);
    res.status(500).send({ message: error.message });
  }
};

export const registerApp = async (req, res) => {
  try {
    const {
      program,
      programType,
      logo,
      company,
      developer,
      totalDonwloads,
      published,
      license,
      cost,
      updated,
      rating,
      gallery,
      typeAdquisition,
      video,
      webPage,
      comments,
      house,
      isNewDeveloper,
      description,
    } = req.body;

    if (
      (!program,
      !programType,
      !logo,
      !company,
      !developer,
      !totalDonwloads,
      !published,
      !license,
      !cost,
      !updated,
      !rating,
      !gallery,
      !typeAdquisition,
      !video,
      !webPage,
      !comments,
      !house,
      !isNewDeveloper,
      !description)
    ) {
      return res.status(400).send({
        message: "Send all required fields",
      });
    }

    const newApp = {
      program,
      programType,
      logo,
      company,
      developer,
      totalDonwloads,
      published,
      license,
      cost,
      updated,
      rating,
      gallery,
      typeAdquisition,
      video,
      webPage,
      comments,
      house,
      isNewDeveloper,
      description,
    };

    const app = await App.create(newApp);
    return res.status(201).send(app);
  } catch (error) {
    console.log(error.message);
    res.status(500).send({ message: error.message });
  }
};

export const lastWeek = async (req, res) => {
  try {
    const originalDate = new Date();
    let year = originalDate.getFullYear();
    let month = originalDate.getUTCMonth();
    let days = originalDate.getUTCDate() - 7;
    let hours = originalDate.getHours();
    let minutes = originalDate.getMinutes();
    let seconds = originalDate.getSeconds();

    let finalDate = new Date(year, month, days, hours, minutes, seconds);

    const apps = await App.find({
      published: { $gt: finalDate, $lt: originalDate },
    }).limit(10);
    return res.status(200).json({
      count: apps.length,
      data: apps,
    });
  } catch (error) {
    console.log(error.message);
    res.status(500).send({ message: error.message });
  }
};

export const mostRatings = async (req, res) => {
  try {
    const mostRatings = await App.find({ rating: 5 }).limit(10);
    return res.status(200).send(mostRatings);
  } catch (error) {
    console.log(error.message);
    res.status(500).send({ message: error.message });
  }
};

export const newDevelopers = async (req, res) => {
  try {
    const appsNewDevelopers = await App.find({ isNewDeveloper: true }).limit(
      10
    );
    return res.status(200).send(appsNewDevelopers);
  } catch (error) {
    console.log(error.message);
    res.status(500).send({ message: error.message });
  }
};

export const fromHouse = async (req, res) => {
  try {
    const appsFromHouse = await App.find({ house: true }).limit(10);
    return res.status(200).send(appsFromHouse);
  } catch (error) {
    console.log(error.message);
    res.status(500).send({ message: error.message });
  }
};

export const saveApp = async (req, res) => {
  const app = await App.findById(req.body.appId);
  const user = await User.findById(req.body.userId);

  try {
    user.savedApps.push(app);
    await user.save();
    res.status(201).json({savedApps : user.savedApps});
  } catch (err) {
    res.status(500).json(err);
  }
};

export const savedAppsById = async (req, res) => {
  try {
    const user = await User.findById(req.params.userId);
    const savedApps = await App.find({
      _id: { $in: user.savedApps },
    });

    console.log(savedApps);
    res.status(201).json({ savedApps });
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
};
