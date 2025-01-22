'use server'

import { sql } from '@vercel/postgres';
import { z } from 'zod';

const UserSchema = z.object({
    firstName: z.string().max(30, {message: 'Name must be less than 30 characters'}),
    lastName: z.string().max(30, {message: 'Name must be less than 30 characters'}),
    email: z.string().email(),
    password: z.string(),
    confirmPassword: z.string()
}).refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
});

export type State = {
    errors: {
        firstName?: string[];
        lastName?: string[];
        email?: string[];
        password?: string[];
        confirmPassword?: string[];
    };
    message?: string | null;
};

export async function createUser(prevState: State, formData: FormData) {
    // Validate user data
    const validatedUser = UserSchema.safeParse({
        firstName: formData.get('first-name'),
        lastName: formData.get('last-name'),
        email: formData.get('email'),
        password: formData.get('password'),
        confirmPassword: formData.get('confirm-password'),
    });

    if (!validatedUser.success) {
        return {
            errors: validatedUser.error.flatten().fieldErrors,
            message: 'Failed to create user.',
        };
    }

    return {
        errors: {},
        message: 'Success!',
    };

}