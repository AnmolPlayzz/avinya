import styles from "./page.module.css"
import bg from "@/public/backgrounds/bgheading.jpg"
import Image from "next/image";
import Link from "next/link";
export default function Page() {
    return <div style={{
        width: "100%",
        height: "100vh",
        margin: "0 auto",
        padding: "150px 20px",
        boxSizing: "border-box",
        maxWidth: "800px",
        display: "flex",
        justifyContent: "center",
        gap: "0",
        flexDirection: "column",
    }}>
        <div className={styles.header}>
            <h1 className={styles.h1}>Reclaim</h1>
            <p className={styles.p1}>Reclaim/report any lost items.</p>
            <Image src={bg} alt={"Background"} fill style={{
                objectFit: "cover",
                objectPosition: "center",
                zIndex: "-1"
            }} />
        </div>
        <div className={styles.grid}>
            <Link href={"/reclaim/report-found"} className={styles.action}>
                <h2 className={styles.h2}>Reclaim</h2>
                <p className={styles.p}>Reclaim any lost items.</p>
            </Link>
            <Link href={"/reclaim/report-lost"} className={styles.action}>
                <h2 className={styles.h2}>Report</h2>
                <p className={styles.p}>Report any lost/found items.</p>
            </Link>
        </div>
    </div>

}