import {
    getTemporaryGoogleData,
    createUserWithGoogle,
    deleteTemporaryGoogleData
} from "@/lib/db-utils";
import {
    generateSessionToken,
    createSession,
    setSessionTokenCookie
} from "@/lib/session";

export async function POST(request: Request): Promise<Response> {
    try {
        const { tempId, role } = await request.json();

        if (!tempId || (role !== "user" && role !== "admin")) {
            return Response.json({ error: "Invalid data" }, { status: 400 });
        }

        // Get temporary user data
        const tempUserData = await getTemporaryGoogleData(tempId);
        if (!tempUserData) {
            return Response.json({ error: "Temporary data expired or not found" }, { status: 400 });
        }

        // Create user with the selected role
        const user = await createUserWithGoogle(
            tempUserData.googleId,
            tempUserData.name,
            tempUserData.email || "",
            role
        );

        // Clean up temporary data
        await deleteTemporaryGoogleData(tempId);

        // Create session
        const sessionToken = generateSessionToken();
        const session = await createSession(sessionToken, user.id);
        await setSessionTokenCookie(sessionToken, session.expiresAt);

        return Response.json({ success: true });
    } catch (error) {
        console.error("Registration error:", error);
        return Response.json({ error: "Registration failed" }, { status: 500 });
    }
}
