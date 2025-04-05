"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Button from "@/components/library/buttons/button";

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
        <div className="flex flex-row gap-2" style={{
            marginTop: "10px"
        }}>
            <Button
                text={"Register as User"}
                onClick={() => registerWithRole("user")}
                disabled={isLoading}
                variant="Primary"
                width={160}
                height={40}
            />
            <p style={{
                margin: "auto 0",
            }}>or</p>
            <Button
                text="Register as Admin"
                onClick={() => registerWithRole("admin")}
                disabled={isLoading}
                variant={"Secondary"}
                width={160}
                height={40}

            />
        </div>
    );
}
