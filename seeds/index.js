if(process.env.NODE_ENV !== "production"){
    require('dotenv').config();
}

const mongoose = require('mongoose')
const Campground = require('../models/campground')
const cities = require('./cities');
const { descriptors, places } = require('./seedHelper')

const dbUrl = process.env.DB_URL;
 //'mongodb://127.0.0.1:27017/yelpCamp'
mongoose.connect(dbUrl);

const db = mongoose.connection
db.on('error', console.error.bind(console, "Connection Error: "))
db.once('open', () => {
    console.log(`Database ${db.name} Connected!`);
})
const rSample = arr => arr[Math.floor(Math.random() * arr.length)]

const seedBD = async () => {
    await Campground.deleteMany({})
    // let random1000 = Math.floor(Math.random() * 1000)
    for (let i = 0; i < 15; i++) {
        let randomNum = Math.floor(Math.random() * 528);
        let price = Math.floor(Math.random() * 2000) + 1000;
        let camp = new Campground({
            location: `${cities[randomNum].city}, ${cities[randomNum].state}`,
            author: '677b962515c827e189cbddbd',
            title: `${rSample(descriptors)} ${rSample(places)}`,
            geometry: {
                type: "Point",
                coordinates: [
                    cities[randomNum].longitude,
                    cities[randomNum].latitude,
                ]
            },
            description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Cupiditate velit est voluptatum praesentium, ab tempore officiis, et repudiandae explicabo ipsum placeat consequatur nesciunt vero rerum nam ullam at, amet ipsam?",
            price,
            images: [
                {
                    url: "https://res.cloudinary.com/dndlqml2w/image/upload/v1736193962/YelpCamp/ltuotckpg8r9vgpxf7o6.jpg",
                    filename : "YelpCamp/ltuotckpg8r9vgpxf7o6",
                },
                {
                    url: "https://res.cloudinary.com/dndlqml2w/image/upload/v1736193962/YelpCamp/vdbylgals1lhqosdzb4w.jpg",
                    filename: "YelpCamp/vdbylgals1lhqosdzb4w",
                },
                {
                    url: "https://res.cloudinary.com/dndlqml2w/image/upload/v1736193962/YelpCamp/awy0x5bgplilstuhrxkm.jpg",
                    filename: "YelpCamp/awy0x5bgplilstuhrxkm",
                }
                
            ]
        })
        await camp.save();
    }
}

seedBD().then(() => {
    mongoose.connection.close()
}

)