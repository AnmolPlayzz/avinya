"use server";
import {deleteSessionTokenCookie, getCurrentSession, invalidateSession} from "@/lib/session";
import {redirect} from "next/navigation";

export async function logout() {

    const { session } = await getCurrentSession();
    if (session) {
        await invalidateSession(session.id);
        await deleteSessionTokenCookie();
    }
    redirect("/login");
}
