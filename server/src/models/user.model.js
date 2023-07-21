import mongoose from "mongoose";


const userShema = new mongoose.Schema({
    username: {type: String, required: true, trim: true, unique: true},
    fname: {type: String, required: true},
    lname: {type: String, required: true},
    email: {type: String, required: true, unique: true},
    password: {type: String, required: true},
    access: {type: String, required: true}
}, {versionKey: false,timestamps: true});



export default mongoose.model('User', userShema);



