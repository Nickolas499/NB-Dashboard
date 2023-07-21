import {z} from "zod";

export const createRegistrationSchema = z.object({
    IBO:z.number({required_error: "IBO is required"}),
    ABUT:z.number({required_error: "ABUT is required"}),
    FULL_ARCH_P:z.number({required_error: "FULL_ARCH_P is required"}),
    FULL_ARCH_F:z.number({required_error: "FULL_ARCH_F is required"}),
    DATE:z.string().datetime({required_error: "DATE is required"}).optional(),
    
})