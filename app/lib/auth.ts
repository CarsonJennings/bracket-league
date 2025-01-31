'use server'

import { createSession, deleteSession } from "@/app/lib/sessions";
import { LoginState, LoginSchema, User } from "@/app/lib/definitions";
import { redirect } from "next/navigation";
import { sql } from "@vercel/postgres";
import bcrypt from 'bcrypt';


async function getUser(email: string) {
    try {
        const { rows } = await sql`SELECT * FROM users WHERE email = ${email}`;
        return rows[0];
    } catch (error) {
        console.error("Failed to fetch user", error);
        throw new Error("Fetch failed");
    }
}

export async function login(state: LoginState, formData: FormData) {    
    // do some form validation before accessing db
    const validatedUser = LoginSchema.safeParse({
        email: formData.get('email'),
        password: formData.get('password'),
        });
  
    if (!validatedUser.success) {
        return {
            errors: validatedUser.error.flatten().fieldErrors,
            message: 'Login failed',
        };
    }

    const { email, password } = validatedUser.data;


    // attempt to get user from db and ensure correct credentials.
    const rawUser = await getUser(email);
    if (!rawUser) {
        return {
            errors: {
                email: ['Invalid email'],
            },
            message: 'Login failed',
        };
    }
    const result = await bcrypt.compare(password, rawUser.password);

    if (!result) {
        return {
            errors: {
                password: ['Invalid password'],
            },
            message: 'Login failed',
        };
    }
    const user: User = {
        id: rawUser.user_id,
        email: rawUser.email,
        firstName: rawUser.first_name,
        lastName: rawUser.last_name,
    }
    // If all is successful create the session
    await createSession(user);
    redirect('/dashboard');
}

export async function logout() {
  // Destroy the session
  await deleteSession();
  redirect('/');
}