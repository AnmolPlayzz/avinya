import { getCurrentSession } from "@/lib/session";
import { redirect } from "next/navigation";

export default async function LoginPage() {
    const { user } = await getCurrentSession();

    // If already logged in, redirect to dashboard
    if (user) {
        return redirect("/dashboard");
    }

    return (
        <div className="flex min-h-screen flex-col items-center justify-center p-4">
            <div className="w-full max-w-md space-y-8 rounded-lg border p-6 shadow-md">
                <div className="text-center">
                    <h1 className="text-2xl font-bold">Sign in</h1>
                    <p className="mt-2 text-gray-600">Sign in to your account</p>
                </div>

                <div className="flex flex-col space-y-4">
                    <a
                        href="/login/google"
                        className="flex items-center justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-gray-700 shadow-sm hover:bg-gray-50"
                    >
                        Sign in with Google
                    </a>
                </div>
            </div>
        </div>
    );
}
