import mongoose from "mongoose";
import moment from "moment";

const AsingmentShema = new mongoose.Schema({
    LS3: {type: Number},
    ZEISS: {type: Number},
    DIGI_ABUT: {type: Number},
    PHIS_ABUT: {type: Number},
    FULL_ARCH: {type: Number},
    DATE: {type: String, default: moment().format('MM/DD/YYYY')},
    USER: {type: mongoose.Schema.Types.ObjectId, ref: "User", required: true},
}, {
    versionKey: false,
    timestamps: true
})

const Asingment = mongoose.model("Asingment", AsingmentShema);
console.log(moment().format('MM/DD/YYYY'));
export default Asingment