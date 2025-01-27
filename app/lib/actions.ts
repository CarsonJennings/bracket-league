'use server'

import { sql } from '@vercel/postgres';
import { z } from 'zod';
import bcrypt from 'bcrypt';
import { SignUpState, SignUpSchema } from '@/app/lib/definitions';


export async function createUser(prevState: SignUpState, formData: FormData) {
    // Validate user data
    const validatedUser = SignUpSchema.safeParse({
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

    const { firstName, lastName, email, password } = validatedUser.data;
    const hashedPassword = await bcrypt.hash(password, 10);


    try {
        await sql`
            INSERT INTO users (first_name, last_name, email, password)
            VALUES (${firstName}, ${lastName}, ${email}, ${hashedPassword})
        `;
    } catch (error) {
        console.error(error);
        return {
            errors: {
                email: ["An account under this email may already exist"],
            },
            message: "Failed to create new user",
        };
    }

    return {
        errors: {},
        message: 'Success!',
    };

}