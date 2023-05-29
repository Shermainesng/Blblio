import Link from "next/link";
import {useSession, signOut} from 'next-auth/client';
import { useRouter } from "next/router";


export default function Navbar() {
    const [session,loading] = useSession();
    console.log("isloggedin?", session)
    const router = useRouter();

    function logoutHandler() {
        signOut();
    }
    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
            <div className="container-fluid ">
                <Link className="navbar-brand medium-header-fonts pb-2" href="/books">biblio</Link>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarNav">
                <ul className="navbar-nav">
                    <li className="nav-item ">
                    <Link className="nav-link medium-header-fonts" aria-current="page" href="/books">BOOKS</Link>
                    </li>
                    <li className="nav-item">
                    <Link className="nav-link medium-header-fonts" href="/lists">LIST</Link>
                    </li>
                    {session ?
                    <li className="nav-item">
                    <button className="nav-link custom-btn medium-header-fonts" onClick={logoutHandler}>SIGN OUT</button>
                    </li>
                    :
                    <li className="nav-item">
                    <Link className="nav-link medium-header-fonts" href="/auth">SIGN IN</Link>
                    </li>
                    }

                   
                </ul>
                </div>
            </div>
        </nav>

    )

}
