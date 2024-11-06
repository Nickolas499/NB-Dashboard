import mongoose from "mongoose";
import moment from "moment";

const QueueVolumeShema = new mongoose.Schema({
    LS3: {type: Number},
    ZEISS: {type: Number},
    SHAPE: {type:Number},
    IBO_DESIGN: {type: Number},
    DIGI_ABUT: {type: Number},
    PHIS_ABUT: {type: Number},
    FULL_ARCH: {type: Number},
    DATE: {type: String, default: moment().format('MM/DD/YYYY')}    
}, {
    versionKey: false,
    timestamps: true
})
const QueueVolume = mongoose.model("QueueVolume", QueueVolumeShema);
export default QueueVolume