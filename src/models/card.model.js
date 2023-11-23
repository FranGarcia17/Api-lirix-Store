import mongoose from "mongoose";

const cardSchema = mongoose.Schema(
    {
        type: {
            type: String,
            required: true
        },
        numCard: {
            type: Number,
            requierd: true
        },
        date: {
            type: Date,
            required: true
        },
        cvv : {
            type: Number,
            required: true
        },
        nameProperty: {
            type: String,
            required: true
        },
        cp: {
            type: Number,
            required: true
        },
        city: {
            type: String,
            required: true,
        },
        street1: {
            type: String,
            required: true
        },
        street2: {
            type: String
        },
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true,
        },
    });

export const Card = mongoose.model("Card", cardSchema);