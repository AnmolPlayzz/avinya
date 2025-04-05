"use client"
import styles from "./navbar.module.css";
import Image from "next/image";
import icon from "@/public/icons/navbar/j2jicon.png"
import home from "@/public/icons/navbar/home.svg"
import Link from "next/link";

import menu from "@/public/icons/navbar/menu.svg"
import cross from "@/public/icons/navbar/cross.svg"

import {usePathname} from "next/navigation";
import {useState} from "react";
export default function NavBar() {
    const path = usePathname()
    const [isOpen, setIsOpen] = useState<boolean>(false);
    function checkUrl(url: string): boolean {
        return path.startsWith(url)
    }
    return (<>
            <div className={styles.navBar}>
                <Link href={"/"} className={styles.leftBox}>
                    <Image src={icon} alt={"Logo"} width={40} height={40} style={{
                        borderRadius: "8px",
                    }}/>
                </Link>
                <div className={styles.centerBox}>
                    <Link className={checkUrl("/reclaim") ? `${styles.link} ${styles.active}` : styles.link}
                          href="/reclaim">Reclaim</Link>
                    <Link className={checkUrl("/inventory") ? `${styles.link} ${styles.active}` : styles.link}
                          href="/inventory">Canteen</Link>
                    <Link className={checkUrl("/scholarships") ? `${styles.link} ${styles.active}` : styles.link}
                          href="/scholarships">Scholarships</Link>
                    <Link className={checkUrl("/nutrients") ? `${styles.link} ${styles.active}` : styles.link}
                          href="/nutrients">NutriScan</Link>
                </div>
                <Link href="/home" className={styles.rightBox}>
                    <Image style={{
                        opacity: 0.7
                    }} src={home} alt={"Home"} width={20} height={20}/>
                </Link>
                <div onClick={() => {
                    setIsOpen((v) => !v)
                }} className={`${styles.mob} ${styles.rightBox} ${isOpen ? styles.menuActive : ""}`}>
                    <Image className={styles.menuIcon} src={menu} alt={"Menu"} width={18} height={18}/>
                    <Image className={styles.crossIcon} src={cross} alt={"Cross"} width={18} height={18}/>
                </div>
                <div className={isOpen ? `${styles.mobileLinkBox} ${styles.activeMd}` : `${styles.mobileLinkBox}`}>
                    <div className={styles.linkList}>
                        <Link className={checkUrl("/reclaim") ? `${styles.link} ${styles.active}` : styles.link}
                              href="/reclaim">Reclaim</Link>
                        <Link className={checkUrl("/inventory") ? `${styles.link} ${styles.active}` : styles.link}
                              href="/inventory">Canteen</Link>
                        <Link className={checkUrl("/scholarships") ? `${styles.link} ${styles.active}` : styles.link}
                              href="/scholarships">Scholarships</Link>
                    </div>
                    <Link href="/home" className={styles.homeIcon}>
                        <Image style={{
                            opacity: 0.7
                        }} src={home} alt={"Home"} width={20} height={20}/>
                    </Link>
                </div>
            </div>
            <div onClick={() => setIsOpen((v) => !v)}
                 className={isOpen ? `${styles.mobileBg} ${styles.open}` : styles.mobileBg}>

            </div>
        </>
    )
}