'use server'

import { sql } from '@vercel/postgres';
import { getUserSession } from '@/app/lib/sessions';
import { CreateState, League, Bracket, User, Team, Game, GameWithTeamNames, BracketLeagueSearchResult } from '@/app/lib/definitions';

// Returns true if date2 is ahead of date1 by a year. With precision down to the day
function isAheadAYear(date1: Date, date2: Date) {
    const [year1, month1, day1] = [date1.getFullYear(), date1.getMonth(), date1.getDate()];
    const [year2, month2, day2] = [date2.getFullYear(), date2.getMonth(), date2.getDate()];

    if (year2 > year1) {
        if (year2 > year1 + 1) {
            return true;
        }
        if (month2 > month1) {
            return true;
        } else if (month2 === month1) {
            if (day2 > day1) {
                return true;
            }
        }
    }

    return false;

}


export async function getLeague(name: string) {
    const { rows } = await sql`
        SELECT *
        FROM leagues
        WHERE name=${name}
    `;
    return rows[0];
}

export async function createLeague(name: string, description: string, startDate: Date, endDate: Date): Promise<CreateState> {
    // Do some error handling
    if (name.length > 255) {
        console.error('Error length of name must be less than or equal to 255 character');
        return {
            errors: {
                name: "Name length exceeds 255 character max",
            },
            message: "Failed to create new league",
        };
    }

    if (startDate > endDate) {
        console.error('Error end date must come after start date');
        return {
            errors: {
                start_date: "Start date after end date",
                end_date: "End date after start date",
            },
            message: "Failed to create new league",
        };
    }

    if (isAheadAYear(startDate, endDate)) {
        console.error('Error end date must be less than or equal to one year ahead of start date');
        return {
            errors: {
                end_date: "End date cannot be over a year ahead of the start date",
            },
            message: "Failed to create new league",
        };

    }

    const user = await getUserSession();
    if (!user) {
        return {
            errors: { league: "Unauthorized create attempt" },
            message: "Failed to create a new league"
        };
    }

    const userId = user.id;

    // Change the date objects into the correct format to be added to the db
    const sqlStartDate: string = startDate.toISOString().slice(0, 19).replace('T', ' ');
    const sqlEndDate: string = endDate.toISOString().slice(0, 19).replace('T', ' ');

    //Try and add league to the db
    try {
        await sql`BEGIN`;
        await sql`
            INSERT INTO leagues (name, description, start_date, end_date)
            VALUES (${name}, ${description}, ${sqlStartDate}, ${sqlEndDate})
        `;
        await sql`
            INSERT INTO user_leagues (user_id, league_id, role)
            VALUES (${userId.toString()}, (SELECT league_id FROM leagues WHERE name=${name}), 'super_admin')
        `;
        await sql`COMMIT`;
        return {
            errors: {},
            message: "Success",
        };

    } catch (error) {
        await sql`ROLLBACK`;
        console.error('unexpected error while attempting to create a new league: ', error);
        
        if (error instanceof Error) {
            if (error.message.includes('duplicate key value violates unique constraint "leagues_name_key"')) {
                return {
                    errors: {
                        name: "A league under that name already exists",
                    },
                    message: "Failed to create a new league",
                }
            }
        }
        return {
            errors: {
                league: "Unexepected error occured",
            },
            message: "Failed to create a new league",
        };
    }

} 

export async function createBracket(name: string, description: string, startDate: Date, endDate: Date): Promise<CreateState> {
    // Do some error handling
    if (name.length > 255) {
        console.error('Error length of name must be less than or equal to 255 character');
        return {
            errors: {
                name: "Name length exceeds 255 character max",
            },
            message: "Failed to create new bracket",
        };
    }

    if (startDate > endDate) {
        console.error('Error end date must come after start date');
        return {
            errors: {
                start_date: "Start date after end date",
                end_date: "End date after start date",
            },
            message: "Failed to create new bracket",
        };
    }
    
    if (isAheadAYear(startDate, endDate)) {
        console.error('Error end date must be less than or equal to one year ahead of start date');
        return {
            errors: {
                end_date: "End date cannot be over a year ahead of the start date",
            },
            message: "Failed to create new bracket",
        };
    }

    const user = await getUserSession();
    if (!user) {
        return {
            errors: { bracket: "Unauthorized create attempt" },
            message: "Failed to create a new bracket"
        };
    }

    const userId = user.id;


    // Change the date objects into the correct format to be added to the db
    const sqlStartDate: string = startDate.toISOString().slice(0, 19).replace('T', ' ');
    const sqlEndDate: string = endDate.toISOString().slice(0, 19).replace('T', ' ');

    //Try and add bracket to the db
    try {
        await sql`BEGIN`;
        await sql`
            INSERT INTO brackets (name, description, start_date, end_date)
            VALUES (${name}, ${description}, ${sqlStartDate}, ${sqlEndDate})
        `;
        await sql`
            INSERT INTO user_brackets (user_id, bracket_id, role)
            VALUES (${userId.toString()}, (SELECT bracket_id FROM brackets WHERE name=${name}), 'super_admin')
        `;
        await sql`COMMIT`;
        return {
            errors: {},
            message: "Success",
        };

    } catch (error) {
        await sql`ROLLBACK`;
        console.error('unexpected error while attempting to create a new bracket: ', error);

        if (error instanceof Error) {
            if (error.message.includes('duplicate key value violates unique constraint "brackets_name_key"')) {
                return {
                    errors: {
                        name: "A bracket under that name already exists",
                    },
                    message: "Failed to create a new bracket",
                }
            }
        }

        return {
            errors: {
                bracket: "Unexepected error occured",
            },
            message: "Failed to create a new bracket",
        };
    }

}


