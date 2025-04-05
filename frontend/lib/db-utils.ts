import sql from './db';
import { nanoid } from 'nanoid';

// Check if user exists by Google ID
export async function getUserFromGoogleId(googleId: string) {
    const users = await sql`
    SELECT * FROM users WHERE google_id = ${googleId}
  `;

    return users.length > 0 ? users[0] : null;
}

// Create a new user with Google data
export async function createUserWithGoogle(googleId: string, name: string, email: string, role: 'user' | 'admin') {
    const userId = nanoid(12);

    await sql`
    INSERT INTO users (id, google_id, name, email, role)
    VALUES (${userId}, ${googleId}, ${name}, ${email}, ${role})
  `;

    return {
        id: userId,
        googleId,
        name,
        email,
        role
    };
}

// Store temporary user data after Google login
export async function storeTemporaryGoogleData(googleId: string, name: string, email: string) {
    const tempId = nanoid(12);

    // Store in database with expiration (better than cookies for sensitive data)
    await sql`
    CREATE TABLE IF NOT EXISTS temp_google_users (
      id TEXT PRIMARY KEY,
      google_id TEXT NOT NULL,
      name TEXT NOT NULL,
      email TEXT,
      created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
    )
  `;

    await sql`
    INSERT INTO temp_google_users (id, google_id, name, email)
    VALUES (${tempId}, ${googleId}, ${name}, ${email})
  `;

    // Delete old temporary data (older than 30 minutes)
    await sql`
    DELETE FROM temp_google_users 
    WHERE created_at < NOW() - INTERVAL '30 minutes'
  `;

    return tempId;
}

// Get temporary Google data
export async function getTemporaryGoogleData(tempId: string) {
    const results = await sql`
    SELECT * FROM temp_google_users WHERE id = ${tempId}
  `;

    if (results.length === 0) {
        return null;
    }

    return {
        id: results[0].id,
        googleId: results[0].google_id,
        name: results[0].name,
        email: results[0].email
    };
}

// Delete temporary Google data
export async function deleteTemporaryGoogleData(tempId: string) {
    await sql`
    DELETE FROM temp_google_users WHERE id = ${tempId}
  `;
}
