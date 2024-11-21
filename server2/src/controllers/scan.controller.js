import Scan from "../models/scan.model.js";

//=============[Get all scans data]================//
export const getScans = async (req, res) => {
    const scans = await Scan.find({ USER: req.user.id }).sort({ createdAt: -1 });
    return res.json(scans);
};

//=============[create scans data ]================//
export const createScan = async (req, res) => {
    try {
        const { LS3, SHAPE, ZEISS, FULL_ARCH, COPY_MILL, DATE } = req.body;
        const newScan = new Scan({
            LS3,
            SHAPE,
            ZEISS,
            FULL_ARCH,
            COPY_MILL,
            DATE,
            USER: req.user.id,
        });
        const scanSaved = await newScan.save();
        return res.json(scanSaved);
    } catch (error) {
        return res.status(404).json(["Scan not found"]);
    }
};

//================[Get scans data by ID]================//
export const getScan = async (req, res) => {
    try {
        const scan = await Scan.findById(req.params.id);
        if (!scan) return res.status(404).json(["Scan not found"]);
        return res.json(scan);
    } catch (error) {
        return res.status(404).json(["Scan not found"]);
    }
};

//================[Update scans data by ID]================//
export const updateScan = async (req, res) => {
    console.log(req.params.id);
    console.log(req.body);
    try {
        const scan = await Scan.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        );
        if (!scan) return res.status(404).json(["Update not found"]);
        return res.json(scan);
    } catch (error) {
        return res.status(404).json([`Update not found ${error}`]);
    }
};

//================[Delete scans data by ID]================//
export const deleteScan = async (req, res) => {
    console.log(req.params.id);
    const scan = await Scan.findByIdAndDelete(req.params.id);
    if (!scan) return res.status(404).json(["Scan not found"]);
    return res.status(204).json();
};