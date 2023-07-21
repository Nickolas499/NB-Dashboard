import mongoose from "mongoose";

const registrationSchema = new mongoose.Schema({
    IBO: {type: Number},
    ABUT: {type: Number},
    FULL_ARCH_P: {type: Number},
    FULL_ARCH_F: {type: Number},
    DATE: {type: Date, default: Date.now()},
    USER: {type: mongoose.Schema.Types.ObjectId, ref: "User", required: true},   
}, {
    versionKey: false,
    timestamps: true
})

const Registration = mongoose.model("Registration", registrationSchema);

export default Registration