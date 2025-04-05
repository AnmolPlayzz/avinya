import { nanoid } from 'nanoid';
import { cookies } from 'next/headers';
import sql from './db';

// Session duration in seconds (7 days)
const SESSION_DURATION = 7 * 24 * 60 * 60;

// Generate a random session token
export function generateSessionToken(): string {
    return nanoid(32);
}

// Create a new session in the database
export async function createSession(sessionToken: string, userId: string) {
    const expiresAt = new Date(Date.now() + SESSION_DURATION * 1000);

    await sql`
    INSERT INTO sessions (id, user_id, expires_at) 
    VALUES (${sessionToken}, ${userId}, ${expiresAt})
  `;

    return {
        id: sessionToken,
        userId,
        expiresAt
    };
}

// Set session cookie
export async function setSessionTokenCookie(sessionToken: string, expiresAt: Date) {
    const cookieStore = await cookies();
    cookieStore.set("session_token", sessionToken, {
        path: "/",
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        expires: expiresAt,
        sameSite: "lax"
    });
}

// Get current session
export async function getCurrentSession() {
    const cookieStore = await cookies();
    const sessionToken = cookieStore.get("session_token")?.value;

    if (!sessionToken) {
        return { user: null, session: null };
    }

    // Get session from database
    const sessions = await sql`
    SELECT * FROM sessions 
    WHERE id = ${sessionToken} AND expires_at > NOW()
  `;

    if (sessions.length === 0) {
        return { user: null, session: null };
    }

    const session = sessions[0];

    // Get user data
    const users = await sql`
    SELECT * FROM users WHERE id = ${session.user_id}
  `;

    if (users.length === 0) {
        return { user: null, session: null };
    }

    return {
        user: {
            id: users[0].id,
            googleId: users[0].google_id,
            name: users[0].name,
            email: users[0].email,
            role: users[0].role
        },
        session: {
            id: session.id,
            userId: session.user_id,
            expiresAt: new Date(session.expires_at)
        }
    };
}

// Invalidate session
export async function invalidateSession(sessionId: string) {
    await sql`DELETE FROM sessions WHERE id = ${sessionId}`;
}

// Delete session cookie
export async function deleteSessionTokenCookie() {
    const cookieStore = await cookies();
    cookieStore.set("session_token", "", {
        path: "/",
        expires: new Date(0)
    });
}
