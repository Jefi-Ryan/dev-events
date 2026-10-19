import Image from "next/image";
import Link from "next/link";

const NavBar = () => {
    return (
        <header className="navbar">
            <Link href="/" className="navbar-link">
                <Image src="/vercel.svg" alt="dev event website logo" height={20} width={20}/>
                <span>Dev Events</span>
            </Link>
        </header>
    )
}

export default NavBar;