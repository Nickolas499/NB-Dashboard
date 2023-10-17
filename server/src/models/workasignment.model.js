import mongoose from "mongoose";
import moment from "moment";

const WorkAsingmentShema = new mongoose.Schema({
    LS3: {type: Number},
    ZEISS: {type: Number},
    SHAPE: {type:Number},
    IBOS: {type: Number},
    DIGI_ABUT: {type: Number},
    PHIS_ABUT: {type: Number},
    FULL_ARCH: {type: Number},
    DATE: {type: String, default: moment().format('MM/DD/YYYY')}    
}, {
    versionKey: false,
    timestamps: true
})

const workasingment = mongoose.model("workasingment", WorkAsingmentShema);
export default workasingment