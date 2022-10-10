const mongoose = require('mongoose');

const Schema=mongoose.Schema;
const moviesSchema=new Schema({
    title:{
        type:String,
        lowercase:true,
        required: true,
    },
    year:{
        type:String,
        required: true,
    },
    approvedStatus:{
        type:Boolean,
        required: true,
    },
    genres:{
        type:[String],
        required: true
    },
    language:{
        type:String,
        default:'English',
        required:false,
    },
    bgPoster:{
        type:String,
        default:'https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/9178c8b8-b0b0-4e26-8fb7-63ae3ff5aebf/d9lb7db-972dfb99-2953-47ef-88ea-2c8c76fdac5c.png/v1/fill/w_1377,h_580,q_70,strp/space_background_2_by_vav17_d9lb7db-pre.jpg?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7ImhlaWdodCI6Ijw9MTA4MCIsInBhdGgiOiJcL2ZcLzkxNzhjOGI4LWIwYjAtNGUyNi04ZmI3LTYzYWUzZmY1YWViZlwvZDlsYjdkYi05NzJkZmI5OS0yOTUzLTQ3ZWYtODhlYS0yYzhjNzZmZGFjNWMucG5nIiwid2lkdGgiOiI8PTI1NjAifV1dLCJhdWQiOlsidXJuOnNlcnZpY2U6aW1hZ2Uub3BlcmF0aW9ucyJdfQ.yzxSOxCuKeaz_mFXX3PeIP8xArYeXrkrH2zmJcJ4RbU'
    },
    cast:{
        type:[String],
        required: false
    },

    plot:{
        type:String,
        required: false,
    },
    runtime:{
        type:String,
        default:'3hrs 0',
        required: false,
    },

    poster:{
        type:String,
        required: false,

    },
    reviews:{
        type:[String],
        ref:'Review'
    },
    addedBy:{
        username:{
            type:String,
            required: true,
        },
    },
    rating:{
        type:Number,
        default:0,
        min:0,
        max:10,
    }
        });
module.exports=mongoose.model('movie',moviesSchema)