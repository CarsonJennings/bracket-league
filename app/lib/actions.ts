'use server'

import { sql } from '@vercel/postgres';
import bcrypt from 'bcrypt';
import { SignUpState, SignUpSchema, User } from '@/app/lib/definitions';
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
    const error_state: CreateState = {
        errors: {
            league: "Missing fields",
            bracket: "Missing fields",
        },
        message: "Error missing fields",
    };

    if (!name || !description) {
        return error_state;
    }

    if (!rawStartDate || !rawEndDate) {
        return error_state;
    }

    const startDate = new Date(rawStartDate.toString());
    const endDate = new Date(rawEndDate.toString());


    if (createType === "league") {
        return await createLeague(name.toString(), description.toString(), startDate, endDate);
    } else  {
        return await createBracket(name.toString(), description.toString(), startDate, endDate);
    }
}

export async function createLeagueTeam(user: User, league_id: string, stateMessage: string, formData: FormData) {
    try {
        const teamName = formData.get("team-name");
        if (typeof teamName === "string" && teamName.length <= 255) {
            await sql `BEGIN`;
            await sql`
            INSERT INTO teams (name, games_played, wins, losses, league_id)
            VALUES (${teamName}, 0, 0, 0, ${league_id})
            `;
            await sql `
            INSERT INTO user_teams (user_id, team_id, role)
            VALUES (${user.id}, (SELECT team_id FROM teams WHERE name=${teamName} AND league_id=league_id), 'manager')
            `;
            await sql`COMMIT`;
        } else {
            await sql`ROLLBACK`
            return "Error invalid name";
        }

        return "Success";
    } catch (error) {
        console.error(error);
        return "There was an error";
    }
}

export async function joinLeagueTeam(user_id: string, team_id: string) {
    try {
        await sql`
            INSERT INTO user_teams (user_id, team_id, role)
            VALUES (${user_id}, ${team_id}, 'player')
        `;
        return "Success";
    } catch (error) {
        console.error(error);
        return "Error unable to join league";
    }
}

export async function deleteTeam(team_id: string) {
    try {
        await sql`
        DELETE FROM teams
        WHERE team_id = ${team_id}
        `;
        return "success";
    } catch (error) {
        console.error(error);
        return "Unexpected error while attempting to delete team";
    }
}