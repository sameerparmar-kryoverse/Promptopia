import mongoose from 'mongoose';

let isConnected = false;

export const connectToDB = async () => {
    mongoose.set('strictQuery', true);

    if (isConnected) {
        console.log('Mongoose is already connected');
        return;
    }

    try {
        const URI = process.env.MONGODB_URI;
        
        await mongoose.connect(URI, {
            dbName: 'share_prompt',
        })
        isConnected = true;

        console.log('Mongodb connected');
    } catch (error) {
        console.log(error);
    }
}