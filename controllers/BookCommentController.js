const express=require('express')
const  {commentModel} = require('../models/commentSchema')
const Books = require('../models/booksModel')

const router=express.Router();
const create_comment = async(req, res) => {
  const { username, bookId, comment } = req.body;
  let book=await Books.findOne({ISBN:bookId});
  if(book){
    let commentObj= commentModel({
      username,
      comment,
    });

    book.comments.push(commentObj);
    book.save();
    res.send("comment added")


  }else{
    return res.status(400).json({err:"invalid book id, ir must be ISBN id"})
  }

}

const get_comment=async(req,res)=>{
  const {  bookId } = req.params;
  let book=await Books.findOne({ISBN:bookId});
  if(book){
    console.log(book)
    res.send(book.comments);
  }else{
    return res.status(400).json({err:"invalid book id, ir must be ISBN id"})
  }
}

//console.log(Books)
router.post('/',create_comment);
router.get('/:bookId',get_comment)


module.exports=router;