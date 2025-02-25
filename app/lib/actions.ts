'use server'

import { sql } from '@vercel/postgres';
import bcrypt from 'bcrypt';
import { SignUpState, SignUpSchema } from '@/app/lib/definitions';
import { CreateState } from '@/app/lib/definitions';
import { createBracket, createLeague } from "@/app/lib/data";


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


export async function createBracketLeague(state: CreateState, formData: FormData) {
    const createType = formData.get("type");
    const name = formData.get("name");
    const description = formData.get("description");
    const rawStartDate = formData.get("start-date");
    const rawEndDate = formData.get("end-date");
    
    // Just for testing. return something more useful later
    const my_state: CreateState = {
        errors: {},
        message: null,
    };

    if (!name || !description) {
        return my_state;
    }

    if (!rawStartDate || !rawEndDate) {
        return my_state;
    }

    const startDate = new Date(rawStartDate.toString());
    const endDate = new Date(rawEndDate.toString());


    console.log(createType, name, description, startDate, endDate);
    if (createType === "league") {
        await createLeague(name.toString(), description.toString(), startDate, endDate);
    } else  {
        await createBracket(name.toString(), description.toString(), startDate, endDate);
    }
    

    return my_state
}