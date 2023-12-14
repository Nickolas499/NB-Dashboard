import mongoose from "mongoose";
import moment from "moment";

const JobasigmentShema = new mongoose.Schema({
    LS3: {type: Object},
    ZEISS: {type: Object},
    SHAPE: {type:Object},
    IBO_DESIGN: {type: Object},
    DIGI_ABUT: {type: Object},
    PHIS_ABUT: {type: Object},
    FULL_ARCH: {type: Object},
    DAY_OFF: {type: Object},
    DATE: {type: String, default: moment().format('MM/DD/YYYY')},
    
}, {
    versionKey: false,
    timestamps: true
})

const jobasigment = mongoose.model("jobasigment", JobasigmentShema);
export default jobasigment