import TransactionModal from "../models/transaction.js";
import SaleModal from "../models/sale.js";

export const createTransaction = async (req, res) => {
        const {items, parent, total} = req.body;
       // console.log("Parent",parent);
        const date = new Date().toISOString();
        var maxNumber = 450000;
        var randomNumber = Math.floor((Math.random() * maxNumber) + 1);

        console.log(randomNumber);


        for (let index = 0; index < items.length; index++) {
                const element = items[index];

                const newItem = new SaleModal ({
                    ...element,
                    parent:parent,
                    creator:req.userId,
                    createdAt: date,
                    TransactionNumber: randomNumber,
                }); 
            await newItem.save();
        } 
                const transaction = new TransactionModal({
                    total:total,
                    parent:parent,
                    creator:req.userId,
                    createdAt: date, 
                    TransactionNumber: randomNumber,
                });
            await transaction.save();    
        
        try{ 
            res.status(201).json(items);
        }catch(error){
            res.status(404).json({ message: "Something went wrong"});
        }

};

export const getTransactions = async (req,res) => {
    try{
        const transactions = await TransactionModal.find();
        res.status(200).json(transactions); 

    }catch(error){
        res.status(404).json({message: "Something went wrong"});
    }
};

export const getItems = async (req,res) => {
    try{
        const items = await SaleModal.find();
        res.status(200).json(items); 
    }catch(error){
        res.status(404).json({message: "Something went wrong"});
    }
};

 