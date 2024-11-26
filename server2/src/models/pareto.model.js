import mongoose from "mongoose";
import moment from "moment";

const ParetoSchema = new mongoose.Schema({
    Sales_Order: {type: Number},
    Customer_Acount:{type: Number},
    Product_Type: {type: String},    
    Category: {type: String},
    Reason: {type: String},
    DATE: {type: String, default:moment().format('MM/DD/YYYY')},
    USER: {type: mongoose.Schema.Types.ObjectId, ref: "User", required: true},   
}, {
    versionKey: false,
    timestamps: true
})

const Pareto = mongoose.model("Pareto", ParetoSchema);

export default Pareto