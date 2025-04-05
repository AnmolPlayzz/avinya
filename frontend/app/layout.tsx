import { Roboto } from "next/font/google";
import "./globals.css";
import NavBar from "@/components/library/navbar/navbar";
import {getCurrentSession} from "@/lib/session";

const roboto = Roboto({
  style: ["normal","italic"],
  subsets: ["latin"],
  weight: "variable"
});


export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const {user} = await getCurrentSession()
  const linksUser = [
    {
      href: "/reclaim",
      text: "Reclaim"
    },
    {
      href: "/scholarships",
      text: "Scholarships"
    },
    {
      href: "/nutrients",
      text: "NutriScan"
    },
    {
      href: "/events",
      text: "Events"
    }
  ];

  const linksaAdmin = [
    {
      href: "/inventory",
      text: "Canteen"
    },
    {
      href: "/event-management",
      text: "Event"
    }
  ];


  return (
    <html lang="en">
      <body className={roboto.className}>
      {!user && <NavBar loggedIn={false} links={linksUser} />  }

      {user ? user.role == "user" && <NavBar loggedIn={true} links={linksUser} /> : null }
        {user ? user.role == "admin" && <NavBar loggedIn={true} links={linksaAdmin} /> : null }
        {children}
      </body>
    </html>
  );
}
