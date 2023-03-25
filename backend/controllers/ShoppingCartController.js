const express = require("express");
const router = express.Router();
const Books = require("../models/booksModel");
const User = require("../models/userModel");

class ShoppingCartController {
    static getSubtotal = async (req, res) => {
        const username= req.params.username;
        const shoppingCart = await User.findOne({username:username});
  
    let subtotal= 0.0;

    try{
    
    
    

    for(let isbn of shoppingCart.shoppingCart){
      isbn = parseInt(isbn);

      const currentBook = await Books.findOne({ISBN: isbn});
      subtotal+= parseFloat(currentBook.price);
      
      
    }
    res.status(200).json(`Shopping Cart Subtotal: $${subtotal}`);

  }catch(error){
    res.status(404).json({message: error});
  }

    };

    static getBookList = async (req, res) => {
        const username= req.params.username;
        const shoppingCart = await User.findOne({username:username});
      
        try{
          
          
          const allBooks= [];
      
      
          for(let isbn of shoppingCart.shoppingCart){
            isbn = parseInt(isbn);
      
            const currentBook = await Books.find({ISBN: isbn})
            allBooks.push(currentBook)
      
          }
          res.status(200).json(allBooks);
      
        }catch(error){
          res.status(404).json({message: error});
        }
      
    };

    static addBook = async (req, res) => {
        const username= req.params.username;
        const newISBN= req.params.ISBN;
  
  
        try{
        const test1= await Books.exists({ISBN:newISBN});
    
        if(!test1){

        return res.status(404).json({ message: `No such ISBN: ${newISBN}` });
    }else{

    const shoppingCart= await User.findOneAndUpdate({username},{$push:{shoppingCart:newISBN}})
    res.status(200).json({ message:shoppingCart});
  }

  }catch(error) {
    res.status(404).json({message: error});
  }


    };

    static deleteBook = async (req, res) => {
        const username= req.params.username;
  const newISBN= req.params.ISBN;

  try{
    const test1= await Books.exists({ISBN:newISBN});

    if(!test1){

      return res.status(404).json({ message: `No such ISBN: ${newISBN}` });
    }else{

      const shoppingCart= await User.findOneAndUpdate({username},{$pull:{shoppingCart:newISBN}})

      res.status(200).json(shoppingCart);
    }

  }catch(error) {

    res.status(404).json({message: error});
  }
  
    };
}

router.get("/:username/total", ShoppingCartController.getSubtotal);
router.get("/:username", ShoppingCartController.getBookList);
router.get("/:username/add/:ISBN", ShoppingCartController.addBook);
router.put("/:username/remove/:ISBN", ShoppingCartController.deleteBook);

module.exports = router;