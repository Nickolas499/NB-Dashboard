import mongoose from "mongoose";
import moment from "moment";

const ScanedShema = new mongoose.Schema({
    LS3: {type: Number},
    ZEISS: {type: Number},
    SHAPE: {type: Number},
    COPY_MILL: {type: Number},
    FULL_ARCH: {type: Number},
    DATE: {type: String, default: moment().format('MM/DD/YYYY')},
    USER: {type: mongoose.Schema.Types.ObjectId, ref: "User", required: true},
}, {
    versionKey: false,
    timestamps: true
})

const Scaned = mongoose.model("Scaned", ScanedShema);

export default Scaned