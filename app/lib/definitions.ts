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

export type LoginState = {
    errors: {
        email?: string[];
        password?: string[];
    };
    message?: string | null;
};

export const LoginSchema = z.object({
    email: z.string().email().nonempty({message: "No email provided"}),
    password: z.string().nonempty({message: "No password provided"}),
});

export type CreateState = {
    errors: {
        league?: string,
        bracket?: string,
        name?: string;
        description?: string;
        start_date?: string;
        end_date?: string;
    };
    message?: string | null;
};

export type User = {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
};

export type League = {
    league_id: string,
    name: string,
    description: string,
    start_date: Date,
    end_date: Date
};