const mongoose = require('mongoose')
const Schema=mongoose.Schema

const Review = require('./review')

const campgroundSchema=new Schema({
    title: String,
    price: Number   ,
    image: String,
    description: String,
    location: String,
    author: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    }, 
    reviews: [
        {
            type: Schema.Types.ObjectId, 
            ref: 'Review'
        }
    ]
})

// Delete all reviews of a deleted playground
//Middleware setup

campgroundSchema.post('findOneAndDelete', async function (doc) {
    if(doc){
        await Review.deleteMany({
            _id: { $in: doc.reviews }
        })
    }
})

module.exports=mongoose.model('Campground', campgroundSchema)