export async function getUserLeagues(user: User) {
    try {
        const { rows } = await sql`
            SELECT * 
            FROM leagues
            WHERE league_id IN
                (SELECT league_id
                FROM user_leagues
                WHERE user_id = ${user.id}
            )
        `;

        return rows as League[];
    } catch (error) {
        console.error(error);
        return [];
    }
}

export async function getUserBrackets(user: User) {
    try {
        const { rows } = await sql`
            SELECT * 
            FROM brackets
            WHERE bracket_id IN
                (SELECT bracket_id
                FROM user_brackets
                WHERE user_id = ${user.id}
            )
        `;

        return rows as Bracket[];
    } catch (error) {
        console.error(error);
        return [];
    }   
}

export async function getLeagueData(league_id: string) {
    try {
        const { rows } = await sql`
            SELECT *
            FROM leagues
            WHERE league_id = ${league_id}
        `;
        return rows[0] as League;
    } catch (error) {
        console.error(error);
        return null;
    }
}

export async function getLeagueTeams(league_id: string) {
    try {
        const { rows } = await sql`
            SELECT *
            FROM teams
            WHERE league_id = ${league_id}
            ORDER BY wins DESC, ties DESC
        `;
        return rows as Team[];
    } catch (error) {
        console.error(error);
        return [];
    }
}

export async function getUpcomingLeagueGames(league_id: string, num_games: number = 10) {
    try {
        const { rows } = await sql`
            SELECT *
            FROM games
            WHERE league_id=${league_id} AND status='scheduled'
            ORDER BY game_time
            LIMIT ${num_games}
        `;
        return rows as Game[];
    } catch (error) {
        console.error(error);
        return []
    }
}

export async function getTeamData(team_id: string) {
    try {
        const { rows } = await sql`
            SELECT *
            FROM teams
            WHERE team_id=${team_id}
        `;
        return rows[0] as Team;
    } catch (error) {
        console.error(error);
        return null;
    }
}


// If the user is in the league return the team_id, otherwise return null
export async function isUserInLeague(user_id: string, league_id: string) {
    try {
        const { rows } = await sql`
        SELECT team_id
        FROM user_teams
        WHERE user_id = ${user_id} AND team_id IN (SELECT team_id
            FROM teams
            WHERE league_id = ${league_id})
        `;
        
        return rows[0] ? rows[0] : null;
    } catch (error) {
        console.error(error);
        return null;
    }
}

export async function getLeagueAdmin(league_id: string) {
    try {
        const { rows } = await sql`
        SELECT user_id
        FROM user_leagues
        WHERE league_id = ${league_id} AND role = 'super_admin'
        `;
        return rows[0] ? rows[0] : null;
    } catch (error) {
        console.error(error);
        return null;
    }
}

export async function getLeagueGamesInRange(league_id: string, start_date: Date, end_date: Date) {
    try {
        const { rows } = await sql`
            SELECT 
                games.game_id,
                games.league_id,
                games.bracket_id,
                games.home_team_id,
                home_team.name AS home_team_name,
                games.away_team_id,
                away_team.name AS away_team_name,
                games.home_score,
                games.away_score,
                games.game_time,
                games.status
            FROM games
            INNER JOIN teams AS home_team ON games.home_team_id = home_team.team_id
            INNER JOIN teams AS away_team ON games.away_team_id = away_team.team_id
            WHERE games.league_id=${league_id} AND games.game_time>=${start_date.toISOString()} AND games.game_time<=${end_date.toISOString()}
            ORDER BY games.game_time
        `;
        return rows as GameWithTeamNames[];
    } catch (error) {
        console.error(error);
        return [];
    }
}

export async function getBracketLeagueSearchResults(name: string) {
    try {
        const { rows } = await sql`
            SELECT name, description, start_date, end_date, 
                CASE 
                    WHEN league_id IS NOT NULL THEN league_id 
                    ELSE bracket_id 
                END AS id,
                CASE 
                    WHEN league_id IS NOT NULL THEN 'league' 
                    ELSE 'bracket' 
                END AS type
            FROM (
                SELECT name, description, start_date, end_date, league_id, NULL AS bracket_id FROM leagues
                UNION ALL
                SELECT name, description, start_date, end_date, NULL AS league_id, bracket_id FROM brackets
            ) AS combined_entries
            WHERE name ILIKE ${'%' + name + '%'}
        `;
        return rows as BracketLeagueSearchResult[];
    } catch (error) {
        console.error(error);
        return [];
    }
}