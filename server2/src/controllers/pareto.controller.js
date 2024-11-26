import Pareto from "../models/pareto.model.js";

//=============[Get all paretos data]================//
export const getParetos = async (req, res) => {
    const paretos = await Pareto.find({ USER: req.user.id }).sort({ createdAt: -1 });
    return res.json(paretos);
};

//=============[create paretos data ]================//
export const createPareto = async (req, res) => {
    try {
        const { Sales_Order, Customer_Acount, Product_Type, Category, Reason, DATE } = req.body;
        const newPareto = new Pareto({
            Sales_Order,
            Customer_Acount,
            Product_Type,
            Category,
            Reason,
            DATE,
            USER: req.user.id,
        });
        const paretoSaved = await newPareto.save();
        return res.json(paretoSaved);
    } catch (error) {
        return res.status(404).json(["Pareto not found"]);
    }
};

//================[Get paretos data by ID]================//
export const getPareto = async (req, res) => {
    try {
        const pareto = await Pareto.findById(req.params.id);
        if (!pareto) return res.status(404).json(["Pareto not found"]);
        return res.json(pareto);
    } catch (error) {
        return res.status(404).json(["Pareto not found"]);
    }
};

//================[Update paretos data by ID]================//
export const updatePareto = async (req, res) => {
    console.log(req.params.id);
    console.log(req.body);
    try {
        const pareto = await Pareto.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        );
        if (!pareto) return res.status(404).json(["Update not found"]);
        return res.json(pareto);
    } catch (error) {
        return res.status(404).json([`Update not found ${error}`]);
    }
};

//================[Delete paretos data by ID]================//
export const deletePareto = async (req, res) => {
    console.log(req.params.id);
    const pareto = await Pareto.findByIdAndDelete(req.params.id);
    if (!pareto) return res.status(404).json(["Pareto not found"]);
    return res.status(204).json();
};