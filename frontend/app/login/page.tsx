import { getCurrentSession } from "@/lib/session";
import { redirect } from "next/navigation";
import styles from "./page.module.css";
import Image from "next/image";
import bgm from "@/public/backgrounds/haikei.svg"

export default async function LoginPage() {
    const { user } = await getCurrentSession();
    if (user) {
        return redirect("/dashboard");
    }

    return (
            <div className={styles.main}>
                <div className={styles.content}>
                    <h1 style={{
                        fontSize: "2rem",
                        fontWeight:"800"
                    }} className="">Sign in</h1>
                    <p className="">Sign in to your account</p>
                    <a className={styles.loginButton} href="/login/google">Sign in with Google</a>

                </div>
                <Image src={bgm} quality={100} alt={"background"} fill style={{
                    objectFit: "cover",
                    objectPosition: "center",
                }} />
            </div>
    );
}
