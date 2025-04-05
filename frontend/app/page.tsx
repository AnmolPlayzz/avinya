import { getCurrentSession } from "@/lib/session";
import { redirect } from "next/navigation";

export default async function Home() {
    const { user } = await getCurrentSession();

    if (user) {
        return redirect("/home");
    }

    return <div>
        <a href="/login">Log in to the app</a>
    </div>
}
