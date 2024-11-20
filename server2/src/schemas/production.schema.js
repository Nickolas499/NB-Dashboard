import {z} from "zod";

export const createRegistrationSchema = z.object({
    PHIS_IBO:z.number({required_error: "IBO is required"}),
    DIGI_IBO:z.number({required_error: "DIGI_ABUT is required"}),
    PHIS_ABUT:z.number({required_error: "ABUT is required"}),    
    FULL_ARCH_PRO:z.number({required_error: "FULL_ARCH_P is required"}),
    FULL_ARCH_FINAL:z.number({required_error: "FULL_ARCH_F is required"}),
    DATE:z.string().datetime({required_error: "DATE is required"}).optional(),
    
})

