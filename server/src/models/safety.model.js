import mongoose from "mongoose";
import moment from "moment";

const SafetyShema = new mongoose.Schema({
    SAFETY: {type: Number},
    KAMISHIBAI: {type: Number},
    REMAKED: {type: Number},
    DELAYS: {type: Number},
    DATE: {type: String, default: moment().format('MM/DD/YYYY')},
    USER: {type: mongoose.Schema.Types.ObjectId, ref: "User", required: true},
}, {
    versionKey: false,
    timestamps: true
})

const Safety = mongoose.model("Safety", SafetyShema);
console.log(moment().format('MM/DD/YYYY'));
export default Safety