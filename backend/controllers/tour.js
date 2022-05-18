import TourModal from "../models/tour.js";
import mongoose from "mongoose";

export const createTour = async (req, res) => {
    const tour = req.body;
    const newTour = new TourModal({
        ...tour,
        creator:req.userId,
        createdAt: new Date().toISOString(),
    });

    try{
        await newTour.save();
        res.status(201).json(newTour);
    }catch(error){
       res.status(404).json({ message: "Something went wrong"});
    }
};

export const getTours = async (req,res) => {
    try{
        const tours = await TourModal.find();
        res.status(200).json(tours); 
    }catch(error){
        res.status(404).json({message: "Something went wrong"});
    }
};

export const getTour = async (req, res) => {
    const {id} = req.params;
  
    try {
        
        if(mongoose.Types.ObjectId.isValid(id)) {
            const tour = await TourModal.findById(id);  
            res.status(200).json(tour);
        }  

    } catch (error) {
      res.status(500).json({ message: "Something went wrong" });
      console.log(error);
    }
  };

  export const getToursByUser = async (req, res) => {
   const id = req.userId;
  
    try {
        
            const tours = await TourModal.find({creator:id}); 
            if(tours){
                res.status(200).json(tours);
            }else{
                res.status(404).json({ message: "Tour Not Found" });
            } 
            
        
    } catch (error) {
      res.status(500).json({ message: "Something went wrong" });
      console.log(error);
    }
  };

  export const updateTour = async (req, res) => {
    const {id} = req.params;
    const userId = req.userId; 
    const {title,description,imageFile,tags,creator} = req.body;
  
    try {
        if(mongoose.Types.ObjectId.isValid(id)) {
            const updatedTour ={
                title,
                description,
                imageFile,
                tags,
                creator:userId,
                _id:id,
            }
            await TourModal.findByIdAndUpdate(id,updatedTour,{new: true});  
            res.status(200).json(updatedTour);
        }else{
         res.status(404).json({ message: `No tour exist with id: ${id}` });
        }  

    } catch (error) {
      res.status(500).json({ message: "Something went wrong" });
      console.log(error);
    }
  };

  export const deleteTour = async (req, res) => {
    const {id} = req.params;
    try {
        if(!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(404).json({ message: `No tour exist with id: ${id}` });
        }else{
            await TourModal.findByIdAndRemove(id);  
            res.status(200).json({ message: "Tour delete successfully.!"});
        }  
    } catch (error) {
      res.status(500).json({ message: "Something went wrong" });
      console.log(error);
    }
  };