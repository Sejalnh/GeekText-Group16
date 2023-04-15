const express=require('express')
const  {ratingModel} = require('../models/ratingSchema')
const Books = require('../models/booksModel')

const router=express.Router();
const create_rating = async(req, res) => {
  const { username, bookId, rating } = req.body;
  let book=await Books.findOne({ISBN:bookId});
  if(book){
    let ratingObj= ratingModel({
      username,
      rating,
    });

    book.ratings.push(ratingObj);
    book.save();
    res.send("rating added")


  }else{
    return res.status(400).json({err:"invalid book id, ir must be ISBN id"})
  }

}

const get_rating=async(req,res)=>{
  const {  bookId } = req.params;
  let book=await Books.findOne({ISBN:bookId});
  if(book){

    let ratingTotal=book.ratings.reduce((a,b)=>a.rating+b.rating);
    console.log(ratingTotal)
    let total=book.ratings.length
    res.json({avg:ratingTotal/total});
  }else{
    return res.status(400).json({err:"invalid book id, ir must be ISBN id"})
  }
}

//console.log(Books)
router.post('/',create_rating);
router.get('/:bookId',get_rating)


module.exports=router;