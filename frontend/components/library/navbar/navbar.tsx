"use client"
import styles from "./navbar.module.css";
import Image from "next/image";
import icon from "@/public/icons/navbar/j2jicon.png"
import Link from "next/link";

import menu from "@/public/icons/navbar/menu.svg"
import cross from "@/public/icons/navbar/cross.svg"

import {usePathname} from "next/navigation";
import {useEffect, useState} from "react";
import Button from "@/components/library/buttons/button";
import {logout} from "@/lib/actions";
type LinkType = {
    href: string,
    text: string
}
export default function NavBar({links, loggedIn}: { links: LinkType[], loggedIn: boolean }) {
    const path = usePathname()
    const [isOpen, setIsOpen] = useState<boolean>(false);
    function checkUrl(url: string): boolean {
        return path.startsWith(url)
    }
    useEffect(() => {
        setIsOpen(false)
    }, [path])
    return (<>
            <div className={styles.navBar}>
                <Link href={"/"} className={styles.leftBox}>
                    <Image src={icon} alt={"Logo"} width={40} height={40} style={{
                        borderRadius: "8px",
                    }}/>
                </Link>
                <div className={styles.centerBox}>
                    {links.map((link:LinkType ) => (
                        <Link key={link.href} className={checkUrl(link.href) ? `${styles.link} ${styles.active}` : styles.link}
                              href={link.href}>{link.text}</Link>
                    ))}
                </div>
                {!loggedIn ? <Link style={{
                    width: "100px",
                }} href="/home" className={styles.rightBox}>
                    Sign In
                </Link> : <button style={{
                    backgroundColor: "rgba(255,153,153,0.24)",
                    border: "1px solid rgba(255,153,153,0.24)",
                    width: "100px",
                }} onClick={logout} className={styles.rightBox}>Sign Out</button>}

                <div onClick={() => {
                    setIsOpen((v) => !v)
                }} className={`${styles.mob} ${styles.rightBox} ${isOpen ? styles.menuActive : ""}`}>
                    <Image className={styles.menuIcon} src={menu} alt={"Menu"} width={18} height={18}/>
                    <Image className={styles.crossIcon} src={cross} alt={"Cross"} width={18} height={18}/>
                </div>
                <div className={isOpen ? `${styles.mobileLinkBox} ${styles.activeMd}` : `${styles.mobileLinkBox}`}>
                    <div className={styles.linkList}>
                        {links.map((link:LinkType ) => (
                            <Link key={link.href} className={checkUrl(link.href) ? `${styles.link} ${styles.active}` : styles.link}
                                  href={link.href}>{link.text}</Link>
                        ))}
                    </div>
                    {!loggedIn ? <Link href="/home" className={styles.homeIcon}>
                        Sign In
                    </Link> : <button style={{
                        backgroundColor: "rgba(255,153,153,0.24)",
                        border: "1px solid rgba(255,153,153,0.24)",
                    }} onClick={logout} className={styles.homeIcon}>Sign Out</button>}

                </div>
            </div>
            <div onClick={() => setIsOpen((v) => !v)}
                 className={isOpen ? `${styles.mobileBg} ${styles.open}` : styles.mobileBg}>

            </div>
        </>
    )
}