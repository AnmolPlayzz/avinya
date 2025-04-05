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
      href: "/inventory-list",
      text: "Inventory"
    },
    {
      href: "/scholarships",
      text: "Scholarships"
    },
    {
      href: "/nutrients",
      text: "NutriScan"
    }
  ];

  const linksaAdmin = [
    {
      href: "/inventory",
      text: "Canteen"
    },
    {
      href: "/inventory-admin",
      text: "Inventory"
    },
  ];


  return (
    <html lang="en">
      <body className={roboto.className}>
      {!user && <NavBar links={linksUser} />  }

      {user.role == "user" && <NavBar links={linksUser} />  }
        {user.role == "admin" && <NavBar links={linksaAdmin} />  }
        {children}
      </body>
    </html>
  );
}
