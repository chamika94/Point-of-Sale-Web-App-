import mongoose from "mongoose";

const tourSchema = mongoose.Schema({
    code:String,
    title:String,
    price:Number,
    description: String,
    name: String,
    creator: String,
    tags:[String],
    imageFile: String,
    createAt:{
        type: Date,
        default: new Date(),
    },
    likeCount:{
        type: Number,
        default: 0,
    },
});

const TourModal = mongoose.model("Tour",tourSchema);

export default TourModal;