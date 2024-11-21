import {z} from "zod";

export const createRegistrationSchema = z.object({
    PHIS_IBO:z.number({required_error: "IBO is required"}),
    DIGI_IBO:z.number({required_error: "DIGI_ABUT is required"}),
    PHIS_ABUT:z.number({required_error: "ABUT is required"}),    
    FULL_ARCH_PRO:z.number({required_error: "FULL_ARCH_P is required"}),
    FULL_ARCH_FINAL:z.number({required_error: "FULL_ARCH_F is required"}),
    DATE:z.string().datetime({required_error: "DATE is required"}).optional(),
    
})

export const createScanSchema = z.object({
    LS3:z.number({required_error: "IBO is required"}),
    SHAPE:z.number({required_error: "DIGI_ABUT is required"}),
    ZEISS:z.number({required_error: "ABUT is required"}),    
    FULL_ARCH:z.number({required_error: "FULL_ARCH_P is required"}),
    COPY_MILL:z.number({required_error: "FULL_ARCH_F is required"}),
    DATE:z.string().datetime({required_error: "DATE is required"}).optional(),    
})


export const createDesignSchema = z.object({
    IBO:z.number({required_error: "IBO Design is required"}),
    CRO_REST:z.number({required_error: "Crown Restoration is required"}),
    CEM_BRI_REST:z.number({required_error: "Cemented Bridge restoration is required"}),    
    IMP_REST:z.number({required_error: "Implant Restoration is required"}),
    IMP_BRI_REST:z.number({required_error: "Implant Bridge Restoration is required"}),
    PRINT_MODEL:z.number({required_error: "Printer Model is required"}),
    FULL_ARCH_PRO:z.number({required_error: "FULL ARCH Provisional is required"}),
    FULL_ARCH_FINAL:z.number({required_error: "FULL ARCH Final is required"}),
    DATE:z.string().datetime({required_error: "DATE is required"}).optional(),
    
})


export const createRedesignSchema = z.object({
    IBO:z.number({required_error: "IBO Design is required"}),
    CRO_REST:z.number({required_error: "Crown Restoration is required"}),
    CEM_BRI_REST:z.number({required_error: "Cemented Bridge restoration is required"}),    
    IMP_REST:z.number({required_error: "Implant Restoration is required"}),
    IMP_BRI_REST:z.number({required_error: "Implant Bridge Restoration is required"}),
    FULL_ARCH_PRO:z.number({required_error: "FULL ARCH Provisional is required"}),
    FULL_ARCH_FINAL:z.number({required_error: "FULL ARCH Final is required"}),
    DATE:z.string().datetime({required_error: "DATE is required"}).optional(),
    
})