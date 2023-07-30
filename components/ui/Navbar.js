import Link from "next/link";
// import {useSession, signOut} from 'next-auth/client';
import { useSession, signIn, signOut } from "next-auth/react"
import { useRouter } from "next/router";
import { Avatar, Grid } from "@nextui-org/react";
import React, {useState, useEffect} from 'react';


export default function Navbar() {
    // const [session,loading] = useSession();
    const { data: session, status } = useSession()
    const [user, setUser] = useState();
    console.log("isloggedin?", session)
    console.log("status is: " + status);
    // useEffect(() => {
    //     const { data } = getCookieData(session);
    //     if (data) {
    //         const fetchUser = async() => {
    //             const retrievedUser = await prisma.User.findFirst({
    //                 where: {
    //                     email:session.user.email,
    //                     }
    //             });    
    //         if (retrievedUser) {
    //             console.log(retrievedUser);
    //             setUser("user is: " + retrievedUser);
    //         }
    //     }}
    //     fetchUser().catch((e) => {
    //         console.error('An error occurred ', e);
    //     })
    // }, [data,status]);

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
                <div className="collapse navbar-collapse justify-content-between" id="navbarNav">
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

                {session &&
                <div className="d-flex flex-row-reverse align-items-center user-details mx-3">
                    <li className="nav-item d-flex align-items-center medium-header-fonts px-2">
                        <div className="nav-link">{session.user.name} </div>
                    </li>
                    <Grid>
                        <Avatar  
                        src={session.user.image} 
                        size="md"/>
                    </Grid>
                </div>
                }
                
                </div>
            </div>
        </nav>

    )

}

export async function getServerSideProps(context) {
    const session = await getSession({req: context.req})
        const retrievedUser = await prisma.User.findFirst({
            where: {
                email:session.user.email,
                }
            });
    
    return {
        props: {
            retrievedUser
        }
    }
}