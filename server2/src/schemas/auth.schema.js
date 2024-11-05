import {z} from "zod";

export const registerSchema = z.object({
    username: z.string({ required_error: "Username is required" }),
    fname: z.string({ required_error: "First name is required" }),
    lname: z.string({ required_error: "Last name is required" }),
    email: z.string({ required_error: "Email is required" }).email({ message: "Invalid email" }),
    password: z.string({ required_error: "Password is required" }).min(6, { message: "Password must be at least 6 characters long" }),
    access: z.string({ required_error: "Access is required" }),
    color: z.string({ required_error: "Color is required" })
    
});


export const loginSchema = z.object({
    username: z.string({ required_error: "Username is required" }),
    password: z.string({ required_error: "Password is required" }).min(6, { message: "Password must be at least 6 characters long" })
});


