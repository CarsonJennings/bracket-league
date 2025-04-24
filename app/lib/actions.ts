'use server'

import { sql } from '@vercel/postgres';
import bcrypt from 'bcrypt';
import { z } from 'zod';
import { SignUpState, SignUpSchema, User, GameWithTeamNames, Game } from '@/app/lib/definitions';
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

export async function scheduleLeagueGame(league_id: string, stateMessage: string, formData: FormData) {
    // Validate the form
    const scheduleLeagueGameSchema = z.object({
        home_team_id: z.string(),
        away_team_id: z.string(),
        game_time: z.coerce.date(),
    }).refine((data) => data.home_team_id !== data.away_team_id);
    const validatedGame = scheduleLeagueGameSchema.safeParse({
        home_team_id: formData.get("home-team"),
        away_team_id: formData.get("away-team"),
        game_time: formData.get("game-time"),
    });

    if (!validatedGame.success) {
        return "Error: form data is invalid";
    }
    // form validation successful
    const { home_team_id, away_team_id, game_time } = validatedGame.data;

    try {
        await sql`
            INSERT INTO games (league_id, home_team_id, away_team_id, home_score, away_score, game_time, status)
            VALUES (${league_id}, ${home_team_id}, ${away_team_id}, 0, 0, ${game_time.toString().slice(4,24)}, 'scheduled')
        `;
        return "Success";
    } catch (error) {
        console.error(error);
        return "Unexpected error. Unable to schedule game";
    }
}

export async function updateGame(game: Game, stateMessage: string, formData: FormData) {
    // Return 1 if the home team won, -1 if away team won and 0 if it is a tie
    function getGameResult(home_score: number, away_score: number) {
        if (home_score > away_score) {
            return 1;
        } else if (away_score > home_score) {
            return -1;
        } else {
            return 0;
        }
    }
 
    // Validate the form
    const updatedLeagueGameSchema = z.object({
        home_team_score: z.coerce.number(),
        away_team_score: z.coerce.number(),
        game_status: z.string(),
    }).refine((data) => data.game_status === "scheduled" || data.game_status === "completed" || data.game_status ==="canceled");
    const validatedGame = updatedLeagueGameSchema.safeParse({
        home_team_score: formData.get("home-score"),
        away_team_score: formData.get("away-score"),
        game_status: formData.get("game-status"),
    });

    if (!validatedGame.success) {
        return "Error: form data is invalid";
    }

    const {home_team_score, away_team_score, game_status} = validatedGame.data;

    const prev_result = getGameResult(game.home_score, game.away_score);
    const new_result = getGameResult(home_team_score, away_team_score)
    // DB logic to ensure team stats are updated properly
    let db_query = `
        UPDATE games
        SET home_score = ${home_team_score}, away_score = ${away_team_score}, status = \'${game_status}\'
        WHERE game_id = ${game.game_id};
    `;
    if (game_status !== "completed") {
        if (game.status === "completed") { // Need to rollback wins and losses and games played
            if (prev_result === 1) {
                db_query += `
                    UPDATE teams
                    SET games_played = games_played - 1, wins = wins - 1
                    WHERE team_id = ${game.home_team_id};

                    UPDATE teams
                    SET games_played = games_played - 1, losses = losses - 1
                    WHERE team_id = ${game.away_team_id};
                `;
            } else if (prev_result === -1) {
                db_query += `
                    UPDATE teams
                    SET games_played = games_played - 1, losses = losses - 1
                    WHERE team_id = ${game.home_team_id};

                    UPDATE teams
                    SET games_played = games_played - 1, wins = wins - 1
                    WHERE team_id = ${game.away_team_id};
                `;
            } else {
                db_query += `
                    UPDATE teams
                    SET games_played = games_played - 1
                    WHERE team_id = ${game.home_team_id};

                    UPDATE teams
                    SET games_played = games_played - 1
                    WHERE team_id = ${game.away_team_id};
                `;
            }
        }
    } else {
        if (game.status !== "completed") { // normal case where game is finished and marked as completed
            if (new_result === 1) {
                db_query += `
                    UPDATE teams
                    SET games_played = games_played + 1, wins = wins + 1
                    WHERE team_id = ${game.home_team_id};

                    UPDATE teams
                    SET games_played = games_played + 1, losses = losses + 1
                    WHERE team_id = ${game.away_team_id};
                `;
            } else if (new_result === -1) {
                db_query += `
                    UPDATE teams
                    SET games_played = games_played + 1, losses = losses + 1
                    WHERE team_id = ${game.home_team_id};

                    UPDATE teams
                    SET games_played = games_played + 1, wins = wins + 1
                    WHERE team_id = ${game.away_team_id};
                `;
            } else {
                db_query += `
                    UPDATE teams
                    SET games_played = games_played + 1
                    WHERE team_id = ${game.home_team_id};

                    UPDATE teams
                    SET games_played = games_played + 1
                    WHERE team_id = ${game.away_team_id};
                `;
            }
        } else { // updating a completed game without changing status
            if (prev_result !== new_result) { // result has been changed
                if (new_result === 1) {
                    db_query += `
                        UPDATE teams
                        SET wins = wins + 1, losses = losses + ${prev_result}
                        WHERE team_id = ${game.home_team_id};
    
                        UPDATE teams
                        SET losses = losses + 1, wins = wins + ${prev_result}
                        WHERE team_id = ${game.away_team_id};
                    `;
                } else if (new_result === -1) {
                    db_query += `
                        UPDATE teams
                        SET losses = losses + 1, wins = wins - ${prev_result}
                        WHERE team_id = ${game.home_team_id};
    
                        UPDATE teams
                        SET wins = wins + 1, losses = losses - ${prev_result}
                        WHERE team_id = ${game.away_team_id};
                    `;
                } else {
                    if (prev_result === 1) {
                        db_query += `
                            UPDATE teams
                            SET wins = wins - 1 
                            WHERE team_id = ${game.home_team_id};
        
                            UPDATE teams
                            SET losses = losses - 1
                            WHERE team_id = ${game.away_team_id};
                        `;
                    } else {
                        db_query += `
                            UPDATE teams
                            SET losses = losses - 1 
                            WHERE team_id = ${game.home_team_id};
        
                            UPDATE teams
                            SET wins = wins - 1
                            WHERE team_id = ${game.away_team_id};
                        `;
                    }
                }
            }
        }
    }

    console.log(db_query);
    try {
        await sql`BEGIN`;
        await sql.query(db_query);
        await sql`COMMIT`;

        return "Success";
    } catch (error) {
        await sql`ROLLBACK`
        console.error(error);
        return "Unexpected error. Unable to update game";
    }
}