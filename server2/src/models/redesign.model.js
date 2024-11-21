import mongoose from "mongoose";
import moment from "moment";

const RedesignSchema = new mongoose.Schema({
    IBO: {type: Number},
    CRO_REST:{type: Number},
    CEM_BRI_REST: {type: Number},    
    IMP_REST: {type: Number},
    IMP_BRI_REST: {type: Number},
    FULL_ARCH_PRO: {type: Number},
    FULL_ARCH_FINAL: {type: Number},
    DATE: {type: String, default:moment().format('MM/DD/YYYY')},
    USER: {type: mongoose.Schema.Types.ObjectId, ref: "User", required: true},   
}, {
    versionKey: false,
    timestamps: true
})

const Redesign = mongoose.model("Redesign", RedesignSchema);

export default Redesign