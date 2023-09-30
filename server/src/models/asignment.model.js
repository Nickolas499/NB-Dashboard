import mongoose from "mongoose";
import moment from "moment";

const AsingmentShema = new mongoose.Schema({
    LS3: {type: Boolean},
    ZEISS: {type: Boolean},
    SHAPE: {type:Boolean},
    IBOS: {type: Boolean},
    DIGI_ABUT: {type: Boolean},
    PHIS_ABUT: {type: Boolean},
    FULL_ARCH: {type: Boolean},
    DATE: {type: String, default: moment().format('MM/DD/YYYY')},
    USER: {type: mongoose.Schema.Types.ObjectId, ref: "User", required: true},
}, {
    versionKey: false,
    timestamps: true
})

const Asingment = mongoose.model("Asingment", AsingmentShema);
console.log(moment().format('MM/DD/YYYY'));
export default Asingment