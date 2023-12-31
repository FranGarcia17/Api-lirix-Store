import mongoose from "mongoose";

const appSchema = mongoose.Schema(
  {
    program: {
      type: String,
      required: true,
    },
    programType: [
      {
        name: String,
      },
    ],
    logo: {
      type: String,
    },
    company: {
      type: String,
    },
    developer: {
      type: String,
      required: true,
    },
    totalDonwloads: {
      type: Number,
      required: true,
    },
    published: {
      type: Date,
      required: true,
    },
    License: {
      type: String,
    },
    cost: {
      type: Number,
    },
    updated: {
      type: String,
    },
    rating: {
      type: Number,
    },
    gallery: [
      {
        name: String,
        link: String,
      },
    ],
    typeAdqusition: {
      type: String,
    },
    video: {
      type: String,
    },
    webPage: {
      type: String,
    },
    comments: [
      {
        name: String,
        comment: String,
        date: Date,
      },
    ],
    house: {
      type: Boolean,
    },
    isNewDeveloper: {
      type: Boolean,
    },
    description: {
      type: String,
    },
    aproxSize: {
      type: Number,
    },
  },
  { timestamps: true }
);

export const App = mongoose.model("App", appSchema);
