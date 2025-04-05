import {getCurrentSession} from "@/lib/session";
import {redirect} from "next/navigation";

export default async function Layout({children}: { children: React.ReactNode }) {
    const { user } = await getCurrentSession();

    if (!user) {
        return redirect("/home");
    }

    return (<div>
        {user.role == "admin" ? children : redirect("/home")}
    </div>);
}