import mongoose from "mongoose";
import moment from "moment";

const registrationSchema = new mongoose.Schema({
    IBO: {type: Number},
    ABUT: {type: Number},
    FULL_ARCH_P: {type: Number},
    FULL_ARCH_F: {type: Number},
    DATE: {type: String, default:moment().format('MM/DD/YYYY')},
    USER: {type: mongoose.Schema.Types.ObjectId, ref: "User", required: true},   
}, {
    versionKey: false,
    timestamps: true
})

const Registration = mongoose.model("Registration", registrationSchema);

export default Registration


