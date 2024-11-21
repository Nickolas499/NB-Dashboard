import mongoose from "mongoose";
import moment from "moment";

const DesignSchema = new mongoose.Schema({
    IBO: {type: Number},
    CRO_REST:{type: Number},
    CEM_BRI_REST: {type: Number},    
    IMP_REST: {type: Number},
    IMP_BRI_REST: {type: Number},    
    PRINT_MODEL: {type: Number},
    FULL_ARCH_PRO: {type: Number},
    FULL_ARCH_FINAL: {type: Number},
    DATE: {type: String, default:moment().format('MM/DD/YYYY')},
    USER: {type: mongoose.Schema.Types.ObjectId, ref: "User", required: true},   
}, {
    versionKey: false,
    timestamps: true
})

const Design = mongoose.model("Design", DesignSchema);

export default Design