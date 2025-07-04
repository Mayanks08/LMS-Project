import app from './app.js';
import connectionToDB from './config/dbConnection.js';
import cloudinary from "cloudinary"


const port = process.env.PORT || 5000;

cloudinary.v2.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,

})


app.listen(port,async()=>{
    await connectionToDB()
    console.log(`APP is running on localhost:${port}`);
})