import Redesign from "../models/redesign.model.js";

//=============[Get all redesigns data]================//
export const getRedesigns = async (req, res) => {
    const redesigns = await Redesign.find({ USER: req.user.id }).sort({ createdAt: -1 });
    return res.json(redesigns);
};

//=============[create redesigns data ]================//
export const createRedesign = async (req, res) => {
    try {
        const { IBO, CRO_REST, CEM_BRI_REST, IMP_REST, IMP_BRI_REST, FULL_ARCH_PRO, FULL_ARCH_FINAL, DATE } = req.body;
        const newRedesign = new Redesign({
            IBO,
            CRO_REST,
            CEM_BRI_REST,
            IMP_REST,
            IMP_BRI_REST,
            FULL_ARCH_PRO,
            FULL_ARCH_FINAL,
            DATE,
            USER: req.user.id,
        });
        const redesignSaved = await newRedesign.save();
        return res.json(redesignSaved);
    } catch (error) {
        return res.status(404).json(["Error At Save Data"]);
    }
};

//================[Get redesigns data by ID]================//
export const getRedesign = async (req, res) => {
    try {
        const redesign = await Redesign.findById(req.params.id);
        if (!redesign) return res.status(404).json(["Redesign not found"]);
        return res.json(redesign);
    } catch (error) {
        return res.status(404).json(["Redesign not found"]);
    }
};

//================[Update redesigns data by ID]================//
export const updateRedesign = async (req, res) => {
    console.log(req.params.id);
    console.log(req.body);
    try {
        const redesign = await Redesign.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        );
        if (!redesign) return res.status(404).json(["Update not found"]);
        return res.json(redesign);
    } catch (error) {
        return res.status(404).json([`Update not found ${error}`]);
    }
};

//================[Delete redesigns data by ID]================//
export const deleteRedesign = async (req, res) => {
    console.log(req.params.id);
    const redesign = await Redesign.findByIdAndDelete(req.params.id);
    if (!redesign) return res.status(404).json(["Redesign not found"]);
    return res.status(204).json();
};