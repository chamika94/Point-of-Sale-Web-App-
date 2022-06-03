import mongoose from "mongoose";

const saleSchema = mongoose.Schema({
    TransactionNumber:Number,
    itemName:String,
    quantity: Number,
    price: Number,
    parent:String,
    creator:String,
    createAt:{
        type: Date,
        default: new Date(),
    },

});

const SaleModal = mongoose.model("Sale",saleSchema);

export default SaleModal;