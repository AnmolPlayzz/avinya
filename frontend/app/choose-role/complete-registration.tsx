"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function CompleteRegistration({ tempId }: { tempId: string }) {
    const [isLoading, setIsLoading] = useState(false);
    const router = useRouter();

    async function registerWithRole(role: "user" | "admin") {
        setIsLoading(true);

        try {
            const response = await fetch("/api/register", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ tempId, role })
            });

            if (response.ok) {
                router.push("/home");
            } else {
                console.error("Registration failed");
                setIsLoading(false);
            }
        } catch (error) {
            console.error("Registration error:", error);
            setIsLoading(false);
        }
    }

    return (
        <div className="flex flex-col space-y-4">
            <button
                onClick={() => registerWithRole("user")}
                disabled={isLoading}
                className="w-full rounded-md bg-blue-600 px-4 py-3 text-white hover:bg-blue-700 disabled:opacity-50"
            >
                Register as User
            </button>

            <button
                onClick={() => registerWithRole("admin")}
                disabled={isLoading}
                className="w-full rounded-md bg-gray-800 px-4 py-3 text-white hover:bg-gray-900 disabled:opacity-50"
            >
                Register as Admin
            </button>
        </div>
    );
}
