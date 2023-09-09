const mongoose = require('mongoose');
const Campground = require('../models/campground');
const cities = require('./cities');
const {places, descriptors} = require('./seedHelpers');

mongoose.connect('mongodb://localhost:27017/yelp-camp');

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", ()=> {
    console.log("Database connected");
})

const sample = array => array[Math.floor(Math.random() * array.length)];

const seedDB = async () =>{
    await Campground.deleteMany({});
    for(let i=0; i<300; i++){
        const random1000 = Math.floor(Math.random() * 1000);
        const price = Math.floor(Math.random()*20)+10
        const camp = new Campground({
          // Your user ID
            author: '632737f7c63de2f052abd74d',
            location: `${cities[random1000].city}, ${cities[random1000].state}`,
            title: `${sample(descriptors)} ${sample(places)}`,
            image: 'https://source.unsplash.com/collection/483251',
            description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatem doloribus optio ipsam praesentium id, laborum mollitia reiciendis illo nemo adipisci? Ullam alias officiis voluptas, hic perspiciatis ipsum distinctio minima quibusdam!',
            price,
            geometry: { 
              type: 'Point', 
              coordinates: [ 
                cities[random1000].longitude,
                cities[random1000].latitude,
              ]
             },
            images:  [
              {
                url: 'https://res.cloudinary.com/dkvtzcytj/image/upload/v1663608537/YelpCamp/srjsxx7p66xmm3viexq6.jpg',
                filename: 'YelpCamp/srjsxx7p66xmm3viexq6',
              },
              {
                url: 'https://res.cloudinary.com/dkvtzcytj/image/upload/v1663608538/YelpCamp/avwen8juzelp5xushewv.jpg',
                filename: 'YelpCamp/avwen8juzelp5xushewv',
              },
              {
                url: 'https://res.cloudinary.com/dkvtzcytj/image/upload/v1663608538/YelpCamp/xfoyyafktoo2jwa6kibx.jpg',
                filename: 'YelpCamp/xfoyyafktoo2jwa6kibx',
              }
            ]
        })
        await camp.save();
        // console.log(camp);
    }
}
seedDB().then(()=>{
    mongoose.connection.close();
})