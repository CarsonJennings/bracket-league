import { z } from 'zod';

export const SignUpSchema = z.object({
    firstName: z.string().max(30, {message: 'Name must be less than 30 characters'}),
    lastName: z.string().max(30, {message: 'Name must be less than 30 characters'}),
    email: z.string().email(),
    password: z.string(),
    confirmPassword: z.string()
}).refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
});

export type SignUpState = {
    errors: {
        firstName?: string[];
        lastName?: string[];
        email?: string[];
        password?: string[];
        confirmPassword?: string[];
    };
    message?: string | null;
};