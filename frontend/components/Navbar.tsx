import Link from "next/link"

export const Navbar = () => {
    return (
        <nav className="bg-gray-800 text-white p-4 flex justify-between items-center">
            <div className="text-lg font-bold">Campus Solutions</div>
            <ul className="flex space-x-4">
                <li><Link href="/" className="hover:text-gray-300">Home</Link></li>
                <li><Link href="/lost" className="hover:text-gray-300">Lost Items</Link></li>
                <li><Link href="/lost" className="hover:text-gray-300">Find Items</Link></li>
                <li><Link href="/canteen" className="hover:text-gray-300">Canteen</Link></li>
                <li><Link href="/scholarships" className="hover:text-gray-300">Scholarships</Link></li>
            </ul>
        </nav>
    )
}