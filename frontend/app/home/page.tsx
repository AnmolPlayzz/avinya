import { getCurrentSession,} from "@/lib/session";
import { redirect } from "next/navigation";

export default async function DashboardPage() {
    const { user, } = await getCurrentSession();

    // Protect this page
    if (!user) {
        return redirect("/login");
    }

    return (
        <div className="flex min-h-screen flex-col p-6" style={{
            width: "100%",
            maxWidth: "1000px",
            margin: "100px auto",
        }}>
            <header className="flex justify-between items-center mb-8">
                <h1 className="text-4xl font-bold">Home</h1>
            </header>

            <div className="bg-white/5 p-6 rounded-lg shadow-md">
                <h2 style={{
                    borderRadius: "6px",
                    padding: "4px 10px",
                    width: "fit-content",
                    background: "rgba(98,98,98,0.38)",
                }} className="text-xl font-semibold mb-4">Welcome, {user.name}!</h2>
                <div className="space-y-2">
                    <p><span className="font-medium">Email:</span> {user.email}</p>
                    <p><span className="font-medium">Role:</span> {user.role}</p>
                </div>

                {user.role === "admin" && (
                    <div className="mt-6 p-4 bg-gray-100 rounded-md">
                        <h3 className="text-lg bg-gray-100 text-black font-medium mb-2">Admin Panel</h3>
                        <p className="text-black">You are signed in as an Admin.</p>
                    </div>
                )}
            </div>
        </div>
    );
}

