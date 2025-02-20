import { sql } from '@vercel/postgres';

// Returns true if date2 is ahead of date1 by a year. With precision down to the day
function isAheadAYear(date1: Date, date2: Date) {
    const [year1, month1, day1] = [date1.getFullYear(), date1.getMonth(), date1.getDay()];
    const [year2, month2, day2] = [date2.getFullYear(), date2.getMonth(), date2.getDay()];

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

export async function createLeague(user_id: bigint, name: string, description: string, startDate: Date, endDate: Date) {
    // Do some error handling
    if (name.length > 255) {
        console.error('Error length of name must be less than or equal to 255 character');
        return;
    }
    const current_day = new Date();
    current_day.setHours(0, 0, 0, 0);
    if (startDate < current_day) {
        console.error('Error start date can not be in the past');
        return;
    }
    if (isAheadAYear(startDate, endDate)) {
        console.error('Error end date must be less than or equal to one year ahead of start date');
        return;

    }

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
            VALUES (${user_id.toString()}, (SELECT league_id FROM leagues WHERE name=${name}), 'super_admin')
        `;
        await sql`COMMIT`;

    } catch (error) {
        await sql`ROLLBACK`;
        console.error('unexpected error while attempting to create a new league: ', error);
    }

} 

export async function createBracket(user_id: bigint, name: string, description: string, startDate: Date, endDate: Date) {
    // Do some error handling
    if (name.length > 255) {
        console.error('Error length of name must be less than or equal to 255 character');
        return;
    }
    const current_day = new Date();
    current_day.setHours(0, 0, 0, 0);
    if (startDate < current_day) {
        console.error('Error start date can not be in the past');
        return;
    }
    if (isAheadAYear(startDate, endDate)) {
        console.error('Error end date must be less than or equal to one year ahead of start date');
        return;

    }

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
            VALUES (${user_id.toString()}, (SELECT bracket_id FROM brackets WHERE name=${name}), 'super_admin')
        `;
        await sql`COMMIT`;

    } catch (error) {
        await sql`ROLLBACK`;
        console.error('unexpected error while attempting to create a new bracket: ', error);
    }

}

