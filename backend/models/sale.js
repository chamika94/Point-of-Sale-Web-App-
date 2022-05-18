import mongoose from "mongoose";

const saleSchema = mongoose.Schema({
    itemName:String,
    quantity: Number,
    price: Number,
    creator: String,
    createAt:{
        type: Date,
        default: new Date(),
    },

});

const SaleModal = mongoose.model("Sale",saleSchema);

export default SaleModal;