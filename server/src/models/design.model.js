import mongoose from "mongoose";
import moment from "moment";

const DesignShema = new mongoose.Schema({
    IBO_DESIGNED: {type: Number},
    CROWN_REST: {type: Number},
    CEMENTE_BRIDGE_REST: {type: Number},
    FULL_ARCH_P: {type: Number},
    FULL_ARCH_F: {type: Number},
    IMPLANT_REST: {type: Number},
    IMPLANT_BRIDGE_REST: {type: Number},
    PRINTED_MODELS: {type: Number},
    DATE: {type: String, default: moment().format('MM/DD/YYYY')},
    USER: {type: mongoose.Schema.Types.ObjectId, ref: "User", required: true},
}, {
    versionKey: false,
    timestamps: true
})

const Designed = mongoose.model("Design", DesignShema);

export default Designed