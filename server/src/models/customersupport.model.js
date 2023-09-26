import mongoose from "mongoose";
import moment from "moment";

const ProductionSupportShema = new mongoose.Schema({
    SEND_TO_PRO:{type: Number},
    REMAINING_IN_PRO:{type: Number},   
    DATE: {type: String, default: moment().format('MM/DD/YYYY')},
    USER: {type: mongoose.Schema.Types.ObjectId, ref: "User", required: true},
}, {
    versionKey: false,
    timestamps: true
})

const ProductionSupport = mongoose.model("ProductionSupport", ProductionSupportShema);
console.log(moment().format('MM/DD/YYYY'));
export default ProductionSupport