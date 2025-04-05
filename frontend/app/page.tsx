import Image from "next/image";
import styles from "./page.module.css";
import bg from "@/public/backgrounds/bg.png"
import bgm from "@/public/backgrounds/bg-m.png"
import { getCurrentSession } from "@/lib/session";
import { redirect } from "next/navigation";
import arrow from "@/public/icons/home/arrow.svg"
import Link from "next/link";

export default async function Home() {
    const { user } = await getCurrentSession();

    if (user) {
        return redirect("/home");
    }

    return (
        <div className={styles.page}>
            <Image src={bg} alt={"Background"} fill={true} style={{
                objectFit: "cover",
                objectPosition: "right",
            }} className={styles.desktop} quality={100}/>
            <Image src={bgm} alt={"Background"} fill={true} style={{
                objectFit: "cover",
                objectPosition: "bottom",
            }} className={styles.mobile} quality={100}/>
            <div className={styles.content}>
                <div className={styles.contentContainer}>
                    <h1 className={styles.header}>
                      <span className={styles.animation}>
                          One Platform.
                      </span>
                        <br />
                        <span className={styles.animation2}>
                          Every Campus Need.
                      </span>
                    </h1>
                    <p className={styles.lower}>
                        Unlike your ex, we actually solve your problems.
                    </p>
                    <Link href={"/login"} className={styles.link}>
                        <p className={styles.text}>
                            Launch
                        </p>
                        <div className={styles.linkImage}>
                            <Image src={arrow} alt={"Arrow"} width={30} height={30} />
                        </div>
                    </Link>
                </div>
            </div>
        </div>
    );
}
