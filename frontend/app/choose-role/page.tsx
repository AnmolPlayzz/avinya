import { getCurrentSession } from "@/lib/session";
import { redirect } from "next/navigation";
import { getTemporaryGoogleData } from "@/lib/db-utils";
import CompleteRegistration from "./complete-registration";
import styles from "./page.module.css";
import Image from "next/image";
import bgm from "@/public/backgrounds/haikei.svg";

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
        <div className={styles.main}>
            <div className={styles.content}>
                <div style={{
                    maxWidth: "400px",
                    margin: "0",
                    padding: "0",
                }}>
                    <h1 className="text-2xl font-bold">Complete Your Registration</h1>
                    <p className="mt-2 text-gray-600">Welcome, {tempUserData.name}!</p>
                    <p className="text-sm text-gray-500">Please select how you want to register:</p>
                </div>

                <CompleteRegistration tempId={tempId} />
            </div>
            <Image src={bgm} quality={100} alt={"background"} fill style={{
                objectFit: "cover",
                objectPosition: "center",
            }} />
        </div>
    );
}
