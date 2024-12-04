const mongoose = require('mongoose')
const Campground=require('../models/campground')
const cities = require('./cities');
const  {descriptors, places}=require('./seedHelper')

mongoose.connect('mongodb://127.0.0.1:27017/yelpCamp');

const db=mongoose.connection
db.on('error', console.error.bind(console, "Connection Error: "))
db.once('open', ()=>{
    console.log(`Database ${db.name} Connected!`);
})
const rSample = arr => arr[Math.floor(Math.random()* arr.length)]

const seedBD = async () => {
    await Campground.deleteMany({})
    let random1000 = Math.floor(Math.random()*1000)
    for(let i=0; i<50; i++){
        let random1000 = Math.floor(Math.random()*1000);
        let price=Math.floor(Math.random() * 2000)+1000;
        let camp =new Campground({
            location: `${cities[random1000].city}, ${cities[random1000].state}`, 
            title: `${rSample(descriptors)} ${rSample(places)}`,
            image: `https://picsum.photos/400?random=${Math.random()}`,
            description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Cupiditate velit est voluptatum praesentium, ab tempore officiis, et repudiandae explicabo ipsum placeat consequatur nesciunt vero rerum nam ullam at, amet ipsam?",
            price
        })
        await camp.save();
    }
}

seedBD().then( () => {
    mongoose.connection.close()
}
    
)