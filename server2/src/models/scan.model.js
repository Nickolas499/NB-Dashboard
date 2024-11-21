import mongoose from "mongoose";
import moment from "moment";

const ScanSchema = new mongoose.Schema({
    LS3: {type: Number},
    SHAPE:{type: Number},
    ZEISS: {type: Number},    
    FULL_ARCH: {type: Number},
    COPY_MILL: {type: Number},
    DATE: {type: String, default:moment().format('MM/DD/YYYY')},
    USER: {type: mongoose.Schema.Types.ObjectId, ref: "User", required: true},   
}, {
    versionKey: false,
    timestamps: true
})

const Scaning = mongoose.model("Scaning", ScanSchema);

export default Scaning