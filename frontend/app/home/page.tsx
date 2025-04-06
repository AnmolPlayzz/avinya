import { getCurrentSession,} from "@/lib/session";
import { redirect } from "next/navigation";
import styles from "@/app/reclaim/page.module.css";
import Link from "next/link";
import styles1 from "./page.module.css";
export default async function DashboardPage() {
    const { user, } = await getCurrentSession();

    // Protect this page
    if (!user) {
        return redirect("/login");
    }

    const linksUser = [
        {
            href: "/reclaim",
            text: "Reclaim",
            description: "Lost and found system to help you recover your missing items on campus."
        },
        {
            href: "/scholarships",
            text: "Scholarships",
            description: "Browse and apply for available scholarships and financial assistance programs."
        },
        {
            href: "/nutrients",
            text: "NutriScan",
            description: "Scan food items to get nutritional information and dietary recommendations."
        },
        {
            href: "/events",
            text: "Events",
            description: "Discover upcoming campus events, activities, and social gatherings."
        }
    ];

    const linksaAdmin = [
        {
            href: "/inventory",
            text: "Canteen",
            description: "Manage canteen inventory, food items, pricing, and stock levels."
        },
        {
            href: "/event-management",
            text: "Events",
            description: "Create, edit, and moderate campus events and activities."
        }
    ];

    return (
        <div className="flex min-h-screen flex-col p-6" style={{
            width: "100%",
            maxWidth: "1000px",
            margin: "100px auto",
            marginBottom: "0px",
        }}>
            <header className="flex justify-between items-center mb-3 mt-8">
                <h1 className="text-4xl font-bold">Welcome, {user.name}!</h1>
            </header>

            <div className={"bg-black/88 p-6 rounded-lg shadow-md " + styles1.main}>
                <div className="space-y-2">
                    <p><span className="font-medium">Signed in as:</span> {user.email}</p>
                    <p><span className="font-medium">Role:</span> {user.role}</p>
                </div>

                {user.role === "admin" && (
                    <div style={{
                        marginTop: "10px",
                        padding: "20px",
                        borderRadius: "4px",
                        background: "rgba(59,59,59,0.38)",
                    }}>
                        <h3 style={{
                            fontSize: "24px",
                            fontWeight: "800",
                        }}>Admin Panel</h3>
                        <p style={{
                            fontSize: "16px",
                            fontWeight: "300",
                        }}>You are signed in as an Admin.</p>
                    </div>
                )}
            </div>

            <header className="flex justify-between items-center mb-3 mt-10">
                <h1 className="text-4xl font-bold">All Actions</h1>
            </header>

            <div className={styles.grid}>
                {user.role == "admin" ? linksaAdmin.map((link) => (<Link key={link.href} href={link.href} className={styles.action}>
                    <h2 className={styles.h2}>{link.text}</h2>
                    <p className={styles.p}>{link.description}</p>
                </Link>)) : linksUser.map((link) => (<Link key={link.href} href={link.href} className={styles.action}>
                    <h2 className={styles.h2}>{link.text}</h2>
                    <p className={styles.p}>{link.description}</p>
                </Link>))}
            </div>
        </div>
    );
}

