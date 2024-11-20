import mongoose from "mongoose";
import moment from "moment";

const registrationSchema = new mongoose.Schema({
    PHIS_IBO: {type: Number},
    DIGI_IBO:{type: Number},
    PHIS_ABUT: {type: Number},    
    FULL_ARCH_PRO: {type: Number},
    FULL_ARCH_FINAL: {type: Number},
    DATE: {type: String, default:moment().format('MM/DD/YYYY')},
    USER: {type: mongoose.Schema.Types.ObjectId, ref: "User", required: true},   
}, {
    versionKey: false,
    timestamps: true
})

const Registration = mongoose.model("Registration", registrationSchema);

export default Registration