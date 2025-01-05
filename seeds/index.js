const mongoose = require('mongoose')
const Campground = require('../models/campground')
const cities = require('./cities');
const { descriptors, places } = require('./seedHelper')

mongoose.connect('mongodb://127.0.0.1:27017/yelpCamp');

const db = mongoose.connection
db.on('error', console.error.bind(console, "Connection Error: "))
db.once('open', () => {
    console.log(`Database ${db.name} Connected!`);
})
const rSample = arr => arr[Math.floor(Math.random() * arr.length)]

const seedBD = async () => {
    await Campground.deleteMany({})
    let random1000 = Math.floor(Math.random() * 1000)
    for (let i = 0; i < 300; i++) {
        let random1000 = Math.floor(Math.random() * 1000);
        let price = Math.floor(Math.random() * 2000) + 1000;
        let camp = new Campground({
            location: `${cities[random1000].city}, ${cities[random1000].state}`,
            author: '6757d73bf17e58e5f8b25284',
            title: `${rSample(descriptors)} ${rSample(places)}`,
            geometry: {
                type: "Point",
                coordinates: [
                    cities[random1000].longitude,
                    cities[random1000].latitude,
                ]
            },
            description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Cupiditate velit est voluptatum praesentium, ab tempore officiis, et repudiandae explicabo ipsum placeat consequatur nesciunt vero rerum nam ullam at, amet ipsam?",
            price,
            images: [
                {
                    url: "https://res.cloudinary.com/dndlqml2w/image/upload/v1734711710/YelpCamp/szagu8jrmo7h5y6s1wn3.jpg",
                    filename : "YelpCamp/szagu8jrmo7h5y6s1wn3",
                },
                {
                    url: "https://res.cloudinary.com/dndlqml2w/image/upload/v1734711757/YelpCamp/cjvnkglhiwbwmhtug2fy.jpg",
                    filename: "YelpCamp/cjvnkglhiwbwmhtug2fy",
                },
                {
                    url: "https://res.cloudinary.com/dndlqml2w/image/upload/v1734760661/YelpCamp/ub42fzali8uxs4hzb8es.jpg",
                    filename: "YelpCamp/ub42fzali8uxs4hzb8es",
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