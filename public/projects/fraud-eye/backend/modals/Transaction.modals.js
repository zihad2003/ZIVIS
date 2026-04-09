import mongoose from "mongoose";

const transactionSchema = new mongoose.Schema({
    transaction_id: {
        type: String,
        required: true,
        unique: true
    },
    sender_id: {
        type: String,
        required: true,
        index: true
    },
    receiver_id: {
        type: String,
        required: true,
        index: true
    },
    amount: {
        type: Number,
        required: true
    },
    timestamp: {
        type: Date,
        required: true
    }
}, { timestamps: true });

export const Transaction = mongoose.model("Transaction", transactionSchema);
