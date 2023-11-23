import mongoose from "mongoose";

const userSchema = mongoose.Schema(
    {
        username: {
            type: String,
            required: true,
            unique: true,
        },
        email: {
            type: String,
            required: true,
            unique: true
        },
        password: {
            type: String,
            required: true
        },
        cart: [{type: mongoose.Schema.Types.ObjectId, ref: "App"}],
        cardSave: [{type: mongoose.Schema.Types.ObjectId, ref: "Card"}],
    }
);

export const User = mongoose.model("User", userSchema);