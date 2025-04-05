import { getCurrentSession, invalidateSession, deleteSessionTokenCookie } from "@/lib/session";
import { redirect } from "next/navigation";
import {logout} from "@/lib/actions";

export default async function DashboardPage() {
    const { user, } = await getCurrentSession();

    // Protect this page
    if (!user) {
        return redirect("/login");
    }

    return (
        <div className="flex min-h-screen flex-col p-6">
            <header className="flex justify-between items-center mb-8">
                <h1 className="text-2xl font-bold">Dashboard</h1>
            </header>

            <div className="bg-white p-6 rounded-lg shadow-md">
                <h2 className="text-xl font-semibold mb-4">Welcome, {user.name}!</h2>
                <div className="space-y-2">
                    <p><span className="font-medium">Email:</span> {user.email}</p>
                    <p><span className="font-medium">Role:</span> {user.role}</p>
                </div>

                {user.role === "admin" && (
                    <div className="mt-6 p-4 bg-gray-100 rounded-md">
                        <h3 className="text-lg font-medium mb-2">Admin Panel</h3>
                        <p>This content is only visible to administrators.</p>
                        {/* Admin-specific features would go here */}
                    </div>
                )}
            </div>
        </div>
    );
}

