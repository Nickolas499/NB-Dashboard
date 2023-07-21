import mongoose from 'mongoose';

export const connectdb = async () => {
    try {
        await mongoose.connect('mongodb://0.0.0.0:27017/NB_Server');
        console.log('Connected to MongoDB');
    } catch (error) {
        console.log(error);
    }
};