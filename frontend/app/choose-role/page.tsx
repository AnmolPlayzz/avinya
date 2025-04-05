import { getCurrentSession } from "@/lib/session";
import { redirect } from "next/navigation";
import { getTemporaryGoogleData } from "@/lib/db-utils";
import CompleteRegistration from "./complete-registration";

export default async function ChooseRolePage({ searchParams }: { searchParams: { id: string } }) {
    // Check if already logged in
    const { user } = await getCurrentSession();
    if (user) {
        return redirect("/dashboard");
    }

    const tempId = searchParams.id;
    if (!tempId) {
        return redirect("/login");
    }

    // Get temporary user data
    const tempUserData = await getTemporaryGoogleData(tempId);
    if (!tempUserData) {
        return redirect("/login");
    }

    return (
        <div className="flex min-h-screen flex-col items-center justify-center p-4">
            <div className="w-full max-w-md space-y-8 rounded-lg border p-6 shadow-md">
                <div className="text-center">
                    <h1 className="text-2xl font-bold">Complete Your Registration</h1>
                    <p className="mt-2 text-gray-600">Welcome, {tempUserData.name}!</p>
                    <p className="text-sm text-gray-500">Please select how you want to register:</p>
                </div>

                <CompleteRegistration tempId={tempId} />
            </div>
        </div>
    );
}
