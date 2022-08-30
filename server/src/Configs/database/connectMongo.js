// Require external modules
const mongoose = require('mongoose')

exports.connectToMongo = async () =>
{ 
    try{
        await mongoose.connect('mongodb+srv://akshay:akshaymongodb@task.3nr94ni.mongodb.net/travel_tales',
        {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        })
        console.log("MongoDB connected…")
    }
    catch(err){
        console.log(err)
    }
}