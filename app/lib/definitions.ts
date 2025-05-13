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

export type Bracket = {
    bracket_id: string,
    name: string,
    description: string,
    start_date: Date,
    end_date: Date
};

export type Team = {
    team_id: string,
    name: string,
    games_played: number,
    wins: number,
    losses: number,
    ties: number,
    league_id: string | null,
    bracket_id: string | null,
};

export type Game = {
    game_id: string,
    league_id: string | null,
    bracket_id: string | null,
    home_team_id: string,
    away_team_id: string,
    home_score: number,
    away_score: number,
    game_time: Date,
    status: string,
};

export type GameWithTeamNames = {
    game_id: string,
    league_id: string | null,
    bracket_id: string | null,
    home_team_id: string,
    home_team_name : string,
    away_team_id: string,
    away_team_name : string,
    home_score: number,
    away_score: number,
    game_time: Date,
    status: string,
};