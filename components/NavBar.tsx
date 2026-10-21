import Image from "next/image";
import Link from "next/link";

const NavBar = () => {
    return (
        <header>
            <Link href="/" className="fixed z-50 flex items-center flex-row w-full bg-emerald-900 space-x-4 p-3 justify-center font-extrabold font-mono">
                <Image src="/vercel.svg" alt="dev event website logo" height={20} width={20}/>
                <span>Dev Events</span>
            </Link>
        </header>
    )
}

export default NavBar;