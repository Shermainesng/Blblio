import Link from "next/link";
// import {useSession, signOut} from 'next-auth/client';
import { useSession, signIn, signOut } from "next-auth/react"
import { useRouter } from "next/router";


export default function Navbar() {
    // const [session,loading] = useSession();
    const { data: session } = useSession()
    console.log("isloggedin?", session)
    const router = useRouter();

    function logoutHandler() {
        signOut();
    }
    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
            <div className="container-fluid">
                <div className='navbar-brand big-header-fonts pb-2' >
                    <Link href="/books">biblio</Link>
                </div>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarNav">
                <ul className="navbar-nav">
                    <li className="nav-item nav-link d-flex align-items-center medium-header-fonts">
                    <Link aria-current="page" href="/books">BOOKS</Link>
                    </li>
                    <li className="nav-item nav-link d-flex align-items-center medium-header-fonts">
                    <Link className="nav-link" href="/lists">LISTS</Link>
                    </li>
                    {session ?
                    <li className="nav-item d-flex align-items-center medium-header-fonts">
                    <button className="nav-link custom-btn" onClick={logoutHandler}>SIGN OUT</button>
                    </li>
                    :
                    <li className="nav-item d-flex align-items-center medium-header-fonts">
                    <Link className="nav-link" href="/auth">SIGN IN</Link>
                    </li>
                    }

                   
                </ul>
                </div>
            </div>
        </nav>

    )

}
