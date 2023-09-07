import {z} from "zod";

export const createRegistrationSchema = z.object({
    IBO:z.number({required_error: "IBO is required"}),
    ABUT:z.number({required_error: "ABUT is required"}),
    FULL_ARCH_P:z.number({required_error: "FULL_ARCH_P is required"}),
    FULL_ARCH_F:z.number({required_error: "FULL_ARCH_F is required"}),
    DATE:z.string().datetime({required_error: "DATE is required"}).optional(),
    
})


export const createScanedSchema = z.object({
    LS3:z.number({required_error: "LS3 is required"}),
    ZEISS:z.number({required_error: "ZEISS is required"}),
    SHAPE:z.number({required_error: "3SHAPE is required"}),
    COPY_MILL:z.number({required_error: "COPY MILL is required"}),
    FULL_ARCH:z.number({required_error: "FULL ARCH is required"}),
    DATE:z.string().datetime({required_error: "DATE is required"}).optional(),
    
})


export const createDesignedSchema = z.object({
    IBO_DESIGNED:z.number({required_error: "IBO_DESIGNED is required"}),
    CROWN_RESTORATION:z.number({required_error: "CROWN_RESTORATION is required"}),
    CEMENTE_BRIDGE_RESTORATION:z.number({required_error: "CEMENTE_BRIDGE_RESTORATION is required"}),
    FULL_ARCH_P:z.number({required_error: "FULL_ARCH_P is required"}),
    FULL_ARCH_F:z.number({required_error: "FULL_ARCH_F is required"}),
    IMPLANT_RESTORATION:z.number({required_error: "IMPLANT_RESTORATION is required"}),
    IMPLANT_BRIDGE_RESTORATION:z.number({required_error: "IMPLANT_BRIDGE_RESTORATION is required"}),
    PRINTED_MODELS:z.number({required_error: "PRINTED_MODELS is required"}),
    DATE:z.string().datetime({required_error: "DATE is required"}).optional(),
    
})


export const createRedesignedSchema = z.object({
    IBO_DESIGNED:z.number({required_error: "IBO_DESIGNED is required"}),
    CROWN_RESTORATION:z.number({required_error: "CROWN_RESTORATION is required"}),
    CEMENTE_BRIDGE_RESTORATION:z.number({required_error: "CEMENTE_BRIDGE_RESTORATION is required"}),
    FULL_ARCH_P:z.number({required_error: "FULL_ARCH_P is required"}),
    FULL_ARCH_F:z.number({required_error: "FULL_ARCH_F is required"}),
    IMPLANT_RESTORATION:z.number({required_error: "IMPLANT_RESTORATION is required"}),
    IMPLANT_BRIDGE_RESTORATION:z.number({required_error: "IMPLANT_BRIDGE_RESTORATION is required"}),    
    DATE:z.string().datetime({required_error: "DATE is required"}).optional(),
    
})