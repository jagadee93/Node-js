const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ReviewSchema =new Schema({
    uniqueId:{
        type: String,
        required: true,
    },
    review:{
        type:String,
        required:true
    },
    rating:{
        type:String,
        required:true
    },
    MovieId:{
        type:Schema.Types.ObjectId,
        ref:'movie',
        required:true
    },
    userInfo:{
        name:{
            type:String,
            required:true,
        },
        _id:{ 
            type:Schema.Types.ObjectId,
            ref:'user'
        },
    },
    postedAt:{
        type:Date,
        immutable:true,
        default:() =>Date.now()
    },
    updatedAt:{
        type:Date,
        default:() =>Date.now()
    },
  
})
module.exports = mongoose.model("Review",ReviewSchema);