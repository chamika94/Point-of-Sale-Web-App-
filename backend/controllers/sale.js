import SaleModal from "../models/sale.js";


export const createTransaction = async (req, res) => {
    const items = req.body;

        for (let index = 0; index < items.length; index++) {
                const element = items[index];
                const date = new Date().toISOString();

                const newItem = new SaleModal ({
                ...element,
                creator:req.userId,
                createdAt: date,
            }); 
            await newItem.save();
        }    
        try{ 
            res.status(201).json(items);
        }catch(error){
            res.status(404).json({ message: "Something went wrong"});
        }

};





 