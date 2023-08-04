import mongoose from "mongoose";
import moment from "moment";

const DesignShema = new mongoose.Schema({
    "IBO Designed": {type: Number},
    "Crown Restoration": {type: Number},
    "Cemented Bridge Restoration": {type: Number},
    "Full Arch Provicional": {type: Number},
    "Full Arch Final": {type: Number},
    "Implant Restoration": {type: Number},
    "Implant Bridge Restoration": {type: Number},
    "Printed Models": {type: Number},
    DATE: {type: String, default: moment().format('MM/DD/YYYY')},
    USER: {type: mongoose.Schema.Types.ObjectId, ref: "User", required: true},
}, {
    versionKey: false,
    timestamps: true
})

const Design = mongoose.model("Design", DesignShema);

export default Design