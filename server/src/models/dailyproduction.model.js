import mongoose from "mongoose";
import moment from "moment";

const DailyProductionShema = new mongoose.Schema({
    LS3: {type: Number},
    ZEISS: {type: Number},
    SHAPE: {type:Number},
    IBOS: {type: Number},
    DIGI_ABUT: {type: Number},
    PHIS_ABUT: {type: Number},
    FULL_ARCH: {type: Number},
    DATE: {type: String, default: moment().format('MM/DD/YYYY')},
    USER: {type: mongoose.Schema.Types.ObjectId, ref: "User", required: true},
}, {
    versionKey: false,
    timestamps: true
})

const DailyProduction = mongoose.model("DailyProduction", DailyProductionShema);
export default DailyProduction