import mongoose from "mongoose";

const transactionSchema = mongoose.Schema({

    TransactionNumber: Number,
    total: Number,
    parent: String,
    creator: String,
    createAt:{
        type: Date,
        default: new Date(),
    },

});

const TransactionModal = mongoose.model("Transaction",transactionSchema);

export default TransactionModal;