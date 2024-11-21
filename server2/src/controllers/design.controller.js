import Design from "../models/design.model.js";

//=============[Get all designs data]================//
export const getDesigns = async (req, res) => {
    const designs = await Design.find({ USER: req.user.id }).sort({ createdAt: -1 });
    return res.json(designs);
};

//=============[create designs data ]================//
export const createDesign = async (req, res) => {
    try {
        const { IBO, CRO_REST, CEM_BRI_REST, IMP_REST, IMP_BRI_REST, PRINT_MODEL, FULL_ARCH_PRO, FULL_ARCH_FINAL, DATE } = req.body;
        const newDesign = new Design({
            IBO,
            CRO_REST,
            CEM_BRI_REST,
            IMP_REST,
            IMP_BRI_REST,
            PRINT_MODEL,
            FULL_ARCH_PRO,
            FULL_ARCH_FINAL,
            DATE,
            USER: req.user.id,
        });
        const designSaved = await newDesign.save();
        return res.json(designSaved);
    } catch (error) {
        return res.status(404).json(["Error At Save Data"]);
    }
};

//================[Get designs data by ID]================//
export const getDesign = async (req, res) => {
    try {
        const design = await Design.findById(req.params.id);
        if (!design) return res.status(404).json(["Design not found"]);
        return res.json(design);
    } catch (error) {
        return res.status(404).json(["Design not found"]);
    }
};

//================[Update designs data by ID]================//
export const updateDesign = async (req, res) => {
    console.log(req.params.id);
    console.log(req.body);
    try {
        const design = await Design.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        );
        if (!design) return res.status(404).json(["Update not found"]);
        return res.json(design);
    } catch (error) {
        return res.status(404).json([`Update not found ${error}`]);
    }
};

//================[Delete designs data by ID]================//
export const deleteDesign = async (req, res) => {
    console.log(req.params.id);
    const design = await Design.findByIdAndDelete(req.params.id);
    if (!design) return res.status(404).json(["Design not found"]);
    return res.status(204).json();
};
