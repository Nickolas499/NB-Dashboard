import mongoose from "mongoose";
import moment from "moment";

const UserJobAssigmentShema = new mongoose.Schema({    
    USER: {type: String, required: true},
    ASSIGMENTS: {type: Array, default: []},
    DATE: {type: String, default: moment().format('MM/DD/YYYY')},
}, {
    versionKey: false,
    timestamps: true
})

const UserJobAssigment = mongoose.model("Asingment", UserJobAssigmentShema);
export default UserJobAssigment